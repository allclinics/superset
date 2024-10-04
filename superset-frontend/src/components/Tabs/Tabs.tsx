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
import { css, styled } from '@superset-ui/core';
import AntdTabs, { TabsProps as AntdTabsProps } from 'antd/lib/tabs';
import Icons from 'src/components/Icons';

export interface TabsProps extends AntdTabsProps {
  fullWidth?: boolean;
  allowOverflow?: boolean;
}

const StyledTabs = ({
  animated = false,
  fullWidth = true,
  allowOverflow = true,
  ...props
}: TabsProps) => (
  <AntdTabs
    animated={animated}
    {...props}
    css={theme => css`
      overflow: ${allowOverflow ? 'visible' : 'hidden'};

      .ant-tabs-nav-list {
        justify-content: space-between;
        width: 100%;
      }

      .ant-tabs-content-holder {
        overflow: ${allowOverflow ? 'visible' : 'auto'};
      }
      .ant-tabs-tab {
        flex: 1 1 auto;
        &.ant-tabs-tab-active .ant-tabs-tab-btn {
          color: #3876f6;
        }
        &:hover {
          .anchor-link-container {
            cursor: pointer;
            .fa.fa-link {
              visibility: visible;
            }
          }
        }

        .short-link-trigger {
          padding: 0px;
          margin-right: 10px;
          transform: translate(0px, 0px);
        }

        .short-link-trigger.btn {
          padding: 0px 0px 0px 0px;
          & > .anticon {
            margin: 0px;
          }
        }
      }
      ${fullWidth &&
      css`
        .ant-tabs-nav-list {
          width: 100%;
        }
      `};

      .ant-tabs-tab-btn {
        display: flex;
        flex: 1 1 auto;
        align-items: center;
        justify-content: center;
        font-size: ${theme.typography.sizes.s}px;
        text-align: center;
        text-transform: uppercase;
        user-select: none;
        color: #5a607f;
        .required {
          margin-left: ${theme.gridUnit / 2}px;
          color: ${theme.colors.error.base};
        }
      }
      .ant-tabs-ink-bar {
        background: ${theme.colors.primary.base};
        z-index: 1;
      }
    `}
  />
);

const StyledTabPane = styled(AntdTabs.TabPane)``;

const Tabs = Object.assign(StyledTabs, {
  TabPane: StyledTabPane,
});

const StyledEditableTabs = styled(StyledTabs)`
  ${({ theme, fullWidth }) => `
    .ant-tabs-content-holder {
      background: ${theme.colors.grayscale.light5};
    }

    & > .ant-tabs-nav {
      margin-bottom: 0;
    }

    .ant-tabs-tab-remove {
      padding-top: 0;
      padding-bottom: 0;
      height: ${theme.gridUnit * 6}px;
    }

    ${
      fullWidth
        ? css`
            .ant-tabs-nav-list {
              width: 100%;
            }
          `
        : ''
    }
  `}
`;

const StyledCancelXIcon = styled(Icons.CancelX)`
  color: ${({ theme }) => theme.colors.grayscale.base};
`;
export const EditableTabs = Object.assign(StyledEditableTabs, {
  TabPane: StyledTabPane,
});

EditableTabs.defaultProps = {
  type: 'editable-card',
  fullWidth: false,
  animated: { inkBar: true, tabPane: false },
};

EditableTabs.TabPane.defaultProps = {
  closeIcon: <StyledCancelXIcon role="button" tabIndex={0} />,
};

export const StyledLineEditableTabs = styled(EditableTabs)<{
  isChild?: boolean;
}>`
  &.ant-tabs-card > .ant-tabs-nav .ant-tabs-tab {
    margin: 0
      ${({ theme, isChild }) =>
        isChild ? `0px !important` : `${theme.gridUnit * 6}px`};
    padding: ${({ theme }) => `${theme.gridUnit * 3}px ${6}px`};
    background: transparent;
    border: none;
    border-radius: ${({ isChild }) => (isChild ? '20px' : '0px')};
    max-width: ${({ isChild }) => (isChild ? '342px' : 'unset')};
    width: ${({ isChild }) => (isChild ? '100%' : 'unset')};
    height: ${({ isChild }) => (isChild ? '48px' : 'unset')};

    &:hover {
      span {
        color: #3876f6 !important;
      }
    }
  }

  .ant-tabs-tab-active {
    background: ${({ isChild }) =>
      isChild ? '#fff !important' : 'transparent'};
  }

  &.ant-tabs-card > .ant-tabs-nav .ant-tabs-ink-bar {
    visibility: ${({ isChild }) => (isChild ? 'hidden' : 'visible')};
  }

  .ant-tabs-tab-btn {
    font-size: ${({ theme }) => theme.typography.sizes.m}px;
  }

  .ant-tabs-tab-remove {
    margin-left: 0;
    padding-right: 0;
  }

  .ant-tabs-nav-add {
    min-width: unset !important;
    background: transparent !important;
    border: none !important;
  }

  .ant-tabs-nav-list {
    background: ${({ isChild }) => (isChild ? '#f5f6fa' : 'transparent')};
    border-radius: ${({ isChild }) => (isChild ? '20px' : '0px')};
    padding: ${({ isChild }) => (isChild ? '4px' : '10px 0px 0px 0px')};
  }

  .ant-tabs-nav {
    padding-right: ${({ isChild }) => (isChild ? '0px' : '24px')};
    position: ${({ isChild }) => (isChild ? 'unset' : 'sticky')};
    top: ${({ isChild }) => (isChild ? 'unset' : '24px')};
    z-index: ${({ isChild }) => (isChild ? 'unset' : '100')};
    background: ${({ isChild }) => (isChild ? 'unset' : 'white')};
    border-top-left-radius: ${({ isChild }) => (isChild ? 'unset' : '20px')};
    border-top-right-radius: ${({ isChild }) => (isChild ? 'unset' : '20px')};
    box-shadow: ${({ isChild }) =>
      isChild
        ? 'unset'
        : '0 -3px 20px #f7f7f7, -3px 0 20px #f7f7f7, 3px 0 20px #f7f7f7'};
    clip-path: ${({ isChild }) =>
      isChild ? 'unset' : 'inset(-10px -10px 0 -10px)'};

    &::before {
      display: ${({ isChild }) => (isChild ? 'none' : 'block')};
      width: calc(100% - 48px);
      left: 24px;
    }
  }
`;

export const LineEditableTabs = Object.assign(StyledLineEditableTabs, {
  TabPane: StyledTabPane,
});

export default Tabs;
