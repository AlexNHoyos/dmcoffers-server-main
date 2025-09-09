import { Hosting } from "../../models/hosting/hosting.entity.js";
import { Publisher } from "../../models/publicadores/publisher.entity.js";

export class HostingPublisherDto {
    id: number | undefined;
    storageType?: string | undefined;
    storageAmmount?: number | undefined;
    ramAmmount?: number | undefined;
    cpuSpecs?: string | undefined;
    uptimePercentage?: number | undefined;
    publisher?: Publisher | undefined;
    hosting?: Hosting | undefined

    constructor(
        storage_type: string,
        storage_ammount: number,
        ram_ammount: number,
        cpu_specs: string,
        uptime_percentage: number,
        id_publisher: Publisher,
        id_hosting_service: Hosting
    ) {
        this.storageAmmount = storage_ammount;
        this.storageType = storage_type;
        this.ramAmmount = ram_ammount;
        this.cpuSpecs = cpu_specs;
        this.uptimePercentage = uptime_percentage;
        this.publisher = id_publisher;
        this.hosting = id_hosting_service;
    }
}
