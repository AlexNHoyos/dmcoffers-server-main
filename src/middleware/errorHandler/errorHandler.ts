import { Request, Response, NextFunction } from 'express';

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    console.error(err.stack);
    res.status(500).json({ message: 'Ocurrió un error en el servidor', error: err.message });
}

export default errorHandler;