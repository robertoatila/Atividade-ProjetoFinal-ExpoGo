# projetofinal - Sushi & Sashimi Bar

Aplicativo mobile desenvolvido em React Native para Expo Go como projeto final do curso de Informática para Internet. O app simula a interface de um restaurante de sushi, com cardápio, horário de funcionamento, navegação inferior, tela de pedidos e formulário de perfil para dados de entrega.

**Aluno:** Roberto Atila Almeida Azevedo  
**Turma:** Informática para Internet - ETEC Jacinto Ferreira de Sá  
**Entrega:** 11 de junho  
**Tema:** Sushi & Sashimi Bar - Grupo B

## Sumário

- [Funcionalidades](#funcionalidades)
- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Como rodar no Expo Snack](#como-rodar-no-expo-snack)
- [Como rodar localmente](#como-rodar-localmente)
- [Organização do código](#organização-do-código)
- [Dados principais do app](#dados-principais-do-app)
- [Checklist da entrega](#checklist-da-entrega)
- [Próximos passos](#próximos-passos)
- [Solução de problemas](#solução-de-problemas)

## Funcionalidades

- Header fixo com nome do restaurante, endereço, telefone e indicador de funcionamento.
- Painel expansível com os horários de funcionamento de cada dia da semana.
- Cálculo automático de status `ABERTO` ou `FECHADO` de acordo com o dia e horário atual.
- Cardápio com 10 produtos, imagens, descrições e preços.
- Lista de produtos renderizada com `FlatList`.
- Componente reutilizável para exibição dos itens do cardápio.
- Botão visual de adicionar item ao carrinho.
- Navegação inferior fixa com as opções `Home`, `Pedidos` e `Perfil`.
- Tela de pedidos em estado inicial, preparada para implementação futura.
- Formulário de perfil com campos de dados pessoais e endereço de entrega.
- Layout adaptado para uso no Expo Go em dispositivos móveis.

## Tecnologias utilizadas

| Tecnologia | Uso no projeto |
| --- | --- |
| React | Criação dos componentes e gerenciamento de estado com `useState` |
| React Native | Interface mobile com `View`, `Text`, `Image`, `FlatList`, `ScrollView` e `TextInput` |
| Expo Go | Execução e visualização do app no celular |
| Expo Snack | Ambiente online recomendado para testar a entrega |
| `@expo/vector-icons` | Ícones da navegação, horários e tela de pedidos |

## Estrutura do projeto

Estrutura principal deste repositório:

```text
Atividade-ProjetoFinal-ExpoGo/
|-- app.js
|-- README.md
```

O projeto está concentrado em um único arquivo para facilitar a entrega no Expo Snack. Ao criar o projeto no Snack, copie o conteúdo de `app.js` para o arquivo `App.js`.

Estrutura esperada no Expo Snack:

```text
projetofinal/
|-- App.js
```

No estado atual, o app usa imagens externas de placeholder por URL. Por isso, não é obrigatório criar uma pasta `assets/` para executar a versão atual.

## Como rodar no Expo Snack

1. Acesse [https://snack.expo.dev](https://snack.expo.dev).
2. Crie um novo Snack.
3. Renomeie o projeto para `projetofinal`, se desejar manter o mesmo nome da entrega.
4. Abra o arquivo `App.js` criado pelo Snack.
5. Copie todo o conteúdo de `app.js` deste repositório.
6. Cole o conteúdo dentro do `App.js` do Snack.
7. Confira se a dependência `@expo/vector-icons` está disponível. Normalmente ela já vem configurada no ambiente Expo.
8. Clique em `Run` ou escaneie o QR Code com o aplicativo Expo Go no celular.

## Como rodar localmente

Este repositório não possui `package.json`, então o caminho principal recomendado é o Expo Snack. Caso queira executar localmente, crie um projeto Expo e copie o arquivo:

```bash
npx create-expo-app projetofinal
cd projetofinal
```

Depois, substitua o conteúdo de `App.js` pelo conteúdo de `app.js` deste repositório.

Instale a dependência de ícones, se necessário:

```bash
npx expo install @expo/vector-icons
```

Inicie o projeto:

```bash
npx expo start
```

Em seguida, abra no Expo Go usando o QR Code exibido no terminal.

## Organização do código

O arquivo `app.js` está dividido em blocos lógicos:

| Bloco | Responsabilidade |
| --- | --- |
| `HORARIOS` | Lista os dias da semana e os horários de abertura e fechamento |
| `CARDAPIO` | Define os 10 produtos exibidos na tela inicial |
| `verificarAberto()` | Calcula se o restaurante está aberto no momento atual |
| `Header` | Mostra informações do restaurante, status e painel de horários |
| `ProductCard` | Renderiza cada item do cardápio |
| `FooterNav` | Controla a navegação inferior entre as telas |
| `HomeScreen` | Exibe o cardápio usando `FlatList` |
| `OrdersScreen` | Mostra a tela inicial de pedidos |
| `ProfileForm` | Exibe o formulário de perfil e endereço |
| `App` | Componente raiz que controla qual tela está ativa |
| `StyleSheet` | Centraliza os estilos visuais da aplicação |

## Dados principais do app

### Horários de funcionamento

Os horários são configurados no array `HORARIOS`:

```javascript
const HORARIOS = [
    { dia: 'Domingo', abertura: '12:00', fechamento: '22:00' },
    { dia: 'Segunda', abertura: null, fechamento: null },
    { dia: 'Terça', abertura: '18:00', fechamento: '23:00' },
];
```

Quando `abertura` e `fechamento` estão como `null`, o app considera o restaurante fechado naquele dia.

### Cardápio

Os itens do cardápio ficam no array `CARDAPIO`. Cada produto possui:

| Campo | Descrição |
| --- | --- |
| `id` | Identificador único usado pela lista |
| `nome` | Nome do prato |
| `preco` | Valor exibido no card |
| `imagem` | URL da imagem do produto |
| `descricao` | Descrição curta do item |

Exemplo:

```javascript
{
    id: '1',
    nome: 'Sashimi de Salmão',
    preco: 28.90,
    imagem: 'https://placehold.co/210x210/C62828/FFFFFF?text=Salmão',
    descricao: '6 fatias de salmão fresco, shoyu e wasabi'
}
```

Para usar imagens próprias, crie uma pasta `assets/` no projeto Expo e troque a URL por um `require`:

```javascript
imagem: require('./assets/produto1.jpg')
```

Nesse caso, ajuste o componente `Image` para receber a imagem diretamente:

```javascript
<Image source={produto.imagem} style={s.cardImg} resizeMode="cover" />
```

## Checklist da entrega

| Requisito | Status |
| --- | --- |
| Header fixo com logo, nome, endereço e telefone | Concluído |
| Painel acordeão com horários de funcionamento | Concluído |
| Indicador automático de aberto ou fechado | Concluído |
| Cardápio com 10 itens | Concluído |
| Cards de produto reutilizáveis | Concluído |
| Botão de adicionar ao carrinho | Layout concluído |
| Navegação inferior com 3 opções | Concluído |
| Tela de pedidos | Estrutura inicial concluída |
| Formulário de perfil | Concluído |
| Persistência de dados | Não implementada nesta versão |
| Carrinho funcional | Não implementado nesta versão |

## Próximos passos

- Implementar carrinho de compras com quantidade, subtotal e total.
- Salvar os dados do perfil usando `AsyncStorage`.
- Criar uma tela de confirmação de pedido.
- Substituir imagens de placeholder por imagens reais dos produtos.
- Separar o arquivo único em pastas como `components/`, `screens/` e `data/` caso o projeto cresça.
- Adicionar validações no formulário de perfil.

## Solução de problemas

### O Snack mostra erro em `@expo/vector-icons`

Confirme se a importação está igual à usada no código:

```javascript
import { Ionicons } from '@expo/vector-icons';
```

Se estiver rodando localmente, instale a dependência:

```bash
npx expo install @expo/vector-icons
```

### As imagens não aparecem

A versão atual usa URLs externas. Verifique se o dispositivo ou navegador está conectado à internet. Se trocar por imagens locais, confirme se os arquivos existem na pasta `assets/` e se o caminho usado no `require` está correto.

### O status aberto/fechado parece incorreto

O cálculo usa o horário do dispositivo onde o app está rodando. Confira a data, a hora e o fuso horário do celular ou emulador.

### O arquivo não roda no Snack

No Snack, o arquivo principal deve se chamar `App.js`. Se você copiou o arquivo como `app.js`, renomeie ou cole o conteúdo dentro de `App.js`.
