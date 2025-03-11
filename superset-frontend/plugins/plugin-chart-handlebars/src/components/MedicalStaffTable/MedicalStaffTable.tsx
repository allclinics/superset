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
import React, { useCallback, useState, useMemo, type FC } from 'react';
// components
import PinIcon from '../../icons/pin.svg';
import CallIcon from '../../icons/call.svg';
import Map from '../Map';
// utils
import { getPageNumbers } from '../../utils/get-page-number';
// styles
import {
  Text,
  Bold,
  List,
  Item,
  Header,
  Input,
  Stack,
  Search,
  Container,
  PageButton,
  PageNumber,
  ItemHeader,
  ItemContent,
  InputWrapper,
  HeaderLeftPart,
  TableWrapper,
  PaginationWrapper,
} from './MedicalStaffTable.styled';
// types
import type { ClinicItem } from '../Map/Map.interface';
import type { MedicalStaffTableProps } from './MedicalStaffTable.interface';

const ITEMS_PER_PAGE = 3;

const MedicalStaffTable: FC<MedicalStaffTableProps> = ({
  data,
  mapboxApiKey,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = useMemo(
    () =>
      data.filter(item => {
        const hospitalName = item.hospital_name as string;
        return hospitalName?.toLowerCase().includes(searchQuery.toLowerCase());
      }),
    [data, searchQuery],
  );

  const totalPages = useMemo(
    () => Math.ceil(filteredData.length / ITEMS_PER_PAGE),
    [filteredData.length],
  );
  const startIndex = useMemo(
    () => (currentPage - 1) * ITEMS_PER_PAGE,
    [currentPage],
  );

  const currentData = useMemo(
    () => filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE),
    [filteredData, startIndex],
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage >= 1 && newPage <= totalPages) {
        setCurrentPage(newPage);
      }
    },
    [totalPages],
  );

  const pageItems = useMemo(
    () => getPageNumbers(totalPages, currentPage, 3),
    [currentPage, totalPages],
  );

  const mapList = useMemo(
    () => filteredData.filter(item => item?.latitude && item?.longitude),
    [filteredData],
  );

  return (
    <Container>
      <TableWrapper>
        <Header>
          <HeaderLeftPart>
            <Bold>Practice</Bold>
            <Text>{`Found results: ${data.length}`}</Text>
          </HeaderLeftPart>
          <InputWrapper>
            <Search />
            <Input
              placeholder="Search..."
              onChange={e => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </InputWrapper>
        </Header>
        <List>
          {currentData.map((item, index) => (
            <Item key={index}>
              <ItemHeader>
                <Bold>{item.hospital_name}</Bold>
              </ItemHeader>
              <ItemContent>
                <Stack>
                  <PinIcon />
                  {item?.address}
                </Stack>
                <Stack>
                  <CallIcon />
                  {item?.phone}
                </Stack>
              </ItemContent>
            </Item>
          ))}
        </List>
        {totalPages > 1 && (
          <PaginationWrapper>
            <PageButton
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              ←
            </PageButton>
            {pageItems.map(page => (
              <PageNumber
                key={page}
                active={page === currentPage}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </PageNumber>
            ))}
            <PageButton
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              →
            </PageButton>
          </PaginationWrapper>
        )}
      </TableWrapper>
      {mapList.length && (
        <div>
          <Map
            list={mapList as unknown as ClinicItem[]}
            width="334px"
            height="100%"
            defaultLatitude={
              typeof mapList[0]?.latitude === 'number' ? mapList[0].latitude : 0
            }
            defaultLongitude={
              typeof mapList[0]?.longitude === 'number'
                ? mapList[0].longitude
                : 0
            }
            mapboxApiKey={mapboxApiKey}
          />
        </div>
      )}
    </Container>
  );
};

export default MedicalStaffTable;
