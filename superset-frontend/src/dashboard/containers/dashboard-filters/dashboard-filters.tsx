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
import React, { Fragment, type FC } from 'react';
// components
import Icons from 'src/components/Icons';
import DashboardFilter from 'src/dashboard/components/dashboard-filter';
// types
import type { DashboardFiltersProps } from './dashboard-filters.interface';
// styles
import {
  Wrapper,
  SearchWrapper,
  FiltersWrapper,
  FilterPanelButton,
} from './dashboard-filters.styled';

const DashboardFilters: FC<DashboardFiltersProps> = ({
  isSearchInput,
  filtersInScope,
  dataMaskApplied,
  renderHospitalNameFilter,
  handleDeleteFilterOption,
  toggleDashboardFiltersOpen,
}) => (
  <Wrapper isSearchInput={isSearchInput}>
    <FiltersWrapper>
      <FilterPanelButton onClick={toggleDashboardFiltersOpen}>
        <Icons.FilterIcon />
        All Filters
      </FilterPanelButton>
      {filtersInScope?.map(item => (
        <Fragment key={item.id}>
          <DashboardFilter
            filter={item}
            dataMaskApplied={dataMaskApplied}
            handleDeleteFilterOption={handleDeleteFilterOption}
          />
        </Fragment>
      ))}
    </FiltersWrapper>
    {isSearchInput && (
      <SearchWrapper>{renderHospitalNameFilter()}</SearchWrapper>
    )}
  </Wrapper>
);

export default DashboardFilters;
