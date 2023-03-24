import classNames from "classnames";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CollectionView.module.css";
import { MdOutlineDownloadDone } from "react-icons/md";

const CollectionView = ({ type, array, difficulty }) => {
  const navigate = useNavigate();
  const user = localStorage.getItem("duolinggo_user");
  let completedQuestions = [];
  if (user === null) {
    const value = {
      userId: (Math.random() * 1000).toString(),
    };
    localStorage.setItem("duolinggo_user", JSON.stringify(value));
  } else {
    const userJson = JSON.parse(user);
    const tmp = userJson[type];
    if (tmp !== undefined) {
      completedQuestions = tmp;
    }
  }

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
            {completedQuestions.indexOf(item) !== -1 && (
              <MdOutlineDownloadDone />
            )}
          </div>
        ))}
    </div>
  );
};

export default CollectionView;
