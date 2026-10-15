# Gerencial Financeiro — versão só site (sem API)

O painel lê a planilha **direto de um container do Azure Storage**. Não existe API nem pasta `api`.

Para atualizar os números, basta substituir o arquivo no container.

## 1. GitHub

O repositório deve conter só a pasta `src/` (com `index.html`, `config.js` e `staticwebapp.config.json`) e este README.

No workflow do Azure (`.github/workflows/azure-static-web-apps-*.yml`), deixe:

```yaml
app_location: "src"
api_location: ""
output_location: ""
```

## 2. Container

1. Crie uma **Conta de armazenamento** (Standard, LRS).
2. Na conta, crie o contêiner **`dados`** com acesso **Privado**.
3. Envie o `gerencial_financeiro.xlsx` para o contêiner.
4. No contêiner, abra **Tokens de acesso compartilhado**:
   - **Permissões:** **Leitura**.
   - **Expiração:** 1 ano.
   - Clique em **Gerar** e copie a **URL SAS do Blob**.

## 3. CORS (permite o site ler o container)

Na **Conta de armazenamento**, vá em **Configurações › Compartilhamento de recursos (CORS) › Serviço Blob** e adicione uma linha:

| Campo | Valor |
|---|---|
| Origens permitidas | a URL do site, ex.: `https://red-field-083bca910.azurestaticapps.net` |
| Métodos permitidos | `GET`, `HEAD` |
| Cabeçalhos permitidos | `*` |
| Cabeçalhos expostos | `*` |
| Idade máxima | `3600` |

Clique em **Salvar**.

## 4. config.js

No GitHub, edite `src/config.js` e cole a URL SAS:

```js
window.GF_CONFIG = {
  container: "https://SUACONTA.blob.core.windows.net/dados?sp=r&st=...&sig=...",
  arquivo: "gerencial_financeiro.xlsx"
};
```

Faça o commit. O site é publicado de novo e passa a ler o container.

## Atualizar os números

Envie o novo arquivo para o contêiner `dados` **com o mesmo nome** e escolha substituir. Na próxima vez que alguém abrir ou recarregar o painel, os números novos já aparecem.

## Planilha grande

A planilha de 20 MB é baixada e lida no navegador de quem abre o painel. Pode levar alguns segundos, principalmente no celular.

Para abrir mais rápido:

1. Rode o `atualizar.bat` no seu computador. Ele gera um `dados.json` de uns 500 KB.
2. Envie esse `dados.json` para o contêiner.
3. No `config.js`, troque `arquivo` para `"dados.json"`.

## Mensagens no topo do painel

| Mensagem | O que fazer |
|---|---|
| Fonte de dados não configurada | Preencher o `config.js`. |
| Não conseguiu acessar o container | Conferir o CORS (passo 3). |
| Acesso negado | A URL SAS venceu ou não tem Leitura. Gerar outra e atualizar o `config.js`. |
| Arquivo não encontrado | Conferir o nome do arquivo no container e no `config.js`. |

## Segurança

A URL SAS fica visível no código do site, e o site não tem login. Quem tiver o link consegue ver os dados.

Use uma URL SAS **só de leitura** e não divulgue o endereço do painel.
