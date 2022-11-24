import { SubmenuType } from '@/components/layouts/sideNavbar';
import {
  UnstyledButton,
  Group,
  Box,
  Collapse,
  createStyles,
  Text,
  Button,
  Flex,
  Grid,
  Select,
  SimpleGrid,
  Textarea,
  Title,
  Modal,
  Paper,
  ActionIcon,
  Menu,
} from '@mantine/core';
import Link from 'next/link';
import React, { useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { nanoid } from 'nanoid';
import {
  GetClientPortofolioAdditionalDocumentsResponse,
  GetClientRecommendationSummaryResponse,
} from '@/api/endpoint/midgard/backoffices';
import { DataTable } from 'mantine-datatable';
import {
  ArrowDownTrayIcon,
  EllipsisVerticalIcon,
  PlusIcon,
} from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';

type AdditionalDocumentsComponent = {
  fetchStatus: 'loading' | 'idle' | 'error' | 'success';
  data:
    | GetClientPortofolioAdditionalDocumentsResponse['data']['portfolio_summary_documents']
    | Record<string, never>;
};

// type FinancialReportsComponent = {
//   fetchStatus: 'loading' | 'idle' | 'error' | 'success';
//   data:
//     | GetClientPortofolioAdditionalDocumentsResponse['data']
//     | Record<string, never>;
// };

// type VisitReportsComponent = {
//   fetchStatus: 'loading' | 'idle' | 'error' | 'success';
//   data:
//     | GetClientPortofolioAdditionalDocumentsResponse['data']
//     | Record<string, never>;
// };

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
      {/* <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="Add Summary"
      >
        <form
          onSubmit={form.onSubmit((values) => {
            submitSummary(values);
            form.reset();
            setModalOpened(!modalOpened);
          })}
        >
          <SimpleGrid cols={1}>
            <Textarea
              placeholder="Add description from internet research"
              label="Status"
              withAsterisk
              {...form.getInputProps('summary')}
            />
            <Select
              label="RM Action"
              placeholder="Pick one action"
              withAsterisk
              data={[
                { value: 'No Action Required', label: 'No Action Required' },
                { value: 'Courtesy Call', label: 'Courtesy Call' },
                { value: 'Visit', label: 'Visit' },
              ]}
              {...form.getInputProps('action')}
            />
            <Flex justify="center" align="center">
              <Button type="submit">Submit</Button>
            </Flex>
          </SimpleGrid>
        </form>
      </Modal> */}
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
