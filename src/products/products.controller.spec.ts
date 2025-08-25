import { Test, TestingModule } from "@nestjs/testing";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { Produtos } from "@prisma/client";

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

const mockProductService = {
    createProduct: jest.fn(),
    getProducts: jest.fn(),
    productById: jest.fn(),
    putProduct: jest.fn(),
    deleteProduct: jest.fn()
}

describe("Products Controller Tests", () => {
    let controller: ProductsController
    let productsService: jest.Mocked<ProductsService>;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductsController],
            providers: [
                { provide: ProductsService, useValue: mockProductService }
            ]
        }).compile()

        productsService = module.get(ProductsService);
        controller = module.get<ProductsController>(ProductsController)
    })


    //* deve retornar todos os produtos
    it("deve retornar todos os produtos", async () => {

        productsService.getProducts.mockResolvedValue(data)

        const result = await controller.getProduct()

        expect(result).toEqual(data)
        expect(productsService.getProducts).toHaveBeenCalled()
    })

    //* deve cadastrar um novo produto
    it("deve cadastrar um novo produto", async () => {
        const newProduct = {
            name: "Macbook",
            price: 25.570,
            qtd: 89,
            brand: "Apple",
            category: "Eletrônico",
        }
        productsService.createProduct.mockResolvedValue({
            id: 3, createdAt: new Date(),
            updatedAt: new Date(), ...newProduct
        })

        const result = await controller.createProduct(newProduct)
        expect(result.id).toBe(3)
        expect(productsService.createProduct).toHaveBeenCalledWith(newProduct)
    })

    //* deve consultar um produto pelo ID
    it("deve consultar um produto pelo ID", async () => {
        const id = 1
        productsService.productById.mockResolvedValue(data[0])

        const result = await controller.productById(id)
        expect(result).toEqual(data[0])
        expect(productsService.productById).toHaveBeenCalledWith(id)
    })

    //* deve atualizar um produto
    it("deve atualizar um produto", async () => {

        const updateProducts = { name: "switch" }

        const newProduct = { ...data[0], ...updateProducts }

        productsService.putProduct.mockResolvedValue(newProduct)

        const result = await controller.updateProduct(data[0].id, updateProducts)

        expect(result.name).toEqual('switch')
        expect(result).toEqual(newProduct)
        expect(productsService.putProduct).toHaveBeenCalledWith(data[0].id, updateProducts)
    })

    //* deve deletar um produto 
    it("deve deletar um produto", async () => {

        productsService.deleteProduct.mockResolvedValue(data[0])

        const result = await controller.deleteProduct(data[0].id)
        expect(result).toEqual(data[0])
        expect(result.id).toEqual(1)
    })


})
