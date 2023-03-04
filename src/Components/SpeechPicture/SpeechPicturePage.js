import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DifficultyLabel from "../UI/DifficultyLabel/DifficultyLabel";
import ShowAnswer from "../UI/ShowAnswer/ShowAnswer";
import styles from "./SpeechPicturePage.module.css";

const SpeechPicturePage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [prepareTimer, setPrepareTimer] = useState(20);
  const [timer, setTimer] = useState(90);

  var data = require("./看图演讲/" + id + ".json");
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

  return question ? (
    <div className={styles.container}>
      <p>准备时间：{secondsToMmSs(prepareTimer)}</p>
      <h4 className={styles.timer} onClick={handleCountdownClick}>
        {secondsToMmSs(timer)}
      </h4>
      <h2>准备以至少30秒的时间描述所给图片</h2>
      <img className={styles.img} src={question.photo} alt="logo.svg" />
      <ShowAnswer answer={question.answer} />
      <DifficultyLabel difficulty={question.difficultyName} />
    </div>
  ) : (
    <div></div>
  );
};

export default SpeechPicturePage;

function secondsToMmSs(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds =
    remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
  return `${formattedMinutes}:${formattedSeconds}`;
}
