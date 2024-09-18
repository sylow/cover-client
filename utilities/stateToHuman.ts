// Define valid keys for the translations
type CoverState = 'created' | 'paid' | 'running' | 'completed' | 'failed';

// Define the translations object with strict typing
const translations: Record<CoverState, string> = {
  'created': 'Run for 1 credit',
  'running': 'Working on it',
  'completed': 'Ready to view',
  'failed': 'Failed'
};

// Function to fetch translation, defaults to returning the key if no match is found
export default function (key: string | undefined): string {
  if (!key) return '';
  return translations[key as CoverState] || key;
}