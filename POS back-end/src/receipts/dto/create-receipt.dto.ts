import { Employee } from 'src/employees/entities/employee.entity';
import { Product } from 'src/products/entities/product.entity';

export class CreateReceiptDto {
  receiptItems: {
    quantity: number;
    total: number;
    product: Product;
  }[];
  employee: Employee;
}
