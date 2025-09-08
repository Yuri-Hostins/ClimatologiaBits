const subtropical = [
  {
    id: "caracteristicas",
    titulo: "Características gerais do clima Subtropical",
    paragrafos: [
      "Localização: latitudes médias do hemisfério Sul (como Sul do Brasil), geralmente entre 23º e 35º.",
      "Temperatura: verões quentes a amenos; invernos frios com ocorrência de geadas.",
      "Precipitação: bem distribuída ao longo do ano, com eventos de frio e calor bem marcados.",
      "Umidade: moderada a elevada, variando conforme relevo e massas de ar."
    ],
    imagem: {
      src: `${process.env.PUBLIC_URL}/assets/img/slides/subtropical/mapa-subtropical.png`,
      alt: "Mapa de áreas subtropicais no Brasil",
      legenda: "Distribuição do clima subtropical no Brasil."
    }
  },
  {
    id: "influencias",
    titulo: "Influências no clima",
    paragrafos: [
      "Vegetação: Mata Atlântica, campos e araucárias influenciam o microclima local.",
      "Massa Polar Atlântica e Massa Tropical Atlântica modulam as variações sazonais."
    ]
  },
  {
    id: "impactos",
    titulo: "Impactos ambientais",
    paragrafos: [
      "Biodiversidade rica, porém sensível a desmatamento e fragmentação.",
      "Mudanças climáticas: aumento de eventos extremos (ondas de calor, chuva intensa)."
    ],
    lista: [
      "Risco de enchentes e deslizamentos em áreas urbanizadas.",
      "Perda de hábitats e espécies endêmicas."
    ]
  },
  {
    id: "socioeconomicos",
    titulo: "Aspectos socioeconômicos",
    paragrafos: [
      "Agricultura diversificada (frutíferas de clima temperado, grãos).",
      "Turismo de inverno e natureza em serras; exploração de recursos demanda manejo responsável."
    ]
  },
  {
    id: "curiosidade",
    titulo: "Curiosidade",
    paragrafos: [
      "Em anos com forte atuação de massas polares, há registro de neve em áreas de maior altitude do Sul do Brasil."
    ]
  }
];

export default subtropical;

const img = (file, alt, credit) => ({
  src: `${process.env.PUBLIC_URL}/assets/img/slides/subtropical/${file}`,
  alt,
  credit
});

export const subtropicalSlides = [
  {
    id: "capa",
    title: "Clima Subtropical",
    bullets: [
      "Trabalho de geografia",
      "Por: Cleverson Barbosa Matias; João Gabriel Lopes tenfen; Lucas Roberto Tay e Yuri Hostins Raimundo",
    ],
    img: img("Capa.png", "Paisagem subtropical com campos e araucárias", "Foto ilustrativa / crédito livre"),
    note:
      "Dar boas-vindas, contextualizar o tema e sinalizar a sequência: mapa, dados rápidos, influências, impactos, sociedade, caso do Sul e curiosidade."
  },

  {
    id: "mapa",
    title: "Onde ocorre?",
    bullets: [
      "Distribuição típica em 25°–40° de latitude (variações regionais).",
      "No Brasil, predomina no Sul (PR, SC, RS) e áreas de transição.",
      "Relevo modula o clima: serras x vales = microclimas diferentes."
    ],
    img: img("mapa-subtropical.png", "Mapa esquemático de áreas subtropicais no mundo", "Elaboração própria"),
    note:
      "Apontar no mapa: Sul do Brasil, partes da América do Sul, África do Sul, Austrália, leste da Ásia, etc. Reforçar que limites variam conforme a classificação usada."
  },

  {
    id: "dados-rapidos",
    title: "Características gerais (rápido)",
    bullets: [
      "Temperaturas: verões quentes a amenos; invernos frios a frescos.",
      "Chuvas: em geral bem distribuídas ao longo do ano (máximos sazonais locais).",
      "Umidade: moderada a elevada; massas frias no inverno podem provocar geadas."
    ],
    img: img("CaracteristicasGerais.png", "Termômetro e chuva leve", "Foto ilustrativa / crédito livre"),
    note:
      "Ideia-chave: quatro estações reconhecíveis. Mencionar que a distribuição de chuva pode mudar conforme relevo e circulação atmosférica regional."
  },

  {
    id: "influencias-1",
    title: "Influências no clima",
    bullets: [
      "Vegetação: campos, florestas com araucárias e matas de galerias modulam o microclima.",
      "Circulação atmosférica: atuação de massas Tropicais e Polares ao longo do ano.",
      "Relevo e continentalidade: controlam a amplitude térmica e os contrastes locais."
    ],
    img: img("InfluenciasClima.png", "Araucárias sob céu frio", "Foto ilustrativa / crédito livre"),
    note:
      "Contextualizar a entrada/saída de massas de ar (ex.: MP e MT no Brasil) e como vegetação e relevo interferem em vento, sombreamento e evapotranspiração."
  },

  {
    id: "impactos",
    title: "Impactos ambientais",
    bullets: [
      "Biodiversidade rica, mas sensível a desmatamento e fragmentação.",
      "Mudanças climáticas: extremos mais frequentes (ondas de calor, chuva intensa).",
      "Risco de enchentes e deslizamentos em áreas urbanizadas de relevo acidentado."
    ],
    img: img("impactosAmbientais.png", "Cheia urbana após chuva intensa", "Foto ilustrativa / crédito livre"),
    note:
      "Conectar extremos à gestão urbana (impermeabilização), relevo e drenagem. Falar de prevenção e adaptação."
  },

  {
    id: "socioeconomia",
    title: "Aspectos socioeconômicos",
    bullets: [
      "Populações locais: cultura marcada por estações (festas, vestuário, aquecimento).",
      "Agricultura: frutas de clima temperado, grãos, leite; sazonalidade das safras.",
      "Exploração de recursos naturais e indústria; turismo de inverno e de natureza."
    ],
    img: img("AspectosSocioeconomicos.png", "Pomar/plantação em clima ameno", "Foto ilustrativa / crédito livre"),
    note:
      "Exemplos: maçã, uva, trigo, leite; turismo de serra; paisagens de vale/colônia no Sul do Brasil."
  },

  {
    id: "caso-brasil",
    title: "Caso: Sul do Brasil",
    bullets: [
      "PR–SC–RS: verões quentes, invernos frios; atuação de massas Polares com geadas.",
      "Serras (ex.: catarinense e gaúcha) modulam temperatura e chuva.",
      "Microclimas urbanos: ilhas de calor e eventos de chuva intensa localizados."
    ],
    img: img("CasoSul.png", "Serras do Sul do Brasil", "Foto ilustrativa / crédito livre"),
    note:
      "Foco em ‘como o relevo’ e a entrada de ar frio explicam as geadas e o frio de inverno. Conectar com cotidiano (vestuário, aquecimento, agricultura)."
  },

  {
    id: "curiosidade",
    title: "Curiosidade",
    bullets: [
      "Em anos com forte atuação de massas frias, pode ocorrer <strong>neve</strong> nas áreas mais altas da serra catarinense.",
      "Ex.: municípios serranos registram episódios esporádicos (fenômeno raro, mas marcante).",
      "Mostra a variabilidade do clima subtropical no Sul do Brasil."
    ],
    img: img("curiosidades.png", "Neve ocasional na serra", "Foto ilustrativa / crédito livre"),
    note:
      "Ressaltar que é eventual/ocasional — não regra — e depende de condições atmosféricas específicas."
  },

  {
    id: "fontes",
    title: "Fontes",
    bullets: [
      '<a target="_blank" class="link-slides" href="https://www.infoescola.com/ciencias/climatologia">infoescola.com</a>',
      '<a target="_blank" class="link-slides" href="https://militares.estrategia.com/portal/materias-e-dicas/geografia/climatologia-conceitos-elementos-e-mais">militares.estrategia.com</a>',
      '<a target="_blank" class="link-slides" href="https://brasilescola.uol.com.br/geografia/clima-subtropical.htm">brasilescola.uol.com.br</a>',
      '<a target="_blank" class="link-slides" href="https://www.scielo.br/j/asagr/a/GpSqZkFbjcC5YFW7JcFwYJp/?lang=en">www.scielo.br</a>',
      '<a target="_blank" class="link-slides" href="https://seer.ufu.br/index.php/revistabrasileiracartografia/article/view/44311">seer.ufu.br</a>',
    ],
    img: img("fontes.png", "Caderno/anotações", "Foto ilustrativa / crédito livre"),
    note:
      "A orientação da professora pede fontes no material. Reserve este slide para colocar as referências finais."
  }
];