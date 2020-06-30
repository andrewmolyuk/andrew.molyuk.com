resource "aws_s3_bucket" "website" {
  bucket = "andrew.molyuk.com"
  acl    = "private"

  tags = {
  Name = "andrew.molyuk.com" }
}
