# Script PowerShell para generar PDF
Add-Type -AssemblyName System.Drawing
Add-Type -AssemblyName System.Windows.Forms

# Obtener la ruta completa del archivo HTML
$htmlPath = Join-Path $PSScriptRoot "PROPUESTA_BODEGA_ARTESANAL.html"
$pdfPath = Join-Path $PSScriptRoot "PROPUESTA_BODEGA_ARTESANAL.pdf"

Write-Host "🔄 Generando PDF desde HTML..."
Write-Host "📄 Archivo HTML: $htmlPath"
Write-Host "📑 Archivo PDF: $pdfPath"

# Abrir el archivo HTML en el navegador predeterminado
Write-Host "🌐 Abriendo archivo HTML en el navegador..."
Start-Process $htmlPath

Write-Host ""
Write-Host "✅ INSTRUCCIONES PARA GENERAR EL PDF:"
Write-Host "1. El archivo HTML se abrió en tu navegador"
Write-Host "2. Presiona Ctrl + P para imprimir"
Write-Host "3. Selecciona 'Guardar como PDF' como impresora"
Write-Host "4. Configura:"
Write-Host "   - Tamaño: A4"
Write-Host "   - Márgenes: Mínimos"
Write-Host "   - Gráficos de fondo: ✅ Activado"
Write-Host "5. Guarda como: PROPUESTA_BODEGA_ARTESANAL.pdf"
Write-Host ""
Write-Host "📱 El archivo HTML ya está optimizado para impresión!"
