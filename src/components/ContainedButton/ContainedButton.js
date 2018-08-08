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
    blueButton: { color: '#fff', backgroundColor: '#00acc1' },
    redButton: { color: '#fff', backgroundColor: '#ee6e73' }
});

const ContainedButton = ({ children, color, classes }) => (
    <div>
        <Button variant="contained" className={classNames(classes.customizeButton, classes[color])}>
            { children }
        </Button>
    </div>
);

export default withStyles(styles)(ContainedButton);
