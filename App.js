// ============================================================
// projetofinal - Sushi & Sashimi Bar
// Aluno: Roberto Atila Almeida Azevedo
// ETEC Jacinto Ferreira de Sa - Informatica para Internet
// Entrega: 11 de junho
// Arquivo unico: App.js
// ============================================================

import React, { useState } from 'react';
import {
    View, Text, Image, Pressable, FlatList,
    StyleSheet, SafeAreaView, StatusBar, ScrollView,
    TextInput, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const COLORS = {
    bg: '#FFF8EE',
    surface: '#FFFFFF',
    header: '#17131F',
    headerSoft: '#211B2A',
    ink: '#241B18',
    muted: '#7C6E66',
    mutedLight: '#A99B90',
    line: '#E9DCC9',
    red: '#B83232',
    redDark: '#7F2424',
    gold: '#D8B45A',
    goldSoft: '#F8E8BB',
    cream: '#FFF1D8',
};

const SHADOWS = {
    soft: Platform.select({
        ios: {
            shadowColor: '#4A2418',
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.08,
            shadowRadius: 18,
        },
        android: { elevation: 3 },
        default: {},
    }),
    header: Platform.select({
        ios: {
            shadowColor: '#170F0C',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.18,
            shadowRadius: 16,
        },
        android: { elevation: 8 },
        default: {},
    }),
};

// ─────────────────────────────────────────────────────────────
// DADOS - Horarios de funcionamento
// ─────────────────────────────────────────────────────────────
const HORARIOS = [
    { dia: 'Domingo', abertura: '12:00', fechamento: '22:00' },
    { dia: 'Segunda', abertura: null, fechamento: null },
    { dia: 'Terça', abertura: '18:00', fechamento: '23:00' },
    { dia: 'Quarta', abertura: '18:00', fechamento: '23:00' },
    { dia: 'Quinta', abertura: '18:00', fechamento: '23:00' },
    { dia: 'Sexta', abertura: '18:00', fechamento: '23:30' },
    { dia: 'Sábado', abertura: '12:00', fechamento: '23:30' },
];

// ─────────────────────────────────────────────────────────────
// DADOS - Cardapio (10 itens obrigatorios)
// Imagens hospedadas no CDN do Snack para evitar falha no import de assets.
// ─────────────────────────────────────────────────────────────
const IMAGENS_CARDAPIO = {
    sashimiSalmao: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/b7c16d458b675f2716dd6131c2a79fad',
    sashimiAtum: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9c9515242bfaacb44cbd280f17be80b3',
    combinadoSashimi: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/bcee104a4707f232533434de501fbc57',
    temakiSalmao: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/6965aa267d145d5247133bcb4e3edaac',
    uramakiCalifornia: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/dd21e7bb01f0edc7a3cbc7efdf9ab125',
    nigiriCamarao: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/89a3522824bda4b5de92a5171c93641c',
    hotRollSalmao: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/833f2f7a5d2bc04b115570c3e2c75a07',
    combinadoSushi: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/1cf0fd17c7856717b8119f16662f554e',
    gunkanSalmao: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/497fe2d32b9b65e6e04167478cfea412',
    temakiTuna: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/c10ae132c459345266d58d4c836f8e6c',
};

const CARDAPIO = [
    { id: '1', nome: 'Sashimi de Salmão', preco: 28.90, imagem: IMAGENS_CARDAPIO.sashimiSalmao, descricao: '6 fatias de salmão fresco, shoyu e wasabi' },
    { id: '2', nome: 'Sashimi de Atum', preco: 32.90, imagem: IMAGENS_CARDAPIO.sashimiAtum, descricao: '6 fatias de atum premium com gengibre em conserva' },
    { id: '3', nome: 'Combinado Sashimi 20 peças', preco: 65.90, imagem: IMAGENS_CARDAPIO.combinadoSashimi, descricao: 'Mix de salmão, atum, peixe branco e camarão' },
    { id: '4', nome: 'Temaki Salmão Cream Cheese', preco: 22.90, imagem: IMAGENS_CARDAPIO.temakiSalmao, descricao: 'Cone de alga com salmão, cream cheese e pepino' },
    { id: '5', nome: 'Uramaki Califórnia (8 un.)', preco: 24.90, imagem: IMAGENS_CARDAPIO.uramakiCalifornia, descricao: 'Arroz por fora, kani, pepino e manga' },
    { id: '6', nome: 'Nigiri de Camarão (4 un.)', preco: 19.90, imagem: IMAGENS_CARDAPIO.nigiriCamarao, descricao: 'Camarão grelhado sobre bolinha de arroz temperado' },
    { id: '7', nome: 'Hot Roll de Salmão (8 un.)', preco: 26.90, imagem: IMAGENS_CARDAPIO.hotRollSalmao, descricao: 'Rolinho frito com salmão e cream cheese' },
    { id: '8', nome: 'Combinado Sushi 30 peças', preco: 89.90, imagem: IMAGENS_CARDAPIO.combinadoSushi, descricao: 'Hossomaki, uramaki, niguiri e temaki mini' },
    { id: '9', nome: 'Gunkan de Salmão (4 un.)', preco: 21.90, imagem: IMAGENS_CARDAPIO.gunkanSalmao, descricao: 'Gunkan com roe de salmão e cebolinha verde' },
    { id: '10', nome: 'Temaki Tuna Spicy', preco: 23.90, imagem: IMAGENS_CARDAPIO.temakiTuna, descricao: 'Atum picante, sriracha e pepino crocante' },
];

// ─────────────────────────────────────────────────────────────
// UTILITARIO - Verifica se esta aberto agora
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

function formatarPreco(valor) {
    return valor.toFixed(2).replace('.', ',');
}

function getImagemSource(imagem) {
    return typeof imagem === 'string' ? { uri: imagem } : imagem;
}

// ─────────────────────────────────────────────────────────────
// COMPONENTE - Header fixo
// ─────────────────────────────────────────────────────────────
function Header() {
    const [painelAberto, setPainelAberto] = useState(false);
    const aberto = verificarAberto();
    const hoje = new Date().getDay();

    return (
        <View style={s.headerWrapper}>
            <View style={s.headerTopLine} />

            <View style={s.headerRow}>
                <View style={s.logoBox}>
                    <Ionicons name="restaurant-outline" size={26} color={COLORS.gold} />
                </View>

                <View style={s.headerInfo}>
                    <Text style={s.headerEyebrow}>Sushi & Sashimi Bar</Text>
                    <Text style={s.headerNome} numberOfLines={1}>Hiroshima & Nagasaki</Text>

                    <View style={s.headerMetaRow}>
                        <Ionicons name="location-outline" size={12} color={COLORS.gold} />
                        <Text style={s.headerDetalhe} numberOfLines={1}>Av. Kamikaze, 1945 - Centro</Text>
                    </View>
                    <View style={s.headerMetaRow}>
                        <Ionicons name="call-outline" size={12} color={COLORS.gold} />
                        <Text style={s.headerDetalhe} numberOfLines={1}>(14) 99767-6988</Text>
                    </View>
                </View>

                <View style={[s.badge, aberto ? s.badgeAberto : s.badgeFechado]}>
                    <View style={[s.badgeDot, aberto ? s.badgeDotAberto : s.badgeDotFechado]} />
                    <Text style={s.badgeTxt}>{aberto ? 'ABERTO' : 'FECHADO'}</Text>
                </View>
            </View>

            <Pressable
                style={({ pressed }) => [s.btnHorarios, pressed && s.pressedDark]}
                onPress={() => setPainelAberto(!painelAberto)}
                accessibilityRole="button"
                accessibilityLabel="Ver horarios de funcionamento"
            >
                <View style={s.btnHorariosLeft}>
                    <Ionicons name="time-outline" size={15} color={COLORS.gold} />
                    <Text style={s.btnHorariosTxt}>Horários de funcionamento</Text>
                </View>
                <Ionicons name={painelAberto ? 'chevron-up' : 'chevron-down'} size={15} color={COLORS.gold} />
            </Pressable>

            {painelAberto && (
                <View style={s.painel}>
                    {HORARIOS.map((h, i) => {
                        const ativoHoje = i === hoje;
                        return (
                            <View key={h.dia} style={[s.linhaHorario, ativoHoje && s.linhaHorarioHoje]}>
                                <View style={s.horarioDiaGrupo}>
                                    <View style={[s.horarioMarcador, ativoHoje && s.horarioMarcadorHoje]} />
                                    <Text style={[s.horarioDia, ativoHoje && s.horarioDiaHoje]}>{h.dia}</Text>
                                </View>
                                <Text style={[
                                    s.horarioHora,
                                    !h.abertura && s.horarioFechado,
                                    ativoHoje && h.abertura && s.horarioHoraHoje,
                                ]}>
                                    {h.abertura ? `${h.abertura} - ${h.fechamento}` : 'Fechado'}
                                </Text>
                            </View>
                        );
                    })}
                </View>
            )}
        </View>
    );
}

// ─────────────────────────────────────────────────────────────
// COMPONENTE - ProductCard reutilizavel
// ─────────────────────────────────────────────────────────────
function ProductCard({ produto }) {
    return (
        <View style={s.card}>
            <View style={s.cardImageWrap}>
                <Image source={getImagemSource(produto.imagem)} style={s.cardImg} resizeMode="cover" />
                <View style={s.cardImageShade} />
            </View>

            <View style={s.cardInfo}>
                <View>
                    <View style={s.cardTitleRow}>
                        <Text style={s.cardNome} numberOfLines={1}>{produto.nome}</Text>
                    </View>
                    <Text style={s.cardDesc} numberOfLines={2}>{produto.descricao}</Text>
                </View>

                <View style={s.cardRodape}>
                    <View>
                        <Text style={s.precoLabel}>A partir de</Text>
                        <Text style={s.cardPreco}>R$ {formatarPreco(produto.preco)}</Text>
                    </View>

                    <Pressable
                        style={({ pressed }) => [s.btnAdicionar, pressed && s.btnAdicionarPressed]}
                        onPress={() => {}}
                        accessibilityRole="button"
                        accessibilityLabel={`Adicionar ${produto.nome}`}
                    >
                        <Ionicons name="add" size={16} color={COLORS.cream} />
                        <Text style={s.btnAdicionarTxt}>Adicionar</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

// ─────────────────────────────────────────────────────────────
// COMPONENTE - Footer fixo com navegacao
// ─────────────────────────────────────────────────────────────
const NAV = [
    { key: 'home', label: 'Home', icon: 'home-outline', iconOn: 'home' },
    { key: 'orders', label: 'Pedidos', icon: 'receipt-outline', iconOn: 'receipt' },
    { key: 'profile', label: 'Perfil', icon: 'person-outline', iconOn: 'person' },
];

function FooterNav({ telaAtiva, onNavegar }) {
    return (
        <View style={s.footerOuter}>
            <View style={s.footer}>
                {NAV.map(item => {
                    const on = telaAtiva === item.key;
                    return (
                        <Pressable
                            key={item.key}
                            style={({ pressed }) => [s.navItem, on && s.navItemOn, pressed && s.navItemPressed]}
                            onPress={() => onNavegar(item.key)}
                            accessibilityRole="button"
                            accessibilityState={{ selected: on }}
                        >
                            <Ionicons name={on ? item.iconOn : item.icon} size={22} color={on ? COLORS.red : COLORS.mutedLight} />
                            <Text style={[s.navLabel, on && s.navLabelOn]}>{item.label}</Text>
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
}

// ─────────────────────────────────────────────────────────────
// TELA - Home
// ─────────────────────────────────────────────────────────────
function MenuHeader() {
    return (
        <View style={s.listHeader}>
            <View style={s.sectionKicker}>
                <View style={s.kickerLine} />
                <Text style={s.kickerText}>Seleção da casa</Text>
            </View>

            <View style={s.menuTitleRow}>
                <View style={s.menuTitleGroup}>
                    <Text style={s.listTitulo}>Cardápio</Text>
                    <Text style={s.listSub}>Sushis e sashimis preparados para pedido rápido.</Text>
                </View>
                <View style={s.menuCountPill}>
                    <Ionicons name="restaurant-outline" size={14} color={COLORS.red} />
                    <Text style={s.menuCountTxt}>10 itens</Text>
                </View>
            </View>
        </View>
    );
}

function HomeScreen() {
    return (
        <FlatList
            data={CARDAPIO}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <ProductCard produto={item} />}
            ListHeaderComponent={<MenuHeader />}
            ListFooterComponent={<View style={s.listFooterSpace} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={s.listContent}
        />
    );
}

// ─────────────────────────────────────────────────────────────
// TELA - Pedidos
// ─────────────────────────────────────────────────────────────
function OrdersScreen() {
    return (
        <View style={s.emptyState}>
            <View style={s.emptyIconBox}>
                <Ionicons name="receipt-outline" size={48} color={COLORS.red} />
            </View>
            <Text style={s.emptyKicker}>Acompanhamento</Text>
            <Text style={s.placeholderTitulo}>Seus pedidos aparecem aqui</Text>
            <Text style={s.placeholderSub}>
                Quando o carrinho for implementado, esta tela pode mostrar status,
                itens escolhidos e previsao de entrega.
            </Text>
            <View style={s.emptyDivider} />
            <Text style={s.emptyHint}>Versão atual: tela preparada para a próxima etapa.</Text>
        </View>
    );
}

// ─────────────────────────────────────────────────────────────
// TELA - Perfil
// ─────────────────────────────────────────────────────────────
function ProfileForm() {
    const [focused, setFocused] = useState(null);
    const [form, setForm] = useState({
        nomeCompleto: '', telefone: '',
        logradouro: '', numero: '', complemento: '', bairro: '',
    });
    const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
    const inputStyle = field => [s.input, focused === field && s.inputFocus];

    return (
        <KeyboardAvoidingView style={s.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ScrollView style={s.formContainer} contentContainerStyle={s.formConteudo} showsVerticalScrollIndicator={false}>
                <View style={s.formCabecalho}>
                    <Text style={s.formKicker}>Perfil de entrega</Text>
                    <Text style={s.formTitulo}>Meu Perfil</Text>
                    <Text style={s.formSub}>Preencha seus dados para agilizar futuros pedidos.</Text>
                </View>

                <View style={s.formSection}>
                    <View style={s.formSectionHeader}>
                        <Ionicons name="person-outline" size={18} color={COLORS.red} />
                        <Text style={s.secao}>Dados Pessoais</Text>
                    </View>

                    <Text style={s.label}>Nome completo *</Text>
                    <TextInput
                        style={inputStyle('nomeCompleto')}
                        value={form.nomeCompleto}
                        onChangeText={v => set('nomeCompleto', v)}
                        onFocus={() => setFocused('nomeCompleto')}
                        onBlur={() => setFocused(null)}
                        placeholder="Ex: Kenji Yamamoto"
                        placeholderTextColor="#B8A99F"
                        autoCapitalize="words"
                    />

                    <Text style={s.label}>Telefone *</Text>
                    <TextInput
                        style={inputStyle('telefone')}
                        value={form.telefone}
                        onChangeText={v => set('telefone', v)}
                        onFocus={() => setFocused('telefone')}
                        onBlur={() => setFocused(null)}
                        placeholder="(14) 99999-9999"
                        placeholderTextColor="#B8A99F"
                        keyboardType="phone-pad"
                    />
                </View>

                <View style={s.formSection}>
                    <View style={s.formSectionHeader}>
                        <Ionicons name="location-outline" size={18} color={COLORS.red} />
                        <Text style={s.secao}>Endereço de Entrega</Text>
                    </View>

                    <Text style={s.label}>Logradouro *</Text>
                    <TextInput
                        style={inputStyle('logradouro')}
                        value={form.logradouro}
                        onChangeText={v => set('logradouro', v)}
                        onFocus={() => setFocused('logradouro')}
                        onBlur={() => setFocused(null)}
                        placeholder="Rua, Avenida..."
                        placeholderTextColor="#B8A99F"
                        autoCapitalize="words"
                    />

                    <View style={s.formRow}>
                        <View style={s.numeroCol}>
                            <Text style={s.label}>Número *</Text>
                            <TextInput
                                style={inputStyle('numero')}
                                value={form.numero}
                                onChangeText={v => set('numero', v)}
                                onFocus={() => setFocused('numero')}
                                onBlur={() => setFocused(null)}
                                placeholder="512"
                                placeholderTextColor="#B8A99F"
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={s.complementoCol}>
                            <Text style={s.label}>Complemento</Text>
                            <TextInput
                                style={inputStyle('complemento')}
                                value={form.complemento}
                                onChangeText={v => set('complemento', v)}
                                onFocus={() => setFocused('complemento')}
                                onBlur={() => setFocused(null)}
                                placeholder="Apto, Bloco..."
                                placeholderTextColor="#B8A99F"
                            />
                        </View>
                    </View>

                    <Text style={s.label}>Bairro *</Text>
                    <TextInput
                        style={inputStyle('bairro')}
                        value={form.bairro}
                        onChangeText={v => set('bairro', v)}
                        onFocus={() => setFocused('bairro')}
                        onBlur={() => setFocused(null)}
                        placeholder="Centro"
                        placeholderTextColor="#B8A99F"
                        autoCapitalize="words"
                    />
                </View>

                <Text style={s.formNota}>* Obrigatório - dados não persistidos nesta versão</Text>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

// ─────────────────────────────────────────────────────────────
// COMPONENTE RAIZ - App
// ─────────────────────────────────────────────────────────────
export default function App() {
    const [telaAtiva, setTelaAtiva] = useState('home');

    const renderTela = () => {
        switch (telaAtiva) {
            case 'home': return <HomeScreen />;
            case 'orders': return <OrdersScreen />;
            case 'profile': return <ProfileForm />;
            default: return <HomeScreen />;
        }
    };

    return (
        <SafeAreaView style={s.root}>
            <StatusBar backgroundColor={COLORS.header} barStyle="light-content" />
            <Header />
            <View style={s.screen}>{renderTela()}</View>
            <FooterNav telaAtiva={telaAtiva} onNavegar={setTelaAtiva} />
        </SafeAreaView>
    );
}

// ─────────────────────────────────────────────────────────────
// ESTILOS
// ─────────────────────────────────────────────────────────────
const s = StyleSheet.create({
    flex: { flex: 1 },
    root: {
        flex: 1,
        backgroundColor: COLORS.bg,
    },
    screen: {
        flex: 1,
        backgroundColor: COLORS.bg,
    },

    // Header
    headerWrapper: {
        backgroundColor: COLORS.header,
        borderBottomLeftRadius: 22,
        borderBottomRightRadius: 22,
        overflow: 'hidden',
        zIndex: 100,
        ...SHADOWS.header,
    },
    headerTopLine: {
        height: 3,
        backgroundColor: COLORS.gold,
        opacity: 0.9,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 14,
        paddingBottom: 12,
    },
    logoBox: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: COLORS.headerSoft,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        borderWidth: 1,
        borderColor: 'rgba(216,180,90,0.55)',
    },
    headerInfo: {
        flex: 1,
        paddingRight: 8,
    },
    headerEyebrow: {
        color: COLORS.gold,
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 1.1,
        textTransform: 'uppercase',
        marginBottom: 3,
    },
    headerNome: {
        color: COLORS.surface,
        fontSize: 17,
        fontWeight: '900',
        letterSpacing: 0.2,
        marginBottom: 5,
    },
    headerMetaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        marginTop: 2,
    },
    headerDetalhe: {
        color: '#D4C8BF',
        fontSize: 11,
        flex: 1,
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        paddingHorizontal: 9,
        paddingVertical: 7,
        borderRadius: 999,
        minWidth: 82,
        justifyContent: 'center',
        borderWidth: 1,
    },
    badgeAberto: {
        backgroundColor: 'rgba(47,125,87,0.18)',
        borderColor: 'rgba(88,176,127,0.45)',
    },
    badgeFechado: {
        backgroundColor: 'rgba(184,50,50,0.18)',
        borderColor: 'rgba(223,92,92,0.4)',
    },
    badgeDot: {
        width: 7,
        height: 7,
        borderRadius: 4,
    },
    badgeDotAberto: { backgroundColor: '#57D08B' },
    badgeDotFechado: { backgroundColor: '#FF7A7A' },
    badgeTxt: {
        color: COLORS.surface,
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 0.7,
    },
    btnHorarios: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 11,
        backgroundColor: '#120F19',
        borderTopWidth: 1,
        borderTopColor: 'rgba(216,180,90,0.16)',
    },
    btnHorariosLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    btnHorariosTxt: {
        color: COLORS.gold,
        fontSize: 12,
        fontWeight: '800',
    },
    pressedDark: {
        opacity: 0.78,
        transform: [{ scale: 0.995 }],
    },
    painel: {
        backgroundColor: '#120F19',
        paddingHorizontal: 14,
        paddingBottom: 12,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.05)',
    },
    linhaHorario: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
        paddingHorizontal: 8,
        borderRadius: 12,
    },
    linhaHorarioHoje: {
        backgroundColor: 'rgba(216,180,90,0.12)',
    },
    horarioDiaGrupo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    horarioMarcador: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: 'rgba(255,255,255,0.16)',
    },
    horarioMarcadorHoje: {
        backgroundColor: COLORS.gold,
    },
    horarioDia: {
        color: '#CFC3BA',
        fontSize: 13,
        fontWeight: '700',
    },
    horarioDiaHoje: {
        color: COLORS.surface,
    },
    horarioHora: {
        color: '#E9DED5',
        fontSize: 13,
        fontWeight: '600',
    },
    horarioHoraHoje: {
        color: COLORS.gold,
        fontWeight: '900',
    },
    horarioFechado: {
        color: '#F09696',
        fontStyle: 'italic',
    },

    // Home
    listContent: {
        backgroundColor: COLORS.bg,
        paddingTop: 18,
        paddingBottom: 8,
    },
    listHeader: {
        paddingHorizontal: 18,
        paddingBottom: 12,
    },
    sectionKicker: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 9,
        marginBottom: 10,
    },
    kickerLine: {
        width: 34,
        height: 2,
        backgroundColor: COLORS.gold,
        borderRadius: 2,
    },
    kickerText: {
        color: COLORS.red,
        fontSize: 11,
        fontWeight: '900',
        letterSpacing: 1.1,
        textTransform: 'uppercase',
    },
    menuTitleRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 12,
    },
    menuTitleGroup: {
        flex: 1,
    },
    listTitulo: {
        fontSize: 28,
        fontWeight: '900',
        color: COLORS.ink,
        letterSpacing: 0.2,
    },
    listSub: {
        fontSize: 13,
        color: COLORS.muted,
        marginTop: 4,
        lineHeight: 18,
    },
    menuCountPill: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        backgroundColor: COLORS.goldSoft,
        borderWidth: 1,
        borderColor: '#E9CF8D',
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 999,
        marginTop: 3,
    },
    menuCountTxt: {
        color: COLORS.red,
        fontSize: 11,
        fontWeight: '900',
    },
    listFooterSpace: {
        height: 18,
    },

    // ProductCard
    card: {
        flexDirection: 'row',
        backgroundColor: COLORS.surface,
        borderRadius: 18,
        marginHorizontal: 14,
        marginVertical: 7,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(233,220,201,0.9)',
        ...SHADOWS.soft,
    },
    cardImageWrap: {
        width: 116,
        height: 130,
        backgroundColor: COLORS.cream,
        overflow: 'hidden',
    },
    cardImg: {
        width: '100%',
        height: '100%',
    },
    cardImageShade: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 32,
        backgroundColor: 'rgba(23,19,31,0.16)',
    },
    cardInfo: {
        flex: 1,
        padding: 13,
        justifyContent: 'space-between',
        minHeight: 130,
    },
    cardTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardNome: {
        flex: 1,
        fontSize: 15,
        fontWeight: '900',
        color: COLORS.ink,
        letterSpacing: 0.1,
    },
    cardDesc: {
        fontSize: 12,
        color: COLORS.muted,
        marginTop: 5,
        lineHeight: 17,
    },
    cardRodape: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: 10,
        marginTop: 12,
    },
    precoLabel: {
        fontSize: 10,
        color: COLORS.mutedLight,
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 0.6,
    },
    cardPreco: {
        fontSize: 19,
        fontWeight: '900',
        color: COLORS.red,
        marginTop: 1,
    },
    btnAdicionar: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
        backgroundColor: COLORS.red,
        paddingHorizontal: 11,
        paddingVertical: 8,
        borderRadius: 11,
        borderWidth: 1,
        borderColor: COLORS.redDark,
    },
    btnAdicionarPressed: {
        opacity: 0.86,
        transform: [{ scale: 0.97 }],
    },
    btnAdicionarTxt: {
        color: COLORS.cream,
        fontSize: 12,
        fontWeight: '900',
    },

    // Footer
    footerOuter: {
        backgroundColor: COLORS.bg,
        paddingHorizontal: 12,
        paddingTop: 7,
        paddingBottom: Platform.OS === 'ios' ? 10 : 8,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.line,
        padding: 5,
        ...SHADOWS.soft,
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        borderRadius: 15,
        gap: 2,
    },
    navItemOn: {
        backgroundColor: COLORS.goldSoft,
    },
    navItemPressed: {
        opacity: 0.82,
        transform: [{ scale: 0.97 }],
    },
    navLabel: {
        fontSize: 11,
        color: COLORS.mutedLight,
        fontWeight: '800',
    },
    navLabelOn: {
        color: COLORS.red,
        fontWeight: '900',
    },

    // Empty orders
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.bg,
        paddingHorizontal: 28,
    },
    emptyIconBox: {
        width: 96,
        height: 96,
        borderRadius: 48,
        backgroundColor: COLORS.goldSoft,
        borderWidth: 1,
        borderColor: '#E9CF8D',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        ...SHADOWS.soft,
    },
    emptyKicker: {
        color: COLORS.red,
        fontSize: 11,
        fontWeight: '900',
        letterSpacing: 1.2,
        textTransform: 'uppercase',
        marginBottom: 8,
    },
    placeholderTitulo: {
        fontSize: 23,
        fontWeight: '900',
        color: COLORS.ink,
        textAlign: 'center',
    },
    placeholderSub: {
        fontSize: 14,
        color: COLORS.muted,
        textAlign: 'center',
        marginTop: 9,
        lineHeight: 21,
        maxWidth: 310,
    },
    emptyDivider: {
        width: 52,
        height: 2,
        borderRadius: 2,
        backgroundColor: COLORS.gold,
        marginVertical: 18,
    },
    emptyHint: {
        color: COLORS.mutedLight,
        fontSize: 12,
        fontWeight: '700',
        textAlign: 'center',
    },

    // Profile form
    formContainer: {
        flex: 1,
        backgroundColor: COLORS.bg,
    },
    formConteudo: {
        padding: 16,
        paddingBottom: 30,
    },
    formCabecalho: {
        marginBottom: 16,
        paddingHorizontal: 2,
    },
    formKicker: {
        color: COLORS.red,
        fontSize: 11,
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: 1.1,
        marginBottom: 5,
    },
    formTitulo: {
        fontSize: 27,
        fontWeight: '900',
        color: COLORS.ink,
    },
    formSub: {
        fontSize: 13,
        color: COLORS.muted,
        marginTop: 5,
        lineHeight: 19,
    },
    formSection: {
        backgroundColor: COLORS.surface,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: COLORS.line,
        padding: 14,
        marginBottom: 14,
        ...SHADOWS.soft,
    },
    formSectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingBottom: 10,
        marginBottom: 6,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.line,
    },
    secao: {
        fontSize: 12,
        fontWeight: '900',
        color: COLORS.ink,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    label: {
        fontSize: 13,
        color: COLORS.ink,
        fontWeight: '800',
        marginBottom: 6,
        marginTop: 8,
    },
    input: {
        backgroundColor: '#FFFBF6',
        borderWidth: 1,
        borderColor: COLORS.line,
        borderRadius: 12,
        paddingHorizontal: 13,
        paddingVertical: 11,
        fontSize: 14,
        color: COLORS.ink,
        marginBottom: 4,
    },
    inputFocus: {
        borderColor: COLORS.gold,
        backgroundColor: COLORS.surface,
    },
    formRow: {
        flexDirection: 'row',
        gap: 12,
    },
    numeroCol: {
        flex: 0.38,
    },
    complementoCol: {
        flex: 0.62,
    },
    formNota: {
        fontSize: 11,
        color: COLORS.mutedLight,
        marginTop: 4,
        textAlign: 'center',
        fontStyle: 'italic',
        fontWeight: '700',
    },
});
