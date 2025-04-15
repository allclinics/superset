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

  .popup {
    z-index: 9999;
  }

  .mapboxgl-popup-close-button {
    display: none !important;
  }

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

export const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  width: 100%;
  background: #fff;
  box-shadow: 0px 2px 22px 0px #151b261f;
  border-radius: 10px !important;
  padding: 16px 24px;
`;

export const ModalTitle = styled.h3`
  font-size: 14px;
  font-weight: 700;
  line-height: 24px;
  color: #31323f;
  margin: 0;
`;

export const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: #e6e9f4;
  margin: 8px 0px 12px 0px;
`;

export const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  width: 212px;
  height: 29px;
  padding: 0px 40px 0px 40px;
  gap: 20px;
  border-radius: 20px;
  background-color: #3876f6;
  color: #fff;
  margin: 12px auto 0px auto;
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  text-align: center;
`;

export const ListItem = styled.div`
  display: flex;
  align-items: center;
`;

export const ListItemText = styled.span`
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  color: #5a607f;
  margin-left: 4px;
`;
