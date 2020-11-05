import {Entity,PrimaryGeneratedColumn,Column,Timestamp} from 'typeorm';
import {Exclude} from 'class-transformer'
@Entity()
export class User{
    @PrimaryGeneratedColumn({comment:"主键用户Id"})
    id:number;

    @Column({comment: '用户姓名',nullable:true})
    userName: string;

    @Exclude()
    @Column({comment: '用户密码'})
    passWord: string;

    @Exclude()
    @Column({comment: '用户邮箱',nullable:true})
    email: string;

    @Column({
        type: 'timestamp',
        onUpdate: 'current_timestamp',
        default: () => 'current_timestamp',
    })
    updateAt: Timestamp;

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }
}