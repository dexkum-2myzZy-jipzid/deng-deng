import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./SpeechPicturePage.module.css";

const SpeechPicturePage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [question, setQuestion] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [prepareTimer, setPrepareTimer] = useState(20);
  const [timer, setTimer] = useState(90);

  useEffect(() => {
    var data = require("./看图演讲/" + 1280 + ".json");
    setQuestion(data.data);
    console.log(question);
  }, [question, id]);

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

  const onClickHandler = () => {
    setShowAnswer(!showAnswer);
  };

  const handleCountdownClick = () => {
    setTimer(90);
    setShowAnswer(false);
  };

  return question ? (
    <div className={styles.container}>
      <p>准备时间：{secondsToMmSs(prepareTimer)}</p>
      <h4 className={styles.timer} onClick={handleCountdownClick}>
        {secondsToMmSs(timer)}
      </h4>
      <h2>准备以至少30秒的时间描述所给图片</h2>
      <img className={styles.img} src={question.photo} alt="logo.svg" />
      <div>
        <button onClick={onClickHandler}>
          {showAnswer ? "Hide Answer" : "Show Answer"}
        </button>
        {showAnswer && <p>{question.answer}</p>}
      </div>
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
