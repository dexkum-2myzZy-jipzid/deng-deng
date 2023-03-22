import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DifficultyLabelAndNext from "../UI/DifficultyLabelAndNext/DifficultyLabelAndNext";
import ProgressBar from "../UI/ProgressBar";
import { secondsToMmSs } from "../Utils";
import styles from "./LecturePage.module.css";
import ShowAnswer from "../UI/ShowAnswer/ShowAnswer";
import { MdVolumeUp } from "react-icons/md";

function LecturePage() {
  const seconds = 90;
  const [timer, setTimer] = useState(seconds);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const difficulty = searchParams.get("difficulty");
  const [showReferenceText, setShowReferenceText] = useState(false);
  const path = "lecture";

  const data = require("../../QuestionCollection/口语/听题演讲/" +
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

  const onClickSpeakerHander = (url) => {
    const sound = new Audio(url);
    sound.play();
  };

  const onClickShowShowReferenceText = () => {
    setShowReferenceText((pre) => !pre);
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
        <div className={styles.right}>
          <MdVolumeUp
            size={100}
            onClick={() => onClickSpeakerHander(question.audio)}
          />
        </div>
      </div>
      <ShowAnswer answer={question.answer} path={path} id={id}></ShowAnswer>
      <p></p>
      <button onClick={onClickShowShowReferenceText}>
        {showReferenceText ? "隐藏题目参考原文" : "题目参考原文"}
      </button>
      {showReferenceText && <p>{question.referenceText}</p>}
      {showReferenceText && <p>{question.referenceTranslate}</p>}
    </div>
  );
}

export default LecturePage;
