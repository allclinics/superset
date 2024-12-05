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
/* eslint-disable react/jsx-sort-default-props, react/sort-prop-types */
/* eslint-disable react/forbid-prop-types, react/require-default-props */
/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-template */
/* eslint-disable react/require-default-props */
/* eslint-disable theme-colors/no-literal-colors */
import React from 'react';
import PropTypes from 'prop-types';
import MapGL, { Marker, Popup } from 'react-map-gl';
import ViewportMercator from 'viewport-mercator-project';
import './MapBox.css';
import ZoomIn from './icons/zoom-in';
import ZoomOut from './icons/zoom-out';
import Point from './icons/point.svg';
import LocationIcon from './icons/location';
import PhoneIcon from './icons/phone';
import WorldIcon from './icons/world';
import './popup.css';

const NOOP = () => {};
export const DEFAULT_MAX_ZOOM = 16;
export const DEFAULT_POINT_RADIUS = 60;

const propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  aggregatorName: PropTypes.string,
  clusterer: PropTypes.object,
  globalOpacity: PropTypes.number,
  hasCustomMetric: PropTypes.bool,
  mapStyle: PropTypes.string,
  mapboxApiKey: PropTypes.string.isRequired,
  onViewportChange: PropTypes.func,
  pointRadius: PropTypes.number,
  pointRadiusUnit: PropTypes.string,
  renderWhileDragging: PropTypes.bool,
  rgb: PropTypes.array,
  bounds: PropTypes.array,
};

const defaultProps = {
  width: 400,
  height: 400,
  globalOpacity: 1,
  onViewportChange: NOOP,
  pointRadius: DEFAULT_POINT_RADIUS,
  pointRadiusUnit: 'Pixels',
};

class MapBox extends React.Component {
  constructor(props) {
    super(props);

    const { width, height, bounds } = this.props;
    // Get a viewport that fits the given bounds, which all marks to be clustered.
    // Derive lat, lon and zoom from this viewport. This is only done on initial
    // render as the bounds don't update as we pan/zoom in the current design.
    const mercator = new ViewportMercator({
      width,
      height,
    }).fitBounds(bounds);
    const { latitude, longitude, zoom } = mercator;

    this.state = {
      modal: {
        showModal: false,
        popupCoords: null,
        modal_data: null,
      },
      viewport: {
        longitude,
        latitude,
        zoom,
      },
    };
    this.handleViewportChange = this.handleViewportChange.bind(this);
    this.zoomIn = this.zoomIn.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
    this.handleViewDetail = this.handleViewDetail.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  zoomIn() {
    this.setState(prevState => ({
      viewport: {
        ...prevState.viewport,
        zoom: prevState.viewport.zoom + 1,
      },
    }));
  }

  zoomOut() {
    this.setState(prevState => ({
      viewport: {
        ...prevState.viewport,
        zoom: prevState.viewport.zoom - 1,
      },
    }));
  }

  handleViewportChange(viewport) {
    this.setState({ viewport });
    const { onViewportChange } = this.props;
    onViewportChange(viewport);
  }

  handleOpenModal(pixel, modal_data) {
    this.setState(prevState => ({
      ...prevState,
      modal: {
        showModal: true,
        popupCoords: pixel,
        modal_data,
      },
    }));
  }

  closeModal() {
    this.setState(prevState => ({
      ...prevState,
      modal: {
        showModal: false,
        popupCoords: null,
        modal_data: null,
      },
    }));
  }

  handleViewDetail(value) {
    const dataMask = {
      id: this.props?.filterIdForDetails,
      extraFormData: {
        filters: [
          {
            col: 'hospital_name',
            op: 'IN',
            val: [value],
          },
        ],
      },
      filterState: {
        validateMessage: false,
        label: value,
        value: [value],
      },
      ownState: {},
    };

    this?.props?.onChangeParentTab(4);
    this?.props?.handleApply(dataMask, this.props?.filterIdForDetails, () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }

  render() {
    const {
      width,
      height,
      clusterer,
      mapStyle,
      mapboxApiKey,
      bounds,
      namesDisappearZoomLevel,
      isMobile,
    } = this.props;
    const { viewport, modal } = this.state;
    const { modal_data, popupCoords, showModal } = modal;

    // Compute the clusters based on the original bounds and current zoom level. Note when zoom/pan
    // to an area outside of the original bounds, no additional queries are made to the backend to
    // retrieve additional data.
    // add this variable to widen the visible area
    const offsetHorizontal = (width * 0.5) / 100;
    const offsetVertical = (height * 0.5) / 100;
    const bbox = [
      bounds[0][0] - offsetHorizontal,
      bounds[0][1] - offsetVertical,
      bounds[1][0] + offsetHorizontal,
      bounds[1][1] + offsetVertical,
    ];
    const clusters = clusterer.getClusters(bbox, Math.round(viewport.zoom));

    return (
      <MapGL
        {...viewport}
        mapStyle={mapStyle}
        width={width}
        height={isMobile ? 450 : height}
        mapboxApiAccessToken={mapboxApiKey}
        onViewportChange={this.handleViewportChange}
        preserveDrawingBuffer
      >
        {clusters.map((item, index) => (
          <>
            {item?.properties?.modal_data?.longitude &&
              item?.properties?.modal_data?.latitude && (
                <Marker
                  key={`marker-${index}`}
                  longitude={item?.properties?.modal_data?.longitude}
                  latitude={item?.properties?.modal_data?.latitude}
                  onClick={() => {
                    this.handleOpenModal(
                      item?.geometry.coordinates,
                      item?.properties?.modal_data,
                    );
                  }}
                >
                  <Point className="point" />
                  {viewport?.zoom >= namesDisappearZoomLevel && (
                    <span className="pointText">
                      {item?.properties?.modal_data?.hospital_name}
                    </span>
                  )}
                </Marker>
              )}
          </>
        ))}
        {showModal && popupCoords && modal_data && (
          <Popup
            longitude={popupCoords[0]}
            latitude={popupCoords[1]}
            anchor="right"
            onClose={this.closeModal}
            className="popup"
            offsetLeft={10}
            offsetTop={10}
          >
            <div className="wrapper">
              <h3 className="title">{modal_data?.hospital_name}</h3>
              <div className="divider" />
              <div className="infoList">
                {modal_data?.map_address && (
                  <div className="listItem">
                    <LocationIcon />
                    <span className="listItemText">
                      {modal_data?.map_address}
                    </span>
                  </div>
                )}
                {modal_data?.phone && (
                  <div className="listItem">
                    <PhoneIcon />
                    <span className="listItemText">{modal_data?.phone}</span>
                  </div>
                )}
                {modal_data?.website && (
                  <div className="listItem">
                    <WorldIcon />
                    <span className="listItemText">{modal_data?.website}</span>
                  </div>
                )}
              </div>
              <button
                type="button"
                className="button"
                onClick={() => this.handleViewDetail(modal_data?.hospital_name)}
              >
                Hospital Details
              </button>
            </div>
          </Popup>
        )}
        <div className="zoom-controls">
          <button
            type="button"
            disabled={viewport?.zoom === viewport?.maxZoom}
            onClick={this.zoomIn}
            className="zoom-btn zoom-in"
          >
            <ZoomIn />
          </button>
          <div className="divider" />
          <button
            type="button"
            disabled={viewport?.zoom === viewport?.minZoom}
            onClick={this.zoomOut}
            className="zoom-btn zoom-out"
          >
            <ZoomOut />
          </button>
        </div>
      </MapGL>
    );
  }
}

MapBox.propTypes = propTypes;
MapBox.defaultProps = defaultProps;

export default MapBox;
