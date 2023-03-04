import React from "react";

function ProgressBar(props) {
  return (
    <div
      style={{
        height: "5px",
        width: "100%",
        backgroundColor: "lightGray",
        marginTop: "10px",
        alignSelf: "start",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${props.progressWidth}%`,
          backgroundColor: "orange",
        }}
      />
    </div>
  );
}

export default ProgressBar;
