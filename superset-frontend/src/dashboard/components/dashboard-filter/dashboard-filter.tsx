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
import React, { useCallback, useMemo, useRef, type FC } from 'react';
// componets
import Icons from 'src/components/Icons';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
import { useOnClickOutside } from 'src/hooks/use-outside-click';
// types
import { DashboardFilterProps } from './dashboard-filter.interface';
// styles
import {
  Option,
  Wrapper,
  Options,
  IconButton,
  FilterName,
  FilterCount,
  OptionLabel,
} from './dashboard-filter.styled';

const DashboardFilter: FC<DashboardFilterProps> = ({
  filter,
  dataMaskApplied,
  handleDeleteFilterOption,
}) => {
  const filterDataMask = useMemo(
    () => dataMaskApplied[filter.id],
    [dataMaskApplied, filter.id],
  );

  const ref = useRef<HTMLDivElement>(null);

  const [isOpen, { off, toggle }] = useBoolean(false);

  useOnClickOutside(ref, off);

  const lengthFilterValues = useMemo(
    () => filterDataMask?.filterState?.value?.length,
    [filterDataMask?.filterState?.value?.length],
  );

  const options: string[] = useMemo(
    () => filterDataMask?.filterState?.value,
    [filterDataMask?.filterState?.value],
  );

  const handleDelete = useCallback(
    option => () => {
      handleDeleteFilterOption(filter, option, filterDataMask);
    },
    [filter, filterDataMask, handleDeleteFilterOption],
  );

  return (
    <Wrapper ref={ref} isOpen={isOpen} onClick={toggle}>
      <FilterName>{filter.name}</FilterName>
      {!!lengthFilterValues && <FilterCount>{lengthFilterValues}</FilterCount>}
      <Icons.Dropdown iconSize="xl" />
      <Options isOpen={isOpen}>
        {options?.map((option, index) => (
          <Option key={index}>
            <OptionLabel>{option}</OptionLabel>
            <IconButton type="button" onClick={handleDelete(option)}>
              <Icons.CrossGray style={{ transform: 'translate(0px, 6px)' }} />
            </IconButton>
          </Option>
        ))}
      </Options>
    </Wrapper>
  );
};

export default DashboardFilter;
