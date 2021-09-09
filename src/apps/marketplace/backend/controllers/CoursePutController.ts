import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { CreateCourseCommand } from '../../../../contexts/Marketplace/Catalogs/application/CreateCourseCommand';
import { CourseAlreadyExists } from '../../../../contexts/Marketplace/Catalogs/domain/CourseAlreadyExists';
import { CommandBus } from '../../../../contexts/Shared/domain/CommandBus';
import { Controller } from './Controller';

export class CoursePutController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request, res: Response) {
    const id: string = req.params.id;
    const name: string = req.body.name;
    const duration: string = req.body.duration;
    const createCourseCommand = new CreateCourseCommand({ id, name, duration });

    try {
      await this.commandBus.dispatch(createCourseCommand);
    } catch (error) {
      if (error instanceof CourseAlreadyExists) {
        res.status(httpStatus.BAD_REQUEST).send(error.message);
      } else {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
      }
    }

    res.status(httpStatus.CREATED).send();
  }
}
