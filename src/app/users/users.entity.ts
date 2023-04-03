import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import {hashSync} from 'bcrypt'

@Entity({name: 'users'})
export class UsersEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({name: "first_name"})
    firstName: string

    @Column({name: "last_name"})
    lastName: string

    @Column()
    email: string

    @Column()
    password: string

    @Column({name: "created_at"})
    createdAt: string
    @Column({name: "updated_at"})
    updatedAt: string
    @Column({name: "deleted_at"})
    deletedAt: string

    @BeforeInsert()
    hashPassword(){
        this.password = hashSync(this.password, 10)
    }
}