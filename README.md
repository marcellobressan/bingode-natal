# 🎄 Bingo de Natal - Jogo Interativo em Família 🎅

Um jogo de bingo temático de Natal, totalmente offline, para diversão em família durante as festas!

## ✨ Características

- **100% Offline**: Funciona sem conexão com a internet após abrir no navegador
- **Papai Noel Animado**: Personagem animado que conduz o sorteio dos números
- **Interface Festiva**: Design natalino com cores vibrantes (vermelho, verde, dourado)
- **Efeitos Visuais**: Neve caindo, animações suaves e transições elegantes
- **Sons Interativos**: Efeitos sonoros para sorteios e vitórias
- **Múltiplas Cartelas**: Suporte para vários jogadores simultaneamente (até 12 sem scroll!)
- **Nomes Personalizados**: Cada jogador pode personalizar o nome da sua cartela
- **Marcação Automática**: Os números sorteados são automaticamente marcados nas cartelas
- **Detecção Automática de Bingo**: Verifica automaticamente linha, coluna e cartela completa
- **Anúncio de Vencedor**: Nome do jogador vencedor exibido em destaque na tela
- **Design Responsivo**: Funciona em telas de todos os tamanhos
- **Otimizado para Widescreen**: Layout especialmente otimizado para displays 16:9
- **Acessibilidade**: Estados de foco visíveis e navegação por teclado
- **Textos em Português**: Interface completamente em português brasileiro

## 🎮 Como Jogar

### Iniciando o Jogo

1. **Abra o arquivo `index.html`** em qualquer navegador moderno (Chrome, Firefox, Safari, Edge)
2. O jogo iniciará automaticamente com 2 cartelas
3. **Personalize os nomes**: Clique no campo de nome de cada cartela e digite o nome do jogador
4. Clique em **"Sortear Número"** para começar!

### Jogando

1. **Personalizar Nomes**: Cada jogador pode editar o campo de nome acima da sua cartela
2. **Sortear Números**: Clique no botão "🎲 Sortear Número" para o Papai Noel sortear um número aleatório
3. **Marcação Automática**: Os números sorteados são automaticamente marcados em todas as cartelas que os possuem
4. **Acompanhar**: Veja todos os números sorteados no painel "📋 Números Sorteados"
5. **Adicionar Jogadores**: Clique em "➕ Adicionar Cartela" para criar novas cartelas
6. **Vencer**: Complete uma linha, coluna ou cartela inteira para ganhar!
7. **Anúncio de Vitória**: Quando um jogador ganhar, seu nome aparecerá em destaque na tela principal!

### Múltiplos Jogadores

- Cada pessoa pode ter sua própria cartela
- Adicione quantas cartelas forem necessárias clicando em "Adicionar Cartela"
- Remova cartelas clicando no botão "❌ Remover" em cada cartela

### Novo Jogo

- Clique em **"🔄 Novo Jogo"** para reiniciar completamente
- Todos os números serão resetados
- As cartelas permanecem, mas as marcações são limpas

## 🏆 Regras de Vitória

O jogo detecta automaticamente três tipos de vitória:

1. **Linha Completa**: Marque todos os 5 números em qualquer linha horizontal
2. **Coluna Completa**: Marque todos os 5 números em qualquer coluna vertical
3. **Cartela Completa**: Marque todos os 25 números da cartela

## 🎯 Características Técnicas

### Funcionalidades Implementadas

- ✅ Sorteio aleatório de números (1-90)
- ✅ Geração automática de cartelas únicas
- ✅ Espaço livre central (marcado com ★)
- ✅ **Personalização de nomes dos jogadores** (novo!)
- ✅ **Marcação automática de números** nas cartelas (novo!)
- ✅ Detecção automática de vitórias
- ✅ **Anúncio personalizado com nome do vencedor** (novo!)
- ✅ Animações CSS suaves
- ✅ Efeitos sonoros com Web Audio API
- ✅ Histórico visual de números sorteados
- ✅ Múltiplas cartelas simultâneas
- ✅ Sistema de marcação interativa (manual + automática)
- ✅ Banner de vitória animado com nome do jogador
- ✅ Neve caindo em background
- ✅ Papai Noel com expressões mutáveis
- ✅ Mensagens motivacionais aleatórias
- ✅ Design responsivo para mobile/tablet/desktop

### Requisitos do Sistema

- **Navegador**: Qualquer navegador moderno atualizado
  - Chrome 60+
  - Firefox 55+
  - Safari 11+
  - Edge 79+
- **JavaScript**: Deve estar habilitado
- **Conexão**: Não necessária após carregar a página

## 📱 Compatibilidade

### Desktop
- ✅ Experiência completa em telas grandes
- ✅ Ideal para projeção em TV ou monitor grande

### Tablet
- ✅ Layout adaptado para telas médias
- ✅ Ótimo para uso individual ou em dupla

### Mobile
- ✅ Design responsivo para smartphones
- ✅ Grid de números adaptado para telas pequenas

## 🎨 Personalização

O jogo usa as seguintes cores principais:
- **Vermelho Natalino**: `#c41e3a`
- **Verde Natalino**: `#2d5a3d`
- **Dourado**: `#d4af37`
- **Branco**: `#ffffff`

Para personalizar, edite a seção `<style>` no arquivo `index.html`.

## 🔊 Áudio

O jogo usa a **Web Audio API** para gerar sons proceduralmente:
- **Som de Sorteio**: Bipe curto ao sortear cada número
- **Som de Vitória**: Melodia natalina quando alguém ganha

Os sons são gerados em tempo real e não requerem arquivos de áudio externos.

## 🎄 Dicas para Melhor Experiência

1. **Para Festas em Família**:
   - Projete em uma TV ou tela grande
   - Cada pessoa pode ter seu próprio dispositivo com uma cartela
   - Use o computador principal para controlar o sorteio

2. **Para Grupos Pequenos**:
   - Compartilhe a tela e adicione múltiplas cartelas
   - Cada jogador marca sua própria cartela

3. **Modos de Jogo**:
   - **Rápido**: Primeira linha vence
   - **Médio**: Primeira cartela com 2 linhas
   - **Completo**: Cartela cheia para vencer

## 🆕 Novidades da Versão Atual

### Personalização de Nomes
- Cada cartela agora tem um campo editável para o nome do jogador
- Basta clicar no campo de texto acima da cartela e digitar o nome desejado
- Os nomes padrão são "Jogador 1", "Jogador 2", etc.

### Marcação Automática
- Os números sorteados são automaticamente marcados em todas as cartelas
- Não é mais necessário clicar manualmente nos números
- Economiza tempo e evita que jogadores percam números
- Uma animação destaca cada número quando é marcado automaticamente

### Anúncio Personalizado de Vitória
- Quando um jogador ganha, seu nome personalizado aparece em grande destaque
- O Papai Noel anuncia: "🎉 Parabéns [Nome do Jogador]! BINGO! 🎉"
- O banner de vitória mostra claramente quem ganhou
- Perfeito para celebrar o vencedor em família!

## 🐛 Solução de Problemas

**O jogo não inicia:**
- Verifique se JavaScript está habilitado no navegador
- Tente outro navegador moderno

**Sem som:**
- Verifique se o volume do dispositivo está ligado
- Alguns navegadores bloqueiam áudio automático - interaja com a página primeiro

**Números não marcam:**
- Apenas números já sorteados podem ser marcados
- Clique em "Sortear Número" primeiro

**Layout quebrado:**
- Atualize o navegador para a versão mais recente
- Tente em outro navegador

## 📜 Licença

Este é um projeto de código aberto para diversão em família. Sinta-se livre para modificar e compartilhar!

## 🎅 Créditos

Desenvolvido com ❤️ para trazer a magia do Natal para sua família!

**Feliz Natal e Boas Festas!** 🎄🎁⭐

---

**Versão**: 3.0
**Data**: Dezembro 2025
**Idioma**: Português Brasileiro 🇧🇷

### Changelog

**v3.0** - Otimização para Widescreen 16:9
- 📺 Layout otimizado para displays 16:9 (1920x1080, 2560x1440, etc.)
- 🎨 Seção do Papai Noel reduzida de 400px para 320px, dando mais espaço às cartelas
- 📱 Suporte para até 4 colunas de cartelas em telas muito largas (1600px+)
- 🎯 Espaçamentos e paddings otimizados para melhor aproveitamento do espaço vertical
- ♿ Melhorias de acessibilidade com estados de foco visíveis em todos os botões
- 🎨 Grade de números sorteados adaptativa (10, 15 ou 18 colunas conforme resolução)
- ✨ Hierarquia visual aprimorada com tamanhos de fonte e espaçamentos otimizados
- 🚀 Interface mais limpa e moderna seguindo melhores práticas de UI/UX

**v2.0** - Melhorias de Personalização
- ✨ Adicionado campo para personalizar nomes dos jogadores
- ✨ Implementada marcação automática de números nas cartelas
- ✨ Anúncio personalizado do vencedor com seu nome
- 🎉 Experiência mais fluida e divertida para toda a família

**v1.0** - Lançamento Inicial
- 🎄 Jogo de bingo completo com tema natalino
- 🎅 Papai Noel animado
- 🎁 Sistema completo de sorteio e detecção de vitórias
