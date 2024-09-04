//Importamos la entidad que contiene las categorías
import { Categorias } from "../../models/categorias/categorias.entity";
//Importamos postgre
import pool from "../../shared/pg-database/db";

import { DatabaseError } from "pg";
import { errorEnumCategories } from "../../middleware/errorHandler/constants/errorConstants";
import { IBaseRepository } from "../interfaces/IBaseRepository";

//Definimos la clase Categorias repository e implementamos la interface Repository<Categorias>
export class RepositoryCategorias implements IBaseRepository<Categorias>{

}

public async findOne(): Promise<Categorias | undefined>{

}

