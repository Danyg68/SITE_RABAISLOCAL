@echo off
curl -X POST https://hook.us2.make.com/4xk94ufbnfviqqhnu02bk3hk3c4up1lf ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"test-consommateur@example.com\",\"lien_consommateur\":\"https://marketing.rabaislocal.com/page-consommateur.html?ref=1234567\",\"ref\":\"1234567\",\"role_consommateur\":\"1\",\"role_commercant\":\"0\",\"role_affilie\":\"0\",\"timestamp\":\"2025-12-18T10:00:00.000Z\"}"
pause
