import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
} from '@material-ui/core';

import ContainedButton from '../../ContainedButton';
import Header from '../../Header';
import SideBar from '../../SideBar';

class EditAction extends Component {
  state = {
    error: '',
    actionTypes: [],
    admins: [],
    actionTypeId: '',
    startDate: '',
    endDate: '',
    need: '',
    address: '',
    zipcode: '',
    city: '',
    referentId: '',
    details: '',
    dialogOpen: false,
  };

  componentDidMount = async () => {
    const { action } = this.props.location.state;

    await this.getAllActionTypes();
    await this.getAllAdmin();

    this.setState({
      actionTypeId: action.action_type_id,
      startDate: moment(action.start_date).format('YYYY-MM-DDThh:mm'),
      endDate: moment(action.end_date).format('YYYY-MM-DDThh:mm'),
      need: action.need,
      address: action.address,
      zipcode: action.zipcode,
      city: action.city,
      referentId: action.referent_id,
      details: action.details,
    });
  };

  getAllActionTypes = async () => {
    const token = localStorage.getItem('token');
    const config = { headers: { 'x-access-token': token } };
    let actionTypes = null;
    try {
      actionTypes = await axios.get('http://localhost:3000/actionTypes', config);
    } catch (error) {
      console.log(error);
    }
    this.setState({ actionTypes: actionTypes.data });
  };

  getAllAdmin = async () => {
    const token = localStorage.getItem('token');
    const config = { headers: { 'x-access-token': token } };
    let admins = null;
    try {
      admins = await axios.get('http://localhost:3000/users/admin', config);
    } catch (error) {
      console.log(error);
    }
    this.setState({ admins: admins.data });
  };

  editAction = async () => {
    const {
      actionTypeId,
      startDate,
      endDate,
      need,
      address,
      zipcode,
      city,
      referentId,
      details,
    } = this.state;
    const body = {
      action_type_id: actionTypeId,
      address,
      zipcode,
      city,
      need,
      referent_id: referentId,
      details,
      start_date: startDate,
      end_date: endDate,
    };
    const token = localStorage.getItem('token');
    const config = { headers: { 'x-access-token': token } };
    const { action_id } = this.props.location.state.action;
    const inputsToVerify = [startDate, endDate, need, address, zipcode, city];
    if (inputsToVerify.every(input => input !== '')) {
      let editedAction = null;
      try {
        editedAction = await axios.put(`http://localhost:3000/actions/${action_id}`, body, config);
      } catch (error) {
        console.log(error);
        this.setState({ error });
      }
      console.log(editedAction.data.msg);
      this.setState({ dialogOpen: true });
    } else {
      this.setState({
        error:
          'Il manque des informations pour modifier l’action. Veuillez remplir les champs manquants.',
      });
    }
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const {
      error,
      actionTypes,
      admins,
      actionTypeId,
      startDate,
      endDate,
      need,
      address,
      zipcode,
      city,
      referentId,
      details,
      dialogOpen,
    } = this.state;

    return (
      <div>
        <SideBar {...this.props} />
        <div className='create-action'>
          <Header title='Modifier une action' />
          <form className='create-action-form' autoComplete='off'>
            <div className='create-action-form-row'>
              <FormControl>
                <InputLabel htmlFor='action-type-id'>Type d'action</InputLabel>
                <Select
                  className='create-action-form-action-types'
                  value={actionTypeId}
                  onChange={this.handleChange('actionTypeId')}
                  inputProps={{
                    name: 'actionTypeId',
                    id: 'action-type-id',
                  }}>
                  {actionTypes.map((type, i) => (
                    <MenuItem key={i} value={type.action_type_id}>
                      {type.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                id='standard-number'
                className='create-action-form-need'
                label='Bénévoles'
                value={need}
                onChange={this.handleChange('need')}
                type='number'
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id='datetime-local'
                label='Début'
                type='datetime-local'
                value={startDate}
                onChange={this.handleChange('startDate')}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id='datetime-local'
                label='Fin'
                type='datetime-local'
                value={endDate}
                onChange={this.handleChange('endDate')}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>

            <div className='create-action-form-row'>
              <TextField
                id='standard-name'
                label='Adresse'
                className='create-action-form-address'
                value={address}
                onChange={this.handleChange('address')}
              />
              <TextField
                id='standard-name'
                label='Code postal'
                className='create-action-form-zipcode'
                value={zipcode}
                onChange={this.handleChange('zipcode')}
              />
              <TextField
                id='standard-name'
                label='Ville'
                className='create-action-form-city'
                value={city}
                onChange={this.handleChange('city')}
              />
            </div>

            <div className='create-action-form-row'>
              <FormControl>
                <InputLabel htmlFor='referent-id'>Référent</InputLabel>
                <Select
                  className='create-action-form-referent'
                  value={referentId}
                  onChange={this.handleChange('referentId')}
                  inputProps={{
                    name: 'referentId',
                    id: 'referent-id',
                  }}>
                  {admins.map((admin, i) => (
                    <MenuItem key={i} value={admin.user_id}>
                      {admin.firstname} {admin.lastname}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                id='standard-name'
                label='Détails de l’action'
                className='create-action-form-details'
                value={details}
                onChange={this.handleChange('details')}
              />
            </div>
          </form>
          <p className='create-action-error'>{error ? error : ''}</p>
          <div className='create-action-buttons'>
            <ContainedButton onClick={() => this.props.history.push('admin-actions')}>
              Annuler
            </ContainedButton>
            <ContainedButton preset='blueButton' onClick={this.editAction}>
              Modifier l'action
            </ContainedButton>
          </div>
        </div>
        <Dialog open={dialogOpen}>
          <DialogContent>
            <div className='create-action-modal-text'>L’action a été modifiée avec succès.</div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.props.history.push('/admin-actions')}>OK</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default EditAction;
