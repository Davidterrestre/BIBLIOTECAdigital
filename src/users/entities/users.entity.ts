/**
 * @fileoverview Este archivo define la entidad UsersEntity que representa la tabla de users en la base de datos MySQL.
 *
 * La entidad UsersEntity incluye las siguientes propiedades:
 *  - id: identificador heredado de la clase BaseEntity.
 *  - createAt: fecha de creación heredada de la clase BaseEntity.
 *  - updateAt: fecha de creación heredada de la clase BaseEntity.
 *  - username: username de la cuenta
 *  - email: dirección de correo electrónico
 *  - password: contraseña de la cuenta
 *  - role: rol designado en la webApp 
 */

import { ProfileEntity } from "../../profiles/entities/profiles.entity";
import { BaseEntity } from "../../config/base.entity";
import {Exclude } from 'class-transformer'
import { ROLES } from "../../constants/roles";
import { IUser } from "../../interfaces/user.interfaces";
import { Column, Entity, JoinColumn,OneToMany, OneToOne} from "typeorm";
import { LoansEntity } from "../../loans/entities/loans.entity";

/**
 * Entidad que representa en la BD la tabla 'users'
 * Hereda de una clase abstracta e implementa la interfaz IUser
 */

@Entity({name: 'users'})
export class UsersEntity extends BaseEntity implements IUser{
    @Column()
    username: string;

    @Column()
    email: string;

    @Exclude()//de esta forma escondemos la contraseña en las búsquedas de Bd, SI LA QUEREMOS VER LO DESACTIVAMOS
    @Column()
    password: string;

    @Column({type:'enum', enum: ROLES, default: ROLES.BASIC})
    role: ROLES;

    //estableciendo un relación uno a uno con la tabla profile_users
    @OneToOne(()=>ProfileEntity, { cascade: true, onDelete: 'CASCADE', nullable: true })
    @JoinColumn()
    profile:ProfileEntity | null;

    @Column({ nullable: true })
    profileId: number | null;

    //Estableciendo una relación uno a mmuchos con "loans"
    @OneToMany(()=>LoansEntity, loans => loans.user)    
    loans: LoansEntity[];
}

