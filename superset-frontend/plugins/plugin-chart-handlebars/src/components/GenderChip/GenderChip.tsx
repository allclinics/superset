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
// eslint-disable-next-line import/no-extraneous-dependencies
import React, { useCallback, type FC } from 'react';
import MaleIcon from '../../icons/male.svg';
import UserIcon from '../../icons/user.svg';
import FemaleIcon from '../../icons/female.svg';
import { GenderChipProps } from './GenderChip.interface';
import { Text, Wrapper } from './GenderChip.styled';

const GenderChip: FC<GenderChipProps> = ({ gender }) => {
  const renderGender = useCallback(() => {
    switch (gender) {
      case 'M':
        return (
          <>
            <MaleIcon />
            <Text>Male</Text>
          </>
        );
      case 'F':
        return (
          <>
            <FemaleIcon />
            <Text>Female</Text>
          </>
        );
      default:
        return (
          <>
            <UserIcon />
            <Text>Unknown</Text>
          </>
        );
    }
  }, [gender]);

  return <Wrapper>{renderGender()}</Wrapper>;
};

export default GenderChip;
