/**
 * METRICS CALCULATOR
 * Sistema de métricas para avaliar inclusividade em algoritmos de recomendação
 */

// ============================================
// MÉTRICAS DE REPRESENTATIVIDADE
// ============================================

/**
 * Calcula o Coverage Diversity Score
 * Mede quantos grupos diferentes estão representados nas recomendações
 */
function calculateCoverageDiversity(recommendations, users, items) {
    const representedGroups = new Set();
    const genres = new Set();
    const cultures = new Set();

    for (const [userId, recs] of recommendations) {
        for (const rec of recs) {
            const item = rec.item;

            // Adicionar gêneros
            item.genres.forEach(g => genres.add(g));

            // Adicionar representações culturais
            item.metadata.cultural_representation?.forEach(c => cultures.add(c));

            // Adicionar grupos de diversidade
            item.metadata.cast_diversity?.forEach(d => representedGroups.add(d));
        }
    }

    // Score baseado na variedade (normalizado 0-100)
    const genreScore = Math.min(genres.size / 10, 1) * 30;
    const cultureScore = Math.min(cultures.size / 15, 1) * 40;
    const groupScore = Math.min(representedGroups.size / 12, 1) * 30;

    return {
        score: genreScore + cultureScore + groupScore,
        details: {
            uniqueGenres: genres.size,
            uniqueCultures: cultures.size,
            uniqueGroups: representedGroups.size
        }
    };
}

/**
 * Calcula o Coeficiente de Gini
 * Mede a desigualdade na distribuição de recomendações
 * 0 = perfeita igualdade, 1 = desigualdade máxima
 */
function calculateGiniCoefficient(recommendations, items) {
    // Contar quantas vezes cada item foi recomendado
    const itemCounts = new Map();

    for (const item of items) {
        itemCounts.set(item.id, 0);
    }

    for (const [userId, recs] of recommendations) {
        for (const rec of recs) {
            const count = itemCounts.get(rec.itemId) || 0;
            itemCounts.set(rec.itemId, count + 1);
        }
    }

    // Ordenar contagens
    const counts = Array.from(itemCounts.values()).sort((a, b) => a - b);
    const n = counts.length;
    const sum = counts.reduce((a, b) => a + b, 0);

    if (sum === 0) return 1.0;

    let gini = 0;
    for (let i = 0; i < n; i++) {
        gini += (2 * (i + 1) - n - 1) * counts[i];
    }

    return {
        coefficient: gini / (n * sum),
        interpretation: gini / (n * sum) < 0.3 ? "baixa desigualdade" :
                       gini / (n * sum) < 0.6 ? "desigualdade moderada" :
                       "alta desigualdade"
    };
}

/**
 * Calcula a diversidade intra-lista
 * Mede quão diversas são as recomendações para cada usuário
 */
function calculateIntraListDiversity(recommendations) {
    const diversityScores = [];

    for (const [userId, recs] of recommendations) {
        const genres = new Set();
        const cultures = new Set();

        for (const rec of recs) {
            rec.item.genres.forEach(g => genres.add(g));
            rec.item.metadata.cultural_representation?.forEach(c => cultures.add(c));
        }

        // Score de diversidade para este usuário
        const score = (genres.size / recs.length) * 0.6 + (cultures.size / recs.length) * 0.4;
        diversityScores.push(score);
    }

    return {
        average: diversityScores.reduce((a, b) => a + b, 0) / diversityScores.length,
        min: Math.min(...diversityScores),
        max: Math.max(...diversityScores)
    };
}

// ============================================
// MÉTRICAS DE EQUIDADE
// ============================================

/**
 * Calcula Demographic Parity
 * Avalia se diferentes grupos demográficos recebem recomendações relevantes na mesma taxa
 */
function calculateDemographicParity(recommendations, users, items) {
    const groupStats = new Map();

    // Inicializar estatísticas por grupo
    const demographics = ['gender', 'age', 'ethnicity'];

    for (const demo of demographics) {
        groupStats.set(demo, new Map());
    }

    // Coletar estatísticas
    for (const [userId, recs] of recommendations) {
        const user = users.find(u => u.id === userId);
        if (!user) continue;

        const avgRelevance = recs.reduce((sum, rec) => sum + rec.score, 0) / recs.length;
        const avgPopularity = recs.reduce((sum, rec) => sum + rec.item.metadata.popularity, 0) / recs.length;

        for (const demo of demographics) {
            const value = user.demographics[demo];
            if (!groupStats.get(demo).has(value)) {
                groupStats.get(demo).set(value, {
                    users: 0,
                    totalRelevance: 0,
                    totalPopularity: 0,
                    recommendations: 0
                });
            }

            const stats = groupStats.get(demo).get(value);
            stats.users++;
            stats.totalRelevance += avgRelevance;
            stats.totalPopularity += avgPopularity;
            stats.recommendations += recs.length;
        }
    }

    // Calcular médias e disparidades
    const parityResults = {};

    for (const demo of demographics) {
        const groups = groupStats.get(demo);
        const avgRelevances = [];

        const groupData = {};
        for (const [group, stats] of groups) {
            const avgRel = stats.totalRelevance / stats.users;
            avgRelevances.push(avgRel);
            groupData[group] = {
                avgRelevance: avgRel,
                avgPopularity: stats.totalPopularity / stats.users,
                userCount: stats.users
            };
        }

        // Calcular disparidade (desvio padrão / média)
        const mean = avgRelevances.reduce((a, b) => a + b, 0) / avgRelevances.length;
        const variance = avgRelevances.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / avgRelevances.length;
        const stdDev = Math.sqrt(variance);
        const disparity = mean > 0 ? (stdDev / mean) : 0;

        parityResults[demo] = {
            groups: groupData,
            disparity: disparity,
            parityScore: Math.max(0, 1 - disparity) * 100
        };
    }

    return parityResults;
}

/**
 * Calcula Average Relevance Disparity
 * Diferença média de relevância entre grupos
 */
function calculateRelevanceDisparity(recommendations, users) {
    const userRelevances = new Map();

    // Calcular relevância média por usuário
    for (const [userId, recs] of recommendations) {
        const avgRelevance = recs.reduce((sum, rec) => sum + rec.score, 0) / recs.length;
        userRelevances.set(userId, avgRelevance);
    }

    // Calcular por grupo demográfico
    const demographics = ['gender', 'age', 'ethnicity', 'disability', 'socioeconomic'];
    const disparities = {};

    for (const demo of demographics) {
        const groupAvgs = new Map();

        for (const user of users) {
            const value = user.demographics[demo] || 'none';
            const relevance = userRelevances.get(user.id) || 0;

            if (!groupAvgs.has(value)) {
                groupAvgs.set(value, []);
            }
            groupAvgs.get(value).push(relevance);
        }

        // Calcular médias por grupo
        const means = [];
        for (const [group, values] of groupAvgs) {
            const mean = values.reduce((a, b) => a + b, 0) / values.length;
            means.push(mean);
        }

        // Disparidade = diferença entre máximo e mínimo
        const maxMean = Math.max(...means);
        const minMean = Math.min(...means);
        const disparity = maxMean > 0 ? ((maxMean - minMean) / maxMean) * 100 : 0;

        disparities[demo] = {
            maxRelevance: maxMean,
            minRelevance: minMean,
            disparity: disparity
        };
    }

    return disparities;
}

// ============================================
// MÉTRICAS DE ACESSIBILIDADE
// ============================================

/**
 * Calcula Accessibility Coverage
 * Proporção de usuários com necessidades especiais que recebem conteúdo acessível
 */
function calculateAccessibilityCoverage(recommendations, users) {
    let usersWithNeeds = 0;
    let usersCovered = 0;

    for (const user of users) {
        if (user.preferences.accessibility_needs.length === 0) continue;

        usersWithNeeds++;
        const recs = recommendations.get(user.id) || [];

        // Verificar se pelo menos 70% das recomendações atendem às necessidades
        let matchingRecs = 0;

        for (const rec of recs) {
            const item = rec.item;
            let matches = true;

            for (const need of user.preferences.accessibility_needs) {
                if (need.includes("audiodescrição") && !item.metadata.accessibility.audio_description) {
                    matches = false;
                }
                if (need.includes("legendas") && !item.metadata.accessibility.subtitles) {
                    matches = false;
                }
                if (need.includes("libras") && !item.metadata.accessibility.sign_language) {
                    matches = false;
                }
            }

            if (matches) matchingRecs++;
        }

        if (matchingRecs / recs.length >= 0.7) {
            usersCovered++;
        }
    }

    return {
        coverage: usersWithNeeds > 0 ? (usersCovered / usersWithNeeds) * 100 : 100,
        usersWithNeeds: usersWithNeeds,
        usersCovered: usersCovered
    };
}

/**
 * Calcula taxa de correspondência de acessibilidade por tipo de necessidade
 */
function calculateAccessibilityMatchRate(recommendations, users, items) {
    const needTypes = {
        'audiodescrição': { requested: 0, fulfilled: 0 },
        'legendas': { requested: 0, fulfilled: 0 },
        'libras': { requested: 0, fulfilled: 0 }
    };

    for (const user of users) {
        const recs = recommendations.get(user.id) || [];

        for (const need of user.preferences.accessibility_needs) {
            if (needTypes[need]) {
                needTypes[need].requested++;

                // Contar quantas recomendações atendem essa necessidade
                const fulfilling = recs.filter(rec => {
                    const item = rec.item;
                    if (need === 'audiodescrição') return item.metadata.accessibility.audio_description;
                    if (need === 'legendas') return item.metadata.accessibility.subtitles;
                    if (need === 'libras') return item.metadata.accessibility.sign_language;
                    return false;
                }).length;

                if (fulfilling >= recs.length * 0.7) {
                    needTypes[need].fulfilled++;
                }
            }
        }
    }

    const results = {};
    for (const [need, stats] of Object.entries(needTypes)) {
        results[need] = {
            matchRate: stats.requested > 0 ? (stats.fulfilled / stats.requested) * 100 : 0,
            requested: stats.requested,
            fulfilled: stats.fulfilled
        };
    }

    return results;
}

// ============================================
// MÉTRICAS DE VIÉS
// ============================================

/**
 * Calcula Popularity Bias
 * Mede quanto o algoritmo favorece itens populares
 */
function calculatePopularityBias(recommendations, items) {
    // Calcular popularidade média do catálogo
    const avgCatalogPopularity = items.reduce((sum, item) => sum + item.metadata.popularity, 0) / items.length;

    // Calcular popularidade média das recomendações
    let totalPopularity = 0;
    let count = 0;

    for (const [userId, recs] of recommendations) {
        for (const rec of recs) {
            totalPopularity += rec.item.metadata.popularity;
            count++;
        }
    }

    const avgRecPopularity = count > 0 ? totalPopularity / count : 0;

    // Bias = (popularidade recomendada - popularidade catálogo) / popularidade catálogo
    const bias = avgCatalogPopularity > 0 ? ((avgRecPopularity - avgCatalogPopularity) / avgCatalogPopularity) * 100 : 0;

    return {
        bias: bias,
        catalogAvg: avgCatalogPopularity,
        recommendationAvg: avgRecPopularity,
        interpretation: bias > 20 ? "forte viés para popularidade" :
                       bias > 10 ? "viés moderado para popularidade" :
                       bias > -10 ? "viés baixo" :
                       "viés para itens menos populares"
    };
}

/**
 * Analisa vieses demográficos específicos
 */
function analyzeDemographicBiases(recommendations, users, items) {
    const biases = {
        gender: new Map(),
        age: new Map(),
        ethnicity: new Map()
    };

    // Analisar representação por grupo
    for (const [userId, recs] of recommendations) {
        const user = users.find(u => u.id === userId);
        if (!user) continue;

        // Contar representação nas recomendações
        for (const rec of recs) {
            const item = rec.item;

            // Verificar representação de gênero
            if (item.metadata.cast_diversity) {
                for (const diversity of item.metadata.cast_diversity) {
                    // Incrementar contadores
                    for (const [demo, map] of Object.entries(biases)) {
                        const userGroup = user.demographics[demo];
                        if (!map.has(userGroup)) {
                            map.set(userGroup, { self: 0, other: 0, total: 0 });
                        }

                        const stats = map.get(userGroup);
                        stats.total++;

                        // Verifica se a representação corresponde ao grupo do usuário
                        if (diversity.includes(user.demographics.ethnicity) ||
                            (demo === 'gender' && diversity.includes(user.demographics.gender))) {
                            stats.self++;
                        } else {
                            stats.other++;
                        }
                    }
                }
            }
        }
    }

    // Calcular taxas de viés
    const biasResults = {};
    for (const [demo, map] of Object.entries(biases)) {
        biasResults[demo] = {};
        for (const [group, stats] of map) {
            const selfRate = stats.total > 0 ? (stats.self / stats.total) * 100 : 0;
            const otherRate = stats.total > 0 ? (stats.other / stats.total) * 100 : 0;

            biasResults[demo][group] = {
                selfRepresentation: selfRate,
                otherRepresentation: otherRate,
                bias: selfRate - 50, // Desvio de 50% (equilíbrio ideal)
                interpretation: Math.abs(selfRate - 50) < 10 ? "balanceado" :
                               selfRate > 60 ? "viés para auto-representação" :
                               "viés para outras representações"
            };
        }
    }

    return biasResults;
}

// ============================================
// FUNÇÃO PRINCIPAL: CALCULAR TODAS AS MÉTRICAS
// ============================================

/**
 * Calcula todas as métricas de inclusividade
 */
function calculateAllMetrics(recommendations, users, items) {
    console.log('Calculando métricas de inclusividade...');

    return {
        // Representatividade
        representativeness: {
            coverageDiversity: calculateCoverageDiversity(recommendations, users, items),
            giniCoefficient: calculateGiniCoefficient(recommendations, items),
            intraListDiversity: calculateIntraListDiversity(recommendations)
        },

        // Equidade
        equity: {
            demographicParity: calculateDemographicParity(recommendations, users, items),
            relevanceDisparity: calculateRelevanceDisparity(recommendations, users)
        },

        // Acessibilidade
        accessibility: {
            coverage: calculateAccessibilityCoverage(recommendations, users),
            matchRate: calculateAccessibilityMatchRate(recommendations, users, items)
        },

        // Vieses
        bias: {
            popularity: calculatePopularityBias(recommendations, items),
            demographic: analyzeDemographicBiases(recommendations, users, items)
        }
    };
}

/**
 * Compara métricas entre dois algoritmos
 */
function compareMetrics(metricsA, metricsB) {
    return {
        representativeness: {
            coverageDiversity: {
                baseline: metricsA.representativeness.coverageDiversity.score,
                inclusive: metricsB.representativeness.coverageDiversity.score,
                improvement: metricsB.representativeness.coverageDiversity.score - metricsA.representativeness.coverageDiversity.score
            },
            gini: {
                baseline: metricsA.representativeness.giniCoefficient.coefficient,
                inclusive: metricsB.representativeness.giniCoefficient.coefficient,
                improvement: metricsA.representativeness.giniCoefficient.coefficient - metricsB.representativeness.giniCoefficient.coefficient
            }
        },
        accessibility: {
            coverage: {
                baseline: metricsA.accessibility.coverage.coverage,
                inclusive: metricsB.accessibility.coverage.coverage,
                improvement: metricsB.accessibility.coverage.coverage - metricsA.accessibility.coverage.coverage
            }
        },
        bias: {
            popularity: {
                baseline: metricsA.bias.popularity.bias,
                inclusive: metricsB.bias.popularity.bias,
                improvement: Math.abs(metricsA.bias.popularity.bias) - Math.abs(metricsB.bias.popularity.bias)
            }
        }
    };
}

// ============================================
// EXPORTAR FUNÇÕES
// ============================================

window.METRICS_CALCULATOR = {
    calculateAllMetrics,
    compareMetrics,
    calculateCoverageDiversity,
    calculateGiniCoefficient,
    calculateDemographicParity,
    calculateAccessibilityCoverage,
    calculatePopularityBias,
    analyzeDemographicBiases
};
