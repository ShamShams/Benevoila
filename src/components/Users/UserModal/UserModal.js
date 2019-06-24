import React from 'react';

import { Dialog, DialogContent, IconButton, List, ListItem, ListItemText } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Clear';

const UserModal = ({ userModalOpen, close, registeredUsers }) => {
  return (
    <div className='user-modal'>
      <Dialog open={userModalOpen} aria-labelledby='alert-dialog-title'>
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
            {registeredUsers
              .sort((a, b) => a.firstname.localeCompare(b.firstname))
              .map(user => (
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
