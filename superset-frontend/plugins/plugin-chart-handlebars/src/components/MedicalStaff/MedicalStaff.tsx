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
import React, { type FC } from 'react';
// components
import MedicalStaffOverview from '../MedicalStaffOverview';
import MedicalStaffPerformedProcedures from '../MedicalStaffPerformedProcedures';
import MedicalStaffScores from '../MedicalStaffScores';
import MedicalStaffTable from '../MedicalStaffTable/MedicalStaffTable';
// types
import type { MedicalStaffProps } from './MedicalStaff.interface';
// styles
import { Root } from './MedicalStaff.styled';

const MedicalStaff: FC<MedicalStaffProps> = ({
  data,
  mapboxApiKey,
  isMedicalStaffOverview,
  isMedicalStaffPerformedProcedures,
  isMedicalStaffScoresControl,
  isMedicalStaffTableControl,
}) => (
  <Root>
    {isMedicalStaffOverview && <MedicalStaffOverview data={data} />}
    {isMedicalStaffPerformedProcedures && (
      <MedicalStaffPerformedProcedures data={data} />
    )}
    {isMedicalStaffScoresControl && <MedicalStaffScores data={data} />}
    {isMedicalStaffTableControl && (
      <MedicalStaffTable mapboxApiKey={mapboxApiKey} data={data} />
    )}
  </Root>
);
export default MedicalStaff;
