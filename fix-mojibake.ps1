# fix-mojibake.ps1
$root = "public"
$files = Get-ChildItem -Path $root -Filter "*.html" -Recurse

$map = @{
    "Ã€" = "À";  "Ã¨" = "è";  "Ã©" = "é";  "Ã¬" = "ì"
    "Ã²" = "ò";  "Ã¹" = "ù";  "Ãˆ" = "È";  "Ã‰" = "É"
    "Ã€" = "À";  "Ã " = "à"
    "â€™" = "'";  "â€˜" = "'";  "â€œ" = '"';  "â€" = '"'
    "â€"" = "";  "â€"" = ""
    "Â°" = "°";  "Â" = ""
    "â" = "€";  "â" = "";  "â'" = ""
    "perchÃ" = "perché"
}

$totalChanges = 0
$changedFiles = 0

foreach ($f in $files) {
    $content = Get-Content -Path $f.FullName -Raw -Encoding UTF8
    $original = $content
    $fileChanges = 0
    foreach ($k in $map.Keys) {
        $count = ([regex]::Matches($original, [regex]::Escape($k))).Count
        $content = $content.Replace($k, $map[$k])
        $fileChanges += $count
    }
    if ($fileChanges -gt 0) {
        Set-Content -Path $f.FullName -Value $content -Encoding UTF8 -NoNewline
        Write-Host " $($f.FullName.Replace('\','/'))  $fileChanges"
        $changedFiles++
        $totalChanges += $fileChanges
    }
}

Write-Host "`nFATTO. $changedFiles file modificati, $totalChanges sostituzioni totali."
