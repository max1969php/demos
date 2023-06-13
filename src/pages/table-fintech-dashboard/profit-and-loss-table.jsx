// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import Header from '@cloudscape-design/components/header';
import Container from '@cloudscape-design/components/container';
import { RelatedTable, useTreeCollection } from '@iot-app-kit/related-table';
import { distributionTableAriaLabels, paginationAriaLabels } from '../../i18n-strings';
import { Preferences } from '../commons/table-config';

import '../../styles/base.scss';

export function ProfitAndLossTable({
  data,
  contentDisplayOptions,
  pageSizeOptions,
  columnDefinitions,
  saveWidths,
  preferences,
  setPreferences,
}) {
  const { expandNode, items, collectionProps, filterProps, paginationProps } = useTreeCollection(
    data,
    {
      columnDefinitions,
      sorting: {
        defaultState: {
          sortingColumn: {
            sortingField: 'name',
          },
          isDescending: false,
        },
      },
      pagination: { pageSize: 20 },
      keyPropertyName: 'id',
      parentKeyPropertyName: 'parentId',
      selection: {
        keepSelection: true,
        trackBy: 'id',
      },
      filtering: {
        empty: 'No items found',
        noMatch: 'No items found',
      },
    },
    true
  );

  return (
    <Container disableContentPaddings>
      <RelatedTable
        {...filterProps}
        {...collectionProps}
        expandChildren={expandNode}
        items={items}
        columnDefinitions={columnDefinitions}
        columnDisplay={preferences.contentDisplay}
        ariaLabels={distributionTableAriaLabels}
        variant="borderless"
        stickyColumns={preferences.stickyColumns}
        stickyHeader={true}
        resizableColumns={true}
        wrapLines={preferences.wrapLines}
        stripedRows={preferences.stripedRows}
        contentDensity={preferences.contentDensity}
        onColumnWidthsChange={saveWidths}
        header={<Header variant="h2">Profit and loss | By customer | All dates</Header>}
        loadingText="Loading distributions"
        filter={<TextFilter filteringPlaceholder="Search" {...filterProps} />}
        pagination={<Pagination {...paginationProps} ariaLabels={paginationAriaLabels} />}
        preferences={
          <Preferences
            preferences={preferences}
            setPreferences={setPreferences}
            contentDisplayOptions={contentDisplayOptions}
            pageSizeOptions={pageSizeOptions}
          />
        }
      />
    </Container>
  );
}