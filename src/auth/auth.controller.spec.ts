import { Test, TestingModule } from "@nestjs/testing"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import { RegisterUserDto } from "./dto/register-user.dto"
import { LoginDto } from "./dto/login.dto"
import { LoginResponseDto } from "./dto/login-response.dto"

const mockAuthService = {
    Register: jest.fn(),
    RegisterAdmin: jest.fn(),
    validateUser: jest.fn(),
    login: jest.fn()
}
describe("Auth Controller Tests", () => {
    let controller: AuthController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                { provide: AuthService, useValue: mockAuthService }
            ]
        }).compile()

        controller = module.get<AuthController>(AuthController)
    })


    it("Register(CLIENTE)", async () => {
        const user: RegisterUserDto = {
            name: 'stefane', email: 'stefane@gmail.com', password: 'senha123', phone: '40028922'
        }

        mockAuthService.Register.mockResolvedValue(user)
        expect(await controller.register(user)).toEqual(user)
        expect(mockAuthService.Register).toHaveBeenCalledWith(user)
    })

    it("Register(ADMINISTRADOR)", async () => {
        const user: RegisterUserDto = {
            name: 'stefane', email: 'stefane@gmail.com', password: 'senha123', phone: '40028922'
        }

        mockAuthService.RegisterAdmin.mockResolvedValue(user)
        expect(await controller.registerAdmin(user)).toEqual(user)
        expect(mockAuthService.RegisterAdmin).toHaveBeenCalledWith(user)
    })

    it("login", async () => {
        const login: LoginDto = { email: 'stefane@gmail.com', password: 'senha123' }

        const token: LoginResponseDto = {
            access_token: 'sdsfd'
        }

        mockAuthService.login.mockResolvedValue(token) //a resposta esperada

        expect(await controller.login(login)).toEqual(token) //
        expect(mockAuthService.login).toHaveBeenCalledWith(login)
    })

})