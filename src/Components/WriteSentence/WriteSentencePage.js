import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import DifficultyLabel from "../UI/DifficultyLabel/DifficultyLabel";
import ShowAnswer from "../UI/ShowAnswer/ShowAnswer";
import styles from "./WriteSentencePage.module.css";

const WriteSentencePage = () => {
  const [timer, setTimer] = useState(60);
  const [inputText, setInputText] = useState("");
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const data = require("./看图写句/" + id + ".json");
  const question = data.data;

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer === 0 ? 0 : prevTimer - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const onClickRestartHandler = () => {
    setTimer(60);
  };

  const progressWidth = (1.0 - timer / 60) * 100;

  return (
    <div className={styles.container}>
      <div onClick={onClickRestartHandler}>
        <h2 className={styles.timer}>{secondsToMmSs(timer)}</h2>
      </div>
      <div
        style={{
          height: "5px",
          width: "100%",
          backgroundColor: "lightGray",
          marginTop: "10px",
          alignSelf: "start",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progressWidth}%`,
            backgroundColor: "orange",
          }}
        />
      </div>
      <div
        style={{ display: "flex", marginTop: "10px", justifyContent: "center" }}
      >
        <img
          src={question.photo}
          alt="logo.svg"
          style={{ height: "200px", width: "200px" }}
        />
        <div style={{ width: "20px" }}></div>
        <textarea
          style={{ width: "500px", height: "200px" }}
          placeholder="你的回复"
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>
      <p>字数：{inputText.length}</p>
      <ShowAnswer answer={question.answer} />
      <DifficultyLabel difficulty={question.difficultyName} />
    </div>
  );
};

export default WriteSentencePage;

function secondsToMmSs(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds =
    remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
  return `${formattedMinutes}:${formattedSeconds}`;
}
