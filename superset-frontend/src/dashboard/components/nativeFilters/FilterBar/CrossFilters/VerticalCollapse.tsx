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

import React, { useCallback, useMemo } from 'react';
import Collapse from 'src/components/Collapse';
import { styled, t, useTheme, css } from '@superset-ui/core';
import Icons from 'src/components/Icons';
import { FilterBarOrientation } from 'src/dashboard/types';
import CrossFilter from './CrossFilter';
import { CrossFilterIndicator } from '../../selectors';

const StyledCollapse = styled(Collapse)`
  ${({ theme }) => `
    .ant-collapse-header {
      margin-bottom: ${theme.gridUnit * 4}px;
    }
    .ant-collapse-item > .ant-collapse-header {
      padding-bottom: 0;
    }
    .ant-collapse-item > .ant-collapse-header > .ant-collapse-arrow {
      font-size: ${theme.typography.sizes.xs}px;
      padding-top: ${theme.gridUnit * 3}px;
    }
    .ant-collapse-item > .ant-collapse-content > .ant-collapse-content-box {
      padding-top: 0;
    }
  `}
`;

const StyledCrossFiltersTitle = styled.span`
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
`;

const CrossFiltersVerticalCollapse = (props: {
  crossFilters: CrossFilterIndicator[];
}) => {
  const { crossFilters } = props;
  const theme = useTheme();
  const crossFiltersIndicators = useMemo(
    () =>
      crossFilters.map(filter => (
        <CrossFilter
          key={filter.emitterId}
          filter={filter}
          orientation={FilterBarOrientation.Vertical}
        />
      )),
    [crossFilters],
  );

  const renderExpendIcon = useCallback(
    ({ isActive }: { isActive: boolean }) => (
      <Icons.Dropdown
        style={{
          transform: `translate(-5px, 6px) rotate(${
            isActive ? '180deg' : '0deg'
          })`,
          fontSize: '22px',
          padding: 0,
          transition: 'transform 0.3s ease',
        }}
      />
    ),
    [],
  );

  if (!crossFilters.length) {
    return null;
  }

  return (
    <StyledCollapse
      ghost
      defaultActiveKey="crossFilters"
      expandIconPosition="right"
      expandIcon={renderExpendIcon}
    >
      <Collapse.Panel
        key="crossFilters"
        header={
          <StyledCrossFiltersTitle>
            {t('Cross-filters')}
          </StyledCrossFiltersTitle>
        }
      >
        {crossFiltersIndicators}
        <span
          data-test="cross-filters-divider"
          css={css`
            width: 100%;
            height: 1px;
            display: block;
            background: ${theme.colors.grayscale.light3};
            margin: 24px auto 0 auto;
          `}
        />
      </Collapse.Panel>
    </StyledCollapse>
  );
};

export default CrossFiltersVerticalCollapse;
