import React, { Component } from 'react';
import axios from 'axios';

import { NavLink } from 'react-router-dom';

import ContainedButton from '../ContainedButton';
import { TextField } from '@material-ui/core';

const inputs = [
  { name: 'email', label: 'E-mail', type: 'email' },
  { name: 'password', label: 'Mot de passe', type: 'password' },
];

class Login extends Component {
  state = {
    email: '',
    password: '',
    error: false,
    errorMsg: '',
    submitted: false,
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = () => {
    const { email, password } = this.state;

    this.setState({ submitted: true });
    if (email !== '' && password !== '') {
      axios
        .post('http://localhost:3000/users/login', { email, password })
        .then(res => {
          if (res.data.success) {
            localStorage.setItem('token', res.data.token);
            this.props.authenticate();
          } else {
            this.setState({ errorMsg: res.data.msg });
          }
        })
        .catch(err => {
          console.log(err);
          this.setState({ errorMsg: "Une erreur s'est produite lors de la connexion." });
        });
    }
  };

  renderInputs = input => {
    const { name, label, type } = input;
    let error = false;
    let errorText = false;
    if (this.state.submitted) {
      if (this.state[name] === '') {
        error = true;
        errorText = 'Veuillez remplir ce champ';
      }
    }
    return (
      <TextField
        key={name}
        error={error}
        helperText={errorText}
        name={name}
        label={label}
        value={this.state[name]}
        onChange={this.handleChange(name)}
        margin='normal'
        type={type}
        fullWidth
      />
    );
  };

  render() {
    return (
      <div className='login'>
        <img className='login-logo' src='/src/assets/images/logo-blanc.png' />
        <div className='login-benevoila'>
          créé par <span>Bénévoilà</span>
        </div>
        <form className='login-form'>
          <h1 className='login-form-title'>Connexion</h1>
          {inputs.map(this.renderInputs)}
          {this.state.errorMsg && <p className='register-form-error'>{this.state.errorMsg}</p>}
          <ContainedButton preset='blueButton' style='login-form-btn' onClick={this.handleSubmit}>
            Se connecter
          </ContainedButton>
          <p className='login-bottom'>
            Pas de compte bénévole ?{' '}
            <NavLink className='login-bottom-link' to='/inscription'>
              Inscrivez-vous
            </NavLink>{' '}
          </p>
        </form>
      </div>
    );
  }
}

export default Login;
