import { client } from '../../client';
import { CreateCastle } from './castles.dto';

describe('castlesRouter', () => {
  it('addCastle', async () => {
    const castle: CreateCastle = {
      name: 'E2Eテスト城',
      aka: ['別名1', '別名2'],
      description: 'これはE2Eテスト用の城です。',
      latitude: 35.6895,
      longitude: 139.6917,
    };

    const res = await client.castles.add.mutate(castle);
    expect(res).toMatchObject(castle);
  });
});
