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
export const getPageNumbers = (
  pageCount: number,
  currentPage: number,
  maxPageItemCount: number,
) => {
  const pageNumbers = [];
  const halfMaxButtons = Math.floor(maxPageItemCount / 2);
  // Ensure startPage is at least 1
  let startPage = Math.max(currentPage - halfMaxButtons, 1);
  const endPage = Math.min(startPage + maxPageItemCount - 1, pageCount);

  // Adjust startPage if endPage doesn't cover enough pages
  if (endPage - startPage < maxPageItemCount - 1) {
    startPage = Math.max(endPage - maxPageItemCount + 1, 1);
  }

  for (let i = startPage; i <= endPage; i += 1) {
    pageNumbers.push(i);
  }

  return pageNumbers;
};
