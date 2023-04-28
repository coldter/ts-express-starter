import { describe, it, expect } from '@jest/globals';

describe('test', () => {
  it('should work', () => {
    expect(true).toBe(true);
  });
});

describe('Server Status Check', () => {
  it('should return 200 OK', async () => {
    const res = await global.testRequest.get('/status');
    expect(res.status).toBe(200);
  });
});
