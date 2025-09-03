import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from '../auth/dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { AdminGuard } from 'src/auth/admin.guard';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@UseGuards(JwtAuthGuard, AdminGuard)
@ApiBearerAuth()
@Controller('users')
export class UsersController {
    constructor(
        private userService: UsersService
    ) { }

    @Post()
    @ApiOperation({ summary: 'Cadastrar um novo usuário' })
    @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' })
    @ApiResponse({ status: 409, description: 'Email já cadastrado' })
    @ApiBody({ type: RegisterUserDto })
    async createUser(@Body() user: RegisterUserDto) {
        return this.userService.createUser(user)
    }

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

    @Put('/:id')
    @ApiOperation({ summary: 'Atualizar usuário por ID' })
    @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso' })
    @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
    @ApiParam({ name: 'id', description: 'ID do usuário' })
    @ApiBody({ type: UpdateUserDto })
    async putUser(@Param('id') id: string, @Body() newData: UpdateUserDto) {
        return this.userService.putUser(id, newData)
    }


    @Delete(':id')
    @ApiOperation({ summary: 'Deletar usuário por ID' })
    @ApiResponse({ status: 200, description: 'Usuário deletado com sucesso' })
    @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
    @ApiParam({ name: 'id', description: 'ID do usuário' })
    async delete(@Param('id') id: string) {
        return this.userService.deleteUser(id)
    }
}
