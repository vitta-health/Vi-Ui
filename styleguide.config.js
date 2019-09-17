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
      name: 'instalacao_e_utilizacao',
      content: 'docs/pages/installation.md',
    },
    {
      name: 'tipografia_e_cores',
      content: 'docs/pages/thypography-colors.md',
    },
    {
      name: 'documentacao',
      components: 'src/components/*.vue',
      sectionDepth: 2,
    },
  ],
};