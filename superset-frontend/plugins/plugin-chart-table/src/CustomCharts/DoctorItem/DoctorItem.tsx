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
import React, { useMemo, type FC } from 'react';
// components
import GenderChip from '../GenderChip';
// types
import { DoctorItemProps } from './DoctorItem.interface';
// styles
import {
  Key,
  Chip,
  Value,
  Root,
  Name,
  Header,
  Number,
  InfoItem,
  CountItem,
  NameWrapper,
  InfoWrapper,
  ChipsList,
  CountsWrapper,
} from './DoctorItem.styled';

const DoctorItem: FC<DoctorItemProps> = ({
  npi,
  gender,
  doctor_name,
  other_specialization,
  primary_specialization,
  unique_state_count,
  unique_phone_count,
  unique_email_count,
  isMobile,
  unique_hospitals_present,
  onOpenDoctor,
}) => {
  const uniqueCounts = useMemo(
    () => [
      {
        id: 1,
        name: 'states',
        value: unique_state_count,
      },
      {
        id: 2,
        name: 'hospitals',
        value: unique_hospitals_present,
      },
      {
        id: 3,
        name: 'phone numbers',
        value: unique_phone_count,
      },
      {
        id: 4,
        name: 'emails',
        value: unique_email_count,
      },
    ],
    [
      unique_hospitals_present,
      unique_email_count,
      unique_phone_count,
      unique_state_count,
    ],
  );

  return (
    <Root isMobile={isMobile} onClick={() => onOpenDoctor(npi)}>
      <Header>
        <NameWrapper>
          <Name>{doctor_name}</Name>
          <GenderChip gender={gender} />
        </NameWrapper>
      </Header>
      <InfoWrapper>
        <InfoItem>
          <Key>Specializations:</Key>
          <ChipsList>
            <Chip color="green">{primary_specialization}</Chip>
            {other_specialization && (
              <>
                {other_specialization.split(',').map(item => (
                  <Chip color="blue">{item.trim()}</Chip>
                ))}
              </>
            )}
          </ChipsList>
        </InfoItem>
      </InfoWrapper>
      <CountsWrapper>
        {uniqueCounts.map((item, index) => (
          <CountItem key={index}>
            <Number>{item.value}</Number>
            <Value>{item.name}</Value>
          </CountItem>
        ))}
      </CountsWrapper>
    </Root>
  );
};

export default DoctorItem;
