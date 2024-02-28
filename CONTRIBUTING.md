# Contribuindo para o Reino do Recurso Real API

Olá, nobres desenvolvedores! Estamos emocionados que vocês estejam considerando contribuir para o "Reino do Recurso Real" API. Suas contribuições são fundamentais para a evolução deste reino mágico de dados e encantamentos.

## Como Contribuir

1. Antes de começar, certifique-se de ter uma conta no GitHub.
2. Faça um fork do repositório "Reino do Recurso Real".
3. Clone o repositório forkado para sua máquina local: `git clone https://github.com/seu-usuario/reino-do-recurso-real.git`
4. Crie uma branch para suas alterações: `git checkout -b nome-da-sua-branch`
5. Faça as alterações desejadas e adicione uma descrição clara do que foi feito.
6. Commit suas alterações: `git commit -m "Adiciona funcionalidade incrível"`
7. Push para sua branch: `git push origin nome-da-sua-branch`
8. Abra um Pull Request com suas alterações.

## Diretrizes para Contribuição

- **Seja Respeitoso:** Mantenha um ambiente acolhedor e respeitoso. Compartilhe ideias, sugestões e críticas de maneira construtiva.

- **Testes:** Certifique-se de que seus novos recursos ou correções tenham testes apropriados. Isso ajuda a manter a estabilidade do reino.

- **Documentação:** Atualize a documentação conforme necessário. Isso inclui o `README.md`, `CHANGELOG.md` e qualquer outra documentação relevante.

- **Padrões de Código:** Siga os padrões de código definidos no arquivo `.editorconfig`.

- **Comentários Significativos:** Ao adicionar código complexo, adicione comentários explicativos para facilitar a compreensão.

Claro, abaixo está um tópico que você pode adicionar ao seu `CONTRIBUTING.md` explicando como as pessoas devem usar o Commitizen e o cz-conventional-changelog:

---

## **Usando Commitizen e cz-conventional-changelog**

O "Reino do Recurso Real" utiliza [Commitizen](https://commitizen-tools.github.io/commitizen/) em conjunto com [cz-conventional-changelog](https://github.com/commitizen/cz-conventional-changelog) para padronizar as mensagens de commit e simplificar o processo de criação de versões e changelog.

### **Por que Usar Commitizen?**

O Commitizen ajuda a criar mensagens de commit no formato convencional, seguindo as [Conventional Commits Specification](https://www.conventionalcommits.org/), o que facilita a geração automática de changelog e versionamento semântico.

### **Como Usar:**

1. **Instale as Dependências:**
   Certifique-se de ter o Commitizen e o cz-conventional-changelog instalados como dependências de desenvolvimento.

   ```bash
   npm install --save-dev commitizen cz-conventional-changelog
   ```

2. **Adicione um Script no package.json:**
   No seu arquivo `package.json`, adicione o seguinte script:

   ```json
   "scripts": {
     "commit": "cz"
   }
   ```

   Agora, em vez de usar `git commit -m`, execute:

   ```bash
   npm run commit
   ```

   O Commitizen guiará você para criar mensagens de commit no estilo convencional.

3. **Configuração Adicional:**
   Se necessário, você pode configurar o Commitizen para seguir um estilo específico. Adicione o seguinte bloco ao seu `package.json`:

   ```json
   "config": {
     "commitizen": {
       "path": "./node_modules/cz-conventional-changelog"
     }
   }
   ```

### **Gerando Versões e Changelog:**

Além disso, para facilitar a criação de versões e changelog, usamos [Standard Version](https://github.com/conventional-changelog/standard-version). Isso é feito da seguinte maneira:

1. **Instale Standard Version:**
   ```bash
   npm install --save-dev standard-version
   ```

2. **Adicione um Script no package.json:**
   Adicione o seguinte script ao seu `package.json`:

   ```json
   "scripts": {
     "release": "standard-version"
   }
   ```

3. **Criando uma Nova Versão:**
   Quando estiver pronto para fazer uma nova versão, execute:

   ```bash
   npm run release
   ```

   Isso criará automaticamente uma nova versão, gerará um changelog e fará o commit e a tag no repositório.

4. **Empurre as Alterações:**
   Após criar a nova versão, empurre as alterações para o repositório:

   ```bash
   git push --follow-tags origin main
   ```

Seguindo essas práticas, manteremos nosso histórico de commits consistente, facilitando a rastreabilidade das mudanças e a geração de changelog automaticamente. Contribua de forma eficaz usando este processo!

# Comandos do Vercel

Este documento fornece uma visão geral dos principais comandos do Vercel que você pode usar ao trabalhar com seu projeto.

## 1. Instalação do Vercel CLI

Certifique-se de ter o Vercel CLI instalado globalmente em sua máquina. Você pode instalá-lo usando o seguinte comando:

```bash
npm install -g vercel
```

## 2. Iniciar um novo projeto

Para iniciar um novo projeto no Vercel, use o seguinte comando e siga as instruções interativas:

```bash
vercel
```

### **3. Fazer deploy**

Use o comando a seguir para fazer o deploy do seu projeto:

```bash
vercel
```

Este comando inicia o processo de implantação e fornece a URL do seu projeto implantado.

### **4. Deploy de produção**

Se desejar fazer deploy diretamente para o ambiente de produção, utilize o seguinte comando:

```bash
vercel --prod
```

Isso substituirá a implantação existente no ambiente de produção.

### **5. Abrir o painel Vercel**

Para abrir o painel do Vercel no navegador, utilize:

```bash
vercel open
```

Este comando abrirá o painel onde você pode gerenciar seus projetos implantados.

## Código de Conduta

Este projeto segue o [Código de Conduta do Colaborador da All Contributors](https://allcontributors.org/docs/en/code-of-conduct). Ao contribuir, você concorda em seguir este código.

## Dúvidas ou Ajuda

Se você tiver dúvidas ou precisar de ajuda, abra uma issue no GitHub ou entre em contato conosco por e-mail.

Agradecemos antecipadamente por suas contribuições ao "Reino do Recurso Real" API. Juntos, continuaremos a fazer deste um lugar mágico para todos!

**Que a magia da contribuição esteja com você!** 🚀✨
