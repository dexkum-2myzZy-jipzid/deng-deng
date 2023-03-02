import React from "react";

function DifficultyLabel(props) {
  const textStyles = {
    border: "1px solid green",
    backgroundColor: "#F7FEEE",
    color: "green",
    marginTop: "10px",
    width: "150px",
    height: "40px",
  };

  return (
    <div style={textStyles}>
      <p>{props.difficulty}</p>
    </div>
  );
}

export default DifficultyLabel;
