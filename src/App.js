import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./Components/Home/Home";
import SpeechTopicPage from "./Components/SpeechTopic/SpeechTopicPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/speechtopicpage" element={<SpeechTopicPage />}></Route>
    </Routes>
  );
}

export default App;
