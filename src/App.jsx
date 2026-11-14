import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import PracticeIndex from './pages/PracticeIndex.jsx';
import PracticeDetail from './pages/PracticeDetail.jsx';
import Article from './pages/Articles.jsx';
import ArticleDetail from './pages/ArticleDetail.jsx';
import Approach from './pages/Approach.jsx';
import Publications from './pages/Publications.jsx';
import Disclaimer from './pages/Disclaimer.jsx';
import Privacy from './pages/Privacy.jsx';


export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="practice" element={<PracticeIndex />} />
        <Route path="practice/:slug" element={<PracticeDetail />} />
        <Route path="approach" element={<Approach />} />
        <Route path="/article/" element={<Article />} />
        <Route path="/article/:slug/" element={<ArticleDetail />} />
        <Route path="/publications/" element={<Publications />} />
        <Route path="/disclaimer/" element={<Disclaimer />} />
        <Route path="/privacy/" element={<Privacy />} />
      </Route>
    </Routes>
  );
}