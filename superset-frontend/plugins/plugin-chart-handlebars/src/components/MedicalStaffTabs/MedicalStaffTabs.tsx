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
import React, { useCallback, useMemo, useState, type FC } from 'react';
// components
import MedicalStaffTable from '../MedicalStaffTable';
import MedicalStaffContacts from '../MedicalStaffContacts';
// types
import type { MediacalStaffTabsProps } from './MedicalStaffTabs.interface';
// styles
import { Tab, TabsWrapper, Container } from './MedicalStaffTabs.styled';

enum Tabs {
  Practice = 'practice',
  Contacts = 'contacts',
}

const MediacalStaffTabs: FC<MediacalStaffTabsProps> = ({
  data,
  isMobile,
  filterIdForDetails,
  mapboxApiKey,
  handleApply,
  onChangeParentTab,
}) => {
  const [activeTabId, setActiveTabId] = useState(Tabs.Practice);

  const tabs = useMemo(
    () => [
      {
        id: Tabs.Practice,
        name: 'Practice',
      },
      {
        id: Tabs.Contacts,
        name: 'Contacts',
      },
    ],
    [],
  );

  const handleActiveTab = useCallback(
    (tabId: Tabs) => () => {
      setActiveTabId(tabId);
    },
    [],
  );

  const renderActiveTab = useCallback(() => {
    switch (activeTabId) {
      case Tabs.Practice:
        return (
          <MedicalStaffTable
            filterIdForDetails={filterIdForDetails}
            mapboxApiKey={mapboxApiKey}
            data={data}
            isMobile={isMobile}
            onChangeParentTab={onChangeParentTab}
            handleApply={handleApply}
          />
        );
      case Tabs.Contacts:
        return <MedicalStaffContacts data={data} />;
      default:
        return null;
    }
  }, [
    activeTabId,
    data,
    isMobile,
    filterIdForDetails,
    handleApply,
    mapboxApiKey,
    onChangeParentTab,
  ]);

  return (
    <Container>
      <TabsWrapper>
        {tabs.map(item => (
          <Tab
            active={item.id === activeTabId}
            type="button"
            key={item.id}
            onClick={handleActiveTab(item.id)}
          >
            {item.name}
          </Tab>
        ))}
      </TabsWrapper>
      {renderActiveTab()}
    </Container>
  );
};

export default MediacalStaffTabs;
