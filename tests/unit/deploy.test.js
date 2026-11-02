import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vite-plus/test';
import { execFileSync } from 'node:child_process';
import { deploy } from '../../scripts/deploy.js';
import { sentryRelease } from '../../scripts/sentry-release.js';

vi.mock('node:child_process', () => ({ execFileSync: vi.fn() }));
vi.mock('../../scripts/sentry-release.js', () => ({
  sentryRelease: vi.fn(() => 'hangvidu@0.0.3+test-sha'),
}));

const commands = () => execFileSync.mock.calls.map(([, args]) => args);

function failOn(args) {
  execFileSync.mockImplementation((_command, actual) => {
    if (JSON.stringify(actual) === JSON.stringify(args)) {
      throw new Error('command failed');
    }
  });
}

describe('deploy runner', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    execFileSync.mockReset();
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });
  afterEach(() => vi.restoreAllMocks());

  it('validates and builds before deploying Worker, then Hosting, using one release', () => {
    deploy({ withWorker: true });
    expect(commands()).toEqual([
      ['run', 'p2p:prod'],
      ['run', 'lint:cf'],
      ['run', 'test:cf'],
      ['run', 'test:compat'],
      ['run', 'build'],
      ['-C', 'backend/cloudflare', 'run', 'deploy'],
      ['exec', 'firebase', 'deploy', '--only', 'hosting'],
      ['run', 'sentry:deploy'],
    ]);
    expect(sentryRelease).toHaveBeenCalledOnce();
    const buildEnv = execFileSync.mock.calls[4][2].env;
    const markerEnv = execFileSync.mock.calls.at(-1)[2].env;
    expect(buildEnv.SENTRY_RELEASE).toBe('hangvidu@0.0.3+test-sha');
    expect(buildEnv.SENTRY_UPLOAD).toBe('true');
    expect(markerEnv).toBe(buildEnv);
  });

  it('keeps the default deploy limited to Hosting', () => {
    deploy();
    expect(commands()).toEqual([
      ['run', 'p2p:prod'],
      ['run', 'test:compat'],
      ['run', 'build'],
      ['exec', 'firebase', 'deploy', '--only', 'hosting'],
      ['run', 'sentry:deploy'],
    ]);
  });

  it('prepares functions and preserves Firebase-only deploy:all scope', () => {
    deploy({ allFirebase: true });
    expect(commands()).toEqual([
      ['run', 'p2p:prod'],
      ['run', 'install:fb:functions'],
      ['run', 'test:compat'],
      ['run', 'build'],
      ['exec', 'firebase', 'deploy'],
      ['run', 'sentry:deploy'],
    ]);
  });

  it('skips compat tests only when explicitly requested', () => {
    deploy({ skipTests: true });
    expect(commands()).not.toContainEqual(['run', 'test:compat']);
    expect(commands()).toContainEqual(['run', 'build']);
  });

  it.each([
    ['run', 'test:compat'],
    ['run', 'build'],
  ])('stops before any deployment when %j fails', (...args) => {
    failOn(args);
    expect(() => deploy({ withWorker: true })).toThrow('command failed');
    expect(commands()).not.toContainEqual([
      '-C',
      'backend/cloudflare',
      'run',
      'deploy',
    ]);
    expect(commands()).not.toContainEqual([
      'exec',
      'firebase',
      'deploy',
      '--only',
      'hosting',
    ]);
    expect(commands()).not.toContainEqual(['run', 'sentry:deploy']);
  });

  it('does not deploy Hosting when the Worker deploy fails', () => {
    failOn(['-C', 'backend/cloudflare', 'run', 'deploy']);
    expect(() => deploy({ withWorker: true })).toThrow('command failed');
    expect(commands()).not.toContainEqual([
      'exec',
      'firebase',
      'deploy',
      '--only',
      'hosting',
    ]);
  });

  it('does not mark a failed Firebase deploy as deployed', () => {
    failOn(['exec', 'firebase', 'deploy', '--only', 'hosting']);
    expect(() => deploy()).toThrow('command failed');
    expect(commands()).not.toContainEqual(['run', 'sentry:deploy']);
  });

  it('reports marker failure separately and provides an exact-release retry', () => {
    failOn(['run', 'sentry:deploy']);
    expect(() => deploy()).not.toThrow();
    expect(console.warn).toHaveBeenCalledWith(
      'Deployment succeeded, but the Sentry deploy marker failed.',
    );
    expect(console.warn).toHaveBeenCalledWith(
      "Retry only the marker: SENTRY_RELEASE='hangvidu@0.0.3+test-sha' pnpm run sentry:deploy",
    );
  });
});
