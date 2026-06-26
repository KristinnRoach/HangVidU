/**
 * Converts non-English Latin characters (primarily Icelandic, but including
 * common European accents) into their standard English equivalents.
 * Does not perform any other text normalization or formatting.
 */
export function convertToEnglishLetters(input: string): string {
  if (!input) return '';

  // Mapping of non-English characters to their English equivalents
  const charMap: Record<string, string> = {
    // Icelandic Specific & Ligatures
    þ: 'th',
    Þ: 'Th',
    ð: 'd',
    Ð: 'D',
    æ: 'ae',
    Æ: 'Ae',
    ö: 'o',
    Ö: 'O',

    // Standard Icelandic Accents
    á: 'a',
    Á: 'A',
    é: 'e',
    É: 'E',
    í: 'i',
    Í: 'I',
    ó: 'o',
    Ó: 'O',
    ú: 'u',
    Ú: 'U',
    ý: 'y',
    Ý: 'Y',

    // Nordic & Germanic Neighbors (Safe to fold in)
    ø: 'o',
    Ø: 'O',
    å: 'a',
    Å: 'A',
    ä: 'a',
    Ä: 'A',
    ü: 'u',
    Ü: 'U',
    ß: 'ss',

    // Common Romance Language Accents (French/Spanish)
    ç: 'c',
    Ç: 'C',
    ñ: 'n',
    Ñ: 'N',
    à: 'a',
    À: 'A',
    è: 'e',
    È: 'E',
    ù: 'u',
    Ù: 'U',
    â: 'a',
    Â: 'A',
    ê: 'e',
    Ê: 'E',
    î: 'i',
    Î: 'I',
    ô: 'o',
    Ô: 'O',
    û: 'u',
    Û: 'U',
  };

  const targetRegex = new RegExp(Object.keys(charMap).join('|'), 'g');

  return input.replace(targetRegex, (matched) => charMap[matched]);
}
