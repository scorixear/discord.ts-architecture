import 'jest';
import { TwoWayMap } from '../../src/model/TwoWayMap';
import { TestButtonInteractionModel } from '../helpers/TestButtonInteractionModel';

describe('TwoWayMap', () => {
  let SuT: TwoWayMap<string, number>;
  let SuT_map: Map<string, number>;

  beforeEach(() => {
    SuT_map = new Map<string, number>();
    SuT = new TwoWayMap<string, number>(SuT_map);
  });

  describe('constructor', () => {
    it('should create a new TwoWayMap', () => {
      const map = new Map<string, number>();
      map.set('key', 1);
      map.set('key2', 2);
      const const_sut = new TwoWayMap<string, number>(map);
      expect(const_sut).toBeDefined();
      expect((const_sut as any).map).toBe(map);
      expect((const_sut as any).reverseMap).toBeDefined();
      expect((const_sut as any).reverseMap.get(1)).toBe('key');
      expect((const_sut as any).reverseMap.get(2)).toBe('key2');
    });
  });

  describe('set', () => {
    it('should set a key-value pair', () => {
      SuT.set('key', 1);
      expect(SuT_map.get('key')).toBe(1);
    });
  });

  describe('get', () => {
    it('should get a value by key', () => {
      SuT_map.set('key', 1);
      expect(SuT.get('key')).toBe(1);
    });

    it('should return undefined if key does not exist', () => {
      expect(SuT.get('key')).toBeUndefined();
    });
  });

  describe('revGet', () => {
    it('should get a key by value', () => {
      SuT.set('key', 1);
      expect(SuT.revGet(1)).toBe('key');
    });

    it('should return undefined if value does not exist', () => {
      expect(SuT.revGet(1)).toBeUndefined();
    });
  });

  describe('typeGet', () => {
    it('should get a key by type', () => {
      const SuT_new = new TwoWayMap<string, TestButtonInteractionModel>(new Map<string, TestButtonInteractionModel>());
      SuT_new.set('key', new TestButtonInteractionModel('key', 2000, true));
      expect(SuT_new.typeGet(TestButtonInteractionModel)).toBe('key');
    });

    it('should return undefined if type does not exist', () => {
      const SuT_new = new TwoWayMap<string, TestButtonInteractionModel>(new Map<string, TestButtonInteractionModel>());
      expect(SuT_new.typeGet(TestButtonInteractionModel)).toBeUndefined();
    });

    it('should return first key if multiple keys exist', () => {
      const SuT_new = new TwoWayMap<string, TestButtonInteractionModel>(new Map<string, TestButtonInteractionModel>());
      SuT_new.set('key1', new TestButtonInteractionModel('key1', 2000, true));
      SuT_new.set('key2', new TestButtonInteractionModel('key2', 2000, true));
      expect(SuT_new.typeGet(TestButtonInteractionModel)).toBe('key1');
    });
  });

  describe('find', () => {
    it('should find a key by action', () => {
      SuT_map.set('key', 1);
      expect(SuT.find((key) => key === 'key')).toBe(1);
    });

    it('should return undefined if key does not exist', () => {
      expect(SuT.find((key) => key === 'key')).toBeUndefined();
    });

    it('should return correct key if multiple keys exist', () => {
      SuT_map.set('key1', 1);
      SuT_map.set('key2', 2);
      expect(SuT.find((key) => key === 'key1')).toBe(1);
    });
  });

  describe('findWithValue', () => {
    it('should find a key by value', () => {
      SuT_map.set('key', 1);
      expect(SuT.findWithValue((key, value) => value === 1)).toBe(1);
    });

    it('should return undefined if key does not exist', () => {
      expect(SuT.findWithValue((key, value) => value === 1)).toBeUndefined();
    });

    it('should return correct key if multiple keys exist', () => {
      SuT_map.set('key1', 1);
      SuT_map.set('key2', 2);
      expect(SuT.findWithValue((key, value) => value === 1)).toBe(1);
    });
  });
});
