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
  background: #fff;
  max-width: 300px;
  width: 100%;
  border-radius: 16px;
  position: relative;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: 0px;
  padding: 0px;
  color: #7e84a3;
  position: absolute;
  right: 8px;
  top: 10px;
`;

export const Header = styled.div`
  border-bottom: 1px solid #e6e9f4;
  padding: 8px 0px 8px 24px;
  position: relative;
`;

export const Title = styled.h4`
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: #31323f;
  margin: 0px;
`;

export const ContentWrapper = styled.div`
  padding: 16px 24px;
`;

export const Content = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #5a607f;
  margin-bottom: 24px;
`;

export const Buttons = styled.div`
  margin: 24px 0px 16px 0px;
  column-gap: 8px;
  display: flex;

  && > .button {
    height: 30px;
    max-width: 100%;
    margin: 0px;
    text-transform: unset;
    padding: 0px;
    width: 100%;
  }
`;

export const Steps = styled.div`
  display: flex;
  column-gap: 8px;
`;

export const Step = styled.div<{ isActive: boolean }>`
  display: flex;
  background: #e6e9f4;
  width: 100%;
  border-radius: 4px;
  height: 8px;
  opacity: ${({ isActive }) => (isActive ? '100%' : '30%')};
`;
