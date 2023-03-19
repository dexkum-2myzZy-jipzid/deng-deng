import React from "react";
import { useNavigate } from "react-router-dom";
import "./CollectionView.css";

const CollectionView = (props) => {
  const type = props.type;
  const array = props.array.split(",");
  const navigate = useNavigate();

  const onClickHandler = (item) => {
    if (type === "speechtopic") {
      navigate(`/speechtopicpage?id=${item}`);
    } else if (type === "speechpicture") {
      navigate(`/speechpicturepage?id=${item}`);
    } else if (type === "writesentence") {
      navigate(`/writesentence?id=${item}`);
    } else if (type === "worddiscrimination") {
      navigate(`/worddiscrimination?id=${item}`);
    } else if (type === "listentodistinguishwords") {
      navigate(`/listentodistinguishwords?id=${item}`);
    } else if (type === "fillwords") {
      navigate(`/fillwords?id=${item}`);
    } else if (type === "interactive") {
      navigate(`/interactive?id=${item}`);
    } else if (type === "writinginterview") {
      navigate(`/writinginterview?id=${item}`);
    } else if (type === "oralinterview") {
      navigate(`/oralinterview?id=${item}`);
    } else if (type === "dictatesentence") {
      navigate(`/dictatesentence?id=${item}`);
    } else if (type === "lecture") {
      navigate(`/lecture?id=${item}`);
    } else if (type === "shortessay") {
      navigate(`/shortessay?id=${item}`);
    }
  };

  return (
    <div className="collection-view">
      {array.map((item) => (
        <div
          className="collection-item"
          key={item}
          onClick={() => onClickHandler(item)}
        >
          <p>{item}</p>
          {/* <p>{item.description}</p> */}
          {/* <img src={item.imageUrl} alt={item.title} /> */}
        </div>
      ))}
    </div>
  );
};

export default CollectionView;
