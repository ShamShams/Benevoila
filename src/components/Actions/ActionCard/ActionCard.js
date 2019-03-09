import React, { Component } from 'react';
import axios from 'axios';

import moment from 'moment';
moment.locale('fr');

import {
  Divider,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';

import ContainedButton from '../../ContainedButton';
import ActionModal from '../ActionModal';
import UserModal from '../../Users/UserModal/UserModal';

const styles = () => ({
  root: {
    '&:hover:not(.MuiExpansionPanelSummary-disabled-62)': {
      cursor: 'auto',
    },
  },
  summary: { margin: '20px 0' },
  details: { padding: '20px 24px' },
});

class ActionCard extends Component {
  state = {
    dialogOpen: false,
    expansionPanelOpen: false,
    actionRegistrations: [],
    registeredUsers: [],
  };

  componentDidMount = async () => {
    await this.getActionRegistrations();
    await this.getRegisteredUsers();
  };

  getActionRegistrations = async () => {
    const { action_id } = this.props.action;
    // On récupère les inscriptions du user
    const token = localStorage.getItem('token');
    const config = { headers: { 'x-access-token': token } };
    let actionRegistrations = null;
    try {
      actionRegistrations = await axios.get(
        `http://localhost:3000/registrations/action/${action_id}`,
        config
      );
    } catch (error) {
      console.log(error);
    }
    this.setState({ actionRegistrations: actionRegistrations.data });
  };

  getRegisteredUsers = async () => {
    const { actionRegistrations } = this.state;

    const token = localStorage.getItem('token');
    const config = { headers: { 'x-access-token': token } };
    let registeredUsers = [];

    actionRegistrations.forEach(async reg => {
      let user = null;
      try {
        user = await axios.get(`http://localhost:3000/users/${reg.user_id}`, config);
      } catch (error) {
        console.log(error);
      }
      registeredUsers.push(user.data);
    });
    this.setState({ registeredUsers });
  };

  openDialog = () => {
    this.setState({ dialogOpen: true });
  };

  closeDialog = () => {
    this.setState({ dialogOpen: false });
  };

  render() {
    const { dialogOpen, expansionPanelOpen, actionRegistrations, registeredUsers } = this.state;
    const { classes, action, user, userRegistrations, handleRegister } = this.props;
    const { name, description, start_date, end_date, address, zipcode, city, need } = action;

    const action_date = moment(start_date).format('dddd DD MMMM YYYY');
    const start_time = moment(start_date).format('HH:mm');
    const end_time = moment(end_date).format('HH:mm');

    const registrationsNumber = actionRegistrations && actionRegistrations.length;
    const manquant = registrationsNumber > need ? 0 : need - registrationsNumber;

    const registration = userRegistrations.find(reg => action.action_id === reg.action_id);
    const registrationId = registration && registration.registration_id;
    const isRegistered = registrationId !== undefined;

    const isAdmin = user.role === 'admin';

    const button = isAdmin ? (
      registrationsNumber ? (
        <ContainedButton preset='blueButton' onClick={this.openDialog}>
          Voir les inscrits
        </ContainedButton>
      ) : null
    ) : isRegistered ? (
      <ContainedButton preset='redButton' onClick={this.openDialog}>
        Je me désinscris
      </ContainedButton>
    ) : (
      <ContainedButton preset='blueButton' onClick={this.openDialog}>
        Je m'inscris
      </ContainedButton>
    );

    return (
      <div className='action-card'>
        <ExpansionPanel elevation={2} expanded={expansionPanelOpen}>
          <ExpansionPanelSummary
            expandIcon={
              <ExpandMoreIcon
                onClick={() => {
                  this.setState({
                    expansionPanelOpen: !this.state.expansionPanelOpen,
                  });
                }}
              />
            }
            classes={{
              content: classes.summary,
              root: classes.root,
            }}>
            <div className='action-card-summary'>
              <div className='action-card-infos'>
                <p className='action-card-date'>{action_date}</p>
                <p className='action-card-title'>{name}</p>
                <p className='action-card-time-place'>
                  {city} - {start_time} - {end_time}
                </p>
              </div>
              <div className='action-card-vlt-infos'>
                <p>
                  Inscrits :<span className='action-card-vlt-reg'>{registrationsNumber}</span>
                </p>
                <p>
                  Manquants :<span className='action-card-vlt-needed'>{manquant}</span>
                </p>
              </div>
              <div className='action-card-button'>{button}</div>
            </div>
          </ExpansionPanelSummary>
          <Divider light />
          <ExpansionPanelDetails classes={{ root: classes.details }}>
            <div className='action-card-details'>
              <div className='action-card-description'>
                <h4>Description</h4>
                <p>{description}</p>
              </div>
              <div>
                <h4>Référent</h4>
                <p>
                  Amine Zerrougui <br /> 06 17 08 67 05 <br /> azerrougui@asso.com
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
        {isAdmin ? (
          <UserModal close={this.closeDialog} {...this.state} {...this.props} />
        ) : (
          <ActionModal
            dialogOpen={dialogOpen}
            close={this.closeDialog}
            action={action}
            date={action_date}
            start={start_time}
            end={end_time}
            isRegistered={isRegistered}
            registrationId={registrationId}
            registrationsNumber={registrationsNumber}
            manquant={manquant}
            handleRegister={handleRegister}
            getActionRegistrations={this.getActionRegistrations}
          />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(ActionCard);
