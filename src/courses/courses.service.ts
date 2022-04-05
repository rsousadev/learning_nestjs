import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  findAll(): Promise<Course[]> {
    return this.courseRepository.find();
  }

  findOne(id: string): Promise<Course> {
    const course = this.courseRepository.findOneBy({ id: +id });
    if (!course) {
      throw new NotFoundException(`This course id ${id} not found`);
    }
    return course;
  }

  create(createCourseDto: CreateCourseDto): Promise<Course> {
    const course = this.courseRepository.create(createCourseDto);
    return this.courseRepository.save(course);
  }

  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const course = await this.courseRepository.preload({
      id: +id,
      ...updateCourseDto,
    });
    if (!course) {
      throw new NotFoundException(`This course id ${id} not found`);
    }
    return this.courseRepository.save(course);
  }

  async remove(id: string): Promise<Course> {
    const course = await this.courseRepository.findOneBy({ id: +id });
    if (!course) {
      throw new NotFoundException(`This course id ${id} not found`);
    }
    return this.courseRepository.remove(course);
  }
}
