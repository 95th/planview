import { toDateString } from './date.util';

describe('date util', () => {
    it('should create ISO string', () => {
        const date = new Date('2020-01-04');
        const str = toDateString(date);
        expect(str).toStrictEqual('2020-01-04');
    });
});
