/**
 * EXPERIMENT DATA
 * Dataset de usuários diversos e catálogo de conteúdos para teste de inclusividade
 */

// ============================================
// DATASET DE USUÁRIOS DIVERSOS
// ============================================

const USERS = [
    // Grupo 1: Jovens diversos
    {
        id: 1,
        name: "Ana Silva",
        demographics: {
            gender: "feminino",
            age: "jovem",
            ageValue: 22,
            ethnicity: "latina",
            region: "Sul",
            disability: null,
            socioeconomic: "média"
        },
        preferences: {
            genres: ["drama", "romance", "comédia"],
            languages: ["português", "espanhol"],
            accessibility_needs: [],
            cultural_interests: ["música latina", "cultura brasileira"]
        },
        history: [1, 5, 12, 23, 45, 67, 89, 102, 134, 156]
    },
    {
        id: 2,
        name: "João Santos",
        demographics: {
            gender: "masculino",
            age: "jovem",
            ageValue: 25,
            ethnicity: "negro",
            region: "Nordeste",
            disability: null,
            socioeconomic: "baixa"
        },
        preferences: {
            genres: ["ação", "ficção científica", "documentário"],
            languages: ["português"],
            accessibility_needs: [],
            cultural_interests: ["cultura afro-brasileira", "hip-hop"]
        },
        history: [3, 8, 15, 27, 41, 58, 72, 98, 115, 142]
    },
    {
        id: 3,
        name: "Taylor Kim",
        demographics: {
            gender: "não-binário",
            age: "jovem",
            ageValue: 24,
            ethnicity: "asiática",
            region: "Sudeste",
            disability: null,
            socioeconomic: "alta"
        },
        preferences: {
            genres: ["animação", "fantasia", "thriller"],
            languages: ["português", "inglês", "coreano"],
            accessibility_needs: [],
            cultural_interests: ["k-pop", "cultura asiática", "LGBTQIA+"]
        },
        history: [2, 9, 18, 31, 44, 62, 81, 105, 128, 149]
    },

    // Grupo 2: Adultos diversos
    {
        id: 4,
        name: "Maria Oliveira",
        demographics: {
            gender: "feminino",
            age: "adulto",
            ageValue: 38,
            ethnicity: "branca",
            region: "Sul",
            disability: "visual",
            socioeconomic: "média"
        },
        preferences: {
            genres: ["drama", "biografia", "musical"],
            languages: ["português"],
            accessibility_needs: ["audiodescrição", "legendas"],
            cultural_interests: ["música clássica", "teatro"]
        },
        history: [4, 11, 22, 35, 49, 63, 78, 94, 112, 138]
    },
    {
        id: 5,
        name: "Carlos Ferreira",
        demographics: {
            gender: "masculino",
            age: "adulto",
            ageValue: 42,
            ethnicity: "indígena",
            region: "Norte",
            disability: null,
            socioeconomic: "baixa"
        },
        preferences: {
            genres: ["documentário", "aventura", "história"],
            languages: ["português", "tupi"],
            accessibility_needs: [],
            cultural_interests: ["culturas indígenas", "meio ambiente"]
        },
        history: [6, 14, 25, 38, 52, 68, 85, 101, 121, 145]
    },
    {
        id: 6,
        name: "Priya Sharma",
        demographics: {
            gender: "feminino",
            age: "adulto",
            ageValue: 35,
            ethnicity: "indiana",
            region: "Sudeste",
            disability: null,
            socioeconomic: "alta"
        },
        preferences: {
            genres: ["romance", "drama", "musical"],
            languages: ["português", "hindi", "inglês"],
            accessibility_needs: [],
            cultural_interests: ["bollywood", "yoga", "culinária"]
        },
        history: [7, 16, 28, 40, 55, 71, 88, 107, 126, 151]
    },

    // Grupo 3: Idosos diversos
    {
        id: 7,
        name: "Helena Costa",
        demographics: {
            gender: "feminino",
            age: "idoso",
            ageValue: 68,
            ethnicity: "branca",
            region: "Sudeste",
            disability: "auditiva",
            socioeconomic: "média"
        },
        preferences: {
            genres: ["clássico", "romance", "drama"],
            languages: ["português"],
            accessibility_needs: ["legendas", "volume alto"],
            cultural_interests: ["cinema clássico", "novelas"]
        },
        history: [10, 19, 32, 46, 59, 75, 91, 109, 130, 153]
    },
    {
        id: 8,
        name: "Roberto Lima",
        demographics: {
            gender: "masculino",
            age: "idoso",
            ageValue: 72,
            ethnicity: "negro",
            region: "Nordeste",
            disability: "mobilidade",
            socioeconomic: "baixa"
        },
        preferences: {
            genres: ["documentário", "história", "biografia"],
            languages: ["português"],
            accessibility_needs: ["interface simplificada"],
            cultural_interests: ["história do Brasil", "samba"]
        },
        history: [13, 21, 34, 48, 61, 77, 93, 111, 133, 155]
    },

    // Grupo 4: Pessoas com deficiências diversas
    {
        id: 9,
        name: "Lucas Mendes",
        demographics: {
            gender: "masculino",
            age: "jovem",
            ageValue: 28,
            ethnicity: "branco",
            region: "Sul",
            disability: "cadeirante",
            socioeconomic: "média"
        },
        preferences: {
            genres: ["ação", "comédia", "ficção científica"],
            languages: ["português", "inglês"],
            accessibility_needs: ["interface acessível"],
            cultural_interests: ["esportes adaptados", "tecnologia"]
        },
        history: [17, 26, 37, 50, 64, 79, 96, 114, 135, 157]
    },
    {
        id: 10,
        name: "Beatriz Rodrigues",
        demographics: {
            gender: "feminino",
            age: "adulto",
            ageValue: 31,
            ethnicity: "parda",
            region: "Centro-Oeste",
            disability: "autismo",
            socioeconomic: "média"
        },
        preferences: {
            genres: ["animação", "documentário", "fantasia"],
            languages: ["português"],
            accessibility_needs: ["conteúdo previsível", "baixa estimulação sensorial"],
            cultural_interests: ["natureza", "animais", "ciência"]
        },
        history: [20, 29, 39, 53, 66, 82, 99, 116, 137, 158]
    }
];

// Gerar mais 40 usuários programaticamente para aumentar a diversidade
function generateAdditionalUsers() {
    const genders = ["masculino", "feminino", "não-binário"];
    const ages = ["jovem", "adulto", "idoso"];
    const ethnicities = ["branca", "negra", "parda", "asiática", "indígena", "latina"];
    const regions = ["Norte", "Nordeste", "Centro-Oeste", "Sudeste", "Sul"];
    const disabilities = [null, null, null, "visual", "auditiva", "mobilidade", "cognitiva"];
    const socioeconomics = ["baixa", "média", "alta"];

    const firstNames = ["Pedro", "Julia", "Rafael", "Camila", "Gabriel", "Fernanda", "Diego",
                        "Amanda", "Felipe", "Patricia", "Ricardo", "Laura", "Thiago", "Marina",
                        "André", "Carolina", "Bruno", "Isabela", "Rodrigo", "Leticia"];
    const lastNames = ["Silva", "Santos", "Oliveira", "Costa", "Souza", "Lima", "Ferreira",
                       "Alves", "Pereira", "Gomes", "Martins", "Ribeiro", "Carvalho", "Rocha"];

    const genreOptions = [
        ["ação", "aventura", "thriller"],
        ["drama", "romance", "biografia"],
        ["comédia", "animação", "musical"],
        ["ficção científica", "fantasia", "terror"],
        ["documentário", "história", "educacional"],
        ["suspense", "mistério", "policial"],
        ["família", "infantil", "aventura"]
    ];

    for (let i = 11; i <= 50; i++) {
        const gender = genders[Math.floor(Math.random() * genders.length)];
        const age = ages[Math.floor(Math.random() * ages.length)];
        const ageValue = age === "jovem" ? 18 + Math.floor(Math.random() * 12) :
                        age === "adulto" ? 30 + Math.floor(Math.random() * 25) :
                        60 + Math.floor(Math.random() * 20);
        const disability = disabilities[Math.floor(Math.random() * disabilities.length)];

        const accessibilityNeeds = [];
        if (disability === "visual") accessibilityNeeds.push("audiodescrição", "legendas");
        if (disability === "auditiva") accessibilityNeeds.push("legendas", "libras");
        if (disability === "cognitiva") accessibilityNeeds.push("interface simplificada");

        const name = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${
                        lastNames[Math.floor(Math.random() * lastNames.length)]}`;

        const genres = genreOptions[Math.floor(Math.random() * genreOptions.length)];

        // Gerar histórico aleatório de 10 itens
        const history = [];
        while (history.length < 10) {
            const item = 1 + Math.floor(Math.random() * 200);
            if (!history.includes(item)) history.push(item);
        }

        USERS.push({
            id: i,
            name: name,
            demographics: {
                gender: gender,
                age: age,
                ageValue: ageValue,
                ethnicity: ethnicities[Math.floor(Math.random() * ethnicities.length)],
                region: regions[Math.floor(Math.random() * regions.length)],
                disability: disability,
                socioeconomic: socioeconomics[Math.floor(Math.random() * socioeconomics.length)]
            },
            preferences: {
                genres: genres,
                languages: ["português"],
                accessibility_needs: accessibilityNeeds,
                cultural_interests: []
            },
            history: history
        });
    }
}

generateAdditionalUsers();

// ============================================
// DATASET DE CONTEÚDOS (FILMES)
// ============================================

const ITEMS = [
    // Filmes com alta representatividade
    {
        id: 1,
        title: "Pantera Negra",
        type: "filme",
        genres: ["ação", "ficção científica", "aventura"],
        metadata: {
            year: 2018,
            director: "Ryan Coogler",
            cast_diversity: ["afro-americano", "africano"],
            cultural_representation: ["cultura africana"],
            popularity: 95,
            accessibility: {
                subtitles: true,
                audio_description: true,
                sign_language: false
            },
            themes: ["empoderamento", "identidade cultural", "tecnologia"]
        }
    },
    {
        id: 2,
        title: "Viva - A Vida é uma Festa",
        type: "filme",
        genres: ["animação", "família", "musical"],
        metadata: {
            year: 2017,
            director: "Lee Unkrich",
            cast_diversity: ["latino", "mexicano"],
            cultural_representation: ["cultura mexicana", "Dia dos Mortos"],
            popularity: 92,
            accessibility: {
                subtitles: true,
                audio_description: true,
                sign_language: false
            },
            themes: ["família", "tradição", "memória"]
        }
    },
    {
        id: 3,
        title: "Moonlight",
        type: "filme",
        genres: ["drama", "romance"],
        metadata: {
            year: 2016,
            director: "Barry Jenkins",
            cast_diversity: ["afro-americano"],
            cultural_representation: ["comunidade negra", "LGBTQIA+"],
            popularity: 78,
            accessibility: {
                subtitles: true,
                audio_description: true,
                sign_language: false
            },
            themes: ["identidade", "masculinidade", "amor"]
        }
    },
    {
        id: 4,
        title: "CODA - No Ritmo do Coração",
        type: "filme",
        genres: ["drama", "musical", "família"],
        metadata: {
            year: 2021,
            director: "Sian Heder",
            cast_diversity: ["pessoas surdas"],
            cultural_representation: ["comunidade surda"],
            popularity: 88,
            accessibility: {
                subtitles: true,
                audio_description: true,
                sign_language: true
            },
            themes: ["família", "música", "deficiência"]
        }
    },
    {
        id: 5,
        title: "Parasita",
        type: "filme",
        genres: ["thriller", "drama", "comédia"],
        metadata: {
            year: 2019,
            director: "Bong Joon-ho",
            cast_diversity: ["asiático", "coreano"],
            cultural_representation: ["cultura coreana"],
            popularity: 91,
            accessibility: {
                subtitles: true,
                audio_description: false,
                sign_language: false
            },
            themes: ["desigualdade social", "classe social"]
        }
    },
    {
        id: 6,
        title: "Terra Vermelha",
        type: "filme",
        genres: ["drama", "documentário"],
        metadata: {
            year: 2008,
            director: "Marco Bechis",
            cast_diversity: ["indígena"],
            cultural_representation: ["povos indígenas brasileiros", "Guarani-Kaiowá"],
            popularity: 45,
            accessibility: {
                subtitles: true,
                audio_description: false,
                sign_language: false
            },
            themes: ["direitos indígenas", "terra", "resistência"]
        }
    },
    {
        id: 7,
        title: "Bajrangi Bhaijaan",
        type: "filme",
        genres: ["drama", "aventura", "família"],
        metadata: {
            year: 2015,
            director: "Kabir Khan",
            cast_diversity: ["indiano"],
            cultural_representation: ["cultura indiana", "cultura muçulmana"],
            popularity: 82,
            accessibility: {
                subtitles: true,
                audio_description: false,
                sign_language: false
            },
            themes: ["humanidade", "fronteiras", "compaixão"]
        }
    },
    {
        id: 8,
        title: "Estrelas Além do Tempo",
        type: "filme",
        genres: ["biografia", "drama", "história"],
        metadata: {
            year: 2016,
            director: "Theodore Melfi",
            cast_diversity: ["afro-americano", "mulheres"],
            cultural_representation: ["mulheres negras na ciência"],
            popularity: 89,
            accessibility: {
                subtitles: true,
                audio_description: true,
                sign_language: false
            },
            themes: ["empoderamento feminino", "ciência", "direitos civis"]
        }
    },
    {
        id: 9,
        title: "Tudo em Todo Lugar ao Mesmo Tempo",
        type: "filme",
        genres: ["ficção científica", "comédia", "ação"],
        metadata: {
            year: 2022,
            director: "Daniel Kwan, Daniel Scheinert",
            cast_diversity: ["asiático-americano", "LGBTQIA+"],
            cultural_representation: ["imigração asiática", "família multigeracional"],
            popularity: 94,
            accessibility: {
                subtitles: true,
                audio_description: true,
                sign_language: false
            },
            themes: ["família", "identidade", "multiverso"]
        }
    },
    {
        id: 10,
        title: "Que Horas Ela Volta?",
        type: "filme",
        genres: ["drama", "comédia"],
        metadata: {
            year: 2015,
            director: "Anna Muylaert",
            cast_diversity: ["brasileiros", "classe trabalhadora"],
            cultural_representation: ["desigualdade social brasileira"],
            popularity: 76,
            accessibility: {
                subtitles: true,
                audio_description: false,
                sign_language: false
            },
            themes: ["classe social", "trabalho doméstico", "educação"]
        }
    }
];

// Gerar mais 190 filmes programaticamente
function generateAdditionalItems() {
    const titles = [
        "A Jornada dos Sonhos", "Horizontes Distantes", "Ecos do Passado", "Vozes Silenciosas",
        "Caminho das Estrelas", "Sombras da Noite", "Laços Eternos", "Memórias Perdidas",
        "Destino Incerto", "Corações Unidos", "Reflexos da Alma", "Tempestade Interior",
        "Luz da Esperança", "Segredos Revelados", "Fronteiras Invisíveis", "Sonhos Desfeitos",
        "Caminhos Cruzados", "Tempo Perdido", "Momentos Eternos", "Vidas Entrelaçadas"
    ];

    const directors = ["Maria Silva", "João Costa", "Ana Santos", "Pedro Lima", "Julia Mendes"];
    const diversityGroups = [
        ["latino"], ["asiático"], ["africano"], ["indígena"], ["LGBTQIA+"],
        ["mulheres"], ["idosos"], ["pessoas com deficiência"], ["comunidade negra"]
    ];

    const allGenres = [
        ["drama", "romance"],
        ["ação", "aventura"],
        ["comédia", "família"],
        ["thriller", "suspense"],
        ["ficção científica", "fantasia"],
        ["documentário", "biografia"],
        ["terror", "mistério"],
        ["musical", "animação"]
    ];

    for (let i = 11; i <= 200; i++) {
        const titleBase = titles[Math.floor(Math.random() * titles.length)];
        const popularity = 30 + Math.floor(Math.random() * 70);
        const year = 2010 + Math.floor(Math.random() * 14);
        const genres = allGenres[Math.floor(Math.random() * allGenres.length)];
        const diversity = diversityGroups[Math.floor(Math.random() * diversityGroups.length)];

        ITEMS.push({
            id: i,
            title: `${titleBase} ${i}`,
            type: "filme",
            genres: genres,
            metadata: {
                year: year,
                director: directors[Math.floor(Math.random() * directors.length)],
                cast_diversity: diversity,
                cultural_representation: diversity,
                popularity: popularity,
                accessibility: {
                    subtitles: Math.random() > 0.2,
                    audio_description: Math.random() > 0.5,
                    sign_language: Math.random() > 0.8
                },
                themes: ["narrativa", "personagens", "emoção"]
            }
        });
    }
}

generateAdditionalItems();

// ============================================
// FUNÇÕES AUXILIARES
// ============================================

function getUserById(id) {
    return USERS.find(u => u.id === id);
}

function getItemById(id) {
    return ITEMS.find(i => i.id === id);
}

function getItemsByGenre(genre) {
    return ITEMS.filter(item => item.genres.includes(genre));
}

function getItemsByAccessibility(needs) {
    return ITEMS.filter(item => {
        if (needs.includes("audiodescrição") && !item.metadata.accessibility.audio_description) {
            return false;
        }
        if (needs.includes("legendas") && !item.metadata.accessibility.subtitles) {
            return false;
        }
        if (needs.includes("libras") && !item.metadata.accessibility.sign_language) {
            return false;
        }
        return true;
    });
}

function getUsersByDemographic(key, value) {
    return USERS.filter(user => user.demographics[key] === value);
}

// Exportar para uso global
window.EXPERIMENT_DATA = {
    USERS,
    ITEMS,
    getUserById,
    getItemById,
    getItemsByGenre,
    getItemsByAccessibility,
    getUsersByDemographic
};
