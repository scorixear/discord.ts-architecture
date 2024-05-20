import 'jest';
import { Logger as SuT } from '../../../src/logging/logger';
import { WarningLevel } from '../../../src/logging/warninglevel';

const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});
const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
const mockProcessExit = jest.spyOn(process, 'exit').mockImplementation(() => {
  throw new Error('process.exit');
});

describe('Logger', () => {
  beforeEach(() => {
    mockConsoleLog.mockReset();
    mockConsoleError.mockReset();
    mockProcessExit.mockReset();
  });

  describe('log', () => {
    it('should log the message with the given warning level and arguments', () => {
      SuT.log('message', WarningLevel.INFO, 'arg1', 'arg2');
      expect(mockConsoleLog).toHaveBeenCalledWith('[INFO] message', 'arg1', 'arg2');
    });

    it('should exit the process with error-code 1 if warning level is CRIT', () => {
      SuT.log('message', WarningLevel.CRIT, 'arg1', 'arg2');
      expect(mockConsoleLog).toHaveBeenCalledWith('[CRITICAL] message', 'arg1', 'arg2');
      expect(mockProcessExit).toHaveBeenCalledWith(1);
    });
  });

  describe('info', () => {
    it('should log the message with INFO as preamble', () => {
      SuT.info('message', 'arg1', 'arg2');
      expect(mockConsoleLog).toHaveBeenCalledWith('[INFO] message', 'arg1', 'arg2');
    });
  });

  describe('warn', () => {
    it('should log the message with WARNING as preamble', () => {
      SuT.warn('message', 'arg1', 'arg2');
      expect(mockConsoleLog).toHaveBeenCalledWith('[WARNING] message', 'arg1', 'arg2');
    });
  });

  describe('error', () => {
    it('should log the message with ERROR as preamble', () => {
      SuT.error('message', 'arg1', 'arg2');
      expect(mockConsoleLog).toHaveBeenCalledWith('[ERROR] message', 'arg1', 'arg2');
    });
  });

  describe('crit', () => {
    it('should exit the process with error-code 1', () => {
      SuT.crit('message', 'arg1', 'arg2');
      expect(mockConsoleLog).toHaveBeenCalledWith('[CRITICAL] message', 'arg1', 'arg2');
      expect(mockProcessExit).toHaveBeenCalledWith(1);
    });
  });

  describe('exception', () => {
    it('should log the message to error and log', () => {
      const error = new Error('error message');

      SuT.exception('message', error, WarningLevel.INFO, 'arg1', 'arg2');
      expect(mockConsoleError).toHaveBeenCalledTimes(2);
      expect(mockConsoleError).toHaveBeenNthCalledWith(1, error.message);
      expect(mockConsoleLog).toHaveBeenCalledWith('[INFO] message', 'arg1', 'arg2');
    });

    it('should log error message to error and log', () => {
      const error = 'error message';
      SuT.exception('message', error, WarningLevel.INFO, 'arg1', 'arg2');
      expect(mockConsoleError).toHaveBeenCalledWith(error);
      expect(mockConsoleLog).toHaveBeenCalledWith('[INFO] message', 'arg1', 'arg2');
    });
  });
});
