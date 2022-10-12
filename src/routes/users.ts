import { Router, NextFunction, Request, Response } from 'express';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    userlist: [],
    message: 'fetched',
  });
});

export default router;
