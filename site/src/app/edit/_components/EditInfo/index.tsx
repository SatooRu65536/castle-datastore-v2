'use client';

import Button from '@/components/share/Button';
import Input from '@/components/share/Input';
import { useEditCastle } from '@/hooks/useEditCastle';
import styles from './index.module.scss';
import TextArea from '@/components/share/TextArea';
import TagSelector from './TagSelector';
import StructureSelector from './StructureSelector';
import { StructuresStatus } from '@/types/structures';

const statuses = [
  StructuresStatus.Existing,
  StructuresStatus.Ruined,
  StructuresStatus.Restoration,
  StructuresStatus.Reconstruction,
  StructuresStatus.Unknown,
] as const;

export default function EditInfo() {
  const { isNew, editingCastle, structures, setEditingCastle, setStructures, cancel, remove, submit } = useEditCastle();

  return (
    <div className={styles.edit_info}>
      {editingCastle === undefined ? (
        <div className={styles.container}>選択してください</div>
      ) : (
        <div className={styles.container}>
          <div className={styles.box}>
            <h3>城名</h3>
            <Input
              placeholder="城名"
              type="text"
              value={editingCastle.name}
              onChange={(e) => setEditingCastle({ name: e.target.value })}
            />
          </div>

          <div className={styles.box}>
            <h3>位置</h3>
            <p>
              <span>緯度:</span>
              <Input
                type="number"
                value={editingCastle.latitude}
                placeholder="緯度"
                onChange={(e) => setEditingCastle({ latitude: parseFloat(e.currentTarget.value) })}
              />
            </p>
            <p>
              <span>経度:</span>
              <Input
                type="number"
                value={editingCastle.longitude}
                placeholder="経度"
                onChange={(e) => setEditingCastle({ longitude: parseFloat(e.currentTarget.value) })}
              />
            </p>
            <p className={styles.desc}>マーカーを移動させても変更できます。</p>
          </div>

          <div className={styles.box}>
            <h3>タグ</h3>
            <TagSelector values={editingCastle.tags} onChange={(tags) => setEditingCastle({ tags: [...tags] })} />
          </div>

          {statuses.map((status) => (
            <div className={styles.box} key={status}>
              <h3>構造物({status})</h3>
              <StructureSelector values={structures[status]} onChange={(s) => setStructures(s, status)} />
            </div>
          ))}

          <div className={styles.box}>
            <h3>説明</h3>
            <TextArea
              placeholder="説明"
              value={editingCastle.description}
              onChange={(e) => setEditingCastle({ description: e.target.value })}
            />
          </div>

          <div className={styles.button_box}>
            <Button outline onClick={cancel}>
              {isNew ? '取り消し' : '選択解除'}
            </Button>
            {!isNew && (
              <Button danger onClick={remove}>
                削除
              </Button>
            )}
            <Button onClick={submit} className={styles.submit}>
              送信
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
