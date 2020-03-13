import React, { forwardRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

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
        margin: theme.spacing(1),
        '& p': {
            fontSize: '.7rem',
        }
    },
    endAdornment: {
        color: 'red',
        fontSize: '5px'
    }
}))

const PriceInput = forwardRef((props, ref) => {
    const classes = useStyles();
    const { id } = props;
    let discount = "";

    switch (true) {
      case id === 2:
        discount = "50%";
        break;
      case id > 2:
        discount = "75%";
    }

    return (
        <div className={classes.root}>
            <h3>{ props.label }</h3>
            <TextField
              value={props.value}
              className={classes.input} 
              variant='outlined'
              size='small'
              inputRef={ref}
              InputProps={{
              endAdornment: <InputAdornment
                              classes={{root: classes.endAdornment}}
                              position='end'>{discount}</InputAdornment>
              }}
              onKeyPress={props.onKeyPress}
              onChange={ props.onChange }
            />
        </div>
    )
})

export default PriceInput;