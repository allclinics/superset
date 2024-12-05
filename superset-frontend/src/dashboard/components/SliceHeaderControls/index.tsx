/* eslint-disable prettier/prettier */
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
import React, {
  MouseEvent,
  Key,
  ReactChild,
  useState,
  useCallback,
} from 'react';
import {
  Link,
  RouteComponentProps,
  useHistory,
  withRouter,
} from 'react-router-dom';
import moment from 'moment';
import { Popover } from 'antd';
import {
  Behavior,
  css,
  isFeatureEnabled,
  FeatureFlag,
  getChartMetadataRegistry,
  QueryFormData,
  styled,
  t,
  useTheme,
  SafeMarkdown,
} from '@superset-ui/core';
import { Global } from '@emotion/react';
import { useSelector } from 'react-redux';
import { Menu } from 'src/components/Menu';
import { NoAnimationDropdown } from 'src/components/Dropdown';
import ShareMenuItems from 'src/dashboard/components/menu/ShareMenuItems';
import downloadAsImage from 'src/utils/downloadAsImage';
import { getSliceHeaderTooltip } from 'src/dashboard/util/getSliceHeaderTooltip';
import { Tooltip } from 'src/components/Tooltip';
import Icons from 'src/components/Icons';
import ModalTrigger from 'src/components/ModalTrigger';
import Button from 'src/components/Button';
import ViewQueryModal from 'src/explore/components/controls/ViewQueryModal';
import { ResultsPaneOnDashboard } from 'src/explore/components/DataTablesPane';
import Modal from 'src/components/Modal';
import useDetectDevice from 'src/hooks/useDetectDevice';
import { DrillDetailMenuItems } from 'src/components/Chart/DrillDetail';
import { LOG_ACTIONS_CHART_DOWNLOAD_AS_IMAGE } from 'src/logger/LogUtils';
import { RootState } from 'src/dashboard/types';
import { findPermission } from 'src/utils/findPermission';
import { useCrossFiltersScopingModal } from '../nativeFilters/FilterBar/CrossFilters/ScopingModal/useCrossFiltersScopingModal';

const MENU_KEYS = {
  DOWNLOAD_AS_IMAGE: 'download_as_image',
  EXPLORE_CHART: 'explore_chart',
  EXPORT_CSV: 'export_csv',
  EXPORT_FULL_CSV: 'export_full_csv',
  EXPORT_XLSX: 'export_xlsx',
  EXPORT_FULL_XLSX: 'export_full_xlsx',
  FORCE_REFRESH: 'force_refresh',
  FULLSCREEN: 'fullscreen',
  TOGGLE_CHART_DESCRIPTION: 'toggle_chart_description',
  VIEW_QUERY: 'view_query',
  VIEW_RESULTS: 'view_results',
  DRILL_TO_DETAIL: 'drill_to_detail',
  CROSS_FILTER_SCOPING: 'cross_filter_scoping',
};

const Wrapper = styled.div`
  display: flex;
  column-gap: 4px;
  align-items: center;
`;

export const ModalBackground = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  height: 100vh;
  width: 100vw;
  z-index: 1000;
  backdrop-filter: blur(2px);
  background-color: rgba(0, 0, 0, 0.3);
`;

export const VideoModal = styled.div`
  position: fixed;
  display: flex;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: calc(100vh - 50px);
  max-height: 648px;
  border-radius: 40px;
  width: 100%;
  max-width: 1040px;
  background: white;
  flex-direction: column;
  box-shadow: 0px 2px 10px 0px #262c4729;
  justify-content: center;
  align-items: center;
  padding: 40px;

  @media (max-width: 768px) {
    width: calc(100vw - 28px);
    height: 340px;
    padding: 20px;
  }

  .close-icon {
    position: absolute;
    top: 25px;
    right: 25px;

    @media (max-width: 768px) {
      top: 15px;
      right: 15px;
    }
  }
`;

export const VideoWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const InfoWrapper = styled.div`
  display: flex;
`;

const Iframe = styled.iframe`
  border-radius: 40px;
  border: 9px solid #d9e4ff;

  @media (max-width: 768px) {
    border: 4px solid #d9e4ff;
  }
`;

const HorizontalDotsContainer = styled.div`
  display: flex;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  border: 2px solid #a8adc6;
  padding: 0px;
  align-items: center;
  justify-content: center;
  column-gap: 2px;

  .dot {
    display: block;

    height: 2px;
    width: 2px;
    margin: ${({ theme }) => theme.gridUnit / 2}px 0;

    background-color: #a8adc6;
  }

  &:hover {
    cursor: pointer;
  }
`;

const RefreshTooltip = styled.div`
  height: auto;
  margin: ${({ theme }) => theme.gridUnit}px 0;
  color: ${({ theme }) => theme.colors.grayscale.base};
  line-height: 21px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const CrossFilterIcon = styled(Icons.ApartmentOutlined)`
  cursor: default;
  color: #a8adc6;
  line-height: 1.8;
`;

const MarkdownWrapper = styled.div`
  h3 {
    font-weight: 700;
  }

  ol,
  ul {
    padding-inline-start: 20px;
    margin: 0px;
  }

  p,
  span,
  li {
    color: #5a607f;
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    margin: 0px;
  }

  b,
  strong {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    color: #5a607f;
  }
`;

const getScreenshotNodeSelector = (chartId: string | number) =>
  `.dashboard-chart-id-${chartId}`;

const HorizontalDotsTrigger = () => (
  <HorizontalDotsContainer>
    <span className="dot" />
    <span className="dot" />
    <span className="dot" />
  </HorizontalDotsContainer>
);

export interface SliceHeaderControlsProps {
  slice: {
    description: string;
    viz_type: string;
    slice_name: string;
    slice_id: number;
    slice_description: string;
    datasource: string;
  };
  hideChartControls: boolean;
  componentId: string;
  dashboardId: number;
  chartStatus: string;
  isCached: boolean[];
  cachedDttm: string[] | null;
  isExpanded?: boolean;
  updatedDttm: number | null;
  isFullSize?: boolean;
  isDescriptionExpanded?: boolean;
  formData: QueryFormData;
  exploreUrl: string;
  crossFilterValue?: string;

  forceRefresh: (sliceId: number, dashboardId: number) => void;
  logExploreChart?: (sliceId: number) => void;
  logEvent?: (eventName: string, eventData?: object) => void;
  toggleExpandSlice?: (sliceId: number) => void;
  exportCSV?: (sliceId: number) => void;
  exportFullCSV?: (sliceId: number) => void;
  exportXLSX?: (sliceId: number) => void;
  exportFullXLSX?: (sliceId: number) => void;
  handleToggleFullSize: () => void;

  addDangerToast: (message: string) => void;
  addSuccessToast: (message: string) => void;

  supersetCanExplore?: boolean;
  supersetCanShare?: boolean;
  supersetCanCSV?: boolean;

  crossFiltersEnabled?: boolean;
}
type SliceHeaderControlsPropsWithRouter = SliceHeaderControlsProps &
  RouteComponentProps;

const dropdownIconsStyles = css`
  &&.anticon > .anticon:first-child {
    margin-right: 0;
    vertical-align: 0;
  }
`;

const ViewResultsModalTrigger = ({
  canExplore,
  exploreUrl,
  triggerNode,
  modalTitle,
  modalBody,
}: {
  canExplore?: boolean;
  exploreUrl: string;
  triggerNode: ReactChild;
  modalTitle: ReactChild;
  modalBody: ReactChild;
}) => {
  const [showModal, setShowModal] = useState(false);
  const openModal = useCallback(() => setShowModal(true), []);
  const closeModal = useCallback(() => setShowModal(false), []);
  const history = useHistory();
  const exploreChart = () => history.push(exploreUrl);
  const theme = useTheme();

  return (
    <>
      <span
        data-test="span-modal-trigger"
        onClick={openModal}
        role="button"
        tabIndex={0}
      >
        {triggerNode}
      </span>
      {(() => (
        <Modal
          css={css`
            .ant-modal-body {
              display: flex;
              flex-direction: column;
            }
          `}
          show={showModal}
          onHide={closeModal}
          title={modalTitle}
          footer={
            <>
              <Button
                buttonStyle="secondary"
                buttonSize="small"
                onClick={exploreChart}
                disabled={!canExplore}
                tooltip={
                  !canExplore
                    ? t(
                        'You do not have sufficient permissions to edit the chart',
                      )
                    : undefined
                }
              >
                {t('Edit chart')}
              </Button>
              <Button
                buttonStyle="primary"
                buttonSize="small"
                onClick={closeModal}
                css={css`
                  margin-left: ${theme.gridUnit * 2}px;
                `}
              >
                {t('Close')}
              </Button>
            </>
          }
          responsive
          resizable
          resizableConfig={{
            minHeight: theme.gridUnit * 128,
            minWidth: theme.gridUnit * 128,
            defaultSize: {
              width: 'auto',
              height: '75vh',
            },
          }}
          draggable
          destroyOnClose
        >
          {modalBody}
        </Modal>
      ))()}
    </>
  );
};

const SliceHeaderControls = (props: SliceHeaderControlsPropsWithRouter) => {
  const [openScopingModal, scopingModal] = useCrossFiltersScopingModal(
    props.slice.slice_id,
  );

  const canEditCrossFilters =
    useSelector<RootState, boolean>(
      ({ dashboardInfo }) => dashboardInfo.dash_edit_perm,
    ) &&
    isFeatureEnabled(FeatureFlag.DashboardCrossFilters) &&
    getChartMetadataRegistry()
      .get(props.slice.viz_type)
      ?.behaviors?.includes(Behavior.InteractiveChart);
  const canExplore = props.supersetCanExplore;
  const canDatasourceSamples = useSelector((state: RootState) =>
    findPermission('can_samples', 'Datasource', state.user?.roles),
  );
  const canDrillToDetail = canExplore && canDatasourceSamples;
  const canViewQuery = useSelector((state: RootState) =>
    findPermission('can_view_query', 'Dashboard', state.user?.roles),
  );
  const canViewTable = useSelector((state: RootState) =>
    findPermission('can_view_chart_as_table', 'Dashboard', state.user?.roles),
  );
  const refreshChart = () => {
    if (props.updatedDttm) {
      props.forceRefresh(props.slice.slice_id, props.dashboardId);
    }
  };

  const handleMenuClick = ({
    key,
    domEvent,
  }: {
    key: Key;
    domEvent: MouseEvent<HTMLElement>;
  }) => {
    switch (key) {
      case MENU_KEYS.FORCE_REFRESH:
        refreshChart();
        props.addSuccessToast(t('Data refreshed'));
        break;
      case MENU_KEYS.TOGGLE_CHART_DESCRIPTION:
        // eslint-disable-next-line no-unused-expressions
        props.toggleExpandSlice?.(props.slice.slice_id);
        break;
      case MENU_KEYS.EXPLORE_CHART:
        // eslint-disable-next-line no-unused-expressions
        props.logExploreChart?.(props.slice.slice_id);
        break;
      case MENU_KEYS.EXPORT_CSV:
        // eslint-disable-next-line no-unused-expressions
        props.exportCSV?.(props.slice.slice_id);
        break;
      case MENU_KEYS.FULLSCREEN:
        props.handleToggleFullSize();
        break;
      case MENU_KEYS.EXPORT_FULL_CSV:
        // eslint-disable-next-line no-unused-expressions
        props.exportFullCSV?.(props.slice.slice_id);
        break;
      case MENU_KEYS.EXPORT_FULL_XLSX:
        // eslint-disable-next-line no-unused-expressions
        props.exportFullXLSX?.(props.slice.slice_id);
        break;
      case MENU_KEYS.EXPORT_XLSX:
        // eslint-disable-next-line no-unused-expressions
        props.exportXLSX?.(props.slice.slice_id);
        break;
      case MENU_KEYS.DOWNLOAD_AS_IMAGE: {
        // menu closes with a delay, we need to hide it manually,
        // so that we don't capture it on the screenshot
        const menu = document.querySelector(
          '.ant-dropdown:not(.ant-dropdown-hidden)',
        ) as HTMLElement;
        menu.style.visibility = 'hidden';
        downloadAsImage(
          getScreenshotNodeSelector(props.slice.slice_id),
          props.slice.slice_name,
          true,
          // @ts-ignore
        )(domEvent).then(() => {
          menu.style.visibility = 'visible';
        });
        props.logEvent?.(LOG_ACTIONS_CHART_DOWNLOAD_AS_IMAGE, {
          chartId: props.slice.slice_id,
        });
        break;
      }
      case MENU_KEYS.CROSS_FILTER_SCOPING: {
        openScopingModal();
        break;
      }
      default:
        break;
    }
  };

  const {
    componentId,
    dashboardId,
    slice,
    isFullSize,
    cachedDttm = [],
    updatedDttm = null,
    addSuccessToast = () => {},
    addDangerToast = () => {},
    supersetCanShare = false,
    isCached = [],
  } = props;
  const [videoModal, setVideoModal] = useState({ open: false, link: '' });
  const { isMobile } = useDetectDevice();
  const isTable = slice.viz_type === 'table';
  const cachedWhen = (cachedDttm || []).map(itemCachedDttm =>
    moment.utc(itemCachedDttm).fromNow(),
  );
  const updatedWhen = updatedDttm ? moment.utc(updatedDttm).fromNow() : '';
  const getCachedTitle = (itemCached: boolean) => {
    if (itemCached) {
      return t('Cached %s', cachedWhen);
    }
    if (updatedWhen) {
      return t('Fetched %s', updatedWhen);
    }
    return '';
  };

  const handleOpenVideoModal = useCallback(() => {
    setVideoModal({ open: true, link: props?.formData?.legendVideoLink });
  }, [props?.formData?.legendVideoLink]);

  const hanldeCloseVideoModal = useCallback(() => {
    setVideoModal({ open: false, link: '' });
  }, []);

  const refreshTooltipData = [...new Set(isCached.map(getCachedTitle) || '')];
  // If all queries have same cache time we can unit them to one
  const refreshTooltip = refreshTooltipData.map((item, index) => (
    <div key={`tooltip-${index}`}>
      {refreshTooltipData.length > 1
        ? t('Query %s: %s', index + 1, item)
        : item}
    </div>
  ));
  const fullscreenLabel = isFullSize
    ? t('Exit fullscreen')
    : t('Enter fullscreen');

  // @z-index-below-dashboard-header (100) - 1 = 99 for !isFullSize and 101 for isFullSize
  const dropdownOverlayStyle = {
    zIndex: isFullSize ? 101 : 99,
    animationDuration: '0s',
  };

  const menu = (
    <Menu
      onClick={handleMenuClick}
      selectable={false}
      data-test={`slice_${slice.slice_id}-menu`}
    >
      <Menu.Item
        key={MENU_KEYS.FORCE_REFRESH}
        disabled={props.chartStatus === 'loading'}
        style={{ height: 'auto', lineHeight: 'initial' }}
        data-test="refresh-chart-menu-item"
      >
        {t('Force refresh')}
        <RefreshTooltip data-test="dashboard-slice-refresh-tooltip">
          {refreshTooltip}
        </RefreshTooltip>
      </Menu.Item>

      <Menu.Item key={MENU_KEYS.FULLSCREEN}>{fullscreenLabel}</Menu.Item>

      <Menu.Divider />

      {slice.description && (
        <Menu.Item key={MENU_KEYS.TOGGLE_CHART_DESCRIPTION}>
          {props.isDescriptionExpanded
            ? t('Hide chart description')
            : t('Show chart description')}
        </Menu.Item>
      )}

      {canExplore && (
        <Menu.Item key={MENU_KEYS.EXPLORE_CHART}>
          <Link to={props.exploreUrl}>
            <Tooltip title={getSliceHeaderTooltip(props.slice.slice_name)}>
              {t('Edit chart')}
            </Tooltip>
          </Link>
        </Menu.Item>
      )}

      {canEditCrossFilters && (
        <>
          <Menu.Item key={MENU_KEYS.CROSS_FILTER_SCOPING}>
            {t('Cross-filtering scoping')}
          </Menu.Item>
          <Menu.Divider />
        </>
      )}

      {(canExplore || canViewQuery) && (
        <Menu.Item key={MENU_KEYS.VIEW_QUERY}>
          <ModalTrigger
            triggerNode={
              <span data-test="view-query-menu-item">{t('View query')}</span>
            }
            modalTitle={t('View query')}
            modalBody={<ViewQueryModal latestQueryFormData={props.formData} />}
            draggable
            resizable
            responsive
          />
        </Menu.Item>
      )}

      {(canExplore || canViewTable) && (
        <Menu.Item key={MENU_KEYS.VIEW_RESULTS}>
          <ViewResultsModalTrigger
            canExplore={props.supersetCanExplore}
            exploreUrl={props.exploreUrl}
            triggerNode={
              <span data-test="view-query-menu-item">{t('View as table')}</span>
            }
            modalTitle={t('Chart Data: %s', slice.slice_name)}
            modalBody={
              <ResultsPaneOnDashboard
                queryFormData={props.formData}
                queryForce={false}
                dataSize={20}
                isRequest
                isVisible
              />
            }
          />
        </Menu.Item>
      )}

      {isFeatureEnabled(FeatureFlag.DrillToDetail) && canDrillToDetail && (
        <DrillDetailMenuItems
          chartId={slice.slice_id}
          formData={props.formData}
        />
      )}

      {(slice.description || canExplore) && <Menu.Divider />}

      {supersetCanShare && (
        <Menu.SubMenu title={t('Share')}>
          <ShareMenuItems
            dashboardId={dashboardId}
            dashboardComponentId={componentId}
            copyMenuItemTitle={t('Copy permalink to clipboard')}
            emailMenuItemTitle={t('Share chart by email')}
            emailSubject={t('Superset chart')}
            emailBody={t('Check out this chart: ')}
            addSuccessToast={addSuccessToast}
            addDangerToast={addDangerToast}
          />
        </Menu.SubMenu>
      )}

      {props.supersetCanCSV && (
        <Menu.SubMenu title={t('Download')}>
          <Menu.Item
            key={MENU_KEYS.EXPORT_CSV}
            icon={<Icons.FileOutlined css={dropdownIconsStyles} />}
          >
            {t('Export to .CSV')}
          </Menu.Item>
          <Menu.Item
            key={MENU_KEYS.EXPORT_XLSX}
            icon={<Icons.FileOutlined css={dropdownIconsStyles} />}
          >
            {t('Export to Excel')}
          </Menu.Item>

          {isFeatureEnabled(FeatureFlag.AllowFullCsvExport) &&
            props.supersetCanCSV &&
            isTable && (
              <>
                <Menu.Item
                  key={MENU_KEYS.EXPORT_FULL_CSV}
                  icon={<Icons.FileOutlined css={dropdownIconsStyles} />}
                >
                  {t('Export to full .CSV')}
                </Menu.Item>
                <Menu.Item
                  key={MENU_KEYS.EXPORT_FULL_XLSX}
                  icon={<Icons.FileOutlined css={dropdownIconsStyles} />}
                >
                  {t('Export to full Excel')}
                </Menu.Item>
              </>
            )}

          <Menu.Item
            key={MENU_KEYS.DOWNLOAD_AS_IMAGE}
            icon={<Icons.FileImageOutlined css={dropdownIconsStyles} />}
          >
            {t('Download as image')}
          </Menu.Item>
        </Menu.SubMenu>
      )}
    </Menu>
  );

  return (
    <Wrapper>
      {isFullSize && !props?.hideChartControls && (
        <Icons.FullscreenExitOutlined
          style={{ fontSize: 22 }}
          onClick={() => {
            props.handleToggleFullSize();
          }}
        />
      )}
      {props?.crossFilterValue && (
        <Tooltip
          placement="top"
          title={t(
            'This chart applies cross-filters to charts whose datasets contain columns with the same name.',
          )}
          color="#ffffff"
          overlayInnerStyles={{
            color: '#535353',
            fontSize: '12px',
            lineHeight: '18px',
            padding: '16px',
            boxShadow: '2px 0px 10px 0px #262C4729',
            borderRadius: '16px',
            maxWidth: '236px',
          }}
        >
          <CrossFilterIcon iconSize="l" />
        </Tooltip>
      )}
      {props?.formData?.showPopUpLegend && props?.formData?.legendContent && (
        <InfoWrapper>
          <Popover
            placement={isMobile ? 'bottomLeft' : 'bottom'}
            trigger={isMobile ? 'click' : 'hover'}
            overlayClassName="chart-guidance-popover"
            content={
              <MarkdownWrapper>
                <Global
                  styles={css`
                    .chart-guidance-popover {
                      border-radius: 10px;
                      min-width: 250px;

                      @media (max-width: 768px) {
                        width: 300px;
                        left: 50% !important;
                        transform: translate(-50%, 0%) !important;
                      }

                      h3 {
                        line-height: 24px;
                        font-family: 'Inter', sans-serif;
                        font-size: 16px;
                        font-weight: 700;
                        color: #31323f;
                        margin: 0px 0px 4px 0px;
                      }

                      .ant-popover-arrow {
                        display: none;
                      }

                      .ant-popover-inner {
                        border-radius: 10px;
                      }

                      .ant-popover-inner-content {
                        width: 100%;
                        max-width: 422px;
                        border-radius: 10px;
                        padding: 16px 24px;
                        background: #ffffff;
                        box-shadow: 0px 2px 22px 0px #151b261f !important;
                      }
                    }
                  `}
                />
                <SafeMarkdown
                  source={props?.formData?.legendContent ?? ''}
                  htmlSanitization
                />
              </MarkdownWrapper>
            }
          >
            <Icons.Information />
          </Popover>
        </InfoWrapper>
      )}
      {props?.formData?.showPopUpVideoLegend &&
        props?.formData?.legendVideoLink && (
          <>
            <Icons.VideoPlay onClick={handleOpenVideoModal} />
            {videoModal.open && (
              <ModalBackground>
                <VideoModal className="video-modal">
                  <Icons.Close
                    iconSize="l"
                    onClick={hanldeCloseVideoModal}
                    className="close-icon"
                  />
                  <VideoWrapper>
                    <Iframe
                      width="100%"
                      height="100%"
                      src={props?.formData?.legendVideoLink}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      className="video-iframe"
                    />
                  </VideoWrapper>
                </VideoModal>
              </ModalBackground>
            )}
          </>
        )}
      {!props?.hideChartControls && (
        <>
          <NoAnimationDropdown
            overlay={menu}
            overlayStyle={dropdownOverlayStyle}
            trigger={['click']}
            placement="bottomRight"
          >
            <span
              css={css`
                display: flex;
                align-items: center;
              `}
              id={`slice_${slice.slice_id}-controls`}
              role="button"
              aria-label="More Options"
            >
              <HorizontalDotsTrigger />
            </span>
          </NoAnimationDropdown>
          {canEditCrossFilters && scopingModal}
        </>
      )}
    </Wrapper>
  );
};

export default withRouter(SliceHeaderControls);
