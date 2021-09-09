import { Command } from '../../../Shared/domain/Command';
import { CommandHandler } from '../../../Shared/domain/CommandHandler';
import { CourseId } from '../../Shared/domain/Courses/CourseId';
import { CourseDuration } from '../domain/CourseDuration';
import { CourseName } from '../domain/CourseName';
import { CourseCreator } from './CourseCreator';
import { CreateCourseCommand } from './CreateCourseCommand';

export class CreateCourseCommandHandler implements CommandHandler<CreateCourseCommand> {
  constructor(private courseCreator: CourseCreator) {}

  subscribedTo(): Command {
    return CreateCourseCommand;
  }

  async handle(command: CreateCourseCommand): Promise<void> {
    const courseId = new CourseId(command.id);
    const courseName = new CourseName(command.name);
    const courseDuration = new CourseDuration(command.duration);
    await this.courseCreator.run({ courseId, courseName, courseDuration });
  }
}
