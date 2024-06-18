/**
 * @fileoverview Este archivo define la entidad users que representa la tabla de users en la base de datos MySQL.
 *
 * La entidad users incluye las siguientes propiedades:
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
import { ROLES } from "../../constants/ROLES";
import { IUser } from "../../interfaces/user.interfaces";
import { Column, Entity, JoinColumn, OneToOne} from "typeorm";

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

    @Column()
    password: string;

    @Column({type:'enum', enum: ROLES})
    role: ROLES;

    //estableciendo un relación uno a uno con la tabla profile_users
    @OneToOne(()=>ProfileEntity, {cascade:true, onDelete:'CASCADE'})
    @JoinColumn()
    profile:ProfileEntity;

    @Column()
    profileId: number;
}

