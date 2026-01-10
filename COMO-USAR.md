# 🚀 Como Usar o Experimento de Inclusividade

## ⚡ Início Rápido (2 minutos)

1. **Abra o experimento no navegador**:
   ```bash
   # Navegue até a pasta do projeto e abra:
   recommendation-experiment.html
   ```

   Ou simplesmente clique duas vezes no arquivo `recommendation-experiment.html`

2. **Execute o experimento**:
   - Clique no botão **"▶️ Executar Experimento"** na aba "Visão Geral"
   - Aguarde 2-3 segundos enquanto processa

3. **Visualize os resultados**:
   - **Aba Métricas**: Veja scores de inclusividade
   - **Aba Resultados**: Compare os dois algoritmos
   - **Aba Análise**: Veja vieses identificados e insights

---

## 📊 O Que Você Vai Ver

### Algoritmo Baseline (Tradicional)
- ❌ Baixa diversidade (~60/100)
- ❌ Alta desigualdade (Gini ~0.65)
- ❌ Pouca acessibilidade (~45%)
- ❌ Forte viés de popularidade (~30%)

### Algoritmo Inclusivo (Proposto)
- ✅ Alta diversidade (~80/100) **+33% melhoria**
- ✅ Maior equidade (Gini ~0.35) **-46% desigualdade**
- ✅ Excelente acessibilidade (~85%) **+89% melhoria**
- ✅ Baixo viés (~12%) **-60% de viés**

---

## 🎛️ Experimente Diferentes Configurações

Na aba **"Algoritmos"**, ajuste os parâmetros:

- **Peso de Diversidade (30%)**: Quanto maior, mais diversos os resultados
- **Penalidade de Repetição (50%)**: Reduz recomendações similares
- **Número de Recomendações (10)**: Quantos itens recomendar

**Dica**: Tente α=50% e β=70% para máxima diversidade!

---

## 💾 Exportar Resultados

Clique em **"💾 Exportar Resultados"** para salvar um arquivo JSON com:
- Todas as métricas calculadas
- Comparação entre algoritmos
- Parâmetros utilizados
- Timestamp da execução

---

## 🔍 Entenda os Dados

### Dataset de Usuários (50 perfis)
- **10 grupos de idade**: jovens, adultos, idosos
- **6 etnias**: branca, negra, parda, asiática, indígena, latina
- **3 gêneros**: masculino, feminino, não-binário
- **5 tipos de deficiência**: visual, auditiva, mobilidade, cognitiva, autismo
- **5 regiões do Brasil**

### Catálogo (200 filmes)
- **10 filmes destacados** com alta representatividade cultural
- **190 filmes diversos** gerados automaticamente
- **Recursos de acessibilidade**: legendas, audiodescrição, libras
- **Metadados**: diversidade de elenco, representação cultural

---

## 📈 Interpretando as Métricas

### Coverage Diversity (0-100)
- **> 70**: 🟢 Alta diversidade
- **50-70**: 🟡 Moderada
- **< 50**: 🔴 Baixa

### Gini Coefficient (0-1)
- **< 0.3**: 🟢 Baixa desigualdade
- **0.3-0.6**: 🟡 Moderada
- **> 0.6**: 🔴 Alta desigualdade

### Accessibility Coverage (%)
- **> 80%**: 🟢 Excelente
- **60-80%**: 🟡 Adequada
- **< 60%**: 🔴 Insuficiente

### Popularity Bias (%)
- **< 10%**: 🟢 Baixo viés
- **10-25%**: 🟡 Moderado
- **> 25%**: 🔴 Significativo

---

## 🧪 Casos de Uso

### 1. Educação
Use para ensinar sobre:
- Vieses em IA
- Design inclusivo
- Ética em sistemas de recomendação

### 2. Pesquisa
Compare diferentes abordagens:
- Ajuste parâmetros e veja o impacto
- Analise trade-offs entre relevância e diversidade

### 3. Demonstração
Mostre que inclusividade é mensurável:
- Apresente resultados tangíveis
- Compare algoritmos objetivamente

---

## ❓ Perguntas Frequentes

**P: O experimento precisa de internet?**
R: Não! Funciona 100% offline.

**P: Posso modificar os dados?**
R: Sim! Edite `experiment-data.js` para adicionar seus próprios usuários e itens.

**P: Como adicionar mais métricas?**
R: Edite `metrics-calculator.js` e adicione suas próprias funções de cálculo.

**P: Os dados são reais?**
R: Não, são sintéticos para fins educacionais. Para pesquisa séria, use dados reais.

---

## 🎯 Próximos Passos

1. ✅ Execute o experimento básico
2. ✅ Ajuste os parâmetros e observe mudanças
3. ✅ Leia a análise de vieses na aba "Análise"
4. ✅ Exporte e compartilhe os resultados
5. ✅ Leia o `EXPERIMENTO-README.md` para detalhes técnicos

---

## 🤝 Compartilhe Seus Resultados

Depois de executar, você pode:
- Tirar prints das abas de resultados
- Exportar o JSON e compartilhar
- Discutir os insights encontrados

---

**Pronto! Agora você tem um experimento completo de inclusividade algorítmica! 🚀**
