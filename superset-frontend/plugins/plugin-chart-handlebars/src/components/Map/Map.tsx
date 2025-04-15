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
import MapGL, { Marker, Popup, ViewState } from 'react-map-gl';
import { ClinicItem, MapProps } from './Map.interface';
import {
  Button,
  Wrapper,
  PointText,
  ModalWrapper,
  ModalTitle,
  Divider,
  InfoList,
  ListItem,
  ListItemText,
} from './Map.styled';
import Point from '../../icons/point.svg';
import CallIcon from '../../icons/call.svg';
import WorldIcon from '../../icons/globe.svg';
import PinIcon from '../../icons/pin.svg';

const Map: FC<MapProps> = ({
  width,
  height,
  mapboxApiKey,
  list,
  defaultLatitude,
  defaultLongitude,
  isMobile,
  isEnabledModal,
  filterIdForDetails,
  onChangeParentTab,
  handleApply,
  styles = {},
}) => {
  const [isModal, setModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState<ClinicItem | null>(null);

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

  const handleOpenModal = useCallback(
    (item: ClinicItem) => () => {
      if (isEnabledModal) {
        setModal(true);
        setModalData(item);
      }
    },
    [isEnabledModal],
  );

  const closeModal = useCallback(() => {
    setModal(false);
    setModalData(null);
  }, []);

  const handleViewDetail = useCallback(
    value => () => {
      const dataMask = {
        id: filterIdForDetails,
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
      onChangeParentTab?.(1);
      handleApply?.(dataMask, filterIdForDetails ?? '', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      });
    },
    [filterIdForDetails, handleApply, onChangeParentTab],
  );

  return (
    <Wrapper width={width} height={height} style={styles}>
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
            onClick={handleOpenModal(item)}
          >
            <Point />
            <PointText>{item?.hospital_name}</PointText>
          </Marker>
        ))}
        {isModal &&
          modalData &&
          modalData?.longitude &&
          modalData?.latitude && (
            <Popup
              longitude={modalData?.longitude}
              latitude={modalData?.latitude}
              anchor="right"
              onClose={closeModal}
              className="popup"
              offsetLeft={10}
              offsetTop={10}
            >
              <ModalWrapper>
                <ModalTitle>{modalData?.hospital_name}</ModalTitle>
                <Divider />
                <InfoList>
                  {modalData?.address && (
                    <ListItem>
                      <PinIcon />
                      <ListItemText>{modalData?.address}</ListItemText>
                    </ListItem>
                  )}
                  {modalData?.phone && (
                    <ListItem>
                      <CallIcon />
                      <ListItemText>{modalData?.phone}</ListItemText>
                    </ListItem>
                  )}
                  {modalData?.website && (
                    <ListItem>
                      <WorldIcon />
                      <ListItemText>{modalData?.website}</ListItemText>
                    </ListItem>
                  )}
                </InfoList>
                <Button
                  type="button"
                  className="button"
                  onClick={handleViewDetail(modalData?.hospital_name)}
                >
                  Hospital Details
                </Button>
              </ModalWrapper>
            </Popup>
          )}
      </MapGL>
    </Wrapper>
  );
};

export default Map;
