const healthUrl = process.env.SERVER_HEALTH_URL;

if (healthUrl) {
  test('serverless API health endpoint responds successfully', async () => {
    const response = await fetch(healthUrl);
    expect(response.ok).toBe(true);
  });
} else {
  test.skip('serverless API health endpoint responds successfully', () => {});
}
