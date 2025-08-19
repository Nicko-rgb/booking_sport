// Datos simulados para las reservas del usuario
export const activeReservations = [
  {
    id: 'RES001',
    facility: 'Cancha de Fútbol A',
    sport: 'Fútbol',
    date: '2024-01-15',
    time: '18:00 - 20:00',
    duration: '2 horas',
    price: 50000,
    status: 'confirmada',
    location: 'Complejo Deportivo Central',
    participants: 10,
    paymentStatus: 'pagado'
  },
  {
    id: 'RES002',
    facility: 'Cancha de Tenis 2',
    sport: 'Tenis',
    date: '2024-01-18',
    time: '16:00 - 17:30',
    duration: '1.5 horas',
    price: 35000,
    status: 'confirmada',
    location: 'Club Deportivo Norte',
    participants: 2,
    paymentStatus: 'pagado'
  },
  {
    id: 'RES003',
    facility: 'Cancha de Básquet B',
    sport: 'Básquetbol',
    date: '2024-01-20',
    time: '20:00 - 22:00',
    duration: '2 horas',
    price: 45000,
    status: 'confirmada',
    location: 'Polideportivo Sur',
    participants: 8,
    paymentStatus: 'pagado'
  }
]

export const pendingReservations = [
  {
    id: 'RES004',
    facility: 'Cancha de Vóley A',
    sport: 'Vóleibol',
    date: '2024-01-22',
    time: '19:00 - 21:00',
    duration: '2 horas',
    price: 40000,
    status: 'pendiente_pago',
    location: 'Centro Deportivo Este',
    participants: 6,
    paymentStatus: 'pendiente',
    deadline: '2024-01-16 23:59'
  },
  {
    id: 'RES005',
    facility: 'Cancha de Fútbol C',
    sport: 'Fútbol',
    date: '2024-01-25',
    time: '17:00 - 19:00',
    duration: '2 horas',
    price: 55000,
    status: 'pendiente_confirmacion',
    location: 'Estadio Municipal',
    participants: 12,
    paymentStatus: 'reservado',
    deadline: '2024-01-17 12:00'
  }
]

export const reservationHistory = [
  {
    id: 'RES_H001',
    facility: 'Cancha de Tenis 1',
    sport: 'Tenis',
    date: '2024-01-05',
    time: '15:00 - 16:30',
    duration: '1.5 horas',
    price: 35000,
    status: 'completada',
    location: 'Club Deportivo Norte',
    participants: 2,
    rating: 5,
    review: 'Excelente cancha, muy bien mantenida'
  },
  {
    id: 'RES_H002',
    facility: 'Cancha de Fútbol B',
    sport: 'Fútbol',
    date: '2024-01-02',
    time: '19:00 - 21:00',
    duration: '2 horas',
    price: 48000,
    status: 'completada',
    location: 'Complejo Deportivo Central',
    participants: 10,
    rating: 4,
    review: 'Buena experiencia, recomendado'
  },
  {
    id: 'RES_H003',
    facility: 'Cancha de Básquet A',
    sport: 'Básquetbol',
    date: '2023-12-28',
    time: '18:00 - 20:00',
    duration: '2 horas',
    price: 42000,
    status: 'cancelada',
    location: 'Polideportivo Sur',
    participants: 8,
    cancelReason: 'Lluvia intensa'
  },
  {
    id: 'RES_H004',
    facility: 'Cancha de Vóley B',
    sport: 'Vóleibol',
    date: '2023-12-20',
    time: '20:00 - 22:00',
    duration: '2 horas',
    price: 38000,
    status: 'completada',
    location: 'Centro Deportivo Este',
    participants: 6,
    rating: 5,
    review: 'Perfecta para nuestro grupo'
  },
  {
    id: 'RES_H005',
    facility: 'Cancha de Fútbol A',
    sport: 'Fútbol',
    date: '2023-12-15',
    time: '16:00 - 18:00',
    duration: '2 horas',
    price: 50000,
    status: 'completada',
    location: 'Complejo Deportivo Central',
    participants: 11,
    rating: 4,
    review: 'Muy buena cancha, volveremos'
  }
]

export const userPreferences = {
  notifications: {
    email: true,
    sms: false,
    push: true,
    reminders: {
      beforeReservation: '2 horas',
      paymentDeadline: '24 horas'
    }
  },
  favoriteLocations: [
    'Complejo Deportivo Central',
    'Club Deportivo Norte'
  ],
  preferredTimes: [
    '18:00 - 20:00',
    '19:00 - 21:00'
  ],
  privacy: {
    showProfile: true,
    shareStats: false,
    allowInvitations: true
  },
  paymentMethods: [
    {
      id: 'card_001',
      type: 'Tarjeta de Crédito',
      last4: '4532',
      brand: 'Visa',
      isDefault: true
    },
    {
      id: 'card_002',
      type: 'Tarjeta de Débito',
      last4: '8765',
      brand: 'Mastercard',
      isDefault: false
    }
  ]
}