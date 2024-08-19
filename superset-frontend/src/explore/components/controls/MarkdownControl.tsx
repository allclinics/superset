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
import React, { useState, useCallback } from 'react';
import { styled } from '@superset-ui/core';
import { MarkdownEditor } from 'src/components/AsyncAceEditor';
import ControlHeader, {
  ControlHeaderProps,
} from 'src/explore/components/ControlHeader';

type MarkdownControlProps = ControlHeaderProps & {
  onChange: (value: string) => void;
  value: string;
  default?: number;
};

const MarkdownWrapper = styled.div`
  height: 250px;
`;

const MARKDOWN_PLACE_HOLDER = `# ✨Header 1
## ✨Header 2
### ✨Header 3

<br />

Click here to learn more about [markdown formatting](https://bit.ly/1dQOfRK)`;

const MarkdownControl = ({
  name,
  label,
  description,
  renderTrigger,
  rightNode,
  leftNode,
  validationErrors,
  hovered,
  warning,
  danger,
  onClick,
  tooltipOnClick,
  onChange = () => {},
  value = MARKDOWN_PLACE_HOLDER,
}: MarkdownControlProps) => {
  const headerProps = {
    name,
    label,
    description,
    renderTrigger,
    rightNode,
    leftNode,
    validationErrors,
    onClick,
    hovered,
    tooltipOnClick,
    warning,
    danger,
  };

  const [source, setSource] = useState(value);

  const handleOnChange = useCallback(
    value => {
      setSource(value);

      onChange(value);
    },
    [onChange],
  );

  return (
    <>
      <ControlHeader {...headerProps} />
      <MarkdownWrapper>
        <MarkdownEditor
          onChange={handleOnChange}
          width="100%"
          height="100%"
          showGutter={false}
          editorProps={{ $blockScrolling: true }}
          value={source}
          readOnly={false}
        />
      </MarkdownWrapper>
    </>
  );
};

export default MarkdownControl;
