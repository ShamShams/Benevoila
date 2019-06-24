import React, { Component } from 'react';
import axios from 'axios';

import moment from 'moment';
moment.locale('fr');

import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Divider,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from '@material-ui/core';
import { Delete, Edit, ExpandMore } from '@material-ui/icons';
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
    actionModalOpen: false,
    userModalOpen: false,
    confirmModalOpen: false,
    expansionPanelOpen: false,
    actionRegistrations: [],
    registeredUsers: [],
    referent: {},
  };

  componentDidMount = async () => {
    await this.getActionRegistrations();
    await this.getRegisteredUsers();
    await this.getReferent();
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

  getReferent = async () => {
    const { referent_id } = this.props.action;
    const token = localStorage.getItem('token');
    const config = { headers: { 'x-access-token': token } };
    let referent = null;
    try {
      referent = await axios.get(`http://localhost:3000/users/${referent_id}`, config);
    } catch (error) {
      console.log(error);
    }
    this.setState({ referent: referent.data });
  };

  editAction = () => {
    const { action, history } = this.props;
    history.push({
      pathname: '/admin-modifier-action',
      state: { action },
    });
  };

  openModal = name => {
    this.setState({ [name]: true });
  };

  closeModal = name => {
    this.setState({ [name]: false });
  };

  render() {
    const { classes, action, user, userRegistrations, handleRegister, deleteAction } = this.props;
    const {
      actionModalOpen,
      confirmModalOpen,
      expansionPanelOpen,
      actionRegistrations,
      referent,
    } = this.state;
    const {
      name,
      description,
      start_date,
      end_date,
      address,
      zipcode,
      city,
      need,
      details,
    } = action;

    const action_date = moment(start_date).format('dddd DD MMMM YYYY');
    const start_time = moment(start_date).format('HH:mm');
    const end_time = moment(end_date).format('HH:mm');

    const registrationsNumber = actionRegistrations && actionRegistrations.length;
    const manquant = registrationsNumber > need ? 0 : need - registrationsNumber;

    const registration = userRegistrations.find(reg => action.action_id === reg.action_id);
    const registrationId = registration && registration.registration_id;
    const isRegistered = registrationId !== undefined;

    const isPastAction = new Date(end_date) < new Date();

    const isAdmin = user.role === 'admin';

    const button = isAdmin ? (
      registrationsNumber ? (
        <ContainedButton preset='blueButton' onClick={() => this.openModal('userModalOpen')}>
          Voir les inscrits
        </ContainedButton>
      ) : null
    ) : isPastAction ? null : isRegistered ? (
      <ContainedButton preset='redButton' onClick={() => this.openModal('actionModalOpen')}>
        Je me désinscris
      </ContainedButton>
    ) : manquant === 0 ? null : (
      <ContainedButton preset='blueButton' onClick={() => this.openModal('actionModalOpen')}>
        Je m'inscris
      </ContainedButton>
    );

    return (
      <div className='action-card'>
        <ExpansionPanel elevation={2} expanded={expansionPanelOpen}>
          <ExpansionPanelSummary
            expandIcon={
              <ExpandMore
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
              <div className='action-card-details-text'>
                <div className='action-card-description'>
                  <h4>Description</h4>
                  <p>{description}</p>
                  {details && (
                    <p className='action-card-description-details'>
                      <span>Note : </span> {details}
                    </p>
                  )}
                </div>
                {referent && (
                  <div>
                    <h4>Référent(e)</h4>
                    <p>
                      {referent.firstname} {referent.lastname} <br /> {referent.phone} <br />{' '}
                      {referent.email}
                    </p>
                  </div>
                )}
                <div>
                  <h4>Adresse</h4>
                  <p>
                    {address} <br /> {zipcode} {city}
                  </p>
                </div>
              </div>
              {isAdmin && (
                <div className='action-card-buttons'>
                  <ContainedButton style='action-card-buttons-btn' onClick={this.editAction}>
                    <Edit />
                    Modifier
                  </ContainedButton>
                  <ContainedButton
                    preset='redButton'
                    style='action-card-buttons-btn'
                    onClick={() => this.openModal('confirmModalOpen')}>
                    <Delete />
                    Supprimer
                  </ContainedButton>
                </div>
              )}
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <UserModal close={() => this.closeModal('userModalOpen')} {...this.state} {...this.props} />
        <ActionModal
          actionModalOpen={actionModalOpen}
          close={() => this.closeModal('actionModalOpen')}
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
        <Dialog open={confirmModalOpen}>
          <DialogContent>
            <div className='create-action-modal-text'>
              Êtes-vous sûr(e) de vouloir supprimer cette action ?
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.closeModal('confirmModalOpen')}>Annuler</Button>
            <Button color='secondary' onClick={() => deleteAction(action)}>
              Supprimer
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(ActionCard);
