import { ApiRequestConfig } from '@/api/api.types';
import axios from 'axios';
import api from '../../api';

const axiosParams = {
  baseURL: 'https://asgard.koin.works/v1/backoffices/',
};

const axiosInstance = axios.create(axiosParams);

//#region  //*========================== Auth
//#region  //*=========== Credential ===========
export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  status: number;
  message: {
    en: string;
    id: string;
  };
  data: {
    refresh_token: string;
    access_token: string;
    role: string;
  };
}

export const postCredentials = (bodyReq: AuthRequest) =>
  api(axiosInstance)
    .post<AuthResponse>('auth', bodyReq)
    .then((res) => res.data);
//#endregion  //*======== Credential ===========

//#region  //*=========== Menu ===========
export interface Menu {
  id: number;
  name: string;
  icon: string;
  sub_menu: SubMenu[];
}

export interface SubMenu {
  name: string;
  list: string[];
}

export interface MenuResponse {
  status: number;
  message: {
    en: string;
    id: string;
  };
  data: Array<{
    id: number;
    name: string;
    icon: string | undefined;
    sub_menu: Array<{
      name: string;
      list: Array<string>;
    }>;
  }>;
}

export const getMenu = (config: ApiRequestConfig | undefined) =>
  api(axiosInstance)
    .get<MenuResponse>('admin/menu', config)
    .then((res) => res.data);

//#endregion  //*======== Menu ===========

//#endregion  //*======================= Auth
