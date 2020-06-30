resource "aws_s3_bucket" "terraform" {
  bucket = "terraform-${data.aws_caller_identity.current.account_id}"
  region = data.aws_region.current.name

  lifecycle {
    prevent_destroy = true
  }

  versioning {
    enabled = true
  }

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }

  tags = {
    Name = "terraform-state-bucket"
  }
}

# Following code should be performed with hardcoded values after code above is done
# TODO: Generate output file with bucket-name and values

terraform {
  backend "s3" {
    bucket = "terraform-005497824030"
    key    = "andrew.molyuk.com/terraform.tfstate"
    region = "us-east-1"
  }
}
