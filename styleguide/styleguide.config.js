const path = require('path');
const webpackConfig = require('../webpack.config');
const sectionsMenu = require('./docs/sections');

module.exports = {
  title: 'Vitta Styleguide',
  components: '../src/components/[A-Z]*.vue',
  styleguideComponents: {
    LogoRenderer: path.join(__dirname, '/layout/components/Logo')
  },
  webpackConfig,
  showUsage: true,
  showCode: true,
  require: [
    'babel-polyfill',
    path.join(__dirname, './layout/style.css'),
  ],
  sections: sectionsMenu,
};

