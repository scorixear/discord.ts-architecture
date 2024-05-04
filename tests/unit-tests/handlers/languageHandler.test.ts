import 'jest';

import { LanguageHandler as SuT } from '../../../src/handlers/languageHandler';

describe('LanguageHandler', () => {
  describe('setLanguage', () => {
    it('should set the language object', () => {
      const json = '{"test": "test"}';
      SuT.setLanguage(json);
      expect(SuT.language).toEqual({ test: 'test' });
    });
  });

  describe('replaceArgs', () => {
    it('should replace all args in the string', () => {
      const input = 'This is a $0 test $1';
      const args = ['test', 'string'];
      expect(SuT.replaceArgs(input, ...args)).toEqual('This is a test test string');
    });
  });
});
