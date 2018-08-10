import React from 'react';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = () => ({
    customizeButton: {
        borderRadius: '0px',
        fontWeight: 'bold',
        letterSpacing: '0.5px'
    },
    blueButton: {
        color: '#fff',
        backgroundColor: '#00acc1',
        '&:hover': {
            backgroundColor: '#26C6DA'
        }
    },
    redButton: {
        color: '#fff',
        backgroundColor: '#ee6e73',
        '&:hover': {
            backgroundColor: '#EF9A9A'
        }
    }
});

const ContainedButton = ({ children, color, classes, handleClick }) => (
    <div>
        <Button
            variant="contained"
            onClick={handleClick}
            className={classNames(classes.customizeButton, classes[color])}
        >
            {children}
        </Button>
    </div>
);

export default withStyles(styles)(ContainedButton);
