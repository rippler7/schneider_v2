import './App.css';
import React, { useState } from 'react';
import MainIsland from './components/MainIsland';
import Modal from './components/Modal';
import Footer from './components/footer';


function App() {
  var [selectedMenu, setSelectedItem] = useState('home');
  return (
    <div className="App">
      <header className="App-header">
        <div id="mainLogo"></div>
      </header>
        <MainIsland />
        <Footer />
        <Modal />
    </div>
    
  );
}

export default App;
