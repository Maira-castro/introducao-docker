import { Test, TestingModule } from "@nestjs/testing"
import { UsersService } from "./users.service"
import { PrismaService } from "../prisma/prisma.service"
import { User } from "@prisma/client"

const mockPrisma = {
    users: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    }
}

describe("User Controller Tests", () => {
    let service: UsersService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                { provide: PrismaService, useValue: mockPrisma }
            ]
        }).compile()

        service = module.get<UsersService>(UsersService)
    })


    it("deve retornar todos os usuarios", async () => {
        const users = [
            { id: '1', name: 'stefane', email: 'stefane@gmail.com', phone: '40028922', typeUser: User.ADMINISTRADOR },
            { id: '2', name: 'maira', email: 'maira@gmail.com', phone: '40028922', typeUser: User.CLIENTE }]

        mockPrisma.users.findMany.mockResolvedValue(users)
        expect(await service.getUsers()).toEqual(users)
    })

    it("deve retornar um usuario pelo email", async () => {
        const users = [
            { id: '1', name: 'stefane', email: 'stefane@gmail.com', phone: '40028922', typeUser: User.ADMINISTRADOR },
            { id: '2', name: 'maira', email: 'maira@gmail.com', phone: '40028922', typeUser: User.CLIENTE }]

        mockPrisma.users.findUnique.mockResolvedValue(users[0])

        expect(await service.userByEmail(users[0].email)).toEqual(users[0])
        expect(mockPrisma.users.findUnique).toHaveBeenCalledWith({
            where:
                { email: users[0].email },
            omit: { password: true }
        })
    })

})
