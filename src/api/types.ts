export interface IFinance {
  id: number;
  descricao: string;
  valor: number;
  isDeleted?: boolean | undefined;
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;
}

export interface IFinanceResponse {
  status: string;
  data: IFinance;
}

export interface IFinancesResponse {
  status: string;
  data: {
    finances: IFinance[];
    count: number;
  };
}

export interface IGenericResponse {
  status: string;
  message: string;
}