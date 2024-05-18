import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MembersService {
  @InjectRepository(Member)
  private membersRepository: Repository<Member>;
  create(createMemberDto: CreateMemberDto) {
    return this.membersRepository.save(createMemberDto);
  }

  findAll() {
    return this.membersRepository.find();
  }

  findOne(id: number) {
    return this.membersRepository.findOneOrFail({ where: { id } });
  }

  findOneByPhone(phone: string) {
    return this.membersRepository.findOne({ where: { phone } });
  }

  async update(id: number, updateMemberDto: UpdateMemberDto) {
    const memberId = await this.membersRepository.findOne({ where: { id } });
    const update = { ...memberId, ...updateMemberDto };
    return this.membersRepository.save(update);
  }

  async remove(id: number) {
    const memberId = await this.membersRepository.findOne({ where: { id } });
    return this.membersRepository.remove(memberId);
  }
}
