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
// components
import GenderChip from '../GenderChip';
// assets
import PhoneIcon from '../icons/call.svg';
import PinIcon from '../icons/pin.svg';
import CheckMarkIcon from '../icons/checkmark.svg';
// types
import { DoctorItemProps } from './DoctorItem.interface';
// styles
import {
  Key,
  Chip,
  Text,
  Root,
  Name,
  Header,
  InfoItem,
  NameWrapper,
  ContactsWrapper,
  PhoneWrapper,
  AddressWrapper,
  InfoWrapper,
  ChipsList,
} from './DoctorItem.styled';
import { formatPhoneNumber } from '../../utils/formatPhoneNumber';

const DoctorItem: FC<DoctorItemProps> = ({
  npi,
  full_adress,
  gender,
  doctor_name,
  best_physician_phone,
  other_specialization,
  primary_specialization,
  onOpenDoctor,
}) => (
  <Root onClick={() => onOpenDoctor(npi)}>
    <Header>
      <NameWrapper>
        <Name>{doctor_name}</Name>
        <GenderChip gender={gender} />
      </NameWrapper>
      <ContactsWrapper>
        {best_physician_phone && (
          <PhoneWrapper>
            <PhoneIcon />
            <Text>{formatPhoneNumber(best_physician_phone)}</Text>
            <CheckMarkIcon />
          </PhoneWrapper>
        )}
        <AddressWrapper>
          <PinIcon />
          <Text>{full_adress}</Text>
        </AddressWrapper>
      </ContactsWrapper>
    </Header>
    <InfoWrapper>
      <InfoItem>
        <Key>Primary specialization:</Key>
        <Chip color="green">{primary_specialization}</Chip>
      </InfoItem>
      {other_specialization && (
        <InfoItem>
          <Key>Other specializations:</Key>
          <ChipsList>
            {other_specialization.split(',').map(item => (
              <Chip color="blue">{item.trim()}</Chip>
            ))}
          </ChipsList>
        </InfoItem>
      )}
    </InfoWrapper>
  </Root>
);

export default DoctorItem;
