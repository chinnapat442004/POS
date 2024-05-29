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
    return this.rawMaterialsRepository.save(createRawMaterialDto);
  }

  findAll() {
    return this.rawMaterialsRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} rawMaterial`;
  }

  update(id: number, updateRawMaterialDto: UpdateRawMaterialDto) {
    return `This action updates a #${id} rawMaterial`;
  }

  remove(id: number) {
    return `This action removes a #${id} rawMaterial`;
  }
}
