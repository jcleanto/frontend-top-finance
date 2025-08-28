import axios from 'axios';
import type { IGenericResponse, IFinanceResponse, IFinancesResponse } from './types';
import type { EditFinanceInput } from '../pages/finances/edit.finance.page';
import type { CreateInput } from '../pages/finances/create.finance.page';

const BASE_URL = 'http://localhost:10000/';

export const financeApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
});

financeApi.defaults.headers.common['Content-Type'] = 'application/json';

export const getFinancesFn = async () => {
  const response = await financeApi.get<IFinancesResponse>('finances');
  return response.data;
};

export const getFinanceByIdFn = async (id: string | undefined) => {
  const response = await financeApi.get<IFinanceResponse>(`finances/${id}`);
  return response.data;
};

export const updateFinanceFn = async (finance: EditFinanceInput) => {
  const response = await financeApi.patch<IGenericResponse>(`finances/${finance.id}/update`, finance);
  return response.data;
};

export const createFinanceFn = async (finance: CreateInput) => {
  const response = await financeApi.post<IGenericResponse>('finances/new', finance);
  return response.data;
};

export const deleteFinanceFn = async (id: string | undefined) => {
  const response = await financeApi.delete<IGenericResponse>(`finances/${id}`);
  return response.data;
};
