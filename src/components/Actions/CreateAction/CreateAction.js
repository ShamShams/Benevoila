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

class CreateAction extends Component {
  state = {
    error: '',
    actionTypes: [],
    admins: [],
    actionTypeId: 2,
    startDate: '',
    endDate: '',
    need: 1,
    address: '',
    zipcode: '',
    city: '',
    referentId: '',
    details: '',
    dialogOpen: false,
  };

  componentDidMount = async () => {
    await this.getAllActionTypes();
    await this.getAllAdmin();
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

  createAction = async () => {
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
    const inputsToVerify = [startDate, endDate, need, address, zipcode, city];
    if (inputsToVerify.every(input => input !== '')) {
      let createdAction = null;
      try {
        createdAction = await axios.post('http://localhost:3000/actions/create', body, config);
      } catch (error) {
        console.log(error);
        this.setState({ error });
      }
      console.log(createdAction.data.msg);
      this.setState({ dialogOpen: true });
    } else {
      this.setState({
        error:
          'Il manque des informations pour créer l’action. Veuillez remplir les champs manquants.',
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
          <Header title='Créer une action' />
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
              Retour aux actions
            </ContainedButton>
            <ContainedButton preset='blueButton' onClick={this.createAction}>
              Créer l'action
            </ContainedButton>
          </div>
        </div>
        <Dialog open={dialogOpen}>
          <DialogContent>
            <div className='create-action-modal-text'>L’action a été créée avec succès.</div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.props.history.push('/admin-actions')}>OK</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default CreateAction;
