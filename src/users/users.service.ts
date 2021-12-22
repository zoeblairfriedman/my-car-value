import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {
    this.repo = repo;
  }

  create(email: string, password: string){
    // hooks only run with an INSTANCE of an entity versus an object. save and remove run hooks if there's an instance
    const user = this.repo.create({email,password})

    return this.repo.save(user)
  }

  findOne(id: number){
    // could also be search criteria
    return this.repo.findOne(id);
  }

  find(email: string){
    return this.repo.find({email: email})
  }

  async update(id: number, attrs: Partial<User>){
    const user = await this.findOne(id)
    if (!user){
      throw new Error('user not found')
    }
    Object.assign(user, attrs)
    return this.repo.save(user)
  }

  async remove(id: number){
    const user = await this.findOne(id)
    if (!user){
      throw new Error('user not found')
    }
    return this.repo.remove(user)
  }
}
