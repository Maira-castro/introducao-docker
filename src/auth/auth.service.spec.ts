import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt'

const mockPrisma = {
  users: {
    create: jest.fn(),
    findUnique: jest.fn()
  }
}

const mockJwt = {
  sign: jest.fn()
}

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
  compare: jest.fn()
})
)

describe('AuthService', () => {
  let service: AuthService;
  let jwt: JwtService;
  let prisma: PrismaService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, {
        provide: PrismaService, useValue: mockPrisma
      }, { provide: JwtService, useValue: mockJwt }],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwt = module.get<JwtService>(JwtService);
    prisma = module.get<PrismaService>(PrismaService);

  });

  //*deve registrar um usuario(CLIENTE)
 it('deve registrar um usuario', async () => {
    const user: RegisterUserDto = {
      name: 'Maira', email: 'maira@gmail.com', password: 'senha123', phone: '88996343397'
    };

    const createdUser = {
      name: 'Maira',
      email: 'maira@gmail.com',
      phone: '88996343397',
      typeUser: 'CLIENTE',
    };

    (bcrypt.hash as jest.Mock).mockResolvedValue('mocked-hashed-password');
    mockPrisma.users.findUnique.mockResolvedValue(null)
    mockPrisma.users.create.mockResolvedValue(createdUser);

    const result = await service.Register(user);
    expect(mockPrisma.users.findUnique).toHaveBeenCalledWith({
      where: {
        email: user.email // use 'user.email' para manter a consistência com a entrada
      }
    })

    expect(result).toEqual(createdUser);
    expect(mockPrisma.users.create).toHaveBeenCalledWith({
      data: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        password: 'mocked-hashed-password' // Verifique se a senha é o valor mockado
      },
      select: {
        name: true,
        email: true,
        phone: true,
        typeUser: true
      }
    });
  });

  //* deve registrar um usuario (admin)
  it('deve registrar um usuario (admin)', async () => {
    const user: RegisterUserDto = {
      name: 'Maira', email: 'maira@gmail.com', password: 'senha123', phone: '88996343397'
    };

    const createdUser = {
      name: 'Maira',
      email: 'maira@gmail.com',
      phone: '88996343397',
      typeUser: 'ADMINISTRADOR',
    };
    
  (bcrypt.hash as jest.Mock).mockResolvedValue('mocked-hashed-password');

    mockPrisma.users.findUnique.mockResolvedValue(null); // Adicionei esta linha para o teste
    mockPrisma.users.create.mockResolvedValue(createdUser);

    const result = await service.RegisterAdmin(user);

    expect(mockPrisma.users.findUnique).toHaveBeenCalledWith({ where: { email: user.email }});
    expect(result).toEqual(createdUser);
    expect(mockPrisma.users.create).toHaveBeenCalledWith({
      data: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        password: 'mocked-hashed-password',
        typeUser: 'ADMINISTRADOR'
      },
      select: {
        name: true,
        email: true,
        phone: true,
        typeUser: true
      }
    });
  });


  //* valida usuario
  it("verifica validate", async () => {

    const user: LoginDto = {
      email: 'maira@gmail.com',
      password: 'senha123'
    };
    const returnUser = {
      id: '123456789',
      name: 'Maira',
      email: 'maira@gmail.com',
      phone: '88996343397',
      typeUser: 'ADMINISTRADOR',
      password: 'senha123' // A senha salva no banco (neste mock, não é o hash real).
    };
    mockPrisma.users.findUnique.mockResolvedValue(returnUser);
(bcrypt.compare as jest.Mock).mockResolvedValue(true); 

    const result = await service.validateUser(user.email, user.password);

    expect(mockPrisma.users.findUnique).toHaveBeenCalledWith({ where: { email: user.email } });
    expect(bcrypt.compare).toHaveBeenCalledWith(user.password, returnUser.password);
    expect(result).toEqual(returnUser);
  });


  //loga

it('deve retornar um token de acesso para credenciais válidas', async () => {
    // 1. Arrange (Preparação)
    const userCredentials = {
      email: 'maira@gmail.com',
      password: 'senha123',
    };

    const userFromDb = {
      id: 'user-id-123',
      name: 'Maira',
      email: 'maira@gmail.com',
      password: 'hashed-password-123',
      typeUser: 'ADMINISTRADOR',
      phone: '88996343397'
    };

    // Mocka o comportamento das dependências
    mockPrisma.users.findUnique.mockResolvedValue(userFromDb);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true); // Simula a validação da senha com sucesso

    mockJwt.sign.mockReturnValue('mocked-jwt-token');

    // 2. Act (Execução)
    const result = await service.login(userCredentials);

    // 3. Assert (Verificação)
    // Verifica se os métodos foram chamados corretamente
    expect(mockPrisma.users.findUnique).toHaveBeenCalledWith({ where: { email: userCredentials.email } });
    expect(bcrypt.compare).toHaveBeenCalledWith(userCredentials.password, userFromDb.password);
    
    // Verifica se o payload do JWT foi construído corretamente
    const expectedPayload = {
      sub: userFromDb.id,
      typeUser: userFromDb.typeUser,
      email: userFromDb.email,
    };
    expect(jwt.sign).toHaveBeenCalledWith(expectedPayload);
    
    // Verifica se o resultado do login é o objeto de token esperado
    expect(result).toEqual({access_token:'mocked-jwt-token'})
    ;
  });

})
