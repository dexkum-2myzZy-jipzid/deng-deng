import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./Components/Home/Home";
import SpeechTopicPage from "./Components/SpeechTopic/SpeechTopicPage";
import SpeechPicturePage from "./Components/SpeechPicture/SpeechPicturePage";
import CollectionView from "./Components/UI/CollectionView/CollectionView";
import WriteSentencePage from "./Components/WriteSentence/WriteSentencePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/collectionview" element={<CollectionView />}></Route>
      <Route path="/speechtopicpage" element={<SpeechTopicPage />}></Route>
      <Route path="/speechpicturepage" element={<SpeechPicturePage />}></Route>
      <Route path="/writesentence" element={<WriteSentencePage />}></Route>
    </Routes>
  );
}

export default App;
