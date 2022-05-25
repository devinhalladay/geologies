import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './views/Home';

const App: FC = () => {
  return (
    <div className="App m-auto px-4 lg:px-0 lg:max-w-3xl">
      <Router>
        <div>
          <Navigation />

          {/* A <Routes> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Routes>
            <Route path="/a" element={<p>hello world</p>} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
