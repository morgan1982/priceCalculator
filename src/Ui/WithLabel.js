import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    "& div:nth-child(2)": {
      color: "dodgerblue",
      fontSize: "1rem"
    }
  },
  finalPrice: {
    marginLeft: 20
  }
}));

const WithLabel = ({ value, children, id }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {children}
      <div className={classes.finalPrice}>{value}</div>
    </div>
  );
};

export default WithLabel;
