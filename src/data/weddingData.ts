export interface CeremonyEvent {
  id: string;
  title: string;
  subtitle?: string;
  time: string;
  venue: string;
  city: 'Pune' | 'Ranchi';
  dressCode?: {
    label: string;
    swatchHex: string;
  };
  note?: string;
}

export interface CeremonyDay {
  id: string;
  dateLabelHi: string;
  dateLabelEn: string;
  cityTag: 'pune' | 'ranchi';
  cityDisplay: string;
  imageUrl?: string;
  imageAlt?: string;
  events: CeremonyEvent[];
}

export interface VenueItem {
  id: string;
  name: string;
  address: string;
  city: string;
  eventsSummary: string;
  mapsQuery: string;
}

export interface BlessingEntry {
  id: string;
  name: string;
  relationOrCity: string;
  attending: string;
  message: string;
  createdAt: string;
}

export const COUPLE = {
  groomHi: 'आयुष्मान आदित्य',
  brideHi: 'आयुष्मती सृष्टि',
  groomEn: 'Aditya',
  brideEn: 'Srishti',
  hostFamily: 'नंद / गुप्ता परिवार',
  weddingIsoDate: '2027-01-18T19:00:00+05:30',
};

export const CEREMONY_DAYS: CeremonyDay[] = [
  {
    id: 'day-17-jan',
    dateLabelHi: 'रविवार, 17 जनवरी 2027',
    dateLabelEn: 'Sunday, 17 January 2027',
    cityTag: 'pune',
    cityDisplay: 'वाघोली, पुणे',
    events: [
      {
        id: 'tilak',
        title: 'शुभ तिलक',
        subtitle: 'Shubh Tilak',
        time: 'सुबह 11:00 बजे',
        venue: 'The Altruist Wagholi Hotel, वाघोली, पुणे',
        city: 'Pune',
      },
      {
        id: 'mehendi',
        title: 'मेहंदी',
        subtitle: 'Mehendi Celebration',
        time: 'सुबह 11:30 बजे',
        venue: 'The Altruist Wagholi Hotel, वाघोली, पुणे',
        city: 'Pune',
        dressCode: {
          label: 'Green',
          swatchHex: '#2F6844',
        },
      },
      {
        id: 'ring-sangeet',
        title: 'Ring Ceremony एवं संगीत',
        subtitle: 'Engagement & Sangeet Evening',
        time: 'शाम 6:30 बजे से',
        venue: 'Seasons 24 Banquets, Wagholi, Pune',
        city: 'Pune',
      },
    ],
  },
  {
    id: 'day-18-jan',
    dateLabelHi: 'सोमवार, 18 जनवरी 2027',
    dateLabelEn: 'Monday, 18 January 2027',
    cityTag: 'pune',
    cityDisplay: 'वाघोली, पुणे',
    imageUrl: '/src/assets/images/haldi_marigold_floral_1794565465321.jpg',
    imageAlt: 'ताजे पीले गेंदे के फूलों की माला, आम के पत्ते और पीतल की कटोरी में चंदन व हल्दी',
    events: [
      {
        id: 'haldi',
        title: 'हल्दी',
        subtitle: 'Haldi Ceremony',
        time: 'सुबह 11:00 बजे',
        venue: 'The Altruist Wagholi Hotel, वाघोली, पुणे',
        city: 'Pune',
        dressCode: {
          label: 'पीला (Yellow)',
          swatchHex: '#D49B1A',
        },
      },
      {
        id: 'baraat-vivah',
        title: 'बारात एवं शुभ विवाह',
        subtitle: 'Baraat Procession & Shubh Vivah',
        time: 'शाम 7:00 बजे',
        venue: 'The Altruist Wagholi Hotel, वाघोली, पुणे से प्रस्थान',
        city: 'Pune',
        note: 'नोट: बारात The Altruist Wagholi Hotel से प्रस्थान कर आगे जाएगी।',
      },
    ],
  },
  {
    id: 'day-21-jan',
    dateLabelHi: 'गुरुवार, 21 जनवरी 2027',
    dateLabelEn: 'Thursday, 21 January 2027',
    cityTag: 'ranchi',
    cityDisplay: 'राँची',
    imageUrl: '/src/assets/images/reception_floral_candlelight_1794565465749.jpg',
    imageAlt: 'प्रीतिभोज के लिए सफेद व सिंदूरी गुलाबों और पीतल की मोमबत्तियों से सजा स्वागत मंच',
    events: [
      {
        id: 'reception',
        title: 'स्वागत समारोह (प्रीतिभोज)',
        subtitle: 'Wedding Reception',
        time: 'शाम 7:30 बजे से',
        venue: 'Hotel Marriott, Kanke Road, Ranchi',
        city: 'Ranchi',
      },
    ],
  },
];

export const MANGLIK_RITUALS = {
  heading: 'मांगलिक कार्यक्रम (राँची)',
  dates: '15 एवं 16 जनवरी 2027',
  venue: 'राँची में निवास (घर) पर',
  rituals: [
    {
      name: 'मटकोर',
      detail: 'मांगलिक मिट्टी पूजन एवं लोकगीतों के साथ शुभ आरंभ',
    },
    {
      name: 'हल्दी',
      detail: 'परिवार के बड़ों के आशीर्वाद व मंगल हल्दी लेपन',
    },
    {
      name: 'चूड़ाधारी',
      detail: 'पारंपरिक सौभाग्य एवं मंगल अनुष्ठान',
    },
    {
      name: 'मड़वा',
      detail: 'वैदिक मंत्रोच्चार एवं कुलदेवता पूजन के साथ मंडप स्थापना',
    },
  ],
};

export const VENUES: VenueItem[] = [
  {
    id: 'altruist',
    name: 'The Altruist Wagholi Hotel',
    address: 'Wagholi, Pune, Maharashtra',
    city: 'पुणे',
    eventsSummary: 'शुभ तिलक · मेहंदी · हल्दी · बारात प्रस्थान',
    mapsQuery: 'The Altruist Wagholi Hotel Pune',
  },
  {
    id: 'seasons24',
    name: 'Seasons 24 Banquets',
    address: 'Wagholi, Pune, Maharashtra',
    city: 'पुणे',
    eventsSummary: 'Ring Ceremony एवं संगीत · 17 जनवरी, शाम 6:30 बजे',
    mapsQuery: 'Seasons 24 Banquets Wagholi Pune',
  },
  {
    id: 'marriott',
    name: 'Hotel Marriott, Kanke Road',
    address: 'Kanke Road, Ranchi, Jharkhand',
    city: 'राँची',
    eventsSummary: 'स्वागत समारोह (प्रीतिभोज) · 21 जनवरी, शाम 7:30 बजे',
    mapsQuery: 'Courtyard by Marriott Kanke Road Ranchi',
  },
];

export const INITIAL_BLESSINGS: BlessingEntry[] = [
  {
    id: 'b1',
    name: 'राजेश एवं अनीता नंद',
    relationOrCity: 'राँची',
    attending: 'पुणे एवं राँची दोनों कार्यक्रम',
    message: 'आदित्य और सृष्टि के नवीन जीवन की मंगलमय एवं सुखद शुरुआत के लिए अनंत शुभकामनाएँ।',
    createdAt: 'परिवार संदेश',
  },
  {
    id: 'b2',
    name: 'डॉ. विक्रम गुप्ता एवं परिवार',
    relationOrCity: 'पुणे',
    attending: 'पुणे कार्यक्रम (17–18 जनवरी)',
    message: 'ईश्वर इस पावन जोड़ी को सदा प्रेम, विश्वास और समृद्धि का आशीर्वाद प्रदान करें।',
    createdAt: 'स्नेहीजन',
  },
];

export function downloadWeddingCalendarICS() {
  const icsLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Shubh Vivah//Aditya & Srishti//HI',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    'UID:aditya-srishti-tilak-mehendi-2027@vivah',
    'DTSTART:20270117T053000Z',
    'DTEND:20270117T100000Z',
    'SUMMARY:शुभ तिलक एवं मेहंदी — आदित्य व सृष्टि',
    'LOCATION:The Altruist Wagholi Hotel, Wagholi, Pune',
    'DESCRIPTION:शुभ तिलक (सुबह 11:00 बजे) एवं मेहंदी (सुबह 11:30 बजे). Dress Code: Green.',
    'END:VEVENT',
    'BEGIN:VEVENT',
    'UID:aditya-srishti-sangeet-2027@vivah',
    'DTSTART:20270117T130000Z',
    'DTEND:20270117T173000Z',
    'SUMMARY:Ring Ceremony एवं संगीत — आदित्य व सृष्टि',
    'LOCATION:Seasons 24 Banquets, Wagholi, Pune',
    'DESCRIPTION:Ring Ceremony एवं संगीत समारोह (शाम 6:30 बजे से).',
    'END:VEVENT',
    'BEGIN:VEVENT',
    'UID:aditya-srishti-vivah-2027@vivah',
    'DTSTART:20270118T133000Z',
    'DTEND:20270118T180000Z',
    'SUMMARY:बारात एवं शुभ विवाह — आयुष्मान आदित्य weds आयुष्मती सृष्टि',
    'LOCATION:The Altruist Wagholi Hotel, Wagholi, Pune',
    'DESCRIPTION:हल्दी (सुबह 11:00 बजे, Dress Code: पीला) एवं बारात प्रस्थान व शुभ विवाह (शाम 7:00 बजे). विनीत: नंद / गुप्ता परिवार.',
    'END:VEVENT',
    'BEGIN:VEVENT',
    'UID:aditya-srishti-reception-2027@vivah',
    'DTSTART:20270121T140000Z',
    'DTEND:20270121T173000Z',
    'SUMMARY:स्वागत समारोह (प्रीतिभोज) — आदित्य व सृष्टि',
    'LOCATION:Hotel Marriott, Kanke Road, Ranchi',
    'DESCRIPTION:स्वागत समारोह (प्रीतिभोज) शाम 7:30 बजे से. विनीत: नंद / गुप्ता परिवार.',
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  const blob = new Blob([icsLines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Aditya-Srishti-Shubh-Vivah-2027.ics';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
