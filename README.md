# Sushi & Sashimi Bar - Projeto Final Expo Go

Aplicativo mobile em React Native com Expo para um sistema de pedidos de restaurante japonês. A interface possui header fixo, acordeão de horários, indicador automático de aberto/fechado, cardápio com 10 itens, navegação inferior e formulário de perfil.

**Aluno:** Roberto Atila Almeida Azevedo  
**Turma:** Informática para Internet - ETEC Jacinto Ferreira de Sá  
**Entrega:** 11 de junho  
**Tema:** Sushi & Sashimi Bar - Grupo B

## Estrutura do Projeto

O projeto Expo agora fica direto na raiz do repositório:

```text
Atividade-ProjetoFinal-ExpoGo/
|-- App.js
|-- app.json
|-- index.js
|-- package.json
|-- README.md
|-- .gitignore
|-- assets/
    |-- adaptive-icon.png
    |-- favicon.png
    |-- icon.png
    |-- splash-icon.png
    |-- products/
        |-- combinado-sashimi-20-pecas.jpg
        |-- combinado-sushi-30-pecas.jpg
        |-- gunkan-salmao.jpg
        |-- hot-roll-salmao.jpg
        |-- nigiri-camarao.jpg
        |-- sashimi-atum.jpg
        |-- sashimi-salmao.jpg
        |-- temaki-salmao.jpg
        |-- temaki-tuna-spicy.jpg
        |-- uramaki-california.jpg
```

Arquivos e pastas removidos da estrutura antiga:

- `projetofinal/`: pasta aninhada duplicada.
- `app.js`: cópia duplicada do app. O arquivo principal agora é `App.js`.
- `components/AssetExample.js`: componente de exemplo do template Snack.
- `assets/snack-icon.png`: imagem padrão do Snack sem uso no `app.json`.
- `screens/`: pasta usada incorretamente para guardar imagem.
- Imagens do cardápio: organizadas em `assets/products/` e otimizadas para importação no Expo Snack.

## Funcionalidades

- Header fixo com nome, endereço, telefone e identidade visual premium.
- Painel acordeão com os horários de funcionamento.
- Indicador automático `ABERTO`/`FECHADO`.
- Destaque do dia atual no painel de horários.
- Cardápio com 10 itens renderizados via `FlatList`.
- Componente `ProductCard` reutilizável.
- Footer fixo com navegação entre `Home`, `Pedidos` e `Perfil`.
- Tela de pedidos em estado inicial.
- Formulário de perfil com dados pessoais e endereço.
- Feedback visual em botões usando `Pressable`.

## Tecnologias

| Tecnologia | Uso |
| --- | --- |
| React | Componentes e estado com `useState` |
| React Native | Interface mobile |
| Expo | Execução com Expo Go |
| `@expo/vector-icons` | Ícones da interface |
| JavaScript | Linguagem principal |

## Como Rodar

Instale as dependências:

```bash
npm install
```

Inicie o Expo:

```bash
npm start
```

Depois, escaneie o QR Code com o aplicativo Expo Go.

Comandos disponíveis:

| Comando | Descrição |
| --- | --- |
| `npm start` | Inicia o servidor Expo |
| `npm run android` | Abre no Android |
| `npm run ios` | Abre no iOS |
| `npm run web` | Abre no navegador |

## Como Rodar no Expo Snack

1. Acesse [https://snack.expo.dev](https://snack.expo.dev).
2. Crie um novo Snack.
3. Copie o conteúdo de `App.js`.
4. Cole no arquivo `App.js` do Snack.
5. Confirme que `@expo/vector-icons` está disponível.
6. Rode o projeto e escaneie o QR Code com o Expo Go.

## Organização do Código

O app está concentrado em `App.js` para facilitar a entrega no Expo Snack.

| Bloco | Responsabilidade |
| --- | --- |
| `COLORS` | Paleta visual |
| `SHADOWS` | Sombras reutilizáveis |
| `HORARIOS` | Dias e horários de funcionamento |
| `CARDAPIO` | Produtos do cardápio |
| `verificarAberto()` | Cálculo de aberto/fechado |
| `Header` | Header, badge e acordeão |
| `ProductCard` | Card reutilizável do produto |
| `FooterNav` | Navegação inferior |
| `MenuHeader` | Cabeçalho da lista |
| `HomeScreen` | Tela do cardápio |
| `OrdersScreen` | Tela de pedidos |
| `ProfileForm` | Formulário de perfil |
| `App` | Componente raiz |

## Dados Editáveis

### Horários

Edite o array `HORARIOS`:

```javascript
const HORARIOS = [
    { dia: 'Domingo', abertura: '12:00', fechamento: '22:00' },
    { dia: 'Segunda', abertura: null, fechamento: null },
];
```

Use `null` em `abertura` e `fechamento` para indicar que o restaurante não abre naquele dia.

### Cardápio

Cada item segue este formato:

```javascript
{
    id: '1',
    nome: 'Sashimi de Salmão',
    preco: 28.90,
    imagem: require('./assets/products/sashimi-salmao.jpg'),
    descricao: '6 fatias de salmão fresco, shoyu e wasabi'
}
```

O cardápio usa 10 imagens locais em `assets/products/`, uma para cada item.

Evite imagens muito grandes no repositório, porque o Snack pode falhar ao importar assets pesados. As imagens atuais foram reduzidas para uso mobile.

## Checklist

| Requisito | Status |
| --- | --- |
| Projeto Expo na raiz | Concluído |
| Header fixo | Concluído |
| Acordeão de horários | Concluído |
| Indicador aberto/fechado | Concluído |
| Cardápio com 10 itens | Concluído |
| Lista com `FlatList` | Concluído |
| `ProductCard` reutilizável | Concluído |
| Footer fixo | Concluído |
| Tela de pedidos | Estrutura inicial |
| Formulário de perfil | Concluído |
| Carrinho funcional | Fora desta versão |
| Persistência de dados | Fora desta versão |

## Solução de Problemas

### O Expo não inicia

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

### Erro com ícones

```bash
npx expo install @expo/vector-icons
```

### As imagens dos produtos não aparecem

O cardápio usa URLs externas. Confira se o dispositivo está conectado à internet.

### O status aberto/fechado parece incorreto

O cálculo usa a data e hora do dispositivo. Confira o relógio e o fuso horário do celular ou emulador.
