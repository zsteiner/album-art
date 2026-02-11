import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { createRouter, createMemoryHistory } from 'vue-router';
import { useAlbumStore } from '../albumStore';

function createTestRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', name: 'home', component: { template: '<div />' } },
      { path: '/itunes', name: 'itunes', component: { template: '<div />' } },
    ],
  });
}

// Mock vue-router's useRouter to return our test router
let testRouter: ReturnType<typeof createTestRouter>;

vi.mock('vue-router', async () => {
  const actual = await vi.importActual<typeof import('vue-router')>('vue-router');
  return {
    ...actual,
    useRouter: () => testRouter,
  };
});

describe('albumStore', () => {
  beforeEach(async () => {
    testRouter = createTestRouter();
    await testRouter.push('/itunes');
    setActivePinia(createPinia());
  });

  it('initializes with default state', () => {
    const store = useAlbumStore();
    expect(store.albums).toEqual([]);
    expect(store.media).toBe('music');
    expect(store.searchTerm).toBeNull();
    expect(store.madeSearch).toBe(false);
    expect(store.error).toBeNull();
    expect(store.loading).toBe(false);
    expect(store.entity).toBe('album');
  });

  it('sets search term and persists to localStorage', () => {
    const store = useAlbumStore();
    store.setSearchTerm('radiohead');
    expect(store.searchTerm).toBe('radiohead');
    expect(localStorage.getItem('searchTerm')).toBe('radiohead');
  });

  it('updates media and entity correctly', () => {
    const store = useAlbumStore();

    store.updateMedia('music');
    expect(store.entity).toBe('album');

    store.updateMedia('tvShow');
    expect(store.entity).toBe('tvSeason');

    store.updateMedia('all');
    expect(store.entity).toBe('allTrack');

    store.updateMedia('movie');
    expect(store.entity).toBe('movie');

    store.updateMedia('podcast');
    expect(store.entity).toBe('podcast');
  });

  it('parses query strings with valid media type', () => {
    const store = useAlbumStore();
    store.getQueryStrings('radiohead', 'music');
    expect(store.searchTerm).toBe('radiohead');
    expect(store.media).toBe('music');
  });

  it('falls back to music for invalid media type', () => {
    const store = useAlbumStore();
    store.getQueryStrings('radiohead', 'invalid');
    expect(store.searchTerm).toBe('radiohead');
    expect(store.media).toBe('music');
  });

  it('does nothing when query strings are undefined', () => {
    const store = useAlbumStore();
    store.getQueryStrings(undefined, undefined);
    expect(store.searchTerm).toBeNull();
  });

  it('decodes plus signs in query strings', () => {
    const store = useAlbumStore();
    store.getQueryStrings('the+national', 'music');
    expect(store.searchTerm).toBe('the national');
  });
});
