import classNames from "classnames";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import DifficultyLabelAndNext from "../UI/DifficultyLabelAndNext/DifficultyLabelAndNext";
import ProgressBar from "../UI/ProgressBar";
import secondsToMmSs from "../Utils";
import styles from "./WordDiscriminationPage.module.css";

function WordDiscriminationPage() {
  const [timer, setTimer] = useState(60);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const data = require("../../QuestionCollection/词汇/单词辨析/" +
    id +
    ".json");
  const question = data.data;
  const array = question.options;
  const words = question.options.filter((e) => {
    return e["correct"] === 1;
  });

  const [selectedArray, setSelectedArray] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);

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

  const onClickWordItemHandler = (index) => {
    setSelectedArray((preState) => {
      if (preState.includes(index)) {
        return preState.filter((e) => e !== index);
      } else {
        return [...preState, index];
      }
    });
  };

  const onSumbitHandler = () => {
    setShowAnswer(true);
  };

  const showAnswerResult = (option, index) => {
    if (selectedArray.includes(index) && option["correct"] === 1) {
      return [true, false, false];
    } else if (selectedArray.includes(index) && option["correct"] === 0) {
      return [false, true, false];
    } else if (!selectedArray.includes(index) && option["correct"] === 1) {
      return [false, false, true];
    } else {
      return [false, false, false];
    }
  };

  const itemClassName = (option, index) => {
    return showAnswer
      ? classNames(styles.collectionItem, {
          [styles.orange]: showAnswerResult(option, index)[0],
          [styles.red]: showAnswerResult(option, index)[1],
          [styles.green]: showAnswerResult(option, index)[2],
        })
      : classNames(styles.collectionItem, {
          [styles.orange]: selectedArray.includes(index),
        });
  };

  return (
    <div className={styles.container}>
      <DifficultyLabelAndNext
        difficulty={question.difficultyName}
        arrayType={"wordDiscriminationArray"}
        id={id}
        path={"worddiscrimination"}
      />
      <div onClick={onClickRestartHandler}>
        <h2 className={styles.timer}>{secondsToMmSs(timer)}</h2>
      </div>
      <ProgressBar progressWidth={progressWidth} />
      <h2>{question.title}</h2>
      <div className={styles.collectionView}>
        {array.map((option, index) => (
          <div
            key={index}
            className={itemClassName(option, index)}
            onClick={() => onClickWordItemHandler(index)}
          >
            <p>{option["word"]}</p>
          </div>
        ))}
      </div>
      <button onClick={onSumbitHandler}>Submit</button>
      <div className={styles.collectionView}>
        <p>图例说明：</p>
        <div
          className={classNames(styles.collectionItem, { [styles.red]: true })}
        >
          错误
        </div>
        <div
          className={classNames(styles.collectionItem, {
            [styles.orange]: true,
          })}
        >
          正确
        </div>
        <div
          className={classNames(styles.collectionItem, {
            [styles.green]: true,
          })}
        >
          漏选
        </div>
      </div>
      {showAnswer && (
        <ul>
          {words.map((e, index) => {
            return (
              <li key={index} className={styles.card}>
                <h1>{e["word"]}</h1>
                <div>
                  <font size="+1">美[{e["usPhonetic"]}]</font>
                  <audio controls src={e["usSpeech"]}>
                    <a href={e["usSpeech"]}>Download audio</a>
                  </audio>
                  <font size="+1">英[{e["ukPhonetic"]}]</font>
                  <audio controls src={e["ukSpeech"]}>
                    <a href={e["ukSpeech"]}>Download audio</a>
                  </audio>
                </div>
                <ul>
                  {e["explains"]
                    .slice(1, -1)
                    .split(",")
                    .map((val, index) => {
                      return <li key={index}>{val.slice(1, -1)}</li>;
                    })}
                </ul>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default WordDiscriminationPage;
