import { Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './services/auth/auth.service';
import { GoogleGuard } from './guards/google.guard';
import { TwitterGuard } from './guards/twitter.guard';
import { GithubGuard } from './guards/github.guard';
import { Web3Guard } from './guards/web3.guard';
import { Web3LoginDto } from './dto/web3-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(GoogleGuard)
  @Get('/google')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async loginGoogle() {}

  @UseGuards(GoogleGuard)
  @Get('/google/callback')
  async callbackGoogle(@Req() request, @Res() response: Response) {
    return await this.authService.signIn(response, request.user);
  }

  @UseGuards(TwitterGuard)
  @Get('/twitter')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async loginTwitter() {}

  @UseGuards(TwitterGuard)
  @Get('/twitter/callback')
  async callbackTwitter(@Req() request, @Res() response: Response) {
    return await this.authService.signIn(response, request.user);
  }

  @UseGuards(GithubGuard)
  @Get('/github')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async loginGithub() {}

  @UseGuards(GithubGuard)
  @Get('/github/callback')
  async callbackGithub(@Req() request, @Res() response: Response) {
    return await this.authService.signIn(response, request.user);
  }

  @UseGuards(Web3Guard)
  @Get('/web3')
  async loginWeb3(
    @Req() request,
    @Res() response: Response,
    // we do not need the query params, adding them here only to describe the method for the openapi
    @Query() _: Web3LoginDto,
  ) {
    return await this.authService.signIn(response, request.user);
  }

  @Get('/logout')
  async logout(@Res() response: Response) {
    return await this.authService.logout(response);
  }
}
