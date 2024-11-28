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

import React from 'react';
import {
  styled,
  css,
  useTheme,
  getColumnLabel,
  useCSSTextTruncation,
} from '@superset-ui/core';
import { CrossFilterIndicator } from 'src/dashboard/components/nativeFilters/selectors';
import { Tag } from 'src/components';
import { Tooltip } from 'src/components/Tooltip';
import WeightCross from 'src/assets/images/icons/weight_cross.svg';
import { FilterBarOrientation } from 'src/dashboard/types';
import { ellipsisCss } from './styles';

const StyledCrossFilterValue = styled.b`
  ${({ theme }) => `
    max-width: ${theme.gridUnit * 25}px;
    font-size: 14px;
    line-height: 20px;
  `}
  ${ellipsisCss}
`;

const StyledCrossFilterColumn = styled('span')`
  ${({ theme }) => `
    max-width: ${theme.gridUnit * 25}px;
    padding-right: ${theme.gridUnit}px;
    font-size: 14px;
    line-height: 20px;
  `}
  ${ellipsisCss}
`;

const StyledTag = styled(Tag)`
  border: 1px solid #3876f6;
  border-radius: 10px;
  background: #d9e4ff;
  color: #3876f6;
  height: 24px;
  display: inline-flex;
  align-items: center;
  padding: 0px 4px 0px 12px;

  .anticon-close {
    vertical-align: middle;
    color: #3876f6;
  }
`;

const CrossFilterTag = (props: {
  filter: CrossFilterIndicator;
  orientation: FilterBarOrientation;
  removeCrossFilter: (filterId: number) => void;
}) => {
  const { filter, orientation, removeCrossFilter } = props;
  const theme = useTheme();
  const [columnRef, columnIsTruncated] =
    useCSSTextTruncation<HTMLSpanElement>();
  const [valueRef, valueIsTruncated] = useCSSTextTruncation<HTMLSpanElement>();

  const columnLabel = getColumnLabel(filter.column ?? '');
  return (
    <StyledTag
      css={css`
        .ant-tag-close-icon {
          justify-content: center;
          display: flex;
        }
        ${orientation === FilterBarOrientation.Vertical
          ? `
            margin-top: ${theme.gridUnit * 2}px;
          `
          : `
            margin-left: ${theme.gridUnit * 2}px;
          `}
      `}
      closable
      closeIcon={<WeightCross />}
      onClose={() => removeCrossFilter(filter.emitterId)}
    >
      <Tooltip title={columnIsTruncated ? columnLabel : null}>
        <StyledCrossFilterColumn ref={columnRef}>
          {columnLabel}
        </StyledCrossFilterColumn>
      </Tooltip>
      <Tooltip title={valueIsTruncated ? filter.value : null}>
        <StyledCrossFilterValue ref={valueRef}>
          {filter.value}
        </StyledCrossFilterValue>
      </Tooltip>
    </StyledTag>
  );
};

export default CrossFilterTag;
