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
// eslint-disable-next-line import/no-extraneous-dependencies
import React, { useMemo, type FC } from 'react';
import { Tooltip } from '@superset-ui/chart-controls';
import InfoIcon from '../../icons/info.svg';
import { HandlebarsProps } from '../../types';
import Map from '../Map';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';
import {
  Key,
  Item,
  Value,
  Wrapper,
  ListInfo,
  MapWrapper,
  IconWrapper,
  InfoWrapper,
  ProcedureText,
  ProcedureWrapper,
} from './LocationMetrics.styled';
import { ClinicItem } from '../Map/Map.interface';

const LocationMetrics: FC<HandlebarsProps> = ({
  data,
  mapboxApiKey,
  isMobile,
}) => {
  const uniqueDescriptions = useMemo(
    () =>
      Array.from(
        new Set(
          data
            ?.filter(item => item?.description)
            .map(item => item?.description),
        ),
      ),
    [data],
  );

  const uniqueCodeValues = useMemo(
    () =>
      Array.from(
        new Set(
          data?.filter(item => item?.code_value).map(item => item?.code_value),
        ),
      ),
    [data],
  );

  const uniquePriceCategories = useMemo(
    () =>
      Array.from(
        new Set(
          data
            ?.filter(item => item?.price_category)
            .map(item => item?.price_category),
        ),
      ),
    [data],
  );

  const uniqueCodeTypes = useMemo(
    () =>
      Array.from(
        new Set(
          data?.filter(item => item?.code_type).map(item => item?.code_type),
        ),
      ),
    [data],
  );

  const uniqueInsuranceNames = useMemo(
    () =>
      Array.from(
        new Set(
          data
            ?.filter(item => item?.hospital_name)
            .map(item => item?.hospital_name),
        ),
      ),
    [data],
  );

  const descriptions = useMemo(
    () =>
      uniqueDescriptions
        .map(item => capitalizeFirstLetter(item as string))
        .join(', '),
    [uniqueDescriptions],
  );

  const codeValues = useMemo(
    () =>
      uniqueCodeValues
        .map(item => capitalizeFirstLetter(item as string))
        .join(', '),
    [uniqueCodeValues],
  );

  const priceCategories = useMemo(
    () =>
      uniquePriceCategories
        .map(item => capitalizeFirstLetter(item as string))
        .join(', '),
    [uniquePriceCategories],
  );

  const codeTypes = useMemo(
    () =>
      uniqueCodeTypes
        .map(item => capitalizeFirstLetter(item as string))
        .join(', '),
    [uniqueCodeTypes],
  );

  const insuranceNames = useMemo(
    () =>
      uniqueInsuranceNames
        .map(item => capitalizeFirstLetter(item as string))
        .join(', '),
    [uniqueInsuranceNames],
  );

  const uniqueHospitals = useMemo(
    () =>
      data?.filter(
        (item, index, self) =>
          item?.hospital_name &&
          index ===
            self.findIndex(t => t?.hospital_name === item?.hospital_name),
      ),
    [data],
  );

  return (
    <Wrapper>
      <InfoWrapper>
        <ProcedureWrapper>
          <Tooltip
            overlay="You can chose procedure in the filters."
            placement="top"
            overlayInnerStyle={{
              color: '#535353',
              fontSize: '12px',
              lineHeight: '18px',
              padding: '16px',
              boxShadow: '2px 0px 10px 0px #262C4729',
              borderRadius: '16px',
              maxWidth: '236px',
            }}
            color="#fff"
          >
            <IconWrapper>
              <InfoIcon />
            </IconWrapper>
          </Tooltip>
          <ProcedureText>{`Chosen procedure: ${descriptions}`}</ProcedureText>
        </ProcedureWrapper>
        <ListInfo>
          <Item>
            <Key>Code type:</Key>
            <Value>{uniqueCodeTypes?.length ? codeTypes : 'N/A'}</Value>
          </Item>
          <Item>
            <Key>Code value:</Key>
            <Value>{uniqueCodeValues?.length ? codeValues : 'N/A'}</Value>
          </Item>
          <Item>
            <Key>Price category:</Key>
            <Value>
              {uniquePriceCategories?.length ? priceCategories : 'N/A'}
            </Value>
          </Item>
          <Item>
            <Key>Insurance name:</Key>
            <Value>{insuranceNames?.length ? insuranceNames : 'N/A'}</Value>
          </Item>
        </ListInfo>
      </InfoWrapper>
      <MapWrapper>
        <Map
          list={uniqueHospitals as unknown as ClinicItem[]}
          isMobile={!!isMobile}
          width="350px"
          height={isMobile ? '300px' : '100%'}
          defaultLatitude={
            typeof data[0]?.latitude === 'number' ? data[0].latitude : 0
          }
          defaultLongitude={
            typeof data[0]?.longitude === 'number' ? data[0].longitude : 0
          }
          mapboxApiKey={mapboxApiKey}
        />
      </MapWrapper>
    </Wrapper>
  );
};

export default LocationMetrics;
