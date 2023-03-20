import React from "react";
import Difficulty from "../../Home/Difficulty";

function DifficultyLabelAndNext(props) {
  const container = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  };

  const label = {
    border: "1px solid lightGrey",
    backgroundColor: "white",
    width: "150px",
    height: "40px",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  };

  const button = {
    border: "1px solid lightGrey",
    backgroundColor: "white",
    width: "150px",
    height: "40px",
  };

  const onClickNextHandler = (id, path) => {
    const array = Difficulty()[path][props.difficulty];
    const index = array.indexOf(parseInt(id));
    if (index < array.length - 1) {
      const item = array[index + 1];
      window.location.replace(
        `/${path}?id=${item}&difficulty=${props.difficulty}`
      );
    }
  };

  const onClickPreviousHandler = (id, path) => {
    const array = Difficulty()[path][props.difficulty];
    const index = array.indexOf(parseInt(id));
    if (index > 0) {
      const item = array[index - 1];
      window.location.replace(
        `/${path}?id=${item}&difficulty=${props.difficulty}`
      );
    }
  };

  return (
    <div style={container}>
      {props.difficultyName && <div style={label}>{props.difficultyName}</div>}
      <font size="+2" style={{ fontWeight: "bold" }}>
        题号：{props.id}
      </font>
      <div>
        <button
          style={button}
          onClick={() => onClickPreviousHandler(props.id, props.path)}
        >
          {"< Previous"}
        </button>
        <button
          style={button}
          onClick={() => onClickNextHandler(props.id, props.path)}
        >
          {"Next >"}
        </button>
      </div>
    </div>
  );
}

export default DifficultyLabelAndNext;
