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

  const onClickNextStepHandler = () => {
    setPageIndex((pre) => pre + 1);
    if (pageIndex === 5) {
      setShowAnswer(true);
    }
  };

  // q1 content
  const [q1Result, setQ1Result] = useState([]);
  const q1Answer = question.q1.answer;

  const onSelectChangeHandler = (event, index) => {
    setQ1Result((pre) => {
      pre[index] = event.target.value;
      return pre;
    });
  };

  var indexInLeft = 0;

  const content1 = (
    <div className={styles.content}>
      <div className={styles.left}>
        {question.q1.content.split(" ").map((e, index) => {
          if (e.includes("_")) {
            indexInLeft += 1;
            const indexStr = `${indexInLeft}`;
            const str =
              q1Result[indexInLeft - 1] === undefined
                ? ""
                : q1Result[indexInLeft - 1];
            const count = e.match(new RegExp("_", "g")).length;
            const suffix = e.length > count ? e.substring(count, e.length) : "";
            const correct =
              str.localeCompare(question.q1.answer[indexInLeft - 1]) === 0;
            return (
              <Fragment>
                <strong key={indexInLeft} className={styles.strong}>
                  {indexStr}
                </strong>
                {(str.length > 1 || showAnswer) && (
                  <strong
                    key={-indexInLeft}
                    className={classNames(styles.strongText, {
                      [styles.red]: showAnswer && !correct,
                      [styles.green]: showAnswer && correct,
                    })}
                  >
                    {str}
                  </strong>
                )}
                {showAnswer && !correct && (
                  <strong
                    key={indexInLeft + 20}
                    className={classNames(styles.strongText, {
                      [styles.green]: true,
                    })}
                  >
                    {question.q1.answer[indexInLeft - 1]}
                  </strong>
                )}
                <span key={indexInLeft + 40} className={styles.span}>
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
      <div className={styles.center}>
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
            value={q1Result[index] !== undefined && q1Result[index]}
          >
            <option key={index} value="">
              {(index + 1).toString()}.
            </option>
            {option.map((e, key) => (
              <option key={key}>{e}</option>
            ))}
          </select>
        ))}
      </div>
    </div>
  );

  // q2 content
  const [middle, setMiddle] = useState("");
  const [q2Result, setQ2Result] = useState(null);

  const onInputHandler = (e, index) => {
    setQ2Result(e);
    setMiddle(e["sentence"]);
  };

  // const onSubmitHandle = () => {
  //   setShowAnswer((pre) => !pre);
  // };

  const content2 = (
    <div className={styles.content}>
      <div className={styles.left}>
        <p>{question.q2.front}</p>
        <div
          className={styles.middle}
          style={{ height: middle.length > 1 ? "auto" : "80px" }}
        >
          {q2Result && q2Result["sentence"] !== undefined
            ? q2Result["sentence"]
            : ""}
        </div>
        <p>{question.q2.ending}</p>
      </div>
      <div className={styles.q2right}>
        <p>选句填空</p>
        {question.q2.options.map((e, index) => {
          if (showAnswer) {
            return (
              <label
                className={classNames(styles.selectLabel, {
                  [styles.red]:
                    q2Result &&
                    q2Result["correct"] === 0 &&
                    e["sentence"].localeCompare(q2Result["sentence"]) === 0,
                  [styles.green]: e["correct"] === 1,
                })}
              >
                <input
                  key={index}
                  type="radio"
                  name="q2Answer"
                  value=""
                  checked={
                    q2Result &&
                    e["sentence"].localeCompare(q2Result["sentence"]) === 0
                      ? true
                      : false
                  }
                  onInput={() => onInputHandler(e, index)}
                />
                {e["sentence"]}
              </label>
            );
          } else {
            return (
              <label className={styles.label}>
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

  const handleTouchEnd = () => {
    const selection = window.getSelection().toString();
    setSelectedText(selection);
  };

  const content3 = (
    <div className={styles.content}>
      <div
        className={styles.left}
        onMouseUp={handleMouseUp}
        onTouchEnd={handleTouchEnd}
      >
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
      <div className={styles.q2right}>
        <p>{question.q3.questionContent}</p>
        <textarea
          readonly="readonly"
          autocomplete="off"
          placeholder="在短文中标出答案"
          style={{ minHeight: "54px", height: "150px", width: "400px" }}
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
  const handleQ4TouchEnd = () => {
    const selection = window.getSelection().toString();
    setSelectedText(selection);
  };

  const content4 = (
    <div className={styles.content}>
      <div
        className={styles.left}
        onMouseUp={handleQ4MouseUp}
        onTouchEnd={handleQ4TouchEnd}
      >
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
      <div className={styles.q2right}>
        <p>{question.q4.questionContent}</p>
        <textarea
          readonly="readonly"
          autocomplete="off"
          placeholder="在短文中标出答案"
          style={{ minHeight: "54px", height: "150px", width: "400px" }}
          value={selectedQ4Text}
        ></textarea>
      </div>
    </div>
  );

  //q5
  const [q5Result, setQ5Result] = useState(null);

  const onInputQ5Handler = (e, index) => {
    setQ5Result(e);
  };

  const content5 = (
    <div className={styles.content}>
      <div className={styles.left}>
        <p>{question.q5.content}</p>
      </div>
      <div className={styles.q2right}>
        <p>选出段落大意</p>
        {question.q5.options.map((e, index) => {
          if (showAnswer) {
            return (
              <label
                className={classNames(styles.selectLabel, {
                  [styles.red]:
                    q5Result &&
                    q5Result["correct"] === 0 &&
                    e["sentence"].localeCompare(q5Result["sentence"]) === 0,
                  [styles.green]: e["correct"] === 1,
                })}
              >
                <input
                  key={index}
                  type="radio"
                  name="q5Answer"
                  value=""
                  checked={
                    q5Result &&
                    e["sentence"].localeCompare(q5Result["sentence"]) === 0
                      ? true
                      : false
                  }
                  onInput={() => onInputQ5Handler(e, index)}
                />
                {e["sentence"]}
              </label>
            );
          } else {
            return (
              <label className={styles.label}>
                <input
                  key={index}
                  type="radio"
                  name="q5Answer"
                  value=""
                  onInput={() => onInputQ5Handler(e, index)}
                />
                {e["sentence"]}
              </label>
            );
          }
        })}
      </div>
    </div>
  );

  //q6
  const [q6Result, setQ6Result] = useState(null);

  const onInputQ6Handler = (e, index) => {
    setQ6Result(e);
  };

  const content6 = (
    <div className={styles.content}>
      <div className={styles.left}>
        <p>{question.q6.content}</p>
      </div>
      <div className={styles.q2right}>
        <p>请选出这篇短文最适合的标题</p>
        {question.q6.options.map((e, index) => {
          if (showAnswer) {
            return (
              <label
                className={classNames(styles.selectLabel, {
                  [styles.red]:
                    q6Result &&
                    q6Result["correct"] === 0 &&
                    e["sentence"].localeCompare(q6Result["sentence"]) === 0,
                  [styles.green]: e["correct"] === 1,
                })}
              >
                <input
                  key={index}
                  type="radio"
                  name="q6Answer"
                  value=""
                  checked={
                    q6Result &&
                    e["sentence"].localeCompare(q6Result["sentence"]) === 0
                      ? true
                      : false
                  }
                  onInput={() => onInputQ6Handler(e, index)}
                />
                {e["sentence"]}
              </label>
            );
          } else {
            return (
              <label className={styles.label}>
                <input
                  key={index}
                  type="radio"
                  name="q6Answer"
                  value=""
                  onInput={() => onInputQ6Handler(e, index)}
                />
                {e["sentence"]}
              </label>
            );
          }
        })}
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
      <p>{"#" + id + "-" + ((pageIndex + 1) % 7)}</p>
      {(pageIndex === 0 || pageIndex === 6) && content1}
      {(pageIndex === 1 || pageIndex === 7) && content2}
      {(pageIndex === 2 || pageIndex === 8) && content3}
      {(pageIndex === 3 || pageIndex === 9) && content4}
      {(pageIndex === 4 || pageIndex === 10) && content5}
      {(pageIndex === 5 || pageIndex === 11) && content6}
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
        {pageIndex < 11 && (
          <button
            style={{ marginTop: "30px", width: "100px", height: "30px" }}
            onClick={onClickNextStepHandler}
          >
            {pageIndex === 5 ? "提交答案" : "下一步"}
          </button>
        )}
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
