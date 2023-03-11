import { Request, Response } from 'express';
import { getHelloWorld } from '@services/auth.service';

export const loginUser = async (req: Request, res: Response) => {
  res.send(getHelloWorld());
};
