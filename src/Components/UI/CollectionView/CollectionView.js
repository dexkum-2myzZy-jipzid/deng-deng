import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./CollectionView.css";

const CollectionView = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const array = searchParams.get("array").split(",");
  const navigate = useNavigate();

  const onClickHandler = (item) => {
    if (type === "speechtopic") {
      navigate(`/speechtopicpage?id=${item}`);
    } else if (type === "speechpicture") {
      navigate(`/speechpicturepage?id=${item}`);
    } else if (type === "writesentence") {
      navigate(`/writesentence?id=${item}`);
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
