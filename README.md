# Sushi & Sashimi Bar - Projeto Final Expo Go

Aplicativo mobile desenvolvido em React Native com Expo para simular um sistema de pedidos de um restaurante japonês. O projeto foi pensado para apresentação final da ETEC Jacinto Ferreira de Sá, com foco em layout, navegação simples, cardápio visual e experiência compatível com Expo Go e Expo Snack.

- **Aluno:** Roberto Atila Almeida Azevedo
- **Curso:** Informática para Internet
- **Instituição:** ETEC Jacinto Ferreira de Sá
- **Entrega:** 11 de junho
- **Tema:** Sushi & Sashimi Bar

## Destaques

- Interface com identidade visual premium japonesa.
- Header fixo com nome do restaurante, endereço, telefone e status `ABERTO` ou `FECHADO`.
- Acordeão de horários de funcionamento com destaque para o dia atual.
- Cardápio com 10 produtos renderizados com `FlatList`.
- Componente `ProductCard` reutilizável.
- Navegação inferior fixa entre `Home`, `Pedidos` e `Perfil`.
- Tela de pedidos com estado vazio.
- Formulário de perfil com dados pessoais e endereço de entrega.
- Imagens do cardápio carregadas por URL para evitar erro de importação no Expo Snack.

## Tecnologias

| Tecnologia | Uso no projeto |
| --- | --- |
| React | Componentização e estado com `useState` |
| React Native | Construção da interface mobile |
| Expo | Execução no Expo Go, Android, iOS e Web |
| `@expo/vector-icons` | Ícones da interface com `Ionicons` |
| JavaScript | Linguagem principal do app |

## Estrutura do Projeto

O projeto Expo fica direto na raiz do repositório para facilitar a importação no Snack.

```text
Atividade-ProjetoFinal-ExpoGo/
|-- App.js
|-- app.json
|-- index.js
|-- package.json
|-- README.md
|-- .gitignore
```

Observação: a pasta `assets/` pode existir na máquina local com cópias das imagens, mas ela é ignorada pelo Git. No código final, as imagens do cardápio são carregadas por URLs do CDN do Snack dentro de `IMAGENS_CARDAPIO`.

## Como Rodar Localmente

### Pré-requisitos

- Node.js instalado.
- npm instalado.
- Aplicativo Expo Go no celular, se for testar em dispositivo físico.

### Instalação

```bash
npm install
```

### Iniciar o projeto

```bash
npm start
```

Depois de iniciar, escolha uma das opções do Expo:

- Escanear o QR Code com o Expo Go.
- Pressionar `a` para abrir no Android.
- Pressionar `i` para abrir no iOS, se estiver em ambiente compatível.
- Pressionar `w` para abrir no navegador.

## Como Importar no Expo Snack

1. Acesse [https://snack.expo.dev](https://snack.expo.dev).
2. Clique em `Import git repository`.
3. Use esta URL:

```text
https://github.com/robertoatila/Atividade-ProjetoFinal-ExpoGo
```

4. Deixe `Folder path` vazio.
5. Use a branch `main`.
6. Aguarde o Snack carregar o projeto.

O repositório foi ajustado para evitar o erro `Failed to upload file asset`. Por isso, as imagens do cardápio não são importadas como arquivos locais; elas são carregadas por URLs externas.

## Scripts Disponíveis

| Comando | Descrição |
| --- | --- |
| `npm start` | Inicia o servidor de desenvolvimento do Expo |
| `npm run android` | Inicia o projeto no Android |
| `npm run ios` | Inicia o projeto no iOS |
| `npm run web` | Inicia o projeto no navegador |

## Organização do Código

O app está concentrado em `App.js` para facilitar a entrega, a correção e o uso no Expo Snack.

| Bloco | Responsabilidade |
| --- | --- |
| `COLORS` | Paleta visual do app |
| `SHADOWS` | Sombras reutilizáveis |
| `HORARIOS` | Dias e horários de funcionamento |
| `IMAGENS_CARDAPIO` | URLs das imagens dos produtos |
| `CARDAPIO` | Lista com os 10 itens do cardápio |
| `verificarAberto()` | Calcula se o restaurante está aberto |
| `formatarPreco()` | Formata valores em reais |
| `Header` | Header fixo, status e acordeão de horários |
| `ProductCard` | Card reutilizável para cada produto |
| `FooterNav` | Navegação inferior fixa |
| `MenuHeader` | Cabeçalho da seção de cardápio |
| `HomeScreen` | Tela principal com lista de produtos |
| `OrdersScreen` | Tela de pedidos |
| `ProfileForm` | Formulário de perfil e entrega |
| `App` | Componente raiz e controle de navegação |

## Funcionalidades Implementadas

### Header

O header permanece fixo no topo da interface e reúne as principais informações do restaurante:

- Nome do restaurante.
- Endereço.
- Telefone.
- Indicador de aberto ou fechado.
- Botão de acordeão para horários.

O status `ABERTO` ou `FECHADO` é calculado automaticamente com base no horário do dispositivo.

### Cardápio

O cardápio possui 10 itens e é renderizado com `FlatList`, mantendo a estrutura pedida no projeto. Cada produto contém:

- `id`
- `nome`
- `preco`
- `imagem`
- `descricao`

Exemplo:

```javascript
{
    id: '1',
    nome: 'Sashimi de Salmão',
    preco: 28.90,
    imagem: IMAGENS_CARDAPIO.sashimiSalmao,
    descricao: '6 fatias de salmão fresco, shoyu e wasabi'
}
```

### Navegação

A navegação é feita por um footer fixo com três telas:

- `Home`: cardápio.
- `Pedidos`: tela de acompanhamento inicial.
- `Perfil`: formulário do cliente.

### Perfil

O formulário de perfil possui campos para:

- Nome.
- Telefone.
- E-mail.
- Rua.
- Número.
- Complemento.
- Observação de entrega.

Os dados digitados não são persistidos, pois esta versão é visual e focada na entrega do layout.

## Dados Editáveis

### Alterar horários

Edite o array `HORARIOS` em `App.js`:

```javascript
const HORARIOS = [
    { dia: 'Domingo', abertura: '12:00', fechamento: '22:00' },
    { dia: 'Segunda', abertura: null, fechamento: null },
];
```

Use `null` em `abertura` e `fechamento` quando o restaurante não abrir naquele dia.

### Alterar produtos

Edite o array `CARDAPIO` em `App.js`. Para adicionar uma nova imagem, adicione primeiro a URL em `IMAGENS_CARDAPIO` e depois use essa chave no produto.

## Checklist do Projeto

| Requisito | Status |
| --- | --- |
| Projeto Expo na raiz do repositório | Concluído |
| Header fixo | Concluído |
| Acordeão de horários | Concluído |
| Indicador aberto/fechado | Concluído |
| Cardápio com 10 itens | Concluído |
| Lista com `FlatList` | Concluído |
| `ProductCard` reutilizável | Concluído |
| Footer fixo | Concluído |
| Formulário de perfil | Concluído |
| Imagens no cardápio | Concluído |
| Carrinho real | Fora do escopo |
| Persistência de dados | Fora do escopo |

## Solução de Problemas

### O Expo não inicia

Remova as dependências e instale novamente:

```bash
rm -rf node_modules
npm install
npm start
```

No Windows PowerShell:

```powershell
Remove-Item -Recurse -Force node_modules
npm install
npm start
```

### Erro com `@expo/vector-icons`

Instale a dependência pelo Expo:

```bash
npx expo install @expo/vector-icons
```

### O Snack mostra erro de cache

Se o Snack continuar mostrando uma versão antiga:

1. Reimporte o repositório.
2. Use a branch `main`.
3. Deixe `Folder path` vazio.
4. Tente abrir em uma aba anônima.

### As imagens do cardápio não aparecem

As imagens usam URLs externas. Verifique se o dispositivo, emulador ou navegador está conectado à internet.

### O status aberto/fechado parece incorreto

O cálculo usa a data, hora e fuso horário do dispositivo. Confira o relógio do celular, emulador ou navegador.

## Observações da Entrega

Este projeto é uma versão visual e acadêmica. O foco está na estrutura de telas, layout, navegação e organização do cardápio. Funcionalidades como carrinho real, pagamento, banco de dados, login e persistência de perfil podem ser adicionadas em uma versão futura.

## Licença

Projeto acadêmico desenvolvido para fins educacionais.
