import { Menu } from "antd";
import Questions from "./Questions";
import Difficulty from "./Difficulty";
import styles from "./Home.module.css";
import CollectionView from "../UI/CollectionView/CollectionView";
import { useState } from "react";
import {
  FontColorsOutlined,
  EditOutlined,
  TeamOutlined,
  AudioOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

const Home = () => {
  const {
    topicArray,
    pictureArray,
    sentenceArray,
    wordDiscriminationArray,
    listentodistinguishwordsArray,
    fillWordsArray,
    interactiveArray,
    writingInterviewArray,
    oralInterviewArray,
    dictateSentencesArray,
    lectureArray,
    shortEssayArray,
  } = Questions();

  const array = [
    { type: "speechtopic", title: "看题演讲", array: topicArray.join(",") },
    { type: "speechpicture", title: "看图演讲", array: pictureArray.join(",") },
    {
      type: "writesentence",
      title: "看图写句",
      array: sentenceArray.join(","),
    },
    {
      type: "worddiscrimination",
      title: "单词辨析",
      array: wordDiscriminationArray.join(","),
    },
    {
      type: "listentodistinguishwords",
      title: "听音辩词",
      array: listentodistinguishwordsArray.join(","),
    },
    { type: "fillwords", title: "单词填空", array: fillWordsArray.join(",") },
    {
      type: "interactive",
      title: "互动阅读",
      array: interactiveArray.join(","),
    },
    {
      type: "writinginterview",
      title: "写作面试",
      array: writingInterviewArray.join(","),
    },
    {
      type: "oralinterview",
      title: "口语面试",
      array: oralInterviewArray.join(","),
    },
    {
      type: "dictatesentence",
      title: "听写句子",
      array: dictateSentencesArray.join(","),
    },
    { type: "lecture", title: "听题演讲", array: lectureArray.join(",") },
    { type: "shortessay", title: "小作文", array: shortEssayArray.join(",") },
  ];

  const menuItems = ["词汇", "阅读", "听力", "口语", "写作", "面试"];
  const menuSubItems = [
    ["单词辨析", "听音辩词"],
    ["单词填空", "互动阅读"],
    ["听写句子"],
    ["听题演讲", "看题演讲", "看图演讲"],
    ["看图写句", "小作文"],
    ["写作面试", "口语面试"],
  ];

  const [item, setItem] = useState(array[3]);
  const [difficulty, setDifficulty] = useState(0);

  function onClickMenuItem(e) {
    const title = e.keyPath[0];
    const item = array.find((e) => e["title"].localeCompare(title) === 0);
    setItem(item);
    setDifficulty(0);
  }

  const { SubMenu } = Menu;

  const icons = [
    <FontColorsOutlined />,
    <LaptopOutlined />,
    <NotificationOutlined />,
    <AudioOutlined />,
    <EditOutlined />,
    <TeamOutlined />,
  ];

  const onClickDifficultyHandler = (difficultyIndex) => {
    const list = Difficulty()[item["type"]][difficultyIndex];
    setItem((pre) => {
      return { ...pre, array: list.join(",") };
    });
    setDifficulty(difficultyIndex);
  };

  return (
    <div className={styles.container}>
      <Menu
        defaultOpenKeys={["0"]}
        defaultSelectedKeys={["单词辨析"]}
        style={{ flex: 1 }}
        mode="inline"
        forceSubMenuRender={true}
      >
        {menuItems.map((e, index) => {
          return (
            <SubMenu key={index} icon={icons[index]} title={e}>
              {menuSubItems[index].map((v) => (
                <Menu.Item key={v} onClick={(e) => onClickMenuItem(e)}>
                  {v}
                </Menu.Item>
              ))}
            </SubMenu>
          );
        })}
      </Menu>
      <div style={{ flex: 9 }}>
        <div className={styles.header}>
          <div
            className={styles.button}
            style={{ color: "black" }}
            onClick={() => onClickDifficultyHandler(0)}
          >
            全部
          </div>
          <div
            className={styles.button}
            style={{ backgroundColor: "#fc0d1b" }}
            onClick={() => onClickDifficultyHandler(3)}
          >
            难（120以上）
          </div>
          <div
            className={styles.button}
            style={{ backgroundColor: "#f8812e" }}
            onClick={() => onClickDifficultyHandler(2)}
          >
            一般（105~115）
          </div>
          <div
            className={styles.button}
            style={{ backgroundColor: "#47b255" }}
            onClick={() => onClickDifficultyHandler(1)}
          >
            简单（100以下）
          </div>
          <div
            className={styles.button}
            onClick={() => onClickDifficultyHandler(4)}
          >
            难度不明确
          </div>
        </div>
        <CollectionView
          type={item["type"]}
          array={item["array"]}
          difficulty={difficulty}
        />
      </div>
    </div>
  );
};

export default Home;
