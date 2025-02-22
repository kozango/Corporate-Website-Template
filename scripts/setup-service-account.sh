#!/bin/bash

# 環境変数の設定
PROJECT_ID="kumono-media-prod"
SA_NAME="kumono-media-deployer"
SA_DISPLAY_NAME="Kumono Media Deployer"
SA_EMAIL="${SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"

# サービスアカウントの作成
echo "Creating service account..."
gcloud iam service-accounts create $SA_NAME \
  --project=$PROJECT_ID \
  --display-name="$SA_DISPLAY_NAME"

# 必要な権限の付与
echo "Granting necessary roles..."
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$SA_EMAIL" \
  --role="roles/run.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$SA_EMAIL" \
  --role="roles/storage.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$SA_EMAIL" \
  --role="roles/iam.serviceAccountUser"

# Workload Identity Poolとの連携
echo "Setting up Workload Identity Federation..."
gcloud iam service-accounts add-iam-policy-binding $SA_EMAIL \
  --project=$PROJECT_ID \
  --role="roles/iam.workloadIdentityUser" \
  --member="principalSet://iam.googleapis.com/projects/$PROJECT_ID/locations/global/workloadIdentityPools/github-actions-pool/subject/repo:kumono/kumono-media"

echo "Service account setup complete!"
echo "Service Account Email: $SA_EMAIL"
