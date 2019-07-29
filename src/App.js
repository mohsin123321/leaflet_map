import React  from 'react';
import Map from './leaflet_map.js';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Map></Map>
      </div>
    );
  }
}

export default App;
