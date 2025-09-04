import { Body, Controller, Delete, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { ProfileService } from './profile.service';
import { UpdateUserDto } from 'src/auth/dto/update-user';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('profile')
export class ProfileController {
    constructor(
        private profileService: ProfileService
    ) { }

    @Put()
    @ApiOperation({ summary: 'Atualizar usuário' })
    @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso' })
    @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
    @ApiBody({ type: UpdateUserDto })
    async putUser(@Req() req, @Body() newData: UpdateUserDto) {
        const userId = req.user.userId
        return this.profileService.putUser(userId, newData)
    }


    @Delete()
    @ApiOperation({ summary: 'Deletar usuário por ID' })
    @ApiResponse({ status: 200, description: 'Usuário deletado com sucesso' })
    @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
    async delete(@Req() req) {
        const userId = req.user.userId
        return this.profileService.deleteUser(userId)
    }
}
