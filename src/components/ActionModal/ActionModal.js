import React from 'react';

import { Button, Dialog, DialogContent } from '@material-ui/core';
import ContainedButton from '../ContainedButton';

import './ActionModal.scss';

const ActionModal = ({ dialogOpen, name, date, start, end, address, zipcode, city, description, need, isRegistered, handleRegister, close }) => (
    <div>
        <Dialog
            open={dialogOpen}
            aria-labelledby="alert-dialog-title"
        >
            <DialogContent>
                <div className="action-modal-header">
                    { isRegistered
                        ? <p>Êtes-vous sûr(e) de vouloir vous désinscrire de cette action ?</p>
                        : <p>Voulez-vous vous inscrire à cette action ?</p>
                    }
                </div>
                <p className="action-modal-title">{name}</p>
                <div className="action-card-details">
                    <div>
                        <h4>Date</h4>
                        <p>{date}</p>
                    </div>
                    <div>
                        <h4>Horaires</h4>
                        <p>{start} - {end}</p>
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
                        <Button onClick={close}>
                            Annuler
                        </Button>
                    </div>
                    <div className="action-modal-button">
                        {isRegistered ? (
                            <ContainedButton color="redButton" handleClick={handleRegister}>
                                Je me désinscris
                            </ContainedButton>
                        ) : (
                            <ContainedButton color="blueButton" handleClick={handleRegister}>
                                Je m'inscris
                            </ContainedButton>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    </div>
);

export default ActionModal;
