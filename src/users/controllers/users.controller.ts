import { Body, ClassSerializerInterceptor, Controller, Get, HttpException, HttpStatus, Param, Post, Req, UnauthorizedException, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from '../../auth/guards/local-auth.guard';
import { AuthService } from '../../auth/services/auth.service';
import { CreateUserDto } from '../dto/user.dtos';
import { UserService } from '../services/user.service'
import { User } from '../user.entity';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UserService, private authService: AuthService
    ) {}

  @Post('auth/sign-up')
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('me')
  async getProfile(@Req() req) {
    const user = await this.userService.findOne(req.user.email);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param() params) {
    const user = await this.userService.findOneId(params.id);
    return user;
  }
}
