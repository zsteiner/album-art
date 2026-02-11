import { describe, it, expect } from 'vitest';
import encodeQuery from '../encodeQuery';

describe('encodeQuery', () => {
  it('encodes spaces', () => {
    expect(encodeQuery('hello world')).toBe('hello%20world');
  });

  it('handles multiple spaces', () => {
    expect(encodeQuery('a b c')).toBe('a%20b%20c');
  });

  it('returns empty string for empty input', () => {
    expect(encodeQuery('')).toBe('');
  });

  it('leaves strings without spaces unchanged', () => {
    expect(encodeQuery('radiohead')).toBe('radiohead');
  });
});
