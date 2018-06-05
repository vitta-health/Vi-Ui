const path = require('path');
const webpackConfig = require('../webpack.config');
const sectionsMenu = require('./pages/sections');

module.exports = {
  title: 'Vi-Ui Documentation',
  components: '../src/components/[A-Z]*.vue',
  sortProps: props => props,
  webpackConfig,
  showUsage: true,
  showCode: false,
  require: ['babel-polyfill', path.join(__dirname, './layout/style.css')],
  styleguideComponents: {
    SectionRenderer: path.join(__dirname, 'layout/components/Section'),
    HeadingRenderer: path.join(__dirname, 'layout/components/Heading'),
    SectionHeadingRenderer: path.join(__dirname, 'layout/components/SectionHeading'),
    LogoRenderer: path.join(__dirname, 'layout/components/Logo'),
    StyleGuideRenderer: path.join(__dirname, 'layout/components/StyleGuide'),
    LinkRenderer: path.join(__dirname, 'layout/components/Link'),
    ComponentsListRenderer: path.join(__dirname, 'layout/components/ComponentsList'),
    TableOfContentsRenderer: path.join(__dirname, 'layout/components/TableOfContents'),
  },
  theme: {
    color: {
      base: '#333',
      sidebarBackground: '#fff',
      link: '#0E96D3',
      linkHover: '#28588C',
      error: '#E45B5B',
    },
    sidebarWidth: 300,
    fontWeigth: 300,
    fontSize: {
      base: 16,
      text: 16,
      small: 13,
      h1: 29,
      h2: 25,
      h3: 20,
      h4: 18,
      h5: 16,
      h6: 16,
    },
    fontFamily: {
      base: ['"Roboto"', '"RobotoFallback"', '"Helvetica Neue"', 'sans-serif'],
      monospace: ['Consolas', '"Liberation Mono"', 'Menlo', 'monospace'],

    },
  },
  styles: {
    Link: {
      color: '#333',
    },
  },
  sections: sectionsMenu,
};
