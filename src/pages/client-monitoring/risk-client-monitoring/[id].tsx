import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  Grid,
  Group,
  Paper,
  Select,
  SimpleGrid,
  Skeleton,
  Text,
} from '@mantine/core';
import { nanoid } from 'nanoid';
import Link from 'next/link';
import { useRouter } from 'next/router';

import {
  getClientPortfolioAlerts,
  GetClientPortfolioAlertsResponse,
  getClientPortfolioSummary,
  GetClientPortfolioSummaryResponse,
  getClientPortofolioAdditionalDocuments,
  GetClientPortofolioAdditionalDocumentsResponse,
  getClientRecommendationSummary,
  GetClientRecommendationSummaryResponse,
  getPortfolioDetails,
  GetPortfolioDetailsResponse,
  PostPortfolioRecommendationRequest,
  postPortfolioRecommendationRequest,
  postPortfolioSummary,
  PostPortfolioSummaryRequest,
} from '@/api/endpoint/midgard/backoffices';
import { PageContent } from '@/components/layouts/PageContent';
import {
  AdditionalDocuments,
  FinancialReports,
  VisitReports,
} from '@/components/pages/client-monitoring/risk-client-monitoring/AdditionalDocuments';
import {
  FinalRecommendation,
  FinalRecommendationFormValues,
} from '@/components/pages/client-monitoring/risk-client-monitoring/FinalRecommendation';
import {
  InternetSummary,
  PortfolioSummaryFormValues,
  StatusSummary,
} from '@/components/pages/client-monitoring/risk-client-monitoring/PortfolioSummary';
import { PortfolioAlerts } from '@/components/pages/client-monitoring/risk-client-monitoring/PortofolioAlerts';
import useAuthStore from '@/store/useAuthStore';
import withAuth from '@/utils/hooks/withAuth';

function SegmentData(title: string, data: number | string | undefined) {
  return (
    <div>
      <Text>{title}</Text>
      <Text size="lg" weight="bold">
        {data}
      </Text>
    </div>
  );
}

function monthConverter(month: string) {
  switch (month) {
    case '01':
      return 'Jan';
    case '02':
      return 'Feb';
    case '03':
      return 'Mar';
    case '04':
      return 'Apr';
    case '05':
      return 'May';
    case '06':
      return 'Jun';
    case '07':
      return 'Jul';
    case '08':
      return 'Aug';
    case '09':
      return 'Sep';
    case '10':
      return 'Oct';
    case '11':
      return 'Nov';
    case '12':
      return 'Dec';
    default:
      return '(unknown month)';
  }
}

function DetailRisk() {
  const router = useRouter();
  const { id } = router.query;

  //#region  //*=========== State Region ===========
  const user = useAuthStore.useUser();
  const queryClient = useQueryClient();

  const [reportDate, setReportDate] = useState<string | null>(null);
  const [listReportDate, setListReportDate] = useState<
    { value: string; label: string }[]
  >([]);
  const [submitRecommendation, setSubmitRecommendation] =
    useState<PostPortfolioRecommendationRequest>();
  const [postPortfolioSummaryReq, setPostPortfolioSummaryReq] =
    useState<PostPortfolioSummaryRequest>();
  //#endregion  //*======== State Region ===========

  //#region  //*=========== Async Region ===========
  const {
    data: portfolioDetails,
    isLoading: isGetPortfolioDetailsLoading,
    isIdle: isGetPortfolioDetailsIdle,
  } = useQuery<GetPortfolioDetailsResponse>(
    ['client-portfolio'],
    () =>
      getPortfolioDetails(
        {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
          },
        },
        id,
      ),
    {
      enabled: router.isReady,
      onSuccess: ({ data }) => {
        if (!!data.available_periods) {
          const convertedListReportDate = data.available_periods.map(
            (period) => {
              const individualPeriod: { value: string; label: string } = {
                value: '',
                label: '',
              };

              individualPeriod.label = `${monthConverter(
                period.slice(5),
              )} ${period.slice(0, 4)}`;
              individualPeriod.value = period;

              return individualPeriod;
            },
          );
          setListReportDate(convertedListReportDate);
        }
      },
    },
  );

  const { data: portfolioSummary, status: getPortfolioSummaryStatus } =
    useQuery<GetClientPortfolioSummaryResponse>(
      ['client-portfolio-summary', reportDate],
      () =>
        getClientPortfolioSummary(
          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
            },
            params: {
              period_date: reportDate,
            },
          },
          id,
        ),
      {
        enabled: !!reportDate,
      },
    );

  const { data: additionalDocuments, status: getAdditionalDocumentsStatus } =
    useQuery<GetClientPortofolioAdditionalDocumentsResponse>(
      ['client-portfolio-additional-doc', reportDate],
      () =>
        getClientPortofolioAdditionalDocuments(
          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
            },
            params: {
              period_date: reportDate,
            },
          },
          id,
        ),
      {
        enabled: !!reportDate,
      },
    );

  const { data: portfolioAlerts, status: getPortfolioAlertsStatus } =
    useQuery<GetClientPortfolioAlertsResponse>(
      ['client-portfolio-alert', reportDate],
      () =>
        getClientPortfolioAlerts(
          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
            },
            params: {
              period_date: reportDate,
            },
          },
          id,
        ),
      {
        enabled: !!reportDate,
      },
    );

  const { data: recommendationSummary, status: recommendationSummaryStatus } =
    useQuery<GetClientRecommendationSummaryResponse>(
      ['client-portfolio-recommendation-summary', reportDate],
      () =>
        getClientRecommendationSummary({
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
          },
          params: {
            portfolio_id: id,
            period_date: reportDate,
          },
        }),
      {
        enabled: !!reportDate,
      },
    );

  const { mutate: triggerPostPortfolioRecommendationRequest } = useMutation(
    () =>
      postPortfolioRecommendationRequest(submitRecommendation, {
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(
          'client-portfolio-recommendation-summary',
        );
      },
    },
  );

  const { mutate: triggerPostPortfolioSummary } = useMutation(
    () =>
      postPortfolioSummary(postPortfolioSummaryReq, {
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('client-portfolio-summary');
      },
    },
  );

  const handleSubmitRecommendation = ({
    notes,
    recommendation,
    status,
  }: FinalRecommendationFormValues) => {
    setSubmitRecommendation({
      notes,
      recommendation,
      status,
      portfolio_id: parseInt(id as string),
      period_date: reportDate as string,
    });
  };

  const handleSubmitSummary = ({
    summary,
    action,
    summaryType,
  }: PortfolioSummaryFormValues) => {
    setPostPortfolioSummaryReq({
      summary,
      action,
      portfolio_id: parseInt(id as string),
      period_date: reportDate as string,
      summary_type: summaryType,
    });
  };
  //#endregion  //*======== Async Region ===========

  //#region  //*=========== Side Effect Region ===========
  useEffect(() => {
    if (!!submitRecommendation) {
      triggerPostPortfolioRecommendationRequest();
    }
  }, [submitRecommendation, triggerPostPortfolioRecommendationRequest]);

  useEffect(() => {
    if (!!postPortfolioSummaryReq) {
      triggerPostPortfolioSummary();
    }
  }, [postPortfolioSummaryReq, triggerPostPortfolioSummary]);
  //#endregion  //*======== Side Effect Region ===========
  const routeArray = router.asPath.split('/').slice(1);
  const breadcrumbItems = routeArray.map((route, index, arr) => {
    return (
      <Link
        href={`/${String(arr.slice(0, index + 1)).replaceAll(',', '/')}`}
        key={nanoid()}
        passHref
      >
        <Text component="a" tt="capitalize">
          {route !== '[id]' && route?.replaceAll('-', ' ')}
        </Text>
      </Link>
    );
  });

  console.log('#debug breadcrumb item', breadcrumbItems);

  return (
    <PageContent title="Borrower Monitoring Details - Risk">
      <Paper withBorder shadow="xs">
        <Skeleton
          visible={isGetPortfolioDetailsLoading || isGetPortfolioDetailsIdle}
        >
          <Grid justify="space-between" grow p="md">
            <Grid.Col md={6} lg={2}>
              <SimpleGrid cols={1} spacing="md">
                {SegmentData(
                  'Name: ',
                  portfolioDetails?.data.borrower_information.portfolio_client
                    .name ?? '-',
                )}
                {SegmentData(
                  'Type: ',
                  portfolioDetails?.data.borrower_information.portfolio_client
                    .type ?? '-',
                )}
              </SimpleGrid>
            </Grid.Col>
            <Grid.Col md={6} lg={2}>
              <SimpleGrid cols={1} spacing="md">
                {SegmentData(
                  'Segment: ',
                  portfolioDetails?.data.borrower_information.portfolio_client
                    .segment ?? '-',
                )}
                {SegmentData(
                  'Contract Signing Date: ',
                  portfolioDetails?.data.borrower_information
                    .subject_reference_date ?? '-',
                )}
              </SimpleGrid>
            </Grid.Col>
            <Grid.Col md={6} lg={2}>
              <SimpleGrid cols={1} spacing="md">
                {SegmentData(
                  'Last Monitoring Date: ',
                  portfolioDetails?.data.borrower_information.last_monitoring ??
                    '-',
                )}
                {SegmentData(
                  'Next Monitoring Date: ',
                  portfolioDetails?.data.borrower_information
                    .next_monitoring_date ?? '-',
                )}
              </SimpleGrid>
            </Grid.Col>
            <Grid.Col md={6} lg={2}>
              <SimpleGrid cols={1} spacing="md">
                {SegmentData(
                  'Approved Loan / Limit Amount: ',
                  portfolioDetails?.data.borrower_information.amount ?? '-',
                )}
                {SegmentData(
                  'Group Code: ',
                  !!portfolioDetails?.data.borrower_information.portfolio_client
                    .group_code
                    ? portfolioDetails?.data.borrower_information
                        .portfolio_client.group_code
                    : '-',
                )}
              </SimpleGrid>
            </Grid.Col>
            <Grid.Col md={6} lg={2}>
              <SimpleGrid cols={1} spacing="md">
                {SegmentData(
                  'Monitoring End Date: ',
                  portfolioDetails?.data.borrower_information
                    .monitoring_end_date ?? '-',
                )}
              </SimpleGrid>
            </Grid.Col>
          </Grid>
        </Skeleton>
      </Paper>

      <Group position="apart">
        <Text> Historical Clik Reports</Text>
        {!!portfolioDetails?.data.available_periods ? (
          <Select
            data={listReportDate}
            value={reportDate}
            onChange={setReportDate}
            placeholder="Select Date"
          />
        ) : (
          <Select
            data={[{ value: '', label: 'Data is not available' }]}
            disabled
            placeholder="Data is not available"
          />
        )}
      </Group>

      <Grid>
        <Grid.Col span={12}>
          <PortfolioAlerts
            fetchStatus={getPortfolioAlertsStatus}
            data={portfolioAlerts?.data ?? {}}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <StatusSummary
            fetchStatus={getPortfolioSummaryStatus}
            data={portfolioSummary?.data ?? {}}
            submitSummary={handleSubmitSummary}
            isReportDateSelected={!!reportDate}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <InternetSummary
            fetchStatus={getPortfolioSummaryStatus}
            data={portfolioSummary?.data ?? {}}
            submitSummary={handleSubmitSummary}
            isReportDateSelected={!!reportDate}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <VisitReports
            data={additionalDocuments?.data.portfolio_summary_documents ?? {}}
            fetchStatus={getAdditionalDocumentsStatus}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <FinancialReports
            data={additionalDocuments?.data.portfolio_summary_documents ?? {}}
            fetchStatus={getAdditionalDocumentsStatus}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <AdditionalDocuments
            data={additionalDocuments?.data.portfolio_summary_documents ?? {}}
            fetchStatus={getAdditionalDocumentsStatus}
          />
        </Grid.Col>

        <Grid.Col span={12}>
          <FinalRecommendation
            fetchStatus={recommendationSummaryStatus}
            data={recommendationSummary?.data ?? []}
            isReportDateSelected={!!reportDate}
            submitRecommendation={handleSubmitRecommendation}
          />
        </Grid.Col>
      </Grid>
    </PageContent>
  );
}

export default withAuth(DetailRisk, 'all');
