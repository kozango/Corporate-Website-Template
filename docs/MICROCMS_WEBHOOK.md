# microCMS Webhook設定手順

## 1. GitHub Personal Access Token (PAT)の作成

1. GitHubで「Settings」→「Developer settings」→「Personal access tokens」→「Tokens (classic)」に移動
2. 「Generate new token」をクリック
3. 以下の設定を行う：
   - Note: `kumono-media-webhook`
   - Expiration: 適切な期限を選択
   - Scopes:
     - `repo` (すべてのリポジトリ権限)
4. トークンを生成してコピー（この画面を閉じると二度と表示されないので注意）

## 2. microCMSのWebhook設定

1. microCMSの管理画面にログイン
2. 「API設定」→「Webhook」に移動
3. 「新規作成」をクリック
4. 以下の情報を入力：

```
名前: GitHub Actions Trigger
説明: 記事公開時にGitHub Actionsをトリガー

エンドポイント:
https://api.github.com/repos/kumono/kumono-media/dispatches

メソッド: POST

ヘッダー:
Authorization: Bearer YOUR_GITHUB_PAT
Accept: application/vnd.github.v3+json
Content-Type: application/json

ボディ:
{
  "event_type": "trigger-deploy"
}

送信のタイミング:
✓ コンテンツの公開時
✓ コンテンツの更新時
```

5. 「作成」をクリック

## 3. Webhookのテスト

1. テスト用の記事を作成
2. 記事を公開
3. GitHub Actionsでワークフローが実行されることを確認
4. デプロイが完了したら記事が表示されることを確認

## 4. エラー通知の設定

1. microCMSの「API設定」→「Webhook」で該当のWebhookを選択
2. 「編集」をクリック
3. 「エラー通知」セクションで以下を設定：
   - 通知メールアドレスを追加
   - Slackの通知チャンネルを設定（必要な場合）

## トラブルシューティング

### Webhookが失敗する場合

1. GitHub PATの有効期限を確認
2. PATのスコープが適切か確認
3. リポジトリ名とパスが正しいか確認
4. GitHubのRate Limitに達していないか確認

### デプロイが実行されない場合

1. GitHub Actionsの権限設定を確認
2. ワークフローファイルの`on.repository_dispatch`設定を確認
3. ブランチ保護ルールが邪魔していないか確認

### その他の注意点

- Webhookは冪等性を持つように設計されている
- 同じ記事の複数回の更新でも問題なく動作
- エラー時は自動でリトライする設定になっている
