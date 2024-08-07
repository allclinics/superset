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
import React, { CSSProperties, forwardRef } from 'react';
import Arrow from '../../images/arrow.png';

export interface PaginationProps {
  pageCount: number; // number of pages
  currentPage?: number; // index of current page, zero-based
  maxPageItemCount?: number;
  ellipsis?: string; // content for ellipsis item
  onPageChange: (page: number) => void; // `page` is zero-based
  style?: CSSProperties;
}

/**
 * Generate numeric page items around current page.
 *   - Always include first and last page
 *   - Add ellipsis if needed
 */

const getPageNumbers = (
  pageCount: number,
  currentPage: number,
  maxPageItemCount: number,
) => {
  const pageNumbers = [];
  const halfMaxButtons = Math.floor(maxPageItemCount / 2);
  let startPage = Math.max(currentPage - halfMaxButtons, 0);
  const endPage = Math.min(startPage + maxPageItemCount - 1, pageCount - 1);

  if (endPage - startPage < maxPageItemCount - 1) {
    startPage = Math.max(endPage - maxPageItemCount + 1, 0);
  }

  for (let i = startPage; i <= endPage; i += 1) {
    pageNumbers.push(i);
  }

  return pageNumbers;
};

const getPageItemStyles = (
  isLast: boolean,
  isActive: boolean,
): CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 36,
  height: 36,
  borderRadius: '50%',
  fontSize: 14,
  fontWeight: 400,
  lineHeight: '24px',
  backgroundColor: isActive ? '#E6E9F4' : 'transparent',
  color: '#5A607F',
  marginRight: isLast ? 0 : 6,
  border: 'none',
});

const getArrowItemStyles = (isLeft = false): CSSProperties => ({
  cursor: 'pointer',
  transform: isLeft ? 'rotate(180deg)' : 'rotate(0deg)',
  marginRight: isLeft ? 10 : 0,
  marginLeft: isLeft ? 0 : 10,
  border: 0,
  background: 'transparent',
  padding: 0,
});

export default React.memo(
  forwardRef(function Pagination(
    {
      style,
      pageCount,
      currentPage = 0,
      maxPageItemCount = 5,
      onPageChange,
    }: PaginationProps,
    ref: React.Ref<HTMLDivElement>,
  ) {
    const pageItems = getPageNumbers(pageCount, currentPage, maxPageItemCount);

    return (
      <div ref={ref} className="dt-pagination" style={style}>
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          style={getArrowItemStyles(true)}
          aria-label="Previous page"
          disabled={currentPage === 0}
        >
          <img src={Arrow} alt="arrow left" />
        </button>
        <ul className="pagination pagination-sm">
          {pageItems.map((item, index) => (
            <li key={index}>
              <a
                href={`#page-${item}`}
                role="button"
                style={getPageItemStyles(
                  index === pageItems.length - 1,
                  currentPage === item,
                )}
                onClick={e => {
                  e.preventDefault();
                  onPageChange(item);
                }}
              >
                {item + 1}
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          aria-label="Next page"
          onClick={() => onPageChange(currentPage + 1)}
          style={getArrowItemStyles()}
          disabled={currentPage === pageCount}
        >
          <img src={Arrow} alt="arrow right" />
        </button>
      </div>
    );
  }),
);
