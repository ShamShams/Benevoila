import React from 'react';

import { Dialog, DialogContent, IconButton, List, ListItem, ListItemText } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Clear';

const UserModal = ({ dialogOpen, close, registeredUsers }) => {
  return (
    <div className='user-modal'>
      <Dialog open={dialogOpen} aria-labelledby='alert-dialog-title'>
        <div className='user-modal-close'>
          <IconButton onClick={close}>
            <CloseIcon />
          </IconButton>
        </div>
        <DialogContent>
          <div className='user-modal-header'>
            <p>
              Les bénévoles inscrits <br /> à cette action
            </p>
          </div>
          <List>
            {registeredUsers.map(user => (
              <ListItem key={user.user_id}>
                <ListItemText
                  primary={`${user.firstname} ${user.lastname}`}
                  secondary={`${user.phone} - ${user.email}`}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserModal;
