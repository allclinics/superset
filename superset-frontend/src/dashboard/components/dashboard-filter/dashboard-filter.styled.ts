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
/* eslint-disable theme-colors/no-literal-colors */
import { styled } from '@superset-ui/core';

export const Wrapper = styled.div<{ isOpen: boolean }>`
  display: flex;
  border: 1px solid #f5f6fa;
  border-radius: 20px;
  height: 36px;
  padding: 0px 10px 0px 12px;
  justify-content: center;
  align-items: center;
  position: relative;
  border-bottom-left-radius: ${({ isOpen }) => (isOpen ? '0px' : '20px')};
  border-bottom-right-radius: ${({ isOpen }) => (isOpen ? '0px' : '20px')};
`;

export const FilterName = styled.span`
  color: #a8adc6;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  margin-right: 6px;
`;

export const FilterCount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #3876f6;
  border-radius: 50%;
  color: #fff;
  min-width: 16px;
  min-height: 16px;
  height: 16px;
  font-size: 10px;
  font-weight: 500;
  line-height: 16px;
  text-align: center;
  margin-right: 6px;
`;

export const Options = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  background-color: #ffffff;
  position: absolute;
  top: 36px;
  left: 0px;
  z-index: 100000;
  flex-direction: column;
  padding: 6px 8px;
  border: 1px solid #f5f6fa;
  border-style: solid;
  border-color: #f5f6fa;
  border-top: none;
  border-width: 1px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  width: calc(100% + 2px);
  transform: translate(-1px, 0px);
  max-height: 150px;
  overflow: auto;
  row-gap: 4px;
`;

export const OptionLabel = styled.p`
  color: #5a607f;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0px !important;
`;

export const Option = styled.div`
  display: flex;
  height: 24px;
  border-radius: 10px;
  align-items: center;
  padding: 0px 0px 0px 12px;
  &:hover {
    background: #f5f6fa;
  }
`;

export const IconButton = styled.button`
  padding: 0px;
  border: none;
  background: transparent;
  margin-left: auto;
`;
