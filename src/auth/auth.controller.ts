import { BadRequestException, Body, Controller, HttpException, Post, Req, UseGuards } from '@nestjs/common';
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
            throw new HttpException(error, 400, { cause: new Error("Some Error") })
        }
    }

    @Post('refresh-token')
    async refreshToken(@Body('refreshToken') ReqRefreshToken: string) {
        try{
            const  user  = await this.authService.verifyRefreshToken(ReqRefreshToken);
            const { accessToken, refreshToken } = await this.authService.generateTokens(user);
    
            return { accessToken, refreshToken};

        }catch(error){
            throw new HttpException(error, 400, { cause: new Error("Some Error") })
        }
}

}
