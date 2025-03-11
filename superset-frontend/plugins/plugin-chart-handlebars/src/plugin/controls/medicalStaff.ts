/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
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

export const isMedicalStaffTableControl: ControlSetItem = {
  name: 'isMedicalStaffTableControl',
  config: {
    type: 'CheckboxControl',
    label: 'Indicator what is Medical Staff Table',
    renderTrigger: true,
    default: false,
    description: 'Indicator what is Medical Table',
    visibility: ({ controls }: ControlPanelsContainerProps) =>
      Boolean(controls?.isMedicalStaff?.value),
  },
};
