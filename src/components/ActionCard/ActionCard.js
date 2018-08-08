import React from 'react';

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
    summary: { margin: '20px 0'},
    details: { padding: '20px 24px' }
});

const ActionCard = ({ classes }) => (
    <div className="action-card">
        <ExpansionPanel>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                classes={{ content: classes.summary }}
            >
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
            <Divider inset={true} />
            <ExpansionPanelDetails classes={{ root: classes.details }}>
                <div className="action-card-details">
                    <div className="action-card-description">
                        <h4>Description</h4>
                        <p>Les maraudes consistent à aller à la rencontre des personnes précaires et sans abri et leur proposer de l'aide</p>
                    </div>
                    <div className="action-card-referent">
                        <h4>Référent</h4>
                        <p>Farid Hassan <br/> 06 12 76 54 98 <br/> farid.hassan@asso.fr</p>
                    </div>
                    <div className="action-card-address">
                        <h4>Adresse</h4>
                        <p>3 rue Maryse Bastié <br/> 75013 Paris</p>
                    </div>
                </div>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    </div>
);

export default withStyles(styles)(ActionCard);
