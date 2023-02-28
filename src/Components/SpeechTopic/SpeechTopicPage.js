import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function SpeechTopicPage() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [timer, setTimer] = useState(30);
  const [showAnswer, setShowAnswer] = useState(false);
  const [question, setQuestion] = useState(null);
  const [options, setOptions] = useState(null);

  useEffect(() => {
    var data = require("./看题演讲/" + id + ".json");
    setQuestion(data.data);
    setOptions(data.data.options);
  }, [id]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer !== 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleCountdownClick = () => {
    setTimer(30);
    setShowAnswer(false);
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleHideAnswer = () => {
    setShowAnswer(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>看题演讲</h1>
      <div onClick={handleCountdownClick}>
        <p style={styles.timer}>{timer}s</p>
      </div>
      <h3 style={styles.title}>
        Ready to answer the following questions in at least 30 seconds
      </h3>
      {question && (
        <div style={styles.container}>
          <p style={styles.question}>{question.subject}</p>
          {options && (
            <ul style={styles.question}>
              {options.map((e) => (
                <li key={e.content} style={styles.list}>
                  {e.content}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      {showAnswer ? (
        <div style={styles.answer}>
          <button style={styles.button} onClick={handleHideAnswer}>
            Hide Answer
          </button>
          {question && <p>{question.answer}</p>}
        </div>
      ) : (
        <div style={styles.answer}>
          <button style={styles.button} onClick={handleShowAnswer}>
            Show Answer
          </button>
        </div>
      )}
    </div>
  );
}

export default SpeechTopicPage;

const styles = {
  container: {
    backgroundColor: "#f2f2f2",
    borderRadius: "10px",
    border: "1px solid #ccc",
    padding: "20px",
    margin: "20px",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
  },
  timer: {
    color: "#FF0000",
    textAlign: "center",
  },
  question: {
    fontSize: "18px",
    marginBottom: "20px",
    textAlign: "center",
  },
  answer: {
    textAlign: "center",
  },
  button: {
    marginTop: "20px",
    textAlign: "center",
    justifyContent: "center",
  },
};
