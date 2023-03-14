import NodeCache from 'node-cache';

class InternalCache {
  private cache: NodeCache;

  constructor() {
    this.cache = new NodeCache();
  }

  get<T>(key: string): T | undefined {
    return this.cache.get(key);
  }

  // * ttl is in seconds (default 1 hour)
  set<T>(key: string, value: T, ttl: number = 3600): boolean {
    return this.cache.set(key, value, ttl);
  }
}

export default new InternalCache();
