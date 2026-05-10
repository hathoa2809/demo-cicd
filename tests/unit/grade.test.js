const { calculateStatus } = require('../../src/services/grade.js');

describe('calculateStatus', () => {
    test('should return PASSED when score is >= 5', () => {
        expect(calculateStatus(5)).toBe('PASSED');
        expect(calculateStatus(8.25)).toBe('PASSED');
        expect(calculateStatus("7")).toBe('PASSED');
    });

    test('should return FAILED when score is < 5', () => {
        expect(calculateStatus(4.9)).toBe('FAILED');
        expect(calculateStatus(0)).toBe('FAILED');
        expect(calculateStatus("3")).toBe('FAILED');
    });

    test('should return UNKNOWN when score is invalid', () => {
        expect(calculateStatus(null)).toBe('UNKNOWN');
        expect(calculateStatus(undefined)).toBe('UNKNOWN');
        expect(calculateStatus("abc")).toBe('UNKNOWN');
    });
});
