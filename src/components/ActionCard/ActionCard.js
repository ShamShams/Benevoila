import React from 'react';

import {
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Divider
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ContainedButton from '../ContainedButton';

import './ActionCard.scss';

const ActionCard = ({}) => (
    <div className="action-card">
        <ExpansionPanel defaultExpanded>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <div className="action-card-summary">
                    <div className="action-card-infos">
                        <p className="action-card-date">12/06/2018</p>
                        <p className="action-card-title">Maraude sociale</p>
                        <p className="action-card-time-place">Paris 13  -  19h - 21h</p>
                    </div>
                    <div className="action-card-vlt-infos">
                        <p>
                            Inscrits : <span className="action-card-vlt-reg">11</span> - Manquants : <span className="action-card-vlt-needed">4</span>
                        </p>
                    </div>
                    <ContainedButton color="blueButton">
                        Je m'inscris
                    </ContainedButton>
                </div>
            </ExpansionPanelSummary>
            <Divider />
            <ExpansionPanelDetails>
                <p>Description</p>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    </div>
);

export default ActionCard;
