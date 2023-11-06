import React, { useEffect, useState } from "react"
import Front from "./Compononts/Front"
import "./App.css"
import Question from "./Compononts/Questions"
import he from "he"
import { nanoid } from "nanoid"
import CheckAnswers from "./Compononts/CheckAnswers"

function App() {
  const [start, setStart] = useState(true)
  const [questions, setQuestions] = useState()
  const [answers, setAnswers] = useState([])
  const [selectedAnswer, setSelectedAnswer] = useState([])
  const [score, setScore] = useState(0)
  const [checkedAnswers, setCheckedAnswers] = useState(false)

  const allAnswered = selectedAnswer.every(answer => answer != null);

  function startGame() {
    setStart(!start)
  }

  useEffect(() => {
    const shuffle = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    };
    fetch("https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple")
      .then(res => res.json())
      .then(data => {
        setAnswers([])
        setSelectedAnswer([])
        setQuestions(data.results.map((p) => he.decode(p.question)))
        setSelectedAnswer(new Array(data.results.length).fill(null));
        const newAnswers = data.results.map(questionData => {
          const decodedIncorrect = questionData.incorrect_answers.map(a => he.decode(a))
          const correctDecoded = he.decode(questionData.correct_answer)
          const combinedAnswers = [
            { text: correctDecoded, isCorrect: true, id: nanoid() },
            ...decodedIncorrect.map(text => ({text, isCorrect: false, id: nanoid()}))
          ]
          
          shuffle(combinedAnswers)
          return combinedAnswers
        })
        setAnswers(newAnswers)
      })
  }, [start])

  function handleAnswerSelect(questionIndex, answerId, isCorrect) {
    if(checkedAnswers) {
      return
    }
    const newSelectedAnswer = [...selectedAnswer]
    newSelectedAnswer[questionIndex] = { id: answerId, isCorrect: isCorrect } 
    setSelectedAnswer(newSelectedAnswer)
  }

  const questionsElements = questions && answers && questions.map((question, index) => {
    if(answers[index]) {
      return (
        <Question 
          key={index}
          question={question}
          answers={answers[index]}
          handleAnswerSelect={handleAnswerSelect}
          selectedAnswers={selectedAnswer}
          questionIndex={index}
          checkResult ={checkedAnswers}
        />
      )
    } else {
      return null
    }
   
  })
  
  function checkResult() {
    let newScore = 0
    selectedAnswer.forEach((answer, index) =>  {
      if (answer && answer.isCorrect) {
        newScore++
      }
    })
    setScore(newScore)
    setCheckedAnswers(true)
  }

  function resetGame() {
    setStart(true)
    setScore(0)
    setCheckedAnswers(false)
  }

  return(
    <main>
      <div className="yellow">
        <svg xmlns="http://www.w3.org/2000/svg" width="158" height="141" viewBox="0 0 158 141" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M63.4095 81.3947C35.1213 50.8508 -2.68211 21.7816 1.17274 -19.6933C5.43941 -65.599 39.854 -105.359 82.4191 -123.133C122.797 -139.994 170.035 -130.256 205.822 -105.149C235.947 -84.0141 236.823 -43.8756 246.141 -8.27104C256.17 30.0508 282.521 70.8106 260.501 103.779C237.538 138.159 188.991 143.432 147.931 138.768C112.318 134.723 87.7505 107.677 63.4095 81.3947Z" fill="#FFFAD1"/>
        </svg>
      </div>
      {start && <Front startGame={startGame}/>}
      {!start && questionsElements}
      {!start && (
      <CheckAnswers 
        checkResult={checkResult} 
        disabled={!allAnswered} 
        checkedAnswers={checkedAnswers}
        resetGame={resetGame}
        score={score}   />
    )}
    
      <div className="blue">
        <svg xmlns="http://www.w3.org/2000/svg" width="148" height="118" viewBox="0 0 148 118" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M-5.55191 4.90596C35.9614 1.77498 82.2425 -9.72149 112.306 19.1094C145.581 51.0203 155.282 102.703 142.701 147.081C130.767 189.18 93.7448 220.092 51.8208 232.476C16.5281 242.902 -15.4332 218.605 -49.1007 203.738C-85.3375 187.737 -133.641 182.993 -145.741 145.239C-158.358 105.868 -132.269 64.5881 -103.064 35.3528C-77.7328 9.99541 -41.2727 7.60006 -5.55191 4.90596Z" fill="#DEEBF8"/>
        </svg>
      </div>
    </main>
  )
}

export default App