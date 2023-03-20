import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import DifficultyLabelAndNext from "../UI/DifficultyLabelAndNext/DifficultyLabelAndNext";
import styles from "./ListeningToDistinguishWordsPage.module.css";
import secondsToMmSs from "../Utils";
import ProgressBar from "../UI/ProgressBar";
import { MdVolumeUp } from "react-icons/md"; // speaker icon
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im"; // check icon
import classNames from "classnames";

const ListenToDistinguishWordsPage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const difficulty = searchParams.get("difficulty");
  const [timer, setTimer] = useState(90);
  const [selectedArray, setSelectedArray] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);

  const data = require("../../QuestionCollection/词汇/听音辩词/" +
    id +
    ".json");
  const question = data.data;
  const array = question.options;
  const words = question.options.filter((e) => {
    return e["correct"] === 1;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer === 0 ? 0 : prevTimer - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const onClickRestartHandler = () => {
    setTimer(90);
  };

  const progressWidth = (1.0 - timer / 90) * 100;

  const onClickSpeakerHander = (url) => {
    const sound = new Audio(url);
    sound.play();
  };

  const onClickUncheckHandler = (index) => {
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
      ? classNames(styles.check, {
          [styles.orange]: showAnswerResult(option, index)[0],
          [styles.red]: showAnswerResult(option, index)[1],
          [styles.green]: showAnswerResult(option, index)[2],
        })
      : classNames(styles.check);
  };

  return (
    <div className={styles.container}>
      <DifficultyLabelAndNext
        difficultyName={question.difficultyName}
        difficulty={difficulty}
        id={id}
        path={"listentodistinguishwords"}
      />
      <div onClick={onClickRestartHandler}>
        <h2 className={styles.timer}>{secondsToMmSs(timer)}</h2>
      </div>
      <ProgressBar progressWidth={progressWidth} />
      <div className={styles.collection}>
        {array.map((e, index) => (
          <div className={styles.collectionItem}>
            <div
              className={styles.speaker}
              onClick={() => onClickSpeakerHander(e["voice"])}
            >
              <MdVolumeUp />
            </div>
            <div className={itemClassName(e, index)}>
              {selectedArray.includes(index) ? (
                <ImCheckboxChecked
                  onClick={() => onClickUncheckHandler(index)}
                />
              ) : (
                <ImCheckboxUnchecked
                  onClick={() => onClickUncheckHandler(index)}
                />
              )}
            </div>
          </div>
        ))}
      </div>
      <button onClick={onSumbitHandler}>Submit</button>
      <div className={styles.collection}>
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
              e["word"] !== undefined && (
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
                    {e["explains"] !== null &&
                      e["explains"]
                        .slice(1, -1)
                        .split(",")
                        .map((val, index) => {
                          return <li key={index}>{val.slice(1, -1)}</li>;
                        })}
                  </ul>
                </li>
              )
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ListenToDistinguishWordsPage;
