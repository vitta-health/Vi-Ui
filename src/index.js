import ViAlert from './components/Alert';
import ViButton from './components/Button';
import ViButtonGroup from './components/ButtonGroup';
import ViCard from './components/Card';
import ViIcon from './components/Icon';
import ViInput from './components/Input';
import ViDatepicker from './components/InputDatepicker';
import ViInputFile from './components/InputFile';
import ViSelect from './components/InputSelect';
import ViCheckbox from './components/InputRadioCheckbox';
import ViLoading from './components/Loading';
import ViModal from './components/Modal';
import ViPagination from './components/Pagination';
import ViTable from './components/Table';
import ViWrapper from './components/Wrapper';
import ViTooltip from './components/Tooltip';
import ViTabs from './components/Tabs';

const ViUi = {
  install(Vue) {
    Vue.component(ViAlert.name, ViAlert);
    Vue.component(ViButton.name, ViButton);
    Vue.component(ViButtonGroup.name, ViButtonGroup);
    Vue.component(ViCard.name, ViCard);
    Vue.component(ViIcon.name, ViIcon);
    Vue.component(ViInput.name, ViInput);
    Vue.component(ViDatepicker.name, ViDatepicker);
    Vue.component(ViInputFile.name, ViInputFile);
    Vue.component(ViCheckbox.name, ViCheckbox);
    Vue.component(ViSelect.name, ViSelect);
    Vue.component(ViLoading.name, ViLoading);
    Vue.component(ViModal.name, ViModal);
    Vue.component(ViPagination.name, ViPagination);
    Vue.component(ViTable.name, ViTable);
    Vue.component(ViTabs.name, ViTabs);
    Vue.component(ViTooltip.name, ViTooltip);
    Vue.component(ViWrapper.name, ViWrapper);
  },
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(ViUi);
}

export default ViUi;
