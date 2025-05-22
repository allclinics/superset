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
import React, { useCallback, useMemo, type FC } from 'react';
// types
import {
  STATUS,
  type MedicalStaffContactsProps,
} from './MedicalStaffContacts.interface';
// utils
import { formatPhoneNumber } from '../../utils/formatPhoneNumber';
// assets
import CopyIcon from '../../icons/copy.svg';
import VerifieldIcon from '../../icons/verified.svg';
import VerifieldPartiallyIcon from '../../icons/verified-partially.svg';
// styles
import {
  Row,
  Text,
  Column,
  ColumnTitle,
  ColumnHeader,
  Container,
  EmailWrapper,
  VerifieldWrapper,
  ColumnContent,
  VerifieldText,
  IconButton,
} from './MedicalStaffContacts.styled';

const MedicalStaffContacts: FC<MedicalStaffContactsProps> = ({ data }) => {
  const phonesList = useMemo(() => {
    const map = new Map();

    data.forEach(item => {
      if (item.physician_phone) {
        map.set(item.physician_phone, {
          physician_phone: item.physician_phone,
          physician_phone_status: item.physician_phone_status,
        });
      }
    });

    return Array.from(map.values());
  }, [data]);

  const emailsList = useMemo(() => {
    const map = new Map();

    data.forEach(item => {
      if (item.physician_email) {
        map.set(item.physician_email, {
          physician_email: item.physician_email,
          physician_email_status: item.physician_email_status,
        });
      }
    });

    return Array.from(map.values());
  }, [data]);

  const renderVerifiedIcon = useCallback((status: STATUS) => {
    switch (status) {
      case STATUS.VERIFIED:
        return <VerifieldIcon />;
      case STATUS.PARTIALLY_VERIFIED:
        return <VerifieldPartiallyIcon />;

      default:
        return null;
    }
  }, []);

  const handleCopy = useCallback(
    (email: string) => async () => {
      await navigator.clipboard.writeText(email);
    },
    [],
  );

  return (
    <Container>
      {!!emailsList.length && (
        <Column isOneColumn={!phonesList.length} isEmail>
          <ColumnHeader>
            <div style={{ width: '70%' }}>
              <ColumnTitle>Email Address</ColumnTitle>
            </div>
            <div style={{ width: '30%' }}>
              <ColumnTitle>Status</ColumnTitle>
            </div>
          </ColumnHeader>
          <ColumnContent>
            {emailsList.map((item, index) => (
              <Row key={`email-${index}`}>
                <EmailWrapper>
                  <Text>{item.physician_email}</Text>
                  <IconButton
                    type="button"
                    onClick={handleCopy(item.physician_email as string)}
                  >
                    <CopyIcon />
                  </IconButton>
                </EmailWrapper>
                <VerifieldWrapper>
                  {renderVerifiedIcon(item.physician_email_status as STATUS)}
                  <VerifieldText status={item.physician_email_status as STATUS}>
                    {item.physician_email_status}
                  </VerifieldText>
                </VerifieldWrapper>
              </Row>
            ))}
          </ColumnContent>
        </Column>
      )}
      {phonesList.length && (
        <Column isOneColumn={!emailsList.length}>
          <ColumnHeader>
            <div style={{ width: '50%' }}>
              <ColumnTitle>Phone Number</ColumnTitle>
            </div>
            <div style={{ width: '50%' }}>
              <ColumnTitle>Status</ColumnTitle>
            </div>
          </ColumnHeader>
          <ColumnContent>
            {phonesList.map((item, index) => (
              <Row key={`phone-${index}`}>
                <div style={{ width: '50%' }}>
                  <Text>
                    {item.physician_phone
                      ? formatPhoneNumber(item.physician_phone as number)
                      : ''}
                  </Text>
                </div>
                <VerifieldWrapper>
                  {renderVerifiedIcon(item.physician_phone_status as STATUS)}
                  <VerifieldText status={item.physician_phone_status as STATUS}>
                    {item.physician_phone_status}
                  </VerifieldText>
                </VerifieldWrapper>
              </Row>
            ))}
          </ColumnContent>
        </Column>
      )}
    </Container>
  );
};

export default MedicalStaffContacts;
