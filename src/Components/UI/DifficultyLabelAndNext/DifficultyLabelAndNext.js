import React from "react";
import { useNavigate } from "react-router";
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

  const navigate = useNavigate();

  const clickNextHandler = (arrayType, id, path) => {
    const array = Questions()[arrayType];
    const index = array.indexOf(parseInt(id));
    if (index < array.length - 1) {
      const item = array[index + 1];
      navigate(`/${path}?id=${item}`);
      window.location.reload(true);
    }
  };

  return (
    <div style={container}>
      <div style={label}>{props.difficulty}</div>
      <button
        style={button}
        onClick={() => clickNextHandler(props.arrayType, props.id, props.path)}
      >
        Next
      </button>
    </div>
  );
}

export default DifficultyLabelAndNext;
