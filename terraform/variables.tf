variable "project_id" {
  description = "The project ID to deploy to"
  type        = string
}

variable "region" {
  description = "The region to deploy to"
  type        = string
  default     = "asia-northeast1"
}

variable "container_image" {
  description = "The container image to deploy"
  type        = string
}

variable "domain_name" {
  description = "The domain name to map to the service"
  type        = string
  default     = "kumono-media.com"
}

variable "microcms_service_domain" {
  description = "The microCMS service domain"
  type        = string
}

variable "microcms_api_key" {
  description = "The microCMS API key"
  type        = string
  sensitive   = true
}
