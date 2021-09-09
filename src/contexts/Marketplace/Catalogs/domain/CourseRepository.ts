import { Nullable } from '../../../Shared/domain/Nullable';
import { CourseId } from '../../Shared/domain/Courses/CourseId';
import { Course } from './Course';

export interface CourseRepository {
  save(course: Course): Promise<void>;

  search(id: CourseId): Promise<Nullable<Course>>;
}
