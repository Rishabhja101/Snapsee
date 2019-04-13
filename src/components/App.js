import React from 'react';
import LoginPage from './Login.js';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>Snapsee</h1>
        <h2>One click snap adding.</h2>
        <LoginPage />
      </div>
    );
  }
}

export default App;
