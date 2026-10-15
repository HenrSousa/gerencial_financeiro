// Gerencial Financeiro — de onde o painel lê os dados.
// 1) container: cole a "URL SAS do Blob" gerada no container (permissão só de Leitura).
// 2) arquivo: nome do arquivo dentro do container (.xlsx ou o dados.json gerado pelo atualizar.bat).
window.GF_CONFIG = {
  container: "https://gerencialfinstorage.blob.core.windows.net/dados?sp=r&st=2026-10-15T20:58:25Z&se=2027-10-16T05:13:25Z&spr=https&sv=2026-02-06&sr=c&sig=fwQMqdDnrD1DZYr1jNQNcPN5kpdfRrrvhFcwxz7z%2FjI%3D",
  arquivo: "gerencial_financeiro.xlsx"
};
