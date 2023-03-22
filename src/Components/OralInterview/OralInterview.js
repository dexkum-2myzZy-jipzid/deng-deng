import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DifficultyLabelAndNext from "../UI/DifficultyLabelAndNext/DifficultyLabelAndNext";
import ProgressBar from "../UI/ProgressBar";
import { secondsToMmSs } from "../Utils";
import styles from "./OralInterview.module.css";
import ShowAnswer from "../UI/ShowAnswer/ShowAnswer";
import { TbDeviceComputerCamera } from "react-icons/tb";

function OralInterviewPage() {
  const seconds = 3 * 60;
  const [timer, setTimer] = useState(seconds);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const difficulty = searchParams.get("difficulty");
  const path = "oralinterview";

  const data = require("../../QuestionCollection/面试/口语面试/" +
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
          <TbDeviceComputerCamera size={300} style={{ color: "lightgrey" }} />
        </div>
      </div>
      <ShowAnswer answer={question.answer} path={path} id={id}></ShowAnswer>
    </div>
  );
}

export default OralInterviewPage;
