import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    @UseGuards(AuthGuard('local'))
    @Post('/login')
    async login(@Req() req: any){
        return await this.authService.generateTokens(req.user)  
    }

    @Post('refresh-token')
    async refreshToken(@Body('refreshToken') ReqRefreshToken: string) {
        const  user  = await this.authService.verifyRefreshToken(ReqRefreshToken);
        const { accessToken, refreshToken } = await this.authService.generateTokens(user);

        return { accessToken, refreshToken};
}

}
