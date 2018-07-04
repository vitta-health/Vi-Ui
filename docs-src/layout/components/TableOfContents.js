import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

const styles = ({ space, color, fontFamily, fontSize }) => ({
  root: {
    fontFamily: fontFamily.base,
  },
  search: {
    padding: '10px',
  },
  input: {
    display: 'block',
    width: '100%',
    padding: space[1],
    color: color.base,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: fontFamily.base,
    fontSize: fontSize.base,
    border: [[1, color.border, 'solid']],
    borderRadius: '10px',
    transition: 'border-color ease-in-out .15s',
    '&:focus': {
      isolate: false,
      outline: 0,
    },
    '&::placeholder': {
      isolate: false,
      fontFamily: fontFamily.base,
      fontSize: fontSize.base,
      color: color.light,
    },
  },
});

export function TableOfContentsRenderer({ classes, children, searchTerm, onSearchTermChange }) {
  return (
    <div>
      <div className={classes.root}>
        <div className={classes.search}>
          <input
            value={searchTerm}
            className={classes.input}
            placeholder="Filter by name"
            aria-label="Filter by name"
            onChange={event => onSearchTermChange(event.target.value)}
          />
        </div>
        <nav>{children}</nav>
      </div>
    </div>
  );
}

TableOfContentsRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  searchTerm: PropTypes.string.isRequired,
  onSearchTermChange: PropTypes.func.isRequired,
};

export default Styled(styles)(TableOfContentsRenderer);
