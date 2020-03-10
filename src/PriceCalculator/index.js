import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';

import PriceInput from "./PriceInput";
import IosSwitch from '../Ui/iosSwitch';

const useStyles = makeStyles(theme => ({
  root: {

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


const PriceCalculator = props => {
  const [price, setPrice] = useState({});
  const [inputs, setInputs] = useState([1, 2, 3, 4])
  const [lc, setLc] = useState(false)
  const classes = useStyles();

  useEffect(() => {
    // set the final price
    if (lc) {
      const lcPrice = Object.values(price);
      const newPrice = lcPrice.map(el => el * 0.9);
      console.log(lcPrice)
      console.log(newPrice);
    }
  }, [price, lc]);

  const handleChange = name => ({ target: { value } }) => {
    let id = parseInt(name);
    let cost  = parseInt(value);

    if (isNaN(cost)) {
        setPrice({
            ...price,
            [name]: 0
        })
        return;    
    }

    if (id === 2) {
        cost = cost / 2;
    } else if (id > 2) {
        cost = cost * 0.25
    }

    setPrice({
      ...price,
      [name]: cost
    });
  };

  const handleLc = () => {
    setLc(!lc);
  }

  const renderSum = () => {
    const sum = Object.values(price).reduce((sum, val) => sum + val, 0)
    return (
      <div className={ classes.totalContainer }>
        <div>Total</div>
        <div className={ classes.total }>{ sum } </div>
      </div>
    ) 
  }

  const renderInputs = () => {
    return inputs.map(id => (
      <WithLabel key={id} classes={ classes.inputContainer } value={price[id]}>
        <PriceInput id={id} onChange={handleChange} label={`Repair ${id}`}/>
      </WithLabel>    
    ))
  }

  return (
    <div>
      {renderSum()}
      {renderInputs()}
      <IosSwitch
        onChange={handleLc}
        checked={lc}
      />
    </div>
  );
};

export default PriceCalculator;
