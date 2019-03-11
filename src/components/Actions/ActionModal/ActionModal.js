import React from 'react';

import { Button, Dialog, DialogContent } from '@material-ui/core';
import ContainedButton from '../../ContainedButton';

const ActionModal = ({
  actionModalOpen,
  action,
  date,
  start,
  end,
  isRegistered,
  registrationId,
  registrationsNumber,
  manquant,
  handleRegister,
  getActionRegistrations,
  close,
}) => {
  const { name, description, address, zipcode, city } = action;

  const register = async () => {
    await handleRegister(action, isRegistered, registrationId);
    getActionRegistrations();
    close();
  };

  return (
    <div>
      <Dialog open={actionModalOpen} aria-labelledby='alert-dialog-title'>
        <DialogContent>
          <div className='action-modal-header'>
            {isRegistered ? (
              <p>Êtes-vous sûr(e) de vouloir vous désinscrire de cette action ?</p>
            ) : (
              <p>Voulez-vous vous inscrire à cette action ?</p>
            )}
          </div>
          <p className='action-modal-title'>{name}</p>
          <div className='action-card-details'>
            <div>
              <h4>Date</h4>
              <p className='capitalize'>{date}</p>
            </div>
            <div>
              <h4>Horaires</h4>
              <p>
                {start} - {end}
              </p>
            </div>
            <div>
              <h4>Lieu</h4>
              <p>
                {address} <br /> {zipcode} {city}
              </p>
            </div>
          </div>
          <div className='action-card-details'>
            <div>
              <h4>Description</h4>
              <p>{description}</p>
            </div>
          </div>
          <br />
          <div className='action-card-details'>
            <div>
              <h4>Nombre de bénévoles</h4>
              <div className='action-modal-vlt-infos'>
                <p>
                  Inscrits :<span className='action-card-vlt-reg'>{registrationsNumber}</span>
                </p>
                <p>
                  Manquants :<span className='action-card-vlt-needed'>{manquant}</span>
                </p>
              </div>
            </div>
          </div>
          <div className='action-modal-buttons'>
            <div className='action-modal-button'>
              <Button onClick={close}>Annuler</Button>
            </div>
            <div className='action-modal-button'>
              {isRegistered ? (
                <ContainedButton preset='redButton' onClick={register}>
                  Je me désinscris
                </ContainedButton>
              ) : (
                <ContainedButton preset='blueButton' onClick={register}>
                  Je m'inscris
                </ContainedButton>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ActionModal;
