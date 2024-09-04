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
/* eslint-disable prefer-template */
/* eslint-disable react/require-default-props */
/* eslint-disable theme-colors/no-literal-colors */
import PropTypes from 'prop-types';
import React from 'react';
import { CanvasOverlay } from 'react-map-gl';
import roundDecimal from './utils/roundDecimal';
import luminanceFromRGB from './utils/luminanceFromRGB';
import 'mapbox-gl/dist/mapbox-gl.css';

const propTypes = {
  aggregation: PropTypes.string,
  compositeOperation: PropTypes.string,
  dotRadius: PropTypes.number,
  lngLatAccessor: PropTypes.func,
  locations: PropTypes.arrayOf(PropTypes.object).isRequired,
  pointRadiusUnit: PropTypes.string,
  renderWhileDragging: PropTypes.bool,
  rgb: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ),
  zoom: PropTypes.number,
};

const defaultProps = {
  // Same as browser default.
  compositeOperation: 'source-over',
  dotRadius: 4,
  lngLatAccessor: location => [location[0], location[1]],
  renderWhileDragging: true,
};

const computeClusterLabel = (properties, aggregation) => {
  const count = properties.point_count;
  if (!aggregation) {
    return count;
  }
  if (aggregation === 'sum' || aggregation === 'min' || aggregation === 'max') {
    return properties[aggregation];
  }
  const { sum } = properties;
  const mean = sum / count;
  if (aggregation === 'mean') {
    return Math.round(100 * mean) / 100;
  }
  const { squaredSum } = properties;
  const variance = squaredSum / count - (sum / count) ** 2;
  if (aggregation === 'var') {
    return Math.round(100 * variance) / 100;
  }
  if (aggregation === 'stdev') {
    return Math.round(100 * Math.sqrt(variance)) / 100;
  }

  // fallback to point_count, this really shouldn't happen
  return count;
};

class ScatterPlotGlowOverlay extends React.PureComponent {
  constructor(props) {
    super(props);
    this.redraw = this.redraw.bind(this);
    this.image = new Image();
    this.image.src =
      'data:image/svg+xml;base64,' +
      btoa(
        '<svg width="19" height="26" viewBox="0 0 19 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.49996 0.667969C14.6546 0.667969 18.8333 4.92401 18.8333 10.1741C18.8333 13.2424 16.4424 18.1433 11.6607 24.8768C11.4944 25.1109 11.2926 25.3165 11.0628 25.4858C9.92913 26.3209 8.36791 26.1166 7.47461 25.052L7.33928 24.8768L6.95679 24.3349C2.43001 17.8797 0.166626 13.1595 0.166626 10.1741C0.166626 4.92401 4.3453 0.667969 9.49996 0.667969ZM9.49996 7.33463C10.9727 7.33463 12.1666 8.52854 12.1666 10.0013C12.1666 11.4741 10.9727 12.668 9.49996 12.668C8.0272 12.668 6.83329 11.4741 6.83329 10.0013C6.83329 8.52854 8.0272 7.33463 9.49996 7.33463Z" fill="#3876F6"/></svg>',
      );
  }

  drawText(ctx, pixel, options = {}) {
    const IS_DARK_THRESHOLD = 110;
    const {
      fontHeight = 0,
      label = '',
      radius = 0,
      rgb = [0, 0, 0],
      shadow = false,
    } = options;
    const maxWidth = radius * 1.8;
    const luminance = luminanceFromRGB(rgb[1], rgb[2], rgb[3]);

    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = luminance <= IS_DARK_THRESHOLD ? 'white' : 'black';
    ctx.font = `${fontHeight}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    if (shadow) {
      ctx.shadowBlur = 15;
      ctx.shadowColor = luminance <= IS_DARK_THRESHOLD ? 'black' : '';
    }

    const textWidth = ctx.measureText(label).width;
    if (textWidth > maxWidth) {
      const scale = fontHeight / textWidth;
      ctx.font = `${scale * maxWidth}px sans-serif`;
    }

    const { compositeOperation } = this.props;

    ctx.fillText(label, pixel[0], pixel[1]);
    ctx.globalCompositeOperation = compositeOperation;
    ctx.shadowBlur = 0;
    ctx.shadowColor = '';
  }

  // Modified: https://github.com/uber/react-map-gl/blob/master/overlays/scatterplot.react.js
  redraw({ width, height, ctx, isDragging, project }) {
    const {
      aggregation,
      compositeOperation,
      dotRadius,
      lngLatAccessor,
      locations,
      renderWhileDragging,
    } = this.props;

    const radius = dotRadius;
    const clusterLabelMap = [];

    locations.forEach((location, i) => {
      if (location.properties.cluster) {
        clusterLabelMap[i] = computeClusterLabel(
          location.properties,
          aggregation,
        );
      }
    }, this);

    ctx.clearRect(0, 0, width, height);
    ctx.globalCompositeOperation = compositeOperation;

    if ((renderWhileDragging || !isDragging) && locations) {
      locations.forEach(function _forEach(location) {
        const pixel = project(lngLatAccessor(location));
        const pixelRounded = [
          roundDecimal(pixel[0], 1),
          roundDecimal(pixel[1], 1),
        ];

        if (
          pixelRounded[0] + radius >= 0 &&
          pixelRounded[0] - radius < width &&
          pixelRounded[1] + radius >= 0 &&
          pixelRounded[1] - radius < height
        ) {
          ctx.drawImage(
            this.image,
            pixelRounded[0] - this.image.width / 2,
            pixelRounded[1] - this.image.height / 2,
          );
        }
      }, this);
    }
  }

  render() {
    return <CanvasOverlay redraw={this.redraw} />;
  }
}

ScatterPlotGlowOverlay.propTypes = propTypes;
ScatterPlotGlowOverlay.defaultProps = defaultProps;

export default ScatterPlotGlowOverlay;
