import React, { Component } from 'react';

import { TextField } from "@material-ui/core";

import ContainedButton from '../ContainedButton';

import './Register.scss';

const inputs = [
    {name: 'firstname', label: "Prénom"},
    {name: 'lastname', label: "Nom"},
    {name: 'email', label: "E-mail", type: "email"},
    {name: 'phone', label: "Téléphone"},
    {name: 'password', label: "Mot de passe", type: "password"},
    {name: 'passwordConfirm', label: "Confirmation du mot de passe", type: "password"},
];

const phoneRegex = /\d{10}/;
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class Register extends Component {
    state = {
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        password: '',
        passwordConfirm: '',
        submitted: false,
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleClick = () => {
        this.setState({ submitted: true });
    };

    showError() {
        const { email, phone, password, passwordConfirm } = this.state;    
        return {
            email: {
                error: !emailRegex.test(email), 
                text: 'Cet e-mail n’est pas valide'
            },
            phone: {
                error: !phoneRegex.test(phone), 
                text: 'Ce numéro n’est pas valide'
            },
            password: {
                error: password.length < 6, 
                text: 'Le mot de passe doit comporter au moins 6 caractères'
            },
            passwordConfirm: {
                error: passwordConfirm !== password,
                text: 'Les mots de passe ne correspondent pas'
            },
        };
    };

    render() {
        const errors = this.showError();
        return (
            <div className="register">
                <form className="register-form">
                    <h1 className="register-form-title">Inscription</h1>
                    { inputs.map(input => {
                        
                        const {name, label, type} = input;
                        const isEmpty = this.state[name] === '';
                        let error = false; 
                        let errorText = false;

                        if (this.state.submitted) {
                            if (isEmpty) {
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
                                margin="normal"
                                type={type && type}
                                fullWidth
                            />
                        );
                    })}
                    <ContainedButton 
                        preset="blueButton" 
                        style="register-form-btn"
                        onClick={this.handleClick}
                    >
                        S'inscrire
                    </ContainedButton>
                </form>
            </div>
        );
    }

}

export default Register;
