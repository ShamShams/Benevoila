import React, { Component } from 'react';

import { TextField } from '@material-ui/core';

import ContainedButton from '../ContainedButton';

import axios from 'axios';

const inputs = [
  { name: 'firstname', label: 'Prénom' },
  { name: 'lastname', label: 'Nom' },
  { name: 'email', label: 'E-mail', type: 'email' },
  { name: 'phone', label: 'Téléphone' },
  { name: 'password', label: 'Mot de passe', type: 'password' },
  { name: 'passwordConfirm', label: 'Confirmation du mot de passe', type: 'password' },
];

const phoneRegex = /\d{10}/;
const emailRegex = /[a-z0-9]+[_a-z0-9\.-]*[a-z0-9]+@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})/;

class Register extends Component {
  state = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
    passwordConfirm: '',
    submitted: false,
    registered: false,
    errorMsg: '',
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = () => {
    this.setState({ submitted: true });
    // On vérifie que les champs du formulaires ne sont pas vides
    const { firstname, lastname, email, phone, password, passwordConfirm } = this.state;
    const fieldsToVerify = [firstname, lastname, phone, email, password, passwordConfirm];
    const fieldsNotEmpty = fieldsToVerify.every(field => field !== '');
    // et qu'ils n'ont pas d'erreur
    const errors = Object.values(this.showError());
    let hasNoError = errors.every(field => !field.error);

    if (fieldsNotEmpty && hasNoError) {
      const userInfos = { firstname, lastname, email, phone, password };
      axios
        .post('http://localhost:3000/users/register', userInfos)
        .then(res => {
          console.log(res);
          if (res.data.success) {
            this.setState({ registered: true });
          } else {
            this.setState({ errorMsg: res.data.msg });
          }
        })
        .catch(err => {
          console.log(err);
          this.setState({ errorMsg: "Une erreur s'est produite. L'inscription a échoué." });
        });
    }
  };

  showError() {
    const { email, phone, password, passwordConfirm } = this.state;
    return {
      email: {
        error: !emailRegex.test(email),
        text: 'Cet e-mail n’est pas valide',
      },
      phone: {
        error: !phoneRegex.test(phone),
        text: 'Ce numéro n’est pas valide',
      },
      password: {
        error: password.length < 6,
        text: 'Le mot de passe doit comporter au moins 6 caractères',
      },
      passwordConfirm: {
        error: passwordConfirm !== password,
        text: 'Les mots de passe ne correspondent pas',
      },
    };
  }

  renderInputs = input => {
    const errors = this.showError();
    const { name, label, type } = input;
    let error = false;
    let errorText = false;
    if (this.state.submitted) {
      if (this.state[name] === '') {
        error = true;
        errorText = 'Veuillez remplir ce champ';
      } else if (errors[name]) {
        if (errors[name].error) {
          error = true;
          errorText = errors[name].text;
        }
      }
    }
    return (
      <TextField
        key={name}
        error={error}
        helperText={errorText}
        label={label}
        value={this.state[name]}
        onChange={this.handleChange(name)}
        margin='normal'
        type={type && type}
        fullWidth
      />
    );
  };

  render() {
    return (
      <div className='register'>
        <form className='register-form'>
          <h1 className='register-form-title'>Inscription</h1>
          {this.state.errorMsg && <p className='register-form-error'>{this.state.errorMsg}</p>}
          {inputs.map(this.renderInputs)}
          <ContainedButton preset='blueButton' style='register-form-btn' onClick={this.handleSubmit}>
            S'inscrire
          </ContainedButton>
        </form>
      </div>
    );
  }
}

export default Register;
