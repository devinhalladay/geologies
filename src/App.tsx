import { useFeature } from 'flagged';
import { FC } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navigation from './components/Navigation';
import Article from './views/Article';
import Home from './views/Home';
import Library from './views/Library';

const App: FC = () => {
  const hasLibrary = useFeature('library');

  fetch('https://geologies-devinhalladay.vercel.app/api/reader?name=devin', {
    headers: {
      'Content-Type': 'text/plain',
    },
  }).then((res) => {
    console.log(res);
  });

  return (
    <div className="App m-auto px-4 lg:px-0 lg:max-w-3xl mb-[120px]">
      <Router>
        <div>
          <Navigation />
          <Routes>
            {/* HOME */}
            <Route path="/" element={<Home />} />
            {/* LIBRARY */}
            {hasLibrary && <Route path="/library" element={<Library />} />}
            {/* ARTICLE */}
            <Route path="/library/:id" element={<Article />} />
            <Route element={<p>not found</p>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
