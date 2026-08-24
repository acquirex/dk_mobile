Add-Type -AssemblyName System.Drawing

$bannerDirectory = Join-Path $PSScriptRoot '..\public\banners'
$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
  Where-Object { $_.MimeType -eq 'image/jpeg' }
$qualityEncoder = [System.Drawing.Imaging.Encoder]::Quality

Get-ChildItem -LiteralPath $bannerDirectory -Filter '*.png' | ForEach-Object {
  $sourceImage = [System.Drawing.Image]::FromFile($_.FullName)
  try {
    $outputPath = [System.IO.Path]::ChangeExtension($_.FullName, '.jpg')
    $parameters = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $parameters.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter($qualityEncoder, [long]88)
    $sourceImage.Save($outputPath, $jpegCodec, $parameters)
  }
  finally {
    $sourceImage.Dispose()
  }
}
