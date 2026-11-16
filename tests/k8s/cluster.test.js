const { execFileSync } = require('node:child_process');

const runIntegration = process.env.K8S_INTEGRATION === '1';

if (runIntegration) {
  test('Kubernetes cluster has at least one Ready node', () => {
    const args = ['get', 'nodes', '-o', 'json'];
    if (process.env.KUBE_CONTEXT) {
      args.unshift('--context', process.env.KUBE_CONTEXT);
    }

    const output = execFileSync('kubectl', args, {
      encoding: 'utf8',
      timeout: 30_000,
    });
    const nodes = JSON.parse(output).items;

    expect(nodes.length).toBeGreaterThan(0);
    for (const node of nodes) {
      expect(node.status.conditions).toContainEqual(
        expect.objectContaining({ type: 'Ready', status: 'True' }),
      );
    }
  });
} else {
  test.skip('Kubernetes cluster has at least one Ready node', () => {});
}
