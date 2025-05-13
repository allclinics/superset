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
import { styled } from '@superset-ui/core';
// types
import { STATUS } from './MedicalStaffContacts.interface';

export const Container = styled.div`
  display: flex;
  column-gap: 12px;
  margin-top: 20px;
  min-height: 322px;
`;

export const Column = styled.div<{ isOneColumn?: boolean; isEmail?: boolean }>`
  display: flex;
  border-radius: 16px;
  flex-direction: column;
  border: 1px solid #e6e9f4;
  width: ${({ isEmail, isOneColumn }) =>
    isOneColumn ? '100%' : isEmail ? '70%' : '30%'};
`;

export const ColumnHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #e6e9f4;
  padding: 16px;
`;

export const Row = styled.div`
  display: flex;
  padding: 12px 16px;
`;

export const ColumnContent = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 16px;
`;

export const ColumnTitle = styled.span`
  font-weight: 700;
  font-size: 14px;
  color: #5a607f;
`;

export const Text = styled.span`
  font-size: 14px;
  color: #5a607f;
`;

export const VerifieldWrapper = styled.div`
  display: flex;
  column-gap: 5px;
  align-items: center;
`;

export const VerifieldText = styled.span<{ status: STATUS }>`
  font-weight: 500;
  font-size: 10px;
  line-height: 20px;
  text-transform: uppercase;
  color: ${({ status }) =>
    status === STATUS.VERIFIED
      ? '#06A561'
      : status === STATUS.PARTIALLY_VERIFIED
        ? '#CFB22E'
        : '#A8ADC6'};
`;

export const IconButton = styled.button`
  display: flex;
  border: none;
  background: transparent;
`;

export const EmailWrapper = styled.div`
  display: flex;
  column-gap: 8px;
  align-items: center;
  width: 70%;
`;
