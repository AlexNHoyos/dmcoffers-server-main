import { inject, injectable } from "inversify";
import { SweItemMenu } from "../../models/sweitemmenu/sweitemmenu.entity.js";
import { SideMenuRepository } from "../../repositories/sweitemmenu/sweitemmenu.repository.js";
import { ISweItemMenuService } from "../interfaces/sweitemmenu/ISweItemMenu.js";

@injectable()
export class SweItemMenuService implements ISweItemMenuService {

    private sideMenuRepository: SideMenuRepository;

    constructor(
        @inject(SideMenuRepository) sideMenuRepository: SideMenuRepository,
    ) {
        this.sideMenuRepository = sideMenuRepository;
    }

    async findAll(): Promise<SweItemMenu[]> {
        return this.sideMenuRepository.findAll();
    }

    async findOne(id: number): Promise<SweItemMenu | undefined> {
        return this.sideMenuRepository.findOne(id);
    }

    async create(newSweItemMenu: SweItemMenu): Promise<SweItemMenu> {
        return this.sideMenuRepository.create(newSweItemMenu);
    }

    async update(id: number, sweItemMenu: SweItemMenu): Promise<SweItemMenu> {
        return this.sideMenuRepository.update(id, sweItemMenu);
    }

    async delete(id: number): Promise<SweItemMenu | undefined> {
        return this.sideMenuRepository.delete(id);
    }



}