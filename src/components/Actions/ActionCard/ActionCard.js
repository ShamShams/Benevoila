import React, { Component } from 'react';

import moment from 'moment';
moment.locale('fr');

import { Divider, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';

import ContainedButton from '../../ContainedButton';
import ActionModal from '../ActionModal';

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
        dialogOpen: false,
        expansionPanelOpen: false
    };

    openDialog = () => {
        this.setState({ dialogOpen: true });
    };

    closeDialog = () => {
        this.setState({ dialogOpen: false });
    };

    handleRegister = () => {
        this.props.handleClick();
        this.setState({ dialogOpen: false });
    }

    render() {
        const { classes, action, registered } = this.props;
        const { dialogOpen, expansionPanelOpen } = this.state;
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

        const action_date = moment(start_date).format('dddd DD MMMM YYYY');
        const start_time = moment(start_date).format('HH:mm');
        const end_time = moment(end_date).format('HH:mm');

        const button = registered ? (
            <ContainedButton preset="redButton" onClick={this.openDialog}>
                Je me désinscris
            </ContainedButton>
        ) : (
            <ContainedButton preset="blueButton" onClick={this.openDialog}>
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
                                    {action_date}
                                </p>
                                <p className="action-card-title">{name}</p>
                                <p className="action-card-time-place">
                                    {city} - {start_time} - {end_time}
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
                    <Divider light />
                    <ExpansionPanelDetails classes={{ root: classes.details }}>
                        <div className="action-card-details">
                            <div className="action-card-description">
                                <h4>Description</h4>
                                <p>{description}</p>
                            </div>
                            <div>
                                <h4>Référent</h4>
                                <p>
                                    Amine Zerrougui <br /> 06 17 08 67 05 <br />{' '}
                                    azerrougui@asso.com
                                </p>
                            </div>
                            <div>
                                <h4>Adresse</h4>
                                <p>
                                    {address} <br /> {zipcode} {city}
                                </p>
                            </div>
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ActionModal
                    dialogOpen={dialogOpen}
                    name={name}
                    date={action_date}
                    start={start_time}
                    end={end_time}
                    address={address}
                    zipcode={zipcode}
                    city={city}
                    description={description}
                    need={need}
                    handleRegister={this.handleRegister}
                    close={this.closeDialog}
                    isRegistered={registered}
                />
            </div>
        );
    }
}

export default withStyles(styles)(ActionCard);
