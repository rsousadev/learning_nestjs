import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
@Controller('courses')
export class CoursesController {
  constructor(private readonly courseService: CoursesService) {}

  @Get()
  findAll(): Promise<Course[]> {
    return this.courseService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Course> {
    return this.courseService.findOne(id);
  }
  @Post()
  create(@Body() CreateCourseDto: CreateCourseDto): Promise<Course> {
    return this.courseService.create(CreateCourseDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ): Promise<Course> {
    return this.courseService.update(id, updateCourseDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Course> {
    return this.courseService.remove(id);
  }
}
