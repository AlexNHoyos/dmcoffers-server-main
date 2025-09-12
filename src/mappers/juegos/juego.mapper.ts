
import { injectable } from "inversify";
import { JuegoDto } from "../../models-dto/juegos/juego-dto.entity.js";
import { Juego } from "../../models/juegos/juegos.entity.js";
import * as fs from "fs";
import * as path from "path";

@injectable()
export class JuegoMapper {
  
  async convertoDto(juego: Juego, price?: number): Promise<JuegoDto> {
    const categorias = await juego.categorias;

    return {
      id: juego.id,
      gamename: juego.gamename,
      release_date: juego.release_date,
      publishment_date: juego.publishment_date,
      creationuser: juego.creationuser,
      creationtimestamp: juego.creationtimestamp,
      modificationuser: juego.modificationuser,
      modificationtimestamp: juego.modificationtimestamp,
      id_publisher: juego.publisher?.id,
      id_developer: juego.developer?.id,
      categorias: categorias ? categorias.map((c) => c.id) : [],
      price,
      publisherName: juego.publisher?.publishername,
      developerName: juego.developer?.developername,
      categoriasNames: categorias?.map((categoria) => categoria.description),
      // 👇 Ahora solo devolvés la URL de Cloudinary
      image_path: juego.image_path,
    };
  }

}


