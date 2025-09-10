
import { injectable } from "inversify";
import { JuegoDto } from "../../models-dto/juegos/juego-dto.entity";
import { Juego } from "../../models/juegos/juegos.entity";
import * as fs from "fs";
import * as path from "path";

@injectable()
export class JuegoMapper {
  async convertoDto(juego: Juego, price?: number): Promise<JuegoDto> {
    const categorias = await juego.categorias;
    const UPLOADS_BASE_PATH = path.resolve(process.cwd(), "uploads", "games");

    let imageBase64: string | undefined = undefined;
    let imageContentType: string | undefined = undefined;

    if (juego.image_path) {
      let filePath: string;

      if (juego.image_path.includes("uploads")) {
        const relativePath = juego.image_path.replace(
          /^.*uploads[\\/]games[\\/]/,
          ""
        );
        filePath = path.join(UPLOADS_BASE_PATH, relativePath);
      } else {
        filePath = path.join(UPLOADS_BASE_PATH, juego.image_path);
      }

      if (fs.existsSync(filePath)) {
        const fileBuffer = fs.readFileSync(filePath);
        imageBase64 = fileBuffer.toString("base64");
        imageContentType = "image/png"; // 🔧 acá podrías detectar tipo real si usás "mime"
      } else {
        console.warn("No se encontró el archivo:", filePath);
      }
    }

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
      image_path: juego.image_path,
      imageBase64,
      imageContentType,
    };
  }
}


