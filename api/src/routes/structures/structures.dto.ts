import { Infer, nullable, object, omit, string } from 'superstruct';
import { uuid } from '../../index.dto';

export const structure = object({
  id: uuid,
  name: string(),
  description: nullable(string()),
});
export type Structure = Infer<typeof structure>;

export const addStructure = omit(structure, ['id']);
export type AddStructure = Infer<typeof addStructure>;

export const updateStructure = omit(structure, []);
export type UpdateStructure = Infer<typeof updateStructure>;
