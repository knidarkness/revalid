import { RedoclyClient } from '../index';

describe('RedoclyClient', () => {
  const REDOCLY_DOMAIN_US = 'redoc.ly';
  const REDOCLY_DOMAIN_EU = 'eu.redocly.com';
  const REDOCLY_AUTHORIZATION_TOKEN = 'redocly-auth-token';
  const testRedoclyDomain = 'redoclyDomain.com';
  const testToken = 'test-token';

  afterEach(() => {
    delete process.env.REDOCLY_DOMAIN;
  });

  it('should resolve the US domain by default', () => {
    const client = new RedoclyClient();
    expect(client.domain).toBe(REDOCLY_DOMAIN_US);
  });

  it('should resolve domain from RedoclyDomain env', () => {
    process.env.REDOCLY_DOMAIN = testRedoclyDomain;
    const client = new RedoclyClient();
    expect(client.domain).toBe(testRedoclyDomain);
  });

  it('should resolve a domain by US region', () => {
    const client = new RedoclyClient('us');
    expect(client.domain).toBe(REDOCLY_DOMAIN_US);
  });

  it('should resolve a domain by EU region', () => {
    const client = new RedoclyClient('eu');
    expect(client.domain).toBe(REDOCLY_DOMAIN_EU);
  });

  it('should resolve domain by EU region prioritizing flag over env variable', () => {
    process.env.REDOCLY_DOMAIN = testRedoclyDomain;
    const client = new RedoclyClient('eu');
    expect(client.domain).toBe(REDOCLY_DOMAIN_EU);
  });

  it('should resolve domain by US region prioritizing flag over env variable', () => {
    process.env.REDOCLY_DOMAIN = testRedoclyDomain;
    const client = new RedoclyClient('us');
    expect(client.domain).toBe(REDOCLY_DOMAIN_US);
  });

  it('should resolve valid tokens data', async () => {
    let spy = jest.spyOn(RedoclyClient.prototype, 'readCredentialsFile').mockImplementation(() => {
      return { us: "accessToken", eu: "eu-accessToken" }
    });
    const client = new RedoclyClient();
    const tokens = await client.getValidTokens();
    expect(tokens).toStrictEqual([
      { region: 'us', token: 'accessToken', valid: true },
      { region: 'eu', token: 'eu-accessToken', valid: true }
    ]);
    spy.mockRestore();
  });

  it('should set correct accessTokens - backward compatibility: default US region', () => {
    let spy = jest.spyOn(RedoclyClient.prototype, 'readCredentialsFile').mockImplementation(() => ({ token: testToken }));
    jest.spyOn(RedoclyClient.prototype, 'setAccessTokens').mockImplementation();
    const client = new RedoclyClient();
    expect(client.setAccessTokens).toBeCalledWith(
      expect.objectContaining({ us: testToken })
    );
    spy.mockRestore();
  });

  it('should set correct accessTokens - backward compatibility: EU region', () => {
    let spy = jest.spyOn(RedoclyClient.prototype, 'readCredentialsFile').mockImplementation(() => ({ token: testToken }));
    jest.spyOn(RedoclyClient.prototype, 'setAccessTokens').mockImplementation();
    const client = new RedoclyClient('eu');
    expect(client.setAccessTokens).toBeCalledWith(
      expect.objectContaining({ eu: testToken })
    );
    spy.mockRestore();
  });

  it('should set correct accessTokens - REDOCLY_AUTHORIZATION env', () => {
    process.env.REDOCLY_AUTHORIZATION = REDOCLY_AUTHORIZATION_TOKEN;
    let spy = jest.spyOn(RedoclyClient.prototype, 'readCredentialsFile').mockImplementation();
    jest.spyOn(RedoclyClient.prototype, 'setAccessTokens').mockImplementation();
    const client = new RedoclyClient();
    expect(client.setAccessTokens).toHaveBeenNthCalledWith(1, { "us": REDOCLY_AUTHORIZATION_TOKEN });
    spy.mockRestore();
  });

  it('should set correct accessTokens prioritizing REDOCLY_AUTHORIZATION env over token in file', () => {
    process.env.REDOCLY_AUTHORIZATION = REDOCLY_AUTHORIZATION_TOKEN;
    let spy = jest.spyOn(RedoclyClient.prototype, 'readCredentialsFile').mockImplementation(() => ({ token: testToken }));
    jest.spyOn(RedoclyClient.prototype, 'setAccessTokens').mockImplementation();
    const client = new RedoclyClient();
    expect(client.setAccessTokens).toHaveBeenNthCalledWith(2, { "us": REDOCLY_AUTHORIZATION_TOKEN });
    spy.mockRestore();
  });

});
