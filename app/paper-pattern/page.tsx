"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Search, 
  Printer, 
  CheckCircle2, 
  XCircle,
  Clock, 
  Award, 
  RotateCcw,
  Laptop,
  Trophy,
  Check
} from "lucide-react";

interface Question {
  id: number;
  q: string;
  options: string[];
  correct: string;
  part: string;
}

interface ClassPaper {
  gradeId: string;
  gradeTitle: string;
  subject: string;
  duration: string;
  totalMarks: number;
  questions: Question[];
}

const allPapersData: ClassPaper[] = [
  // GRADE 1 (Complete 30 Questions)
  {
    gradeId: "grade-1",
    gradeTitle: "Grade 1",
    subject: "General Knowledge",
    duration: "15 minutes",
    totalMarks: 30,
    questions: [
      { id: 1, part: "Part 1: Myself & Around Me", q: "What color is the sky?", options: ["a) Green", "b) Blue", "c) Red"], correct: "b" },
      { id: 2, part: "Part 1: Myself & Around Me", q: "How many days are there in a week?", options: ["a) 5", "b) 7", "c) 10"], correct: "b" },
      { id: 3, part: "Part 1: Myself & Around Me", q: "Which part of body do we use to see?", options: ["a) Nose", "b) Eyes", "c) Ears"], correct: "b" },
      { id: 4, part: "Part 1: Myself & Around Me", q: "What do we wear on our feet?", options: ["a) Cap", "b) Shoes", "c) Gloves"], correct: "b" },
      { id: 5, part: "Part 1: Myself & Around Me", q: "Which is our national language of Pakistan?", options: ["a) English", "b) Urdu", "c) Arabic"], correct: "b" },
      { id: 6, part: "Part 2: Animals & Birds", q: "Which animal gives us milk?", options: ["a) Dog", "b) Cow", "c) Cat"], correct: "b" },
      { id: 7, part: "Part 2: Animals & Birds", q: "King of the jungle is?", options: ["a) Elephant", "b) Lion", "c) Tiger"], correct: "b" },
      { id: 8, part: "Part 2: Animals & Birds", q: "Which bird can fly?", options: ["a) Fish", "b) Sparrow", "c) Snake"], correct: "b" },
      { id: 9, part: "Part 2: Animals & Birds", q: "What sound does a duck make?", options: ["a) Meow", "b) Quack", "c) Bark"], correct: "b" },
      { id: 10, part: "Part 2: Animals & Birds", q: "Which animal has a long trunk?", options: ["a) Monkey", "b) Elephant", "c) Horse"], correct: "b" },
      { id: 11, part: "Part 3: Fruits, Vegetables & Food", q: "Which fruit is red and round?", options: ["a) Banana", "b) Apple", "c) Mango"], correct: "b" },
      { id: 12, part: "Part 3: Fruits, Vegetables & Food", q: "Which vegetable is orange?", options: ["a) Carrot", "b) Brinjal", "c) Potato"], correct: "a" },
      { id: 13, part: "Part 3: Fruits, Vegetables & Food", q: "What do bees make?", options: ["a) Milk", "b) Honey", "c) Water"], correct: "b" },
      { id: 14, part: "Part 3: Fruits, Vegetables & Food", q: "Which drink keeps us healthy?", options: ["a) Cold drink", "b) Water", "c) Juice only"], correct: "b" },
      { id: 15, part: "Part 3: Fruits, Vegetables & Food", q: "Bread is made from?", options: ["a) Wheat", "b) Rice", "c) Sugar"], correct: "a" },
      { id: 16, part: "Part 4: School & Study", q: "Where do we read books?", options: ["a) Park", "b) Library", "c) Market"], correct: "b" },
      { id: 17, part: "Part 4: School & Study", q: "What do we write with?", options: ["a) Eraser", "b) Pencil", "c) Ruler"], correct: "b" },
      { id: 18, part: "Part 4: School & Study", q: "Which day is the first day of the week?", options: ["a) Monday", "b) Sunday", "c) Friday"], correct: "b" },
      { id: 19, part: "Part 4: School & Study", q: "Who teaches us in class?", options: ["a) Doctor", "b) Teacher", "c) Farmer"], correct: "b" },
      { id: 20, part: "Part 4: School & Study", q: "We keep our books in a?", options: ["a) Bag", "b) Fridge", "c) Box"], correct: "a" },
      { id: 21, part: "Part 5: Islam & Values", q: "Who is our last Prophet?", options: ["a) Hazrat Isa A.S", "b) Hazrat Muhammad ï·º", "c) Hazrat Musa A.S"], correct: "b" },
      { id: 22, part: "Part 5: Islam & Values", q: "How many times do we pray daily?", options: ["a) 3", "b) 5", "c) 7"], correct: "b" },
      { id: 23, part: "Part 5: Islam & Values", q: "What do we say before eating?", options: ["a) Alhamdulillah", "b) Bismillah", "c) Mashallah"], correct: "b" },
      { id: 24, part: "Part 5: Islam & Values", q: "Our Holy Book is?", options: ["a) Bible", "b) Torah", "c) Quran"], correct: "c" },
      { id: 25, part: "Part 5: Islam & Values", q: "We should always speak?", options: ["a) Lie", "b) Truth", "c) Loud"], correct: "b" },
      { id: 26, part: "Part 6: Environment & General", q: "What do plants need to grow?", options: ["a) Water and sunlight", "b) Chocolate", "c) Toys"], correct: "a" },
      { id: 27, part: "Part 6: Environment & General", q: "Which is used to clean hands?", options: ["a) Soap", "b) Stone", "c) Paper"], correct: "a" },
      { id: 28, part: "Part 6: Environment & General", q: "What comes after day?", options: ["a) Morning", "b) Night", "c) Evening"], correct: "b" },
      { id: 29, part: "Part 6: Environment & General", q: "Which month has 31 days?", options: ["a) February", "b) January", "c) April"], correct: "b" },
      { id: 30, part: "Part 6: Environment & General", q: "We should keep our surroundings?", options: ["a) Dirty", "b) Clean", "c) Noisy"], correct: "b" }
    ]
  },

  // GRADE 2 (Complete 30 Questions)
  {
    gradeId: "grade-2",
    gradeTitle: "Grade 2",
    subject: "General Knowledge",
    duration: "15 minutes",
    totalMarks: 30,
    questions: [
      { id: 1, part: "Part 1: Pakistan & World", q: "What is the capital of Pakistan?", options: ["a) Karachi", "b) Islamabad", "c) Lahore"], correct: "b" },
      { id: 2, part: "Part 1: Pakistan & World", q: "Our national animal is?", options: ["a) Lion", "b) Markhor", "c) Deer"], correct: "b" },
      { id: 3, part: "Part 1: Pakistan & World", q: "How many provinces are there in Pakistan?", options: ["a) 3", "b) 4", "c) 5"], correct: "b" },
      { id: 4, part: "Part 1: Pakistan & World", q: "Which is the largest ocean?", options: ["a) Atlantic", "b) Indian", "c) Pacific"], correct: "c" },
      { id: 5, part: "Part 1: Pakistan & World", q: "Flag of Pakistan has which two colors?", options: ["a) Green and White", "b) Red and White", "c) Blue and White"], correct: "a" },
      { id: 6, part: "Part 2: Science & Body", q: "How many senses do we have?", options: ["a) 4", "b) 5", "c) 6"], correct: "b" },
      { id: 7, part: "Part 2: Science & Body", q: "Plants make food in their?", options: ["a) Roots", "b) Leaves", "c) Stem"], correct: "b" },
      { id: 8, part: "Part 2: Science & Body", q: "We get energy from?", options: ["a) Food", "b) Sleep", "c) Water only"], correct: "a" },
      { id: 9, part: "Part 2: Science & Body", q: "Which gas do plants take in?", options: ["a) Oxygen", "b) Carbon Dioxide", "c) Nitrogen"], correct: "b" },
      { id: 10, part: "Part 2: Science & Body", q: "Doctor checks us with a?", options: ["a) Stethoscope", "b) Telescope", "c) Microscope"], correct: "a" },
      { id: 11, part: "Part 3: Animals & Nature", q: "Which animal lives in water and on land?", options: ["a) Fish", "b) Frog", "c) Snake"], correct: "b" },
      { id: 12, part: "Part 3: Animals & Nature", q: "Baby of a cow is called?", options: ["a) Calf", "b) Puppy", "c) Kitten"], correct: "a" },
      { id: 13, part: "Part 3: Animals & Nature", q: "Which bird lays the biggest egg?", options: ["a) Hen", "b) Ostrich", "c) Duck"], correct: "b" },
      { id: 14, part: "Part 3: Animals & Nature", q: "Bees live in a?", options: ["a) Nest", "b) Hive", "c) Den"], correct: "b" },
      { id: 15, part: "Part 3: Animals & Nature", q: "Which season comes after summer?", options: ["a) Winter", "b) Autumn", "c) Rainy"], correct: "b" },
      { id: 16, part: "Part 4: Food, Health & Safety", q: "Which vitamin do we get from sunlight?", options: ["a) Vitamin A", "b) Vitamin C", "c) Vitamin D"], correct: "c" },
      { id: 17, part: "Part 4: Food, Health & Safety", q: "We should brush our teeth?", options: ["a) Once a week", "b) Twice a day", "c) Once a month"], correct: "b" },
      { id: 18, part: "Part 4: Food, Health & Safety", q: "Which food is good for strong bones?", options: ["a) Milk", "b) Chips", "c) Candy"], correct: "a" },
      { id: 19, part: "Part 4: Food, Health & Safety", q: "Road crossing signal 'Stop' color is?", options: ["a) Green", "b) Red", "c) Yellow"], correct: "b" },
      { id: 20, part: "Part 4: Food, Health & Safety", q: "We should wash hands?", options: ["a) Before eating", "b) After sleeping", "c) Never"], correct: "a" },
      { id: 21, part: "Part 5: Islamiyat & Values", q: "How many Kalmas are there?", options: ["a) 4", "b) 5", "c) 6"], correct: "c" },
      { id: 22, part: "Part 5: Islamiyat & Values", q: "Which month is Ramadan?", options: ["a) 8th", "b) 9th", "c) 10th"], correct: "b" },
      { id: 23, part: "Part 5: Islamiyat & Values", q: "We offer Jummah prayer on?", options: ["a) Sunday", "b) Friday", "c) Monday"], correct: "b" },
      { id: 24, part: "Part 5: Islamiyat & Values", q: "Angels are made of?", options: ["a) Fire", "b) Light", "c) Clay"], correct: "b" },
      { id: 25, part: "Part 5: Islamiyat & Values", q: "We should respect our?", options: ["a) Friends only", "b) Parents and Teachers", "c) No one"], correct: "b" },
      { id: 26, part: "Part 6: General & GK", q: "1 dozen = how many?", options: ["a) 10", "b) 12", "c) 15"], correct: "b" },
      { id: 27, part: "Part 6: General & GK", q: "Which instrument do we use to measure time?", options: ["a) Scale", "b) Clock", "c) Thermometer"], correct: "b" },
      { id: 28, part: "Part 6: General & GK", q: "Computer screen is called?", options: ["a) Monitor", "b) Keyboard", "c) Mouse"], correct: "a" },
      { id: 29, part: "Part 6: General & GK", q: "Which is the fastest land animal?", options: ["a) Horse", "b) Cheetah", "c) Deer"], correct: "b" },
      { id: 30, part: "Part 6: General & GK", q: "We celebrate 14th August as?", options: ["a) Labour Day", "b) Independence Day", "c) Defence Day"], correct: "b" }
    ]
  },

  // GRADE 3 (30 Questions)
  {
    gradeId: "grade-3",
    gradeTitle: "Grade 3",
    subject: "General Knowledge",
    duration: "45 minutes",
    totalMarks: 30,
    questions: [
      { id: 1, part: "Part 1: Pakistan & World", q: "What is the national bird of Pakistan?", options: ["a) Peacock", "b) Chukar", "c) Parrot"], correct: "b" },
      { id: 2, part: "Part 1: Pakistan & World", q: "Largest province of Pakistan by area is?", options: ["a) Punjab", "b) Sindh", "c) Balochistan"], correct: "c" },
      { id: 3, part: "Part 1: Pakistan & World", q: "Who is called the 'Father of the Nation'?", options: ["a) Allama Iqbal", "b) Quaid-e-Azam", "c) Liaquat Ali Khan"], correct: "b" },
      { id: 4, part: "Part 1: Pakistan & World", q: "How many continents are there in the world?", options: ["a) 5", "b) 6", "c) 7"], correct: "c" },
      { id: 5, part: "Part 1: Pakistan & World", q: "Currency of Pakistan is?", options: ["a) Dollar", "b) Rupee", "c) Riyal"], correct: "b" },
      { id: 6, part: "Part 2: Science", q: "Water boils at?", options: ["a) 50Â°C", "b) 100Â°C", "c) 0Â°C"], correct: "b" },
      { id: 7, part: "Part 2: Science", q: "The process by which plants make food is called?", options: ["a) Respiration", "b) Photosynthesis", "c) Digestion"], correct: "b" },
      { id: 8, part: "Part 2: Science", q: "Human body has how many bones?", options: ["a) 206", "b) 300", "c) 150"], correct: "a" },
      { id: 9, part: "Part 2: Science", q: "Which planet is known as the 'Red Planet'?", options: ["a) Earth", "b) Mars", "c) Jupiter"], correct: "b" },
      { id: 10, part: "Part 2: Science", q: "We get oxygen from?", options: ["a) Trees", "b) Cars", "c) Factories"], correct: "a" },
      { id: 11, part: "Part 3: Animals & Environment", q: "Which animal is called 'Ship of the Desert'?", options: ["a) Horse", "b) Camel", "c) Donkey"], correct: "b" },
      { id: 12, part: "Part 3: Animals & Environment", q: "Where do polar bears live?", options: ["a) Desert", "b) Arctic", "c) Forest"], correct: "b" },
      { id: 13, part: "Part 3: Animals & Environment", q: "Which gas is most in the air?", options: ["a) Oxygen", "b) Carbon Dioxide", "c) Nitrogen"], correct: "c" },
      { id: 14, part: "Part 3: Animals & Environment", q: "To save water we should?", options: ["a) Waste it", "b) Turn off tap", "c) Keep tap open"], correct: "b" },
      { id: 15, part: "Part 3: Animals & Environment", q: "Baby frog is called?", options: ["a) Calf", "b) Tadpole", "c) Chick"], correct: "b" },
      { id: 16, part: "Part 4: History, Sports & Culture", q: "Pakistan became independent in?", options: ["a) 1945", "b) 1947", "c) 1950"], correct: "b" },
      { id: 17, part: "Part 4: History, Sports & Culture", q: "National game of Pakistan is?", options: ["a) Cricket", "b) Hockey", "c) Football"], correct: "b" },
      { id: 18, part: "Part 4: History, Sports & Culture", q: "Who wrote 'Twinkle Twinkle Little Star'?", options: ["a) William Shakespeare", "b) Jane Taylor", "c) Robert Frost"], correct: "b" },
      { id: 19, part: "Part 4: History, Sports & Culture", q: "Eiffel Tower is in?", options: ["a) London", "b) Paris", "c) Rome"], correct: "b" },
      { id: 20, part: "Part 4: History, Sports & Culture", q: "We celebrate 23rd March as?", options: ["a) Pakistan Day", "b) Independence Day", "c) Defence Day"], correct: "a" },
      { id: 21, part: "Part 5: Islamiyat & Ethics", q: "How many Surahs are in the Holy Quran?", options: ["a) 110", "b) 114", "c) 120"], correct: "b" },
      { id: 22, part: "Part 5: Islamiyat & Ethics", q: "First mosque in Islam was?", options: ["a) Masjid-e-Nabvi", "b) Masjid Quba", "c) Masjid Aqsa"], correct: "b" },
      { id: 23, part: "Part 5: Islamiyat & Ethics", q: "Zakat is given to?", options: ["a) Rich people", "b) Poor and needy", "c) Only friends"], correct: "b" },
      { id: 24, part: "Part 5: Islamiyat & Ethics", q: "We should always be?", options: ["a) Honest", "b) Lazy", "c) Rude"], correct: "a" },
      { id: 25, part: "Part 5: Islamiyat & Ethics", q: "Angel who brings Wahi is?", options: ["a) Hazrat Israfeel", "b) Hazrat Jibraeel", "c) Hazrat Mikaeel"], correct: "b" },
      { id: 26, part: "Part 6: Computer, Math & General", q: "1 Week = how many days?", options: ["a) 6", "b) 7", "c) 8"], correct: "b" },
      { id: 27, part: "Part 6: Computer, Math & General", q: "Part of computer used to type is?", options: ["a) Mouse", "b) Keyboard", "c) Monitor"], correct: "b" },
      { id: 28, part: "Part 6: Computer, Math & General", q: "Sun rises from the?", options: ["a) West", "b) East", "c) North"], correct: "b" },
      { id: 29, part: "Part 6: Computer, Math & General", q: "Which is the longest river in Pakistan?", options: ["a) Chenab", "b) Ravi", "c) Indus"], correct: "c" },
      { id: 30, part: "Part 6: Computer, Math & General", q: "We should save electricity by?", options: ["a) Keeping lights on", "b) Switching off when not needed", "c) Using AC all day"], correct: "b" }
    ]
  },

  // GRADE 4 (30 Questions)
  {
    gradeId: "grade-4",
    gradeTitle: "Grade 4",
    subject: "General Knowledge",
    duration: "30 Minutes",
    totalMarks: 30,
    questions: [
      { id: 1, part: "Pakistan Studies", q: "The capital of Pakistan is?", options: ["a) Karachi", "b) Lahore", "c) Islamabad"], correct: "c" },
      { id: 2, part: "Pakistan Studies", q: "The capital of Sindh province is?", options: ["a) Hyderabad", "b) Karachi", "c) Sukkur"], correct: "b" },
      { id: 3, part: "Pakistan Studies", q: "Our national animal is?", options: ["a) Lion", "b) Markhor", "c) Deer"], correct: "b" },
      { id: 4, part: "Pakistan Studies", q: "Our national bird is?", options: ["a) Peacock", "b) Chukar", "c) Parrot"], correct: "b" },
      { id: 5, part: "Pakistan Studies", q: "Our national poet is?", options: ["a) Faiz Ahmed Faiz", "b) Allama Iqbal", "c) Ahmed Faraz"], correct: "b" },
      { id: 6, part: "Pakistan Studies", q: "Quaid-e-Azam was born in?", options: ["a) 1876", "b) 1888", "c) 1900"], correct: "a" },
      { id: 7, part: "Pakistan Studies", q: "Pakistan got independence on?", options: ["a) 23rd March 1940", "b) 14th August 1947", "c) 6th September 1965"], correct: "b" },
      { id: 8, part: "Pakistan Studies", q: "The largest province of Pakistan by area is?", options: ["a) Punjab", "b) Sindh", "c) Balochistan"], correct: "c" },
      { id: 9, part: "Pakistan Studies", q: "The highest mountain peak in Pakistan is?", options: ["a) K2", "b) Nanga Parbat", "c) Tirich Mir"], correct: "a" },
      { id: 10, part: "Pakistan Studies", q: "The longest river in Pakistan is?", options: ["a) Ravi", "b) Chenab", "c) Indus"], correct: "c" },
      { id: 11, part: "World & Geography", q: "How many continents are there in the world?", options: ["a) 5", "b) 6", "c) 7"], correct: "c" },
      { id: 12, part: "World & Geography", q: "The largest ocean in the world is?", options: ["a) Atlantic Ocean", "b) Indian Ocean", "c) Pacific Ocean"], correct: "c" },
      { id: 13, part: "World & Geography", q: "The largest desert in the world is?", options: ["a) Thar Desert", "b) Sahara Desert", "c) Gobi Desert"], correct: "b" },
      { id: 14, part: "World & Geography", q: "Eiffel Tower is located in?", options: ["a) London", "b) Paris", "c) Rome"], correct: "b" },
      { id: 15, part: "World & Geography", q: "UNO stands for?", options: ["a) United Nation Organization", "b) United Nations Organization", "c) Universal Nation Office"], correct: "b" },
      { id: 16, part: "World & Geography", q: "The longest river in the world is?", options: ["a) Indus", "b) Nile", "c) Amazon"], correct: "b" },
      { id: 17, part: "World & Geography", q: "Taj Mahal is located in?", options: ["a) Pakistan", "b) India", "c) Afghanistan"], correct: "b" },
      { id: 18, part: "Science & Technology", q: "The process of making food by plants is called?", options: ["a) Respiration", "b) Photosynthesis", "c) Digestion"], correct: "b" },
      { id: 19, part: "Science & Technology", q: "Water boils at?", options: ["a) 50Â°C", "b) 100Â°C", "c) 0Â°C"], correct: "b" },
      { id: 20, part: "Science & Technology", q: "Human body has how many bones?", options: ["a) 206", "b) 250", "c) 300"], correct: "a" },
      { id: 21, part: "Science & Technology", q: "Which organ purifies our blood?", options: ["a) Heart", "b) Lungs", "c) Kidney"], correct: "c" },
      { id: 22, part: "Science & Technology", q: "Which vitamin do we get from sunlight?", options: ["a) Vitamin A", "b) Vitamin C", "c) Vitamin D"], correct: "c" },
      { id: 23, part: "Science & Technology", q: "CPU stands for?", options: ["a) Central Processing Unit", "b) Computer Processing Unit", "c) Central Power Unit"], correct: "a" },
      { id: 24, part: "Science & Technology", q: "Who invented the light bulb?", options: ["a) Isaac Newton", "b) Thomas Edison", "c) Alexander Graham Bell"], correct: "b" },
      { id: 25, part: "Islamiat & Ethics", q: "How many pillars of Islam are there?", options: ["a) 4", "b) 5", "c) 6"], correct: "b" },
      { id: 26, part: "Islamiat & Ethics", q: "The Holy Quran was revealed in the month of?", options: ["a) Rajab", "b) Ramadan", "c) Muharram"], correct: "b" },
      { id: 27, part: "Islamiat & Ethics", q: "First Kalma is called?", options: ["a) Kalma-e-Shahadat", "b) Kalma-e-Tayyaba", "c) Kalma-e-Tamjeed"], correct: "b" },
      { id: 28, part: "Islamiat & Ethics", q: "We should always speak?", options: ["a) Truth", "b) Lie", "c) Loud"], correct: "a" },
      { id: 29, part: "Islamiat & Ethics", q: "Helping others is?", options: ["a) Bad habit", "b) Good habit", "c) Waste of time"], correct: "b" },
      { id: 30, part: "Islamiat & Ethics", q: "The national sport of Pakistan is?", options: ["a) Cricket", "b) Hockey", "c) Football"], correct: "b" }
    ]
  },

  // GRADE 5 (30 Questions)
  {
    gradeId: "grade-5",
    gradeTitle: "Grade 5",
    subject: "General Knowledge",
    duration: "30 Minutes",
    totalMarks: 30,
    questions: [
      { id: 1, part: "Pakistan Studies", q: "Who is called 'Poet of the East'?", options: ["a) Faiz Ahmed Faiz", "b) Allama Iqbal", "c) Josh Malihabadi"], correct: "b" },
      { id: 2, part: "Pakistan Studies", q: "Pakistan Resolution was passed on?", options: ["a) 23rd March 1940", "b) 14th August 1947", "c) 25th December 1947"], correct: "a" },
      { id: 3, part: "Pakistan Studies", q: "The national language of Pakistan is?", options: ["a) English", "b) Punjabi", "c) Urdu"], correct: "c" },
      { id: 4, part: "Pakistan Studies", q: "The founder of Pakistan is?", options: ["a) Liaquat Ali Khan", "b) Quaid-e-Azam Muhammad Ali Jinnah", "c) Sir Syed Ahmed Khan"], correct: "b" },
      { id: 5, part: "Pakistan Studies", q: "Which dam is located on Indus River?", options: ["a) Mangla Dam", "b) Tarbela Dam", "c) Warsak Dam"], correct: "b" },
      { id: 6, part: "Pakistan Studies", q: "The federal capital territory of Pakistan is?", options: ["a) Karachi", "b) Lahore", "c) Islamabad"], correct: "c" },
      { id: 7, part: "Pakistan Studies", q: "6th September is observed as?", options: ["a) Defence Day", "b) Independence Day", "c) Kashmir Day"], correct: "a" },
      { id: 8, part: "Pakistan Studies", q: "The national emblem of Pakistan contains?", options: ["a) Wheat, Cotton, Tea, Jute", "b) Rice, Sugar, Salt, Oil", "c) Gold, Silver, Copper, Iron"], correct: "a" },
      { id: 9, part: "World & Geography", q: "How many countries are there in the world approximately?", options: ["a) 150", "b) 195", "c) 220"], correct: "b" },
      { id: 10, part: "World & Geography", q: "The largest country in the world by area is?", options: ["a) Canada", "b) China", "c) Russia"], correct: "c" },
      { id: 11, part: "World & Geography", q: "Mount Everest is located in?", options: ["a) Pakistan", "b) Nepal", "c) India"], correct: "b" },
      { id: 12, part: "World & Geography", q: "The coldest continent is?", options: ["a) Arctic", "b) Antarctica", "c) Australia"], correct: "b" },
      { id: 13, part: "World & Geography", q: "Great Wall of China is in?", options: ["a) Japan", "b) China", "c) Korea"], correct: "b" },
      { id: 14, part: "World & Geography", q: "Currency of USA is?", options: ["a) Pound", "b) Dollar", "c) Euro"], correct: "b" },
      { id: 15, part: "World & Geography", q: "World Environment Day is celebrated on?", options: ["a) 5th June", "b) 22nd April", "c) 16th October"], correct: "a" },
      { id: 16, part: "Science & Technology", q: "The center of our solar system is?", options: ["a) Earth", "b) Moon", "c) Sun"], correct: "c" },
      { id: 17, part: "Science & Technology", q: "Human body has how many senses?", options: ["a) 4", "b) 5", "c) 6"], correct: "b" },
      { id: 18, part: "Science & Technology", q: "Plants release which gas during photosynthesis?", options: ["a) Carbon Dioxide", "b) Oxygen", "c) Nitrogen"], correct: "b" },
      { id: 19, part: "Science & Technology", q: "The hardest substance on earth is?", options: ["a) Iron", "b) Diamond", "c) Gold"], correct: "b" },
      { id: 20, part: "Science & Technology", q: "Blood is red due to presence of?", options: ["a) Plasma", "b) Hemoglobin", "c) Platelets"], correct: "b" },
      { id: 21, part: "Science & Technology", q: "1 Kilometer = how many meters?", options: ["a) 100", "b) 1000", "c) 10000"], correct: "b" },
      { id: 22, part: "Science & Technology", q: "WWW stands for?", options: ["a) World Wide Web", "b) World Wide Work", "c) World Web Wire"], correct: "a" },
      { id: 23, part: "Science & Technology", q: "Device used to measure temperature is?", options: ["a) Barometer", "b) Thermometer", "c) Hygrometer"], correct: "b" },
      { id: 24, part: "Islamiat & General Ethics", q: "How many Surahs are there in the Holy Quran?", options: ["a) 110", "b) 114", "c) 120"], correct: "b" },
      { id: 25, part: "Islamiat & General Ethics", q: "The last Prophet of Allah is?", options: ["a) Hazrat Musa A.S", "b) Hazrat Isa A.S", "c) Hazrat Muhammad ï·º"], correct: "c" },
      { id: 26, part: "Islamiat & General Ethics", q: "Fasting in Ramadan is the _ pillar of Islam.", options: ["a) 3rd", "b) 4th", "c) 5th"], correct: "b" },
      { id: 27, part: "Islamiat & General Ethics", q: "We should respect our?", options: ["a) Elders only", "b) Teachers only", "c) Elders and Teachers"], correct: "c" },
      { id: 28, part: "Sports & Famous Personalities", q: "The national game of Pakistan is?", options: ["a) Cricket", "b) Hockey", "c) Squash"], correct: "b" },
      { id: 29, part: "Sports & Famous Personalities", q: "Who was the first woman Prime Minister of Pakistan?", options: ["a) Fatima Jinnah", "b) Benazir Bhutto", "c) Maryam Nawaz"], correct: "b" },
      { id: 30, part: "Sports & Famous Personalities", q: "Who invented the telephone?", options: ["a) Thomas Edison", "b) Alexander Graham Bell", "c) James Watt"], correct: "b" }
    ]
  },

  // GRADE 6 (30 Questions)
  {
    gradeId: "grade-6",
    gradeTitle: "Grade 6",
    subject: "General Knowledge",
    duration: "30 Minutes",
    totalMarks: 30,
    questions: [
      { id: 1, part: "Pakistan Studies", q: "The Objectives Resolution was passed in?", options: ["a) 1947", "b) 1949", "c) 1956"], correct: "b" },
      { id: 2, part: "Pakistan Studies", q: "The national flag of Pakistan was designed by?", options: ["a) Allama Iqbal", "b) Ameer-ud-Din Kidwai", "c) Liaquat Ali Khan"], correct: "b" },
      { id: 3, part: "Pakistan Studies", q: "Which is the smallest province of Pakistan by area?", options: ["a) KPK", "b) Balochistan", "c) Punjab"], correct: "a" },
      { id: 4, part: "Pakistan Studies", q: "The longest motorway in Pakistan is?", options: ["a) M-2", "b) M-5", "c) M-9"], correct: "b" },
      { id: 5, part: "Pakistan Studies", q: "Pakistan's first nuclear test was conducted in?", options: ["a) 1996", "b) 1998", "c) 2001"], correct: "b" },
      { id: 6, part: "Pakistan Studies", q: "The founder of Aligarh Movement was?", options: ["a) Quaid-e-Azam", "b) Sir Syed Ahmed Khan", "c) Allama Iqbal"], correct: "b" },
      { id: 7, part: "Pakistan Studies", q: "Kashmir Day is observed on?", options: ["a) 5th February", "b) 23rd March", "c) 14th August"], correct: "a" },
      { id: 8, part: "World & Geography", q: "The largest continent in the world is?", options: ["a) Africa", "b) Asia", "c) North America"], correct: "b" },
      { id: 9, part: "World & Geography", q: "The capital of Canada is?", options: ["a) Toronto", "b) Ottawa", "c) Vancouver"], correct: "b" },
      { id: 10, part: "World & Geography", q: "The deepest ocean in the world is?", options: ["a) Atlantic", "b) Indian", "c) Pacific"], correct: "c" },
      { id: 11, part: "World & Geography", q: "Which country is called 'Land of Rising Sun'?", options: ["a) China", "b) Japan", "c) Korea"], correct: "b" },
      { id: 12, part: "World & Geography", q: "The largest freshwater lake in the world is?", options: ["a) Lake Victoria", "b) Lake Superior", "c) Caspian Sea"], correct: "b" },
      { id: 13, part: "World & Geography", q: "Greenwich Mean Time is related to?", options: ["a) London", "b) Paris", "c) New York"], correct: "a" },
      { id: 14, part: "World & Geography", q: "World Health Organization HQ is in?", options: ["a) New York", "b) Geneva", "c) Paris"], correct: "b" },
      { id: 15, part: "Science", q: "The chemical symbol of water is?", options: ["a) H2O", "b) CO2", "c) O2"], correct: "a" },
      { id: 16, part: "Science", q: "The study of plants is called?", options: ["a) Zoology", "b) Botany", "c) Geology"], correct: "b" },
      { id: 17, part: "Science", q: "Which gas is essential for burning?", options: ["a) Nitrogen", "b) Oxygen", "c) Hydrogen"], correct: "b" },
      { id: 18, part: "Science", q: "The human brain is protected by?", options: ["a) Rib cage", "b) Skull", "c) Backbone"], correct: "b" },
      { id: 19, part: "Science", q: "Sound travels fastest in?", options: ["a) Air", "b) Water", "c) Solid"], correct: "c" },
      { id: 20, part: "Science", q: "The force that pulls objects towards earth is?", options: ["a) Magnetic Force", "b) Gravitational Force", "c) Electric Force"], correct: "b" },
      { id: 21, part: "Science", q: "Anemia is caused due to deficiency of?", options: ["a) Iron", "b) Calcium", "c) Vitamin C"], correct: "a" },
      { id: 22, part: "Science", q: "Solar energy is a _ source of energy.", options: ["a) Non-renewable", "b) Renewable", "c) Both"], correct: "b" },
      { id: 23, part: "Islamiat & Ethics", q: "How many Ashra are there in Ramadan?", options: ["a) 2", "b) 3", "c) 4"], correct: "b" },
      { id: 24, part: "Islamiat & Ethics", q: "The battle of Badr was fought in?", options: ["a) 1 Hijri", "b) 2 Hijri", "c) 3 Hijri"], correct: "b" },
      { id: 25, part: "Islamiat & Ethics", q: "Zakat is obligatory on Muslims who have wealth above?", options: ["a) Nisab", "b) Ushr", "c) Khums"], correct: "a" },
      { id: 26, part: "Islamiat & Ethics", q: "The best character trait in Islam is?", options: ["a) Anger", "b) Honesty", "c) Laziness"], correct: "b" },
      { id: 27, part: "Computer & Sports", q: "RAM stands for?", options: ["a) Random Access Memory", "b) Read Access Memory", "c) Rapid Access Memory"], correct: "a" },
      { id: 28, part: "Computer & Sports", q: "The Olympic Games are held after every?", options: ["a) 2 years", "b) 3 years", "c) 4 years"], correct: "c" },
      { id: 29, part: "Computer & Sports", q: "Who is known as 'Father of Computer'?", options: ["a) Charles Babbage", "b) Alan Turing", "c) Bill Gates"], correct: "a" },
      { id: 30, part: "Computer & Sports", q: "The book 'Harry Potter' was written by?", options: ["a) J.K. Rowling", "b) William Shakespeare", "c) Agatha Christie"], correct: "a" }
    ]
  },

  // GRADE 7 (30 Questions)
  {
    gradeId: "grade-7",
    gradeTitle: "Grade 7",
    subject: "General Knowledge",
    duration: "30 Minutes",
    totalMarks: 30,
    questions: [
      { id: 1, part: "Pakistan Studies", q: "The 1973 Constitution of Pakistan was enforced on?", options: ["a) 14th August 1973", "b) 23rd March 1973", "c) 12th April 1973"], correct: "b" },
      { id: 2, part: "Pakistan Studies", q: "The highest civilian award of Pakistan is?", options: ["a) Hilal-e-Pakistan", "b) Nishan-e-Pakistan", "c) Sitara-e-Pakistan"], correct: "b" },
      { id: 3, part: "Pakistan Studies", q: "Which pass connects Pakistan with Afghanistan?", options: ["a) Khyber Pass", "b) Bolan Pass", "c) Khunjrab Pass"], correct: "a" },
      { id: 4, part: "Pakistan Studies", q: "The largest seaport of Pakistan is?", options: ["a) Port Qasim", "b) Karachi Port", "c) Gwadar Port"], correct: "b" },
      { id: 5, part: "Pakistan Studies", q: "Pakistan became a member of UNO in?", options: ["a) 1947", "b) 1948", "c) 1949"], correct: "b" },
      { id: 6, part: "Pakistan Studies", q: "The name of Pakistan was coined by?", options: ["a) Ch. Rehmat Ali", "b) Quaid-e-Azam", "c) Allama Iqbal"], correct: "a" },
      { id: 7, part: "World & Geography", q: "The largest country in the world by population is?", options: ["a) USA", "b) India", "c) China"], correct: "c" },
      { id: 8, part: "World & Geography", q: "The capital of Australia is?", options: ["a) Sydney", "b) Melbourne", "c) Canberra"], correct: "c" },
      { id: 9, part: "World & Geography", q: "Which is the longest river in the world?", options: ["a) Amazon", "b) Nile", "c) Yangtze"], correct: "b" },
      { id: 10, part: "World & Geography", q: "The Sahara Desert is located in?", options: ["a) Asia", "b) Africa", "c) Australia"], correct: "b" },
      { id: 11, part: "World & Geography", q: "NATO stands for?", options: ["a) North Atlantic Treaty Organization", "b) National Air Transport Organization", "c) New Asian Trade Organization"], correct: "a" },
      { id: 12, part: "World & Geography", q: "The currency of Japan is?", options: ["a) Yuan", "b) Yen", "c) Won"], correct: "b" },
      { id: 13, part: "World & Geography", q: "The smallest continent is?", options: ["a) Europe", "b) Australia", "c) Antarctica"], correct: "b" },
      { id: 14, part: "Science", q: "The basic unit of life is?", options: ["a) Tissue", "b) Cell", "c) Organ"], correct: "b" },
      { id: 15, part: "Science", q: "Which blood group is called 'Universal Donor'?", options: ["a) A", "b) B", "c) O"], correct: "c" },
      { id: 16, part: "Science", q: "The chemical formula of common salt is?", options: ["a) NaCl", "b) H2O", "c) CO2"], correct: "a" },
      { id: 17, part: "Science", q: "The speed of light is approximately?", options: ["a) 3 x 10^8 m/s", "b) 3 x 10^6 m/s", "c) 3 x 10^10 m/s"], correct: "a" },
      { id: 18, part: "Science", q: "Photosynthesis takes place in which part of plant?", options: ["a) Root", "b) Stem", "c) Leaf"], correct: "c" },
      { id: 19, part: "Science", q: "The study of weather and atmosphere is called?", options: ["a) Astronomy", "b) Meteorology", "c) Oceanography"], correct: "b" },
      { id: 20, part: "Science", q: "Which metal is liquid at room temperature?", options: ["a) Sodium", "b) Mercury", "c) Aluminum"], correct: "b" },
      { id: 21, part: "Science", q: "Vaccination was discovered by?", options: ["a) Louis Pasteur", "b) Edward Jenner", "c) Alexander Fleming"], correct: "b" },
      { id: 22, part: "Islamiat & Ethics", q: "How many times is daily prayer offered in Islam?", options: ["a) 3", "b) 5", "c) 7"], correct: "b" },
      { id: 23, part: "Islamiat & Ethics", q: "The first battle in Islamic history was?", options: ["a) Battle of Uhud", "b) Battle of Badr", "c) Battle of Khandaq"], correct: "b" },
      { id: 24, part: "Islamiat & Ethics", q: "The companion known as 'Sword of Allah' was?", options: ["a) Hazrat Ali R.A", "b) Hazrat Umar R.A", "c) Hazrat Khalid bin Waleed R.A"], correct: "c" },
      { id: 25, part: "Islamiat & Ethics", q: "Truthfulness is emphasized in which Surah?", options: ["a) Surah Ikhlas", "b) Surah Asr", "c) Surah Fatiha"], correct: "b" },
      { id: 26, part: "Computer & Literature", q: "HTML stands for?", options: ["a) Hyper Text Markup Language", "b) High Tech Modern Language", "c) Hyper Transfer Media Link"], correct: "a" },
      { id: 27, part: "Computer & Literature", q: "Who wrote 'Romeo and Juliet'?", options: ["a) Charles Dickens", "b) William Shakespeare", "c) Jane Austen"], correct: "b" },
      { id: 28, part: "Computer & Literature", q: "The FIFA World Cup is held after every?", options: ["a) 2 years", "b) 4 years", "c) 6 years"], correct: "b" },
      { id: 29, part: "Computer & Literature", q: "The currency of Saudi Arabia is?", options: ["a) Dinar", "b) Dirham", "c) Riyal"], correct: "c" },
      { id: 30, part: "Computer & Literature", q: "Which instrument is used to measure air pressure?", options: ["a) Thermometer", "b) Barometer", "c) Anemometer"], correct: "b" }
    ]
  },

  // GRADE 8 (30 Questions)
  {
    gradeId: "grade-8",
    gradeTitle: "Grade 8",
    subject: "General Knowledge",
    duration: "30 Minutes",
    totalMarks: 30,
    questions: [
      { id: 1, part: "Pakistan Studies", q: "The first capital of Pakistan was?", options: ["a) Lahore", "b) Karachi", "c) Islamabad"], correct: "b" },
      { id: 2, part: "Pakistan Studies", q: "Who presented the Lahore Resolution 1940?", options: ["a) Quaid-e-Azam", "b) A.K Fazal ul Haq", "c) Liaquat Ali Khan"], correct: "b" },
      { id: 3, part: "Pakistan Studies", q: "The highest mountain range in Pakistan is?", options: ["a) Himalayas", "b) Karakoram", "c) Hindu Kush"], correct: "b" },
      { id: 4, part: "Pakistan Studies", q: "CPEC stands for?", options: ["a) China Pakistan Economic Corridor", "b) Central Pakistan Economic Council", "c) China Pakistan Energy Company"], correct: "a" },
      { id: 5, part: "Pakistan Studies", q: "The national flower of Pakistan is?", options: ["a) Rose", "b) Jasmine", "c) Sunflower"], correct: "b" },
      { id: 6, part: "Pakistan Studies", q: "Pakistan became an Islamic Republic in?", options: ["a) 1956", "b) 1962", "c) 1973"], correct: "a" },
      { id: 7, part: "World & Geography", q: "The headquarters of United Nations is located in?", options: ["a) Washington", "b) New York", "c) Geneva"], correct: "b" },
      { id: 8, part: "World & Geography", q: "The largest desert in Asia is?", options: ["a) Thar", "b) Gobi", "c) Arabian"], correct: "b" },
      { id: 9, part: "World & Geography", q: "Which country is called 'Land of Thousand Lakes'?", options: ["a) Sweden", "b) Finland", "c) Norway"], correct: "b" },
      { id: 10, part: "World & Geography", q: "The Prime Meridian passes through?", options: ["a) Paris", "b) Greenwich", "c) Rome"], correct: "b" },
      { id: 11, part: "World & Geography", q: "OIC stands for?", options: ["a) Organization of Islamic Countries", "b) Organization of International Commerce", "c) Office of Islamic Cooperation"], correct: "a" },
      { id: 12, part: "World & Geography", q: "The largest island in the world is?", options: ["a) Madagascar", "b) Greenland", "c) Australia"], correct: "b" },
      { id: 13, part: "World & Geography", q: "Brexit is related to which country leaving EU?", options: ["a) France", "b) Germany", "c) United Kingdom"], correct: "c" },
      { id: 14, part: "Science", q: "The SI unit of force is?", options: ["a) Joule", "b) Newton", "c) Watt"], correct: "b" },
      { id: 15, part: "Science", q: "Which part of cell contains DNA?", options: ["a) Cytoplasm", "b) Nucleus", "c) Cell Wall"], correct: "b" },
      { id: 16, part: "Science", q: "Acid rain is caused by?", options: ["a) CO2 and CO", "b) SO2 and NO2", "c) O2 and N2"], correct: "b" },
      { id: 17, part: "Science", q: "The human skeleton has how many bones?", options: ["a) 206", "b) 208", "c) 210"], correct: "a" },
      { id: 18, part: "Science", q: "Which gas is used in photosynthesis?", options: ["a) Oxygen", "b) Carbon Dioxide", "c) Nitrogen"], correct: "b" },
      { id: 19, part: "Science", q: "The boiling point of water at sea level is?", options: ["a) 90Â°C", "b) 100Â°C", "c) 110Â°C"], correct: "b" },
      { id: 20, part: "Science", q: "An eclipse occurs when?", options: ["a) Earth comes between Sun and Moon", "b) Moon comes between Sun and Earth", "c) Both a and b"], correct: "c" },
      { id: 21, part: "Science", q: "The study of fossils is called?", options: ["a) Paleontology", "b) Archaeology", "c) Anthropology"], correct: "a" },
      { id: 22, part: "Islamiat & Ethics", q: "The last book revealed by Allah is?", options: ["a) Taurat", "b) Injeel", "c) Quran"], correct: "c" },
      { id: 23, part: "Islamiat & Ethics", q: "Hajj is performed in which month?", options: ["a) Ramadan", "b) Zil Hajj", "c) Muharram"], correct: "b" },
      { id: 24, part: "Islamiat & Ethics", q: "The first mosque on earth was?", options: ["a) Masjid-e-Nabvi", "b) Masjid-e-Aqsa", "c) Kaaba"], correct: "c" },
      { id: 25, part: "Islamiat & Ethics", q: "Good manners are a part of?", options: ["a) Iman", "b) Zakat", "c) Sawm"], correct: "a" },
      { id: 26, part: "Computer & General", q: "The father of modern computer science is?", options: ["a) Charles Babbage", "b) Alan Turing", "c) John Von Neumann"], correct: "b" },
      { id: 27, part: "Computer & General", q: "Who wrote 'Pakistan: A Dream Gone Sour'?", options: ["a) Fatima Bhutto", "b) Javed Jabbar", "c) Noam Chomsky"], correct: "a" },
      { id: 28, part: "Computer & General", q: "The Olympic motto is?", options: ["a) Faster, Higher, Stronger", "b) Unity in Diversity", "c) Play to Win"], correct: "a" },
      { id: 29, part: "Computer & General", q: "Bluetooth technology was named after a king of?", options: ["a) Sweden", "b) Denmark", "c) Norway"], correct: "b" },
      { id: 30, part: "Computer & General", q: "World Literacy Day is observed on?", options: ["a) 8th September", "b) 5th October", "c) 16th November"], correct: "a" }
    ]
  },

  // GRADE 9 (30 Questions)
  {
    gradeId: "grade-9",
    gradeTitle: "Grade 9",
    subject: "General Knowledge",
    duration: "30 Minutes",
    totalMarks: 30,
    questions: [
      { id: 1, part: "Pakistan Studies", q: "The Objectives Resolution was made part of 1973 Constitution as?", options: ["a) Preamble", "b) Schedule", "c) Article 2A"], correct: "a" },
      { id: 2, part: "Pakistan Studies", q: "The line that separates Pakistan and Afghanistan is called?", options: ["a) Radcliffe Line", "b) Durand Line", "c) McMahon Line"], correct: "b" },
      { id: 3, part: "Pakistan Studies", q: "Who was the first Prime Minister of Pakistan?", options: ["a) Quaid-e-Azam", "b) Liaquat Ali Khan", "c) Khawaja Nazimuddin"], correct: "b" },
      { id: 4, part: "Pakistan Studies", q: "The biggest library in Pakistan is?", options: ["a) Punjab Public Library", "b) Liaquat Memorial Library", "c) National Library Islamabad"], correct: "c" },
      { id: 5, part: "Pakistan Studies", q: "Pakistan's first satellite was launched in?", options: ["a) 1988", "b) 1990", "c) 1992"], correct: "b" },
      { id: 6, part: "Pakistan Studies", q: "The State Bank of Pakistan was inaugurated by?", options: ["a) Quaid-e-Azam", "b) Liaquat Ali Khan", "c) Sir Zafarullah Khan"], correct: "a" },
      { id: 7, part: "World & Current Affairs", q: "The headquarters of IMF is located in?", options: ["a) New York", "b) Washington D.C", "c) Geneva"], correct: "b" },
      { id: 8, part: "World & Current Affairs", q: "The longest border in the world is between?", options: ["a) USA and Canada", "b) China and Russia", "c) India and Pakistan"], correct: "a" },
      { id: 9, part: "World & Current Affairs", q: "G-7 is a group of?", options: ["a) 7 Developed Countries", "b) 7 Developing Countries", "c) 7 Muslim Countries"], correct: "a" },
      { id: 10, part: "World & Current Affairs", q: "The currency of European Union is?", options: ["a) Pound", "b) Euro", "c) Dollar"], correct: "b" },
      { id: 11, part: "World & Current Affairs", q: "Which country hosted FIFA World Cup 2022?", options: ["a) Russia", "b) Qatar", "c) Brazil"], correct: "b" },
      { id: 12, part: "World & Current Affairs", q: "The largest democracy in the world is?", options: ["a) USA", "b) India", "c) Pakistan"], correct: "b" },
      { id: 13, part: "World & Current Affairs", q: "WHO declared COVID-19 a pandemic in?", options: ["a) 2019", "b) 2020", "c) 2021"], correct: "b" },
      { id: 14, part: "Science", q: "pH value of pure water is?", options: ["a) 5", "b) 7", "c) 9"], correct: "b" },
      { id: 15, part: "Science", q: "The speed of sound in air is approximately?", options: ["a) 330 m/s", "b) 430 m/s", "c) 530 m/s"], correct: "a" },
      { id: 16, part: "Science", q: "Which blood cells fight against infection?", options: ["a) RBCs", "b) WBCs", "c) Platelets"], correct: "b" },
      { id: 17, part: "Science", q: "The chemical symbol of Gold is?", options: ["a) Ag", "b) Au", "c) Gd"], correct: "b" },
      { id: 18, part: "Science", q: "Ozone layer is present in?", options: ["a) Troposphere", "b) Stratosphere", "c) Mesosphere"], correct: "b" },
      { id: 19, part: "Science", q: "The unit of electric current is?", options: ["a) Volt", "b) Ampere", "c) Ohm"], correct: "b" },
      { id: 20, part: "Science", q: "DNA stands for?", options: ["a) Deoxyribo Nucleic Acid", "b) Di Nucleic Acid", "c) Dual Nitrogen Acid"], correct: "a" },
      { id: 21, part: "Science", q: "The hottest planet of solar system is?", options: ["a) Mercury", "b) Venus", "c) Mars"], correct: "b" },
      { id: 22, part: "Islamiat & Ethics", q: "How many Ghazwat were fought by Holy Prophet ï·º?", options: ["a) 23", "b) 27", "c) 30"], correct: "b" },
      { id: 23, part: "Islamiat & Ethics", q: "The first woman to accept Islam was?", options: ["a) Hazrat Aisha R.A", "b) Hazrat Khadija R.A", "c) Hazrat Fatima R.A"], correct: "b" },
      { id: 24, part: "Islamiat & Ethics", q: "The night of 27th Ramadan is called?", options: ["a) Shab-e-Barat", "b) Shab-e-Qadr", "c) Shab-e-Miraj"], correct: "b" },
      { id: 25, part: "Islamiat & Ethics", q: "The concept of 'Ummah' in Islam means?", options: ["a) Nation", "b) Community", "c) Mosque"], correct: "b" },
      { id: 26, part: "Computer & General", q: "1 Gigabyte equals to?", options: ["a) 1000 MB", "b) 1024 MB", "c) 2048 MB"], correct: "b" },
      { id: 27, part: "Computer & General", q: "Who is the author of 'Alchemist'?", options: ["a) Paulo Coelho", "b) Dan Brown", "c) J.K Rowling"], correct: "a" },
      { id: 28, part: "Computer & General", q: "The Nobel Prize was established by?", options: ["a) Alfred Nobel", "b) Marie Curie", "c) Albert Einstein"], correct: "a" },
      { id: 29, part: "Computer & General", q: "The largest producer of oil in the world is?", options: ["a) Saudi Arabia", "b) USA", "c) Russia"], correct: "b" },
      { id: 30, part: "Computer & General", q: "The term 'Grand Slam' is related to?", options: ["a) Cricket", "b) Tennis", "c) Golf"], correct: "b" }
    ]
  },

  // GRADE 10 / O LEVELS (30 Questions)
  {
    gradeId: "grade-10",
    gradeTitle: "Grade 10 / O Levels",
    subject: "General Knowledge",
    duration: "30 Minutes",
    totalMarks: 30,
    questions: [
      { id: 1, part: "Pakistan Studies", q: "The 1956 Constitution of Pakistan was?", options: ["a) Parliamentary", "b) Presidential", "c) Unitary"], correct: "a" },
      { id: 2, part: "Pakistan Studies", q: "Which amendment made Islam the State Religion of Pakistan?", options: ["a) 8th Amendment", "b) 9th Amendment", "c) 10th Amendment"], correct: "b" },
      { id: 3, part: "Pakistan Studies", q: "The largest industrial city of Pakistan is?", options: ["a) Lahore", "b) Karachi", "c) Faisalabad"], correct: "b" },
      { id: 4, part: "Pakistan Studies", q: "Khunjrab Pass connects Pakistan with?", options: ["a) Afghanistan", "b) China", "c) India"], correct: "b" },
      { id: 5, part: "Pakistan Studies", q: "The first female Governor of a province in Pakistan was?", options: ["a) Begum Rana Liaquat", "b) Begum Ra'ana Liaquat", "c) Dr. Fehmida Mirza"], correct: "b" },
      { id: 6, part: "Pakistan Studies", q: "SAARC was established in?", options: ["a) 1983", "b) 1985", "c) 1987"], correct: "b" },
      { id: 7, part: "World Organizations", q: "The headquarters of UNESCO is in?", options: ["a) London", "b) Paris", "c) Rome"], correct: "b" },
      { id: 8, part: "World Organizations", q: "The number of permanent members in UN Security Council is?", options: ["a) 3", "b) 5", "c) 7"], correct: "b" },
      { id: 9, part: "World Organizations", q: "The largest economy in the world is?", options: ["a) China", "b) USA", "c) Japan"], correct: "b" },
      { id: 10, part: "World Organizations", q: "NATO was founded in?", options: ["a) 1947", "b) 1949", "c) 1951"], correct: "b" },
      { id: 11, part: "World Organizations", q: "The capital of Brazil is?", options: ["a) Rio de Janeiro", "b) Sao Paulo", "c) Brasilia"], correct: "c" },
      { id: 12, part: "World Organizations", q: "The 'Silk Road' connects China with?", options: ["a) Europe", "b) Africa", "c) Australia"], correct: "a" },
      { id: 13, part: "World Organizations", q: "World Trade Organization WTO was established in?", options: ["a) 1993", "b) 1995", "c) 1997"], correct: "b" },
      { id: 14, part: "Science", q: "The chemical formula of Baking Soda is?", options: ["a) NaHCO3", "b) NaCl", "c) Na2CO3"], correct: "a" },
      { id: 15, part: "Science", q: "Which instrument measures earthquake?", options: ["a) Barometer", "b) Seismograph", "c) Thermometer"], correct: "b" },
      { id: 16, part: "Science", q: "The deficiency of Vitamin D causes?", options: ["a) Scurvy", "b) Rickets", "c) Night Blindness"], correct: "b" },
      { id: 17, part: "Science", q: "The largest part of human brain is?", options: ["a) Cerebellum", "b) Cerebrum", "c) Medulla"], correct: "b" },
      { id: 18, part: "Science", q: "Newton's 1st Law is also called?", options: ["a) Law of Acceleration", "b) Law of Inertia", "c) Law of Action Reaction"], correct: "b" },
      { id: 19, part: "Science", q: "The main component of natural gas is?", options: ["a) Methane", "b) Ethane", "c) Propane"], correct: "a" },
      { id: 20, part: "Science", q: "ECG is used to diagnose diseases of?", options: ["a) Kidney", "b) Heart", "c) Liver"], correct: "b" },
      { id: 21, part: "Science", q: "The study of universe is called?", options: ["a) Geology", "b) Cosmology", "c) Biology"], correct: "b" },
      { id: 22, part: "Islamiat & Ethics", q: "The total number of Makki Surahs in Quran are?", options: ["a) 86", "b) 90", "c) 114"], correct: "a" },
      { id: 23, part: "Islamiat & Ethics", q: "Ghazwa-e-Khandaq is also known as?", options: ["a) Battle of Trench", "b) Battle of Uhud", "c) Battle of Badr"], correct: "a" },
      { id: 24, part: "Islamiat & Ethics", q: "The 5th pillar of Islam is?", options: ["a) Salat", "b) Zakat", "c) Hajj"], correct: "c" },
      { id: 25, part: "Islamiat & Ethics", q: "'Sadaqah' means?", options: ["a) Obligatory Charity", "b) Voluntary Charity", "c) Fasting"], correct: "b" },
      { id: 26, part: "Computer & General", q: "The full form of URL is?", options: ["a) Uniform Resource Locator", "b) Universal Record Link", "c) United Research Library"], correct: "a" },
      { id: 27, part: "Computer & General", q: "Who painted 'Mona Lisa'?", options: ["a) Vincent Van Gogh", "b) Leonardo da Vinci", "c) Pablo Picasso"], correct: "b" },
      { id: 28, part: "Computer & General", q: "The Cold War was between?", options: ["a) USA and USSR", "b) USA and China", "c) UK and France"], correct: "a" },
      { id: 29, part: "Computer & General", q: "Which country won ICC Cricket World Cup 2023?", options: ["a) India", "b) Australia", "c) England"], correct: "b" },
      { id: 30, part: "Computer & General", q: "'Artificial Intelligence' was coined by?", options: ["a) Alan Turing", "b) John McCarthy", "c) Charles Babbage"], correct: "b" }
    ]
  }
];

export default function PaperPatternPage() {
  const [selectedGrade, setSelectedGrade] = useState("grade-1");
  const [searchQuery, setSearchQuery] = useState("");
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentPaper = allPapersData.find((p) => p.gradeId === selectedGrade) || allPapersData[0];

  const handleSelectOption = (qId: number, optionLetter: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [qId]: optionLetter
    }));
  };

  const handleReset = () => {
    setUserAnswers({});
    setIsSubmitted(false);
  };

  const score = Object.entries(userAnswers).reduce((acc, [qId, selectedOpt]) => {
    const q = currentPaper.questions.find((item) => item.id === Number(qId));
    if (q && q.correct === selectedOpt) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const attemptedCount = Object.keys(userAnswers).length;
  const percentage = Math.round((score / currentPaper.questions.length) * 100);

  const filteredQuestions = currentPaper.questions.filter((item) => {
    const qText = item.q.toLowerCase();
    const optText = item.options.join(" ").toLowerCase();
    const partText = item.part.toLowerCase();
    const query = searchQuery.toLowerCase().trim();
    return qText.includes(query) || optText.includes(query) || partText.includes(query);
  });

  return (
    <div className="min-h-screen bg-black text-neutral-100 font-sans selection:bg-red-600 selection:text-white pt-8 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* TOP BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-900">
          <div>
            <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-red-500 mb-2">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-red-500 font-bold uppercase tracking-widest bg-red-950/80 border border-red-900/60 px-2 py-0.5 rounded">
                MINDMORY MODEL PAPER & PRACTICE TERMINAL
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
              Official Syllabus Model Papers (Grade 1 to 10)
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/student-login"
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition shadow-lg shadow-red-600/30"
            >
              <Laptop className="w-3.5 h-3.5" />
              <span>Official Timed Test (Candidate Portal) â†’</span>
            </Link>

            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-neutral-900 hover:bg-neutral-850 border border-neutral-700 text-neutral-200 text-xs font-bold rounded-xl flex items-center gap-2 transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print A4 Paper</span>
            </button>
          </div>
        </div>

        {/* 1. CLASS SELECTION TABS */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {allPapersData.map((c) => {
            const isSelected = selectedGrade === c.gradeId;

            return (
              <button
                key={c.gradeId}
                onClick={() => {
                  setSelectedGrade(c.gradeId);
                  setUserAnswers({});
                  setIsSubmitted(false);
                  setSearchQuery("");
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]"
                    : "bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-850 hover:border-neutral-700"
                }`}
              >
                <span>{c.gradeTitle}</span>
              </button>
            );
          })}
        </div>

        {/* 2. LIVE SCORE METER & SEARCH BAR */}
        <div className="bg-neutral-950 border border-neutral-850 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-neutral-500" />
            <input
              type="text"
              placeholder={`Search in ${currentPaper.gradeTitle} questions...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black border border-neutral-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-red-600"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <div className="flex items-center gap-3 text-xs bg-black px-3.5 py-1.5 rounded-xl border border-neutral-800">
              <span className="text-neutral-400">Live Practice Score:</span>
              <span className="font-mono font-black text-green-400 text-sm">
                {score} / {currentPaper.questions.length}
              </span>
              <span className="text-[10px] text-neutral-500">
                ({attemptedCount} / {currentPaper.questions.length} Attempted)
              </span>
            </div>

            <button
              onClick={handleReset}
              className="px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-bold text-neutral-300 flex items-center gap-1.5 cursor-pointer transition"
              title="Reset practice"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* RESULT SCORECARD SUMMARY (IF USER SUBMITS PRACTICE) */}
        {isSubmitted && (
          <div className="bg-gradient-to-r from-red-950/70 via-neutral-950 to-neutral-950 border border-red-700/80 p-6 rounded-3xl space-y-3 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-950 border border-red-800 text-red-400 flex items-center justify-center font-bold">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono font-bold text-green-400 block">
                    PRACTICE PAPER EVALUATION COMPLETE
                  </span>
                  <h3 className="text-lg font-black text-white">
                    {currentPaper.gradeTitle} Result: {score} out of {currentPaper.questions.length} ({percentage}%)
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="text-xs text-neutral-400 hover:text-white underline cursor-pointer"
              >
                Close Summary
              </button>
            </div>
            <p className="text-xs text-neutral-300">
              {percentage >= 80 
                ? "ðŸŒŸ Outstanding preparation! You are ready for the National Distinction Medal."
                : percentage >= 50
                ? "ðŸ‘ Good attempt! Review the red incorrect questions below to improve your score."
                : "ðŸ“š Practice again to build speed and accuracy before official test day."}
            </p>
          </div>
        )}

        {/* 3. INTERACTIVE QUESTION PAPER */}
        <div className="bg-neutral-950 border border-neutral-850 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl text-left">
          
          <div className="border-b border-neutral-850 pb-4 text-center space-y-1">
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-wider uppercase font-mono">
              MINDMORY SCHOOL COMPETITION
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-neutral-400 pt-1 font-semibold">
              <span className="text-red-400 font-bold">{currentPaper.gradeTitle}</span>
              <span>â€¢</span>
              <span className="text-white">{currentPaper.subject}</span>
              <span>â€¢</span>
              <span>Time: {currentPaper.duration}</span>
              <span>â€¢</span>
              <span>Total Questions: {currentPaper.questions.length} (30 Marks)</span>
            </div>
            <p className="text-[11px] text-amber-400/90 pt-1">
              Instructions: Click on option (a, b, or c) to check your answer instantly. Sahi answer par Green aur ghalat par Red light hogi.
            </p>
          </div>

          {filteredQuestions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredQuestions.map((item) => {
                const selectedOpt = userAnswers[item.id];
                const isAttempted = selectedOpt !== undefined;
                const isCorrect = selectedOpt === item.correct;

                return (
                  <div 
                    key={item.id} 
                    className={`bg-black/80 border p-4 rounded-2xl space-y-3 transition ${
                      isAttempted
                        ? isCorrect
                          ? "border-green-800/80 bg-green-950/10"
                          : "border-red-800/80 bg-red-950/10"
                        : "border-neutral-850 hover:border-neutral-750"
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-[10px] font-mono uppercase font-bold text-red-400/80 bg-red-950/40 px-2 py-0.5 rounded">
                        {item.part}
                      </span>
                      <span className="text-xs font-mono font-bold text-neutral-500">
                        Q{item.id}
                      </span>
                    </div>

                    <h3 className="text-xs font-bold text-white leading-relaxed">
                      {item.id}. {item.q}
                    </h3>

                    {/* OPTIONS */}
                    <div className="space-y-1.5 text-xs pt-1">
                      {item.options.map((opt, oIdx) => {
                        const optLetter = opt.trim().charAt(0).toLowerCase();
                        const isThisSelected = selectedOpt === optLetter;
                        const isThisTheCorrectAnswer = item.correct === optLetter;

                        let buttonStyle = "bg-neutral-900/60 border-neutral-850 text-neutral-300 hover:border-neutral-700 hover:text-white";

                        if (isAttempted) {
                          if (isThisTheCorrectAnswer) {
                            buttonStyle = "bg-green-950/80 border-green-700 text-green-300 font-bold shadow-[0_0_10px_rgba(34,197,94,0.3)]";
                          } else if (isThisSelected && !isCorrect) {
                            buttonStyle = "bg-red-950/80 border-red-700 text-red-300 line-through";
                          } else {
                            buttonStyle = "bg-neutral-950/40 border-neutral-900 text-neutral-600";
                          }
                        }

                        return (
                          <button
                            key={oIdx}
                            type="button"
                            onClick={() => handleSelectOption(item.id, optLetter)}
                            className={`w-full text-left px-3 py-2 rounded-xl border transition cursor-pointer flex items-center justify-between text-xs ${buttonStyle}`}
                          >
                            <span>{opt}</span>
                            {isAttempted && isThisTheCorrectAnswer && (
                              <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                            )}
                            {isAttempted && isThisSelected && !isCorrect && (
                              <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {isAttempted && (
                      <div className="pt-2 border-t border-neutral-900 flex items-center justify-between text-[11px] font-mono">
                        {isCorrect ? (
                          <span className="text-green-400 font-bold">âœ“ Correct Answer!</span>
                        ) : (
                          <span className="text-red-400">
                            âœ— Incorrect. Correct is: <strong className="text-green-400 uppercase">({item.correct})</strong>
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 text-neutral-500 text-xs">
              No questions found matching "{searchQuery}".
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-neutral-900">
            <button
              type="button"
              onClick={() => { setIsSubmitted(true); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="w-full sm:w-auto px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition cursor-pointer shadow-lg shadow-green-600/30 flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Submit & View Practice Result Card</span>
            </button>

            <Link
              href="/student-login"
              className="text-xs text-neutral-400 hover:text-red-400 font-bold underline"
            >
              Ready for Official Exam? Enter Candidate Portal â†’
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}

