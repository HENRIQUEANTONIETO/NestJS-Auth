import { BadRequestException, Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    @UseGuards(AuthGuard('local')) 
    @Post('/login')
    async login(@Req() req: any){
        try{
            return await this.authService.generateTokens(req.user)  

        }catch(error){
            console.log('aa')
            return new BadRequestException(error)
        }
    }

    @Post('refresh-token')
    async refreshToken(@Body('refreshToken') ReqRefreshToken: string) {
        try{
            const  user  = await this.authService.verifyRefreshToken(ReqRefreshToken);
            const { accessToken, refreshToken } = await this.authService.generateTokens(user);
    
            return { accessToken, refreshToken};

        }catch(error){
            return new BadRequestException(error)
        }
}

}
