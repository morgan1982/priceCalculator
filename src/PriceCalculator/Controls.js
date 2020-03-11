import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import IosSwitch from '../Ui/iosSwitch';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    width: '300px',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px 40px'
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    '& h6': {
      marginRight: theme.spacing(2)
    }
  }
}))

const Controls = ({handleLc, handleNr, ...rest}) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <div className={classes.left}>
        <div className={classes.container}>
          <Typography variant='subtitle1'>Lc</Typography>
          <IosSwitch
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
      </div>
      <div className={classes.right}>
        <Button
          variant='contained'
          color='secondary'
          size='small'
          onClick={rest.clear}
          >clear</Button>
      </div>
    </Paper>
  )
}

export default Controls;
