import React, { useState } from "react";
import { storeInLocalStorage } from "../../Utils";
import styles from "./ShowAnswer.module.css";

const ShowAnswer = (props) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const onClickHandler = () => {
    setShowAnswer((preState) => {
      return !preState;
    });
    storeInLocalStorage(props.path, props.id);
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
