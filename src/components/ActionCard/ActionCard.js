import React, { Component } from 'react';

import moment from 'moment';

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
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
        dialogOpen: false,
        expansionPanelOpen: false
    };

    openDialog = () => {
        this.setState({ dialogOpen: true });
    };

    closeDialog = () => {
        this.setState({ dialogOpen: false });
    };

    register = () => {
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

        const action_date = moment(start_date).format('DD/MM/YYYY');
        const start_time = moment(start_date).format('H:mm');
        const end_time = moment(end_date).format('H:mm');

        const button = registered ? (
            <ContainedButton color="redButton" handleClick={this.openDialog}>
                Je me désinscris
            </ContainedButton>
        ) : (
            <ContainedButton color="blueButton" handleClick={this.openDialog}>
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

                <Dialog
                    open={dialogOpen}
                    aria-labelledby="alert-dialog-title"
                >
                    <DialogContent>
                        <div className="action-modal-header">
                            <p>Voulez-vous vous inscrire à cette action ?</p>
                        </div>
                        <p className="action-modal-title">{name}</p>
                        <div className="action-card-details">
                            <div>
                                <h4>Date</h4>
                                <p>{action_date}</p>
                            </div>
                            <div>
                                <h4>Horaires</h4>
                                <p>{start_time} - {end_time}</p>
                            </div>
                            <div>
                                <h4>Lieu</h4>
                                <p>
                                    {address} <br /> {zipcode} {city}
                                </p>
                            </div>
                        </div>
                        <div className="action-card-details">
                            <div>
                                <h4>Description</h4>
                                <p>{description}</p>
                            </div>
                        </div>
                        <br/>
                        <div className="action-card-details">
                            <div>
                                <h4>Nombre de bénévoles</h4>
                                <div className="action-modal-vlt-infos">
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
                            </div>
                        </div>
                        <div className="action-modal-buttons">
                            <div className="action-modal-button">
                                <Button onClick={this.closeDialog}>
                                    Annuler
                                </Button>
                            </div>
                            <div className="action-modal-button">
                                <ContainedButton color="blueButton" handleClick={this.register}>
                                    Je m'inscris
                                </ContainedButton>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(ActionCard);
