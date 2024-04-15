import { Categorias } from '../models/categorias.entity.js'
import { Repository } from '../shared/repository.js';

const categorias = [
    new Categorias(
        1,
        'prueba',
        new Date(),
        'Esta es una prueba de foros',
        new Date(),
        new Date()
    ),
]

