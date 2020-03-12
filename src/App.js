import React from 'react';
import './App.css';
import Typography from '@material-ui/core/Typography'

import PriceCalculator from './PriceCalculator';

function App() {
  return (
    <div className="App">
      <div className='basic__flex'>
        <Typography
          variant='h4' 
          gutterBottom>DisCalc</Typography>
        <Typography variant='subtitle1'>v 0.1</Typography>
      </div>
      <PriceCalculator/>
    </div>
  );
}

export default App;
