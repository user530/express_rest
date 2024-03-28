import { ApiLink } from '../../common/types';
import { getWelcomeInfo } from './main';

describe('Main service', () => {
    const result = getWelcomeInfo();

    it('getWelcomeInfo should have a defined return', () => {
        expect(result).toBeDefined();
    })

    it('getWelcomeInfo should return object with a metadata', () => {
        expect(result.meta).toBeDefined();
        expect(result.meta).toHaveProperty('apiVersion');
        expect(result.meta).toHaveProperty('documentation');
    })

    it('getWelcomeInfo should return object with links', () => {
        expect(result._links).toBeDefined();
        expect(result._links).toHaveProperty<ApiLink>('self');
    })
})