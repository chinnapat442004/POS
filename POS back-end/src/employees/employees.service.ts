import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}
  create(createEmployeeDto: CreateEmployeeDto) {
    const employee = new Employee();
    employee.name = createEmployeeDto.name;
    employee.email = createEmployeeDto.email;
    employee.password = createEmployeeDto.password;
    employee.role = createEmployeeDto.role;

    if (createEmployeeDto.image && createEmployeeDto.image !== '') {
      employee.image = createEmployeeDto.image;
    }

    return this.employeeRepository.save(employee);
  }

  findAll() {
    return this.employeeRepository.find();
  }

  findOne(id: number) {
    return this.employeeRepository.findOne({ where: { id } });
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const employee = await this.employeeRepository.findOne({ where: { id } });

    employee.email = updateEmployeeDto.email;
    employee.password = updateEmployeeDto.password;
    employee.role = updateEmployeeDto.role;
    employee.name = updateEmployeeDto.name;

    if (employee.image && employee.image != '') {
      employee.image = updateEmployeeDto.image;
    }
    return this.employeeRepository.save(employee);
  }

  async remove(id: number) {
    const employee = await this.employeeRepository.findOne({ where: { id } });
    return this.employeeRepository.remove(employee);
  }
}
