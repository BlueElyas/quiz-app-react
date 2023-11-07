import React from "react";

export default function Question({ question, answers, handleAnswerSelect, selectedAnswers, questionIndex, checkResult }) {

  const buttonElements = answers.map((answer) => {
    const isSelected = selectedAnswers[questionIndex]?.id === answer.id
    let buttonClass = 'choice-btns'
    if (isSelected) {
      buttonClass += ' selected'
    }

    if (checkResult) {
      if (answer.isCorrect) {
        buttonClass += ' correct'
      }else if (isSelected) {
        buttonClass += ' incorrect'
      }
    }
    return (
      <button
        key={answer.id}
        className={buttonClass}
        onClick={() => handleAnswerSelect(questionIndex, answer.id, answer.isCorrect)}
        disabled={checkResult}
      >
        {answer.text}
      </button>
    )
  })

  return (
    <div className="questions">
      <h1>{question}</h1>
      <div className="choices">
        {buttonElements}
      </div>
    </div>
  );
}