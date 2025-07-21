'use client';

import Button from '@/components/share/Button';
import Input from '@/components/share/Input';
import { useEditCastle } from '@/hooks/useEditCastle';
import styles from './index.module.scss';
import TextArea from '@/components/share/TextArea';
import TagSelector from './TagSelector';

export default function EditInfo() {
  const { isNew, editingCastle, setEditingCastle, cancel, remove, submit } = useEditCastle();

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
            <TagSelector onChange={(vs) => setEditingCastle({ tags: vs.map((v) => v.label) })} />
          </div>

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
