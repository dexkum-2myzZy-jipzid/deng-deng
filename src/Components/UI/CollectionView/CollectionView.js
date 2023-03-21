// Refactored CollectionView.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./CollectionView.css";

const CollectionView = ({ type, array, difficulty }) => {
  const navigate = useNavigate();

  const onClickHandler = (item) => {
    const routes = {
      speechtopic: "/speechtopic",
      speechpicture: "/speechpicture",
      writesentence: "/writesentence",
      worddiscrimination: "/worddiscrimination",
      listentodistinguishwords: "/listentodistinguishwords",
      fillwords: "/fillwords",
      interactive: "/interactive",
      writinginterview: "/writinginterview",
      oralinterview: "/oralinterview",
      dictatesentence: "/dictatesentence",
      lecture: "/lecture",
      shortessay: "/shortessay",
    };

    if (routes[type]) {
      navigate(`${routes[type]}?id=${item}&difficulty=${difficulty}`);
    }
  };

  return (
    <div className="collection-view">
      {array.split(",").map((item) => (
        <div
          className="collection-item"
          key={item}
          onClick={() => onClickHandler(item)}
        >
          <p>{item}</p>
        </div>
      ))}
    </div>
  );
};

export default CollectionView;
