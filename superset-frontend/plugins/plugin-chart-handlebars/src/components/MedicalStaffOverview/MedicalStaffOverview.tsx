/* eslint-disable no-plusplus */
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
import React, { type FC } from 'react';
import GenderChip from '../GenderChip';
import type { MedicalStaffOverviewProps } from './MedicalStaffOverview.interface';
import {
  Chip,
  List,
  Title,
  Value,
  Option,
  Header,
  Content,
  KeyValue,
  Container,
  ChipsList,
} from './MedicalStaffOverview.styled';
import type { IStaff } from '../../types/medical-staff.types';

const MedicalStaffOverview: FC<MedicalStaffOverviewProps> = ({ data }) => {
  const overviewData = data[0] as unknown as IStaff;

  return (
    <Container>
      <Header>
        <Title>{overviewData?.doctor_name}</Title>
        <GenderChip gender={overviewData?.gender} />
      </Header>
      <Content>
        <List>
          {overviewData?.medical_degree && (
            <Option>
              <KeyValue>
                Medical degree: <Value>{overviewData?.medical_degree}</Value>
              </KeyValue>
            </Option>
          )}
          {overviewData.medical_school && (
            <Option>
              <KeyValue>
                Medical school: <Value>{overviewData?.medical_school}</Value>
              </KeyValue>
            </Option>
          )}
          {overviewData?.graduation_year && (
            <Option>
              <KeyValue>
                Graduation year: <Value>{overviewData.graduation_year}</Value>
              </KeyValue>
            </Option>
          )}
        </List>
        <List>
          {overviewData.primary_specialization && (
            <Option>
              <KeyValue isRightSpace>Primary specialization:</KeyValue>
              <Chip color="green">{overviewData?.primary_specialization}</Chip>
            </Option>
          )}
          {overviewData.other_specialization && (
            <Option>
              <KeyValue isRightSpace>Other specializations:</KeyValue>
              <ChipsList>
                {overviewData.other_specialization.split(',').map(item => (
                  <Chip color="blue">{item.trim()}</Chip>
                ))}
              </ChipsList>
            </Option>
          )}
        </List>
      </Content>
    </Container>
  );
};
export default MedicalStaffOverview;
