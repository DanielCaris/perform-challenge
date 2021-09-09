import { CourseName } from '../../../../../src/Contexts/Marketplace/Courses/domain/CourseName';
import { WordMother } from '../../../Shared/domain/WordMother';

export class CourseNameMother {
  static create(value: string): CourseName {
    return new CourseName(value);
  }

  static random(): CourseName {
    return this.create(WordMother.random());
  }
}