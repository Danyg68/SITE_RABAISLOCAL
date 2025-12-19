@echo off
curl -X POST https://hook.us2.make.com/4xk94ufbnfviqqhnu02bk3hk3c4up1lf ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"test@example.com\",\"lien_commercant\":\"https://marketing.rabaislocal.com/page1-commercant.html?ref=TEST123\",\"ref\":\"TEST123\",\"timestamp\":\"2025-12-18T10:00:00.000Z\"}"
pause
