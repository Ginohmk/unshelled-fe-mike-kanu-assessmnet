import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import ItemList from './pages/ItemList/ItemList';
import ItemDetail from './pages/ItemDetail/ItemDetail';
import { Toaster } from 'react-hot-toast';

function App() {
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
