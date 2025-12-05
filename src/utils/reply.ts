import { Response } from "express";

interface IReply<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data?: T;
}

const reply = <T>(res: Response, data: IReply<T>): void => {
  const resData: Partial<IReply<T>> = {
    success: data.success,
    message: data.message,
  };
  if (data.data !== undefined) {
    resData.data = data.data;
  }
  res.status(data.statusCode).json(resData);
};

export default reply;
