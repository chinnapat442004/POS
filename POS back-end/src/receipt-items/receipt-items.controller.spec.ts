import { Test, TestingModule } from '@nestjs/testing';
import { ReceiptItemsController } from './receipt-items.controller';
import { ReceiptItemsService } from './receipt-items.service';

describe('ReceiptItemsController', () => {
  let controller: ReceiptItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReceiptItemsController],
      providers: [ReceiptItemsService],
    }).compile();

    controller = module.get<ReceiptItemsController>(ReceiptItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
