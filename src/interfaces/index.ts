export interface ITodo {
  [param: string]: string | number | boolean | Date
}

export interface IGetParams {
  id?: string;
  page?: number;
  limit?: number;
}