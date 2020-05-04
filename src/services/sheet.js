import * as XLSX from "./xlsx.full.min.js";

function s2ab(s) {
  let buf = new ArrayBuffer(s.length)
  let view = new Uint8Array(buf)
  for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF
  return buf
}

function tableToXLSX(element_id) {
  let wb = XLSX.utils.table_to_book(document.getElementById(element_id), { sheet: "Sheet JS" })
  let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' })

  let file = new Blob([s2ab(wbout)], { type: 'application/octet-stream' })
  var link = document.createElement("a");
  link.setAttribute("href",  window.URL.createObjectURL(file));
  link.setAttribute("download", "resultados.xlsx");
  document.body.appendChild(link);
  link.click();

}

export { tableToXLSX }