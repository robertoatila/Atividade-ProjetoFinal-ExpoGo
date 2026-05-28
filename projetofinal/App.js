// ============================================================
// projetofinal — Sushi & Sashimi Bar
// Aluno: Roberto Atila Almeida Azevedo
// ETEC Jacinto Ferreira de Sá — Informática para Internet
// Entrega: 11 de junho
// Arquivo único: App.js
// ============================================================

import React, { useState } from 'react';
import {
  View, Text, Image, TouchableOpacity, FlatList,
  StyleSheet, SafeAreaView, StatusBar, ScrollView,
  TextInput, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// ─────────────────────────────────────────────────────────────
// DADOS — Horários de funcionamento
// ─────────────────────────────────────────────────────────────
const HORARIOS = [
  { dia: 'Domingo',  abertura: '12:00', fechamento: '22:00' },
  { dia: 'Segunda',  abertura: null,    fechamento: null    },
  { dia: 'Terça',    abertura: '18:00', fechamento: '23:00' },
  { dia: 'Quarta',   abertura: '18:00', fechamento: '23:00' },
  { dia: 'Quinta',   abertura: '18:00', fechamento: '23:00' },
  { dia: 'Sexta',    abertura: '18:00', fechamento: '23:30' },
  { dia: 'Sábado',   abertura: '12:00', fechamento: '23:30' },
];

// ─────────────────────────────────────────────────────────────
// DADOS — Cardápio (10 itens obrigatórios)
// Para a entrega final: substituir "imagem" por
//   require('./assets/produto1.jpg')
// ─────────────────────────────────────────────────────────────
const CARDAPIO = [
  { id:'1',  nome:'Sashimi de Salmão',            preco:28.90, imagem:'https://placehold.co/210x210/C62828/FFFFFF?text=Salmão',    descricao:'6 fatias de salmão fresco, shoyu e wasabi' },
  { id:'2',  nome:'Sashimi de Atum',              preco:32.90, imagem:'https://placehold.co/210x210/1A1A2E/FFFFFF?text=Atum',       descricao:'6 fatias de atum premium com gengibre em conserva' },
  { id:'3',  nome:'Combinado Sashimi 20 peças',   preco:65.90, imagem:'https://placehold.co/210x210/880E4F/FFFFFF?text=Combinado',  descricao:'Mix de salmão, atum, peixe branco e camarão' },
  { id:'4',  nome:'Temaki Salmão Cream Cheese',   preco:22.90, imagem:'https://placehold.co/210x210/4527A0/FFFFFF?text=Temaki',     descricao:'Cone de alga com salmão, cream cheese e pepino' },
  { id:'5',  nome:'Uramaki Califórnia (8 un.)',   preco:24.90, imagem:'https://placehold.co/210x210/1565C0/FFFFFF?text=Califórnia', descricao:'Arroz por fora, kani, pepino e manga' },
  { id:'6',  nome:'Nigiri de Camarão (4 un.)',    preco:19.90, imagem:'https://placehold.co/210x210/E65100/FFFFFF?text=Nigiri',     descricao:'Camarão grelhado sobre bolinha de arroz temperado' },
  { id:'7',  nome:'Hot Roll de Salmão (8 un.)',   preco:26.90, imagem:'https://placehold.co/210x210/BF360C/FFFFFF?text=Hot+Roll',   descricao:'Rolinho frito com salmão e cream cheese' },
  { id:'8',  nome:'Combinado Sushi 30 peças',     preco:89.90, imagem:'https://placehold.co/210x210/1B5E20/FFFFFF?text=30+Peças',  descricao:'Hossomaki, uramaki, niguiri e temaki mini' },
  { id:'9',  nome:'Gunkan de Salmão (4 un.)',     preco:21.90, imagem:'https://placehold.co/210x210/4E342E/FFFFFF?text=Gunkan',    descricao:'Gunkan com roe de salmão e cebolinha verde' },
  { id:'10', nome:'Temaki Tuna Spicy',            preco:23.90, imagem:'https://placehold.co/210x210/B71C1C/FFFFFF?text=Tuna+Spicy',descricao:'Atum picante, sriracha e pepino crocante' },
];

// ─────────────────────────────────────────────────────────────
// UTILITÁRIO — Verifica se está aberto agora
// ─────────────────────────────────────────────────────────────
function verificarAberto() {
  const agora = new Date();
  const h = HORARIOS[agora.getDay()];
  if (!h.abertura) return false;
  const [hA, mA] = h.abertura.split(':').map(Number);
  const [hF, mF] = h.fechamento.split(':').map(Number);
  const min = agora.getHours() * 60 + agora.getMinutes();
  const abre = hA * 60 + mA;
  const fecha = hF * 60 + mF;
  // Suporte a intervalos que cruzam a meia-noite
  return fecha < abre ? (min >= abre || min < fecha) : (min >= abre && min < fecha);
}

// ─────────────────────────────────────────────────────────────
// COMPONENTE — Header fixo
// Logo, nome, endereço, telefone, acordeão de horários,
// indicador Aberto / Fechado
// ─────────────────────────────────────────────────────────────
function Header() {
  const [painelAberto, setPainelAberto] = useState(false);
  const aberto = verificarAberto();

  return (
    <View style={s.headerWrapper}>
      {/* Linha principal */}
      <View style={s.headerRow}>
        {/* Logo — substituir por <Image source={require('./assets/logo.png')} ...> */}
        <View style={s.logoBox}>
          <Text style={s.logoEmoji}>🍣</Text>
        </View>

        {/* Informações do estabelecimento */}
        <View style={s.headerInfo}>
          <Text style={s.headerNome}>Hiroshima & Nagasaki</Text>
          <Text style={s.headerDetalhe}>📍 Av. Kamikaze, 1945 — Centro</Text>
          <Text style={s.headerDetalhe}>📞 (14) 99767-6988</Text>
        </View>

        {/* Indicador Aberto / Fechado */}
        <View style={[s.badge, aberto ? s.badgeAberto : s.badgeFechado]}>
          <Text style={s.badgeTxt}>{aberto ? 'ABERTO' : 'FECHADO'}</Text>
        </View>
      </View>

      {/* Botão acordeão */}
      <TouchableOpacity
        style={s.btnHorarios}
        onPress={() => setPainelAberto(!painelAberto)}
        activeOpacity={0.75}
      >
        <Ionicons name="time-outline" size={13} color="#E8C547" />
        <Text style={s.btnHorariosTxt}>Ver horários de funcionamento</Text>
        <Ionicons name={painelAberto ? 'chevron-up' : 'chevron-down'} size={13} color="#E8C547" />
      </TouchableOpacity>

      {/* Painel de horários (acordeão) */}
      {painelAberto && (
        <View style={s.painel}>
          {HORARIOS.map((h, i) => (
            <View key={i} style={s.linhaHorario}>
              <Text style={s.horarioDia}>{h.dia}</Text>
              <Text style={[s.horarioHora, !h.abertura && s.horarioFechado]}>
                {h.abertura ? `${h.abertura} – ${h.fechamento}` : 'Fechado'}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

// ─────────────────────────────────────────────────────────────
// COMPONENTE — ProductCard (reutilizável)
// ─────────────────────────────────────────────────────────────
function ProductCard({ produto }) {
  return (
    <View style={s.card}>
      {/* Imagem do produto */}
      <Image source={{ uri: produto.imagem }} style={s.cardImg} resizeMode="cover" />

      <View style={s.cardInfo}>
        <Text style={s.cardNome} numberOfLines={1}>{produto.nome}</Text>
        <Text style={s.cardDesc} numberOfLines={2}>{produto.descricao}</Text>

        {/* Preço + botão Adicionar */}
        <View style={s.cardRodape}>
          <Text style={s.cardPreco}>R$ {produto.preco.toFixed(2)}</Text>
          {/* Botão layout apenas — carrinho será programado depois */}
          <TouchableOpacity style={s.btnAdicionar} activeOpacity={0.8}>
            <Text style={s.btnAdicionarTxt}>+ Adicionar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// ─────────────────────────────────────────────────────────────
// COMPONENTE — Footer fixo com navegação
// ─────────────────────────────────────────────────────────────
const NAV = [
  { key:'home',    label:'Home',    icon:'home-outline',    iconOn:'home'    },
  { key:'orders',  label:'Pedidos', icon:'receipt-outline', iconOn:'receipt' },
  { key:'profile', label:'Perfil',  icon:'person-outline',  iconOn:'person'  },
];

function FooterNav({ telaAtiva, onNavegar }) {
  return (
    <View style={s.footer}>
      {NAV.map(item => {
        const on = telaAtiva === item.key;
        return (
          <TouchableOpacity
            key={item.key}
            style={s.navItem}
            onPress={() => onNavegar(item.key)}
            activeOpacity={0.7}
          >
            <Ionicons name={on ? item.iconOn : item.icon} size={24} color={on ? '#B71C1C' : '#9E9E9E'} />
            <Text style={[s.navLabel, on && s.navLabelOn]}>{item.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// ─────────────────────────────────────────────────────────────
// TELA — Home (FlatList com cardápio)
// ─────────────────────────────────────────────────────────────
function HomeScreen() {
  return (
    <FlatList
      data={CARDAPIO}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <ProductCard produto={item} />}
      ListHeaderComponent={
        <View style={s.listHeader}>
          <Text style={s.listTitulo}>🍣  Cardápio</Text>
          <Text style={s.listSub}>Seleção artesanal de sushis e sashimis</Text>
        </View>
      }
      ListFooterComponent={<View style={{ height: 14 }} />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ backgroundColor: '#F8F5F0', paddingTop: 4 }}
    />
  );
}

// ─────────────────────────────────────────────────────────────
// TELA — Pedidos (placeholder)
// ─────────────────────────────────────────────────────────────
function OrdersScreen() {
  return (
    <View style={s.placeholder}>
      <Ionicons name="receipt-outline" size={72} color="#C0B8B0" />
      <Text style={s.placeholderTitulo}>Seus Pedidos</Text>
      <Text style={s.placeholderSub}>Em breve você acompanha seus{'\n'}pedidos em tempo real aqui.</Text>
    </View>
  );
}

// ─────────────────────────────────────────────────────────────
// TELA — Perfil (formulário)
// ─────────────────────────────────────────────────────────────
function ProfileForm() {
  const [form, setForm] = useState({
    nomeCompleto:'', telefone:'',
    logradouro:'', numero:'', complemento:'', bairro:'',
  });
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  return (
    <KeyboardAvoidingView style={{ flex:1 }} behavior={Platform.OS==='ios' ? 'padding' : undefined}>
      <ScrollView style={s.formContainer} contentContainerStyle={s.formConteudo} showsVerticalScrollIndicator={false}>

        <View style={s.formCabecalho}>
          <Text style={s.formTitulo}>Meu Perfil</Text>
          <Text style={s.formSub}>Preencha seus dados para entrega</Text>
        </View>

        <Text style={s.secao}>Dados Pessoais</Text>

        <Text style={s.label}>Nome completo *</Text>
        <TextInput style={s.input} value={form.nomeCompleto} onChangeText={v=>set('nomeCompleto',v)}
          placeholder="Ex: Kenji Yamamoto" placeholderTextColor="#BDBDBD" autoCapitalize="words" />

        <Text style={s.label}>Telefone *</Text>
        <TextInput style={s.input} value={form.telefone} onChangeText={v=>set('telefone',v)}
          placeholder="(14) 99999-9999" placeholderTextColor="#BDBDBD" keyboardType="phone-pad" />

        <Text style={s.secao}>Endereço de Entrega</Text>

        <Text style={s.label}>Logradouro *</Text>
        <TextInput style={s.input} value={form.logradouro} onChangeText={v=>set('logradouro',v)}
          placeholder="Rua, Avenida..." placeholderTextColor="#BDBDBD" autoCapitalize="words" />

        {/* Número e Complemento lado a lado */}
        <View style={{ flexDirection:'row', gap:12 }}>
          <View style={{ flex:0.38 }}>
            <Text style={s.label}>Número *</Text>
            <TextInput style={s.input} value={form.numero} onChangeText={v=>set('numero',v)}
              placeholder="512" placeholderTextColor="#BDBDBD" keyboardType="numeric" />
          </View>
          <View style={{ flex:0.58 }}>
            <Text style={s.label}>Complemento</Text>
            <TextInput style={s.input} value={form.complemento} onChangeText={v=>set('complemento',v)}
              placeholder="Apto, Bloco..." placeholderTextColor="#BDBDBD" />
          </View>
        </View>

        <Text style={s.label}>Bairro *</Text>
        <TextInput style={s.input} value={form.bairro} onChangeText={v=>set('bairro',v)}
          placeholder="Centro" placeholderTextColor="#BDBDBD" autoCapitalize="words" />

        <Text style={s.formNota}>* Obrigatório — dados não persistidos nesta versão</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ─────────────────────────────────────────────────────────────
// COMPONENTE RAIZ — App
// ─────────────────────────────────────────────────────────────
export default function App() {
  const [telaAtiva, setTelaAtiva] = useState('home');

  const renderTela = () => {
    switch (telaAtiva) {
      case 'home':    return <HomeScreen />;
      case 'orders':  return <OrdersScreen />;
      case 'profile': return <ProfileForm />;
      default:        return <HomeScreen />;
    }
  };

  return (
    <SafeAreaView style={s.root}>
      <StatusBar backgroundColor="#1A1A2E" barStyle="light-content" />
      <Header />
      <View style={{ flex: 1 }}>{renderTela()}</View>
      <FooterNav telaAtiva={telaAtiva} onNavegar={setTelaAtiva} />
    </SafeAreaView>
  );
}

// ─────────────────────────────────────────────────────────────
// ESTILOS
// ─────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  // Root
  root: { flex:1, backgroundColor:'#F8F5F0' },

  // ── Header ──────────────────────────────────────────────────
  headerWrapper: {
    backgroundColor:'#1A1A2E',
    elevation:6,
    shadowColor:'#000', shadowOffset:{width:0,height:3},
    shadowOpacity:0.25, shadowRadius:4, zIndex:100,
  },
  headerRow: { flexDirection:'row', alignItems:'center', paddingHorizontal:12, paddingVertical:10 },
  logoBox: {
    width:52, height:52, borderRadius:26,
    backgroundColor:'#2D2D44', justifyContent:'center', alignItems:'center',
    marginRight:10, borderWidth:1, borderColor:'#E8C547',
  },
  logoEmoji: { fontSize:28 },
  headerInfo: { flex:1 },
  headerNome: { color:'#FFFFFF', fontSize:15, fontWeight:'bold', letterSpacing:0.5 },
  headerDetalhe: { color:'#A0A0C0', fontSize:11, marginTop:2 },
  // Badge
  badge: { paddingHorizontal:8, paddingVertical:5, borderRadius:6, marginLeft:8, minWidth:62, alignItems:'center' },
  badgeAberto:  { backgroundColor:'#1B5E20', borderWidth:1, borderColor:'#43A047' },
  badgeFechado: { backgroundColor:'#7F0000', borderWidth:1, borderColor:'#C62828' },
  badgeTxt: { color:'#FFF', fontSize:11, fontWeight:'bold', letterSpacing:0.5 },
  // Botão horários
  btnHorarios: {
    flexDirection:'row', alignItems:'center', justifyContent:'center',
    gap:6, paddingVertical:7, backgroundColor:'#12122A',
    borderTopWidth:1, borderTopColor:'#2D2D44',
  },
  btnHorariosTxt: { color:'#E8C547', fontSize:12, fontWeight:'600' },
  // Painel acordeão
  painel: { backgroundColor:'#0D0D1F', paddingHorizontal:16, paddingVertical:8, borderTopWidth:1, borderTopColor:'#2D2D44' },
  linhaHorario: { flexDirection:'row', justifyContent:'space-between', paddingVertical:5, borderBottomWidth:1, borderBottomColor:'#1E1E35' },
  horarioDia: { color:'#C0C0E0', fontSize:13, fontWeight:'500', width:76 },
  horarioHora: { color:'#E0E0FF', fontSize:13 },
  horarioFechado: { color:'#C62828', fontStyle:'italic' },

  // ── ProductCard ──────────────────────────────────────────────
  card: {
    flexDirection:'row', backgroundColor:'#FFF', borderRadius:12,
    marginHorizontal:12, marginVertical:6,
    elevation:3, shadowColor:'#1A1A2E',
    shadowOffset:{width:0,height:2}, shadowOpacity:0.1, shadowRadius:4,
    overflow:'hidden', borderLeftWidth:3, borderLeftColor:'#B71C1C',
  },
  cardImg: { width:105, height:105 },
  cardInfo: { flex:1, padding:10, justifyContent:'space-between' },
  cardNome: { fontSize:14, fontWeight:'bold', color:'#1A1A2E', letterSpacing:0.2 },
  cardDesc: { fontSize:11, color:'#666', marginTop:3, lineHeight:16 },
  cardRodape: { flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginTop:8 },
  cardPreco: { fontSize:16, fontWeight:'bold', color:'#B71C1C' },
  btnAdicionar: { backgroundColor:'#1A1A2E', paddingHorizontal:11, paddingVertical:6, borderRadius:8 },
  btnAdicionarTxt: { color:'#E8C547', fontSize:12, fontWeight:'bold' },

  // ── Footer ───────────────────────────────────────────────────
  footer: {
    flexDirection:'row', backgroundColor:'#FFF',
    borderTopWidth:2, borderTopColor:'#1A1A2E',
    paddingVertical:8, elevation:10,
    shadowColor:'#000', shadowOffset:{width:0,height:-2},
    shadowOpacity:0.12, shadowRadius:4,
  },
  navItem: { flex:1, alignItems:'center', justifyContent:'center', paddingVertical:4 },
  navLabel: { fontSize:11, marginTop:3, color:'#9E9E9E' },
  navLabelOn: { color:'#B71C1C', fontWeight:'700' },

  // ── HomeScreen ───────────────────────────────────────────────
  listHeader: {
    paddingHorizontal:14, paddingTop:14, paddingBottom:6,
    borderBottomWidth:1, borderBottomColor:'#E0D8D0',
    marginBottom:6, marginHorizontal:12,
  },
  listTitulo: { fontSize:20, fontWeight:'bold', color:'#1A1A2E', letterSpacing:0.3 },
  listSub: { fontSize:12, color:'#888', marginTop:2, fontStyle:'italic' },

  // ── OrdersScreen ────────────────────────────────────────────
  placeholder: { flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#F8F5F0', padding:24 },
  placeholderTitulo: { fontSize:22, fontWeight:'bold', color:'#1A1A2E', marginTop:18 },
  placeholderSub: { fontSize:14, color:'#9E9E9E', textAlign:'center', marginTop:8, lineHeight:22 },

  // ── ProfileForm ──────────────────────────────────────────────
  formContainer: { flex:1, backgroundColor:'#F8F5F0' },
  formConteudo: { padding:16, paddingBottom:36 },
  formCabecalho: { marginBottom:20, borderLeftWidth:3, borderLeftColor:'#B71C1C', paddingLeft:10 },
  formTitulo: { fontSize:22, fontWeight:'bold', color:'#1A1A2E' },
  formSub: { fontSize:13, color:'#777', marginTop:2 },
  secao: {
    fontSize:12, fontWeight:'bold', color:'#B71C1C',
    textTransform:'uppercase', letterSpacing:1.2,
    marginTop:18, marginBottom:10,
    borderBottomWidth:1, borderBottomColor:'#E0D8D0', paddingBottom:5,
  },
  label: { fontSize:13, color:'#444', fontWeight:'500', marginBottom:5, marginTop:4 },
  input: {
    backgroundColor:'#FFF', borderWidth:1, borderColor:'#D0C8C0',
    borderRadius:8, paddingHorizontal:12, paddingVertical:10,
    fontSize:14, color:'#1A1A2E', marginBottom:10,
  },
  formNota: { fontSize:11, color:'#9E9E9E', marginTop:18, textAlign:'center', fontStyle:'italic' },
});