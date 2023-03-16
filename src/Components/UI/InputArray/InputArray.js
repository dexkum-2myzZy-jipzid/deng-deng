import classNames from "classnames";
import React, { useState, useRef, Fragment } from "react";
import styles from "./InputArray.module.css";

function InputArray(props) {
  //展示单词数量
  const defaultLetterCnt = props.partBlank.indexOf("_");
  const inputs = Array.from({ length: props.word.length }, (_, i) =>
    i < defaultLetterCnt ? props.partBlank[i] : ""
  );
  const [values, setValues] = useState(inputs);
  const inputRefs = useRef([]);
  const wrong =
    props.showAnswer && values.join("").localeCompare(props.word) !== 0;

  const suffix =
    props.partBlank.length > props.word.length
      ? props.partBlank.substring(props.word.length, props.partBlank.length)
      : "  ";

  const handleChange = (index, event) => {
    const newValues = [...values];
    newValues[index] = event.target.value;
    setValues(newValues);

    if (event.target.value.length === 1 && index < values.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const styleColors = (value, index) => {
    if (value.length === 0) {
      return [false, false, true];
    }
    const ret = value.localeCompare(props.word[index]);
    if (ret === 0) {
      return [true, false, false];
    } else {
      return [false, true, false];
    }
  };

  return (
    <Fragment>
      {values.map((value, index) => (
        <input
          key={index}
          className={
            props.showAnswer && index >= defaultLetterCnt
              ? classNames(styles.input, {
                  [styles.orange]: styleColors(value, index)[0],
                  [styles.red]: styleColors(value, index)[1],
                  [styles.green]: styleColors(value, index)[2],
                })
              : styles.input
          }
          type="text"
          maxLength="1"
          value={value}
          onChange={(event) => handleChange(index, event)}
          ref={(el) => (inputRefs.current[index] = el)}
          disabled={index < defaultLetterCnt ? true : false}
        />
      ))}
      {wrong && (
        <span style={{ color: "green", fontWeight: "bold" }}>
          {" " + props.word}
        </span>
      )}
      <span
        style={{
          display: "inline-block",
          paddingTop: "10px",
          margin: "10px 10px 10px 0",
        }}
      >
        {suffix}
      </span>
    </Fragment>
  );
}

export default InputArray;
