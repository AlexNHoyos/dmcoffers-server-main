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
import { CartService } from '../../services/juego/cart.service.js';
import { BibliotecaService } from '../../services/juego/biblioteca.service.js';
import multer from 'multer';
import path from 'path';
import { validateImageUpload } from '../../middleware/validation/validateImageUpload.js';
import { parseJuegoField } from '../../middleware/validation/parseJuegoField.js';


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/games'); // Carpeta donde se guardan las imagenes de los juegos
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext).replace(/\s+/g, '_');
    const uniqueSuffix = Date.now();
    cb(null, `${baseName}-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({ storage });

@controller('/api/juegos')
export class JuegoController {
  private juegoService: IJuegoService;
  private wishlistService: WishlistService;
  private cartService: CartService;
  private bibliotecaService: BibliotecaService;

  constructor(
    @inject(JuegoService) juegoService: IJuegoService,
    @inject(WishlistService) wishlistService: WishlistService,
    @inject(CartService) cartService: CartService,
    @inject(BibliotecaService) bibliotecaService: BibliotecaService,

  ) {
    this.juegoService = juegoService;
    this.wishlistService = wishlistService;
    this.cartService = cartService;
    this.bibliotecaService = bibliotecaService;
  }

  /* @httpPost('/upload-image', authenticateToken, upload.single('image'))
   public async uploadImage(req: Request, res: Response, next: NextFunction) {
   try {
     if (!req.file) {
       return res.status(400).json({ message: 'No se proporcionó ninguna imagen' });
     }
 
     const imagePath = `/uploads/games/${req.file.filename}`; // o guarda solo el filename si prefieres
 
     res.status(201).json({
       message: 'Imagen subida con éxito',
       imagePath,
     });
     } catch (error) {
     next(error);
     }
   }*/

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
  @httpGet('/biblioteca', authenticateToken)
  public async getBiblioteca(req: Request, res: Response, next: NextFunction) {
    const userId = res.locals.userId;

    try {
      const biblioteca = await this.bibliotecaService.getBiblioteca(userId);
      console.log(biblioteca);
      res.status(200).json(biblioteca);

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
      res.status(200).json(wishlist);
    } catch (error) {
      console.error('Error al obtener la wishlist:', error);
      next(error);
    }
  }



  //Endpoint para el checkout
  @httpPost('/cart/checkout', authenticateToken)
  public async checkoutCart(req: Request, res: Response, next: NextFunction) {
    const userId = res.locals.userId;
    try {
      // Obtener juegos del carrito
      const juegos = await this.cartService.getCart(userId);

      if (juegos.length === 0) {
        return res.status(400).json({ message: 'El carrito está vacío' });
      }

      // Simular agregar los juegos a la biblioteca del usuario
      await this.cartService.checkout(userId); // esta lógica la creás ahora

      res.status(200).json({ message: 'Compra realizada con éxito' });
    } catch (error) {
      next(error);
    }
  }


  @httpGet('/cart', authenticateToken)
  public async getCart(req: Request, res: Response, next: NextFunction) {
    const userId = res.locals.userId;

    try {
      const carrito = await this.juegoService.findCartGames(userId);
      res.status(200).json(carrito);
    }
    catch (error) {
      console.error('Error al obtener el carrito:', error);
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

  @httpPost('/', authenticateToken, upload.single('image'))
  public async create(req: Request, res: Response, next: NextFunction) {

    try {
      if (!req.body.juego) {
        throw new Error("No se recibió el campo 'juego' en el body.");
      }

      const juegoData = JSON.parse(req.body.juego);

      Object.assign(req.body, juegoData);

      // Ejecutar validaciones
      await validateInputData(createJuegoValidationRules)(req, res, next);

      const imagePath = req.file ? `/uploads/games/${req.file.filename}` : undefined;
      const newJuego = await this.juegoService.createGame(juegoData, imagePath);

      res.status(201).json(newJuego);
    } catch (error) {
      next(error);
    }
  }

  @httpPatch('/:id', authenticateToken, upload.single('image'), parseJuegoField, validateImageUpload)
  public async update(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id, 10);

    try {

      // Validar que venga el campo 'juego'
      if (!req.body.juego) {
        throw new Error("No se recibió el campo 'juego' en el body.");
      }

      // Parsear los datos que vienen en JSON string
      const juegoUpdates = JSON.parse(req.body.juego);

      if (req.file) {
        juegoUpdates.image_path = `/uploads/games/${req.file.filename}`;
      } else {
        console.log("No se cargó ninguna imagen")
      }
      console.log(juegoUpdates);
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

  //Endpoints para carrito
  @httpPost('/cart/:juegoId', authenticateToken)
  public async addToCart(req: Request, res: Response, next: NextFunction) {
    const userId = res.locals.userId;
    const juegoId = parseInt(req.params.juegoId, 10);

    try {
      await this.cartService.addToCart(userId, juegoId);
      res.status(201).json({ message: 'Juego agregado al carrito' });
    } catch (error) {
      next(error);
    }
  }

  @httpDelete('/cart/:juegoId', authenticateToken)
  public async removeFromCart(req: Request, res: Response, next: NextFunction) {
    const userId = res.locals.userId;
    const juegoId = parseInt(req.params.juegoId, 10);

    try {
      await this.cartService.removeFromCart(userId, juegoId);
      res.status(200).json({ message: 'Juego eliminado del carrito' });
    } catch (error) {
      next(error);
    }
  }

  @httpGet('/cart/:juegoId', authenticateToken)
  public async checkIfInCart(req: Request, res: Response, next: NextFunction) {
    const userId = res.locals.userId;
    const juegoId = parseInt(req.params.juegoId, 10);

    try {
      const isInCart = await this.cartService.isInCart(userId, juegoId);
      res.status(200).json({ isInCart });
    } catch (error) {
      next(error);
    }
  }


  //Endpoints para biblioteca



  @httpGet('/biblioteca/:juegoId', authenticateToken)
  public async checkIfInBiblioteca(req: Request, res: Response, next: NextFunction) {
    const userId = res.locals.userId;
    const juegoId = parseInt(req.params.juegoId, 10);

    try {
      const isInBiblioteca = await this.bibliotecaService.isInBiblioteca(userId, juegoId);
      res.status(200).json({ isInBiblioteca });

    } catch (error) {
      next(error);
    }
  }


}
