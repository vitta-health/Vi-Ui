import * as components from './components';

const ViUi = {
  /**
   * Método responsável por registrar o framework no Vue
   * @param Vue -> instância do Vue em qual o framework será instalado
   * @param Options -> Configurações que poderão ser utilizadas na instalação do framework.
   *  Ex.: A La-carte components e configurações de tema via JS.
   */
  install(Vue, Options) {

    // Instalando os componentes do Framework na instância Vue
    Object.keys(components).forEach(component => {
      let componentName = components[component].name;
      // Registrando o componente. Aqui seria interessante fazer a utilização do "A La-Carte componente", o componente
      // só sera registrado caso esteja na lista de componentes informado em Options.
      Vue.component(componentName, components[component]);
    })

    // Abaixo fica livre para instalar Vue.directive, Vue.filter e etc.

  },
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(ViUi);
}

export default ViUi;
