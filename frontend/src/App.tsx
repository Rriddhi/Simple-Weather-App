import React from 'react';
import logo from './logo.svg';
import './App.css';
import Weather from './Weather';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* Other content */}
        <Weather />
      </header>
    </div>
  );
}

export default App;
