resource "aws_route53_zone" "main" {
  name = "molyuk.com"
  tags = {
    Name = "molyuk.com"
  }
}

resource "aws_route53_record" "ns" {
  allow_overwrite = true
  name            = aws_route53_zone.main.name
  ttl             = 172800
  type            = "NS"
  zone_id         = aws_route53_zone.main.zone_id

  records = [
    "${aws_route53_zone.main.name_servers.0}",
    "${aws_route53_zone.main.name_servers.1}",
    "${aws_route53_zone.main.name_servers.2}",
    "${aws_route53_zone.main.name_servers.3}",
  ]
}

resource "aws_route53_record" "mx" {
  zone_id = aws_route53_zone.main.id
  name    = aws_route53_zone.main.name
  type    = "MX"
  ttl     = "900"
  records = ["10 mx.yandex.net."]
}

resource "aws_route53_record" "spf" {
  zone_id = aws_route53_zone.main.zone_id
  name    = aws_route53_zone.main.name
  type    = "TXT"
  ttl     = "300"
  records = ["v=spf1 redirect=_spf.yandex.net"]
}

resource "aws_route53_record" "dkim" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "mail._domainkey"
  type    = "TXT"
  ttl     = "300"
  records = ["v=DKIM1; k=rsa; t=s; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDNfauVh7pVNjFK9ZMrjPG2i/DQo8XVSAd4xTShQsZKb2+kJzyi0YeqPP+1EjbB46zAsK4GlTD08KKcpLgtc9dL0gbFl+E6DoXCzSOHYdgChGgdfUDjqB83vE8tKzxtCx+j+2X+Nb0Kha0CPCkhU0agvynlNaHoR9tzJ41OE49HRwIDAQAB"]
}

resource "aws_route53_record" "mail" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "mail"
  type    = "CNAME"
  records = ["domain.mail.yandex.net."]
  ttl     = "900"
}

resource "aws_route53_record" "root" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "molyuk.com"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.cdn.domain_name
    zone_id                = aws_cloudfront_distribution.cdn.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "www" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "www.molyuk.com"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.cdn.domain_name
    zone_id                = aws_cloudfront_distribution.cdn.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "web" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "andrew.molyuk.com"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.cdn.domain_name
    zone_id                = aws_cloudfront_distribution.cdn.hosted_zone_id
    evaluate_target_health = false
  }
}
