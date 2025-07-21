import { client } from '../../client';
import { AddTag, Tag } from './tags.dto';

describe('tagsRouter', () => {
  let createdTag: Tag;

  it('[正常系] add', async () => {
    const input: AddTag = {
      name: 'Test Tag',
      description: 'This is a test tag',
    };
    createdTag = await client.tags.add.mutate(input);
    expect(createdTag).toMatchObject({
      name: input.name,
      description: input.description,
    });
  });

  it('[正常系] update', async () => {
    const updatedTag = {
      id: createdTag.id,
      name: '更新されたタグ',
      description: '更新!',
    };

    const result = await client.tags.update.mutate(updatedTag);
    expect(result).toMatchObject({
      id: createdTag.id,
      name: updatedTag.name,
      description: updatedTag.description,
    });
  });

  it('[正常系] list', async () => {
    const tags = await client.tags.list.query();
    expect(Array.isArray(tags)).toBe(true);
    expect(tags.length).toBeGreaterThan(0);
    expect(tags[0]).toHaveProperty('id');
    expect(tags[0]).toHaveProperty('name');
    expect(tags[0]).toHaveProperty('description');
  });
});
