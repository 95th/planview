import { dateToString } from './date.util';

describe('date util', () => {
    it('should create ISO string', () => {
        const date = new Date(Date.parse('2020-01-04'));
        const str = dateToString(date);
        expect(str).toStrictEqual('2020-01-04');
    });
});
