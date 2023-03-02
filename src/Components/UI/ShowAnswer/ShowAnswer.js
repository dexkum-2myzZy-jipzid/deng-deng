import React, { useState } from "react";
import styles from "./ShowAnswer.module.css";

const ShowAnswer = (props) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const onClickHandler = () => {
    setShowAnswer((preState) => {
      return !preState;
    });
  };

  return (
    <div className={styles.container}>
      <button onClick={onClickHandler}>
        {showAnswer ? "Hide Answer" : "Show Answer"}
      </button>
      {showAnswer && <p>{props.answer}</p>}
    </div>
  );
};

export default ShowAnswer;
