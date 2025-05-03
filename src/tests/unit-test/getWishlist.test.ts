import { WishlistService } from "../../services/juego/wishlist.service";
import { WishlistRepository } from "../../repositories/juego/whislist.dao.js";
import { JuegoRepository } from "../../repositories/juego/juego.dao.js";
import "reflect-metadata";

const mockWishlistRepository = {
    getWishlist: jest.fn(),
    addToWishlist: jest.fn(),
    removeFromWishlist: jest.fn(),
    isInWishlist: jest.fn()
}
    
const mockJuegoRepository = {
    findWishlistGames: jest.fn(),
};

const mockJuego = [
    {
        id: 1,
        nombre: 'Juego 1',
        descripcion: 'Descripción del juego 1',
        fecha_lanzamiento: new Date('2023-01-01'),
        precio: 59.99,
        genero: 'Acción',
        desarrolladora: 'Desarrolladora 1',
        plataforma: 'PC',
        wishlist: [],
    },
    {
        id: 2,
        nombre: 'Juego 2',
        descripcion: 'Descripción del juego 2',
        fecha_lanzamiento: new Date('2023-02-01'),
        precio: 49.99,
        genero: 'Aventura', 
        desarrolladora: 'Desarrolladora 2',
        plataforma: 'PS5',
        wishlist: [],
    }
];

    const wishlistService = new WishlistService(
    mockWishlistRepository as any,
    mockJuegoRepository as any
);
describe('WishlistService - getWishlist', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Debería devolver la lista de deseos del usuario', async () => {
        mockJuegoRepository.findWishlistGames.mockResolvedValue(mockJuego); // Simulando que se encuentra la lista de deseos

        const result = await wishlistService.getWishlist(1);
        expect(result).toEqual(mockJuego);
        expect(mockJuegoRepository.findWishlistGames).toHaveBeenCalledWith(1);
    });

    it('Debería lanzar un error si no se encuentra la lista de deseos', async () => {
        mockJuegoRepository.findWishlistGames.mockResolvedValue([]); // Simulando que no se encuentra la lista de deseos

        const result = await wishlistService.getWishlist(999);

        expect(result).toEqual([]);
        expect(mockJuegoRepository.findWishlistGames).toHaveBeenCalledWith(999);
    });
});