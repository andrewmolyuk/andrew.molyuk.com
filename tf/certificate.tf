resource "aws_acm_certificate" "main" {
  domain_name               = "molyuk.com"
  subject_alternative_names = ["*.molyuk.com"]
  validation_method         = "DNS"
  tags = {
    Name = "molyuk.com"
  }
}

resource "aws_route53_record" "cert_validation" {
  name    = aws_acm_certificate.main.domain_validation_options.0.resource_record_name
  type    = aws_acm_certificate.main.domain_validation_options.0.resource_record_type
  zone_id = aws_route53_zone.main.zone_id
  records = [aws_acm_certificate.main.domain_validation_options.0.resource_record_value]
  ttl     = 60
}

resource "aws_acm_certificate_validation" "cert" {
  certificate_arn         = aws_acm_certificate.main.arn
  validation_record_fqdns = [aws_route53_record.cert_validation.fqdn]
}