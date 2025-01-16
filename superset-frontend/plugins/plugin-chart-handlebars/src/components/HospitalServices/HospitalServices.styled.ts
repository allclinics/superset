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

export const Conteiner = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

export const Item = styled.div`
  display: flex;
  width: calc(50% - 10px);
  justify-content: space-between;
  border-bottom: 1px solid #e6e9f4;
  height: 40px;

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    padding: 8px 0px;
    align-items: center;

    &:nth-child(1) {
      padding: 0px 0px 8px 0px;
    }
  }
`;

export const Text = styled.span`
  font-family: Inter;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #5a607f;
`;

export const IconWrapper = styled.div`
  display: flex;
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: relative;
  margin-left: 10px;

  @media (max-width: 768px) {
    margin-left: 8px;
  }
`;

export const ListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  row-gap: 16px;
  column-gap: 20px;
  min-height: 120px;
  width: 100%;

  & > :nth-last-child(1) {
    border: none;
  }

  @media (max-width: 768px) {
    row-gap: 0px;
  }
`;

export const Status = styled.div<{ isAvailable: boolean }>`
  ${({ isAvailable }) => `
display: flex;
font-size: 14px;
font-weight: 400;
line-height: 20px;
border-radius: 20px;
white-space: nowrap;
background-color: ${isAvailable ? '#46C27E1A' : '#E6E9F466'};
color: ${isAvailable ? '#06A561' : '#A8ADC6'};
border: 1px solid ${isAvailable ? '#1FD286' : '#A8ADC6'};
padding: 2px 12px;
max-height: 24px;
justify-content: center;
align-items: center;

 @media (max-width: 768px) {
    margin-left: 20px;
  }
  `}
`;

export const Stack = styled.div`
  display: flex;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

export const NoData = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
