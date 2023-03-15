// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

import DataProvider from '../commons/data-provider';
import { useColumnWidths } from '../commons/use-column-widths';
import { useLocalStorage } from '../commons/use-local-storage';
import { ToolsContent } from '../table/common-components';
import { CustomAppLayout, Navigation, Notifications } from '../commons/common-components';
import {
  BreadcrumbGroup,
  Container,
  Header,
  SpaceBetween,
  FormField,
  Box,
  Grid,
  AppLayout,
  ContentLayout,
  RadioGroup,
  Select,
  Button,
} from '@cloudscape-design/components';
import {
  COLUMN_DEFINITIONS,
  relatedColumnDefinitions,
  genData,
  FILTERING_PROPERTIES,
} from './table-property-filter-config';
import { PropertyFilterTable } from './property-filter-table';
import '../../styles/base.scss';
import DateRangePicker from './date-range-picker';

const DEFAULT_PREFERENCES = {
  pageSize: 30,
  visibleContent: ['id', 'domainName', 'deliveryMethod', 'sslCertificate', 'status', 'state'],
  wrapLines: false,
  stripedRows: false,
  contentDensity: 'compact',
};

const Breadcrumbs = () => {
  return (
    <BreadcrumbGroup
      items={[
        { text: 'Sample company', href: '#' },
        { text: 'Report list', href: '#' },
        { text: "Craig's Design and Landscaping Services", href: '#' },
      ]}
      ariaLabel="Breadcrumbs"
    />
  );
};

function App() {
  const [distributions, setDistributions] = useState(genData());
  const [columnDefinitions, saveWidths] = useColumnWidths('React-TableServerSide-Widths', COLUMN_DEFINITIONS);
  const [preferences, setPreferences] = useLocalStorage('React-DistributionsTable-Preferences', DEFAULT_PREFERENCES);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [radioValue, setRadioValue] = React.useState('second');
  const [displayedColumns, setDisplayedColumns] = React.useState({ label: 'Customers', value: '1' });
  const [activeCells, setActiveCells] = React.useState({ label: 'Active rows / active columns', value: '1' });
  const [comparisonPeriod, setComparisonPeriod] = React.useState({ label: 'None', value: '1' });

  const appLayout = useRef();

  return (
    <AppLayout
      navigation={<Navigation activeHref="#/distributions" />}
      breadcrumbs={<Breadcrumbs />}
      content={
        <ContentLayout header={<Header variant="h1">Craig's Design and Landscaping Services</Header>}>
          <SpaceBetween direction="vertical" size="l">
            <Container
              header={
                <Header
                  actions={
                    <SpaceBetween direction="horizontal" size="xs">
                      <Button>Customize</Button>
                      <Button variant="primary">Save customization</Button>
                    </SpaceBetween>
                  }
                >
                  Profit and Loss by Customer Report
                </Header>
              }
            >
              <Grid
                gridDefinition={[
                  { colspan: { default: 6, xs: 3 } },
                  { colspan: { default: 6, xs: 3 } },
                  { colspan: { default: 6, xs: 3 } },
                  { colspan: { default: 6, xs: 3 } },
                ]}
              >
                <FormField label="Report period">
                  <DateRangePicker />
                </FormField>
              </Grid>
              <Grid
                gridDefinition={[
                  { colspan: { default: 6, xs: 3 } },
                  { colspan: { default: 6, xs: 3 } },
                  { colspan: { default: 6, xs: 3 } },
                  { colspan: { default: 6, xs: 3 } },
                ]}
              >
                <FormField label="Display columns by">
                  <Select
                    selectedOption={displayedColumns}
                    onChange={({ detail }) => setDisplayedColumns(detail.selectedOption)}
                    options={[
                      { label: 'Customers', value: '1' },
                      { label: 'Services', value: '2' },
                    ]}
                    selectedAriaLabel="Selected"
                  />
                </FormField>
                <FormField label="Show non-zero or active only">
                  <Select
                    selectedOption={activeCells}
                    onChange={({ detail }) => setActiveCells(detail.selectedOption)}
                    options={[
                      { label: 'Active rows / active columns', value: '1' },
                      { label: 'Active rows only', value: '2' },
                      { label: 'Active columns only', value: '3' },
                      { label: 'Show all', value: '4' },
                    ]}
                    selectedAriaLabel="Selected"
                  />
                </FormField>
                <FormField label="Compare another period">
                  <Select
                    selectedOption={comparisonPeriod}
                    onChange={({ detail }) => setComparisonPeriod(detail.selectedOption)}
                    options={[
                      { label: 'None', value: '1' },
                      { label: 'Last month', value: '2' },
                      { label: 'Last quarter', value: '3' },
                      { label: 'Last year', value: '4' },
                    ]}
                    selectedAriaLabel="Selected"
                  />
                </FormField>
                <FormField label="Accounting method">
                  <RadioGroup
                    onChange={({ detail }) => setRadioValue(detail.value)}
                    value={radioValue}
                    items={[
                      { value: 'first', label: 'Cash' },
                      { value: 'second', label: 'Accrual' },
                    ]}
                  />
                </FormField>
              </Grid>
              <Box textAlign="right">
                <Button variant="primary">Run report</Button>
              </Box>
            </Container>
            <PropertyFilterTable
              data={distributions}
              loadHelpPanelContent={() => {
                setToolsOpen(true);
                appLayout.current?.focusToolsClose();
              }}
              columnDefinitions={columnDefinitions}
              saveWidths={saveWidths}
              preferences={preferences}
              setPreferences={setPreferences}
              filteringProperties={FILTERING_PROPERTIES}
            />
          </SpaceBetween>
        </ContentLayout>
      }
      contentType="table"
      maxContentWidth={Number.MAX_VALUE}
      navigationOpen={navigationOpen}
      onNavigationChange={({ detail }) => setNavigationOpen(detail.open)}
      tools={<ToolsContent />}
      toolsOpen={toolsOpen}
      onToolsChange={({ detail }) => setToolsOpen(detail.open)}
      stickyNotifications={true}
    />
  );
}

const root = createRoot(document.getElementById('app'));
root.render(<App />);