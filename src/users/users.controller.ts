import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
    constructor(
        private userService: UsersService
    ) { }

    @Get()
    @ApiOperation({ summary: 'Listar todos os usuários' })
    @ApiResponse({ status: 200, description: 'Lista retornada com sucesso' })
    async getUsers() {
        return this.userService.getUsers()
    }

    @Get(':email')
    @ApiOperation({ summary: 'Buscar usuário por email' })
    @ApiResponse({ status: 200, description: 'Usuário encontrado com sucesso' })
    @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
    @ApiParam({ name: 'email', description: 'Email do usuário' })
    async getUserEmail(@Param('email') email: string) {
        return this.userService.userByEmail(email)
    }
}
