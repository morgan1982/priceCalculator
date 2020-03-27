import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 40,
    width: 350
  },
  margin: {
    height: theme.spacing(3)
  },
  '& PrivateValueLabel-circle-202': {
    backgroundColor: '#333'
  },
  track: {
    // backgroundColor: 'red'
  },
  sliderRoot: {
    backgroundColor: '#333'
  },
  sliderColor: {
    // backgroundColor: '#333'
  }
}));

// TODO put them in a database to update dynamically
const marks = [
  {
    value: 0
    // label: '0%'
  },
  {
    value: 10
    // label: '10%'
  },
  {
    value: 15
    // label: '15%'
  },
  {
    value: 20
    // label: '20%'
  },
  {
    value: 25
    // label: '25%'
  },
  {
    value: 30
    // label: '30%'
  },
  {
    value: 40
    // label: '40%'
  },
  {
    value: 50
    // label: '50%'
  }
];

function valuetext(value) {
  return `${value}$`;
}

function valueLabelFormat(value) {
  const mark = marks.filter(mark => mark.value === value);
  return `${value}%`;
}

const DiscountSlider = props => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.margin} />

      <Slider
        classes={{
          valueLabel: classes.valueLabel,
          track: classes.track,
          colorPrimary: classes.sliderColor
        }}
        className={ classes.SliderRoot }
        value={props.value}
        defaultValue={0}
        valueLabelFormat={valueLabelFormat}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-restrict"
        step={5}
        marks={marks}
        max={60}
        valueLabelDisplay="on"
        onChange={props.setDiscountChange}
      />
      <Typography id="discrete-slider-restrict" gutterBottom>
        Discount Slider
      </Typography>
      <div className={classes.margin} />
    </div>
  );
};

export default DiscountSlider;
