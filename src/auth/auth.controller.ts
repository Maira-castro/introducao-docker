import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { ApiBearerAuth, ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { AdminGuard } from './admin.guard';
import { JwtAuthGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService) { }

    @Post('register')
    @ApiBody({ type: RegisterUserDto })
    @ApiOperation({ summary: 'Cadastrar usuario cliente' })
    @ApiCreatedResponse({ description: 'Usuário registrado com sucesso.' })
    @ApiConflictResponse({ description: 'Email e/ou telefone já está em uso.' })
    async register(@Body() dto: RegisterUserDto) {
        return this.authService.Register(dto)
    }

    @UseGuards(JwtAuthGuard, AdminGuard)
    @ApiBearerAuth()
    @Post('register-admin')
    @ApiBody({ type: RegisterUserDto })
    @ApiOperation({ summary: 'Cadastrar usuario administrador' })
    @ApiCreatedResponse({ description: 'Usuário registrado com sucesso.' })
    @ApiConflictResponse({ description: 'Email e/ou telefone já está em uso.' })
    async registerAdmin(@Body() dto: RegisterUserDto) {
        return this.authService.RegisterAdmin(dto)
    }

    @Post('login')
    @ApiBody({ type: LoginDto })
    @ApiOperation({ summary: 'logar usuarios' })
    @ApiCreatedResponse({ description: 'Usuario logado com sucesso' })
    @ApiConflictResponse({ description: 'email e/ou senha inválida' })
    async login(@Body() login: LoginDto) {
        return this.authService.login(login)
    }
}
