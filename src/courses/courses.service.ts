import { HttpException, Injectable } from '@nestjs/common';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  private courses: Course[] = [
    {
      id: 1,
      name: 'Fundamentos do framework NestJS',
      description: 'Fundamentos do framework NestJS',
      tags: ['NestJS', 'NodeJS', 'TypeScript'],
    },
  ];

  findAll(): Course[] {
    return this.courses;
  }

  findOne(id: number): any {
    const course = this.courses.find((course) => course.id === id);
    if (!course) {
      throw new HttpException(`This course id ${id} not found`, 404);
    }
    return course;
  }

  create(createCourseDto: Course): Course {
    this.courses.push(createCourseDto);
    return createCourseDto;
  }

  update(id: number, updateCourseDto: Course) {
    const course = this.findOne(id);
    course.name = updateCourseDto.name;
    course.description = updateCourseDto.description;
    course.tags = updateCourseDto.tags;
    return course;
  }

  remove(id: number) {
    const course = this.findOne(id);
    this.courses = this.courses.filter((c) => c.id !== id);
    this.courses.splice(this.courses.indexOf(course), 1);
  }
}
