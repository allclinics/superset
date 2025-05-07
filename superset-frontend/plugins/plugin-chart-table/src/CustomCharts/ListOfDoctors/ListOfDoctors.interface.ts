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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { Row } from 'react-table';

export interface IDoctor {
  address: string;
  doctor_name: string;
  gender: string;
  graduation_year: number;
  medical_degree: string;
  medical_school: string;
  npi: number;
  primary_specialization: string;
  count_phones: number;
  last_phone: string;
  other_specialization: string;
}

export interface ListOfDoctorsProps {
  data: Row<IDoctor>[];
  filterIdForDetails?: string;
  handleApply?: (
    dataMask: unknown,
    filterIdForDetails?: string,
    callbackFn?: () => void,
  ) => void;
  onChangeParentTab?: (tabId: number) => void;
}
