import React from 'react';
import { connectHris } from './utils';

import './App.css';


function App() {
  return (
    <div className="App">
      <button onClick={() => connectHris('personio')}>
        add Personio
      </button>
      <br />
      <button onClick={() => connectHris('googleworkspace')}>
        add Google Workspace
      </button>
    </div>
  );
}

export default App;
