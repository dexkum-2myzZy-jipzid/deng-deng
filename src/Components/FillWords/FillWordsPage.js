import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DifficultyLabelAndNext from "../UI/DifficultyLabelAndNext/DifficultyLabelAndNext";
import InputArray from "../UI/InputArray/InputArray";
import ProgressBar from "../UI/ProgressBar";
import { secondsToMmSs, storeInLocalStorage } from "../Utils";
import styles from "./FillWordsPage.module.css";

const FillWordsPage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const difficulty = searchParams.get("difficulty");
  const [timer, setTimer] = useState(180);
  const [showAnswer, setShowAnswer] = useState(false);
  const path = "fillwords";

  const data = require("../../QuestionCollection/阅读/单词填空/" +
    id +
    ".json");
  const question = data.data;
  const array = question.options;
  const words = array.map((el) => el["word"]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer === 0 ? 0 : prevTimer - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const progressWidth = (1.0 - timer / 180) * 100;

  const onClickRestartHandler = () => {
    setTimer(180);
  };

  const onSumbitHandler = () => {
    setShowAnswer(true);
    storeInLocalStorage(path, id);
  };

  return (
    <div className={styles.container}>
      <DifficultyLabelAndNext
        difficultyName={question.difficultyName}
        difficulty={difficulty}
        id={id}
        path={path}
      />
      <div onClick={onClickRestartHandler}>
        <h2 style={{ color: "red" }}>{secondsToMmSs(timer)}</h2>
      </div>
      <ProgressBar progressWidth={progressWidth} />
      <h2>{question.title}</h2>
      <div style={{ textAlign: "left" }}>
        {question.partBlankContent.split(" ").map((e, index) =>
          e.indexOf("_") !== -1 ? (
            <InputArray
              key={index.toString()}
              word={words.shift()}
              showAnswer={showAnswer}
              partBlank={e}
            />
          ) : (
            <span
              key={index}
              style={{
                display: "inline-block",
                paddingTop: "10px",
                margin: "10px 10px 10px 0",
              }}
            >
              {e + " "}
            </span>
          )
        )}
      </div>
      <p></p>
      <button onClick={onSumbitHandler}>Submit</button>
      {showAnswer && <p>{question.answer}</p>}
    </div>
  );
};

export default FillWordsPage;
