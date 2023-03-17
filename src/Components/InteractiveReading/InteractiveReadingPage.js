import classNames from "classnames";
import { Fragment, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DifficultyLabelAndNext from "../UI/DifficultyLabelAndNext/DifficultyLabelAndNext";
import ProgressBar from "../UI/ProgressBar";
import secondsToMmSs from "../Utils";
import styles from "./InteractiveReadingPage.module.css";

const InteractiveReadingPage = () => {
  const seconds = 420;
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [timer, setTimer] = useState(seconds);
  const [showAnswer, setShowAnswer] = useState(false);
  const index = 0;

  const data = require("../../QuestionCollection/阅读/互动阅读/" +
    id +
    ".json");
  const question = data.data;
  const [q1Result, setQ1Result] = useState([]);
  const q1Answer = question.q1.answer;

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

  const onSelectChangeHandler = (event, index) => {
    setQ1Result((pre) => {
      pre[index] = event.target.value;
      return pre;
    });
  };

  var indexInLeft = 0;

  const onClickNextStepHandler = () => {
    setShowAnswer(true);
  };

  const content1 = (
    <div className={styles.content}>
      <div className={styles.left}>
        {question.q1.content.split(" ").map((e, index) => {
          if (e.includes("_")) {
            indexInLeft += 1;
            const indexStr = `${indexInLeft}.`;
            const str =
              indexStr +
              (q1Result[indexInLeft - 1] === undefined
                ? ""
                : " " + q1Result[indexInLeft - 1]);
            const count = e.match(new RegExp("_", "g")).length;
            const suffix = e.length > count ? e.substring(count, e.length) : "";
            return (
              <Fragment>
                <strong key={index} className={styles.strong}>
                  {str}
                </strong>
                <span key={indexInLeft} className={styles.span}>
                  {suffix + " "}
                </span>
              </Fragment>
            );
          } else {
            return (
              <span key={index} className={styles.span}>
                {e + " "}
              </span>
            );
          }
        })}
      </div>
      <div className={styles.center} style={{ flex: showAnswer ? 0.5 : 1 }}>
        <p>请选择最佳选项填空</p>
        {question.q1.options.map((option, index) => (
          <select
            key={index}
            className={classNames(styles.select, {
              [styles.red]: showAnswer
                ? q1Result[index] !== undefined &&
                  q1Result[index].localeCompare(q1Answer[index]) !== 0
                : false,
              [styles.green]: showAnswer
                ? q1Result[index] !== undefined &&
                  q1Result[index].localeCompare(q1Answer[index]) === 0
                : false,
            })}
            onInput={(event) => onSelectChangeHandler(event, index)}
          >
            <option value="">{(index + 1).toString()}.</option>
            {option.map((e, key) => (
              <option key={key}>{e}</option>
            ))}
          </select>
        ))}
      </div>
      {showAnswer && (
        <div className={styles.right}>
          <p>正确答案</p>
          {q1Answer.map((e) => (
            <font size="+2" className={styles.answer}>
              {e}
            </font>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className={styles.container}>
      <DifficultyLabelAndNext
        difficulty={question.difficultyName}
        arrayType={"interactiveArray"}
        id={id}
        path={"interactive"}
      />
      <div onClick={onClickRestartHandler}>
        <h2 style={{ color: "red" }}>{secondsToMmSs(timer)}</h2>
      </div>
      <ProgressBar progressWidth={progressWidth} />
      <p>{"#" + id + "-" + (index + 1)}</p>
      {content1}
      {divider}
      <div
        style={{
          display: showAnswer ? "flex" : "block",
          justifyContent: "space-between",
          textAlign: "end",
        }}
      >
        {showAnswer && (
          <div style={{ display: "flex" }}>
            <div
              className={classNames(styles.example, {
                [styles.red]: true,
              })}
            >
              错误
            </div>
            <div
              className={classNames(styles.example, {
                [styles.green]: true,
              })}
            >
              正确
            </div>
          </div>
        )}
        <button
          style={{ marginTop: "30px", width: "100px", height: "30px" }}
          onClick={onClickNextStepHandler}
        >
          下一步
        </button>
      </div>
    </div>
  );
};

export default InteractiveReadingPage;

const divider = (
  <div
    style={{
      height: "5px",
      width: "100%",
      backgroundColor: "lightGray",
      marginTop: "30px",
      alignSelf: "start",
    }}
  ></div>
);
