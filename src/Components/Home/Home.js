import { useNavigate } from "react-router-dom";
import "./NumberList.css";

const Home = () => {
  const topicArray = [
    1281, 1344, 1399, 1456, 1563, 1619, 1665, 1716, 1815, 1866, 1920, 1963,
    2010, 2101, 2142, 2187, 2232, 2279, 2317, 2400, 2439, 2480, 2517, 2596,
    2635, 2680, 2719, 2760, 2802, 2914, 2953, 2992, 3029, 3069, 3108, 3183,
    3213, 3251, 3320, 3352, 3457, 3483, 3562, 3592, 3656, 3844, 3879, 3911,
    4088, 4126, 4162, 4198, 4232, 4271, 4336, 4437, 4541, 4659, 4686, 4743,
    5089, 5121, 5347, 5379, 5445, 5511, 5641, 5670, 5827, 5892, 6011, 6044,
    6133, 6178, 6221, 6268, 6717, 6786, 6885, 7013, 7030, 7049, 7071, 7103,
    7152, 7183, 7236, 7374, 7393, 7432, 7519, 7545,
  ];

  const pictureArray = [
    1280, 1343, 1398, 1455, 1509, 1562, 1618, 1664, 1762, 1814, 1865, 1919,
    1962, 2009, 2056, 2100, 2141, 2186, 2231, 2316, 2355, 2399, 2438, 2479,
    2558, 2595, 2634, 2679, 2718, 2759, 2801, 2875, 2913, 2952, 2991, 3028,
    3068, 3107, 3146, 3182, 3212, 3250, 3291, 3319, 3390, 3422, 3456, 3500,
    3530, 3561, 3591, 3622, 3688, 3814, 3843, 3944, 3979, 4087, 4125, 4161,
    4197, 4270, 4335, 4369, 4471, 4507, 4540, 4574, 4603, 4685, 4716, 4742,
    4831, 5088, 5120, 5151, 5247, 5285, 5346, 5378, 5444, 5479, 5510, 5546,
    5581, 5669, 5761, 5795, 5826, 5861, 5891, 5946, 6132, 6523, 6546, 6574,
    6608, 6690, 6716, 6785, 6826, 6844, 6884, 6908, 6934, 6957, 7012, 7048,
    7070, 7086, 7102, 7151, 7182, 7248, 7304, 7333, 7353, 7373, 7392, 7411,
    7431,
  ];
  const navigate = useNavigate();

  const onClickHandler = (type) => {
    if (type === "speechtopic") {
      const myArrayString = topicArray.join(",");
      navigate(`/collectionview?type=${type}&array=${myArrayString}`);
    } else if (type === "speechpicture") {
      const myArrayString = pictureArray.join(",");
      navigate(`/collectionview?type=${type}&array=${myArrayString}`);
    }
  };

  return (
    <ul>
      <li
        key={"speechtopicpage"}
        className="number-item"
        onClick={() => onClickHandler("speechtopic")}
      >
        看题演讲
      </li>
      <li
        key={"speechpicture"}
        className="number-item"
        onClick={() => onClickHandler("speechpicture")}
      >
        看图演讲
      </li>
    </ul>
  );
};

export default Home;
