import { describe, it, expect } from 'vitest';
import decodeQuery from '../decodeQuery';

describe('decodeQuery', () => {
  it('decodes percent-encoded spaces', () => {
    expect(decodeQuery('hello%20world')).toBe('hello world');
  });

  it('decodes multiple encoded characters', () => {
    expect(decodeQuery('a%20b%20c')).toBe('a b c');
  });

  it('returns empty string for empty input', () => {
    expect(decodeQuery('')).toBe('');
  });

  it('leaves strings without plus signs unchanged', () => {
    expect(decodeQuery('radiohead')).toBe('radiohead');
  });
});
