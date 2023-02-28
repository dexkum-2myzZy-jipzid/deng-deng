import { useNavigate } from "react-router-dom";
import "./NumberList.css";

const Home = () => {
  const numbers = [
    1281, 1344, 1399, 1456, 1563, 1619, 1665, 1716, 1815, 1866, 1920, 1963,
    2010, 2101, 2142, 2187, 2232, 2279, 2317, 2400, 2439, 2480, 2517, 2596,
    2635, 2680, 2719, 2760, 2802, 2914, 2953, 2992, 3029, 3069, 3108, 3183,
    3213, 3251, 3320, 3352, 3457, 3483, 3562, 3592, 3656, 3844, 3879, 3911,
    4088, 4126, 4162, 4198, 4232, 4271, 4336, 4437, 4541, 4659, 4686, 4743,
    5089, 5121, 5347, 5379, 5445, 5511, 5641, 5670, 5827, 5892, 6011, 6044,
    6133, 6178, 6221, 6268, 6717, 6786, 6885, 7013, 7030, 7049, 7071, 7103,
    7152, 7183, 7236, 7374, 7393, 7432, 7519, 7545,
  ];
  const navigate = useNavigate();

  const handleClick = (number) => {
    navigate(`/speechtopicpage?id=${number}`);
  };

  return (
    <ul>
      {numbers.map((number) => (
        <li
          key={number}
          className="number-item"
          onClick={() => handleClick(number)}
        >
          {number}
        </li>
      ))}
    </ul>
  );
};

export default Home;
