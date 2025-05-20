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
/* eslint-disable no-plusplus */
/* eslint-disable theme-colors/no-literal-colors */
import React, { type FC } from 'react';
import GenderChip from '../GenderChip';
/* import VerifieldIcon from '../../icons/verified.svg'; */
import type { MedicalStaffOverviewProps } from './MedicalStaffOverview.interface';
import {
  Chip,
  /* Item, */
  List,
  Title,
  Value,
  Option,
  Header,
  Content,
  LeftPart,
  KeyValue,
  Container,
  ChipsList,
  RightPart,
} from './MedicalStaffOverview.styled';
// types
import { IStaff } from '../../types';

const MedicalStaffOverview: FC<MedicalStaffOverviewProps> = ({
  data,
  isMobile,
}) => {
  const overviewData = data[0] as unknown as IStaff;

  return (
    <Container>
      <Content isMobile={isMobile}>
        <LeftPart isMobile={isMobile}>
          <Header>
            <Title>{overviewData?.doctor_name}</Title>
            <GenderChip gender={overviewData?.gender} />
          </Header>
          {/* <Item>
            <Value>(879) 543-23-41</Value>
            <VerifieldIcon />
          </Item>
          <Item>
            <Value>jason.felton@direct.myteamcare.com</Value>
            <VerifieldIcon />
          </Item>
          <Item>
            <Value>LinkedIn Profile</Value>
            <VerifieldIcon />
          </Item> */}
        </LeftPart>
        <RightPart isMobile={isMobile}>
          {overviewData?.graduation_year && (
            <Option>
              <KeyValue>
                Graduation year: <Value>{overviewData.graduation_year}</Value>
              </KeyValue>
            </Option>
          )}
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
          <List>
            {overviewData.primary_specialization && (
              <Option>
                <KeyValue isRightSpace>Primary specialization:</KeyValue>
                <Chip color="green">
                  {overviewData?.primary_specialization}
                </Chip>
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
        </RightPart>
      </Content>
    </Container>
  );
};
export default MedicalStaffOverview;
