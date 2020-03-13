import React from 'react';
import './App.css';
import Typography from '@material-ui/core/Typography'

import PriceCalculator from './PriceCalculator';

function App() {
  const height = window.innerHeight
  const width = window.innerWidth
  return (
    <div className="App">
      <div>{height} {width}</div>
      <div className='basic__flex'>
        <Typography
          variant='h4' 
          gutterBottom>Dis<span style={{ color: 'darkorange' }}>Calc</span></Typography>
        <Typography variant='subtitle1'>v 0.1</Typography>
      </div>
      <PriceCalculator/>
    </div>
  );
}

export default App;
