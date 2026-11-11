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
    tagline: "Where Memories Whisper Loud",
    email: "info@mindmory.com",
    phone: "0333-4001184",
    whatsapp: "03097864722",
    address: "National Secretariat, Karachi, Pakistan",
    examLink: "https://docs.google.com/forms/d/e/1FAIpQLScXwQ_demo_mindmory_assessment/viewform",
  },
  popup: {
    title: "Registrations Open",
    subtitle: "Mindmory 2026 Online GK Contest",
    eligibility: "Class 1 through Grade 10 & O Levels",
    fee: "Rs. 1,100 / student",
    deadline: "30 November 2026",
    buttonText: "Register Online via WhatsApp",
  },
  categories: [
    {
      id: "gk",
      name: "General Knowledge",
      tagline: "Where Memories Whisper Loud",
      iconName: "brain",
      juniorGrade: "Class 1 to Grade 5",
      juniorTitle: "Foundational Knowledge & Discovery",
      juniorTopics: [
        "Fascinating facts about science, space, nature & solar system.",
        "World geography, national symbols, flags & landmarks.",
        "History, prominent figures & global affairs.",
        "Analytical reasoning, everyday logic & observation."
      ],
      seniorGrade: "Grade 6 to 10 / O Levels",
      seniorTitle: "Advanced Intellect & Critical Thinking",
      seniorTopics: [
        "Global affairs, international organizations & treaties.",
        "Physical geography, world capitals & modern history.",
        "Scientific breakthroughs, technology, AI & inventions.",
        "Competitive speed MCQs & critical problem-solving."
      ]
    },
    {
      id: "art",
      name: "Art & Creative Expression",
      tagline: "Visual Storytelling & Fine Art Excellence",
      iconName: "palette",
      juniorGrade: "Class 1 to Grade 5",
      juniorTitle: "Theme: Colors of My Pure Imagination",
      juniorTopics: [
        "Allowed Mediums: Wax crayons, color pencils, and poster paints.",
        "Assessment: Creativity, neatness, color balance & canvas coverage.",
        "Themes: Nature, favorite animals, family scenes & dream worlds."
      ],
      seniorGrade: "Grade 6 to 10 / O Levels",
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
      title: "Mindmory National GK Contest 2026",
      tagline: "Where memories whisper loud — 100% Online exam conveniently from home.",
      eligibility: "Class 1 through Grade 10 & O Level students",
      fee: "PKR 1,100 per student",
      feePerStudent: 1100,
      deadline: "30 November 2026",
      grandPrize: "Smart Tablets & Cash Prizes",
      bankDetails: {
        title: "MINDMORY CONSULTANTS",
        accNo: "0201-0105056878",
        iban: "PK87 MEZN 0002 0101 0505 6878",
        bank: "Meezan Bank Ltd.",
      },
      milestones: [
        { title: "Registrations Live", date: "01 November 2026" },
        { title: "Past Papers & Practice", date: "15 November 2026" },
        { title: "Final Registration Deadline", date: "30 November 2026" },
        { title: "Online Exam (From Home)", date: "10 December 2026" },
        { title: "National Results Announcement", date: "24 December 2026" },
        { title: "Smart Tablets & Awards Dispatch", date: "10 January 2027" },
      ],
      awards: [
        { rank: "Top Rankers", prize: "Smart Tablets" },
        { rank: "Category Champions", prize: "Cash Prizes" },
        { rank: "1st Position", prize: "Gold Medals" },
        { rank: "Runner-Ups", prize: "Silver Medals" },
        { rank: "High Achievers", prize: "Bronze Medals" },
        { rank: "Special Honor", prize: "Exciting Giveaways & Goodie Bags" },
        { rank: "All Candidates", prize: "Official Certificates of Participation & Excellence" },
      ],
    } as ContestItem,
  ],
};

// Aliases for compatibility
export const siteConfig = siteContent;