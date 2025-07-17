import { TRPCClientError } from '@trpc/client';
import { client } from '../../client';
import { Uuid } from '../../index.dto';
import { Castle, AddCastle, StructuresStatus } from './castles.dto';
import { v4 } from 'uuid';

describe('castlesRouter', () => {
  let createdCastle: Castle;

  it('[正常系] add', async () => {
    const castle: AddCastle = {
      name: 'E2Eテスト城',
      aka: ['別名1', '別名2'],
      description: 'これはE2Eテスト用の城です。',
      latitude: 35.6895,
      longitude: 139.6917,
      structures: [
        {
          name: '天守閣',
          status: StructuresStatus.Restoration,
        },
        {
          name: '石垣',
          status: StructuresStatus.Existing,
        },
      ],
      tags: ['日本百名城', '国指定史跡'],
    };

    createdCastle = await client.castles.add.mutate(castle);
    expect(createdCastle).toMatchObject(castle);
  });

  it('[正常系] get', async () => {
    const res = await client.castles.get.query({ castleId: createdCastle.castleId });
    expect(res).toMatchObject(createdCastle);
  });

  it('[異常系] get - 不正なID', async () => {
    try {
      const res = await client.castles.get.query({ castleId: 'non-existent-id' as Uuid });
    } catch (err) {
      if (err instanceof TRPCClientError) {
        expect(err.data.httpStatus).toBe(400);
      } else {
        throw err;
      }
    }
  });

  it('[異常系] get - 存在しないID', async () => {
    try {
      const res = await client.castles.get.query({ castleId: v4() as Uuid });
    } catch (err) {
      if (err instanceof TRPCClientError) {
        expect(err.data.httpStatus).toBe(404);
      } else {
        throw err;
      }
    }
  });

  it('[正常系] delete', async () => {
    await client.castles.delete.mutate({ castleId: createdCastle.castleId });
  });

  it('[異常系] delete - 不正なID', async () => {
    try {
      await client.castles.delete.mutate({ castleId: 'non-existent-id' as Uuid });
    } catch (err) {
      if (err instanceof TRPCClientError) {
        expect(err.data.httpStatus).toBe(400);
      } else {
        throw err;
      }
    }
  });

  it('[異常系] delete - 存在しないID', async () => {
    try {
      await client.castles.delete.mutate({ castleId: v4() as Uuid });
    } catch (err) {
      if (err instanceof TRPCClientError) {
        expect(err.data.httpStatus).toBe(404);
      } else {
        throw err;
      }
    }
  });

  it('[正常系] list', async () => {
    const castles = await client.castles.list.query({
      maxResults: 10,
      minLatitude: 0,
      maxLatitude: 90,
      minLongitude: 90,
      maxLongitude: 180,
      minScale: 0,
    });
    expect(castles).toBeInstanceOf(Array);
    expect(castles.length).toBeGreaterThan(0);
    castles.forEach((castle) => {
      expect(castle).toHaveProperty('castleId');
      expect(castle).toHaveProperty('name');
      expect(castle).toHaveProperty('latitude');
      expect(castle).toHaveProperty('longitude');
    });
  });

  it('[正常系] info', async () => {
    const info = await client.castles.info.query();

    expect(info).toHaveProperty('num');
    expect(info).toHaveProperty('updatedAt');
    expect(typeof info.num).toBe('number');
    expect(info.updatedAt).toBeInstanceOf(Date);
  });
});
