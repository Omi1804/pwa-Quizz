import React, { useState, useEffect } from 'react'
import Starting from './components/starting'
import Questions from './components/questions'
import { decode } from 'html-entities';
import { nanoid } from 'nanoid'
import './app.css'
import { blob1, blob2 } from './assets';
import RingLoader from "react-spinners/RingLoader";

const App = () => {

  const [gameStart, setGameStart] = useState(false)
  const [questions, setQuestions] = useState(null)
  const [count, setCount] = useState(0)
  const [checked, SetChecked] = useState(false)
  const [correctAns, setCorrectAns] = useState(0)
  const [loading,setLoading] = useState(true)

  const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5) //to shuffle the array]


  useEffect(() => {
    async function getQuestions() {
      setLoading(true)
      const res = await fetch("https://opentdb.com/api.php?amount=5&category=9&type=multiple")
      const data = await res.json()
      let questionArray = [];
      data.results.forEach((question) => {
        questionArray.push(
          {
            id: nanoid(),
            answers: shuffleArray([...question.incorrect_answers, question.correct_answer]),
            question: question.question,
            correct: question.correct_answer,
            selected: null,
            checked: false
          }
        )
      })
      setQuestions(questionArray)
      setLoading(false)
    }
    getQuestions()
  }, [count])


  //checking Answers
  function handleCheck() {

    let selected = true;
    questions.map(question => {
      if (question.selected === null) {
        return
      }
      if (!selected) {
        return
      }

      setQuestions(questions => questions.map((question) => {
        return { ...question, checked: true }
      }))

      SetChecked(true)
      let correct = 0
      questions.forEach(question => {

        if (question.correct === question.selected) {
          correct += 1;
        }
      })
      setCorrectAns(correct)


    })
  }


  //selected options
  function handleClickAnswer(id, answer) {
    setQuestions(questions => questions.map(question => {
      return question.id === id ? { ...question, selected: answer } : question
    }))
  }


  const questionElements = questions ? questions.map((question) => {
    return (
      <Questions
        key={question.id}
        q={question}
        id={question.id}
        handleClickAnswer={handleClickAnswer}
      />
    )
  }) : []

  function start() {
    setGameStart(prev => !prev)
  }

  function handlePlayAgain() {
    setCount(prev => prev + 1)
    SetChecked(false)
  }



  return (
    <div className="main-container">
      <img src={blob1} className='mainblob1' />
      {gameStart

        ? <div className="start-content-container">
           
           {loading ? ( // Render the RingLoader when loading is true
            <RingLoader
              color="#293264"
              loading={true}
              size={100}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : questionElements.length === 0 ? (
            <p>No questions available.</p>
          ) : (
            questionElements
          )}
          <div className="end-container">
            {checked && <span className='correct-ans'>Correct Answers : {correctAns}/5  </span>}
            {questionElements.length > 0 && !loading ? <button className='check' onClick={checked ? handlePlayAgain : handleCheck}>{checked ? "Play Again" : "Check Answers"}</button> : ""}
          </div>
        </div>

        : <Starting start={start} />
      }
      <img src={blob2} className='mainblob2' />

      <footer>Developed by&nbsp;
        <a href="https://om-nigam.netlify.app" target="_blank" rel="noreferrer">
          &Oacute;m N&iacute;gam
        </a>
      </footer>
    </div>
  )
}

export default App
