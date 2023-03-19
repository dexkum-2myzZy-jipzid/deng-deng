import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./Components/Home/Home";
import SpeechTopicPage from "./Components/SpeechTopic/SpeechTopicPage";
import SpeechPicturePage from "./Components/SpeechPicture/SpeechPicturePage";
import CollectionView from "./Components/UI/CollectionView/CollectionView";
import WriteSentencePage from "./Components/WriteSentence/WriteSentencePage";
import WordDiscriminationPage from "./Components/WordDiscrimination/WordDiscriminationPage";
import ListenToDistinguishWordsPage from "./Components/ListenToDistinguishWords/ListeningToDistinguishWordsPage";
import FillWordsPage from "./Components/FillWords/FillWordsPage";
import InteractiveReadingPage from "./Components/InteractiveReading/InteractiveReadingPage";
import WritingInterviewPage from "./Components/WritingInterview/WritingInterviewPage";
import OralInterviewPage from "./Components/OralInterview/OralInterview";
import DictateSentencePage from "./Components/DictateSentence/DictateSentencePage";
import LecturePage from "./Components/Lecture/LecturePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/collectionview" element={<CollectionView />}></Route>
      <Route path="/speechtopicpage" element={<SpeechTopicPage />}></Route>
      <Route path="/speechpicturepage" element={<SpeechPicturePage />}></Route>
      <Route path="/writesentence" element={<WriteSentencePage />}></Route>
      <Route
        path="/worddiscrimination"
        element={<WordDiscriminationPage />}
      ></Route>
      <Route
        path="/listentodistinguishwords"
        element={<ListenToDistinguishWordsPage />}
      ></Route>
      <Route path="/fillwords" element={<FillWordsPage />}></Route>
      <Route path="/interactive" element={<InteractiveReadingPage />}></Route>
      <Route
        path="/writinginterview"
        element={<WritingInterviewPage />}
      ></Route>
      <Route path="/oralinterview" element={<OralInterviewPage />}></Route>
      <Route path="/dictatesentence" element={<DictateSentencePage />}></Route>
      <Route path="/lecture" element={<LecturePage />}></Route>
    </Routes>
  );
}

export default App;
