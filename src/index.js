import ViAlert from './components/Alert.vue';
import ViButton from './components/Button.vue';
import ViButtonGroup from './components/ButtonGroup.vue';
import ViCard from './components/Card.vue';
import ViIcon from './components/Icon.vue';
import ViInput from './components/Input.vue';
import ViDatepicker from './components/InputDatepicker.vue';
import ViDragDrop from './components/DragDrop.vue';
import ViInputFile from './components/InputFile.vue';
import ViSelect from './components/InputSelect.vue';
import ViCheckbox from './components/InputRadioCheckbox.vue';
import ViLoading from './components/Loading.vue';
import ViModal from './components/Modal.vue';
import ViPagination from './components/Pagination.vue';
import ViTable from './components/Table.vue';
import ViWrapper from './components/Wrapper.vue';
import ViTooltip from './components/Tooltip.vue';
import ViTabs from './components/Tabs.vue';

const ViUi = {
  install(Vue) {
    Vue.component(ViAlert.name, ViAlert);
    Vue.component(ViButton.name, ViButton);
    Vue.component(ViButtonGroup.name, ViButtonGroup);
    Vue.component(ViCard.name, ViCard);
    Vue.component(ViIcon.name, ViIcon);
    Vue.component(ViInput.name, ViInput);
    Vue.component(ViDatepicker.name, ViDatepicker);
    Vue.component(ViDatepicker.name, ViDragDrop);
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
