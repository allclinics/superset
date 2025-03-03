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
  display: flex;
  height: 100%;
  border-radius: 20px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const WrapperDetails = styled.div`
  height: 100%;
  padding-right: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Divider = styled.div`
  width: 100%;
  background: #e6e9f4;
  height: 1px;
  margin: 10px 0px;
`;

export const Header = styled.div`
  display: flex;
  row-gap: 10px;
  flex-direction: column;
`;

export const Footer = styled.div`
  display: flex;
  row-gap: 16px;
  flex-direction: row;
  column-gap: 24px;
  flex-wrap: wrap;
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
`;

export const Title = styled.span`
  font-family: Inter;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  color: #31323f;
  margin-right: 10px;
`;

export const Bold = styled.span`
  font-family: Inter;
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  color: #5a607f;
`;

export const Text = styled.span`
  font-family: Inter;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #5a607f;
`;

export const StarsWrapper = styled.div`
  display: flex;
  cursor: pointer;
`;

export const Top = styled.div`
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
    row-gap: 8px;
  }
`;

export const Link = styled.a`
  color: #3876f6;
  margin-left: 6px;
`;
