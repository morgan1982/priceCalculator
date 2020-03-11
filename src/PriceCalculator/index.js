import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from '@material-ui/core/styles';

import PriceInput from "./PriceInput";
import Controls from './Controls';

const useStyles = makeStyles(theme => ({
  root: {

  },
  mainContainer: {
    display: 'flex'
  },
  inputs: {
    width: '350px'
  },
  totalContainer: {
    display: 'flex',
    alignItems: 'center',
    '& div:nth-child(1)': {
      fontSize: '1.8rem',
      color: '#555',
      marginRight: '1rem'
    } 
  },
  total: {
    fontSize: '2.3rem',
    color: 'dodgerblue'
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    '& div:nth-child(2)': {
      color: 'dodgerblue',
      fontSize: '1rem'
    }
  }
}))

const WithLabel = ({ classes, value, children }) => {
  return (
    <div className={classes}>
      {children}
      <div>{value}</div>
    </div>
  )
}

const refFactory = numOfRefs => {
  const arrOfRefs = []
  for (let i=1; i<=numOfRefs; i++) {
    arrOfRefs.push(React.createRef())
  }
  return arrOfRefs;
}


const PriceCalculator = props => {
  const [values, setValues] = useState({});
  const [prices, setPrices] = useState({})
  const [inputs, setInputs] = useState([1, 2, 3, 4])
  const [lc, setLc] = useState(false)
  const [nr, setNr] = useState(false)
  const classes = useStyles();
  const inputRefs = useRef(refFactory(5));

  useEffect(() => {
    inputRefs.current[1].current.focus()
  }, [])

  useEffect(() => {
    // calculates the discounts
    let copyOfObj = Object.assign({}, values);
    inputs.map(id => {
      let price;
      if (copyOfObj[id] !== undefined) {
        price = Number(copyOfObj[id])
        if (lc) {
          price = price * 0.9;
        }
        if (nr) {
          price = price / 1.24;
        }
        if (id === 2) {
          price = price / 2
        } else if (id > 2) {
          price = price * 0.25
        }
        copyOfObj[id] = price
      }
    })
    setPrices(copyOfObj)
  }, [values, lc, nr]);

  const handleChange = index => ({ target: { value } }) => {
    setValues({
      ...values,
      [index]: value
    });
  };

  const handleLc = () => {
    setLc(!lc);
  }

  const handleNr = () => {
    setNr(!nr);
  }

  const handleKeyPress = id => ({ key }) => {
    if(key === 'Enter') {
      if (inputRefs.current[id+1] !== undefined) {
        inputRefs.current[id + 1].current.focus();
      } else {
        inputRefs.current[1].current.focus();
      }
    }
  }

  const clearValues = () => {
    setValues([])
  }

  // total calculation
  const renderSum = () => {
    let sum = Object.values(prices).reduce((sum, val) => sum + Number(val), 0)
    if (Math.round(sum) !== sum) {
      sum = sum.toFixed(3)
    }
    return (
      <div className={ classes.totalContainer }>
        <div>Total</div>
        <div className={ classes.total }>{sum}</div>
      </div>
    ) 
  }

  const renderInputs = () => {
    return inputs.map(id => {
      let value = prices[id];
      if (prices[id] !== undefined && (Math.round(prices[id]) !== prices[id])) {
        value = prices[id].toFixed(3);
      }
    
      return(
      <WithLabel key={id} classes={ classes.inputContainer } value={value}>
        <PriceInput
          value={ values[id] === undefined || values[id] === 0 ? '' : values[id] }
          ref={inputRefs.current[id]}
          id={id} 
          onKeyPress={handleKeyPress(id)}
          onChange={handleChange(id)} 
          label={`Repair ${id}`}/>
      </WithLabel>    
    )} )
  }

  return (
    <div>
      {renderSum()}
      <div className={classes.mainContainer}>
        <div className={classes.inputs}>
          {renderInputs()}
        </div>
        <Controls
          handleNr={handleNr}
          handleLc={handleLc}
          nr={nr}
          lc={lc}
          clear={clearValues}
        />
      </div>
    </div>
  );
};

export default PriceCalculator;
