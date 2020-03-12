import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import IosSwitch from '../../Ui/IosSwitch';
import DiscountSlider from './DiscountSlider';

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    width: 400,
    padding: '0px 40px'
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    '& h6': {
      marginRight: theme.spacing(2)
    }
  }
}))

const Controls = ({handleLc, handleNr, handleNrLc, ...rest}) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Typography variant='h6' gutterBottom>Controls</Typography>
      <div className={classes.flex}>
        <div className={classes.left}>
          <div className={classes.container}>
            <Typography variant='subtitle1'>Lc</Typography>
            <IosSwitch
              disabled={rest.customDiscount}
              onChange={handleLc}
              checked={rest.lc}
            />
          </div>
          <div className={classes.container}>
            <Typography variant='subtitle1'>Nr</Typography>
            <IosSwitch
              onChange={handleNr}
              checked={rest.nr}
            />
          </div>
          <div className={classes.container}>
            <Typography variant='subtitle1'>Nr/Lc</Typography>
            <IosSwitch
              disabled={rest.customDiscount}
              onChange={handleNrLc}
              checked={rest.nr && rest.lc}
            />
          </div>
        </div>
        <div className={classes.right}>
          <Button
            disabled={rest.disableClear}
            variant='contained'
            color='secondary'
            size='small'
            onClick={rest.clear}
            >clear</Button>
        </div>
      </div>
      <DiscountSlider
        value={rest.controlSlider}
        setDiscountChange={rest.setDiscountChange}
      />
    </Paper>
  )
}

export default Controls;
