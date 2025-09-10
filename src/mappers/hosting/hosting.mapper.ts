
import { injectable } from "inversify";
import { HostingPublisher } from "../../models/hosting/hosting-publisher.entity.js";
import { HostingPublisherDto } from "../../models-dto/hosting-publisher/hosting-publisher-dto.entity.js";


@injectable()
export class HostingMapper {
    
    async convertToDto(hostingPublisher: HostingPublisher): Promise<HostingPublisherDto> {
        return {
            id: hostingPublisher.id,
            storageAmmount: hostingPublisher.storageAmmount,
            storageType: hostingPublisher.storageType,
            ramAmmount: hostingPublisher.ramAmmount,
            cpuSpecs: hostingPublisher.cpuSpecs,
            uptimePercentage: hostingPublisher.uptimePercentage,
            publisher: hostingPublisher.publisher,
            hosting: hostingPublisher.hosting
        };
    }
    
}


 