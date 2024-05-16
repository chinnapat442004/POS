import { Injectable } from '@nestjs/common';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Receipt } from './entities/receipt.entity';
import { DataSource, Repository } from 'typeorm';
import { ReceiptItem } from './entities/receipt-item.entity';

@Injectable()
export class ReceiptsService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Receipt)
    private receiptsRepository: Repository<Receipt>,
    @InjectRepository(ReceiptItem)
    private receiptItemsRepository: Repository<Receipt>,
  ) {}
  async create(createReceiptDto: CreateReceiptDto) {
    const receipt = new Receipt();
    receipt.total = 0;
    receipt.receiptItems = [];
    receipt.employee = null;
    for (const item of createReceiptDto.receiptItems) {
      const receiptItem = new ReceiptItem();
      receiptItem.product = item.product;
      receiptItem.quantity = item.quantity;
      receiptItem.total = item.total;

      await this.receiptItemsRepository.save(receiptItem);
      receipt.receiptItems.push(receiptItem);
      receipt.total += receiptItem.total;
      receipt.employee = await createReceiptDto.employee;
    }

    return this.receiptsRepository.save(receipt);
  }

  findAll() {
    return this.receiptsRepository.find({
      relations: ['receiptItems', 'receiptItems.product', 'employee', 'member'],
      order: { created: 'desc' },
    });
  }

  findOne(id: number) {
    return this.receiptsRepository.findOneOrFail({
      where: { id },
      relations: ['receiptItems', 'receiptItems.product', 'employee', 'member'],
    });
  }

  update(id: number, updateReceiptDto: UpdateReceiptDto) {
    return `This action updates a #${id} receipt`;
  }

  remove(id: number) {
    return `This action removes a #${id} receipt`;
  }
}
