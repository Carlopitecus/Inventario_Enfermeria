const $btnExportar = document.querySelector("#exportarExcel"),
    $tabla = document.querySelector("#inventario");

$btnExportar.addEventListener("click", function() {
    let tableExport = new TableExport($tabla, {
        exportButtons: false, // No queremos botones
        filename: "Mi tabla de Excel", //Nombre del archivo de Excel
        sheetname: "Mi tabla de Excel", //Título de la hoja
    });
    let datos = tableExport.getExportData();
    
    console.log(datos)
    let preferenciasDocumento = datos.inventario.xlsx;
    console.log(preferenciasDocumento)
    tableExport.export2file(preferenciasDocumento.data, preferenciasDocumento.mimeType, preferenciasDocumento.filename, preferenciasDocumento.fileExtension, preferenciasDocumento.merges, preferenciasDocumento.RTL, preferenciasDocumento.sheetname);
});