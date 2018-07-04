import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Heading from 'rsg-components/Heading';
import Styled from 'rsg-components/Styled';

function SectionHeadingRenderer({ classes, children, id, href, depth, deprecated }) {
  const headingLevel = Math.min(6, depth);
  const sectionNameClasses = cx(classes.sectionName, {
    [classes.isDeprecated]: deprecated,
  });

  return (
    <div className={classes.wrapper}>
      <Heading level={headingLevel} id={id}>
        <a href={href} className={sectionNameClasses}>
          {children}
        </a>
      </Heading>
    </div>
  );
}

const styles = ({ color, space }) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: space[1],
  },
  toolbar: {
    marginLeft: 'auto',
  },
  sectionName: {
    '&:before': {
      content: '"#"',
      color: '#0E96D3',
      margin: '0 0 0 -22px',
      float: 'left',
    },
    '&:hover, &:active': {
      isolate: false,
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  },
  isDeprecated: {
    textDecoration: 'line-through',
    color: color.light,
  },
});

SectionHeadingRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  toolbar: PropTypes.node,
  id: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  depth: PropTypes.number.isRequired,
  deprecated: PropTypes.bool,
};

export default Styled(styles)(SectionHeadingRenderer);
