import { define } from 'superstruct';
import isUuid from 'is-uuid';

export type Uuid = string & { __uuid: true };
export const uuid = define<Uuid>('Uuid', (v) => isUuid.v4(v as string));
