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
import { styled, css } from '@superset-ui/core';
import React, { createRef } from 'react';
import { HandlebarsViewer } from './components/Handlebars/HandlebarsViewer';
import { HandlebarsProps, HandlebarsStylesProps } from './types';
import Map from './components/Map';
import LocationMetrics from './components/LocationMetrics';
import CallIcon from './icons/call.svg';
import PinIcon from './icons/pin.svg';
import GlobeIcon from './icons/globe.svg';
import { ClinicItem } from './components/Map/Map.interface';

const Styles = styled.div<HandlebarsStylesProps>`
  padding: ${({ theme }) => theme.gridUnit * 4}px;
  border-radius: ${({ theme }) => theme.gridUnit * 2}px;
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
  overflow: auto;

  ${props =>
    !!props?.fullDisplay &&
    css`
      height: 100%;
      width: 100%;
      padding: 0;
    `};
`;

const Conteiner = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding: 16px 16px 16px 20px;
  min-height: 278px;
  background: #f4f6fa;
  border-radius: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const WrapperDetails = styled.div`
  height: 100%;
  padding-right: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: auto;
  min-height: 240px;
`;

const Divider = styled.div`
  width: 100%;
  background: #e6e9f4;
  height: 1px;
  margin: 10px 0px;
`;

const Header = styled.div`
  display: flex;
  row-gap: 10px;
  flex-direction: column;
  margin-bottom: auto;
`;

const Footer = styled.div`
  display: flex;
  row-gap: 16px;
  flex-direction: column;
  margin-top: auto;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
`;

const Title = styled.span`
  font-family: Inter;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  color: #31323f;
`;

const Bold = styled.span`
  font-family: Inter;
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  color: #5a607f;
`;

const Text = styled.span`
  font-family: Inter;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #5a607f;
`;

export default function Handlebars(props: HandlebarsProps) {
  const { data, height, width, formData } = props;
  const styleTemplateSource = formData.styleTemplate
    ? `<style>${formData.styleTemplate}</style>`
    : '';
  const handlebarTemplateSource = formData.handlebarsTemplate
    ? formData.handlebarsTemplate
    : '{{data}}';
  const templateSource = `${handlebarTemplateSource}\n${styleTemplateSource} `;

  const rootElem = createRef<HTMLDivElement>();

  return (
    <Styles
      ref={rootElem}
      height={height}
      width={width}
      fullDisplay={formData?.fullDisplay}
    >
      {props?.formData?.showMap ? (
        <>
          {props?.formData?.isLocationMatrics ? (
            <LocationMetrics {...props} />
          ) : (
            <Conteiner>
              <WrapperDetails>
                <Header>
                  <Title>{data[0]?.hospital_name}</Title>
                  {data[0]?.id && (
                    <div>
                      <Text>
                        <Bold>AllClinics ID:</Bold>
                        {` ${data[0]?.id}`}
                      </Text>
                    </div>
                  )}
                  {data[0]?.specialization && (
                    <div>
                      <Text>
                        <Bold>Hospital specialisation:</Bold>
                        {` ${data[0]?.specialization}`}
                      </Text>
                    </div>
                  )}
                  {data[0]?.description && (
                    <div>
                      <Text>
                        <Bold>Description:</Bold>
                        {` ${data[0]?.description}`}
                      </Text>
                    </div>
                  )}
                </Header>
                <Divider />
                <Footer>
                  {data[0]?.address && (
                    <Item>
                      <PinIcon />
                      <Text>{data[0].address}</Text>
                    </Item>
                  )}
                  {data[0]?.phone && (
                    <Item>
                      <CallIcon />
                      <Text>{data[0]?.phone}</Text>
                    </Item>
                  )}
                  {data[0]?.website && (
                    <Item>
                      <GlobeIcon />
                      <Text>{data[0].website}</Text>
                    </Item>
                  )}
                </Footer>
              </WrapperDetails>
              {props?.mapboxApiKey &&
                data[0]?.latitude &&
                data[0]?.longitude && (
                  <Map
                    width="350px"
                    height="240px"
                    isMobile={!!props?.isMobile}
                    list={data as unknown as ClinicItem[]}
                    defaultLatitude={
                      typeof data[0]?.latitude === 'number'
                        ? data[0].latitude
                        : 0
                    }
                    defaultLongitude={
                      typeof data[0]?.longitude === 'number'
                        ? data[0].longitude
                        : 0
                    }
                    mapboxApiKey={props?.mapboxApiKey}
                  />
                )}
            </Conteiner>
          )}
        </>
      ) : (
        <HandlebarsViewer data={{ data }} templateSource={templateSource} />
      )}
    </Styles>
  );
}
