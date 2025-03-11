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
import { styled } from '@superset-ui/core';

export const Container = styled.div`
  background: #f5f6fa;
  padding: 16px 20px;
  min-height: 200px;
`;

export const Header = styled.div`
  display: flex;
  column-gap: 10px;
`;

export const Title = styled.span`
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  color: #31323f;
`;

export const Content = styled.div`
  display: flex;
  padding-top: 10px;
  margin-top: 16px;
  border-top: 1px solid #e6e9f4;
  column-gap: 10px;
  width: 100%;
`;

export const KeyValue = styled.span<{ isRightSpace?: boolean }>`
  ${({ isRightSpace }) => `
font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  color: #5a607f;
  margin-right: ${isRightSpace ? '10px' : '0px'};
  `}
`;

export const Value = styled.span`
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
`;

export const Option = styled.div`
  display: flex;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  width: calc(50% - 5px);
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
