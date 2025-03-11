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

export const Container = styled.div`
  background: #f5f6fa;
  padding: 16px 20px;
  min-height: 250px;
`;

export const List = styled.div`
  display: flex;
  column-gap: 8px;
  flex-wrap: wrap;
  height: fit-content;
  row-gap: 8px;
`;

export const Option = styled.div`
  display: flex;
  column-gap: 5px;
  align-items: center;
  height: fit-content;
`;

export const Title = styled.span`
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: #31323f;
`;

export const Text = styled.span`
  font-size: 12px;
  line-height: 14.52px;
  color: #5a607f;
`;

export const Count = styled.span`
  font-weight: 600;
  color: #5a607f;
  font-size: 12px;
  line-height: 14.52px;
`;

export const TotalCount = styled.span`
  font-weight: 700;
  font-size: 20px;
  line-height: 24.2px;
  color: #2e2e30;
`;

export const TotalText = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 16.94px;
  color: #2e2e30;
  text-align: center;
`;

export const CircleColor = styled.div<{ color?: string }>`
  ${({ color }) => `
  width: 10px;
  height: 10px;
  background: ${color};
  border-radius: 50%;
  `}
`;

export const Content = styled.div`
  display: flex;
  column-gap: 40px;
  margin-top: 36px;
  align-items: center;
  margin-bottom: 36px;
`;

export const CircleWrapper = styled.div`
  display: flex;
  position: relative;
  margin-left: 40px;
`;

export const TotalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  justify-content: center;
  align-items: center;
  row-gap: 4px;
`;
