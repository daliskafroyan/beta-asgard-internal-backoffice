import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import {
  ActionIcon,
  createStyles,
  Grid,
  Paper,
  Select,
  TextInput,
} from '@mantine/core';
import { DateRangePicker, DateRangePickerValue } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useRouter } from 'next/router';

import {
  getClientPortfolio,
  GetClientPortfolioResponse,
} from '@/api/endpoint/midgard/backoffices';
import { PageContent } from '@/components/layouts/PageContent';
import useAuthStore from '@/store/useAuthStore';
import withAuth from '@/utils/hooks/withAuth';

type RiskClientTableHeader = {
  name: string;
  type: string;
  segment: string;
  apply_date: string;
  last_monitoring: string;
  next_monitoring_date: string;
  amount: number;
  last_portofolio_alert: string;
  next_actions: string;
  portfolio_id: number;
};

type RiskClientParams = {
  limit: number;
  offset: number;
  name: string;
  type: string;
  segment: string;
  start_apply_date: string;
  end_apply_date: string;
  start_last_monitoring_date: string;
  end_last_monitoring_date: string;
  portfolio_alert: string;
  sort: string;
};

const useStyles = createStyles((theme) => ({
  root: {
    // '&&': {
    //   'thead tr th': {
    //     padding: theme.spacing.lg,
    //   },
    // },
  },
}));

export function RiskClientMonitoring() {
  const user = useAuthStore.useUser();
  const router = useRouter();
  const PAGE_SIZES = [10, 20];

  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: 'code',
    direction: 'asc',
  });
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[1]);
  const [riskClientParams, setRiskClientParams] = useState<RiskClientParams>({
    limit: pageSize,
    offset: page - 1,
    name: '',
    type: '',
    segment: '',
    start_apply_date: '',
    end_apply_date: '',
    start_last_monitoring_date: '',
    end_last_monitoring_date: '',
    portfolio_alert: '',
    sort: '-code',
  });

  const handleSortStatusChange = (status: DataTableSortStatus) => {
    setPage(1);
    setSortStatus(status);
    setRiskClientParams({
      ...riskClientParams,
      sort: `${status.direction === 'asc' ? '-' : ''}${status.columnAccessor}`,
    });
  };

  const handlePaginationChange = (value: number) => {
    setPage(value);
    setRiskClientParams({
      ...riskClientParams,
      offset: (value - 1) * pageSize,
    });
  };

  const handleRecordsPerPageChange = (value: number) => {
    setPage(1);
    setPageSize(value);
    setRiskClientParams({
      ...riskClientParams,
      limit: value,
      offset: 0,
    });
  };

  const { data: dataQuery, isFetching: isDataQueryFetching } =
    useQuery<GetClientPortfolioResponse>(
      ['client-portofolio', page, riskClientParams],
      () =>
        getClientPortfolio({
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
          },
          params: riskClientParams,
        }),
      {
        keepPreviousData: true,
      },
    );

  const tableData = React.useMemo(() => {
    const modifyTableData = (data: GetClientPortfolioResponse['data'] = []) => {
      const newModifiedTableData = data.map((data) => {
        const individualData: RiskClientTableHeader = {
          name: '',
          type: '',
          segment: '',
          apply_date: '',
          last_monitoring: '',
          next_monitoring_date: '',
          amount: 0,
          last_portofolio_alert: '',
          next_actions: '',
          portfolio_id: 0,
        };

        individualData.name = data.portfolio_client.name;
        individualData.type = data.portfolio_client.type;
        individualData.segment = data.portfolio_client.segment;
        individualData.apply_date = data.apply_date;
        individualData.last_monitoring = data.last_monitoring ?? '';
        individualData.next_monitoring_date = data.next_monitoring_date ?? '';
        individualData.amount = data.amount;
        individualData.last_portofolio_alert = data.last_portfolio_alert;
        individualData.next_actions = data.next_action;
        individualData.portfolio_id = data.portfolio_id;
        return individualData;
      });
      return newModifiedTableData;
    };

    return modifyTableData(dataQuery?.data);
  }, [dataQuery?.data]);

  const [signingDate, setSigningDate] = useState<
    DateRangePickerValue | undefined
  >();

  const [lastMonitoringDate, setLastMonitoringDate] = useState<
    DateRangePickerValue | undefined
  >();

  const handleFilterSubmit = (
    values: Omit<
      RiskClientParams,
      | 'start_apply_date'
      | 'end_apply_date'
      | 'start_last_monitoring_date'
      | 'end_last_monitoring_date'
    >,
  ) => {
    setRiskClientParams({
      ...riskClientParams,
      ...values,
      start_apply_date: signingDate?.[0]?.toISOString().slice(0, 10) ?? '',
      end_apply_date: signingDate?.[1]?.toISOString().slice(0, 10) ?? '',
      start_last_monitoring_date:
        lastMonitoringDate?.[0]?.toISOString().slice(0, 10) ?? '',
      end_last_monitoring_date:
        lastMonitoringDate?.[1]?.toISOString().slice(0, 10) ?? '',
    });
  };

  const form = useForm<RiskClientParams>({
    initialValues: riskClientParams,
  });

  return (
    <PageContent title="Client Monitoring Index - Risk">
      <Paper p="sm">
        <form onSubmit={form.onSubmit(handleFilterSubmit)}>
          <Grid columns={51} align="flex-end">
            <Grid.Col span={8}>
              <TextInput
                placeholder="Search name"
                label="Name"
                {...form.getInputProps('name')}
              />
            </Grid.Col>
            <Grid.Col span={8}>
              <Select
                label="Type"
                placeholder="Pick type"
                clearable
                data={[
                  { value: 'company', label: 'Company' },
                  { value: 'individual', label: 'Individual' },
                ]}
                {...form.getInputProps('type')}
              />
            </Grid.Col>
            <Grid.Col span={8}>
              <Select
                label="Segment"
                placeholder="Pick segment"
                clearable
                data={[
                  { value: 'payment_agent', label: 'Payment Agent' },
                  { value: 'group_borrower', label: 'Group Borrower' },
                  { value: 'guarantor', label: 'Guarantor' },
                ]}
                {...form.getInputProps('segment')}
              />
            </Grid.Col>
            <Grid.Col span={8}>
              <Select
                label="System Alert"
                placeholder="Pick system alert"
                clearable
                data={[
                  { value: 'no_alert', label: 'No Alert' },
                  { value: 'alert_generated', label: 'Alert Generated' },
                ]}
                {...form.getInputProps('portfolio_alert')}
              />
            </Grid.Col>
            <Grid.Col span={8}>
              <DateRangePicker
                label="Signing Date"
                placeholder="Pick signing date"
                inputFormat="MM/DD/YYYY"
                value={lastMonitoringDate}
                amountOfMonths={2}
                onChange={setSigningDate}
              />
            </Grid.Col>
            <Grid.Col span={8}>
              <DateRangePicker
                label="Last Monitoring Date"
                placeholder="Pick last monitoring date"
                amountOfMonths={2}
                inputFormat="MM/DD/YYYY"
                value={lastMonitoringDate}
                onChange={setLastMonitoringDate}
              />
            </Grid.Col>
            <Grid.Col span={3}>
              <ActionIcon variant="filled" color="blue" size="lg" type="submit">
                <MagnifyingGlassIcon height={16} />
              </ActionIcon>
            </Grid.Col>
          </Grid>
        </form>
      </Paper>
      <DataTable
        withBorder
        fetching={isDataQueryFetching}
        columns={[
          {
            accessor: 'portfolio_id',
            hidden: true,
          },
          {
            accessor: 'name',
            sortable: true,
          },
          {
            accessor: 'type',
            sortable: true,
          },
          {
            accessor: 'segment',
            sortable: true,
          },
          {
            accessor: 'apply_date',
            title: 'Signing Date',
            sortable: true,
          },
          {
            accessor: 'last_monitoring',
            title: 'Last Monitoring Date',
            sortable: true,
          },
          {
            accessor: 'next_monitoring_date',
            sortable: true,
            title: 'Next Date',
          },
          {
            accessor: 'amount',
            title: 'Approved Loan/Limit Amount',
            sortable: true,
          },
          {
            accessor: 'last_portofolio_alert',
            title: 'System Alert',
          },
          {
            accessor: 'next_action',
            title: 'Next Action',
          },
        ]}
        records={tableData}
        page={page}
        onPageChange={handlePaginationChange}
        totalRecords={dataQuery?.meta.pagination.total}
        recordsPerPage={pageSize}
        sortStatus={sortStatus}
        onSortStatusChange={handleSortStatusChange}
        onRecordsPerPageChange={handleRecordsPerPageChange}
        recordsPerPageOptions={PAGE_SIZES}
        highlightOnHover
        idAccessor="portfolio_id"
        rowContextMenu={{
          items: ({ name, portfolio_id }) => [
            {
              key: 'details',
              title: `Open Detail of ${name}`,
              onClick: () =>
                router.push(`risk-client-monitoring/${portfolio_id}`),
            },
          ],
        }}
      />
    </PageContent>
  );
}

export default withAuth(RiskClientMonitoring, 'all');
