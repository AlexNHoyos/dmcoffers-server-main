import { User } from "../../../src/models/usuarios/user.entity";
import { Repository } from "../../shared/repository";
const users = [
    new User('1', 'Ramiro', 'Ceballos', 'DoomedCrow', new Date('02-03-2000'), 'admin', new Date(), 'admin', new Date(), true),
];
export class UserRepository implements Repository<User> {
    public findAll(): User[] | undefined {
        return users;
    }
    public findOne(usr: { id: string }): User | undefined {
        return users.find((user) => user.id === usr.id);
    }
    public add(usr: User): User | undefined {
        users.push(usr);
        return usr;
    }
    public update(usr: User): User | undefined {
        const userIdx = users.findIndex((user) => user.id === usr.id);
        if (userIdx !== -1) {
            users[userIdx] = { ...users[userIdx], ...usr };
        }
        return users[userIdx];
    }
    public delete(usr: { id: string }): User | undefined {
        const userIdx = users.findIndex((user) => user.id === usr.id);
        if (userIdx !== -1) {
            const deletedUsers = users[userIdx];
            users.splice(userIdx, 1);
            return deletedUsers;
        }
    }
}