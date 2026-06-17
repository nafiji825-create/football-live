/**
 * Country / national team name → flag emoji mapping.
 * TheSportsDB returns team names like "Ivory Coast", "South Korea", "Czech Republic"
 * so we normalize variants and fall back to a globe emoji if unknown.
 */

const FLAGS: Record<string, string> = {
  // Common names
  argentina: '🇦🇷', algeria: '🇩🇿', austria: '🇦🇹', jordan: '🇯🇴',
  england: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', croatia: '🇭🇷', uzbekistan: '🇺🇿', colombia: '🇨🇴',
  canada: '🇨🇦', qatar: '🇶🇦', mexico: '🇲🇽', 'south korea': '🇰🇷',
  'korea republic': '🇰🇷', 'korea rep.': '🇰🇷', korea: '🇰🇷',
  scotland: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', morocco: '🇲🇦', usa: '🇺🇸',
  'united states': '🇺🇸', australia: '🇦🇺', brazil: '🇧🇷', haiti: '🇭🇹',
  germany: '🇩🇪', 'ivory coast': '🇨🇮', "côte d'ivoire": '🇨🇮', ecuador: '🇪🇨',
  curaçao: '🇨🇼', curacao: '🇨🇼', tunisia: '🇹🇳', japan: '🇯🇵',
  belgium: '🇧🇪', iran: '🇮🇷', 'new zealand': '🇳🇿', egypt: '🇪🇬',
  norway: '🇳🇴', senegal: '🇸🇳', ghana: '🇬🇭', 'south africa': '🇿🇦',
  switzerland: '🇨🇭', paraguay: '🇵🇾', spain: '🇪🇸', france: '🇫🇷',
  portugal: '🇵🇹', netherlands: '🇳🇱', italy: '🇮🇹', 'republic of ireland': '🇮🇪',
  ireland: '🇮🇪', 'saudi arabia': '🇸🇦', 'saudi arabien': '🇸🇦',
  poland: '🇵🇱', ukraine: '🇺🇦', wales: '🏴󠁧󠁢󠁷󠁬󠁳󠁿',
  'costa rica': '🇨🇷', panama: '🇵🇦', jamaica: '🇯🇲', honduras: '🇭🇳',
  'dr congo': '🇨🇩', 'congo dr': '🇨🇩', congo: '🇨🇩', nigeria: '🇳🇬',
  cameroon: '🇨🇲', mali: '🇲🇱', albania: '🇦🇱', serbia: '🇷🇸',
  'czech republic': '🇨🇿', czechia: '🇨🇿', slovakia: '🇸🇰', slovenia: '🇸🇮',
  'united arab emirates': '🇦🇪', iraq: '🇮🇶', 'burkina faso': '🇧🇫',
  'cape verde': '🇨🇻', russia: '🇷🇺',
  turkey: '🇹🇷', turkiye: '🇹🇷', uruguay: '🇺🇾', chile: '🇨🇱',
  peru: '🇵🇪', bolivia: '🇧🇴', venezuela: '🇻🇪', iceland: '🇮🇸',
  finland: '🇫🇮', denmark: '🇩🇰', sweden: '🇸🇪', greece: '🇬🇷',
  romania: '🇷🇴', hungary: '🇭🇺', bulgaria: '🇧🇬', georgia: '🇬🇪',
  armenia: '🇦🇲', azerbaijan: '🇦🇿', kazakhstan: '🇰🇿',
  india: '🇮🇳', china: '🇨🇳', thailand: '🇹🇭', vietnam: '🇻🇳',
  indonesia: '🇮🇩', philippines: '🇵🇭', malaysia: '🇲🇾', singapore: '🇸🇬',
};

/** Get a flag emoji for a team name. Returns 🌍 if unknown. */
export function flagForTeam(team: string): string {
  if (!team) return '🌍';
  const key = team.toLowerCase().trim();
  // exact match
  if (FLAGS[key]) return FLAGS[key];
  // try removing common suffixes
  const stripped = key
    .replace(/\s+(national team|nt)$/i, '')
    .replace(/\b(fc|cf|sc)\b/gi, '')
    .trim();
  return FLAGS[stripped] || '🌍';
}
