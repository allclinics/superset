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
  height: 100%;
  border-radius: 20px;
`;

export const TotalScoreWrapper = styled.div`
  display: flex;
  padding: 20px;
  background: #e6e9f4;
  column-gap: 16px;
  align-items: center;
  border-radius: 24px;
`;

export const Circle = styled.div`
  display: flex;
  background: #3876f6;
  border-radius: 50%;
  width: 90px;
  height: 90px;
  min-height: 90px;
  min-width: 90px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
`;

export const Total = styled.span`
  color: white;
  font-family: Inter;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
`;

export const Title = styled.span`
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: #31323f;
`;

export const KeyValue = styled.span`
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  color: #5a607f;
`;

export const Value = styled.span``;

export const WrapperTotalValue = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  row-gap: 8px;
`;

export const ListItem = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  row-gap: 8px;
`;

export const ItemName = styled.span`
  font-family: Inter;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #5a607f;
`;

export const ProgressBar = styled.div`
  background: #e6e9f4;
  border-radius: 4px;
  width: 100%;
`;

export const Progress = styled.div<{ width: Number }>`
  ${({ width }) => `
  background: #1e5eff;
  border-radius: 4px;
  width: ${width}%;
  height: 8px;
  `}
`;

export const WrapperProgressBar = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
`;

export const ProgressTotal = styled.span`
  display: flex;
  color: #3876f6;
  font-size: 14px;
  line-height: 20px;
`;
