/* eslint-disable theme-colors/no-literal-colors */
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
import { debounce } from 'lodash';
import { formatSelectOptions } from '@superset-ui/chart-controls';
import { SLOW_DEBOUNCE, t } from '@superset-ui/core';

export const PAGE_SIZE_OPTIONS = formatSelectOptions<number>([
  [0, t('page_size.all')],
  1,
  2,
  3,
  4,
  5,
  10,
  20,
  50,
  100,
  200,
]);

export const debounceFunc = debounce(
  (func: (val: string) => void, source: string) => func(source),
  SLOW_DEBOUNCE,
);

export enum HospitalDetailsTabs {
  GeneralOverview = 'General Overview',
  HospitalServices = 'Hospital Services',
}

export const PERFORMED_PROCEDURES = [
  {
    name: 'Melanoma (skin cancer) excision',
    color: '#3876F6',
  },
  {
    name: 'Cataract surgery',
    color: '#F4A79D',
  },
  {
    name: 'Hip replacement',
    color: '#FFDDCE',
  },
  {
    name: 'Knee replacement',
    color: '#FFD200',
  },
  {
    name: 'Spinal fusion',
    color: '#D5C6E7',
  },
  {
    name: 'Laminectomy or laminotomy (partial removal of spine bones)',
    color: '#F68D2B',
  },
  {
    name: 'Cataract surgery',
    color: '#E28086',
  },
  {
    name: 'Upper gastrointestinal (GI) endoscopy for acid reflux',
    color: '#39B480',
  },
  {
    name: 'Varicose vein removal',
    color: '#91B3FB',
  },
  {
    name: 'Colonoscopy',
    color: '#7E84DE',
  },
  {
    name: 'Leg revascularization (restoring blood flow',
    color: '#CEE26A',
  },
  {
    name: 'Coronary artery bypass graft (CABG)',
    color: '#64BEB9',
  },

  {
    name: 'Hernia repair - groin (open)',
    color: '#3440B9',
  },
  {
    name: 'Hernia repair (minimally invasive)',
    color: '#CE96A6',
  },
  {
    name: 'Mastectomy',
    color: '#CFB22E',
  },
  {
    name: 'Laminectomy or laminotomy (partial removal of spine bones)',
    color: '#9957AD',
  },
  {
    name: 'Pacemaker insertion or repair',
    color: '#8386CE',
  },
  {
    name: 'Prostate resection',
    color: '#CA504E',
  },
  {
    name: 'Coronary angioplasty and stenting',
    color: '#A97EDE',
  },
];
