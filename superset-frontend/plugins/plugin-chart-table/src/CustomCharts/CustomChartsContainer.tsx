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
import React from 'react';
// components
import { Row } from 'react-table';
import ListOfDoctors from './ListOfDoctors';
// types
import type { IDoctor } from './ListOfDoctors/ListOfDoctors.interface';

interface CustomChartsContaineProps<D extends object> {
  page: Row<D>[];
  filterIdForDetails?: string;
  customDisplayChart: string;
  onChangeParentTab?: (tabId: number) => void;
  handleApply?: (
    dataMask: unknown,
    filterIdForDetails?: string,
    callbackFn?: () => void,
  ) => void;
}

const CustomChartsContainer = <D extends object>({
  page,
  filterIdForDetails,
  handleApply,
  onChangeParentTab,
  customDisplayChart,
}: CustomChartsContaineProps<D>) => (
  <>
    {customDisplayChart === 'listOfDoctors' && (
      <ListOfDoctors
        filterIdForDetails={filterIdForDetails}
        onChangeParentTab={onChangeParentTab}
        handleApply={handleApply}
        data={page as unknown as Row<IDoctor>[]}
      />
    )}
  </>
);

export default CustomChartsContainer;
