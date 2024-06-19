import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home/Home';
import ItemList from './pages/ItemList/ItemList';
import ItemDetail from './pages/ItemDetail/ItemDetail';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    // Scroll to top at every url change
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Toaster />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/items" element={<ItemList />} />
        <Route path="/items/:id" element={<ItemDetail />} />
      </Routes>
    </>
  );
}

export default App;
