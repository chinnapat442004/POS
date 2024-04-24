import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { Product } from './products/entities/product.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ReceiptItemsModule } from './receipt-items/receipt-items.module';
import { ReceiptItem } from './receipt-items/entities/receipt-item.entity';
import { ReceiptsModule } from './receipts/receipts.module';
import { Receipt } from './receipts/entities/receipt.entity';
import { EmployeesModule } from './employees/employees.module';
import { Employee } from './employees/entities/employee.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Product, ReceiptItem, Receipt, Employee],
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ProductsModule,
    ReceiptItemsModule,
    ReceiptsModule,
    EmployeesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
