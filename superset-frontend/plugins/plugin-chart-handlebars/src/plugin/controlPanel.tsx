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
  ControlPanelConfig,
  getStandardizedControls,
} from '@superset-ui/chart-controls';
import { t } from '@superset-ui/core';
import { allColumnsControlSetItem } from './controls/columns';
import { groupByControlSetItem } from './controls/groupBy';
import { handlebarsTemplateControlSetItem } from './controls/handlebarTemplate';
import { includeTimeControlSetItem } from './controls/includeTime';
import {
  rowLimitControlSetItem,
  timeSeriesLimitMetricControlSetItem,
} from './controls/limits';
import {
  metricsControlSetItem,
  percentMetricsControlSetItem,
  showTotalsControlSetItem,
} from './controls/metrics';
import {
  orderByControlSetItem,
  orderDescendingControlSetItem,
} from './controls/orderBy';
import {
  serverPageLengthControlSetItem,
  serverPaginationControlSetRow,
} from './controls/pagination';
import { queryModeControlSetItem } from './controls/queryMode';
import { styleControlSetItem } from './controls/style';
import { fullDisplayControl } from './controls/fullDisplay';
import { showMapControl } from './controls/showMap';
import { isLocationMatricsControl } from './controls/isLocationMetrics';
import { isFullHeightControl } from './controls/isFullHeight';
import {
  isMedicalStaffControl,
  isMedicalStaffOverviewControl,
  isMedicalStaffPerformedProceduresControl,
  isMedicalStaffScoresControl,
} from './controls/MedicalStaff';

const config: ControlPanelConfig = {
  controlPanelSections: [
    {
      label: t('Show Loader'),
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'showLoader',
            config: {
              type: 'CheckboxControl',
              label: 'Show Loader',
              renderTrigger: true,
              default: true,
              description: 'Show Loader',
            },
          },
        ],
        [
          {
            name: 'isFullSizeLoader',
            config: {
              type: 'CheckboxControl',
              label: 'Full size loader',
              renderTrigger: true,
              default: false,
              description: 'Full size loader',
            },
          },
        ],
      ],
    },
    {
      label: t('Full display'),
      expanded: true,
      controlSetRows: [[fullDisplayControl]],
    },
    {
      label: t('Show Location Matrics'),
      expanded: true,
      controlSetRows: [[isLocationMatricsControl]],
    },
    {
      label: t('Medical Staff'),
      expanded: true,
      controlSetRows: [
        [isMedicalStaffControl],
        [isMedicalStaffOverviewControl],
        [isMedicalStaffPerformedProceduresControl],
        [isMedicalStaffScoresControl],
      ],
    },
    {
      label: t('Show Full Height'),
      expanded: true,
      controlSetRows: [[isFullHeightControl]],
    },
    {
      label: t('Show map'),
      expanded: true,
      controlSetRows: [[showMapControl]],
    },
    {
      label: t('Mobile Height Chart'),
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'mobileHeight',
            config: {
              type: 'TextControl',
              label: 'Mobile Height Chart',
              renderTrigger: true,
              default: 0,
              initialValue: 0,
              isFloat: true,
              description: 'Mobile Height Chart',
            },
          },
        ],
      ],
    },
    {
      label: t('Query'),
      expanded: true,
      controlSetRows: [
        [queryModeControlSetItem],
        [groupByControlSetItem],
        [metricsControlSetItem, allColumnsControlSetItem],
        [percentMetricsControlSetItem],
        [timeSeriesLimitMetricControlSetItem, orderByControlSetItem],
        [orderDescendingControlSetItem],
        serverPaginationControlSetRow,
        [rowLimitControlSetItem, serverPageLengthControlSetItem],
        [includeTimeControlSetItem],
        [showTotalsControlSetItem],
        ['adhoc_filters'],
      ],
    },
    {
      label: t('Options'),
      expanded: true,
      controlSetRows: [
        [handlebarsTemplateControlSetItem],
        [styleControlSetItem],
      ],
    },
  ],
  formDataOverrides: formData => ({
    ...formData,
    groupby: getStandardizedControls().popAllColumns(),
    metrics: getStandardizedControls().popAllMetrics(),
  }),
};

export default config;
