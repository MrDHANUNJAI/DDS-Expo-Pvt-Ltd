/**
 * Local Intelligent Keyword & Intent Matcher for DDS Expo Chatbot
 * 
 * Strict Constraint: ZERO external AI/LLM APIs.
 * Pure JavaScript/TypeScript deterministic NLP and fuzzy scoring.
 */

import {
  CHATBOT_FAQ_DATA,
  FaqItem,
  DDS_WHATSAPP_NUMBER,
} from '../data/chatbotFaqData';

export interface MatchResult {
  faq: FaqItem | null;
  score: number;
  isPriceQuery: boolean;
  answerText: string;
  whatsappMessage: string;
  whatsappButtonLabel: string;
  showWhatsAppButton: boolean;
  suggestedFollowUps: string[];
}

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'about', 'against',
  'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below',
  'from', 'up', 'down', 'in', 'out', 'over', 'under', 'again', 'further',
  'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all',
  'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such',
  'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very',
  'can', 'will', 'just', 'should', 'now', 'i', 'you', 'he', 'she', 'it',
  'we', 'they', 'me', 'him', 'her', 'us', 'them', 'my', 'your', 'our',
  'do', 'does', 'did', 'please', 'tell', 'want', 'give'
]);

const PRICE_TRIGGER_TERMS = [
  'price',
  'pricing',
  'cost',
  'fees',
  'fee',
  'charges',
  'charge',
  'budget',
  'package price',
  'service cost',
  'project quotation',
  'quotation',
  'quote',
  'website price',
  'app development price',
  'custom software price',
  'internship fee',
  'workshop fee',
  'discount',
  'discounts',
  'offer price',
  'negotiation',
  'how much',
  'rate',
  'rates',
  'amount of money',
  'amount',
  'cheap',
  'affordable',
  'estimate'
];

/**
 * Normalizes input string for reliable keyword and phrase matching
 */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s₹$€]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Tokenizes text and removes common English stop words
 */
export function extractKeywords(text: string): string[] {
  const normalized = normalizeText(text);
  const rawTokens = normalized.split(' ');
  return rawTokens.filter((token) => token.length > 1 && !STOP_WORDS.has(token));
}

/**
 * Detects whether the user's message is asking for pricing, costs, or quotations
 */
export function detectPriceIntent(text: string): boolean {
  const normalized = normalizeText(text);
  return PRICE_TRIGGER_TERMS.some((term) => normalized.includes(term));
}

/**
 * Builds a direct Click-to-WhatsApp URL
 */
export function buildWhatsAppUrl(message: string, phoneNumber = DDS_WHATSAPP_NUMBER): string {
  const encoded = encodeURIComponent(message.trim());
  return `https://wa.me/${phoneNumber}?text=${encoded}`;
}

/**
 * Computes a weighted relevance score between user query and an FAQ item
 */
function calculateFaqRelevance(
  userQuery: string,
  userTokens: string[],
  faq: FaqItem
): number {
  let score = 0;
  const normalizedQuery = normalizeText(userQuery);
  const normalizedQuestion = normalizeText(faq.question);

  // 1. Direct whole-question match or high substring containment
  if (normalizedQuestion.includes(normalizedQuery) || normalizedQuery.includes(normalizedQuestion)) {
    score += 60;
  }

  // 2. Intent phrases exact matching
  for (const phrase of faq.intentPhrases) {
    const normalizedPhrase = normalizeText(phrase);
    if (normalizedQuery.includes(normalizedPhrase) || normalizedPhrase.includes(normalizedQuery)) {
      score += 50;
      break;
    }
  }

  // 3. Keyword matches
  for (const keyword of faq.keywords) {
    const normKey = normalizeText(keyword);
    // Multi-word keyword match (e.g., "web development", "lead generation")
    if (normKey.includes(' ') && normalizedQuery.includes(normKey)) {
      score += 35;
    } else if (userTokens.includes(normKey)) {
      score += 20;
    } else if (normKey.length > 3 && userTokens.some((tok) => tok.includes(normKey) || normKey.includes(tok))) {
      score += 10;
    }
  }

  return score;
}

/**
 * Primary matching function: parses user question, scores FAQs,
 * enforces strict price rules and unknown-question fallbacks.
 */
export function matchUserQuery(userQuery: string): MatchResult {
  const trimmed = userQuery.trim();
  const normalized = normalizeText(trimmed);
  const isPrice = detectPriceIntent(trimmed);
  const tokens = extractKeywords(trimmed);

  // 1. Check for quick conversational greetings
  if (['hi', 'hello', 'hey', 'namaste', 'good morning', 'good afternoon', 'good evening'].includes(normalized)) {
    return {
      faq: null,
      score: 100,
      isPriceQuery: false,
      answerText: 
        '👋 **Hello! Welcome to DDS Expo.**\n\n' +
        'I am your instant AI-style virtual assistant powered by our local knowledge base. How can I help your business grow today?\n\n' +
        'You can ask me about our **Lead Gen Ad Plans**, **₹6,500/mo SMM**, **₹300 Flyer Design**, **Web Development**, or **Paid Internships**.',
      whatsappMessage: 'Hi DDS Expo, I would like to explore your digital marketing and web engineering services.',
      whatsappButtonLabel: '💬 Chat on WhatsApp',
      showWhatsAppButton: true,
      suggestedFollowUps: [
        'What are your lead generation ad plans?',
        'What is your monthly SMM plan?',
        'Do you provide website development?',
        'How much does flyer design cost?'
      ],
    };
  }

  // 2. Check for quick thank you
  if (['thanks', 'thank you', 'ok', 'okay', 'great', 'awesome', 'cool'].includes(normalized)) {
    return {
      faq: null,
      score: 100,
      isPriceQuery: false,
      answerText: "You're very welcome! If you'd like to get started or talk to our founders, tap the WhatsApp button below anytime.",
      whatsappMessage: 'Hi DDS Expo, I want to talk to an expert regarding my project.',
      whatsappButtonLabel: '💬 Talk to Expert on WhatsApp',
      showWhatsAppButton: true,
      suggestedFollowUps: [
        'What are your lead generation ad plans?',
        'Where is your office located?',
        'I want a custom quotation.'
      ]
    };
  }

  // 3. Score all FAQs in the static database
  let bestFaq: FaqItem | null = null;
  let highestScore = 0;

  for (const faq of CHATBOT_FAQ_DATA) {
    const score = calculateFaqRelevance(trimmed, tokens, faq);
    if (score > highestScore) {
      highestScore = score;
      bestFaq = faq;
    }
  }

  // 4. Special Handling for Pricing Questions (as mandated in user instructions)
  if (isPrice) {
    // Check if the query is specifically about custom website or app pricing
    const isWebPriceQuery = 
      normalized.includes('website') || 
      normalized.includes('web') || 
      normalized.includes('app') || 
      normalized.includes('ecommerce') || 
      normalized.includes('software');

    if (isWebPriceQuery) {
      return {
        faq: bestFaq,
        score: Math.max(highestScore, 80),
        isPriceQuery: true,
        answerText:
          'Website pricing depends on your requirements. For an exact quotation and customized packages, please contact our team on WhatsApp.\n\n' +
          '• **Includes:** Fast React/Next.js sub-second performance, responsive UI, Razorpay payment gateway, and WhatsApp bot integration.',
        whatsappMessage: 'Hi, I would like to know the pricing for website development. Please share the available packages and quotation.',
        whatsappButtonLabel: '💬 Ask on WhatsApp',
        showWhatsAppButton: true,
        suggestedFollowUps: [
          'What technologies do you work with?',
          'What are your lead generation ad plans?',
          'Tell me about the 1-Week FREE Ad Campaign'
        ]
      };
    }

    // Check if query matched a specific product with an exact price (Code A to F)
    if (bestFaq && bestFaq.hasExactPrice && highestScore >= 18) {
      return {
        faq: bestFaq,
        score: highestScore,
        isPriceQuery: true,
        answerText: bestFaq.answer,
        whatsappMessage: bestFaq.whatsappMessage,
        whatsappButtonLabel: '💬 Ask on WhatsApp',
        showWhatsAppButton: true,
        suggestedFollowUps: bestFaq.suggestedFollowUps || []
      };
    }

    // If asking about general pricing/cost without a specific product match
    if (!bestFaq || highestScore < 18) {
      return {
        faq: null,
        score: 50,
        isPriceQuery: true,
        answerText:
          'For exact pricing and a customized quotation, please contact our team on WhatsApp.\n\n' +
          'We provide clear upfront estimates with no hidden charges for ad campaigns, design packages, and custom software.',
        whatsappMessage: 'Hi, I would like to know your service pricing and get a customized quotation for my business.',
        whatsappButtonLabel: '💬 Ask on WhatsApp',
        showWhatsAppButton: true,
        suggestedFollowUps: [
          'What are your lead generation ad plans?',
          'What is your monthly SMM plan?',
          'How much does flyer design cost?'
        ]
      };
    }
  }

  // 5. Normal FAQ Match (Confidence threshold >= 18)
  if (bestFaq && highestScore >= 18) {
    return {
      faq: bestFaq,
      score: highestScore,
      isPriceQuery: isPrice,
      answerText: bestFaq.answer,
      whatsappMessage: bestFaq.whatsappMessage,
      whatsappButtonLabel: isPrice ? '💬 Ask on WhatsApp' : '💬 Inquire on WhatsApp',
      showWhatsAppButton: true,
      suggestedFollowUps: bestFaq.suggestedFollowUps || []
    };
  }

  // 6. Unknown Question Fallback (Strictly NO hallucinations rule)
  const safeSnippet = trimmed.slice(0, 80);
  return {
    faq: null,
    score: 0,
    isPriceQuery: isPrice,
    answerText: "I'm sorry, I don't have that information right now. Please contact our team on WhatsApp for more details.",
    whatsappMessage: `Hi DDS Expo, I have a question about: "${safeSnippet}". Could you please help me with the details?`,
    whatsappButtonLabel: '💬 Contact Us on WhatsApp',
    showWhatsAppButton: true,
    suggestedFollowUps: [
      'What services do you provide?',
      'What are your ad & lead gen plans?',
      'How can I contact you?',
      'Do you provide internships?'
    ]
  };
}
