import React from 'react';

import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home container">
      <h3>Frontend (react.js) by Kanu Mike C</h3>
      <p>Using the API created, create a reactjs app to</p>

      <ul className="home__tasks">
        <li>View the items (paginated)</li>
        <li>
          Click on a particular item to see more full details. The page will
          have edit and delete options.
        </li>
        <li>
          Clicking the edit button above should go to an edit page where the
          parameters can be modified
        </li>
        <li>Clicking the delete option should delete from the API</li>
      </ul>
      <button className="btn" onClick={() => navigate('/items')}>
        View Items
      </button>
    </div>
  );
};

export default Home;
