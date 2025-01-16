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
import React, { FC, useMemo } from 'react';
import { Tooltip } from '@superset-ui/chart-controls';
import InfoIcon from '../../icons/info.svg';
import {
  Text,
  Item,
  Stack,
  Status,
  NoData,
  Conteiner,
  ListWrapper,
  IconWrapper,
} from './HospitalServices.styled';
import { HospitalServiesProps } from './HospitalServices.interface';

const HospitalServies: FC<HospitalServiesProps> = ({
  cardiacIcu,
  medicalSurgicalIcu,
  addictionTreatmentServices,
  onsiteEmergencyDepartment,
  bariatricWeightControlServices,
}) => {
  const list = useMemo(
    () => [
      {
        name: 'Medical Surgical ICU',
        tooltip: 'Whether a hospital has a surgical intensive care unit.',
        value: medicalSurgicalIcu,
      },
      {
        name: 'Addiction Treatment Services',
        tooltip: 'Whether a hospital offers addiction treatment services',
        value: addictionTreatmentServices,
        isText: true,
      },
      {
        name: 'Onsite Emergency Department',
        tooltip: 'Whether a hospital has an onsite emergency department.',
        value: onsiteEmergencyDepartment,
      },
      {
        name: 'Bariatric/Weight Control Services',
        tooltip: 'Whether a hospital offers bariatric/weight control services.',
        value: bariatricWeightControlServices,
      },
      {
        name: 'Cardiac ICU',
        tooltip: 'Whether a hospital has a cardiac intensive care unit.',
        value: cardiacIcu,
      },
    ],
    [
      addictionTreatmentServices,
      bariatricWeightControlServices,
      cardiacIcu,
      medicalSurgicalIcu,
      onsiteEmergencyDepartment,
    ],
  );

  const isNoData = useMemo(
    () => list.every(item => item.value === null),
    [list],
  );

  return (
    <Conteiner>
      <ListWrapper>
        {isNoData && (
          <NoData>
            <Text>Information missing</Text>
          </NoData>
        )}
        {list.map((item, index) => {
          if (item.value === null) return null;

          return (
            <Item key={index}>
              <Stack>
                <Text>{item.name}</Text>
                <Tooltip
                  overlay={item.tooltip}
                  placement="top"
                  overlayInnerStyle={{
                    color: '#535353',
                    fontSize: '12px',
                    lineHeight: '18px',
                    padding: '16px',
                    boxShadow: '2px 0px 10px 0px #262C4729',
                    borderRadius: '16px',
                    maxWidth: '236px',
                  }}
                  color="#fff"
                >
                  <IconWrapper>
                    <InfoIcon />
                  </IconWrapper>
                </Tooltip>
              </Stack>
              <Status
                isAvailable={
                  item?.isText
                    ? item.value && item.value !== 'None'
                    : item.value
                }
              >
                {item?.isText
                  ? `${item.value}`
                  : item.value
                    ? 'Available'
                    : 'Not available'}
              </Status>
            </Item>
          );
        })}
      </ListWrapper>
    </Conteiner>
  );
};

export default HospitalServies;
