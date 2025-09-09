import { IBaseService } from '../IBaseService.js';
import { HostingPublisher } from '../../../models/hosting/hosting-publisher.entity.js';
import { HostingPublisherDto } from '../../../models-dto/hosting-publisher/hosting-publisher-dto.entity.js';

export interface IHostingPublisherService extends IBaseService<HostingPublisherDto> {
    // Métodos adicionales específicos para Auth, agregar cuando los haya
}
