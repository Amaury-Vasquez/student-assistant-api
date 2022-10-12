import { Router, NextFunction, Request, Response } from 'express';

import {
  DelSubjectSchema,
  SubjectSchema,
  ScheduleSchema,
} from '../schemas/scheduleSchema';
import { ScheduleService } from '../services/scheduleService';
import { validationHandler } from '../middlewares/validationHandler';

const router = Router();
const service = new ScheduleService();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await service.getSchedule().then((schedule) =>
      res.status(200).json({
        schedule,
      })
    );
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  validationHandler(ScheduleSchema, 'body'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/subject',
  validationHandler(SubjectSchema, 'body'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
      await service.addSubject(body).then((data) =>
        res.status(201).json({
          data,
          message: 'Subject created',
        })
      );
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/subject',
  validationHandler(DelSubjectSchema, 'body'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
      const { name } = body;

      await service.delSubject(name).then((data) => {
        const status = !data.length ? 204 : 200;
        const message =
          data.length > 1 ? 'Subjects deleted' : 'Subject deleted';
        res.status(status).json({
          data,
          message,
        });
      });
    } catch (error) {
      next(error);
    }
  }
);
export default router;
