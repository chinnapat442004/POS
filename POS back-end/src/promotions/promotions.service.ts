import { Injectable } from '@nestjs/common';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { Promotion } from './entities/promotion.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PromotionsService {
  constructor(
    @InjectRepository(Promotion)
    private promotionsRepository: Repository<Promotion>,
  ) {}
  create(createPromotionDto: CreatePromotionDto) {
    return this.promotionsRepository.save(createPromotionDto);
  }

  findAll() {
    return this.promotionsRepository.find();
  }

  findOne(id: number) {
    return this.promotionsRepository.findOne({ where: { id } });
  }

  async update(id: number, updatePromotionDto: UpdatePromotionDto) {
    const promotion = await this.promotionsRepository.findOne({
      where: { id },
    });
    const update = { ...promotion, ...updatePromotionDto };
    return this.promotionsRepository.save(update);
  }

  async remove(id: number) {
    const promotion = await this.promotionsRepository.findOne({
      where: { id },
    });
    return this.promotionsRepository.remove(promotion);
  }
}
