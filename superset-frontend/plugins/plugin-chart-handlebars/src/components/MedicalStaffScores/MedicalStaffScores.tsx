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
import { MedicalStaffScoresProps } from './MedicalStaffScores.interface';
import {
  List,
  Title,
  Total,
  Value,
  Circle,
  ListItem,
  KeyValue,
  Container,
  ItemName,
  Progress,
  ProgressBar,
  ProgressTotal,
  WrapperTotalValue,
  TotalScoreWrapper,
  WrapperProgressBar,
} from './MedicalStaffScores.styled';

const MedicalStaffScores: FC<MedicalStaffScoresProps> = ({ data }) => {
  const medicalStaffData = data[0];

  const listArray = [
    {
      id: 1,
      name: 'Quality score',
      value: medicalStaffData?.quality_category_score ?? 0,
    },
    {
      id: 2,
      name: 'Electronic interaction',
      value: medicalStaffData?.ia_category_score ?? 0,
    },
    {
      id: 3,
      name: 'Performance improvement',
      value: medicalStaffData?.pi_category_score ?? 0,
    },
    {
      id: 4,
      name: 'Cost score',
      value: medicalStaffData?.cost_category_score ?? 0,
    },
    {
      id: 5,
      name: 'Final score',
      value: medicalStaffData?.final_mips ?? 0,
    },
  ];

  return (
    <Container>
      <TotalScoreWrapper>
        <Circle>
          <Total>100</Total>
          <div>of 100</div>
        </Circle>
        <WrapperTotalValue>
          <Title>Overall final scores in the MIPS program</Title>
          <KeyValue>
            Score method: <Value>Group</Value>
          </KeyValue>
        </WrapperTotalValue>
      </TotalScoreWrapper>
      <List>
        {listArray.map(item => (
          <ListItem key={item.id}>
            <ItemName>{item.name}</ItemName>
            <WrapperProgressBar>
              <ProgressTotal>{Math.ceil(item.value as number)}</ProgressTotal>
              <ProgressBar>
                <Progress width={Math.ceil(item.value as number)} />
              </ProgressBar>
            </WrapperProgressBar>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};
export default MedicalStaffScores;
