import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';

const Loader = ({}) => (
  <div style={{ textAlign: 'center' }}>
    <CircularProgress size={60} style={{ color: '#00acc1' }} />
    <p>Chargement...</p>
  </div>
);

export default Loader;
