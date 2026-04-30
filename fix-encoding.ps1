$ErrorActionPreference = "Stop"
$root = "C:\Users\stefa\Desktop\OLEIFICIO CABRIOLU"
Set-Location $root

$src = [System.Text.Encoding]::GetEncoding(1252)
$dst = New-Object System.Text.UTF8Encoding $false

# Marker tipici di "mojibake" (UTF-8 letto come 1252)
$markers = @('Ã ','Ã¨','Ã©','Ã¬','Ã²','Ã¹','Ã€','Ã‰','â€','Â°','Â·','â‚¬','ðŸ')

$files = Get-ChildItem -Path "public" -Include "*.html" -Recurse -File

$fixed = 0
$skipped = 0
$total = $files.Count

foreach ($file in $files) {
    $rel = $file.FullName.Replace("$root\", "")
    $text = Get-Content $file.FullName -Raw -Encoding UTF8

    $hasMojibake = $false
    foreach ($m in $markers) {
        if ($text.Contains($m)) { $hasMojibake = $true; break }
    }

    if (-not $hasMojibake) {
        Write-Host "SKIP $rel (gia UTF-8)" -ForegroundColor DarkGray
        $skipped++
        continue
    }

    # Rileggi come bytes e decodifica come 1252 -> ottieni stringa corretta
    $bytes = [System.IO.File]::ReadAllBytes($file.FullName)
    $correct = $src.GetString($bytes)

    [System.IO.File]::WriteAllText($file.FullName, $correct, $dst)
    Write-Host "FIX  $rel" -ForegroundColor Green
    $fixed++
}

Write-Host ""
Write-Host "============================="
Write-Host "Totale: $total | Fixed: $fixed | Skip: $skipped"
