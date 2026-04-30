$ErrorActionPreference = "Stop"
$root = "C:\Users\stefa\Desktop\OLEIFICIO CABRIOLU"
Set-Location $root

$footerTemplate = Get-Content "footer-template.html" -Raw

$files = Get-ChildItem -Path "public" -Filter "index.html" -Recurse | Where-Object { $_.FullName -notmatch "node_modules" }

Write-Host "Trovati $($files.Count) file index.html da processare"
Write-Host ""

$ok = 0
$skip = 0

foreach ($file in $files) {
    $rel = $file.FullName.Replace("$root\", "")
    $content = Get-Content $file.FullName -Raw

    Copy-Item $file.FullName "$($file.FullName).bak" -Force

    $pattern = '(?s)<footer[^>]*>.*?</footer>'
    if ($content -match $pattern) {
        $newContent = [regex]::Replace($content, $pattern, $footerTemplate)
        Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8 -NoNewline
        Write-Host "OK   $rel" -ForegroundColor Green
        $ok++
    } else {
        Write-Host "SKIP $rel (nessun footer trovato)" -ForegroundColor Yellow
        $skip++
    }
}

Write-Host ""
Write-Host "============================="
Write-Host "OK: $ok | Skip: $skip"
Write-Host "Backup creati come .bak"
