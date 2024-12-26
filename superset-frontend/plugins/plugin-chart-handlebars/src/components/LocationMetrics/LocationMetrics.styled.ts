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
  padding: 16px 16px 16px 20px;
  background: #f4f6fa;
  min-height: 176px;
  border-radius: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 16px;
`;

export const ProcedureWrapper = styled.div`
  display: flex;
  column-gap: 8px;
`;

export const ProcedureText = styled.span`
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  color: #31323f;
  transform: translate(0px, -2px);
`;

export const IconWrapper = styled.div`
  display: flex;
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: relative;
`;

export const ListInfo = styled.div`
  dispay: flex;
  margin-top: 10px;
  row-gap: 10px;
`;

export const Item = styled.div`
  dispay: flex;
`;

export const Key = styled.span`
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  color: #5a607f;
  margin-right: 5px;
`;

export const Value = styled.span`
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #5a607f;
`;

export const MapWrapper = styled.div`
  margin-left: auto;
  padding-left: 30px;

  @media (max-width: 768px) {
    padding-left: 0px;
    margin-left: 0px;
  }
`;
