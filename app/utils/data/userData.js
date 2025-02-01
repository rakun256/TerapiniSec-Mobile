// app/utils/data/usersData.js
export const usersData = [
    {
      id: 1,
      userName: "emreuslu",
      firstName: "Emre",
      lastName: "Uslu",
      birthday: "2004-10-01",
      phoneNumber: "+905380412101",
      email: "emreuslu256@gmail.com",
      password: "ecemiseviyorum", // Gerçek bir projede bu şifreleri şifrelenmiş olarak saklamalısın.
      userRole: "ADMIN",
      registrationDateTime: "2025-01-01T10:00:00Z",
      lastLoginDateTime: "2025-01-30T18:30:00Z",
      isPremium: true,
      premiumStartDateTime: "2025-01-01T10:00:00Z",
      premiumEndDateTime: null,
      specializations: [],
      yearsOfExperience: null,
      availableTimes: []
    },
    {
      id: 2,
      userName: "ecemnurozen",
      firstName: "Ecem",
      lastName: "Özen",
      birthday: "2004-03-03",
      phoneNumber: "+905511763115",
      email: "ecemnurozen03@gmail.com",
      password: "emreyiseviyorum",
      userRole: "ADMIN",
      registrationDateTime: "2025-01-02T12:00:00Z",
      lastLoginDateTime: "2025-01-30T19:00:00Z",
      isPremium: true,
      premiumStartDateTime: "2025-01-05T00:00:00Z",
      premiumEndDateTime: "2026-01-05T00:00:00Z",
      specializations: [],
      yearsOfExperience: null,
      availableTimes: ["2025-02-01T10:00:00Z", "2025-02-01T14:00:00Z"]
    },
    {
      id: 3,
      userName: "rabia_dogan",
      firstName: "Rabia",
      lastName: "Doğan",
      birthday: "1998-11-25",
      phoneNumber: "+905555555557",
      email: "rabia@example.com",
      password: "hashedpassword3",
      userRole: "ADMIN",
      registrationDateTime: "2024-12-01T09:00:00Z",
      lastLoginDateTime: "2025-01-28T16:00:00Z",
      isPremium: false,
      premiumStartDateTime: null,
      premiumEndDateTime: null,
      specializations: [],
      yearsOfExperience: null,
      availableTimes: []
    }
  ];
  