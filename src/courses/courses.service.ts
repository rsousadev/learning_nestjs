import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { Tag } from './entities/tag.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,

    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
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

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const tags = await Promise.all(
      createCourseDto.tags.map((name) => this.preloadTagByName(name)),
    );
    const course = this.courseRepository.create({
      ...createCourseDto,
      tags,
    });
    return this.courseRepository.save(course);
  }

  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const tags =
      updateCourseDto.tags &&
      (await Promise.all(
        updateCourseDto.tags.map((name) => this.preloadTagByName(name)),
      ));

    const course = await this.courseRepository.preload({
      id: +id,
      ...updateCourseDto,
      tags,
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

  private async preloadTagByName(name: string): Promise<Tag> {
    const tag = await this.tagRepository.findOneBy({ name });

    if (tag) {
      return tag;
    }

    return this.tagRepository.create({ name });
  }
}
