import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { Product } from './products/entities/product.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ReceiptsModule } from './receipts/receipts.module';
import { Receipt } from './receipts/entities/receipt.entity';
import { EmployeesModule } from './employees/employees.module';
import { Employee } from './employees/entities/employee.entity';
import { AuthModule } from './auth/auth.module';
import { ReceiptItem } from './receipts/entities/receipt-item.entity';
import { MembersModule } from './members/members.module';
import { Member } from './members/entities/member.entity';

import { BranchesModule } from './branches/branches.module';
import { Branch } from './branches/entities/branch.entity';
import { PromotionsModule } from './promotions/promotions.module';
import { Promotion } from './promotions/entities/promotion.entity';
import { PromotionDetail } from './promotions/entities/promotionDetail';
import { RawMaterialsModule } from './raw-materials/raw-materials.module';
import { RawMaterial } from './raw-materials/entities/raw-material.entity';
import { BillsModule } from './bills/bills.module';
import { Bill } from './bills/entities/bill.entity';
import { BillDetail } from './bills/entities/billDetail.entity';
import { Size } from './products/entities/size.entity';
import { Type } from './products/entities/type.entity';
import { ProductDetailModule } from './product-detail/product-detail.module';
import { ProductDetail } from './product-detail/entities/product-detail.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [
        Bill,
        BillDetail,
        Product,
        ProductDetail,
        Receipt,
        Employee,
        ReceiptItem,
        Member,
        Branch,
        Promotion,
        PromotionDetail,
        RawMaterial,
        Size,
        Type,
      ],
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ProductsModule,
    ProductDetailModule,
    ReceiptsModule,
    EmployeesModule,
    AuthModule,
    MembersModule,
    MembersModule,
    BranchesModule,
    PromotionsModule,
    RawMaterialsModule,
    BillsModule,
    ProductDetailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
