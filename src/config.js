// Gerencial Financeiro — de onde o painel lê os dados.
// 1) container: cole a "URL SAS do Blob" gerada no container (permissão só de Leitura).
// 2) arquivo: nome do arquivo dentro do container (.xlsx ou o dados.json gerado pelo atualizar.bat).
window.GF_CONFIG = {
  container: "",
  arquivo: "gerencial_financeiro.xlsx"
};
