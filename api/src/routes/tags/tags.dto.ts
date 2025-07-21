import { Infer, nullable, object, omit, string } from 'superstruct';
import { uuid } from '../../index.dto';

export const tag = object({
  id: uuid,
  name: string(),
  description: nullable(string()),
});

export type Tag = Infer<typeof tag>;

export const addTag = omit(tag, ['id']);
export type AddTag = Infer<typeof addTag>;

export const updateTag = omit(tag, []);
export type UpdateTag = Infer<typeof updateTag>;
