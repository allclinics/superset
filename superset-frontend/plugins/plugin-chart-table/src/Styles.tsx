/* eslint-disable theme-colors/no-literal-colors */
/*
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

import { css, styled } from '@superset-ui/core';

export default styled.div`
  ${({ theme }) => css`
    table {
      width: 100%;
      min-width: auto;
      max-width: none;
      margin: 0;
    }

    th,
    td {
      min-width: 4.3em;
    }

    thead > tr > th {
      padding-right: 0;
      position: relative;
      background: ${theme.colors.grayscale.light5};
      text-align: left;
    }
    th svg {
      color: ${theme.colors.grayscale.light2};
      margin: ${theme.gridUnit / 2}px;
    }
    th.is-sorted svg {
      color: ${theme.colors.grayscale.base};
    }
    .table > tbody > tr:first-of-type > td,
    .table > tbody > tr:first-of-type > th {
      border-top: 0;
    }

    .table > tbody tr td {
      font-feature-settings: 'tnum' 1;
    }

    .dt-controls {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      .dt-title-row {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .dt-title {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 0;
      }

      .dt-control-row {
        display: flex;
        flex-direction: column-reverse;
        flex: 1;
        align-items: flex-end;

        .dt-control-search {
          margin-bottom: 8px;
        }
      }
    }

    .dt-controls {
      padding-bottom: 0.65em;
    }
    .dt-metric {
      text-align: right;
    }
    .dt-totals {
      font-weight: ${theme.typography.weights.bold};
    }
    .dt-is-null {
      color: ${theme.colors.grayscale.light1};
    }
    td.dt-is-filter {
      cursor: pointer;
    }
    td.dt-is-filter:hover {
      background-color: ${theme.colors.secondary.light4};
    }
    td.dt-is-active-filter,
    td.dt-is-active-filter:hover {
      background-color: ${theme.colors.secondary.light3};
    }

    .dt-global-filter {
      float: right;
    }

    .dt-global-filter-round {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 10px;
      border: 1px solid ${theme.colors.primary.light4};
      margin: 4px;
      min-width: 360px;
      height: auto;

      &:focus-within {
        border: 1px solid ${theme.colors.primary.base};
        outline: 0;
        box-shadow:
          inset 0 1px 1px rgba(0, 0, 0, 0.075),
          0 0 8px rgba(56, 118, 246, 0.6);
      }

      .dt-global-filter-input-round {
        border: none;
        outline: none;
        flex: 1;

        &:focus {
          border: none;
          outline: none;
        }
      }
    }

    .table-custom {
      border-collapse: separate;
      border-spacing: 0 8px;

      tbody::after {
        content: '';
        display: block;
        height: 8px;
      }

      thead > tr,
      tbody > tr {
        th {
          font-weight: 700;
        }

        th,
        td {
          color: #5a607f;
          font-size: 14px;
          background: #f5f6fa;
          border-top: 1px solid #e6e9f4;
          border-bottom: 1px solid #e6e9f4;
          padding: 16px 20px;
        }

        th:first-of-type,
        td:first-of-type {
          border-top-left-radius: 20px;
          border-bottom-left-radius: 20px;
          border-left: 1px solid #e6e9f4;
        }

        th:last-of-type,
        td:last-of-type {
          border-right: 1px solid #e6e9f4;
          border-top-right-radius: 20px;
          border-bottom-right-radius: 20px;
        }
      }
    }

    .dt-truncate-cell {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .dt-truncate-cell:hover {
      overflow: visible;
      white-space: normal;
      height: auto;
    }

    .dt-pagination {
      text-align: right;
      /* use padding instead of margin so clientHeight can capture it */
      padding-top: 0.5em;
    }
    .dt-pagination .pagination {
      margin: 0;
    }

    .pagination > li > span.dt-pagination-ellipsis:focus,
    .pagination > li > span.dt-pagination-ellipsis:hover {
      background: ${theme.colors.grayscale.light5};
    }

    .dt-no-results {
      text-align: center;
      padding: 1em 0.6em;
    }

    .select-page-size-wrapper {
      font-size: 10px;
      font-weight: 500;
      line-height: 24px;
      width: 100px;
    }

    .select-page-size {
      border-radius: 10px;
      height: 24px;
      width: 100%;
      max-width: 64px;
      font-size: 10px;
      font-weight: 500;
      line-height: 24px;
      letter-spacing: -0.04em;
      padding: 0px 6px 0px 12px;
      border: none;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      background: url('data:image/svg+xml;utf8,<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.19526 6.19526C3.95494 6.43558 3.93645 6.81374 4.1398 7.07527L4.19526 7.13807L7.5286 10.4714C7.76892 10.7117 8.14707 10.7302 8.4086 10.5269L8.4714 10.4714L11.8047 7.13807C12.0651 6.87772 12.0651 6.45561 11.8047 6.19526C11.5644 5.95494 11.1863 5.93645 10.9247 6.1398L10.8619 6.19526L8 9.05667L5.13807 6.19526C4.89775 5.95494 4.51959 5.93645 4.25807 6.1398L4.19526 6.19526Z" fill="%237E84A3"/></svg>')
        no-repeat right 10px center;
      background-color: #e6e9f4;
      margin-left: 4px;
    }
  `}
`;
