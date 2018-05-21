const path = require('path');
const webpackConfig = require('../webpack.config');
const sectionsMenu = require('./docs/sections');

module.exports = {
  title: 'Vitta Styleguide',
  components: '../src/components/[A-Z]*.vue',
  sortProps: props => props,
  webpackConfig,
  showUsage: true,
  showCode: true,
  require: ['babel-polyfill', path.join(__dirname, './layout/style.css')],
  theme: {
    color: {
      base: '#333',
      sidebarBackground: '#28588C',
      link: '#0E96D3',
      linkHover: '#28588C',
      error: '#E45B5B',
    },
    fontWeigth: 300,
    fontSize: {
      base: 16,
      text: 16,
      small: 13,
      h1: 48,
      h2: 36,
      h3: 24,
      h4: 18,
      h5: 16,
      h6: 16,
    },
    fontFamily: {
      base: ['"Roboto"', '"RobotoFallback"', '"Helvetica Neue"', 'sans-serif'],
      monospace: ['Consolas', '"Liberation Mono"', 'Menlo', 'monospace'],

    },
  },
  sections: sectionsMenu,
};
