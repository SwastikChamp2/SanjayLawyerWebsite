import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import PracticeIndex from './pages/PracticeIndex.jsx';
import PracticeDetail from './pages/PracticeDetail.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="practice" element={<PracticeIndex />} />
        <Route path="practice/:slug" element={<PracticeDetail />} />
        {/* Add /insights and /insights/:slug here when ready */}
      </Route>
    </Routes>
  );
}