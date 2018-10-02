import React, { Component } from 'react';

import moment from 'moment';

import {
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Divider
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';

import ContainedButton from '../ContainedButton';

import './ActionCard.scss';

const styles = () => ({
    root: {
        '&:hover:not(.MuiExpansionPanelSummary-disabled-62)': {
            cursor: 'auto'
        }
    },
    summary: { margin: '20px 0' },
    details: { padding: '20px 24px' }
});

class ActionCard extends Component {
    state = {
        expansionPanelOpen: false
    };

    render() {
        const { classes, action, registered, handleClick } = this.props;
        const { expansionPanelOpen } = this.state;
        const {
            name,
            description,
            start_date,
            end_date,
            address,
            zipcode,
            city,
            need
        } = action;

        const button = registered ? (
            <ContainedButton color="redButton" handleClick={handleClick}>
                Je me désinscris
            </ContainedButton>
        ) : (
            <ContainedButton color="blueButton" handleClick={handleClick}>
                Je m'inscris
            </ContainedButton>
        );

        return (
            <div className="action-card">
                <ExpansionPanel elevation={2} expanded={expansionPanelOpen}>
                    <ExpansionPanelSummary
                        expandIcon={
                            <ExpandMoreIcon
                                onClick={() => {
                                    this.setState({
                                        expansionPanelOpen: !this.state
                                            .expansionPanelOpen
                                    });
                                }}
                            />
                        }
                        classes={{
                            content: classes.summary,
                            root: classes.root
                        }}
                    >
                        <div className="action-card-summary">
                            <div className="action-card-infos">
                                <p className="action-card-date">
                                    {moment(start_date).format('DD/MM/YYYY')}
                                </p>
                                <p className="action-card-title">{name}</p>
                                <p className="action-card-time-place">
                                    {city} - {moment(start_date).format('H:mm')}{' '}
                                    - {moment(end_date).format('H:mm')}
                                </p>
                            </div>
                            <div className="action-card-vlt-infos">
                                <p>
                                    Inscrits :
                                    <span className="action-card-vlt-reg">
                                        0
                                    </span>
                                </p>
                                <p>
                                    Manquants :
                                    <span className="action-card-vlt-needed">
                                        {need}
                                    </span>
                                </p>
                            </div>
                            <div className="action-card-button">{button}</div>
                        </div>
                    </ExpansionPanelSummary>
                    <Divider inset={true} />
                    <ExpansionPanelDetails classes={{ root: classes.details }}>
                        <div className="action-card-details">
                            <div className="action-card-description">
                                <h4>Description</h4>
                                <p>{description}</p>
                            </div>
                            <div className="action-card-referent">
                                <h4>Référent</h4>
                                <p>
                                    Amine Zerrougui <br /> 06 17 08 67 05 <br />{' '}
                                    azerrougui@asso.com
                                </p>
                            </div>
                            <div className="action-card-address">
                                <h4>Adresse</h4>
                                <p>
                                    {address} <br /> {zipcode} {city}
                                </p>
                            </div>
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}

export default withStyles(styles)(ActionCard);
