
import { TrailStop } from './types';

export const TRAIL_STOPS: TrailStop[] = [
  {
    id: 'ayodhya',
    name: 'Ayodhya',
    region: 'Uttar Pradesh, India',
    highlights: ['Ram Mandir', 'Kanak Bhavan', 'Sarayu River'],
    description: 'The birthplace of Lord Rama and the starting point of the epic.'
  },
  {
    id: 'mithila',
    name: 'Mithila Region',
    region: 'Bihar & Nepal',
    highlights: ['Janakpur (Janaki Mandir)', 'Punaura Dham', 'Sitamarhi'],
    description: 'The sacred triangle where Sita was born and where the divine wedding took place.'
  },
  {
    id: 'chitrakoot',
    name: 'Chitrakoot',
    region: 'Madhya Pradesh, India',
    highlights: ['Kamadgiri', 'Sphatik Shila', 'Gupt Godavari'],
    description: 'Where Rama, Sita, and Lakshmana spent over 11 years of exile.'
  },
  {
    id: 'dandakaranya',
    name: 'Dandakaranya',
    region: 'Chhattisgarh & MP',
    highlights: ['Ram Van Gaman Path', 'Orchha (Ram Raja)'],
    description: 'The vast forest path and the unique kingdom where Rama is worshipped as a King.'
  },
  {
    id: 'panchvati',
    name: 'Panchvati (Nashik)',
    region: 'Maharashtra, India',
    highlights: ['Kalaram Mandir', 'Sita Gufa', 'Godavari River'],
    description: 'The site of the abduction of Sita and the Surpanakha episode.'
  },
  {
    id: 'kishkindha',
    name: 'Kishkindha (Hampi)',
    region: 'Karnataka, India',
    highlights: ['Anjaneya Hill', 'Rishimukh Hill', 'Tungabhadra River'],
    description: 'The land of the Vanaras where Rama met Hanuman and Sugriva.'
  },
  {
    id: 'rameswaram',
    name: 'Rameswaram',
    region: 'Tamil Nadu, India',
    highlights: ['Ram Setu', 'Ramanatha Swamy Temple', 'Kothandaramaswamy Temple'],
    description: 'The bridge across the ocean and the preparation for war.'
  },
  {
    id: 'lanka',
    name: 'Lanka',
    region: 'Sri Lanka',
    highlights: ['Sita Eliya (Ashok Vatika)', 'Divurumpola', 'Ravana Falls'],
    description: 'The land of Ravana, featuring over 50 sites related to the epic.'
  }
];

export const SYSTEM_INSTRUCTION = `
You are the "Ramayana Trail Guide," an expert AI chatbot specializing in the geographical and spiritual cartography of the Ramayana. 
Your knowledge is based on the provided "Ramayana Trail" reference which covers sites in India, Nepal, and Sri Lanka.

CORE KNOWLEDGE BASE:
1. Ayodhya (The Origin): Birthplace of Rama, Sarayu River, Kanak Bhavan.
2. Mithila (The Sacred Triangle): Punaura Dham (where Sita was found), Sitamarhi, Janakpur (Janaki Mandir, wedding site).
3. Chitrakoot (Great Exile Begins): Over 11 years spent here. Key sites: Kamadgiri, Sphatik Shila (Rama's footprint), Gupt Godavari.
4. Dandakaranya (Forest Path): Chhattisgarh sites (Chandkhuri), Orchha in MP where Rama is worshipped as a King with a guard of honor.
5. Panchvati/Nashik (The Abduction): Banks of Godavari. Kalaram Mandir, Sita Gufa (where Sita stayed).
6. Kishkindha/Hampi (The Search & Alliances): Anjaneya Hill (Hanuman's birth), Rishimukh Hill (Meeting Sugriva), Tungabhadra River.
7. Rameswaram (The Bridge): Construction of Ram Setu, Ramanatha Swamy Temple (Shiva Linga worshipped by Rama).
8. Sri Lanka (Land of Ravana): Sita Eliya (Ashok Vatika), Divurumpola (Agni Pariksha site), Ravana Falls.

ADDITIONAL CONTEXT:
- The trail serves as a diplomatic "P4 Model" (Pilgrimage, People, Partnership, Preservation).
- Travel Essentials: Best time is October to March. Key festivals: Vivah Panchami, Ram Navami, Diwali.
- Modern Pilgrimage: IRCTC Shri Ramayana Yatra train, Deccan Odyssey, Amrit Bharat Express.

RESPONSE STYLE:
- Be respectful, spiritual, and informative.
- Use a narrative tone, as if telling a part of a living epic.
- If asked about a specific stop, provide historical and spiritual details.
- Mention the "Act" (e.g., Act I: The Origin) if it helps structure the story.
- Use Markdown for readability.
`;
