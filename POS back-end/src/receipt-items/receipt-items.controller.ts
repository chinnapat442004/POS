import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReceiptItemsService } from './receipt-items.service';
import { CreateReceiptItemDto } from './dto/create-receipt-item.dto';
import { UpdateReceiptItemDto } from './dto/update-receipt-item.dto';

@Controller('receipt-items')
export class ReceiptItemsController {
  constructor(private readonly receiptItemsService: ReceiptItemsService) {}

  @Post()
  create(@Body() createReceiptItemDto: CreateReceiptItemDto) {
    return this.receiptItemsService.create(createReceiptItemDto);
  }

  @Get()
  findAll() {
    return this.receiptItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.receiptItemsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReceiptItemDto: UpdateReceiptItemDto,
  ) {
    return this.receiptItemsService.update(+id, updateReceiptItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.receiptItemsService.remove(+id);
  }
}
