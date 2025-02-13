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

export const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0px;
  top: 0px;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

export const Modal = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 48px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  max-width: 500px;
  display: flex;
  column-gap: 20px;
`;

export const Title = styled.span`
  margin: 20px 0px 8px 0px;
  font-weight: 700;
  font-size: 36px;
  line-height: 36px;
  letter-spacing: 0px;
  text-align: center;
  color: #131523;
`;

export const Description = styled.span`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0px;
  margin-bottom: 20px;
  text-align: center;
  color: #999fae;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 16px;

  && > .button {
    width: 174px;
    margin: 0;
    text-transform: unset;
  }
`;
