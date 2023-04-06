import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersEntity } from 'src/app/users/users.entity';
import { UsersService } from 'src/app/users/users.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';
import { verify } from 'jsonwebtoken'
import { RefreshTokenEntity } from './refreshToken.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { error } from 'console';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
        @InjectRepository(RefreshTokenEntity)
        private readonly refreshTokenRepository: Repository<RefreshTokenEntity>
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

    async generateTokens(user: UsersEntity){
        const payload = {sub: user.id, email: user.email };
        console.log(user)
        const accessToken = this.jwtService.sign(payload, { expiresIn: 60 });
      
        const refreshToken = randomBytes(64).toString('hex');
        const refreshExpiresIn = 3600;
        const expiresAt = new Date(Date.now() + refreshExpiresIn * 1000);
      
        const refreshTokenEntity = new RefreshTokenEntity();
        refreshTokenEntity.token = refreshToken;
        refreshTokenEntity.userId = user.id;
        refreshTokenEntity.expiresAt = expiresAt;
      
        await this.refreshTokenRepository.save(refreshTokenEntity);
      
        return { accessToken, refreshToken };
    }

    async verifyRefreshToken(refreshToken: string){
        try{
            const refreshTokenEntity = await this.refreshTokenRepository.findOneByOrFail({ token: refreshToken });
            if (!refreshToken || !refreshTokenEntity || refreshTokenEntity.expiresAt < new Date()) {
                throw new UnauthorizedException('Invalid refresh token');
            }
            
            console.log('passou')
            //const { userId } = verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET) as { userId: string };
            
            return await this.userService.findOneOrFail(refreshTokenEntity.userId)
        }catch(error){
            throw new UnauthorizedException('Invalid refresh token')
        }
        
    }
      
      
}
