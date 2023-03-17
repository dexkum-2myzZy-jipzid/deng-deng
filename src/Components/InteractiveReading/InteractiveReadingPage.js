import classNames from "classnames";
import { Fragment, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DifficultyLabelAndNext from "../UI/DifficultyLabelAndNext/DifficultyLabelAndNext";
import ProgressBar from "../UI/ProgressBar";
import secondsToMmSs from "../Utils";
import styles from "./InteractiveReadingPage.module.css";
import React from "react";

const InteractiveReadingPage = () => {
  const seconds = 420;
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [timer, setTimer] = useState(seconds);
  const [showAnswer, setShowAnswer] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);

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
    setPageIndex((pre) => pre + 1);
  };

  // q1 content
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

  // q2 content
  const [middle, setMiddle] = useState("");
  const [q2Result, setQ2Result] = useState(null);

  const onInputHandler = (e, index) => {
    setQ2Result(e);
    setMiddle(e["sentence"]);
  };

  const onSubmitHandle = () => {
    setShowAnswer((pre) => !pre);
  };

  const content2 = (
    <div className={styles.content}>
      <div className={styles.left}>
        <p>{question.q2.front}</p>
        <div className={styles.middle}>{middle}</div>
        <p>{question.q2.ending}</p>
      </div>
      <div className={styles.right} style={{ flex: 1, marginTop: "20px" }}>
        {question.q2.options.map((e, index) => {
          if (showAnswer) {
            return (
              <label style={e["correct"] === 1 ? { color: "green" } : {}}>
                <input
                  key={index}
                  type="radio"
                  name="q2Answer"
                  value=""
                  onInput={() => onInputHandler(e, index)}
                />
                {e["sentence"]}
              </label>
            );
          } else {
            return (
              <label>
                <input
                  key={index}
                  type="radio"
                  name="q2Answer"
                  value=""
                  onInput={() => onInputHandler(e, index)}
                />
                {e["sentence"]}
              </label>
            );
          }
        })}
      </div>
    </div>
  );

  // q3
  const [selectedText, setSelectedText] = useState("");
  const handleMouseUp = () => {
    const selection = window.getSelection().toString();
    setSelectedText(selection);
  };

  const content3 = (
    <div className={styles.content}>
      <div className={styles.left} onMouseUp={handleMouseUp}>
        {showAnswer ? (
          <p
            dangerouslySetInnerHTML={{
              __html: question.q3.content.replace(
                question.q3.selectAnswer,
                `<span style="background-color: #47b255">${question.q3.selectAnswer}</span>`
              ),
            }}
          />
        ) : (
          <p>{question.q3.content}</p>
        )}
      </div>
      <div className={styles.right} style={{ flex: 1, marginTop: "20px" }}>
        <p>{question.q3.questionContent}</p>
        <textarea
          readonly="readonly"
          autocomplete="off"
          placeholder="在短文中标出答案"
          style={{ minHeight: "54px", height: "54px" }}
          value={selectedText}
        ></textarea>
      </div>
    </div>
  );

  // q4
  const [selectedQ4Text, setSelectedQ4Text] = useState("");
  const handleQ4MouseUp = () => {
    const selection = window.getSelection().toString();
    setSelectedQ4Text(selection);
  };

  const content4 = (
    <div className={styles.content}>
      <div className={styles.left} onMouseUp={handleQ4MouseUp}>
        {showAnswer ? (
          <p
            dangerouslySetInnerHTML={{
              __html: question.q4.content.replace(
                question.q4.selectAnswer,
                `<span style="background-color: #47b255">${question.q4.selectAnswer}</span>`
              ),
            }}
          />
        ) : (
          <p>{question.q4.content}</p>
        )}
      </div>
      <div className={styles.right} style={{ flex: 1, marginTop: "20px" }}>
        <p>{question.q4.questionContent}</p>
        <textarea
          readonly="readonly"
          autocomplete="off"
          placeholder="在短文中标出答案"
          style={{ minHeight: "54px", height: "54px" }}
          value={selectedQ4Text}
        ></textarea>
      </div>
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
      <p>{"#" + id + "-" + (pageIndex + 1)}</p>
      {pageIndex === 0 && content1}
      {pageIndex === 1 && content2}
      {pageIndex === 2 && content3}
      {pageIndex === 3 && content4}
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
      <button onClick={onSubmitHandle}>Submit</button>
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
