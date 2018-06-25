const path = require('path');
const webpackConfig = require('../webpack.config');
const sectionsMenu = require('./pages/sections');

module.exports = {
  title: 'Vi-Ui Documentation',
  components: '../src/components/[A-Z]*.vue',
  sortProps: props => props,
  webpackConfig,
  showUsage: true,
  showCode: true,
  navigation: true,
  require: [
    'babel-polyfill',
    path.join(__dirname, './layout/style.css'),
  ],
  styleguideComponents: {
    /**
     * @todo padronizar estilo do styleguide com as mesmas regras de design do Vi-Ui
     * @todo corrigir responsividade do styleguidist
     * SectionRenderer: path.join(__dirname, 'layout/components/Section'),
     * HeadingRenderer: path.join(__dirname, 'layout/components/Heading'),
     * SectionHeadingRenderer: path.join(__dirname, 'layout/components/SectionHeading'),
     * LinkRenderer: path.join(__dirname, 'layout/components/Link'),
     * StyleGuideRenderer: path.join(__dirname, 'layout/components/StyleGuide'),
     * LogoRenderer: path.join(__dirname, 'layout/components/Logo'),
     * ComponentsListRenderer: path.join(__dirname, 'layout/components/ComponentsList'),
     * TableOfContentsRenderer: path.join(__dirname, 'layout/components/TableOfContents'),
     */
  },
  template: {
    head: {
      links: [{
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Montserrat:400,500,500i,700,700i'
      }],
      meta: [{
          name: "viewport",
          content: "width=device-width,initial-scale=1.0,viewport-fit=cover",
        },
        {
          name: "format-detection",
          content: "telephone=no",
        },
      ],
    },
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
    fontWeigth: 500,
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
      text: ['"Roboto"', 'Arial', 'Helvetica', 'sans-serif'],
      base: ['Montserrat', 'Futura', '"Trebuchet MS"', 'sans-serif'],
      monospace: ['"Source Code Pro"', 'Consolas', '"Liberation Mono"', 'Menlo', 'monospace'],

    },
  },
  styles: {
    Link: {
      color: '#333',
    },
  },
  sections: sectionsMenu,
};
