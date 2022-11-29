import React, { useState } from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid';
import { Box, Flex, Paper, SimpleGrid, Text, Title } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { useRouter } from 'next/router';

import { GetClientPortofolioAdditionalDocumentsResponse } from '@/api/endpoint/midgard/backoffices';

type AdditionalDocumentsComponent = {
  fetchStatus: 'loading' | 'idle' | 'error' | 'success';
  data:
    | GetClientPortofolioAdditionalDocumentsResponse['data']['portfolio_summary_documents']
    | Record<string, never>;
};

const additionalDocumentHeader = [
  {
    accessor: 'created_at',
    title: 'Date',
    render: (doc: any) => (
      <Text key={doc.created_at}>
        {!!doc.created_at ? doc.created_at.slice(0, 10) : '-'}
      </Text>
    ),
  },
  { accessor: 'type', title: 'Type' },
  { accessor: 'notes', title: 'Notes' },
  { accessor: 'summary', title: 'Summary' },
];

const financialReportsHeader = [
  {
    accessor: 'action_date',
    title: 'Date',
    render: (doc: any) => (
      <Text key={doc.action_date}>
        {!!doc.action_date ? doc.action_date.slice(0, 10) : '-'}
      </Text>
    ),
  },
  {
    accessor: 'summary',
    title: 'Summary',
  },
];

const visitReportsHeader = [
  {
    accessor: 'action_date',
    title: 'Visit Date',
    render: (doc: any) => (
      <Text key={doc.action_date}>
        {!!doc.action_date ? doc.action_date.slice(0, 10) : '-'}
      </Text>
    ),
  },
  { accessor: 'report_type', title: 'Report Type' },
];

export function AdditionalDocuments({
  fetchStatus,
  data,
}: AdditionalDocumentsComponent) {
  const router = useRouter();

  return (
    <Paper withBorder p={16}>
      <SimpleGrid cols={1} verticalSpacing="sm">
        <Flex justify="flex-start" align="center">
          <Title order={3}>Additional Documents</Title>
        </Flex>

        <Box sx={{ height: 200 }}>
          <DataTable
            withBorder
            withColumnBorders
            highlightOnHover
            fetching={fetchStatus === 'loading'}
            columns={additionalDocumentHeader}
            records={data.portfolio_summary_document_additional ?? []}
            rowContextMenu={{
              items: ({ document_url }) => [
                {
                  key: 'download',
                  icon: <ArrowDownTrayIcon height={14} />,
                  title: 'Download Additional Docs',
                  onClick: () => router.push(document_url),
                },
              ],
            }}
            idAccessor="created_at"
          />
        </Box>
      </SimpleGrid>
    </Paper>
  );
}

export function FinancialReports({
  fetchStatus,
  data,
}: AdditionalDocumentsComponent) {
  const router = useRouter();
  const [modalOpened, setModalOpened] = useState(false);

  return (
    <Paper withBorder p={16}>
      <SimpleGrid cols={1} verticalSpacing="sm">
        <Flex justify="flex-start" align="center">
          <Title order={3}>Financial Reports</Title>
        </Flex>

        <Box sx={{ height: 200 }}>
          <DataTable
            withBorder
            withColumnBorders
            highlightOnHover
            fetching={fetchStatus === 'loading'}
            columns={financialReportsHeader}
            records={data.portfolio_summary_document_financial ?? []}
            rowContextMenu={{
              items: ({ document_url }) => [
                {
                  key: 'download',
                  icon: <ArrowDownTrayIcon height={14} />,
                  title: 'Download Financial Reports',
                  onClick: () => router.push(document_url),
                },
              ],
            }}
            idAccessor="created_at"
          />
        </Box>
      </SimpleGrid>
    </Paper>
  );
}

export function VisitReports({
  fetchStatus,
  data,
}: AdditionalDocumentsComponent) {
  const router = useRouter();

  return (
    <Paper withBorder p={16}>
      <SimpleGrid cols={1} verticalSpacing="sm">
        <Flex justify="flex-start" align="center">
          <Title order={3}>History Call / Visit Reports</Title>
        </Flex>

        <Box sx={{ height: 200 }}>
          <DataTable
            withBorder
            withColumnBorders
            highlightOnHover
            fetching={fetchStatus === 'loading'}
            columns={visitReportsHeader}
            records={data.portfolio_summary_document_visit ?? []}
            rowContextMenu={{
              items: ({ document_url }) => [
                {
                  key: 'download',
                  icon: <ArrowDownTrayIcon height={14} />,
                  title: 'Download Summary Report',
                  onClick: () => router.push(document_url),
                },
              ],
            }}
            idAccessor="created_at"
          />
        </Box>
      </SimpleGrid>
    </Paper>
  );
}
