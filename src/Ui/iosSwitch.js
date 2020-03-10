import React from 'react';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

const IOSSwitch = withStyles(theme => ({
  root: {
    width: theme.switch.root.width.medium,
    height: theme.switch.root.height.medium,
    padding: 0,
    alignItems: 'center'
    // margin: theme.spacing(1)
  },
  switchBase: {
    // this is absolute positioned
    top: ((theme.switch.root.height.medium / 2) / 2) + 2,
    padding: 0,
    // top: '10px',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0)'
    },
    paddingLeft: '2px',
    '&$checked': {
      transform: `translateX( ${ theme.switch.switchBase.transform.small  } )`,
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: '#52d869',
        opacity: 1,
        border: 'none'
      },
    },
    '&$focusVisible $thumb': {
      color: '#52d869',
      border: '6px solid #fff'
    },
  },
  thumb: {
    width: theme.switch.thumb.medium,
    height: theme.switch.thumb.medium,
    color: '#777',
    filter: 'drop-shadow(0px 2px 3px #444)'
    // border: '2px solid #333'
  },
  track: {
    boxShadow: 'inset 0 0 3px #000000',
    borderRadius: theme.switch.track.borderRadius.small,
    backgroundColor: red[300],
    opacity: 1,
    height: theme.switch.track.height.small,
    width: theme.switch.track.width.small,
    transition: theme.transitions.create(['background-color', 'border'])
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={ classes.focusVisible }
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      { ...props }
    />
  )
})

export default IOSSwitch;