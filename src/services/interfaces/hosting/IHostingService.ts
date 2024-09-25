import { IBaseService } from '../IBaseService.js';
import { Hosting } from '../../../models/hosting/hosting.entity.js';

export interface IHostingService extends IBaseService<Hosting> {
  // Métodos adicionales específicos para Auth, agregar cuando los haya
}
