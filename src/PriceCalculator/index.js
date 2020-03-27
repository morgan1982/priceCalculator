import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import isEmpty from "../utils/isEmpty";
import clsx from "clsx";

import WithLabel from "../Ui/WithLabel";
import Typography from "@material-ui/core/Typography";
import PriceInput from "./PriceInput";
import Controls from "./Controls/Controls";

const useStyles = makeStyles(theme => ({
  root: {
    margin: 20,
  },
  mainContainer: {
    display: "flex"
  },
  inputs: {
    width: "350px"
  },
  totalOfTotalContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px"
  },
  totalContainer: {
    width: 350,
    display: "flex",
    position: 'relative',
    alignItems: "flex-end",
    "& div:nth-child(1)": {
      fontSize: "1.8rem",
      color: "#555",
      marginRight: "1rem"
    }
  },
  totalValue: {
    fontFamily: "'Lato', sans-serif",
    width: 160,
    fontSize: "2.8rem",
    color: "dodgerblue",
    display: "tableCell",
    verticalAlign: "bottom",
    position: 'relative',

    // position: 'absolute',
    bottom: '-8px',
    right: 0,
    // border: '1px solid red'
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    "& div:nth-child(2)": {
      color: "dodgerblue",
      fontSize: "1rem",
      border: '1px solid red'
    }
  },
  indicator: {
    backgroundColor: "tomato",
    boxShadow: "2px 1px 4px rgba(0, 0, 0, .4)",
    borderRadius: "7px",
    marginLeft: 5,
    padding: "5px 20px",
    color: "white !important",
    fontSize: ".7rem"
  },
  // indicator color variants
  nr: {
    backgroundColor: "seagreen"
  },
  nrLc: {
    backgroundColor: "orange"
  },
  custom: {
    backgroundColor: "hotpink"
  },
  labDisc25: {
    color: '#333 !important',
    fontWeight: 'bold',
    backgroundColor: "khaki"
  },
  labDisc40: {
    color: '#333 !important',
    fontWeight: 'bold',
    backgroundColor: "pink"
  },
  discountCaption: {
    marginLeft: "10px"
  },
  headers: {
    // border: '1px solid red',
    display: "flex",
    justifyContent: "space-around"
  },
  finalPrice: {
    marginLeft: "px"
  }
}));

const refFactory = numOfRefs => {
  const arrOfRefs = [];
  for (let i = 1; i <= numOfRefs; i++) {
    arrOfRefs.push(React.createRef());
  }
  return arrOfRefs;
};

const PriceCalculator = props => {
  const [values, setValues] = useState({}); // oBj of input values
  const [prices, setPrices] = useState({});
  const [inputs, setInputs] = useState([1, 2, 3, 4]);
  const [customDiscount, setCustomDiscount] = useState(0);
  const [labDisc, setLabDisc] = useState({ 25: false, 40: false});
  const [addVat, setAddVat] = useState(false); 
  const [lc, setLc] = useState(false);
  const [nr, setNr] = useState(false);
  const classes = useStyles(props);
  const inputRefs = useRef(refFactory(5));

  useEffect(() => {
    inputRefs.current[1].current.focus();
  }, []);

  useEffect(() => {
    // calculates the discounts
    let copyOfObj = Object.assign({}, values);
    inputs.map(id => {
      let price;
      if (copyOfObj[id] !== undefined) {
        price = Number(copyOfObj[id]);

        // handle discounts from controls
        if (addVat) {
          price = price * 1.24
        }
        if (customDiscount) {
          price = price * (1 - customDiscount / 100);
        }
        if (lc) {
          price = price * 0.9;
        }
        if (nr) {
          price = price / 1.24;
        }
        if (labDisc['25'] || labDisc['40']) {
          console.log(labDisc)
          if (labDisc['25']) {
            price = price * 0.75
          }
          if (labDisc['40']) {
            price = price * 0.6
          }
        }

        // handles 2th and more than 2th repairs 
        if (id === 2) {
          price = price / 2;
        } else if (id > 2) {
          price = price * 0.25;
        }
        copyOfObj[id] = price;
      }
    });
    setPrices(copyOfObj);
  }, [values, lc, nr, customDiscount, labDisc, addVat]);


  const handleChange = index => ({ target: { value } }) => {
    if (!isNaN(Number(value)) || value === ".") {
      setValues({
        ...values,
        [index]: value
      });
    }
  };

  const handleLc = () => {
    setLc(!lc);
  };

  const handleNr = () => {
    setNr(!nr);
  };

  const handleNrLc = () => {
    if (nr && lc) {
      setLc(false);
      setNr(false);
    } else {
      setNr(true);
      setLc(true);
    }
  };

  const handleLabDisc = disc => () => {
    console.log(disc)
    setLabDisc({
      ...labDisc,
      [disc]: !labDisc[disc]
    })
  }

  const handleAddVat = () => {
    setAddVat(!addVat)
  }

  const handleKeyPress = id => ({ key }) => {
    if (key === "Enter") {
      if (inputRefs.current[id + 1] !== undefined) {
        inputRefs.current[id + 1].current.focus();
      } else {
        inputRefs.current[1].current.focus();
      }
    }
  };

  // Clear 
  const clearValues = () => {
    setValues([]);
    setCustomDiscount(0);
    setNr(false);
    setLc(false);
    setLabDisc({25: false, 40: false})
    setAddVat(false)
  };

  // discount slider
  const setDiscountChange = (e, value) => {
    if (value !== 0) {
      setLc(false);
      setLabDisc({25: false, 40: false})
    }
    setCustomDiscount(value);
  };

  // total
  const renderSum = () => {
    const Indicator = modifier => {
      let capitalizedLabel = modifier[0].toUpperCase() + modifier.slice(1)

      if (modifier === 'labDisc25') {
        capitalizedLabel = 'Lab Disc 25%' 
      } else if (modifier === 'labDisc40') {
        capitalizedLabel = 'Lab Disc 40%'
      }
      
      return (
        <div className={clsx(classes.indicator, classes[modifier])}>{capitalizedLabel}</div>
      );
    };

    const renderIndicators = () => {
      return (
        <React.Fragment>
          {lc ? Indicator("lc") : ""}
          {nr ? Indicator("nr") : ""}
          {customDiscount ? Indicator("custom") : ""}
          {labDisc['25'] ? Indicator("labDisc25") : ""}
          {labDisc['40'] ? Indicator("labDisc40") : ""}
        </React.Fragment>
      );
    };

    let sum = Object.values(prices).reduce((sum, val) => sum + Number(val), 0);
    if (Math.round(sum) !== sum) {
      sum = sum.toFixed(2);
    }

    return (
      <div className={classes.totalContainer}>
        <div className={classes.totalKey}>Total:</div>
        <div className={classes.totalValue}>{sum}</div>
        {renderIndicators()}
      </div>
    );
  };

  const renderInputs = () => {
    return inputs.map(id => {
      let value = prices[id];
      if (prices[id] !== undefined && Math.round(prices[id]) !== prices[id]) {
        value = prices[id].toFixed(3);
      }

      return (
        <WithLabel
          key={id}
          id={id}
          classes={classes.inputContainer}
          value={value}
        >
          <PriceInput
            value={
              values[id] === undefined || values[id] === 0 ? "" : values[id]
            }
            ref={inputRefs.current[id]}
            id={id}
            onKeyPress={handleKeyPress(id)}
            onChange={handleChange(id)}
            label={`Repair ${id}`}
          />
        </WithLabel>
      );
    });
  };

  return (
    <div className={classes.root}>
      <div className={classes.totalOfTotalContainer}>
        <div className="basic__flex">
          <Typography variant="h4">
            Dis<span style={{ color: "darkorange" }}>Calc</span>
          </Typography>
          <Typography variant="subtitle1">v 0.02</Typography>
        </div>
        <div>{renderSum()}</div>
      </div>
      <div className={classes.mainContainer}>
        <div className={classes.inputs}>
          <div className={classes.headers}>
            <div>Repairs</div>
            <div>Input price</div>
            <div>Final Price</div>
          </div>
          {renderInputs()}
        </div>
        <Controls
          handleNr={handleNr}
          handleLc={handleLc}
          handleNrLc={handleNrLc}
          customDiscount={customDiscount === 0 ? false : true}
          disableClear={isEmpty(values)}
          nr={nr}
          lc={lc}
          labDisc={labDisc}
          handleLabDisc={handleLabDisc}
          controlSlider={customDiscount}
          clear={clearValues}
          setDiscountChange={setDiscountChange}
          addVat={addVat}
          handleAddVat={handleAddVat}
        />
      </div>
    </div>
  );
};

export default PriceCalculator;
