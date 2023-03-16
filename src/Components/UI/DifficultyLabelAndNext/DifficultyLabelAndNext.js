import React from "react";
import Questions from "../../Home/Questions";

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

  const onClickNextHandler = (arrayType, id, path) => {
    const array = Questions()[arrayType];
    const index = array.indexOf(parseInt(id));
    if (index < array.length - 1) {
      const item = array[index + 1];
      window.location.replace(`/${path}?id=${item}`);
    }
  };

  const onClickPreviousHandler = (arrayType, id, path) => {
    const array = Questions()[arrayType];
    const index = array.indexOf(parseInt(id));
    if (index > 0) {
      const item = array[index - 1];
      window.location.replace(`/${path}?id=${item}`);
    }
  };

  return (
    <div style={container}>
      <div style={label}>{props.difficulty}</div>
      <font size="+2" style={{ fontWeight: "bold" }}>
        题号：{props.id}
      </font>
      <div>
        <button
          style={button}
          onClick={() =>
            onClickPreviousHandler(props.arrayType, props.id, props.path)
          }
        >
          {"< Previous"}
        </button>
        <button
          style={button}
          onClick={() =>
            onClickNextHandler(props.arrayType, props.id, props.path)
          }
        >
          {"Next >"}
        </button>
      </div>
    </div>
  );
}

export default DifficultyLabelAndNext;
