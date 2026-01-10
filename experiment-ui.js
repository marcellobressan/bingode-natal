/**
 * EXPERIMENT UI
 * Controla a interface do usuário e orquestra a execução do experimento
 */

// ============================================
// ESTADO GLOBAL DO EXPERIMENTO
// ============================================

let experimentState = {
    status: 'ready',
    baselineRecommender: null,
    inclusiveRecommender: null,
    baselineResults: null,
    inclusiveResults: null,
    baselineMetrics: null,
    inclusiveMetrics: null,
    comparison: null
};

// ============================================
// INICIALIZAÇÃO
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Inicializando experimento de inclusividade...');

    // Atualizar contadores iniciais
    updateOverviewStats();

    // Carregar dados nas abas
    loadUsersData();
    loadItemsData();

    // Configurar sliders
    setupParameterSliders();

    console.log('Experimento pronto para execução!');
});

// ============================================
// NAVEGAÇÃO ENTRE ABAS
// ============================================

function switchTab(tabName) {
    // Desativar todas as abas
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => tab.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));

    // Ativar aba selecionada
    const activeTab = Array.from(tabs).find(tab =>
        tab.textContent.toLowerCase().includes(tabName.toLowerCase())
    );
    if (activeTab) {
        activeTab.classList.add('active');
    }

    const activeContent = document.getElementById(`tab-${tabName}`);
    if (activeContent) {
        activeContent.classList.add('active');
    }
}

// ============================================
// ATUALIZAÇÃO DA UI
// ============================================

function updateOverviewStats() {
    const { USERS, ITEMS } = window.EXPERIMENT_DATA;

    document.getElementById('user-count').textContent = USERS.length;
    document.getElementById('item-count').textContent = ITEMS.length;

    updateExperimentStatus('ready');
}

function updateExperimentStatus(status) {
    const statusElement = document.getElementById('experiment-status');
    const statusMap = {
        'ready': { text: 'Pronto para iniciar', class: 'status-ready' },
        'running': { text: 'Executando...', class: 'status-running' },
        'complete': { text: 'Concluído', class: 'status-complete' }
    };

    const statusInfo = statusMap[status] || statusMap['ready'];
    statusElement.textContent = statusInfo.text;
    statusElement.className = `status-badge ${statusInfo.class}`;

    experimentState.status = status;
}

function setupParameterSliders() {
    const diversitySlider = document.getElementById('diversity-weight');
    const repetitionSlider = document.getElementById('repetition-penalty');
    const numRecsSlider = document.getElementById('num-recommendations');

    if (diversitySlider) {
        diversitySlider.addEventListener('input', (e) => {
            document.getElementById('diversity-weight-value').textContent = `${e.target.value}%`;
        });
    }

    if (repetitionSlider) {
        repetitionSlider.addEventListener('input', (e) => {
            document.getElementById('repetition-penalty-value').textContent = `${e.target.value}%`;
        });
    }

    if (numRecsSlider) {
        numRecsSlider.addEventListener('input', (e) => {
            document.getElementById('num-recommendations-value').textContent = e.target.value;
        });
    }
}

// ============================================
// VISUALIZAÇÃO DE DADOS
// ============================================

function loadUsersData() {
    const { USERS } = window.EXPERIMENT_DATA;
    const container = document.getElementById('users-container');

    if (!container) return;

    // Mostrar primeiros 10 usuários
    const usersToShow = USERS.slice(0, 10);

    let html = '<h3>Amostra de Perfis (10 de ' + USERS.length + ')</h3>';

    usersToShow.forEach(user => {
        const avatar = user.name[0].toUpperCase();
        const needsTags = user.preferences.accessibility_needs
            .map(need => `<span class="tag tag-warning">${need}</span>`)
            .join('');

        html += `
            <div class="user-profile">
                <div class="user-profile-header">
                    <div class="user-avatar">${avatar}</div>
                    <div class="user-info">
                        <div class="user-name">${user.name}</div>
                        <div class="user-demographics">
                            ${user.demographics.gender} • ${user.demographics.age} (${user.demographics.ageValue} anos) • ${user.demographics.ethnicity}
                        </div>
                    </div>
                </div>
                <div>
                    <span class="tag">${user.demographics.region}</span>
                    <span class="tag">${user.demographics.socioeconomic}</span>
                    ${user.demographics.disability ? `<span class="tag tag-warning">${user.demographics.disability}</span>` : ''}
                    ${needsTags}
                </div>
                <div style="margin-top: 10px;">
                    <strong>Preferências:</strong> ${user.preferences.genres.join(', ')}
                </div>
            </div>
        `;
    });

    html += `<p style="margin-top: 15px; color: var(--gray-700);">
        <em>+ ${USERS.length - 10} usuários adicionais com perfis diversos...</em>
    </p>`;

    container.innerHTML = html;
}

function loadItemsData() {
    const { ITEMS } = window.EXPERIMENT_DATA;
    const container = document.getElementById('items-container');

    if (!container) return;

    // Mostrar primeiros 10 itens destacados
    const itemsToShow = ITEMS.slice(0, 10);

    let html = '<h3>Itens em Destaque (10 de ' + ITEMS.length + ')</h3>';
    html += '<table><thead><tr><th>Título</th><th>Gênero</th><th>Diversidade</th><th>Acessibilidade</th><th>Popularidade</th></tr></thead><tbody>';

    itemsToShow.forEach(item => {
        const accessibility = [];
        if (item.metadata.accessibility.subtitles) accessibility.push('Legendas');
        if (item.metadata.accessibility.audio_description) accessibility.push('Audiodescrição');
        if (item.metadata.accessibility.sign_language) accessibility.push('Libras');

        const diversityTags = item.metadata.cast_diversity?.slice(0, 2).join(', ') || 'N/A';

        html += `
            <tr>
                <td><strong>${item.title}</strong> (${item.metadata.year})</td>
                <td>${item.genres[0]}</td>
                <td>${diversityTags}</td>
                <td>${accessibility.length > 0 ? accessibility.join(', ') : 'Nenhuma'}</td>
                <td>${item.metadata.popularity}/100</td>
            </tr>
        `;
    });

    html += '</tbody></table>';
    html += `<p style="margin-top: 15px; color: var(--gray-700);">
        <em>+ ${ITEMS.length - 10} itens adicionais no catálogo...</em>
    </p>`;

    container.innerHTML = html;
}

// ============================================
// EXECUÇÃO DO EXPERIMENTO
// ============================================

async function runExperiment() {
    console.log('Iniciando experimento...');
    updateExperimentStatus('running');

    const { USERS, ITEMS } = window.EXPERIMENT_DATA;
    const { BaselineRecommender, InclusiveRecommender } = window.RECOMMENDATION_ALGORITHMS;

    try {
        // Obter parâmetros
        const numRecs = parseInt(document.getElementById('num-recommendations').value);
        const diversityWeight = parseInt(document.getElementById('diversity-weight').value) / 100;
        const repetitionPenalty = parseInt(document.getElementById('repetition-penalty').value) / 100;

        // Fase 1: Algoritmo Baseline
        console.log('Executando algoritmo baseline...');
        experimentState.baselineRecommender = new BaselineRecommender(USERS, ITEMS);
        experimentState.baselineResults = experimentState.baselineRecommender.recommendForAll(numRecs);

        // Aguardar um pouco para simular processamento
        await sleep(500);

        // Fase 2: Algoritmo Inclusivo
        console.log('Executando algoritmo inclusivo...');
        experimentState.inclusiveRecommender = new InclusiveRecommender(USERS, ITEMS, {
            diversityWeight: diversityWeight,
            repetitionPenalty: repetitionPenalty
        });
        experimentState.inclusiveResults = experimentState.inclusiveRecommender.recommendForAll(numRecs);

        await sleep(500);

        // Fase 3: Calcular métricas
        console.log('Calculando métricas...');
        const { calculateAllMetrics, compareMetrics } = window.METRICS_CALCULATOR;

        experimentState.baselineMetrics = calculateAllMetrics(
            experimentState.baselineResults,
            USERS,
            ITEMS
        );

        experimentState.inclusiveMetrics = calculateAllMetrics(
            experimentState.inclusiveResults,
            USERS,
            ITEMS
        );

        experimentState.comparison = compareMetrics(
            experimentState.baselineMetrics,
            experimentState.inclusiveMetrics
        );

        await sleep(500);

        // Fase 4: Atualizar UI
        console.log('Atualizando visualizações...');
        updateMetricsTab();
        updateResultsTab();
        updateAnalysisTab();

        updateExperimentStatus('complete');

        alert('✅ Experimento concluído com sucesso!\n\nVisualize os resultados nas abas Métricas, Resultados e Análise.');

    } catch (error) {
        console.error('Erro ao executar experimento:', error);
        alert('❌ Erro ao executar experimento: ' + error.message);
        updateExperimentStatus('ready');
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ============================================
// ATUALIZAÇÃO DAS ABAS DE RESULTADOS
// ============================================

function updateMetricsTab() {
    const baseline = experimentState.baselineMetrics;
    const inclusive = experimentState.inclusiveMetrics;

    // Atualizar barras de métricas
    updateMetricBar('coverage-diversity', inclusive.representativeness.coverageDiversity.score);
    updateMetricBar('gini-coefficient', inclusive.representativeness.giniCoefficient.coefficient * 100);
    updateMetricBar('accessibility-coverage', inclusive.accessibility.coverage.coverage);

    // Calcular disparidade média
    const disparities = Object.values(inclusive.equity.relevanceDisparity);
    const avgDisparity = disparities.reduce((sum, d) => sum + d.disparity, 0) / disparities.length;
    updateMetricBar('relevance-disparity', avgDisparity);

    // Atualizar tabela de demographic parity
    updateDemographicParityTable(inclusive.equity.demographicParity);
}

function updateMetricBar(elementId, value) {
    const bar = document.getElementById(elementId);
    if (!bar) return;

    const percentage = Math.min(Math.max(value, 0), 100);
    bar.style.width = `${percentage}%`;
    bar.textContent = `${percentage.toFixed(1)}%`;
}

function updateDemographicParityTable(parity) {
    const container = document.getElementById('demographic-parity-table');
    if (!container) return;

    let html = '<table><thead><tr><th>Grupo Demográfico</th><th>Valor</th><th>Score de Paridade</th></tr></thead><tbody>';

    for (const [demo, data] of Object.entries(parity)) {
        for (const [group, stats] of Object.entries(data.groups)) {
            html += `
                <tr>
                    <td>${demo}: ${group}</td>
                    <td>Relevância média: ${stats.avgRelevance.toFixed(2)}</td>
                    <td>${data.parityScore.toFixed(1)}%</td>
                </tr>
            `;
        }
    }

    html += '</tbody></table>';
    container.innerHTML = html;
}

function updateResultsTab() {
    const container = document.getElementById('results-container');
    if (!container) return;

    const baseline = experimentState.baselineMetrics;
    const inclusive = experimentState.inclusiveMetrics;
    const comparison = experimentState.comparison;

    let html = '<div class="comparison-grid">';

    // Coluna Baseline
    html += '<div class="algorithm-section">';
    html += '<h4>🔹 Algoritmo Baseline</h4>';
    html += `<div class="metric-item">
        <div class="metric-label">Coverage Diversity</div>
        <div class="card-value">${baseline.representativeness.coverageDiversity.score.toFixed(1)}</div>
    </div>`;
    html += `<div class="metric-item">
        <div class="metric-label">Gini Coefficient</div>
        <div class="card-value">${baseline.representativeness.giniCoefficient.coefficient.toFixed(3)}</div>
        <p>${baseline.representativeness.giniCoefficient.interpretation}</p>
    </div>`;
    html += `<div class="metric-item">
        <div class="metric-label">Accessibility Coverage</div>
        <div class="card-value">${baseline.accessibility.coverage.coverage.toFixed(1)}%</div>
    </div>`;
    html += `<div class="metric-item">
        <div class="metric-label">Popularity Bias</div>
        <div class="card-value">${baseline.bias.popularity.bias.toFixed(1)}%</div>
        <p>${baseline.bias.popularity.interpretation}</p>
    </div>`;
    html += '</div>';

    // Coluna Inclusivo
    html += '<div class="algorithm-section">';
    html += '<h4>🔹 Algoritmo Inclusivo</h4>';
    html += `<div class="metric-item">
        <div class="metric-label">Coverage Diversity</div>
        <div class="card-value" style="color: var(--success);">${inclusive.representativeness.coverageDiversity.score.toFixed(1)}</div>
        <p>Melhoria: +${comparison.representativeness.coverageDiversity.improvement.toFixed(1)}</p>
    </div>`;
    html += `<div class="metric-item">
        <div class="metric-label">Gini Coefficient</div>
        <div class="card-value" style="color: var(--success);">${inclusive.representativeness.giniCoefficient.coefficient.toFixed(3)}</div>
        <p>${inclusive.representativeness.giniCoefficient.interpretation}</p>
        <p>Melhoria: ${comparison.representativeness.gini.improvement > 0 ? '+' : ''}${comparison.representativeness.gini.improvement.toFixed(3)}</p>
    </div>`;
    html += `<div class="metric-item">
        <div class="metric-label">Accessibility Coverage</div>
        <div class="card-value" style="color: var(--success);">${inclusive.accessibility.coverage.coverage.toFixed(1)}%</div>
        <p>Melhoria: +${comparison.accessibility.coverage.improvement.toFixed(1)}%</p>
    </div>`;
    html += `<div class="metric-item">
        <div class="metric-label">Popularity Bias</div>
        <div class="card-value">${inclusive.bias.popularity.bias.toFixed(1)}%</div>
        <p>${inclusive.bias.popularity.interpretation}</p>
    </div>`;
    html += '</div>';

    html += '</div>';

    // Resumo comparativo
    html += '<div class="section" style="margin-top: 30px;">';
    html += '<h3>📊 Resumo Comparativo</h3>';
    html += '<div class="grid">';
    html += `<div class="card">
        <div class="card-title">Melhoria em Diversidade</div>
        <div class="card-value" style="color: ${comparison.representativeness.coverageDiversity.improvement > 0 ? 'var(--success)' : 'var(--danger)'}">
            ${comparison.representativeness.coverageDiversity.improvement > 0 ? '+' : ''}${comparison.representativeness.coverageDiversity.improvement.toFixed(1)}
        </div>
    </div>`;
    html += `<div class="card">
        <div class="card-title">Melhoria em Equidade (Gini)</div>
        <div class="card-value" style="color: ${comparison.representativeness.gini.improvement > 0 ? 'var(--success)' : 'var(--danger)'}">
            ${comparison.representativeness.gini.improvement > 0 ? '+' : ''}${(comparison.representativeness.gini.improvement * 100).toFixed(1)}%
        </div>
    </div>`;
    html += `<div class="card">
        <div class="card-title">Melhoria em Acessibilidade</div>
        <div class="card-value" style="color: ${comparison.accessibility.coverage.improvement > 0 ? 'var(--success)' : 'var(--danger)'}">
            ${comparison.accessibility.coverage.improvement > 0 ? '+' : ''}${comparison.accessibility.coverage.improvement.toFixed(1)}%
        </div>
    </div>`;
    html += '</div>';
    html += '</div>';

    container.innerHTML = html;
}

function updateAnalysisTab() {
    const container = document.getElementById('analysis-container');
    if (!container) return;

    const baseline = experimentState.baselineMetrics;
    const inclusive = experimentState.inclusiveMetrics;

    let html = '<div class="section">';
    html += '<h3>🔍 Vieses Identificados</h3>';

    // Análise de viés de popularidade
    html += '<div class="metric-item">';
    html += '<div class="metric-label">Viés de Popularidade</div>';
    html += '<div class="comparison-grid">';
    html += `<div>
        <h4>Baseline</h4>
        <p><strong>Bias:</strong> ${baseline.bias.popularity.bias.toFixed(1)}%</p>
        <p>${baseline.bias.popularity.interpretation}</p>
        <p>Média catálogo: ${baseline.bias.popularity.catalogAvg.toFixed(1)}</p>
        <p>Média recomendações: ${baseline.bias.popularity.recommendationAvg.toFixed(1)}</p>
    </div>`;
    html += `<div>
        <h4>Inclusivo</h4>
        <p><strong>Bias:</strong> ${inclusive.bias.popularity.bias.toFixed(1)}%</p>
        <p>${inclusive.bias.popularity.interpretation}</p>
        <p>Média catálogo: ${inclusive.bias.popularity.catalogAvg.toFixed(1)}</p>
        <p>Média recomendações: ${inclusive.bias.popularity.recommendationAvg.toFixed(1)}</p>
    </div>`;
    html += '</div></div>';

    // Análise de vieses demográficos
    html += '<div class="metric-item">';
    html += '<div class="metric-label">Vieses Demográficos</div>';
    html += '<p>Análise de como cada grupo é representado nas recomendações:</p>';

    for (const [demo, groups] of Object.entries(inclusive.bias.demographic)) {
        html += `<h4 style="margin-top: 15px; text-transform: capitalize;">${demo}</h4>`;
        html += '<table><thead><tr><th>Grupo</th><th>Auto-representação</th><th>Interpretação</th></tr></thead><tbody>';

        for (const [group, stats] of Object.entries(groups)) {
            html += `<tr>
                <td>${group}</td>
                <td>${stats.selfRepresentation.toFixed(1)}%</td>
                <td>${stats.interpretation}</td>
            </tr>`;
        }

        html += '</tbody></table>';
    }

    html += '</div>';

    // Insights e recomendações
    html += '</div><div class="section">';
    html += '<h3>💡 Insights e Recomendações</h3>';

    const insights = generateInsights(baseline, inclusive);
    html += '<ul style="line-height: 2;">';
    insights.forEach(insight => {
        html += `<li>${insight}</li>`;
    });
    html += '</ul>';

    html += '</div>';

    container.innerHTML = html;
}

function generateInsights(baseline, inclusive) {
    const insights = [];

    // Insight sobre diversidade
    const diversityImprovement = inclusive.representativeness.coverageDiversity.score - baseline.representativeness.coverageDiversity.score;
    if (diversityImprovement > 10) {
        insights.push(`✅ <strong>Diversidade significativamente melhorada:</strong> O algoritmo inclusivo aumentou a diversidade de cobertura em ${diversityImprovement.toFixed(1)} pontos, representando mais grupos diversos nas recomendações.`);
    } else if (diversityImprovement > 0) {
        insights.push(`📊 <strong>Melhoria moderada em diversidade:</strong> Aumento de ${diversityImprovement.toFixed(1)} pontos na diversidade de cobertura.`);
    }

    // Insight sobre equidade (Gini)
    const giniImprovement = baseline.representativeness.giniCoefficient.coefficient - inclusive.representativeness.giniCoefficient.coefficient;
    if (giniImprovement > 0.1) {
        insights.push(`✅ <strong>Maior equidade na distribuição:</strong> O coeficiente de Gini foi reduzido em ${(giniImprovement * 100).toFixed(1)}%, indicando uma distribuição mais justa de recomendações entre itens.`);
    }

    // Insight sobre acessibilidade
    const accessibilityImprovement = inclusive.accessibility.coverage.coverage - baseline.accessibility.coverage.coverage;
    if (accessibilityImprovement > 15) {
        insights.push(`✅ <strong>Acessibilidade significativamente melhorada:</strong> ${accessibilityImprovement.toFixed(1)}% mais usuários com necessidades especiais recebem conteúdo adequadamente acessível.`);
    } else if (accessibilityImprovement > 0) {
        insights.push(`📊 <strong>Melhoria em acessibilidade:</strong> Aumento de ${accessibilityImprovement.toFixed(1)}% na cobertura de necessidades de acessibilidade.`);
    }

    // Insight sobre viés de popularidade
    if (Math.abs(baseline.bias.popularity.bias) > 20 && Math.abs(inclusive.bias.popularity.bias) < 15) {
        insights.push(`✅ <strong>Redução de viés de popularidade:</strong> O algoritmo inclusivo reduz significativamente a tendência de recomendar apenas itens populares.`);
    } else if (Math.abs(baseline.bias.popularity.bias) > 20) {
        insights.push(`⚠️ <strong>Viés de popularidade detectado:</strong> Ambos os algoritmos ainda tendem a favorecer itens populares. Considere ajustes adicionais.`);
    }

    // Insight sobre disparidade de relevância
    const baselineDisparities = Object.values(baseline.equity.relevanceDisparity);
    const inclusiveDisparities = Object.values(inclusive.equity.relevanceDisparity);

    const baselineAvgDisparity = baselineDisparities.reduce((sum, d) => sum + d.disparity, 0) / baselineDisparities.length;
    const inclusiveAvgDisparity = inclusiveDisparities.reduce((sum, d) => sum + d.disparity, 0) / inclusiveDisparities.length;

    if (baselineAvgDisparity - inclusiveAvgDisparity > 5) {
        insights.push(`✅ <strong>Maior equidade entre grupos demográficos:</strong> A disparidade média de relevância foi reduzida em ${(baselineAvgDisparity - inclusiveAvgDisparity).toFixed(1)}%.`);
    }

    // Recomendações gerais
    if (inclusive.accessibility.coverage.coverage < 80) {
        insights.push(`💡 <strong>Recomendação:</strong> Ainda há espaço para melhorar a cobertura de acessibilidade. Considere aumentar o peso de acessibilidade no algoritmo.`);
    }

    if (inclusive.representativeness.coverageDiversity.score < 70) {
        insights.push(`💡 <strong>Recomendação:</strong> A diversidade de cobertura pode ser melhorada. Ajuste o parâmetro de peso de diversidade (α) para valores mais altos.`);
    }

    insights.push(`📈 <strong>Conclusão:</strong> Este experimento demonstra que é possível criar algoritmos de recomendação mais inclusivos sem sacrificar significativamente a relevância, através de ajustes conscientes que promovem diversidade, equidade e acessibilidade.`);

    return insights;
}

// ============================================
// FUNÇÕES DE EXPORTAÇÃO
// ============================================

function resetExperiment() {
    if (!confirm('Tem certeza que deseja resetar o experimento? Todos os resultados serão perdidos.')) {
        return;
    }

    experimentState = {
        status: 'ready',
        baselineRecommender: null,
        inclusiveRecommender: null,
        baselineResults: null,
        inclusiveResults: null,
        baselineMetrics: null,
        inclusiveMetrics: null,
        comparison: null
    };

    updateExperimentStatus('ready');

    // Limpar visualizações
    document.getElementById('results-container').innerHTML = '<p class="loading">Execute o experimento para ver os resultados</p>';
    document.getElementById('analysis-container').innerHTML = '<p class="loading">Execute o experimento para ver a análise</p>';

    // Resetar métricas
    updateMetricBar('coverage-diversity', 0);
    updateMetricBar('gini-coefficient', 0);
    updateMetricBar('accessibility-coverage', 0);
    updateMetricBar('relevance-disparity', 0);

    alert('✅ Experimento resetado com sucesso!');
}

function exportResults() {
    if (experimentState.status !== 'complete') {
        alert('⚠️ Execute o experimento primeiro antes de exportar os resultados.');
        return;
    }

    const exportData = {
        timestamp: new Date().toISOString(),
        parameters: {
            numRecommendations: parseInt(document.getElementById('num-recommendations').value),
            diversityWeight: parseInt(document.getElementById('diversity-weight').value) / 100,
            repetitionPenalty: parseInt(document.getElementById('repetition-penalty').value) / 100
        },
        baselineMetrics: experimentState.baselineMetrics,
        inclusiveMetrics: experimentState.inclusiveMetrics,
        comparison: experimentState.comparison
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });

    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `experimento-inclusividade-${Date.now()}.json`;
    link.click();

    URL.revokeObjectURL(url);

    alert('✅ Resultados exportados com sucesso!');
}

// ============================================
// EXPOR FUNÇÕES GLOBAIS
// ============================================

window.switchTab = switchTab;
window.runExperiment = runExperiment;
window.resetExperiment = resetExperiment;
window.exportResults = exportResults;
