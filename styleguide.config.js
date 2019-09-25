module.exports = {
  title: 'Vi-Ui Documentation',
  components: 'src/components/[A-Z]*.vue',
  defaultExample: true,
  verbose: true,
  pagePerSection: true,
  usageMode: 'expand',
  exampleMode: 'expand',
  styleguideDir: 'static/',
  assetsDir: 'docs/assets/',
  sections: [
    {
      name: 'Instalação e Utilização',
      content: 'docs/pages/installation.md',
    },
    {
      name: 'Tipografia e Cores',
      content: 'docs/pages/thypography-colors.md',
    },
    {
      name: 'Documentação',
      components: 'src/components/*.vue',
      sectionDepth: 2,
    },
  ],
};
