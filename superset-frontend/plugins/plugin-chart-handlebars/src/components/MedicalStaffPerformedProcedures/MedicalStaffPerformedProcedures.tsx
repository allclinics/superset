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
import CircleIcon from '../../icons/circle.svg';
import type { MedicalStaffPerformedProceduresProps } from './MedicalStaffPerformedProcedures.interface';
import {
  List,
  Text,
  Count,
  Title,
  Option,
  Content,
  Container,
  CircleColor,
  CircleWrapper,
  TotalCount,
  TotalText,
  TotalWrapper,
} from './MedicalStaffPerformedProcedures.styled';
import { PERFORMED_PROCEDURES } from '../../consts';

const MedicalStaffPerformedProcedures: FC<
  MedicalStaffPerformedProceduresProps
> = ({ data }) => {
  const colorMap = Object.fromEntries(
    PERFORMED_PROCEDURES.map(p => [p.name, p.color]),
  );

  const groupedList = Object.values(
    data.reduce<
      Record<string, { name: string; count: number; color?: string }>
    >((acc, { procedure_category }) => {
      const key = String(procedure_category);

      if (!acc[key]) {
        acc[key] = { name: key, count: 0, color: colorMap[key] || '#CCCCCC' };
      }
      acc[key].count += 1;

      return acc;
    }, {}),
  );

  return (
    <Container>
      <Title>Performed Procedures</Title>
      <Content>
        <CircleWrapper>
          <TotalWrapper>
            <TotalCount>1903</TotalCount>
            <TotalText>performed procedures</TotalText>
          </TotalWrapper>
          <CircleIcon />
        </CircleWrapper>
        <List>
          {groupedList.map((item, index) => (
            <Option key={index}>
              <CircleColor color={item.color} />
              <Text>{item.name}</Text>
              <Count>{`(${item.count})`}</Count>
            </Option>
          ))}
        </List>
      </Content>
    </Container>
  );
};
export default MedicalStaffPerformedProcedures;
