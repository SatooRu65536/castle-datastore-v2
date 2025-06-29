import { object, string, number, array, date, Infer, omit } from 'superstruct';
import { uuid } from '../../index.dto';

export const castle = object({
  castleId: uuid,
  name: string(),
  aka: array(string()),
  description: string(),
  latitude: number(),
  longitude: number(),
  updatedAt: date(),
});
export type Castle = Infer<typeof castle>;

export const createCastle = omit(castle, ['castleId', 'updatedAt']);
export type CreateCastle = Infer<typeof createCastle>;
