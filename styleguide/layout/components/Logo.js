import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import logo from './vittaninja.png';

const styles = ({ fontFamily, color }) => ({
	logo: {
		textAlign: 'center',
		margin: 0,
		fontFamily: fontFamily.base,
		fontSize: 18,
		fontWeight: 'normal'
	},
	image: {
		width: '55%',
		margin: '15px auto'
	},
	title: {
    fontSize: 12,
    textAlign: 'center',
    color: '#fff'
	}
});

export function LogoRenderer({ classes, children }) {
	return (
		<div className={classes.logo}>
			<img className={classes.image} src={logo} /><br/>
            <div className={classes.title}>{children}</div>
		</div>

	);
}

LogoRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.node,
};

export default Styled(styles)(LogoRenderer);
