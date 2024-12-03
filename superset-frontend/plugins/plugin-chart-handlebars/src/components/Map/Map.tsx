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
import React, { useState, useEffect, useCallback, type FC } from 'react';
import MapGL, { Marker, ViewState } from 'react-map-gl';
import { MapProps } from './Map.interface';
import { Wrapper, PointText } from './Map.styled';
import Point from '../../icons/point.svg';

const Map: FC<MapProps> = ({
  width,
  height,
  mapboxApiKey,
  list,
  defaultLatitude,
  defaultLongitude,
  isMobile,
}) => {
  const [viewport, setViewport] = useState({
    latitude: defaultLatitude,
    longitude: defaultLongitude,
    zoom: 15,
  });

  useEffect(() => {
    setViewport({
      latitude: defaultLatitude,
      longitude: defaultLongitude,
      zoom: 15,
    });
  }, [defaultLatitude, defaultLongitude]);

  const handleViewportChange = useCallback((newViewport: ViewState) => {
    setViewport(newViewport);
  }, []);

  return (
    <Wrapper width={width} height={height}>
      <MapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/light-v9"
        mapboxApiAccessToken={mapboxApiKey}
        onViewportChange={handleViewportChange}
        preserveDrawingBuffer
        width="100%"
        height={isMobile ? '300px' : '100%'}
      >
        {list?.map((item, index) => (
          <Marker
            key={index}
            longitude={item?.longitude}
            latitude={item?.latitude}
          >
            <Point />
            <PointText>{item?.hospital_name}</PointText>
          </Marker>
        ))}
      </MapGL>
    </Wrapper>
  );
};

export default Map;
