/**
 * Country / national team name → flag emoji + real PNG flag image URL.
 * Emoji flags don't render on all devices (Windows, some Androids) so we
 * also provide a country-code-based URL to flagcdn.com PNGs.
 *
 * TheSportsDB returns team names like "Ivory Coast", "South Korea" etc.
 * so we normalize variants and fall back to a globe if unknown.
 */

const FLAGS: Record<string, { emoji: string; code: string }> = {
  // Common World Cup participants
  argentina:          { emoji: '🇦🇷', code: 'ar' },
  australia:          { emoji: '🇦🇺', code: 'au' },
  belgium:            { emoji: '🇧🇪', code: 'be' },
  brazil:             { emoji: '🇧🇷', code: 'br' },
  cameroon:           { emoji: '🇨🇲', code: 'cm' },
  canada:             { emoji: '🇨🇦', code: 'ca' },
  chile:              { emoji: '🇨🇱', code: 'cl' },
  colombia:           { emoji: '🇨🇴', code: 'co' },
  'congo dr':         { emoji: '🇨🇩', code: 'cd' },
  'dr congo':         { emoji: '🇨🇩', code: 'cd' },
  congo:              { emoji: '🇨🇩', code: 'cg' },
  'costa rica':       { emoji: '🇨🇷', code: 'cr' },
  croatia:            { emoji: '🇭🇷', code: 'hr' },
  'côte d\'ivoire':   { emoji: '🇨🇮', code: 'ci' },
  'cote d\'ivoire':   { emoji: '🇨🇮', code: 'ci' },
  'ivory coast':      { emoji: '🇨🇮', code: 'ci' },
  denmark:            { emoji: '🇩🇰', code: 'dk' },
  ecuador:            { emoji: '🇪🇨', code: 'ec' },
  egypt:              { emoji: '🇪🇬', code: 'eg' },
  england:            { emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', code: 'gb-eng' },
  finland:            { emoji: '🇫🇮', code: 'fi' },
  france:             { emoji: '🇫🇷', code: 'fr' },
  germany:            { emoji: '🇩🇪', code: 'de' },
  ghana:              { emoji: '🇬🇭', code: 'gh' },
  greece:             { emoji: '🇬🇷', code: 'gr' },
  haiti:              { emoji: '🇭🇹', code: 'ht' },
  hungary:            { emoji: '🇭🇺', code: 'hu' },
  iceland:            { emoji: '🇮🇸', code: 'is' },
  india:              { emoji: '🇮🇳', code: 'in' },
  indonesia:          { emoji: '🇮🇩', code: 'id' },
  iran:               { emoji: '🇮🇷', code: 'ir' },
  iraq:               { emoji: '🇮🇶', code: 'iq' },
  ireland:            { emoji: '🇮🇪', code: 'ie' },
  'republic of ireland': { emoji: '🇮🇪', code: 'ie' },
  italy:              { emoji: '🇮🇹', code: 'it' },
  jamaica:            { emoji: '🇯🇲', code: 'jm' },
  japan:              { emoji: '🇯🇵', code: 'jp' },
  jordan:             { emoji: '🇯🇴', code: 'jo' },
  kazakhstan:         { emoji: '🇰🇿', code: 'kz' },
  malaysia:           { emoji: '🇲🇾', code: 'my' },
  mali:               { emoji: '🇲🇱', code: 'ml' },
  mexico:             { emoji: '🇲🇽', code: 'mx' },
  morocco:            { emoji: '🇲🇦', code: 'ma' },
  netherlands:        { emoji: '🇳🇱', code: 'nl' },
  'new zealand':      { emoji: '🇳🇿', code: 'nz' },
  nigeria:            { emoji: '🇳🇬', code: 'ng' },
  'north korea':      { emoji: '🇰🇵', code: 'kp' },
  norway:             { emoji: '🇳🇴', code: 'no' },
  panama:             { emoji: '🇵🇦', code: 'pa' },
  paraguay:           { emoji: '🇵🇾', code: 'py' },
  peru:               { emoji: '🇵🇪', code: 'pe' },
  philippines:        { emoji: '🇵🇭', code: 'ph' },
  poland:             { emoji: '🇵🇱', code: 'pl' },
  portugal:           { emoji: '🇵🇹', code: 'pt' },
  qatar:              { emoji: '🇶🇦', code: 'qa' },
  romania:            { emoji: '🇷🇴', code: 'ro' },
  russia:             { emoji: '🇷🇺', code: 'ru' },
  'saudi arabia':     { emoji: '🇸🇦', code: 'sa' },
  'saudi arabien':    { emoji: '🇸🇦', code: 'sa' },
  scotland:           { emoji: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', code: 'gb-sct' },
  senegal:            { emoji: '🇸🇳', code: 'sn' },
  serbia:             { emoji: '🇷🇸', code: 'rs' },
  singapore:          { emoji: '🇸🇬', code: 'sg' },
  'south africa':     { emoji: '🇿🇦', code: 'za' },
  'south korea':      { emoji: '🇰🇷', code: 'kr' },
  'korea republic':   { emoji: '🇰🇷', code: 'kr' },
  'korea rep.':       { emoji: '🇰🇷', code: 'kr' },
  korea:              { emoji: '🇰🇷', code: 'kr' },
  spain:              { emoji: '🇪🇸', code: 'es' },
  sweden:             { emoji: '🇸🇪', code: 'se' },
  switzerland:        { emoji: '🇨🇭', code: 'ch' },
  thailand:           { emoji: '🇹🇭', code: 'th' },
  tunisia:            { emoji: '🇹🇳', code: 'tn' },
  turkey:             { emoji: '🇹🇷', code: 'tr' },
  turkiye:            { emoji: '🇹🇷', code: 'tr' },
  ukraine:            { emoji: '🇺🇦', code: 'ua' },
  'united arab emirates': { emoji: '🇦🇪', code: 'ae' },
  'united states':    { emoji: '🇺🇸', code: 'us' },
  usa:                { emoji: '🇺🇸', code: 'us' },
  uruguay:            { emoji: '🇺🇾', code: 'uy' },
  uzbekistan:         { emoji: '🇺🇿', code: 'uz' },
  venezuela:          { emoji: '🇻🇪', code: 've' },
  vietnam:            { emoji: '🇻🇳', code: 'vn' },
  wales:              { emoji: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', code: 'gb-wls' },
  'burkina faso':     { emoji: '🇧🇫', code: 'bf' },
  'cape verde':        { emoji: '🇨🇻', code: 'cv' },
  algeria:            { emoji: '🇩🇿', code: 'dz' },
  austria:            { emoji: '🇦🇹', code: 'at' },
  albania:            { emoji: '🇦🇱', code: 'al' },
  'czech republic':    { emoji: '🇨🇿', code: 'cz' },
  czechia:            { emoji: '🇨🇿', code: 'cz' },
  slovakia:           { emoji: '🇸🇰', code: 'sk' },
  slovenia:           { emoji: '🇸🇮', code: 'si' },
  bulgaria:           { emoji: '🇧🇬', code: 'bg' },
  georgia:            { emoji: '🇬🇪', code: 'ge' },
  armenia:            { emoji: '🇦🇲', code: 'am' },
  azerbaijan:         { emoji: '🇦🇿', code: 'az' },
  china:              { emoji: '🇨🇳', code: 'cn' },
  bolivia:            { emoji: '🇧🇴', code: 'bo' },
  honduras:           { emoji: '🇭🇳', code: 'hn' },
  curaçao:            { emoji: '🇨🇼', code: 'cw' },
  curacao:            { emoji: '🇨🇼', code: 'cw' },
};

const FALLBACK = { emoji: '🌍', code: 'un' };

/** Get flag emoji for a team name. Returns 🌍 if unknown. */
export function flagForTeam(team: string): string {
  if (!team) return FALLBACK.emoji;
  const key = team.toLowerCase().trim();
  if (FLAGS[key]) return FLAGS[key].emoji;
  const stripped = key
    .replace(/\s+(national team|nt)$/i, '')
    .replace(/\b(fc|cf|sc)\b/gi, '')
    .trim();
  return FLAGS[stripped]?.emoji ?? FALLBACK.emoji;
}

/**
 * Get a real flag PNG image URL for a team name.
 * Uses flagcdn.com (free, no key, CORS-friendly, CDN-backed).
 * Returns a globe fallback if unknown.
 *
 * @param team  Team name from the API
 * @param w     Image width in px (default 40)
 */
export function flagImgUrl(team: string, w = 40): string {
  if (!team) return `https://flagcdn.com/w${w}/${FALLBACK.code}.png`;
  const key = team.toLowerCase().trim();
  const code = FLAGS[key]?.code;
  if (code) return `https://flagcdn.com/w${w}/${code}.png`;
  const stripped = key
    .replace(/\s+(national team|nt)$/i, '')
    .replace(/\b(fc|cf|sc)\b/gi, '')
    .trim();
  const c2 = FLAGS[stripped]?.code ?? FALLBACK.code;
  return `https://flagcdn.com/w${w}/${c2}.png`;
}
