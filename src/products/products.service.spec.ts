import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "../prisma/prisma.service";
import { ProductsService } from "./products.service";
import { Produtos } from "@prisma/client";
import { createProductDto } from "./dto/create-products.dto";

//! TESTAR NOVAMENTE 

const data: Produtos[] = [{
    id: 1,
    name: "Computador",
    price: 12.560,
    qtd: 12,
    brand: "Apple",
    category: "Eletronico",
    createdAt: new Date(),
    updatedAt: new Date()
},
{
    id: 2,
    name: "Teclado",
    price: 250,
    qtd: 10,
    brand: "Apple",
    category: "Eletronico",
    createdAt: new Date(),
    updatedAt: new Date()
}]

const mockPrisma = {
    produtos: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    }
}

describe("Products Service ", () => {
    let service: ProductsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProductsService,
                { provide: PrismaService, useValue: mockPrisma },
            ],
        }).compile();

        service = module.get<ProductsService>(ProductsService);
    });


    //* 01. deve testar a criação de um produto
    it("deve testar a criação de um produto", async () => {
        const newProduct = {
            name: "Computador",
            price: 12.560,
            qtd: 12,
            brand: "Apple",
            category: "Eletronico",
        }
        mockPrisma.produtos.create.mockResolvedValue(data[1])
        const result = await service.createProduct(newProduct)

        expect(result).toEqual(data[1])

        expect(mockPrisma.produtos.create).toHaveBeenCalledWith({ data: newProduct })
    })

    // *02. Teste para o método retornar todos
    it("deve retornar todos os produtos", async () => {
        mockPrisma.produtos.findMany.mockResolvedValue(data);

        const result = await service.getProducts()
        expect(result).toEqual(data)
    })

    // * 03. Teste para o método retornar por id
    it("deve retornar um prooduto pelo id", async () => {
        mockPrisma.produtos.findUnique.mockResolvedValue(data);

        const result = await service.productById(data[0].id)
        expect(result).toEqual(data)
        expect(mockPrisma.produtos.findUnique).toHaveBeenCalledWith({ where: { id: data[0].id } });
    })

    //* 04.Teste para o método update
    it("deve atualizar um produto pelo id", async () => {
        const updateData = { name: "Teclado", price: 250 }

        const updatePlace = { id: data[1].id, ...updateData };
        mockPrisma.produtos.update.mockResolvedValue(updatePlace);
        const result = await service.putProduct(data[1].id, updateData);

        expect(result).toEqual(updatePlace);
        expect(mockPrisma.produtos.update).toHaveBeenCalledWith({
            where: { id: data[1].id },
            data: updateData
        });

    })

    //* 05.Teste para o método delete
    it("deve deletar um produto pelo id", async () => {
        mockPrisma.produtos.delete.mockResolvedValue(data[1]);

        const result = await service.deleteProduct(data[1].id)
        expect(result).toEqual(data[1])
        expect(mockPrisma.produtos.delete).toHaveBeenCalledWith({ where: { id: data[1].id } });
    })

    //*06. deve retornar um erro ao não encontrar produto pelo ID
    it("deve retornar um erro ao não encontrar produto pelo ID", async () => {
        mockPrisma.produtos.findUnique.mockResolvedValue(null)

        await expect(service.productById(4)).rejects.toThrow("ID não encontrado!");
    })

    //*07. deve retornar um erro ao não encontrar produto pelo ID(delete)
    it("deve retornar um erro ao não encontrar produto pelo ID(delete)", async () => {
        mockPrisma.produtos.delete.mockResolvedValue(null)

        await expect(service.deleteProduct(4)).rejects.toThrow('Produto não encontrado');
    })

});

