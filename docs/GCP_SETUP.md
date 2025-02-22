# GCP設定手順

## 1. サービスアカウントの作成

1. GCPコンソールで「IAMと管理」→「サービスアカウント」に移動
2. 「サービスアカウントを作成」をクリック
3. 以下の情報を入力：
   - サービスアカウント名: `kumono-media-deployer`
   - 説明: `Kumono Media Deployer for GitHub Actions`
4. 「作成して続行」をクリック
5. 以下の役割を追加：
   - Cloud Run 管理者 (`roles/run.admin`)
   - ストレージ管理者 (`roles/storage.admin`)
   - サービスアカウントユーザー (`roles/iam.serviceAccountUser`)
6. 「完了」をクリック

## 2. Workload Identity Federationの設定

1. 「IAMと管理」→「Workload Identity Federation」に移動
2. 既存のプールを選択または新規作成
3. 「プロバイダーを追加」をクリック
4. 以下の情報を設定：
   - プロバイダー名: `github-actions`
   - 発行者: `https://token.actions.githubusercontent.com`
   - GitHub組織: `kumono`
   - リポジトリパターン: `kumono-media`
5. 「作成」をクリック

## 3. サービスアカウントとWorkload Identityの連携

1. 「IAMと管理」→「サービスアカウント」に移動
2. `kumono-media-deployer`サービスアカウントを選択
3. 「権限」タブで「アクセスを許可」をクリック
4. 以下の設定を追加：
   - プリンシパル: `principalSet://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/github-actions-pool/subject/repo:kumono/kumono-media`
   - 役割: `roles/iam.workloadIdentityUser`

## 4. Cloud Runの設定

1. Cloud Runコンソールに移動
2. 「サービスを作成」をクリック
3. 以下の設定を行う：
   - サービス名: `kumono-media`
   - リージョン: `asia-northeast1`
   - 認証: `すべてのユーザーにアクセスを許可`
   - コンテナポート: `8080`
   - 環境変数:
     - `MICROCMS_SERVICE_DOMAIN`
     - `MICROCMS_API_KEY`

## 5. ドメインマッピング

1. Cloud Runサービスの詳細ページに移動
2. 「ドメインマッピング」タブを選択
3. 「ドメインマッピングを管理」をクリック
4. 「ドメインマッピングを追加」をクリック
5. `kumono-media.com`を入力
6. 「続行」をクリック

## 6. 必要な情報の収集

以下の情報をGitHub Secretsに設定するために収集：

1. `GCP_SERVICE_ACCOUNT`: `kumono-media-deployer@PROJECT_ID.iam.gserviceaccount.com`
2. `GCP_WORKLOAD_IDENTITY_PROVIDER`: プールの詳細ページからプロバイダー名をコピー
3. `GCP_PROJECT_ID`: プロジェクトIDをコピー
