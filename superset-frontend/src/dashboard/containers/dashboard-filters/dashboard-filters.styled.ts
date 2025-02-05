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

export const Wrapper = styled.div<{ isSearchInput?: boolean }>`
  display: flex;
  flex-direction: column;
  padding: ${({ isSearchInput }) =>
    isSearchInput ? '0px 24px 8px 24px' : '0px 24px 24px 24px'};
`;

export const FiltersWrapper = styled.div`
  display: flex;
  column-gap: 8px;
  row-gap: 8px;
  flex-wrap: wrap;
`;

export const FilterPanelButton = styled.div`
  display: flex;
  background: #3876f6;
  border-radius: 20px;
  height: 36px;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  color: #fff;
  align-items: center;
  padding: 0px 14px 0px 12px;
  column-gap: 6px;
  cursor: pointer;
`;

export const SearchWrapper = styled.div`
  display: flex;
  margin-top: 24px;
  max-width: 350px;
`;
