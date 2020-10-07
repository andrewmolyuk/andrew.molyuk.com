data "aws_caller_identity" "current" {}

data "aws_region" "current" {}

# ACM certs only supports us-east-1

provider "aws" {
  region = "us-east-1"
}