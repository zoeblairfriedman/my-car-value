import { AfterInsert, AfterRemove, AfterUpdate, Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  // this is a typeORM hook decorators. then you define a method
  @AfterInsert()
  logInsert() {
    console.log('Inserted User with id', this.id)
  }

  @AfterUpdate()
  logUpdate(){
    console.log("updated user", this.id)
  }

  @AfterRemove()
  logRemove(){
    console.log("removed user", this.id)
  }
}