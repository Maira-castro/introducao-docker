import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
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

});
