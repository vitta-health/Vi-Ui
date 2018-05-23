import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import logo from './vi-ui.svg';

const npmPac = require('../../../package.json');

const styles = ({ fontFamily }) => ({
  logo: {
    margin: '0 0 10px',
    fontFamily: fontFamily.base,
    fontSize: 18,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '118px',
  },
  title: {
    color: '#333',
    fontSize: 63,
    marginLeft: '10px',
  },
  version: {
    display: 'block',
    fontWeight: '700',
    textAlign: 'right',
    fontSize: 15,
    color: '#4ac7ff',
  },
});

export function LogoRenderer({ classes, children }) {
  return (
    <div className={classes.logo}>
      <img className={classes.image} src={logo} alt="Vitta Ui" />
      <div className={classes.title} title={children}>
        Vi-Ui
        <small className={classes.version}>v{npmPac.version}</small>
      </div>
    </div>
  );
}

LogoRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
};

export default Styled(styles)(LogoRenderer);
