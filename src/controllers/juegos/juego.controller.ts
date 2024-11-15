import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { JuegoService } from '../../services/juego/juego.service.js';

import {
  controller,
  httpDelete,
  httpGet,
  httpPatch,
  httpPost,
  httpPut,
} from 'inversify-express-utils';
import { authenticateToken } from '../../middleware/auth/authToken.js';
import { inject } from 'inversify';
import { IJuegoService } from '../../services/interfaces/juego/IJuegoService.js';
import { validateInputData } from '../../middleware/validation/validation-middleware.js';
import {
  createJuegoValidationRules,
  deleteJuegoValidationRules,
  getJuegoByNameValidationRules,
  getJuegoValidationRules,
  updateJuegoValidationRules,
} from '../../middleware/validation/validations-rules/juego-validations.js';
import { WishlistService } from '../../services/juego/wishlist.service.js';

@controller('/api/juegos')
export class JuegoController {
  private juegoService: IJuegoService;
  private wishlistService: WishlistService;

  constructor(
    @inject(JuegoService) juegoService: IJuegoService,
    @inject(WishlistService) wishlistService: WishlistService
  ) {
    this.juegoService = juegoService;
    this.wishlistService = wishlistService;
  }

  @httpGet('/')
  public async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const juegos = await this.juegoService.findAll();
      if (juegos.length > 0) {
        res.status(200).json(juegos);
      } else {
        res.status(404).json({ message: 'No se han hayado juegos' });
      }
    } catch (error) {
      next(error);
    }
  }

  @httpGet('/search', validateInputData(getJuegoByNameValidationRules))
  public async findByName(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { gamename } = req.query;
    if (!gamename) {
      res.status(400).json({ message: 'Nombre del juego es requerido' });
      return;
    }

    try {
      const juegos = await this.juegoService.findByName(String(gamename));
      res.json(juegos);
    } catch (error) {
      next(error);
    }
  }

  // Ruta para obtener la wishlist del usuario logeado
  @httpGet('/wishlist', authenticateToken)
  public async getWishList(req: Request, res: Response, next: NextFunction) {
    const userId = res.locals.userId; // Tomamos el userId del middleware authenticateToken

    try {
      const wishlist = await this.juegoService.findWishlistGames(userId);

      if (wishlist.length === 0) {
        res
          .status(404)
          .json({
            message: 'Este usuario no tiene juegos en su lista de deseados.',
          });
      } else {
        res.status(200).json(wishlist);
      }
    } catch (error) {
      console.error('Error al obtener la wishlist:', error);
      next(error);
    }
  }

  @httpGet('/:id', validateInputData(getJuegoValidationRules))
  public async findOne(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id, 10);

    try {
      const juego = await this.juegoService.findOne(id);
      if (juego) {
        res.status(200).json(juego);
      } else {
        res.status(404).json({ message: 'Juego no encontrado' });
      }
    } catch (error) {
      next(error);
    }
  }

  @httpPost('/', authenticateToken, validateInputData(createJuegoValidationRules))
  public async create(req: Request, res: Response, next: NextFunction) {
    const newJuego = req.body;

    try {
      const createdJuego = await this.juegoService.create(newJuego);
      res.status(201).json(createdJuego);
    } catch (error) {
      next(error);
    }
  }

  @httpPatch('/:id', authenticateToken, validateInputData(updateJuegoValidationRules))
  public async update(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id, 10);
    const juegoUpdates = req.body;

    try {
      const updatedJuego = await this.juegoService.update(id, juegoUpdates);
      if (updatedJuego) {
        res.status(200).json(updatedJuego);
      } else {
        res.status(404).json({ message: 'Juego no encontrado' });
      }
    } catch (error) {
      next(error);
    }
  }

  @httpDelete('/:id', authenticateToken, validateInputData(deleteJuegoValidationRules))
  public async remove(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id, 10);

    try {
      const deletedJuego = await this.juegoService.delete(id);
      if (deletedJuego) {
        res.status(200).json(deletedJuego);
      } else {
        res.status(404).json({ message: 'Juego no encontrado' });
      }
    } catch (error) {
      next(error);
    }
  }

  // Otros endpoints relacionados a la wishlist
  // Ruta para verificar si un juego está en la wishlist
  @httpGet('/wishlist/:juegoId', authenticateToken)
  public async checkIfInWishlist(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const userId = res.locals.userId;
    const juegoId = parseInt(req.params.juegoId, 10);

    try {
      const isInWishlist = await this.wishlistService.isInWishlist(
        userId,
        juegoId
      );
      res.status(200).json({ isInWishlist });
    } catch (error) {
      next(error);
    }
  }

  // Ruta para agregar un juego a la wishlist
  @httpPost('/wishlist/:juegoId', authenticateToken)
  public async addToWishlist(req: Request, res: Response, next: NextFunction) {
    const userId = res.locals.userId; // Extrae el ID del usuario de res.locals
    const juegoId = parseInt(req.params.juegoId, 10);

    try {
      await this.wishlistService.addToWishlist(userId, juegoId);
      res.status(201).json({ message: 'Juego agregado a la wishlist' });
    } catch (error) {
      next(error);
    }
  }

  // Ruta para quitar un juego de la wishlist
  @httpDelete('/wishlist/:juegoId', authenticateToken)
  public async removeFromWishlist(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const userId = res.locals.userId;
    const juegoId = parseInt(req.params.juegoId, 10);

    try {
      await this.wishlistService.removeFromWishlist(userId, juegoId);
      res.status(200).json({ message: 'Juego eliminado de la wishlist' });
    } catch (error) {
      next(error);
    }
  }
}
