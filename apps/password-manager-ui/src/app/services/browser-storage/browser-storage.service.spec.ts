import { BrowserStorageService } from './browser-storage.service';

describe('BrowserStorageService Tests', () => {
    let service: BrowserStorageService;

    beforeEach(() => {
        service = new BrowserStorageService();
    });

    afterEach(() => {
        jest.resetAllMocks();
        service.clear();
    });

    describe('Set Item', () => {
        it('Successfully sets an item in local storage', () => {
            service.setItem('username', 'foo');

            const actual = service.getItem('username');
            expect(actual).toBe('foo');
        });
    });

    describe('Get Item', () => {
        it('Returns the item when it exists in local storage', () => {
            service.setItem('username', 'foo');

            const actual = service.getItem('username');
            expect(actual).toBe('foo');
        });

        it('Returns null when the item does not exist in local storage', () => {
            const actual = service.getItem('username');
            expect(actual).toBeNull();
        });
    });

    describe('Delete Item', () => {
        it('Successfully deletes an item that is in local storage', () => {
            service.setItem('username', 'foo');
            service.deleteItem('username');

            const actual = service.getItem('username');
            expect(actual).toBeNull();
        });
    });

    describe('Clear', () => {
        it('Clears all items in local storage', () => {
            service.setItem('username', 'foo');
            service.setItem('sessionId', 'bar');

            service.clear();

            expect(service.getItem('username')).toBeNull();
            expect(service.getItem('sessionId')).toBeNull();
        });
    });
});
