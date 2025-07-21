# Castle Datastore v2
日本の城をマップ上から探すためのWebアプリケーションです。

# セットアップ
## バックエンド
```shell
cd api
pnpm install
pnpm dev
```

初回はサーバを一時停止し、以下を実行する必要があります。

```shell
pnpm migrate
pnpm seed
```

## フロントエンド
```shell
cd site
pnpm install
pnpm dev
```

### 環境変数
ローカル環境以外のAPIを使用する場合は、`.env.local` ファイルを作成し、`DATABASE_URL` を変更してください。

```shell
cp .env.example .env.local
```

# LICENSE
[MIT License](./LICENSE)
