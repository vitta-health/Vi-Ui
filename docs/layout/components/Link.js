import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Styled from 'rsg-components/Styled';

const styles = ({ color }) => ({
  link: {
    '&, &:link, &:visited': {
      color: '#333',
      fontWeight: '700',
      textDecoration: 'none',
      fontSize: '0.95em',
    },
    '&:hover, &:active': {
      isolate: false,
      color: '#24aee4',
      cursor: 'pointer',
    },
  },
});

export function LinkRenderer({ classes, children, ...props }) {
  return (
    <a {...props} className={cx(classes.link, props.className)}>
      {children}
    </a>
  );
}

LinkRenderer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

export default Styled(styles)(LinkRenderer);
