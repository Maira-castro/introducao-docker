import { Test, TestingModule } from "@nestjs/testing"
import { UsersService } from "./users.service"
import { PrismaService } from "../prisma/prisma.service"
import { User } from "@prisma/client"
import { RegisterUserDto } from "src/auth/dto/register-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"

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

    it("deve criar um novo usuario", async () => {
        const user: RegisterUserDto = {
            name: 'stefane', email: 'stefane@gmail.com', password: 'senha123', phone: '40028922'
        }
        const returnUser = { name: 'stefane', email: 'stefane@gmail.com', typeUser: User.CLIENTE }

        mockPrisma.users.findUnique.mockResolvedValue(null)
        mockPrisma.users.create.mockResolvedValue(returnUser)

        expect(await service.createUser(user)).toEqual(returnUser)
        expect(mockPrisma.users.create).toHaveBeenCalledWith({
            data: {
                name: user.name,
                email: user.email,
                password: user.password,
                phone: user.phone
            },
            select: {
                email: true,
                name: true,
                typeUser: true
            }
        })
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

    it("deve atualizar um novo usuario", async () => {
        const userDB = {
            id: '1', name: 'stefane', email: 'stefane@gmail.com', password: 'senha123', phone: '40028922', typeUser: User.CLIENTE
        }
        const update: UpdateUserDto = {
            password: '123senha'
        }

        const userUpdate = { ...userDB, ...update }

        mockPrisma.users.findUnique.mockResolvedValue(userDB)
        mockPrisma.users.update.mockResolvedValue(userUpdate)

        expect(await service.putUser(userDB.id, update)).toEqual(userUpdate)
        expect(mockPrisma.users.update).toHaveBeenCalledWith({
            where: { id: userDB.id },
            data: {
                name: update.name,
                email: update.email,
                password: update.password,
                phone: update.phone
            },
            omit: { password: true }
        })
    })

    it("deve deletar um usuario", async () => {
        const userDB = {
            id: '1', name: 'stefane', email: 'stefane@gmail.com', password: 'senha123', phone: '40028922', typeUser: User.CLIENTE
        }

        mockPrisma.users.delete.mockResolvedValue(userDB)
        mockPrisma.users.findUnique.mockResolvedValue(userDB)
        expect(await service.deleteUser(userDB.id)).toEqual(userDB)
        expect(mockPrisma.users.delete).toHaveBeenCalledWith({ where: { id: userDB.id } })
    })

})
