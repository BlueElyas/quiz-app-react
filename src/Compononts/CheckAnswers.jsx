import React from "react";

function CheckAnswers({checkResult, disabled, resetGame, checkedAnswers, score}) {
    const handleClick = checkedAnswers ? resetGame : checkResult;
    return (
        <>
        <div className="check-answers-div">
            <button 
                className={`btn check-answers ${disabled ? 'disabled' : ''}`}
                onClick={handleClick} 
                disabled={!checkedAnswers && disabled}
                >
                 {checkedAnswers ? 'Play Again' : 'Check Answers'}
            </button>
            {checkedAnswers && <div className="score">Score: {score}/5</div>}
        </div>
        </>
    )
}

export default CheckAnswers