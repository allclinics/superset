import {
  ControlPanelsContainerProps,
  ControlSetItem,
} from '@superset-ui/chart-controls';

export const isMedicalStaffControl: ControlSetItem = {
  name: 'isMedicalStaff',
  config: {
    type: 'CheckboxControl',
    label: 'Adds styles to charts related to Medical Staff',
    renderTrigger: true,
    default: false,
    description: 'Adds styles to charts related to Medical Staff',
  },
};

export const isMedicalStaffOverviewControl: ControlSetItem = {
  name: 'isMedicalStaffOverview',
  config: {
    type: 'CheckboxControl',
    label: 'Indicator what is Medical Staff Overview',
    renderTrigger: true,
    default: false,
    description: 'Indicator what is Medical Staff Overview',
    visibility: ({ controls }: ControlPanelsContainerProps) =>
      Boolean(controls?.isMedicalStaff?.value),
  },
};

export const isMedicalStaffPerformedProceduresControl: ControlSetItem = {
  name: 'isMedicalStaffPerformedProcedures',
  config: {
    type: 'CheckboxControl',
    label: 'Indicator what is Medical Staff Performed Procedure',
    renderTrigger: true,
    default: false,
    description: 'Indicator what is Medical Performed Procedure',
    visibility: ({ controls }: ControlPanelsContainerProps) =>
      Boolean(controls?.isMedicalStaff?.value),
  },
};

export const isMedicalStaffScoresControl: ControlSetItem = {
  name: 'isMedicalStaffScoresControl',
  config: {
    type: 'CheckboxControl',
    label: 'Indicator what is Medical Staff Scores',
    renderTrigger: true,
    default: false,
    description: 'Indicator what is Medical Staff Scores',
    visibility: ({ controls }: ControlPanelsContainerProps) =>
      Boolean(controls?.isMedicalStaff?.value),
  },
};
