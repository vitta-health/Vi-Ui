module.exports = {
  title: 'Vi-Ui Documentation',
  components: 'src/components/[A-Z]*.vue',
  defaultExample: true,
  verbose: true,
  pagePerSection: true,
  usageMode: 'expand',
  exampleMode: 'expand',
  styleguideDir: 'docs/',
  assetsDir: 'docsSrc/assets/',
  sections: [
    {
      name: 'Instalação e Utilização',
      content: 'docsSrc/pages/installation.md',
    },
    {
      name: 'Tipografia e Cores',
      content: 'docsSrc/pages/thypography-colors.md',
    },
    {
      name: 'Documentação',
      components: 'src/components/*.vue',
      sectionDepth: 2,
    },
  ],
};
