import React from 'react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid';
import {
  ActionIcon,
  Box,
  Flex,
  Menu,
  Paper,
  SimpleGrid,
  Title,
} from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { useRouter } from 'next/router';

import { GetClientPortfolioAlertsResponse } from '@/api/endpoint/midgard/backoffices';

type PortofolioAlertsComponent = {
  fetchStatus: 'loading' | 'idle' | 'error' | 'success';
  data: GetClientPortfolioAlertsResponse['data'] | Record<string, never>;
};

const portfolioAlertsHeader = [
  { accessor: 'code', title: 'Alert Code' },
  { accessor: 'description_en', title: 'Alert Description (EN)' },
  { accessor: 'description_id', title: 'Alert Description (ID)' },
];

export function PortfolioAlerts({
  fetchStatus,
  data,
}: PortofolioAlertsComponent) {
  const router = useRouter();

  return (
    <Paper withBorder p={16}>
      <SimpleGrid cols={1} verticalSpacing="sm">
        <Flex justify="flex-start" align="center">
          <Title order={3}>Monitoring Reports & Portfolio Alerts</Title>
          <Menu shadow="md" width={300} position="bottom-end">
            <Menu.Target>
              <ActionIcon variant="outline" ml="auto">
                <EllipsisVerticalIcon height={16} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                icon={<ArrowDownTrayIcon height={16} />}
                disabled={
                  !!data.portfolio_inquiry_reports
                    ? data.portfolio_inquiry_reports.monitoring_inquiry_reports
                        .document_url
                      ? false
                      : true
                    : true
                }
                onClick={() =>
                  router.push(
                    data.portfolio_inquiry_reports.monitoring_inquiry_reports
                      .document_url,
                  )
                }
              >
                Download Monitoring Enquiry Report
              </Menu.Item>
              <Menu.Item
                icon={<ArrowDownTrayIcon height={16} />}
                disabled={
                  !!data.portfolio_inquiry_reports
                    ? data.portfolio_inquiry_reports.alert_reports.document_url
                      ? false
                      : true
                    : true
                }
                onClick={() =>
                  router.push(
                    data.portfolio_inquiry_reports.alert_reports.document_url,
                  )
                }
              >
                Download Portfolio Alerts Report
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
            columns={portfolioAlertsHeader}
            records={data.portfolio_alerts ?? []}
            idAccessor="created_at"
          />
        </Box>
      </SimpleGrid>
    </Paper>
  );
}
