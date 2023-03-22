import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DifficultyLabelAndNext from "../UI/DifficultyLabelAndNext/DifficultyLabelAndNext";
import ShowAnswer from "../UI/ShowAnswer/ShowAnswer";
import { secondsToMmSs } from "../Utils";
import styles from "./SpeechPicturePage.module.css";

const SpeechPicturePage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const difficulty = searchParams.get("difficulty");
  const [prepareTimer, setPrepareTimer] = useState(20);
  const [timer, setTimer] = useState(90);
  const path = "speechpicture";

  const data = require("../../QuestionCollection/口语/看图演讲/" +
    id +
    ".json");
  const question = data.data;

  useEffect(() => {
    const interval = setInterval(() => {
      setPrepareTimer((preState) => {
        return preState !== 0 ? preState - 1 : 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [prepareTimer]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((preState) => {
        return prepareTimer === 0 && preState !== 0
          ? preState - 1
          : preState !== 0
          ? 90
          : 0;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [prepareTimer, timer]);

  const handleCountdownClick = () => {
    setTimer(90);
    //todo: hide show answer area
  };

  return (
    <div className={styles.container}>
      <DifficultyLabelAndNext
        difficultyName={question.difficultyName}
        difficulty={difficulty}
        id={id}
        path={path}
      />
      <p>准备时间：{secondsToMmSs(prepareTimer)}</p>
      <h4 className={styles.timer} onClick={handleCountdownClick}>
        {secondsToMmSs(timer)}
      </h4>
      <h2>准备以至少30秒的时间描述所给图片</h2>
      <img className={styles.img} src={question.photo} alt="logo.svg" />
      <ShowAnswer answer={question.answer} path={path} id={id}></ShowAnswer>
    </div>
  );
};

export default SpeechPicturePage;
