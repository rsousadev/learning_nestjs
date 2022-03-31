import { Controller, Get, Param } from '@nestjs/common';

@Controller('courses')
export class CoursesController {
  @Get('list')
  findAll(): string {
    return 'find all courses';
  }
  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `find one course ${id}`;
  }
}
