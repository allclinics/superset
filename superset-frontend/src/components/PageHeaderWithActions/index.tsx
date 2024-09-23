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
import React, { ReactNode, ReactElement } from 'react';
import { css, SupersetTheme, t, useTheme } from '@superset-ui/core';
import { AntdDropdown, AntdDropdownProps } from 'src/components';
import { TooltipPlacement } from 'src/components/Tooltip';
import {
  DynamicEditableTitle,
  DynamicEditableTitleProps,
} from '../DynamicEditableTitle';
import CertifiedBadge, { CertifiedBadgeProps } from '../CertifiedBadge';
import FaveStar, { FaveStarProps } from '../FaveStar';
import Icons from '../Icons';
import Button from '../Button';

export const menuTriggerStyles = (theme: SupersetTheme) => css`
  width: ${theme.gridUnit * 8}px;
  height: ${theme.gridUnit * 8}px;
  padding: 0;
  border-radius: 20px;
  max-width: 178px;
  width: 100%;
  padding-left: 30px;
  padding-right: 30px;
  height: 48px;

  &.ant-btn > span.anticon {
    line-height: 0;
    transition: inherit;
    margin-right: 0px;
  }

  &:hover:not(:focus) > span.anticon {
    color: ${theme.colors.primary.light1};
  }

  .manage-text {
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    color: #3876f6;
    text-transform: capitalize;
  }
`;

const headerStyles = (theme: SupersetTheme, isFiltersOpen: boolean) => css`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
  justify-content: space-between;
  background-color: #f5f6fa;
  height: ${theme.gridUnit * 24}px;
  padding: ${theme.gridUnit * 6}px;
  padding-left: ${theme.gridUnit * (isFiltersOpen ? 6 : 14.5)}px;

  .editable-title {
    overflow: hidden;

    & > input[type='button'],
    & > span {
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
      white-space: nowrap;
    }
  }

  span[role='button'] {
    display: flex;
    height: 100%;
  }

  .title-panel {
    display: flex;
    align-items: center;
    min-width: 0;
    margin-right: ${theme.gridUnit * 12}px;
  }

  .right-button-panel {
    display: flex;
    align-items: center;
  }

  .collapse-button {
    background: #fff;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 24px;
    cusrsor: pointer;
  }

  .expend {
    transform: scaleX(-1);
  }
`;

const buttonsStyles = (theme: SupersetTheme) => css`
  display: flex;
  align-items: center;
  padding-left: ${theme.gridUnit * 2}px;

  & .fave-unfave-icon {
    padding: 0 ${theme.gridUnit}px;

    &:first-of-type {
      padding-left: 0;
    }
  }
`;

const additionalActionsContainerStyles = (theme: SupersetTheme) => css`
  margin-left: ${theme.gridUnit * 2}px;
`;

export type PageHeaderWithActionsProps = {
  editableTitleProps: DynamicEditableTitleProps;
  showTitlePanelItems: boolean;
  certificatiedBadgeProps?: CertifiedBadgeProps;
  showFaveStar: boolean;
  showMenuDropdown?: boolean;
  faveStarProps: FaveStarProps;
  titlePanelAdditionalItems: ReactNode;
  rightPanelAdditionalItems: ReactNode;
  additionalActionsMenu: ReactElement;
  menuDropdownProps: Omit<AntdDropdownProps, 'overlay'>;
  tooltipProps?: {
    text?: string;
    placement?: TooltipPlacement;
  };
  isFiltersOpen?: boolean;
  toggleFiltersBar?: () => void;
  userCanEdit?: boolean;
};

export const PageHeaderWithActions = ({
  editableTitleProps,
  showTitlePanelItems,
  certificatiedBadgeProps,
  showFaveStar,
  faveStarProps,
  titlePanelAdditionalItems,
  rightPanelAdditionalItems,
  additionalActionsMenu,
  menuDropdownProps,
  showMenuDropdown = true,
  tooltipProps,
  isFiltersOpen,
  toggleFiltersBar,
  userCanEdit,
}: PageHeaderWithActionsProps) => {
  const theme = useTheme();
  return (
    <div
      css={headerStyles(theme, !!isFiltersOpen)}
      className="header-with-actions"
    >
      <div className="title-panel">
        {!isFiltersOpen && (
          <div
            role="button"
            tabIndex={0}
            className="collapse-button"
            onClick={toggleFiltersBar}
          >
            <Icons.Expand
              iconColor={theme.colors.grayscale.base}
              className="expend"
            />
          </div>
        )}
        <DynamicEditableTitle {...editableTitleProps} />
        {showTitlePanelItems && (
          <div css={buttonsStyles}>
            {certificatiedBadgeProps?.certifiedBy && (
              <CertifiedBadge {...certificatiedBadgeProps} />
            )}
            {showFaveStar && userCanEdit && <FaveStar {...faveStarProps} />}
            {userCanEdit && titlePanelAdditionalItems}
          </div>
        )}
      </div>
      <div className="right-button-panel">
        {rightPanelAdditionalItems}
        <div css={additionalActionsContainerStyles}>
          {showMenuDropdown && userCanEdit && (
            <AntdDropdown
              trigger={['click']}
              overlay={additionalActionsMenu}
              {...menuDropdownProps}
            >
              <Button
                css={menuTriggerStyles}
                buttonStyle="custom_secondary"
                aria-label={t('Menu actions trigger')}
                tooltip={tooltipProps?.text}
                placement={tooltipProps?.placement}
                data-test="actions-trigger"
              >
                <Icons.Setting
                  iconColor={theme.colors.primary.base}
                  iconSize="xl"
                />
                <span className="manage-text">Manage</span>
              </Button>
            </AntdDropdown>
          )}
        </div>
      </div>
    </div>
  );
};
