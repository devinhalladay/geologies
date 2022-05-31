import { useFeature } from 'flagged';
import { FC } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Article from './views/Article';
import Artifact from './views/Artifact';
import Home from './views/Home';
import Library from './views/Library';

const App: FC = () => {
  const hasLibrary = useFeature('library');

  return (
    <div className="App m-auto px-4 lg:px-0 lg:max-w-3xl mb-[120px]">
      <Router>
        <div>
          <Navigation />

          <Routes>
            {hasLibrary && <Route path="/library" element={<Library />} />}
            <Route path="/" element={<Home />} />
            {/* <Route path="/a/artifact" element={<Artifact />} /> */}
            <Route path="/library/:id" element={<Article />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
