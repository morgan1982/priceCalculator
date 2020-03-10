import React from 'react'
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

const PriceInput = props => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <h3>{ props.label }</h3>
            <TextField
              className={classes.input} 
              variant='outlined'
              size='small'
              onChange={ props.onChange(props.id) }
            />
        </div>
    )
}

export default PriceInput;