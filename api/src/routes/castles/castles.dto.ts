import { object, string, number, array, date, Infer, omit, pick, defaulted, enums, assign } from 'superstruct';
import { uuid } from '../../index.dto';

export enum StructuresStatus {
  Existing = '現存',
  Ruined = '消失',
  Restoration = '復元',
  Reconstruction = '復興',
  Unknown = '不明',
}

export const castleStructure = object({
  name: string(),
  status: enums([
    StructuresStatus.Existing,
    StructuresStatus.Ruined,
    StructuresStatus.Restoration,
    StructuresStatus.Reconstruction,
    StructuresStatus.Unknown,
  ]),
});
export type CastleStructure = Infer<typeof castleStructure>;

export const castle = object({
  castleId: uuid,
  name: string(),
  aka: array(string()),
  description: string(),
  latitude: number(),
  longitude: number(),
  updatedAt: date(),
  scale: number(),
  tags: array(string()),
  structures: array(castleStructure),
});
export type Castle = Infer<typeof castle>;

export const addCastle = omit(castle, ['castleId', 'updatedAt', 'scale']);
export type AddCastle = Infer<typeof addCastle>;

export const updateCastle = omit(castle, ['updatedAt', 'scale']);
export type UpdateCastle = Infer<typeof updateCastle>;

export const getCastle = pick(castle, ['castleId']);
export type GetCastle = Infer<typeof getCastle>;

export const listCastleOptions = object({
  maxResults: defaulted(number(), 100),
  minLatitude: number(),
  maxLatitude: number(),
  minLongitude: number(),
  maxLongitude: number(),
  minScale: defaulted(number(), 0),
});
export type ListCastleOptions = Infer<typeof listCastleOptions>;

export type CastleInfo = {
  num: number;
  updatedAt: Date;
};
