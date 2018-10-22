const sections = [{
  name: 'instalacao_e_utilizacao',
  content: 'pages/installation.md',
},
{
  name: 'tipografia_e_cores',
  content: 'pages/thypography-colors.md',
},
{
  name: 'documentacao',
  components: '../src/components/*.vue',
  sectionDepth: 2,
},
];

module.exports = sections;
