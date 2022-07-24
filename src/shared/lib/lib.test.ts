import { isJsonString } from './index';

describe('test JSON string check function', () => {
    it('should return true for empty object', () => {
        expect(isJsonString('{}')).toBe(true);
    });
    it('should return false object with unneccessary comma', () => {
        expect(isJsonString('{},')).toBe(false);
    });
    it('should return true', () => {
        expect(isJsonString('{"title":"title example"}')).toBe(true);
    });
});
