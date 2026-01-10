/**
 * RECOMMENDATION ALGORITHMS
 * Implementação de algoritmos de recomendação para comparação de inclusividade
 */

// ============================================
// FUNÇÕES AUXILIARES
// ============================================

/**
 * Calcula similaridade de cosseno entre dois vetores
 */
function cosineSimilarity(vectorA, vectorB) {
    const setA = new Set(vectorA);
    const setB = new Set(vectorB);
    const intersection = new Set([...setA].filter(x => setB.has(x)));

    if (setA.size === 0 || setB.size === 0) return 0;

    return intersection.size / Math.sqrt(setA.size * setB.size);
}

/**
 * Calcula Jaccard similarity
 */
function jaccardSimilarity(setA, setB) {
    const intersection = new Set([...setA].filter(x => setB.has(x)));
    const union = new Set([...setA, ...setB]);

    if (union.size === 0) return 0;
    return intersection.size / union.size;
}

/**
 * Calcula score de relevância baseado em histórico e preferências
 */
function calculateRelevanceScore(user, item) {
    let score = 0;

    // Correspondência de gêneros (peso 40%)
    const genreMatch = user.preferences.genres.filter(g =>
        item.genres.includes(g)
    ).length;
    score += (genreMatch / user.preferences.genres.length) * 40;

    // Popularidade do item (peso 30%)
    score += (item.metadata.popularity / 100) * 30;

    // Correspondência cultural (peso 20%)
    const culturalMatch = user.preferences.cultural_interests.some(interest =>
        item.metadata.cultural_representation?.includes(interest)
    ) ? 20 : 0;
    score += culturalMatch;

    // Novidade (não está no histórico) (peso 10%)
    const isNew = !user.history.includes(item.id);
    score += isNew ? 10 : 0;

    return score;
}

// ============================================
// ALGORITMO BASELINE (TRADICIONAL)
// ============================================

/**
 * Algoritmo de recomendação baseline usando Collaborative Filtering
 * Características:
 * - Prioriza popularidade
 * - Não considera diversidade explicitamente
 * - Pode amplificar vieses existentes
 */
class BaselineRecommender {
    constructor(users, items) {
        this.users = users;
        this.items = items;
        this.userSimilarityCache = new Map();
    }

    /**
     * Encontra usuários similares baseado no histórico
     */
    findSimilarUsers(targetUser, k = 10) {
        const cacheKey = targetUser.id;
        if (this.userSimilarityCache.has(cacheKey)) {
            return this.userSimilarityCache.get(cacheKey);
        }

        const similarities = this.users
            .filter(u => u.id !== targetUser.id)
            .map(user => ({
                user: user,
                similarity: cosineSimilarity(targetUser.history, user.history)
            }))
            .sort((a, b) => b.similarity - a.similarity)
            .slice(0, k);

        this.userSimilarityCache.set(cacheKey, similarities);
        return similarities;
    }

    /**
     * Gera recomendações para um usuário
     */
    recommend(userId, numRecommendations = 10) {
        const user = this.users.find(u => u.id === userId);
        if (!user) return [];

        const similarUsers = this.findSimilarUsers(user);

        // Coletar itens dos usuários similares
        const candidateItems = new Map();

        for (const {user: similarUser, similarity} of similarUsers) {
            for (const itemId of similarUser.history) {
                // Ignorar itens já vistos pelo usuário
                if (user.history.includes(itemId)) continue;

                const item = this.items.find(i => i.id === itemId);
                if (!item) continue;

                const currentScore = candidateItems.get(itemId) || 0;
                // Score baseado em: similaridade do usuário * popularidade do item
                const newScore = currentScore + (similarity * item.metadata.popularity);
                candidateItems.set(itemId, newScore);
            }
        }

        // Adicionar itens populares que o usuário ainda não viu
        for (const item of this.items) {
            if (user.history.includes(item.id)) continue;
            if (candidateItems.has(item.id)) continue;

            // Score apenas pela popularidade
            candidateItems.set(item.id, item.metadata.popularity * 0.5);
        }

        // Ordenar por score e retornar top N
        const recommendations = Array.from(candidateItems.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, numRecommendations)
            .map(([itemId, score]) => ({
                itemId: itemId,
                item: this.items.find(i => i.id === itemId),
                score: score,
                algorithm: 'baseline'
            }));

        return recommendations;
    }

    /**
     * Gera recomendações para todos os usuários
     */
    recommendForAll(numRecommendations = 10) {
        const results = new Map();

        for (const user of this.users) {
            const recommendations = this.recommend(user.id, numRecommendations);
            results.set(user.id, recommendations);
        }

        return results;
    }
}

// ============================================
// ALGORITMO INCLUSIVO (PROPOSTO)
// ============================================

/**
 * Algoritmo de recomendação inclusivo
 * Características:
 * - Balanceia relevância com diversidade
 * - Considera representatividade de grupos
 * - Penaliza recomendações repetitivas
 * - Prioriza conteúdo acessível quando necessário
 */
class InclusiveRecommender {
    constructor(users, items, config = {}) {
        this.users = users;
        this.items = items;
        this.config = {
            diversityWeight: config.diversityWeight || 0.3,
            accessibilityWeight: config.accessibilityWeight || 0.2,
            representationWeight: config.representationWeight || 0.2,
            repetitionPenalty: config.repetitionPenalty || 0.5,
            ...config
        };
        this.userSimilarityCache = new Map();
        this.itemPopularityByGroup = new Map();
    }

    /**
     * Encontra usuários similares considerando demografia
     */
    findSimilarUsers(targetUser, k = 15) {
        const cacheKey = targetUser.id;
        if (this.userSimilarityCache.has(cacheKey)) {
            return this.userSimilarityCache.get(cacheKey);
        }

        const similarities = this.users
            .filter(u => u.id !== targetUser.id)
            .map(user => {
                // Similaridade baseada em histórico
                const historySim = cosineSimilarity(targetUser.history, user.history);

                // Similaridade demográfica (bonus para diversidade)
                let demoBonus = 0;
                if (user.demographics.gender !== targetUser.demographics.gender) demoBonus += 0.1;
                if (user.demographics.age !== targetUser.demographics.age) demoBonus += 0.1;
                if (user.demographics.ethnicity !== targetUser.demographics.ethnicity) demoBonus += 0.1;

                // Similaridade de preferências
                const prefSim = jaccardSimilarity(
                    new Set(targetUser.preferences.genres),
                    new Set(user.preferences.genres)
                );

                return {
                    user: user,
                    similarity: historySim * 0.5 + prefSim * 0.3 + demoBonus * 0.2
                };
            })
            .sort((a, b) => b.similarity - a.similarity)
            .slice(0, k);

        this.userSimilarityCache.set(cacheKey, similarities);
        return similarities;
    }

    /**
     * Calcula score de diversidade para um conjunto de itens
     */
    calculateDiversityScore(items) {
        const genres = new Set();
        const cultures = new Set();
        const diversityGroups = new Set();

        for (const item of items) {
            item.genres.forEach(g => genres.add(g));
            item.metadata.cultural_representation?.forEach(c => cultures.add(c));
            item.metadata.cast_diversity?.forEach(d => diversityGroups.add(d));
        }

        // Score baseado na variedade
        return (genres.size * 0.3 + cultures.size * 0.4 + diversityGroups.size * 0.3) / 10;
    }

    /**
     * Calcula score de acessibilidade
     */
    calculateAccessibilityScore(user, item) {
        const needs = user.preferences.accessibility_needs;
        if (needs.length === 0) return 1.0; // Sem necessidades especiais

        let score = 1.0;

        if (needs.includes("audiodescrição") && item.metadata.accessibility.audio_description) {
            score += 0.5;
        }
        if (needs.includes("legendas") && item.metadata.accessibility.subtitles) {
            score += 0.3;
        }
        if (needs.includes("libras") && item.metadata.accessibility.sign_language) {
            score += 0.5;
        }

        return Math.min(score, 2.0);
    }

    /**
     * Calcula score de representação
     */
    calculateRepresentationScore(user, item) {
        let score = 0;

        // Verifica se o item representa o grupo do usuário
        if (item.metadata.cast_diversity?.includes(user.demographics.ethnicity)) {
            score += 0.4;
        }

        // Verifica representação cultural
        const userCulture = user.demographics.ethnicity;
        if (item.metadata.cultural_representation?.some(c => c.includes(userCulture))) {
            score += 0.3;
        }

        // Bonus para deficiência representada
        if (user.demographics.disability &&
            item.metadata.cast_diversity?.includes("pessoas com deficiência")) {
            score += 0.3;
        }

        return score;
    }

    /**
     * Gera recomendações para um usuário
     */
    recommend(userId, numRecommendations = 10) {
        const user = this.users.find(u => u.id === userId);
        if (!user) return [];

        const similarUsers = this.findSimilarUsers(user);

        // Fase 1: Coletar candidatos
        const candidateScores = new Map();

        for (const {user: similarUser, similarity} of similarUsers) {
            for (const itemId of similarUser.history) {
                if (user.history.includes(itemId)) continue;

                const item = this.items.find(i => i.id === itemId);
                if (!item) continue;

                const currentScore = candidateScores.get(itemId) || 0;
                candidateScores.set(itemId, currentScore + similarity);
            }
        }

        // Fase 2: Calcular scores compostos
        const scoredCandidates = [];

        for (const item of this.items) {
            if (user.history.includes(item.id)) continue;

            // Score base (collaborative + popularidade)
            const collabScore = candidateScores.get(item.id) || 0;
            const popularityScore = item.metadata.popularity / 100;
            const baseScore = collabScore * 0.5 + popularityScore * 0.5;

            // Score de relevância (gêneros + preferências)
            const relevanceScore = calculateRelevanceScore(user, item) / 100;

            // Score de acessibilidade
            const accessibilityScore = this.calculateAccessibilityScore(user, item);

            // Score de representação
            const representationScore = this.calculateRepresentationScore(user, item);

            // Score final composto
            const finalScore =
                baseScore * (1 - this.config.diversityWeight) +
                relevanceScore * 0.3 +
                accessibilityScore * this.config.accessibilityWeight +
                representationScore * this.config.representationWeight;

            scoredCandidates.push({
                itemId: item.id,
                item: item,
                score: finalScore,
                baseScore: baseScore,
                relevanceScore: relevanceScore,
                accessibilityScore: accessibilityScore,
                representationScore: representationScore,
                algorithm: 'inclusive'
            });
        }

        // Fase 3: Seleção diversificada (MMR - Maximal Marginal Relevance)
        const selectedItems = [];
        const remainingCandidates = [...scoredCandidates].sort((a, b) => b.score - a.score);

        while (selectedItems.length < numRecommendations && remainingCandidates.length > 0) {
            let bestCandidate = null;
            let bestMMRScore = -Infinity;

            for (let i = 0; i < Math.min(50, remainingCandidates.length); i++) {
                const candidate = remainingCandidates[i];

                // Calcular diversidade em relação aos já selecionados
                let diversityBonus = 1.0;
                if (selectedItems.length > 0) {
                    const selectedGenres = new Set(selectedItems.flatMap(s => s.item.genres));
                    const candidateGenres = new Set(candidate.item.genres);
                    const genreOverlap = [...candidateGenres].filter(g => selectedGenres.has(g)).length;
                    diversityBonus = 1.0 - (genreOverlap / candidateGenres.size) * this.config.repetitionPenalty;
                }

                // MMR score
                const mmrScore = candidate.score * diversityBonus;

                if (mmrScore > bestMMRScore) {
                    bestMMRScore = mmrScore;
                    bestCandidate = {candidate, index: i};
                }
            }

            if (bestCandidate) {
                selectedItems.push(bestCandidate.candidate);
                remainingCandidates.splice(bestCandidate.index, 1);
            } else {
                break;
            }
        }

        return selectedItems;
    }

    /**
     * Gera recomendações para todos os usuários
     */
    recommendForAll(numRecommendations = 10) {
        const results = new Map();

        for (const user of this.users) {
            const recommendations = this.recommend(user.id, numRecommendations);
            results.set(user.id, recommendations);
        }

        return results;
    }
}

// ============================================
// EXPORTAR ALGORITMOS
// ============================================

window.RECOMMENDATION_ALGORITHMS = {
    BaselineRecommender,
    InclusiveRecommender,
    cosineSimilarity,
    jaccardSimilarity,
    calculateRelevanceScore
};
