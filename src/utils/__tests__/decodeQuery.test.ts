import { describe, it, expect } from 'vitest';
import decodeQuery from '../decodeQuery';

describe('decodeQuery', () => {
  it('replaces plus signs with spaces', () => {
    expect(decodeQuery('hello+world')).toBe('hello world');
  });

  it('handles multiple consecutive plus signs', () => {
    expect(decodeQuery('a+++b')).toBe('a b');
  });

  it('returns empty string for empty input', () => {
    expect(decodeQuery('')).toBe('');
  });

  it('leaves strings without plus signs unchanged', () => {
    expect(decodeQuery('radiohead')).toBe('radiohead');
  });
});
