import React from 'react'
import './starting.css'
import { blob1,blob2 } from '../assets'

const Starting = (props) => {
  return (
    <>
    <img src={blob1} alt='blob1' className='blob1'/>
    <div className="menu">
    <h1 className='page-title'>Quizzical</h1>
    <p className='page-description'>Answer the questions and test your knowledge!</p>
    <button className='start-button' onClick={()=>props.start()}>Start Quizzical</button>
    </div>
    <img src={blob2} alt='blob2' className='blob2'/>
    </>
  )
}

export default Starting