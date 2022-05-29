import { useFeature } from 'flagged';
import { FC, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import Navigation from './components/Navigation';
import Library from './views/Library';
import Artifact from './views/Artifact';
import Home from './views/Home';

const App: FC = () => {
  const hasLibrary = useFeature('library');

  return (
    <div className="App m-auto px-4 lg:px-0 lg:max-w-3xl mb-[120px]">
      <Router>
        <div>
          <Navigation />

          {/* A <Routes> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Routes>
            {hasLibrary && <Route path="/a" element={<Library />} />}
            <Route path="/" element={<Home />} />
            <Route path="/a/artifact" element={<Artifact />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
