import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterUserDto } from 'src/auth/dto/register-user.dto';
import { User } from '@prisma/client';

const mockUserService = {
    createUser: jest.fn(),
    getUsers: jest.fn(),
    userByEmail: jest.fn(),
    putUser: jest.fn(),
    deleteUser: jest.fn(),
}
describe("User Controller Tests", () => {
    let controller: UsersController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                { provide: UsersService, useValue: mockUserService }
            ]
        }).compile()

        controller = module.get<UsersController>(UsersController)
    })

    //criar usuario
    it('Criação de usuario', async () => {

        const user: RegisterUserDto = {
            name: 'stefane', email: 'stefane@gmail.com', password: 'senha123', phone: '40028922'
        }
        const returnUser = {
            name: 'stefane', email: 'stefane@gmail.com', typeUser: User.CLIENTE
        }
        mockUserService.createUser.mockResolvedValue(returnUser) //o que espero de retorno

        expect(await controller.createUser(user)).toEqual(returnUser)
        expect(mockUserService.createUser).toHaveBeenCalledWith(user)
    })

    //retornar todos os usuario
    it('retornar todos os usuarios', async () => {
        const users = [
            { id: '1', name: 'stefane', email: 'stefane@gmail.com', phone: '40028922', typeUser: User.ADMINISTRADOR },
            { id: '2', name: 'maira', email: 'maira@gmail.com', phone: '40028922', typeUser: User.CLIENTE }]

        mockUserService.getUsers.mockResolvedValue(users)
        expect(await controller.getUsers()).toEqual(users)
    })

    it('retornar um usuario pelo email', async () => {
        const users = [
            { id: '1', name: 'stefane', email: 'stefane@gmail.com', phone: '40028922', typeUser: User.ADMINISTRADOR },
            { id: '2', name: 'maira', email: 'maira@gmail.com', phone: '40028922', typeUser: User.CLIENTE }]

        mockUserService.userByEmail.mockResolvedValue(users[0])
        expect(await controller.getUserEmail(users[0].email)).toEqual(users[0])
        expect(mockUserService.userByEmail).toHaveBeenCalledWith(users[0].email)
    })

    //*atualizar usuario
    it("deve atualizar um usuario", async () => {
        const userDB = { id: '1', name: 'stefane', email: 'stefane@gmail.com', phone: '40028922', typeUser: User.ADMINISTRADOR }
        const user: UpdateUserDto = {
            name: 'luna'
        }
        const Update = { ...userDB, ...user }//a atualização

        mockUserService.putUser.mockResolvedValue(Update)

        expect(await controller.putUser(userDB.id, user)).toEqual(Update)
        expect(mockUserService.putUser).toHaveBeenCalledWith(userDB.id, user)
    })

    //*deve deletar um usuario 
    it('deve deletar um usuario', async () => {
        const user = {
            id: '1', name: 'stefane', email: 'stefane@gmail.com', password: 'senha123', phone: '40028922', typeUser: User.ADMINISTRADOR
        }

        mockUserService.deleteUser.mockResolvedValue(user)

        expect(await controller.delete(user.id)).toEqual(user)
        expect(mockUserService.deleteUser).toHaveBeenCalledWith(user.id)
    })
});
