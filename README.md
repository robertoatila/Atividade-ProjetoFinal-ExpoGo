# projetofinal — Sushi & Sashimi Bar

**Aluno:** Roberto Atila Almeida Azevedo  
**Turma:** Informática para Internet — ETEC Jacinto Ferreira de Sá  
**Entrega:** 11 de junho  
**Tema:** Sushi & Sashimi Bar (Grupo B)

---

## Como rodar no Expo Snack

1. Acesse **[snack.expo.dev](https://snack.expo.dev)**
2. Crie um novo projeto com o nome exato: **projetofinal**
3. Copie cada arquivo respeitando a estrutura abaixo
4. No painel *Files*, crie a pasta `assets/` e faça upload das imagens
5. Substitua as URLs de placeholder em `screens/HomeScreen.js` pelos `require('../assets/produtoN.jpg')`
6. Escaneie o QR code com o app **Expo Go**

## Estrutura de arquivos

```
projetofinal/
├── App.js
├── README.md
├── assets/
│   ├── logo.png
│   ├── produto1.jpg … produto10.jpg
├── components/
│   ├── Header.js        ← header fixo, acordeão de horários, badge Aberto/Fechado
│   ├── ProductCard.js   ← card reutilizável do cardápio
│   ├── FooterNav.js     ← navegação fixa na base
│   └── ProfileForm.js   ← formulário de perfil
└── screens/
    ├── HomeScreen.js    ← FlatList com os 10 itens do cardápio
    └── OrdersScreen.js  ← placeholder (programação posterior)
```

## Funcionalidades implementadas

| Requisito | Status |
|---|---|
| Header fixo (logo, nome, endereço, telefone) | ✅ |
| Horários em painel acordeão | ✅ |
| Indicador Aberto / Fechado (lógica de dia + hora) | ✅ |
| Cardápio com 10 itens (FlatList + ProductCard) | ✅ |
| Botão "Adicionar ao carrinho" (layout) | ✅ |
| Footer fixo com 3 itens de navegação | ✅ |
| Tela Pedidos (placeholder) | ✅ |
| Formulário de Perfil completo | ✅ |

## Dependência externa

- `@expo/vector-icons` — já inclusa no Expo; nenhuma instalação extra necessária.
