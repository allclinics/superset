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
import React from 'react';
import { TooltipRenderProps } from 'react-joyride';
import Icons from 'src/components/Icons';
import Button from 'src/components/Button';
// styles
import {
  Step,
  Steps,
  Title,
  Header,
  Wrapper,
  Content,
  Buttons,
  CloseButton,
  ContentWrapper,
} from './tour-tooltip.styled';

const CustomTooltip = (props: TooltipRenderProps) => {
  const {
    backProps,
    closeProps,
    index,
    primaryProps,
    step,
    size,
    isLastStep,
    tooltipProps,
  } = props;

  return (
    <Wrapper {...tooltipProps}>
      <Header>
        <CloseButton type="button" {...closeProps}>
          <Icons.Cross iconSize="xl" />
        </CloseButton>
        {step.title && <Title>{step.title}</Title>}
      </Header>
      <ContentWrapper>
        <Content>{step.content}</Content>
        <Buttons>
          {index !== 0 && (
            <Button
              buttonStyle="custom_secondary"
              buttonSize="medium"
              className="button"
              onClick={backProps.onClick}
            >
              {backProps.title}
            </Button>
          )}
          <Button
            buttonStyle="custom_primary"
            htmlType="submit"
            buttonSize="medium"
            className="button"
            onClick={primaryProps.onClick}
          >
            {isLastStep ? 'Finish' : 'Next'}
          </Button>
        </Buttons>
        <Steps>
          {[...Array(size)].map((_, i) => (
            <Step key={index} isActive={i === index} />
          ))}
        </Steps>
      </ContentWrapper>
    </Wrapper>
  );
};

export default CustomTooltip;
