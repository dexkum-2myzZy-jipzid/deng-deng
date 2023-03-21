import classNames from "classnames";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CollectionView.module.css";

const CollectionView = ({ type, array, difficulty }) => {
  const navigate = useNavigate();

  console.log(difficulty);
  console.log(array);

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
    <div className={styles.collectionView}>
      {array.length > 0 &&
        array.split(",").map((item) => (
          <div
            className={classNames(styles.collectionItem, {
              [styles.red]: difficulty === 3,
              [styles.orange]: difficulty === 2,
              [styles.green]: difficulty === 1,
              [styles.gray]: difficulty === 4,
            })}
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
