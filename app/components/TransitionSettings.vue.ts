import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Inject } from 'util/injector';
import { TransitionsService, ETransitionType } from 'services/transitions';
import * as inputComponents from 'components/obs/inputs';
import { TObsFormData, IObsInput } from 'components/obs/inputs/ObsInput';
import GenericForm from 'components/obs/inputs/GenericForm.vue';
import { $t } from 'services/i18n';
import VFormGroup from 'components/shared/inputs/VFormGroup.vue';

@Component({
  components: {
    GenericForm,
    VFormGroup,
    ...inputComponents,
  },
})
export default class SceneTransitions extends Vue {
  @Inject() transitionsService: TransitionsService;

  @Prop() transitionId: string;

  get typeModel(): ETransitionType {
    return this.transitionsService.state.transitions.find(tran => tran.id === this.transitionId)
      .type;
  }

  set typeModel(value: ETransitionType) {
    this.transitionsService.changeTransitionType(this.transitionId, value);
    this.properties = this.transitionsService.getPropertiesFormData(this.transitionId);
  }

  get typeOptions() {
    return this.transitionsService.getTypes();
  }

  get durationModel(): IObsInput<number> {
    return {
      description: $t('Duration'),
      name: 'duration',
      value: this.transition.duration,
    };
  }

  set durationModel(model: IObsInput<number>) {
    this.transitionsService.setDuration(this.transitionId, model.value);
  }

  get nameModel(): string {
    return this.transition.name;
  }

  set nameModel(name: string) {
    this.transitionsService.renameTransition(this.transitionId, name);
  }

  get transition() {
    return this.transitionsService.getTransition(this.transitionId);
  }

  properties = this.transitionsService.getPropertiesFormData(this.transitionId);

  saveProperties(props: TObsFormData) {
    this.transitionsService.setPropertiesFormData(this.transitionId, props);
  }
}
