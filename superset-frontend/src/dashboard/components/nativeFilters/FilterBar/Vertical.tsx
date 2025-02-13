/* eslint-disable import/no-unresolved */
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

/* eslint-disable no-param-reassign */
import { throttle } from 'lodash';
import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
  createContext,
} from 'react';
import cx from 'classnames';
import {
  FeatureFlag,
  isFeatureEnabled,
  styled,
  t,
  useTheme,
} from '@superset-ui/core';
import Icons from 'src/components/Icons';
import Loading from 'src/components/Loading';
import { EmptyStateSmall } from 'src/components/EmptyState';
import useDetectDevice from 'src/hooks/useDetectDevice';
import { getFilterBarTestId } from './utils';
import { VerticalBarProps } from './types';
import Header from './Header';
import FilterControls from './FilterControls/FilterControls';
import CrossFiltersVertical from './CrossFilters/Vertical';
import { useFilterControlFactory } from './useFilterControlFactory';
import { useSelectFiltersInScope } from '../state';

const BarWrapper = styled.div<{ width: number }>`
  width: ${({ theme }) => theme.gridUnit * 8}px;

  & .ant-tabs-top > .ant-tabs-nav {
    margin: 0;
  }
  &.open {
    width: ${({ width }) => width}px;
  }
`;

const Button = styled.button`
  width: 120px;
  height: 36px;
  left: 24px;
  top: 106px;
  border: 1px solid #f5f6fa;
  border-radius: 20px;
  z-index: 1000;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: #fff;

  .filterText {
    font-family: Inter;
    font-size: 14px;
    font-weight: 500;
    line-height: 24px;
    color: #a8adc6;
  }

  .filterCount {
    color: #fff;
    background: #3876f6;
    display: flex;
    width: 18px;
    height: 18px;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    font-size: 10px;
    font-weight: 500;
    line-height: 24px;
  }

  .filterContainer {
    display: flex;
    flex-direction: row;
    column-gap: 6px;
    align-items: center;
  }
`;

const Bar = styled.div<{ width: number }>`
  ${({ theme, width }) => `
    & .ant-typography-edit-content {
      left: 0;
      margin-top: 0;
      width: 100%;
    }
    position: absolute;
    top: 0;
    left: 0;
    flex-direction: column;
    flex-grow: 1;
    width: ${width}px;
    background: ${theme.colors.grayscale.light5};
    border-right: 1px solid ${theme.colors.grayscale.light2};
    border-bottom: 1px solid ${theme.colors.grayscale.light2};
    min-height: 100%;
    display: none;
    &.open {
      display: flex;

    @media (max-width: 768px) {
      width: 100vw;
      top: unset;
      bottom: 0px;
      min-height: calc(100vh - 24px);
      position: fixed;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
    }
}

    }
  `}
`;

const MobileFilterBackground = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    background: rgba(0, 0, 0, 0.4);
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0px;
    bottom: 0px;
  }
`;

const FilterBarEmptyStateContainer = styled.div`
  margin-top: ${({ theme }) => theme.gridUnit * 8}px;
`;

const FilterControlsWrapper = styled.div`
  padding: ${({ theme }) => theme.gridUnit * 4}px;
  // 140px padding to make room for buttons with position: absolute
  padding-bottom: ${({ theme }) => theme.gridUnit * 35}px;

  @media (max-width: 768px) {
    padding: 24px;
    padding-bottom: 50px;
  }
`;

export const FilterBarScrollContext = createContext(false);
const VerticalFilterBar: React.FC<VerticalBarProps> = ({
  actions,
  canEdit,
  dataMaskSelected,
  filtersOpen,
  filterValues,
  height,
  isInitialized,
  onSelectionChange,
  toggleFiltersBar,
  width,
}) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const timeout = useRef<any>();
  const theme = useTheme();
  const { isMobile } = useDetectDevice();

  const { filtersWithValues } = useFilterControlFactory(
    dataMaskSelected,
    onSelectionChange,
  );

  const [filtersInScope] = useSelectFiltersInScope(filtersWithValues);

  const filterCount = useMemo(
    () =>
      filtersInScope.filter(item => item?.dataMask?.filterState?.value).length,
    [filtersInScope],
  );

  const openFiltersBar = useCallback(
    () => toggleFiltersBar(true),
    [toggleFiltersBar],
  );

  const onScroll = useMemo(
    () =>
      throttle(() => {
        clearTimeout(timeout.current);
        setIsScrolling(true);
        timeout.current = setTimeout(() => {
          setIsScrolling(false);
        }, 300);
      }, 200),
    [],
  );

  useEffect(() => {
    document.onscroll = onScroll;
    return () => {
      document.onscroll = null;
    };
  }, [onScroll]);

  const tabPaneStyle = useMemo(
    () => ({ overflow: 'auto', height, overscrollBehavior: 'contain' }),
    [height],
  );

  const filterControls = useMemo(
    () =>
      filterValues.length === 0 ? (
        <FilterBarEmptyStateContainer>
          <EmptyStateSmall
            title={t('No global filters are currently added')}
            image="filter.svg"
            description={
              canEdit &&
              t(
                'Click on "+Add/Edit Filters" button to create new dashboard filters',
              )
            }
          />
        </FilterBarEmptyStateContainer>
      ) : (
        <FilterControlsWrapper className="filter-control-wrapper">
          <FilterControls
            dataMaskSelected={dataMaskSelected}
            onFilterSelectionChange={onSelectionChange}
          />
        </FilterControlsWrapper>
      ),
    [canEdit, dataMaskSelected, filterValues.length, onSelectionChange],
  );

  const crossFilters = useMemo(
    () =>
      isFeatureEnabled(FeatureFlag.DashboardCrossFilters) ? (
        <CrossFiltersVertical />
      ) : null,
    [],
  );

  return (
    <FilterBarScrollContext.Provider value={isScrolling}>
      {filtersOpen && <MobileFilterBackground />}
      <BarWrapper
        {...getFilterBarTestId()}
        className={cx({ open: filtersOpen })}
        width={width}
      >
        {isMobile && !filtersOpen && (
          <Button onClick={openFiltersBar}>
            <div className="filterContainer">
              <span className="filterText">Filters</span>
              {!!filterCount && (
                <div className="filterCount">{filterCount}</div>
              )}
              <Icons.FilterSetting iconColor={theme.colors.grayscale.base} />
            </div>
          </Button>
        )}
        <Bar
          className={cx('vertical-filters', { open: filtersOpen })}
          width={width}
        >
          <Header toggleFiltersBar={toggleFiltersBar} />
          {!isInitialized ? (
            <div css={{ height }}>
              <Loading />
            </div>
          ) : (
            <div css={tabPaneStyle} onScroll={onScroll}>
              <>
                {crossFilters}
                {filterControls}
              </>
            </div>
          )}
          {actions}
        </Bar>
      </BarWrapper>
    </FilterBarScrollContext.Provider>
  );
};
export default React.memo(VerticalFilterBar);
