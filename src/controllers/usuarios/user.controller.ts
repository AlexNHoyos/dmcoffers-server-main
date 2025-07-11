import { Request, Response, NextFunction } from 'express';
import { UserService } from '../../services/user/user.service.js';
import { IUserService } from '../../services/interfaces/user/IUserService.js';
import { inject } from 'inversify';
import { controller, httpDelete, httpGet, httpPost, httpPut } from 'inversify-express-utils';
import { validateInputData } from '../../middleware/validation/validation-middleware.js';
import { createUserValidationRules, deleteUserValidationRules, getUserValidationRules, updateUserByAdminValidationRules, updateUserValidationRules } from '../../middleware/validation/validations-rules/user-validations.js';
import { authenticateToken, authorizeRol } from '../../middleware/auth/authToken.js';
import { OkNegotiatedContentResult } from 'inversify-express-utils/lib/results/OkNegotiatedContentResult.js';
import { JsonResult } from 'inversify-express-utils/lib/results/JsonResult.js';
import { AuthCryptography } from '../../middleware/auth/authCryptography.js';

@controller('/api/users')
export class UserController {
    private _userService: IUserService;

    authCryptography: AuthCryptography = new AuthCryptography();


    constructor(
        @inject(UserService) userService: IUserService,
    ) {
        this._userService = userService;
    }

    @httpGet('/findall')
    public async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await this._userService.findAll();
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

    @httpGet('/:id', validateInputData(getUserValidationRules))
    public async findOne(req: Request, res: Response, next: NextFunction) {
        const id = parseInt(req.params.id, 10);

        try {
            const user = await this._userService.findOne(id);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'Usuario no encontrado' });
            }
        } catch (error) {
            next(error);
        }
    };

    @httpPost('/register', validateInputData(createUserValidationRules))
    public async create(req: Request, res: Response, next: NextFunction) {
        console.log(req.body);

        const newUser = { //req.body solamente
            idUser: undefined,
            idRolApl: req.body.idRolApl,
            rolDesc: undefined,
            realname: req.body.realname,
            surname: req.body.surname,
            username: req.body.username,
            birth_date: req.body.birth_date,
            creationuser: req.body.creationuser,
            creationtimestamp: undefined,
            password: this.authCryptography.decrypt(req.body.password),
            status: req.body.status,
            delete_date: req.body.delete_date,
            modificationuser: undefined,
            modificationtimestamp: undefined,
        };

        try {
            const createdUser = await this._userService.create(newUser);
            res.status(201).json(createdUser);
        } catch (error) {
            next(error);
        }
    };

    @httpPut('/:id', authenticateToken, validateInputData(updateUserValidationRules))
    public async update(req: Request, res: Response, next: NextFunction) {

        const id = parseInt(req.params.id, 10);
        const userUpdates = req.body;

        try {
            const updatedUser = await this._userService.update(id, userUpdates);
            if (updatedUser) {
                res.status(200).json(updatedUser);
            } else {
                res.status(404).json({ message: 'Usuario no encontrado' });
            }
        } catch (error) {
            next(error);
        }
    };

    @httpDelete('/:id', authenticateToken, validateInputData(deleteUserValidationRules))
    public async remove(req: Request, res: Response, next: NextFunction) {

        const id = parseInt(req.params.id, 10);

        try {
            const deletedUser = await this._userService.delete(id);
            if (deletedUser) {
                res.status(200).json(deletedUser);
            } else {
                res.status(404).json({ message: 'Usuario no encontrado' });
            }
        } catch (error) {
            next(error);
        }
    };

    @httpPut('/updateUser/:id', authenticateToken, validateInputData(updateUserByAdminValidationRules), authorizeRol('admin'))
    public async updateUserByAdmin(req: Request, res: Response, next: NextFunction) {

        const id = parseInt(req.params.id, 10);
        const userUpdates = req.body;

        try {
            const updatedUser = await this._userService.updateUserByAdmin(id, userUpdates, userUpdates.rolDescription);
            if (updatedUser) {
                res.status(200).json(updatedUser);
            } else {
                res.status(404).json({ message: 'Usuario no encontrado' });
            }
        } catch (error) {
            next(error);
        }
    };
}