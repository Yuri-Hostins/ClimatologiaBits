// src/quiz/quizData.js
// Você pode expandir livremente. Campos suportados:
// id, type: 'mc' | 'tf', prompt, options (para 'mc'), answer (index para 'mc', boolean para 'tf'),
// explanation (mostrada após responder), tags, image (opcional)
export const QUIZ_BANK = [
  {
    id: "subtrop_01",
    type: "mc",
    tags: ["Climas", "Subtropical"],
    prompt:
      "No clima subtropical do Sul do Brasil, a distribuição das chuvas ao longo do ano tende a ser:",
    options: [
      "Concentrada no verão",
      "Concentrada no inverno",
      "Bem distribuída ao longo do ano",
      "Quase inexistente",
    ],
    answer: 2,
    explanation:
      "O clima subtropical apresenta chuvas relativamente bem distribuídas ao longo do ano, com variabilidade conforme relevo e massas de ar.",
  },
  {
    id: "subtrop_02",
    type: "tf",
    tags: ["Climas", "Subtropical"],
    prompt:
      "No clima subtropical, verões são geralmente quentes a amenos e os invernos podem registrar frio com geada.",
    answer: true,
    explanation:
      "As latitudes médias e a influência de massas polares favorecem geadas no inverno e verões quentes/amenos.",
  },
  {
    id: "equatorial_01",
    type: "mc",
    tags: ["Climas", "Equatorial"],
    prompt:
      "O clima equatorial caracteriza-se principalmente por:",
    options: [
      "Altas amplitudes térmicas anuais e baixa umidade",
      "Altas temperaturas e elevada umidade com chuvas abundantes",
      "Invernos longos e secos",
      "Temperaturas médias abaixo de 10°C",
    ],
    answer: 1,
    explanation:
      "No clima equatorial, as temperaturas médias são altas, a umidade é elevada e as chuvas são abundantes.",
  },
  {
    id: "mediterraneo_01",
    type: "tf",
    tags: ["Climas", "Mediterrâneo"],
    prompt:
      "No clima mediterrâneo chove mais no inverno do que no verão.",
    answer: true,
    explanation:
      "O padrão clássico do mediterrâneo é verão seco e inverno chuvoso.",
  },
  {
    id: "polar_01",
    type: "mc",
    tags: ["Climas", "Polar e Subpolar"],
    prompt:
      "Assinale a alternativa correta sobre o clima polar:",
    options: [
      "Médias térmicas elevadas, com verões quentes",
      "Baixa insolação anual e temperaturas muito baixas",
      "Chuvas convectivas intensas o ano inteiro",
      "Alta biodiversidade arbórea",
    ],
    answer: 1,
    explanation:
      "Em altas latitudes, a insolação é reduzida e as temperaturas permanecem muito baixas.",
  },
];
