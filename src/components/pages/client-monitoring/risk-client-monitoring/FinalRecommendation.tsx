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
import { GetClientRecommendationSummaryResponse } from '@/api/endpoint/midgard/backoffices';
import { DataTable } from 'mantine-datatable';
import {
  ArrowDownTrayIcon,
  EllipsisVerticalIcon,
  PlusIcon,
} from '@heroicons/react/24/solid';
import { useForm } from '@mantine/form';

type FinalRecommendationComponent = {
  fetchStatus: 'loading' | 'idle' | 'error' | 'success';
  data: GetClientRecommendationSummaryResponse['data'] | [];
  submitRecommendation: ({
    recommendation,
    status,
    notes,
  }: FinalRecommendationFormValues) => void;
  isReportDateSelected: boolean;
};

const recommendationSummaryHeader = [
  {
    accessor: 'created_at',
    title: 'Date',
    render: (doc: any) => (
      <Text key={doc.created_at}>
        {!!doc.created_at ? doc.created_at.slice(0, 10) : '-'}
      </Text>
    ),
  },
  { accessor: 'status', title: 'Status' },
  { accessor: 'recommendation', title: 'Recommendation' },
  { accessor: 'notes', title: 'Notes' },
];

export type FinalRecommendationFormValues = {
  recommendation: string;
  status: 'Red' | 'Green' | 'Yellow' | '';
  notes: string;
};

export function FinalRecommendation({
  fetchStatus,
  data,
  submitRecommendation,
  isReportDateSelected,
}: FinalRecommendationComponent) {
  const [modalOpened, setModalOpened] = useState(false);

  const form = useForm<FinalRecommendationFormValues>({
    initialValues: {
      recommendation: '',
      notes: '',
      status: '',
    },
    validate: {
      recommendation: (value: string) =>
        !!!value ? 'Recommendation field is required' : null,
      status: (value: string) => (!!!value ? 'Status field is required' : null),
    },
  });

  return (
    <Paper withBorder p={16}>
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="Add Recommendation"
      >
        <form
          onSubmit={form.onSubmit((values) => {
            submitRecommendation(values);
            form.reset();
            setModalOpened(!modalOpened);
          })}
        >
          <SimpleGrid cols={1}>
            <Textarea
              placeholder="Add recommendation"
              label="Recommendation"
              withAsterisk
              {...form.getInputProps('recommendation')}
            />
            <Select
              label="Status"
              placeholder="Pick one status"
              withAsterisk
              data={[
                { value: 'Green', label: 'Green' },
                { value: 'Yellow', label: 'Yellow' },
                { value: 'Red', label: 'Red' },
              ]}
              {...form.getInputProps('status')}
            />
            <Textarea label="Notes" {...form.getInputProps('notes')} />
            <Flex justify="center" align="center">
              <Button type="submit">Submit</Button>
            </Flex>
          </SimpleGrid>
        </form>
      </Modal>
      <SimpleGrid cols={1} verticalSpacing="sm">
        <Flex justify="flex-start" align="center">
          <Title order={3}>Final Recommendation Summary</Title>
          <Menu shadow="md" width={200} position="bottom-end">
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
                Add Recommendation
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
            columns={recommendationSummaryHeader}
            records={data ?? []}
            idAccessor="created_at"
          />
        </Box>
      </SimpleGrid>
    </Paper>
  );
}
