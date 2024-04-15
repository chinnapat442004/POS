import { Module } from '@nestjs/common';
import { ReceiptItemsService } from './receipt-items.service';
import { ReceiptItemsController } from './receipt-items.controller';

@Module({
  controllers: [ReceiptItemsController],
  providers: [ReceiptItemsService],
})
export class ReceiptItemsModule {}
