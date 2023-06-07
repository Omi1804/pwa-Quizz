import React from 'react'
import './questions.css'
import {decode} from 'html-entities';
import { nanoid } from 'nanoid'

const Questions = (props) => {

  const ans = props.q.answers


  const handleClick = (answer) =>{
    if(props.q.checked)
    {
      return 
    }

    props.handleClickAnswer(props.id, answer)

  }



  const answerElements = ans.map((ans)=>{

    let id = null;
    if(props.q.checked)
    {
      if(props.q.correct === ans)
      {
        id="correct"
      }
      else if (props.q.selected === ans)
      {
        id="incorrect"
      }
      else{
        id="non-selected"
      }
    }

    return <button key={nanoid()} id={id} className={ans===props.q.selected ? 'answer selected' : 'answer'} onClick={()=>handleClick(ans)}>{decode(ans)}</button>
  })

  return (
    <div className="container">

    <div className="question-container">
      <p className="question-title">{decode(props.q.question)}</p>
      <div className="answers">
      {answerElements}
      </div>
      <div className="line"></div>
    </div>
    </div>
  )
}

export default Questions