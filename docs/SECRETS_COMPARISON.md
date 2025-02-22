# GitHub Secrets 比較と設定ガイド

## 既存のkumono-corp-site Secrets vs kumono-media必要なSecrets

### 共通で使用可能なSecrets
- `GCP_PROJECT_ID`: ✅ そのまま使用可能
  - 同じGCPプロジェクトを使用する場合
  
- `GCP_WORKLOAD_IDENTITY_PROVIDER`: ✅ そのまま使用可能
  - GitHub ActionsのWorkload Identity Federation設定は組織レベルで共有可能

- `GCP_SERVICE_ACCOUNT`: ❌ 新規作成推奨
  - 理由：サービス単位でのアクセス制御のため、別のサービスアカウントを作成することを推奨
  - 必要な権限：
    - `roles/run.admin`
    - `roles/storage.admin`
    - `roles/iam.serviceAccountUser`

### kumono-media固有のSecrets
- `MICROCMS_SERVICE_DOMAIN`: 🆕 新規追加必要
  - microCMSの設定から取得
  - メディアサイト専用のサービスドメイン

- `MICROCMS_API_KEY`: 🆕 新規追加必要
  - microCMSの設定から取得
  - メディアサイト専用のAPIキー

## 推奨設定手順

1. GCPサービスアカウントの作成
```bash
# サービスアカウントの作成
gcloud iam service-accounts create kumono-media-deployer \
  --display-name="Kumono Media Deployer"

# 必要な権限の付与
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:kumono-media-deployer@$PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/run.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:kumono-media-deployer@$PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/storage.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:kumono-media-deployer@$PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/iam.serviceAccountUser"
```

2. GitHub Secretsの設定
- `GCP_SERVICE_ACCOUNT`: 新しく作成したサービスアカウントのメールアドレスを設定
- `MICROCMS_SERVICE_DOMAIN`: microCMSのサービスドメインを設定
- `MICROCMS_API_KEY`: microCMSのAPIキーを設定

## 注意事項
- 既存のSecrets（`GCP_PROJECT_ID`と`GCP_WORKLOAD_IDENTITY_PROVIDER`）は、組織レベルで共有することで管理の簡素化が可能
- サービスアカウントは分離することで、セキュリティとアクセス制御の粒度を適切に保つことが可能
- microCMS関連のSecretsは、完全に独立した新規の値が必要
