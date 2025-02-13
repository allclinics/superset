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
import React, { useState, useEffect, useCallback, type FC } from 'react';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';
import CustomTooltip from 'src/dashboard/components/tour-tooltip';
import Button from 'src/components/Button';
import { TOUR_STORAGE_KEY } from 'src/dashboard/constants';
import Rocket from '../../../assets/images/rocket.png';
import {
  Title,
  Modal,
  Description,
  ModalWrapper,
  ButtonsWrapper,
} from './tour.styled';

const steps: Step[] = [
  {
    target: '.vertical-filters',
    title: 'Data filters',
    content:
      'Using these filters, you can narrow your data search to a specific state, city, or clinic. Please note that the Update Date and State fields are required.',
    placement: 'right',
    disableBeacon: true,
  },
  {
    target: '.ant-tabs-nav-list',
    title: 'Main menu',
    content: 'Select on of the categories in the main menu.',
    disableBeacon: true,
    placement: 'bottom',
  },
  {
    target: '.tour-chart',
    title: 'Chart',
    content:
      'The main window for visual display of data in a chart with a name and legend.',
    disableBeacon: true,
    placement: 'right',
  },
  {
    target: '.filter-counts',
    title: 'Chart filters',
    content:
      'The main window for visual display of data in a chart with a name and legend.',
    disableBeacon: true,
    placement: 'bottom',
  },
  {
    target: '.tour-info-icon',
    title: 'Text legend',
    content:
      'It contains detailed information about the selected chart and how to use it.',
    disableBeacon: true,
    placement: 'bottom',
  },
  {
    target: '.tour-video-icon',
    title: 'Video',
    content:
      'It contains detailed information about the selected chart and how to use it.',
    disableBeacon: true,
    placement: 'bottom',
  },
  {
    target: '.tour-table',
    title: 'Table',
    content:
      'The main window of the table displaying data with the name and legend. In the show window, you can select the number of displayed items in the table. In the search box, you can search for items by name, as well as scroll through the table by row.',
    disableBeacon: true,
    placement: 'left',
  },
];

const Tour: FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [run, setRun] = useState(false);

  useEffect(() => {
    const hasCompletedTour = localStorage.getItem(TOUR_STORAGE_KEY);
    if (!hasCompletedTour) {
      setIsOpenModal(true);
    }
  }, []);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;

    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      localStorage.setItem(TOUR_STORAGE_KEY, 'true');
      setRun(false);
    }
  };

  const handleStarTour = useCallback(() => {
    setRun(true);
    setIsOpenModal(false);
  }, []);

  const handleSkipTour = useCallback(() => {
    setRun(false);
    localStorage.setItem(TOUR_STORAGE_KEY, 'true');
    setIsOpenModal(false);
  }, []);

  return (
    <>
      <Joyride
        tooltipComponent={CustomTooltip}
        steps={steps}
        run={run}
        continuous
        callback={handleJoyrideCallback}
        showProgress
        disableScrolling
      />
      {isOpenModal && (
        <ModalWrapper>
          <Modal>
            <img src={Rocket} alt="arrow left" />
            <Title>Welcome to AllClinics!</Title>
            <Description>
              Let’s take a quick tour to help you get started with key features.
            </Description>
            <ButtonsWrapper>
              <Button
                buttonStyle="custom_secondary"
                buttonSize="medium"
                className="button"
                onClick={handleSkipTour}
              >
                Skip
              </Button>
              <Button
                buttonStyle="custom_primary"
                htmlType="submit"
                buttonSize="medium"
                className="button"
                onClick={handleStarTour}
              >
                Start Tour
              </Button>
            </ButtonsWrapper>
          </Modal>
        </ModalWrapper>
      )}
    </>
  );
};

export default Tour;
