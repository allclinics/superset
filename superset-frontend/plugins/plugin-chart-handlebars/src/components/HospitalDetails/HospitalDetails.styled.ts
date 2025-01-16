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

export const Wrapper = styled.div`
  display: flex;
  height: 100%;
  padding: 16px 20px;
  background: #f4f6fa;
  border-radius: 20px;
  flex-direction: column;
`;

export const TabsWrapper = styled.div`
  display: flex;
  column-gap: 40px;
  border-bottom: 1px solid #e6e9f4;
`;

export const Tab = styled.button<{ isActive: boolean }>`
  ${({ isActive }) => `
  display: flex;
  background: transparent;
  border: none;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  color: ${isActive ? '#3876F6' : '#5A607F'};
  box-shadow: 0px 2px 0px 0px ${isActive ? '#3876F6' : 'none'};
  padding: 0px 0px 6px 0px;
  `}
`;

export const TabContent = styled.div`
  display: flex;
  padding-top: 20px;
`;
