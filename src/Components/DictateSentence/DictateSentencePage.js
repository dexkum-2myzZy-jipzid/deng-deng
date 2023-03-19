import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DifficultyLabelAndNext from "../UI/DifficultyLabelAndNext/DifficultyLabelAndNext";
import ProgressBar from "../UI/ProgressBar";
import secondsToMmSs from "../Utils";
import styles from "./DictateSentencePage.module.css";
import ShowAnswer from "../UI/ShowAnswer/ShowAnswer";
import { MdVolumeUp } from "react-icons/md";

function DictateSentencePage() {
  const seconds = 60;
  const [timer, setTimer] = useState(seconds);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [wordsCount, setWordsCount] = useState(0);

  const data = require("../../QuestionCollection/听力/听写句子/" +
    id +
    ".json");
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

  const onClickSpeakerHander = (url) => {
    const sound = new Audio(url);
    sound.play();
  };

  return (
    <div className={styles.container}>
      <DifficultyLabelAndNext
        difficulty={question.difficultyName}
        arrayType={"dictateSentencesArray"}
        id={id}
        path={"dictatesentence"}
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
        <div className={styles.right}>
          <MdVolumeUp
            size={100}
            onClick={() => onClickSpeakerHander(question.audio)}
          />
        </div>
        <div style={{ flex: 1, textAlign: "left" }}>
          <textarea
            onInput={(e) => onInputHandler(e)}
            // readonly="readonly"
            autocomplete="off"
            placeholder="您的回复"
            style={{ minHeight: "54px", height: "200px", width: "450px" }}
            // value={}
          ></textarea>
          <p>{`字数：${wordsCount}`}</p>
        </div>
      </div>
      <ShowAnswer answer={question.answer}></ShowAnswer>
    </div>
  );
}

export default DictateSentencePage;
