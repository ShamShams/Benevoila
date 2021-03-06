import React from 'react';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = () => ({
  customizeButton: {
    borderRadius: '2px',
    fontWeight: 'bold',
    letterSpacing: '0.5px',
  },
  blueButton: {
    color: '#fff',
    backgroundColor: '#00acc1',
    '&:hover': {
      backgroundColor: '#26C6DA',
    },
  },
  redButton: {
    color: '#fff',
    backgroundColor: '#ee6e73',
    '&:hover': {
      backgroundColor: '#EF9A9A',
    },
  },
  addButton: {
    color: '#444',
    backgroundColor: '#ddd',
    fontSize: '14px',
  },
});

const ContainedButton = ({ children, preset, classes, style, onClick }) => (
  <div className={style}>
    <Button
      variant='contained'
      onClick={onClick}
      className={classNames(classes.customizeButton, classes[preset])}>
      {children}
    </Button>
  </div>
);

export default withStyles(styles)(ContainedButton);
