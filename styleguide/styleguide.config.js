const path = require('path');
const webpackConfig = require('../webpack.config');
const sectionsMenu = require('./docs/sections');

module.exports = {
  title: 'Vitta Styleguide',
  components: '../src/components/[A-Z]*.vue',
  styleguideComponents: {
    LogoRenderer: path.join(__dirname, '/layout/components/Logo'),
  },
  sortProps: props => props,
  webpackConfig,
  showUsage: true,
  showCode: true,
  require: ['babel-polyfill', path.join(__dirname, './layout/style.css')],
  theme: {
    color: {
      base: '#333',
      sidebarBackground: '#1373b4',
    },
    fontFamily: {
      base: [
        '"Roboto"',
        '"Droid Sans"',
        '"Helvetica Neue"',
        'sans-serif',
      ],
      monospace: ['monospace'],

    },
  },
  sections: sectionsMenu,
};
