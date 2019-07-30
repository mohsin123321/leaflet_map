import React  from 'react';
import Map from './leaflet_map.js';
import MainMap from './main_map.js';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <MainMap></MainMap>
      </div>
    );
  }
}

export default App;
