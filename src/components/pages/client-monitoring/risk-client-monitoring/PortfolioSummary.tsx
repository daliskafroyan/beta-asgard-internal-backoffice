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
import {
  ChevronRightIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/24/outline';
import { nanoid } from 'nanoid';
import {
  GetClientPortfolioAlertsResponse,
  GetClientPortfolioSummaryResponse,
  GetClientRecommendationSummaryResponse,
  PostPortfolioSummaryRequest,
  postPortfolioSummaryResponse,
} from '@/api/endpoint/midgard/backoffices';
import { DataTable } from 'mantine-datatable';
import { ArrowDownTrayIcon, PlusIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';
import { useForm } from '@mantine/form';
import { useMutation, useQueryClient } from 'react-query';

type PortfolioSummaryComponent = {
  fetchStatus: 'loading' | 'idle' | 'error' | 'success';
  data: GetClientPortfolioSummaryResponse['data'] | Record<string, never>;
  isReportDateSelected: boolean;
  submitSummary: ({
    summary,
    action,
    summaryType,
  }: PortfolioSummaryFormValues) => void;
};

export type PortfolioSummaryFormValues = {
  summary: string;
  action: string;
  summaryType: 'pefindo' | 'internet_check';
};

const portfolioSummaryHeader = [
  { accessor: 'period_date', title: 'Date' },
  { accessor: 'summary', title: 'Summary' },
  { accessor: 'action', title: 'RM Action' },
];

export function StatusSummary({
  fetchStatus,
  data,
  submitSummary,
  isReportDateSelected,
}: PortfolioSummaryComponent) {
  const [modalOpened, setModalOpened] = useState(false);

  const form = useForm<PortfolioSummaryFormValues>({
    initialValues: {
      summaryType: 'pefindo',
      summary: '',
      action: '',
    },
    validate: {
      summary: (value: string) =>
        value.length === 0 ? 'Summary field is required' : null,
      action: (value: string) => (!!!value ? 'Action field is required' : null),
    },
  });

  return (
    <Paper withBorder p={16}>
      <Modal
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
              placeholder="Add summary from CLIK / Pefindo reports"
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
      </Modal>
      <SimpleGrid cols={1} verticalSpacing="sm">
        <Flex justify="flex-start" align="center">
          <Title order={3}>CLIK / Pefindo Status Summary</Title>
          <Menu shadow="md" width={270} position="bottom-end">
            <Menu.Target>
              <ActionIcon variant="outline" ml="auto">
                <EllipsisVerticalIcon height={16} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                icon={<PlusIcon height={16} />}
                onClick={() => setModalOpened(!modalOpened)}
                disabled={!isReportDateSelected}
              >
                Add CLIK / Pefindo Status Summary
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Flex>
        <Box sx={{ height: 200 }}>
          <DataTable
            withBorder
            withColumnBorders
            highlightOnHover
            fetching={fetchStatus === 'loading'}
            columns={portfolioSummaryHeader}
            records={data.portfolio_summary_pefindo ?? []}
            idAccessor="created_at"
          />
        </Box>
      </SimpleGrid>
    </Paper>
  );
}

export function InternetSummary({
  fetchStatus,
  data,
  submitSummary,
  isReportDateSelected,
}: PortfolioSummaryComponent) {
  const [modalOpened, setModalOpened] = useState(false);

  const form = useForm<PortfolioSummaryFormValues>({
    initialValues: {
      summaryType: 'internet_check',
      summary: '',
      action: '',
    },

    validate: {
      summary: (value: string) =>
        value.length === 0 ? 'Summary field is required' : null,
      action: (value: string) => (!!!value ? 'Action field is required' : null),
    },
  });

  return (
    <Paper withBorder p={16}>
      <Modal
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
      </Modal>
      <SimpleGrid cols={1} verticalSpacing="sm">
        <Flex justify="flex-start" align="center">
          <Title order={3}>Internet Check Summary</Title>
          <Menu shadow="md" width={250} position="bottom-end">
            <Menu.Target>
              <ActionIcon variant="outline" ml="auto">
                <EllipsisVerticalIcon height={16} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                icon={<PlusIcon height={16} />}
                onClick={() => setModalOpened(!modalOpened)}
                disabled={!isReportDateSelected}
              >
                Add Internet Check Summary
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Flex>
        <Box sx={{ height: 200 }}>
          <DataTable
            withBorder
            withColumnBorders
            highlightOnHover
            fetching={fetchStatus === 'loading'}
            columns={portfolioSummaryHeader}
            records={data.portfolio_summary_internet_check ?? []}
            idAccessor="created_at"
          />
        </Box>
      </SimpleGrid>
    </Paper>
  );
}
