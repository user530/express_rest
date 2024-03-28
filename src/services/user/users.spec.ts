import { getAllUsersData } from './users';

describe('User service', () => {
    const result = getAllUsersData();

    it('getAllUsers should have a defined return', () => {
        expect(result).toBeDefined();
    })
})