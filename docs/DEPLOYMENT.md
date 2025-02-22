# デプロイメント設定ガイド

## 1. GitHub Secretsの設定

以下のSecretをGitHubリポジトリの Settings > Secrets and variables > Actions で設定してください：

### GCPの認証情報
1. `GCP_PROJECT_ID`
   - Google Cloud ProjectのプロジェクトID
   - 例: `kumono-media-prod`

2. `GCP_WORKLOAD_IDENTITY_PROVIDER`
   - Workload Identity Federationのプロバイダー
   - 形式: `projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/providers/PROVIDER_ID`

3. `GCP_SERVICE_ACCOUNT`
   - デプロイに使用するサービスアカウント
   - 形式: `SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com`

### microCMSの認証情報
1. `MICROCMS_SERVICE_DOMAIN`
   - microCMSのサービスドメイン
   - microCMSのAPI設定から取得

2. `MICROCMS_API_KEY`
   - microCMSのAPIキー
   - microCMSのAPI設定から取得

## 2. microCMS Webhookの設定

1. microCMSの管理画面で「API設定」→「Webhook」を開く
2. 「新規作成」をクリック
3. 以下の設定を行う：
   - 名前: `GitHub Actions Trigger`
   - URL: `https://api.github.com/repos/OWNER/REPO/dispatches`
   - メソッド: `POST`
   - ヘッダー:
     ```
     Authorization: Bearer YOUR_GITHUB_PAT
     Accept: application/vnd.github.v3+json
     ```
   - ボディ:
     ```json
     {
       "event_type": "trigger-deploy"
     }
     ```

## 3. カスタムドメインの設定

1. Cloud Runのコンソールで対象のサービスを選択
2. 「ドメインマッピング」タブを選択
3. 「ドメインマッピングを管理」をクリック
4. 「ドメインマッピングを追加」をクリック
5. 以下の設定を行う：
   - ドメイン: `kumono-media.com`
   - サービス: `kumono-media`
   - リージョン: `asia-northeast1`

### DNSレコードの設定

お使いのDNSプロバイダーで以下のレコードを設定：

```
NAME                TYPE   DATA
kumono-media.com    A      グローバルIPアドレス
kumono-media.com    AAAA   グローバルIPv6アドレス
```

## 4. デプロイの確認

1. GitHub Actionsの動作確認：
   ```bash
   git push origin main
   ```

2. Webhook経由のデプロイ確認：
   - microCMSで記事を作成・公開
   - GitHub Actionsの実行を確認
   - デプロイの完了を確認

3. SSL/TLSの確認：
   ```bash
   curl -I https://kumono-media.com
   ```
   
   以下のレスポンスヘッダーを確認：
   ```
   HTTP/2 200
   content-type: text/html
   strict-transport-security: max-age=31536000
   ```
