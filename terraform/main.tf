terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 4.0"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

# Cloud Run Service
resource "google_cloud_run_service" "default" {
  name     = "kumono-media"
  location = var.region

  template {
    spec {
      containers {
        image = var.container_image
        env {
          name  = "MICROCMS_SERVICE_DOMAIN"
          value = var.microcms_service_domain
        }
        env {
          name  = "MICROCMS_API_KEY"
          value = var.microcms_api_key
        }
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}

# IAM policy to make the service public
resource "google_cloud_run_service_iam_member" "public" {
  service  = google_cloud_run_service.default.name
  location = google_cloud_run_service.default.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}

# Domain mapping
resource "google_cloud_run_domain_mapping" "default" {
  name     = var.domain_name
  location = var.region
  metadata {
    namespace = var.project_id
  }
  spec {
    route_name = google_cloud_run_service.default.name
  }
}
