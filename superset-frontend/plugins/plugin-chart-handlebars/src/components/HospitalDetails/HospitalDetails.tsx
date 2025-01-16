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
import React, { FC, useCallback, useMemo, useState } from 'react';
import { HospitalDetailsProps } from './HospitalDetails.interface';
import { HospitalDetailsTabs } from '../../consts';
import {
  Tab,
  Wrapper,
  TabContent,
  TabsWrapper,
} from './HospitalDetails.styled';
import GeneralOverview from '../GeneralOverview';
import HospitalServies from '../HospitalServices/HospitalServices';

const HospitalDetails: FC<HospitalDetailsProps> = ({
  data,
  mapboxApiKey,
  isMobile,
}) => {
  const [activeTab, setActiveTab] = useState(
    HospitalDetailsTabs.GeneralOverview,
  );

  const handleChangeTab = useCallback(
    (value: HospitalDetailsTabs) => () => {
      setActiveTab(value);
    },
    [],
  );

  const tabs = useMemo(
    () => [
      {
        name: 'General Overview',
        value: HospitalDetailsTabs.GeneralOverview,
        isActive: activeTab === HospitalDetailsTabs.GeneralOverview,
      },
      {
        name: 'Hospital Services',
        value: HospitalDetailsTabs.HospitalServices,
        isActive: activeTab === HospitalDetailsTabs.HospitalServices,
      },
    ],
    [activeTab],
  );

  const renderTabContent = useCallback(() => {
    switch (activeTab) {
      case HospitalDetailsTabs.HospitalServices:
        return (
          <HospitalServies
            cardiacIcu={data[0]?.cardiac_icu}
            medicalSurgicalIcu={data[0]?.medical_surgical_icu}
            addictionTreatmentServices={data[0]?.addiction_treatment_services}
            onsiteEmergencyDepartment={data[0]?.onsite_emergency_department}
            bariatricWeightControlServices={
              data[0]?.bariatric_weight_control_services
            }
          />
        );

      default:
        return (
          <GeneralOverview
            data={data}
            mapboxApiKey={mapboxApiKey}
            isMobile={isMobile}
            patientExperience={data[0]?.patient_experience}
          />
        );
    }
  }, [activeTab, data, isMobile, mapboxApiKey]);

  return (
    <Wrapper>
      <TabsWrapper>
        {tabs.map((item, index) => (
          <Tab
            key={index}
            isActive={item.isActive}
            onClick={handleChangeTab(item.value)}
          >
            {item.name}
          </Tab>
        ))}
      </TabsWrapper>
      <TabContent>{renderTabContent()}</TabContent>
    </Wrapper>
  );
};

export default HospitalDetails;
