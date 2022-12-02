import axios from 'axios';

import { ApiRequestConfig } from '@/api/api.types';

import api from '../../api';

const axiosParams = {
  baseURL: `${process.env.MIX_URL_MIDGARD}/v1/backoffice/`,
};

const axiosInstance = axios.create(axiosParams);

//#region  //*=========== Get Client Portfolio ===========
export interface GetClientPortfolioResponse {
  success: boolean;
  message: {
    en: string;
    id: string;
  };
  data: Array<{
    portfolio_id: number;
    portfolio_client_id: number;
    portfolio_reference_type: string;
    amount: number;
    apply_date: string;
    contract_date: string;
    due_date: string;
    subject_reference_date: string;
    last_monitoring?: string;
    next_monitoring_date?: string;
    monitoring_end_date: string;
    next_action: string;
    last_portfolio_alert: any;
    portfolio_client: {
      portfolio_client_id: number;
      type: string;
      name: string;
      segment: string;
      group_code: string;
    };
  }>;
  meta: {
    pagination: {
      limit: number;
      offset: number;
      total: number;
    };
  };
}

/**
 * Get client portfolio for CLIK report
 *
 */
export const getClientPortfolio = (config: ApiRequestConfig | undefined) =>
  api(axiosInstance)
    .get<GetClientPortfolioResponse>('clik/portfolio', config)
    .then((res) => res.data);
//#endregion  //*======== Get Client Portfolio ===========

//#region  //*=========== Get Portofolio Details ===========
export interface GetPortfolioDetailsResponse {
  success: boolean;
  message: {
    en: string;
    id: string;
  };
  data: {
    borrower_information: {
      portfolio_id: number;
      portfolio_client_id: number;
      portfolio_reference_type: string;
      amount: number;
      apply_date: string;
      contract_date: string;
      due_date: string;
      subject_reference_date: string;
      last_monitoring: any;
      next_monitoring_date: any;
      monitoring_end_date: string;
      next_action: string;
      last_portfolio_alert: any;
      portfolio_client: {
        portfolio_client_id: number;
        type: string;
        name: string;
        segment: string;
        group_code: string;
      };
    };
    available_periods: string[];
  };
}

/**
 * Get details of user's CLIK report
 *
 */
export const getPortfolioDetails = (
  config: ApiRequestConfig | undefined,
  id: string | string[] | undefined,
) =>
  api(axiosInstance)
    .get<GetPortfolioDetailsResponse>(`clik/portfolio/${id}`, config)
    .then((res) => res.data);
//#endregion  //*======== Get Portofolio Details ===========

//#region  //*=========== Get Portofolio Status Summary ===========
export interface GetClientPortfolioSummaryResponse {
  success: boolean;
  message: {
    en: string;
    id: string;
  };
  data: {
    portfolio_summary_pefindo: Array<{
      portfolio_summary_id: number;
      portfolio_id: number;
      summary: string;
      action: string;
      summary_type: string;
      created_at: string;
      period_date: string;
    }>;
    portfolio_summary_internet_check: Array<{
      portfolio_summary_id: number;
      portfolio_id: number;
      summary: string;
      action: string;
      summary_type: string;
      created_at: string;
      period_date: string;
    }>;
  };
}

/**
 * Get user's portfolio summary
 *
 */
export const getClientPortfolioSummary = (
  config: ApiRequestConfig | undefined,
  id: string | string[] | undefined,
) =>
  api(axiosInstance)
    .get<GetClientPortfolioSummaryResponse>(
      `clik/portfolio/summary/${id}`,
      config,
    )
    .then((res) => res.data);
//#endregion  //*======== Get Portofolio Status Summary ===========

//#region  //*=========== Get Portofolio Additional Documents ===========
export interface GetClientPortofolioAdditionalDocumentsResponse {
  success: boolean;
  message: {
    en: string;
    id: string;
  };
  data: {
    portfolio_summary_documents: {
      portfolio_summary_document_visit: Array<{
        portfolio_summary_document_id: number;
        portfolio_id: number;
        document_url: string;
        summary: string;
        notes: string;
        type: string;
        report_type: string;
        created_at: string;
        period_date: string;
        action_date?: string;
      }>;
      portfolio_summary_document_financial: Array<{
        portfolio_summary_document_id: number;
        portfolio_id: number;
        document_url: string;
        summary: string;
        notes: string;
        type: string;
        report_type: string;
        created_at: string;
        period_date: string;
        action_date: string;
      }>;
      portfolio_summary_document_additional: Array<{
        portfolio_summary_document_id: number;
        portfolio_id: number;
        document_url: string;
        summary: string;
        notes: string;
        type: string;
        report_type: string;
        created_at: string;
        period_date: string;
        action_date: string;
      }>;
    };
  };
}

/**
 * Get user's additional documents
 *
 */
export const getClientPortofolioAdditionalDocuments = (
  config: ApiRequestConfig | undefined,
  id: string | string[] | undefined,
) =>
  api(axiosInstance)
    .get<GetClientPortofolioAdditionalDocumentsResponse>(
      `clik/portfolio/document/${id}`,
      config,
    )
    .then((res) => res.data);
//#endregion  //*======== Get Portofolio Additional Documents ===========

//#region  //*=========== Get Portofolio Alerts ===========
export interface GetClientPortfolioAlertsResponse {
  success: boolean;
  message: {
    en: string;
    id: string;
  };
  data: {
    portfolio_alerts: Array<{
      portfolio_alert_detail_id: number;
      portfolio_alert_id: number;
      code: string;
      description_en: string;
      description_id: string;
    }>;
    portfolio_inquiry_reports: {
      monitoring_inquiry_reports: {
        portfolio_inquiry_id: number;
        inquiry_type: string;
        document_url: string;
      };
      alert_reports: {
        portfolio_inquiry_id: number;
        inquiry_type: string;
        document_url: string;
      };
    };
  };
}

export const getClientPortfolioAlerts = (
  config: ApiRequestConfig | undefined,
  id: string | string[] | undefined,
) =>
  api(axiosInstance)
    .get<GetClientPortfolioAlertsResponse>(`clik/reports/${id}`, config)
    .then((res) => res.data);
//#endregion  //*======== Get Portofolio Alerts ===========

//#region  //*=========== Get Portfolio Recommendations ===========
export interface GetClientRecommendationSummaryResponse {
  success: boolean;
  message: {
    en: string;
    id: string;
  };
  data: Array<{
    portfolio_recommendation_id: number;
    portfolio_id: number;
    status: string;
    recommendation: string;
    notes: string;
    properties: any;
    created_at: string;
    created_by: string;
    modified_at: string;
    modified_by: string;
    period_date: string;
  }>;
}

/**
 * Get client recommendation summary from backoffice midgard
 */
export const getClientRecommendationSummary = (
  config: ApiRequestConfig | undefined,
) =>
  api(axiosInstance)
    .get<GetClientRecommendationSummaryResponse>(
      'clik/portfolio/recommendation',
      config,
    )
    .then((res) => res.data);
//#endregion  //*======== Get Portfolio Recommendations ===========

//#region  //*=========== Post Portfolio Summary ===========
export interface PostPortfolioSummaryRequest {
  portfolio_id: number;
  summary: string;
  action: string;
  summary_type: 'pefindo' | 'internet_check';
  period_date: string;
}

export interface PostPortfolioSummaryResponse {
  success: boolean;
  message: {
    en: string;
    id: string;
  };
  data: {
    portfolio_summary_id: number;
  };
}

export const postPortfolioSummary = (
  bodyReq: PostPortfolioSummaryRequest | undefined,
  config: ApiRequestConfig | undefined,
) =>
  api(axiosInstance)
    .post<PostPortfolioSummaryResponse>(
      'clik/portfolio/summary/submit',
      bodyReq,
      config,
    )
    .then((res) => res.data);
//#endregion  //*======== Post Portfolio Summary ===========

//#region  //*=========== Post Portfolio Recommendation ===========
export interface PostPortfolioRecommendationRequest {
  status: 'Red' | 'Green' | 'Yellow' | '';
  recommendation: string;
  notes: string;
  portfolio_id: number;
  period_date: string;
}

export interface PostPortfolioRecommendationResponse {
  success: boolean;
  message: {
    en: string;
    id: string;
  };
  data: Array<{
    portfolio_recommendation_id: number;
    portfolio_id: number;
    status: 'Red' | 'Green' | 'Yellow';
    recommendation: string;
    notes: string;
    properties: any;
    created_at: string;
    created_by: string;
    modified_at: string;
    modified_by: string;
    period_date: string;
  }>;
}

export const postPortfolioRecommendationRequest = (
  bodyReq: PostPortfolioRecommendationRequest | undefined,
  config: ApiRequestConfig | undefined,
) =>
  api(axiosInstance)
    .post<PostPortfolioRecommendationRequest>(
      'clik/portfolio/recommendation',
      bodyReq,
      config,
    )
    .then((res) => res.data);

//#endregion  //*======== Post Portfolio Recommendation ===========

//#region  //*=========== Post Summary Financial Reports ===========

//#endregion  //*======== Post Summary Financial Reports ===========
