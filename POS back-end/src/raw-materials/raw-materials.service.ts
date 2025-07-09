import { Injectable } from '@nestjs/common';
import { CreateRawMaterialDto } from './dto/create-raw-material.dto';
import { UpdateRawMaterialDto } from './dto/update-raw-material.dto';
import { RawMaterial } from './entities/raw-material.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RawMaterialsService {
  constructor(
    @InjectRepository(RawMaterial)
    private rawMaterialsRepository: Repository<RawMaterial>,
  ) {}
  create(createRawMaterialDto: CreateRawMaterialDto) {
    if (createRawMaterialDto.quantity >= createRawMaterialDto.minimum) {
      createRawMaterialDto.status = 'In stock';
    } else if (createRawMaterialDto.quantity > 0) {
      createRawMaterialDto.status = 'Row stock';
    } else {
      createRawMaterialDto.status = 'Out of stock';
    }
    return this.rawMaterialsRepository.save(createRawMaterialDto);
  }

  findAll() {
    return this.rawMaterialsRepository.find();
  }

  findOne(id: number) {
    return this.rawMaterialsRepository.findOne({ where: { id } });
  }

  async update(id: number, updateRawMaterialDto: UpdateRawMaterialDto) {
    const update = await this.rawMaterialsRepository.findOne({ where: { id } });

    const rawMaterial = { ...update, ...updateRawMaterialDto };

    if (rawMaterial.quantity >= rawMaterial.minimum) {
      rawMaterial.status = 'In stock';
    } else if (rawMaterial.quantity > 0) {
      rawMaterial.status = 'Row stock';
    } else {
      rawMaterial.status = 'Out of stock';
    }
    return this.rawMaterialsRepository.save(rawMaterial);
  }

  async remove(id: number) {
    const rawMaterial = await this.rawMaterialsRepository.findOne({
      where: { id },
    });
    return this.rawMaterialsRepository.remove(rawMaterial);
  }

  async findRawMaterialByStatus(status: string) {
    return this.rawMaterialsRepository.find({ where: { status } });
  }
}
