import { CreateCourseCommand } from '../../../../../src/Contexts/Marketplace/Courses/application/CreateCourseCommand';
import { Course } from '../../../../../src/Contexts/Marketplace/Courses/domain/Course';
import { CourseDuration } from '../../../../../src/Contexts/Marketplace/Courses/domain/CourseDuration';
import { CourseName } from '../../../../../src/Contexts/Marketplace/Courses/domain/CourseName';
import { CourseId } from '../../../../../src/Contexts/Marketplace/Shared/domain/Courses/CourseId';
import { CourseIdMother } from '../../Shared/domain/Courses/CourseIdMother';
import { CourseDurationMother } from './CourseDurationMother';
import { CourseNameMother } from './CourseNameMother';

export class CourseMother {
  static create(id: CourseId, name: CourseName, duration: CourseDuration): Course {
    return new Course(id, name, duration);
  }

  static fromCommand(command: CreateCourseCommand): Course {
    return this.create(
      CourseIdMother.create(command.id),
      CourseNameMother.create(command.name),
      CourseDurationMother.create(command.duration)
    );
  }

  static random(): Course {
    return this.create(CourseIdMother.random(), CourseNameMother.random(), CourseDurationMother.random());
  }
}
