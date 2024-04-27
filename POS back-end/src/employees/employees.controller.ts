import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/images/employees',
        filename: (req, image, cd) => {
          const name = uuidv4();
          return cd(null, name + extname(image.originalname));
        },
      }),
    }),
  )
  create(
    @Body() createEmployeeDto: CreateEmployeeDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    if (image) {
      createEmployeeDto.image = image.filename;
    }
    return this.employeesService.create(createEmployeeDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(+id);
  }

  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  @Post(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/images/employees',
        filename: (req, image, cd) => {
          const name = uuidv4();
          return cd(null, name + extname(image.originalname));
        },
      }),
    }),
  )
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    if (image) {
      updateEmployeeDto.image = image.filename;
    }
    return this.employeesService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }
}
