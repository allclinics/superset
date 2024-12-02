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

export const Wrapper = styled.div<{ width: string; height: string }>`
  border-radius: ${({ theme }) => theme.gridUnit * 5}px;
  border: 1px solid #e6e9f4;
  overflow: auto;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  min-width: ${({ width }) => width};
  min-height: ${({ height }) => height};

  @media (max-width: 768px) {
    min-width: 300px;
    min-height: 300px;
    width: 100%;
    margin-top: 20px;
  }
`;

export const PointText = styled.span`
  position: absolute;
  left: 50%;
  width: 120px;
  transform: translate(-50%, 0px);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  color: #3876f6;
`;
