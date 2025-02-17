import * as fs from 'node:fs';
import { Buffer } from 'node:buffer';

import type { RequestBody } from '../../../types';

import { parseRequestBody, stripFileDecorator } from '../../config-parser';

jest.mock('node:fs');

describe('parseRequestBody', () => {
  it('should return empty object if no body', async () => {
    expect(await parseRequestBody(undefined)).toEqual({});
  });

  it('should return body with no ctx provided', async () => {
    expect(
      await parseRequestBody({
        payload: {
          test: 'test',
        },
      }),
    ).toEqual({
      payload: { test: 'test' },
      contentType: undefined,
      encoding: undefined,
    });
  });

  it('should return body with ctx provided', async () => {
    expect(
      await parseRequestBody({
        payload: 'clientId={$input.clientID}&grant_type=12',
        contentType: 'application/x-www-form-urlencoded',
        replacements: [
          {
            target: '/clientId',
            value: '123',
          },
        ],
      }),
    ).toEqual({
      payload: {
        clientId: '123',
        grant_type: '12',
      },
      contentType: 'application/x-www-form-urlencoded',
      encoding: undefined,
    });
  });

  it('should return body with string replacement applied', async () => {
    expect(
      await parseRequestBody({
        payload: {
          test: 'test',
        },
        contentType: 'application/json',
        encoding: 'utf-8',
      }),
    ).toEqual({
      payload: { test: 'test' },
      contentType: 'application/json',
      encoding: 'utf-8',
    });
  });

  it('should handle multipart/form-data', async () => {
    expect(
      await parseRequestBody({
        payload: {
          test: 'test',
        },
        contentType: 'multipart/form-data',
        encoding: 'utf-8',
      }),
    ).toEqual({
      payload: expect.any(Object),
      contentType: expect.stringMatching(
        'multipart/form-data; boundary=--------------------------',
      ),
      encoding: 'utf-8',
    });
  });

  it('should handle multipart/form-data with file', async () => {
    fs.createReadStream.mockReturnValueOnce('readStream');
    // @ts-ignore
    fs.access = jest.fn((_filePath, _mode, callback) => {
      callback();
    });
    expect(
      await parseRequestBody({
        payload: {
          test: 'test',
          file: "$file('file1.txt')",
        },
        contentType: 'multipart/form-data',
        encoding: 'utf-8',
      }),
    ).toEqual({
      payload: expect.any(Object),
      contentType: expect.stringMatching(
        'multipart/form-data; boundary=--------------------------',
      ),
      encoding: 'utf-8',
    });

    jest.resetAllMocks();
  });

  it('should handle multipart/form-data with nested object', async () => {
    const { payload, contentType, encoding } = await parseRequestBody({
      payload: {
        commit: {
          message: 'test',
          author: 'John Doe',
        },
      },
      contentType: 'multipart/form-data',
      encoding: 'utf-8',
    });
    expect(contentType).toMatch('multipart/form-data; boundary=--------------------------');
    expect(encoding).toBe('utf-8');
    expect(typeof payload).toBe('object');

    const expectedProperties = ['commit[message]', 'commit[author]'];
    expectedProperties.forEach((prop) => {
      expect(JSON.stringify(payload)).toContain(prop);
    });
  });

  it('should handle multipart/form-data with array', async () => {
    expect(
      await parseRequestBody({
        payload: {
          test: 'test',
          array: ['test', 'test2'],
        },
        contentType: 'multipart/form-data',
        encoding: 'utf-8',
      }),
    ).toEqual({
      payload: expect.any(Object),
      contentType: expect.stringMatching(
        'multipart/form-data; boundary=--------------------------',
      ),
      encoding: 'utf-8',
    });
  });

  it('should handle multipart/form-data with array with file', async () => {
    fs.createReadStream.mockReturnValueOnce('readStream');
    // @ts-ignore
    fs.access = jest.fn((_filePath, _mode, callback) => {
      callback();
    });
    expect(
      await parseRequestBody({
        payload: {
          test: 'test',
          array: ['test', "$file('file2.txt')"],
        },
        contentType: 'multipart/form-data',
        encoding: 'utf-8',
      }),
    ).toEqual({
      payload: expect.any(Object),
      contentType: expect.stringMatching(
        'multipart/form-data; boundary=--------------------------',
      ),
      encoding: 'utf-8',
    });
    jest.resetAllMocks();
  });

  it('should handle multipart/form-data and return error reading file', async () => {
    fs.createReadStream.mockReturnValueOnce('readStream');
    // @ts-ignore
    fs.access = jest.fn((_filePath, _mode, callback) => {
      callback(new Error('error'));
    });
    try {
      await parseRequestBody({
        payload: {
          test: 'test',
          array: ['test', "$file('file2.txt')"],
        },
        contentType: 'multipart/form-data',
        encoding: 'utf-8',
      });
    } catch (error) {
      expect(error.message).toContain("file2.txt doesn't exist or isn't readable.");
    }
  });

  it('should handle application/octet-stream', async () => {
    fs.createReadStream.mockReturnValueOnce('readStream');
    // @ts-ignore
    fs.access = jest.fn((_filePath, _mode, callback) => {
      callback();
    });
    expect(
      await parseRequestBody({
        payload: "$file('file3.txt')",
        contentType: 'application/octet-stream',
        encoding: 'utf-8',
      }),
    ).toEqual({
      payload: 'readStream',
      contentType: 'application/octet-stream',
      encoding: 'utf-8',
    });
    jest.resetAllMocks();
  });

  it('should handle application/octet-stream with string payload', async () => {
    expect(
      await parseRequestBody({
        payload: new Buffer('test') as unknown as RequestBody['payload'],
        contentType: 'application/octet-stream',
        encoding: 'utf-8',
      }),
    ).toEqual({
      payload: new Buffer('test'),
      contentType: 'application/octet-stream',
      encoding: 'utf-8',
    });
  });

  it('should handle application/octet-stream and return error reading file', async () => {
    fs.createReadStream.mockReturnValueOnce('readStream');
    // @ts-ignore
    fs.access = jest.fn((_filePath, _mode, callback) => {
      callback(new Error('error'));
    });
    await expect(
      parseRequestBody({
        payload: "$file('file3.txt')",
        contentType: 'application/octet-stream',
        encoding: 'utf-8',
      }),
    ).rejects.toThrow("file3.txt doesn't exist or isn't readable.");
  });
});

describe('stripFileDecorator', () => {
  it('should return file name without $file decorator', () => {
    expect(stripFileDecorator("$file('file1.txt')")).toEqual('file1.txt');
  });

  it('should return file name', () => {
    expect(stripFileDecorator('file1.txt')).toEqual('file1.txt');
  });
});
