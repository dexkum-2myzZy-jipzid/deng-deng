import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DifficultyLabelAndNext from "../UI/DifficultyLabelAndNext/DifficultyLabelAndNext";
import ProgressBar from "../UI/ProgressBar";
import { secondsToMmSs } from "../Utils";
import styles from "./ShortEssayPage.module.css";
import ShowAnswer from "../UI/ShowAnswer/ShowAnswer";

function ShortEssayPage() {
  const seconds = 5 * 60;
  const [timer, setTimer] = useState(seconds);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const difficulty = searchParams.get("difficulty");
  const [wordsCount, setWordsCount] = useState(0);
  const path = "shortessay";

  const data = require("../../QuestionCollection/写作/小作文/" + id + ".json");
  const question = data.data;

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer === 0 ? 0 : prevTimer - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const onClickRestartHandler = () => {
    setTimer(seconds);
  };

  const progressWidth = (1.0 - timer / seconds) * 100;

  const onInputHandler = (event) => {
    setWordsCount(() => {
      const str = event.target.value;
      const arr = str.split(" ");
      return arr.filter((word) => word !== "").length;
    });
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
        <h2 className={styles.timer}>{secondsToMmSs(timer)}</h2>
      </div>
      <ProgressBar progressWidth={progressWidth} />
      <h2>{question.title}</h2>
      <div
        style={{
          display: "flex",
        }}
      >
        <div className={styles.right}>{question.content}</div>
        <div style={{ flex: 1, textAlign: "left" }}>
          <textarea
            onInput={(e) => onInputHandler(e)}
            // readonly="readonly"
            autocomplete="off"
            placeholder="您的答案"
            style={{
              minHeight: "54px",
              height: "200px",
              width: "450px",
              fontSize: "16px",
            }}
            // value={}
          ></textarea>
          <p>{`字数：${wordsCount}`}</p>
        </div>
      </div>
      <ShowAnswer answer={question.answer} path={path} id={id}></ShowAnswer>
    </div>
  );
}

export default ShortEssayPage;
