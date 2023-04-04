import { Injectable } from '@nestjs/common';
import { UsersEntity } from 'src/app/users/users.entity';
import { UsersService } from 'src/app/users/users.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
        ){}
    async validateUser(email: string, password: string){
        let user: UsersEntity
        
        try{
            user = await this.userService.findByEmailOrFail(email)
            
        }catch(error){
            return null
        }

        const isPasswordValid = compareSync(password, user.password)
        if(!isPasswordValid) return null

        return user
    }

    async login(user: UsersEntity){
        const payload = {sub: user.id, email: user.email }

        return{
            token: this.jwtService.sign(payload)
        }
    }
}
