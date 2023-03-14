import { useNavigate } from "react-router-dom";
import "./NumberList.css";
import Questions from "./Questions";

const Home = () => {
  const {
    topicArray,
    pictureArray,
    sentenceArray,
    wordDiscriminationArray,
    listentodistinguishwordsArray,
  } = Questions();
  const navigate = useNavigate();

  const onClickHandler = (type) => {
    if (type === "speechtopic") {
      const myArrayString = topicArray.join(",");
      navigate(`/collectionview?type=${type}&array=${myArrayString}`);
    } else if (type === "speechpicture") {
      const myArrayString = pictureArray.join(",");
      navigate(`/collectionview?type=${type}&array=${myArrayString}`);
    } else if (type === "writesentence") {
      const myArrayString = sentenceArray.join(",");
      navigate(`/collectionview?type=${type}&array=${myArrayString}`);
    } else if (type === "worddiscrimination") {
      const myArrayString = wordDiscriminationArray.join(",");
      navigate(`/collectionview?type=${type}&array=${myArrayString}`);
    } else if (type === "listentodistinguishwords") {
      const myArrayString = listentodistinguishwordsArray.join(",");
      navigate(`/collectionview?type=${type}&array=${myArrayString}`);
    }
  };

  const list = [
    { type: "speechtopic", title: "看题演讲" },
    { type: "speechpicture", title: "看图演讲" },
    { type: "writesentence", title: "看图写句" },
    { type: "worddiscrimination", title: "单词辨析" },
    { type: "listentodistinguishwords", title: "听音辩词" },
  ];

  return (
    <ul>
      {list.map((e) => (
        <li
          key={e["type"]}
          className="number-item"
          onClick={() => onClickHandler(e["type"])}
        >
          {e["title"]}
        </li>
      ))}
    </ul>
  );
};

export default Home;
