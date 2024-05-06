import { Injectable } from '@nestjs/common';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Receipt } from './entities/receipt.entity';
import { Repository } from 'typeorm';
import { ReceiptItem } from './entities/receipt-item.entity';

@Injectable()
export class ReceiptsService {
  constructor(
    @InjectRepository(Receipt)
    private receiptsRepository: Repository<Receipt>,
    @InjectRepository(ReceiptItem)
    private receiptItemsRepository: Repository<Receipt>,
  ) {}
  create(createReceiptDto: CreateReceiptDto) {
    return this.receiptsRepository.save(createReceiptDto);
  }

  findAll() {
    return this.receiptsRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} receipt`;
  }

  update(id: number, updateReceiptDto: UpdateReceiptDto) {
    return `This action updates a #${id} receipt`;
  }

  remove(id: number) {
    return `This action removes a #${id} receipt`;
  }
}
