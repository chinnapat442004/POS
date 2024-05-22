import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EmployeesService } from '../employees/employees.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private employeesService: EmployeesService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const employee = await this.employeesService.findEmail(email);
    if (employee?.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = { sub: employee.id, username: employee.email };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = employee;
    return {
      employee: result,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
