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
import SearchIcon from '../../icons/search.svg';

export const Container = styled.div`
  background: #f5f6fa;
  display: flex;
  min-height: 322px;
  column-gap: 12px;
  height: 100%;
  margin-top: 20px;
`;

export const Bold = styled.span`
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0px;
  color: #31323f;
`;

export const Text = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0px;
  color: #5a607f;
  margin-top: auto;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 360px;
  display: flex;
  margin-top: auto;
`;

export const Input = styled.input`
  border-radius: 10px;
  border: 1px solid #e8ecfc;
  height: 36px;
  width: 100%;
  padding: 6px 10px 6px 44px;
`;

export const List = styled.div`
  display: flex;
  row-gap: 12px;
  flex-direction: column;
  min-height: 370px;
`;

export const Item = styled.div`
  border: 1px solid #e6e9f4;
  border-radius: 20px;
  width: 100%;
`;

export const ItemContent = styled.div`
  display: flex;
  padding: 16px 20px;
  border-top: 1px solid #e6e9f4;
  column-gap: 8px;
`;

export const HeaderLeftPart = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
`;

export const Search = styled(SearchIcon)`
  position: absolute;
  left: 10px;
  top: 6px;
`;

export const Stack = styled.div`
  display: flex;
  column-gap: 8px;
  align-items: center;
`;

export const ItemHeader = styled.div`
  display: flex;
  padding: 16px 20px;
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`;

export const PageButton = styled.button`
  padding: 5px 10px;
  border: none;
  background: transparent;
  color: #7e84a3;
  cursor: pointer;

  &:disabled {
    color: rgba(126, 132, 163, 0.3);
    cursor: not-allowed;
  }
`;

export const PageNumber = styled.button<{ active: boolean }>`
  padding: 5px 10px;
  border: none;
  background: ${({ active }) => (active ? '#E6E9F4' : 'transparent')};
  color: #5a607f;
  cursor: pointer;
  border-radius: 50%;
  border: none;
  width: 36px;
  height: 36px;
`;

export const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
