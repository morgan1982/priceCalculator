import React, { forwardRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    root: {
     display: 'flex',
     alignItems: 'center',
     '& h3': {
        width: '100px', 
        marginRight: '10px'
     }
    },
    input: {
        width: 100,
        margin: theme.spacing(1)
    }
}))

const PriceInput = forwardRef((props, ref) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <h3>{ props.label }</h3>
            <TextField
              value={props.value}
              className={classes.input} 
              variant='outlined'
              size='small'
              inputRef={ref}
              onKeyPress={props.onKeyPress}
              onChange={ props.onChange }
            />
        </div>
    )
})

export default PriceInput;