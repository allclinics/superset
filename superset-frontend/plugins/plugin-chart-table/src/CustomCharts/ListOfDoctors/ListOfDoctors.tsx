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
import React, { FC, Fragment, useCallback } from 'react';
import { ListOfDoctorsProps } from './ListOfDoctors.interface';
import DoctorItem from '../DoctorItem';
import { Root } from './ListOfDoctors.styled';

const ListOfDoctors: FC<ListOfDoctorsProps> = ({
  data,
  isMobile,
  filterIdForDetails,
  handleApply,
  onChangeParentTab,
}) => {
  const handleOpenDoctor = useCallback(
    async (npi: number) => {
      const dataMask = {
        id: filterIdForDetails,
        extraFormData: {
          filters: [
            {
              col: 'npi',
              op: 'IN',
              val: [npi],
            },
          ],
        },
        filterState: {
          validateMessage: false,
          label: npi,
          value: [npi],
        },
        ownState: {},
      };

      if (onChangeParentTab && handleApply) {
        onChangeParentTab(5);

        await handleApply(dataMask, filterIdForDetails, () => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        });
      }
    },
    [filterIdForDetails, handleApply, onChangeParentTab],
  );

  return (
    <Root isMobile={isMobile}>
      {data.map(item => (
        <Fragment key={item.id}>
          <DoctorItem
            {...item.original}
            isMobile={isMobile}
            onOpenDoctor={handleOpenDoctor}
          />
        </Fragment>
      ))}
    </Root>
  );
};

export default ListOfDoctors;
