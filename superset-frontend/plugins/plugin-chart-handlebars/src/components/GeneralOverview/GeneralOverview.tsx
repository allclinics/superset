/* eslint-disable no-plusplus */
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
import React, { useCallback, type FC } from 'react';
import { Tooltip } from '@superset-ui/chart-controls';
import Map from '../Map';
import CallIcon from '../../icons/call.svg';
import PinIcon from '../../icons/pin.svg';
import StarFullIcon from '../../icons/star.svg';
import StarHalfIcon from '../../icons/star-half.svg';
import StarEmptyIcon from '../../icons/star-empty.svg';
import GlobeIcon from '../../icons/globe.svg';
import {
  Item,
  Text,
  Bold,
  Title,
  Header,
  Footer,
  Divider,
  Conteiner,
  WrapperDetails,
  StarsWrapper,
  Top,
  Link,
} from './GeneralOverview.styled';
import { ClinicItem } from '../Map/Map.interface';
import { GeneralOverviewProps } from './GeneralOverview.interface';

const GeneralOverview: FC<GeneralOverviewProps> = ({
  data,
  mapboxApiKey,
  isMobile,
  patientExperience,
}) => {
  const renderStars = useCallback((value: number, maxStars: number) => {
    const stars = [];

    for (let i = 1; i <= maxStars; i++) {
      if (value >= i) {
        stars.push(
          <span key={i}>
            <StarFullIcon />
          </span>,
        );
      } else if (value >= i - 0.5) {
        stars.push(
          <span key={i}>
            <StarHalfIcon />
          </span>,
        );
      } else {
        stars.push(
          <span key={i}>
            <StarEmptyIcon />
          </span>,
        );
      }
    }
    return <StarsWrapper>{stars}</StarsWrapper>;
  }, []);

  const overlay = (
    <div>
      <span>
        Scores are based on surveys taken from this hospital’s inpatients after
        they were discharged inquiring about different aspects of their stay.
      </span>
      <Link href="https://www.medicare.gov" target="_blank" rel="noreferrer">
        https://www.medicare.gov
      </Link>
    </div>
  );

  return (
    <Conteiner>
      <WrapperDetails>
        <Header>
          <Top>
            <Title>{data[0]?.hospital_name}</Title>
            <Tooltip
              overlay={overlay}
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
              {renderStars(patientExperience ?? 0, 5)}
            </Tooltip>
          </Top>
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
                <Bold>Hospital specialization:</Bold>
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
      {mapboxApiKey && data[0]?.latitude && data[0]?.longitude && (
        <Map
          width="350px"
          height="240px"
          styles={{
            marginTop: isMobile ? '20px' : 'auto',
            marginBottom: 'auto',
          }}
          isMobile={!!isMobile}
          list={data as unknown as ClinicItem[]}
          defaultLatitude={
            typeof data[0]?.latitude === 'number' ? data[0].latitude : 0
          }
          defaultLongitude={
            typeof data[0]?.longitude === 'number' ? data[0].longitude : 0
          }
          mapboxApiKey={mapboxApiKey}
        />
      )}
    </Conteiner>
  );
};
export default GeneralOverview;
