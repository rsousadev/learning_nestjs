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

@Controller('courses')
export class CoursesController {
  constructor(private readonly courseService: CoursesService) {}

  @Get()
  findAll(): any {
    return this.courseService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: number): any {
    return this.courseService.findOne(Number(id));
  }
  @Post()
  create(@Body() body: any): any {
    return this.courseService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() body: any): any {
    return this.courseService.update(Number(id), body);
  }
  @Delete(':id')
  remove(@Param('id') id: number): any {
    return this.courseService.remove(Number(id));
  }
}
