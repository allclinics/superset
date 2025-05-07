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

export const Root = styled.div`
  display: flex;
  background: #f5f6fa;
  border-radius: 20px;
  padding: 20px 16px;
  flex-direction: column;
  cursor: pointer;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 16px;
  border-bottom: 1px solid #e6e9f4;
`;

export const NameWrapper = styled.div`
  display: flex;
  column-gap: 10px;
`;

export const ContactsWrapper = styled.div`
  display: flex;
  column-gap: 10px;
  align-items: center;
`;

export const Name = styled.span`
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0px;
`;

export const PhoneWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 4px;
`;

export const AddressWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Text = styled.span`
  font-size: 14px;
  line-height: 20px;
  color: #5a607f;
`;

export const InfoItem = styled.div`
  display: flex;
`;

export const Key = styled.span`
  font-size: 14px;
  line-height: 20px;
  color: #5a607f;
  font-weight: 700;
  margin-right: 10px;
`;

export const InfoWrapper = styled.div`
  display: flex;
  margin-top: 10px;
  flex-direction: column;
  row-gap: 10px;
`;

export const Chip = styled.div<{ color: 'green' | 'blue' }>`
  ${({ color }) => `
display: flex;
font-weight: 400;
font-size: 14px;
line-height: 20px;
color: ${color === 'green' ? '#06A561' : '#5F92FC'};
background: ${color === 'green' ? '#46C27E1A' : '#D9E4FF4D'};
border: 1px solid;
border-color: ${color === 'green' ? '#1FD2864D' : '#D9E4FF4D'};
border-radius: 10px;
padding: 0px 12px;
height: 24px;
white-space: nowrap;
  `}
`;

export const ChipsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  row-gap: 8px;
  column-gap: 8px;
`;
