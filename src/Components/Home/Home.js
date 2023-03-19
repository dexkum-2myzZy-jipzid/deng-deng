import { Menu } from "antd";
import Questions from "./Questions";
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

  // const onClickHandler1 = (type) => {
  //   if (type === "speechtopic") {
  //     const myArrayString = topicArray.join(",");
  //     navigate(`/collectionview?type=${type}&array=${myArrayString}`);
  //   } else if (type === "speechpicture") {
  //     const myArrayString = pictureArray.join(",");
  //     navigate(`/collectionview?type=${type}&array=${myArrayString}`);
  //   } else if (type === "writesentence") {
  //     const myArrayString = sentenceArray.join(",");
  //     navigate(`/collectionview?type=${type}&array=${myArrayString}`);
  //   } else if (type === "worddiscrimination") {
  //     const myArrayString = wordDiscriminationArray.join(",");
  //     navigate(`/collectionview?type=${type}&array=${myArrayString}`);
  //   } else if (type === "listentodistinguishwords") {
  //     const myArrayString = listentodistinguishwordsArray.join(",");
  //     navigate(`/collectionview?type=${type}&array=${myArrayString}`);
  //   } else if (type === "fillwords") {
  //     const myArrayString = fillWordsArray.join(",");
  //     navigate(`/collectionview?type=${type}&array=${myArrayString}`);
  //   } else if (type === "interactive") {
  //     const myArrayString = interactiveArray.join(",");
  //     navigate(`/collectionview?type=${type}&array=${myArrayString}`);
  //   } else if (type === "writinginterview") {
  //     const myArrayString = writingInterviewArray.join(",");
  //     navigate(`/collectionview?type=${type}&array=${myArrayString}`);
  //   } else if (type === "oralinterview") {
  //     const myArrayString = oralInterviewArray.join(",");
  //     navigate(`/collectionview?type=${type}&array=${myArrayString}`);
  //   } else if (type === "dictatesentence") {
  //     const myArrayString = dictateSentencesArray.join(",");
  //     navigate(`/collectionview?type=${type}&array=${myArrayString}`);
  //   } else if (type === "lecture") {
  //     const myArrayString = lectureArray.join(",");
  //     navigate(`/collectionview?type=${type}&array=${myArrayString}`);
  //   } else if (type === "shortessay") {
  //     const myArrayString = shortEssayArray.join(",");
  //     navigate(`/collectionview?type=${type}&array=${myArrayString}`);
  //   }
  // };

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

  const [item, setItem] = useState(array[0]);

  function onClickMenuItem(e) {
    console.log(e);
    const title = e.keyPath[0];
    const item = array.filter((e) => e["title"].localeCompare(title) === 0);
    setItem(item[0]);
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

  return (
    <div className={styles.container}>
      <Menu
        defaultOpenKeys={["0"]}
        defaultSelectedKeys={["单词辨析"]}
        style={{ width: 500 }}
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
      <CollectionView type={item["type"]} array={item["array"]} />
    </div>
  );
};

export default Home;
