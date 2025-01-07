// /utils/data/moodData.js
const moodData = [
  {
    id: 1,
    userMoods: ["HAPPY"], // ör: "Harika" hissediyorsak HAPPY
    description: "Harika, kendimi iyi hissediyorum",
    logDateTime: "2024-12-01T09:00:00", // Saat 09:00
    // moodOwner: 101, // İsterseniz userId şeklinde tutabilirsiniz
  },
  {
    id: 2,
    userMoods: ["NEUTRAL"],
    description: "Daha iyi olabilirdi",
    logDateTime: "2024-12-02T14:30:00",
  },
  {
    id: 3,
    userMoods: ["SAD"],
    description: "İyi değilim",
    logDateTime: "2024-12-03T20:00:00",
  },
  {
    id: 4,
    userMoods: ["HAPPY"],
    description: "Harika, kendimi iyi hissediyorum",
    logDateTime: "2024-12-04T11:15:00",
  },
];

export default moodData;
