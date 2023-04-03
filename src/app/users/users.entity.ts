import { Column, PrimaryGeneratedColumn } from "typeorm"

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
}