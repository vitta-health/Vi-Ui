
import React from 'react';
import GithubCorner from 'react-github-corner';
import PropTypes from 'prop-types';
import Logo from 'rsg-components/Logo';
import Markdown from 'rsg-components/Markdown';
import Styled from 'rsg-components/Styled';
import cx from 'classnames';
import Ribbon from 'rsg-components/Ribbon';

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
    });
  });
});

const styles = ({ color, fontFamily, fontSize, sidebarWidth, mq, space, maxWidth }) => ({
  root: {
    backgroundColor: color.baseBackground,
  },
  hasSidebar: {
    [mq.small]: {
      paddingLeft: 0,
    },
  },
  content: {
    padding: '0 40px',
    paddingLeft: sidebarWidth,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: color.sidebarBackground,
    border: [[1, color.border, 'solid']],
    borderWidth: [[0, 1, 0, 0]],
    height: '100vh',
    minWidth: sidebarWidth,
    overflow: 'auto',
    '-webkit-overflow-scrolling': 'touch',
    [mq.small]: {
      position: 'static',
      width: 'auto',
      borderWidth: [[1, 0, 0, 0]],
      paddingBottom: space[0],
    },
  },
  sidebarScroll: {
    position: 'fixed',
  },
  footer: {
    color: color.light,
    display: 'block',
    fontFamily: fontFamily.base,
    fontSize: fontSize.small,
    margin: '20px auto',
  },
  article: {
    display: 'flex',
    flexDirection: 'row-reverse',
    margin: 'auto',
    padding: '40px',
    position: 'relative',
  },
  header: {
    backgroundImage: 'linear-gradient(to right top, #63ffc8, #9cffec, #b2f9f6, #b2f6fc, #b5f2ff)',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  call: {
    color: '#3e595d',
    fontSize: 29,
    fontWeight: '300',
    textAlign: 'center',
    margin: '0 0 20px',
  },
  badges: {
    color: '#3e595d',
    fontSize: 29,
    fontWeight: '300',
    textAlign: 'center',
    margin: '20px 0 0',

  },
});

class MenuFixed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollFixPos: false,
    };
  }
  componentDidMount() {
    window.onscroll = () => {
      this.setState({
        scrollFixPos: window.innerHeight < document.getElementsByTagName('html')[0].scrollTop,
      });
    };
  }
  getScrollPosition() {
    if (this.state.scrollFixPos) {
      return `${this.props.classes.sidebar} ${this.props.classes.sidebarScroll}`;
    }
    return this.props.classes.sidebar;
  }
  render() {
    return (
      <div className={this.getScrollPosition(this.propsclasses)}>
        {this.props.toc}
      </div>
    );
  }
}

export function StyleGuideRenderer({ classes, title, homepageUrl, children, toc, hasSidebar }) {

  return (
    <div className={cx(classes.root, hasSidebar && classes.hasSidebar)}>
      <GithubCorner octoColor="#b5f3ff" href="https://bitbucket.org/vittapros/styleguide/" />
      <header className={classes.header}>
        <div className={classes.logo}>
          <Logo>{title}</Logo>
        </div>
        <div className={classes.badges}>
          <Markdown text={`[![npm version](https://badge.fury.io/js/npm.svg)](https://badge.fury.io/js/npm)
          [![Vue version](https://img.shields.io/badge/vue-2.5.16-green.svg)](https://badge.fury.io/js/npm)`} />
        </div>
        <h2 className={classes.call}>A Simple but consistent<br />Vue user interface</h2>
        <button
          onClick={() => {
              document.getElementById('documetacao-bloco').scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });
            }
          }
          className="ViButton ViButton--large color-primary--background color-primary--hover"
        >Documentação</button>
      </header>
      <article id="documetacao-bloco" className={classes.article}>
        <main className={classes.content}>
          {children}
        </main>
        {hasSidebar && (
          <MenuFixed toc={toc} classes={classes} />
        )}
      </article>
      <footer className={classes.footer}>
        <Markdown text={`Generated with [Vue Styleguidist](${homepageUrl})`} />
      </footer>
      <Ribbon />
    </div>
  );
}

StyleGuideRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  homepageUrl: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  toc: PropTypes.node.isRequired,
  hasSidebar: PropTypes.bool,
};

export default Styled(styles)(StyleGuideRenderer);
