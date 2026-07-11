# Cloudflare DNS 批量同步脚本 (PowerShell 版)
# 用法: .\scripts\dns-sync.ps1
# 兼容 Windows PowerShell 5.1+ / PowerShell 7

# === 配置区 ===
$CLOUDFLARE_ZONE_ID = "YOUR_ZONE_ID"
$CLOUDFLARE_API_TOKEN = "YOUR_API_TOKEN"
$DOMAIN = "silicon-army.cn"

# === 所有子域名记录（增删改都在这里） ===
$RECORDS = @{
    "www" = "YOUR_GITHUB_USERNAME.github.io"
    "taini" = "YOUR_GITHUB_USERNAME.github.io"
    "app" = "YOUR_VPS_IP"
    "umbrella" = "YOUR_GITHUB_USERNAME.github.io"
}

# === 执行同步 ===
$headers = @{
    "Authorization" = "Bearer $CLOUDFLARE_API_TOKEN"
    "Content-Type" = "application/json"
}

foreach ($subdomain in $RECORDS.Keys) {
    $target = $RECORDS[$subdomain]
    $fullDomain = "$subdomain.$DOMAIN"

    if ($target -match '^\d+\.\d+\.\d+\.\d+$') {
        $recordType = "A"
    } else {
        $recordType = "CNAME"
    }

    Write-Host "处理 $fullDomain -> $target ($recordType)" -ForegroundColor Cyan

    $listUrl = "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/dns_records?type=$recordType&name=$fullDomain"
    try {
        $listResponse = Invoke-RestMethod -Uri $listUrl -Headers $headers -Method Get
        $existingId = $listResponse.result[0].id
    } catch {
        $existingId = $null
    }

    $body = @{
        type = $recordType
        name = $fullDomain
        content = $target
        ttl = 300
        proxied = $true
    } | ConvertTo-Json

    if ($existingId) {
        $updateUrl = "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/dns_records/$existingId"
        try {
            $response = Invoke-RestMethod -Uri $updateUrl -Headers $headers -Method Put -Body $body -ContentType "application/json"
            if ($response.success) {
                Write-Host "已更新 $fullDomain" -ForegroundColor Green
            } else {
                Write-Host "更新失败" -ForegroundColor Red
            }
        } catch {
            Write-Host "更新请求失败: $_" -ForegroundColor Red
        }
    } else {
        $createUrl = "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/dns_records"
        try {
            $response = Invoke-RestMethod -Uri $createUrl -Headers $headers -Method Post -Body $body -ContentType "application/json"
            if ($response.success) {
                Write-Host "已创建 $fullDomain" -ForegroundColor Green
            } else {
                Write-Host "创建失败" -ForegroundColor Red
            }
        } catch {
            Write-Host "创建请求失败: $_" -ForegroundColor Red
        }
    }
}

Write-Host "DNS 同步完成" -ForegroundColor Green
