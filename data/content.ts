export interface CompetitionCategory {
  id: string;
  name: string;
  tagline: string;
  iconName: "brain" | "palette";
  juniorGrade: string;
  juniorTitle: string;
  juniorTopics: string[];
  seniorGrade: string;
  seniorTitle: string;
  seniorTopics: string[];
}

export interface ContestItem {
  id: string;
  title: string;
  tagline?: string;
  eligibility: string;
  fee: string;
  feePerStudent: number;
  deadline: string;
  grandPrize: string;
  bankDetails: {
    title: string;
    accNo: string;
    iban: string;
    bank: string;
  };
  milestones: { title: string; date: string }[];
  awards?: { rank: string; prize: string }[];
}

export const siteContent = {
  header: {
    brandName: "MINDMORY",
    tagline: "Where memories whisper loud",
    email: "info@mindmory.com",
    phone: "0333-4001184",
    whatsapp: "03097864722",
    address: "National Secretariat, Karachi, Pakistan",
  },
  popup: {
    title: "Registrations Open",
    subtitle: "National School Competitions 2026–27",
    eligibility: "Pre-Level to Grade 10",
    fee: "Rs. 1,100 / student",
    deadline: "05 October 2026",
    buttonText: "Register via WhatsApp",
  },
  categories: [
    {
      id: "gk",
      name: "General Knowledge",
      tagline: "Global Awareness & Analytical Reasoning",
      iconName: "brain",
      juniorGrade: "Pre-Level to Grade 2",
      juniorTitle: "Foundational World Awareness",
      juniorTopics: [
        "National symbols, flags, historical figures & national anthem.",
        "Solar system, planets, weather seasons, days & months.",
        "Animal habitats, world wonders & familiar landmarks.",
        "Everyday science, logic, traffic signals & observation signs."
      ],
      seniorGrade: "Grades 3–4 to 9–10",
      seniorTitle: "Global Knowledge & Geopolitical Insight",
      seniorTopics: [
        "Major historical civilizations, constitutions & international treaties.",
        "Physical geography, mountain ranges, oceans & world capitals.",
        "Science revolutions, AI advancements & space exploration missions.",
        "Current affairs, international bodies (UN, WHO) & sports records."
      ]
    },
    {
      id: "art",
      name: "Art & Creative Expression",
      tagline: "Visual Storytelling & Fine Art Excellence",
      iconName: "palette",
      juniorGrade: "Pre-Level to Grade 2",
      juniorTitle: "Theme: Colors of My Pure Imagination",
      juniorTopics: [
        "Allowed Mediums: Wax crayons, color pencils, and poster paints.",
        "Assessment: Creativity, neatness, color balance & canvas coverage.",
        "Themes: Nature, favorite animals, family scenes & dream worlds."
      ],
      seniorGrade: "Grades 3–4 to 9–10",
      seniorTitle: "Theme: Where Memories Whisper Loud",
      seniorTopics: [
        "Allowed Mediums: Acrylics, watercolors, charcoal, sketching & mixed media.",
        "Assessment: Perspective, depth, emotional resonance & original technique.",
        "Themes: Heritage, cultural nostalgia, future cities & environmental resilience."
      ]
    }
  ] as CompetitionCategory[],
  contests: [
    {
      id: "mindmory-mega",
      title: "National Mega Competitions 2026–27",
      tagline: "Where memories whisper loud — challenging intellect, inspiring creativity.",
      eligibility: "Pre-Level to Grade 10",
      fee: "Rs. 1,100 per student",
      feePerStudent: 1100,
      deadline: "05 October 2026",
      grandPrize: "PKR 300,000 (Two Awards)",
      bankDetails: {
        title: "MINDMORY CONSULTANTS",
        accNo: "0201-0105056878",
        iban: "PK87 MEZN 0002 0101 0505 6878",
        bank: "Meezan Bank Ltd.",
      },
      milestones: [
        { title: "Registration Deadline", date: "05 October 2026" },
        { title: "Syllabus & Theme Dispatch", date: "15 October 2026" },
        { title: "Paper & Canvas Guidelines", date: "26 October 2026" },
        { title: "Elimination Round", date: "10 November 2026" },
        { title: "Elimination Results", date: "25 November 2026" },
        { title: "Grand Finale", date: "2 December 2026" },
        { title: "Final Results Announcement", date: "14 December 2026" },
        { title: "Prize Distribution Ceremony", date: "5 January 2027" },
      ],
      awards: [
        { rank: "Grand Prize", prize: "PKR 300,000 (Two Awards)" },
        { rank: "2nd Prize", prize: "Tablet (12 Awards)" },
        { rank: "3rd Prize", prize: "PKR 20,000 (12 Awards)" },
        { rank: "4th Prize", prize: "PKR 15,000 (12 Awards)" },
        { rank: "5th Prize", prize: "PKR 5,000" },
        { rank: "6th–8th Prize", prize: "Gold, Silver & Bronze Medals" },
        { rank: "9th Prize", prize: "Exciting Giveaways" },
      ],
    } as ContestItem,
  ],
};