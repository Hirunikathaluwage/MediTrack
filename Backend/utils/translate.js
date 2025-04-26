// backend/utils/translate.js
import translate from 'google-translate-api-x';

export async function detectLanguage(text) {
  const result = await translate(text);
  return result.from.language.iso;
}

export async function translateText(text, targetLanguage) {
  const result = await translate(text, { to: targetLanguage });
  return result.text;
}
