import * as components from './components';

const ViUi = {
  /**
   *
   * Method responsible for register Vi-Ui on VueJS
   * @param Vue -> Vue install for Vi-Ui register
   * @param Options -> Additional configuration that can be use on Vi-ui register
   *  Eg.: A La-carte components and theme configuration with JS.
   */
  install(Vue, Options) {


    // Get all Vi-Ui components and install them.
    Object.keys(components).forEach(component => {
      let componentName = components[component].name;
      // Registering the component.
      // Here is a interesting place to do dinamic register. Register a component only if it was specified on Options.
      Vue.component(componentName, components[component]);
    })

    // Below can be register Vue.directive, Vue.filter and etc, following the above code.

  },
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(ViUi);
}

export default ViUi;
