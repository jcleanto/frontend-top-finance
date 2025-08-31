export interface IFinance {
  id?: number;
  userId?: string | null;
  descricao: string;
  valor: number;
  isDeleted?: boolean | undefined;
  createdAt?: string | null;
  updatedAt?: string | null;
  deletedAt?: string | null;
}

export interface IFinanceResponse {
  status: string;
  data: IFinance;
}

export interface IFinancesResponse {
  status: string;
  data: IFinance[];
  count: number;
}

export interface IGenericResponse {
  status: string;
  message: string;
}