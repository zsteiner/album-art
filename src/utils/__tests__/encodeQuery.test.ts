import { describe, it, expect } from 'vitest';
import encodeQuery from '../encodeQuery';

describe('encodeQuery', () => {
  it('replaces spaces with plus signs', () => {
    expect(encodeQuery('hello world')).toBe('hello+world');
  });

  it('handles multiple spaces', () => {
    expect(encodeQuery('a b c')).toBe('a+b+c');
  });

  it('returns empty string for empty input', () => {
    expect(encodeQuery('')).toBe('');
  });

  it('leaves strings without spaces unchanged', () => {
    expect(encodeQuery('radiohead')).toBe('radiohead');
  });
});
