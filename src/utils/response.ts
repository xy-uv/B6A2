import { Response } from "express";

interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data?: T;
}

const response = <T>(res: Response, data: IResponse<T>): void => {
  const resData: Partial<IResponse<T>> = {
    success: data.success,
    message: data.message,
  };
  if (data.data !== undefined) {
    resData.data = data.data;
  }
  res.status(data.statusCode).json(resData);
};

export default response;
