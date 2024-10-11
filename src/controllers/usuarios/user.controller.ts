import { Request, Response, NextFunction } from 'express';
import { UserService } from '../../services/user/user.service.js';
import { IUserService } from '../../services/interfaces/user/IUserService.js';
import { inject } from 'inversify';
import { controller, httpDelete, httpGet, httpPost, httpPut } from 'inversify-express-utils';
import { validate } from '../../middleware/validation/validation-middleware.js';
import { createUserValidationRules, deleteUserValidationRules, getUserValidationRules, updateUserValidationRules } from '../../middleware/validation/validations-rules/user-validations.js';
import { authenticateToken } from '../../middleware/auth/authToken.js';
import { OkNegotiatedContentResult } from 'inversify-express-utils/lib/results/OkNegotiatedContentResult.js';
import { JsonResult } from 'inversify-express-utils/lib/results/JsonResult.js';

@controller('/api/users')
export class UserController {
  private userService: IUserService;

  constructor(
    @inject(UserService) userService: IUserService,
  ) 
  {
    this.userService = userService;
  }

    @httpGet('/findall')
    public async findAll(req: Request, res: Response, next: NextFunction){
        try {
            const users = await this.userService.findAll();
            if (users.length > 0) {
                res.status(200).json(users);
                //new OkNegotiatedContentResult(users);
            } else {
                return new JsonResult({ message: 'No se han encontrado usuarios' }, 404);
            }
        } catch (error) {
            next(error);
        }
    };

    @httpGet('/:id', validate(getUserValidationRules))
    public async findOne(req: Request, res: Response, next: NextFunction) {
        const id = parseInt(req.params.id, 10);

        try {
            const user = await this.userService.findOne(id);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'Usuario no encontrado' });
            }
        } catch (error) {
            next(error);
        }
    };

    @httpPost('/register', validate(createUserValidationRules))
    public async create(req: Request, res: Response, next: NextFunction) {
        
        const newUser = req.body;
        
        try {
            const createdUser = await this.userService.create(newUser);
            res.status(201).json(createdUser);
        } catch (error) {
            next(error);
        }
    };

    @httpPut('/:id', authenticateToken, validate(updateUserValidationRules))
    public async update(req: Request, res: Response, next: NextFunction) {

        const id = parseInt(req.params.id, 10);
        const userUpdates = req.body;
  
        try {
            const updatedUser = await this.userService.update(id, userUpdates);
            if (updatedUser) {
                res.status(200).json(updatedUser);
            } else {
                res.status(404).json({ message: 'Usuario no encontrado' });
            }
        } catch (error) {
            next(error);
        }
    };

    @httpDelete('/:id', authenticateToken, validate(deleteUserValidationRules))
    public async remove(req: Request, res: Response, next: NextFunction) {

        const id = parseInt(req.params.id, 10);

        try {
            const deletedUser = await this.userService.delete(id);
            if (deletedUser) {
                res.status(200).json(deletedUser);
            } else {
                res.status(404).json({ message: 'Usuario no encontrado' });
            }
        } catch (error) {
            next(error);
        }
    };
}