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
// @ts-nocheck
// eslint-disable-next-line import/no-extraneous-dependencies
import ViewportMercator from 'viewport-mercator-project';
import React, { useState, type FC } from 'react';
import MapGL from 'react-map-gl';
import { MapProps } from './Map.interface';

const Map: FC<MapProps> = ({ mapboxApiKey }) => {
  const mercator = new ViewportMercator({
    width: 200,
    height: 200,
  }).fitBounds([
    [-123.802, 25.9807],
    [-93.9857, 41.7194],
  ]);
  const { latitude, longitude, zoom } = mercator;

  const [state] = useState({
    viewport: {
      longitude,
      latitude,
      zoom,
    },
  });

  const handleViewportChange = () => {};

  return (
    <MapGL
      {...state.viewport}
      mapStyle="mapbox://styles/mapbox/light-v9"
      width={200}
      height={200}
      mapboxApiAccessToken={mapboxApiKey}
      onViewportChange={handleViewportChange}
      preserveDrawingBuffer
    />
  );
};

export default Map;
