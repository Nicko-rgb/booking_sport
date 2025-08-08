const sportFacility = {
    id: 1,
    name_facility: 'Recreo y Deporte Amazonas',
    address: 'Amazonas 123, Barranquilla Av. Centenario',
    calification: 4.8,
    like: 234,
    phone: '+51 925 075 598',
    website: 'www.recreoamazonas.com',
    description: 'Recreo Amazonas es un establecimiento deportivo que brinda servicios de deportes en la ciudad de Barranquilla. Cancha de fútbol profesional con césped sintético de última generación. Perfecta para partidos de fútbol 11, entrenamientos y eventos deportivos. Cuenta con iluminación LED, vestuarios equipados, estacionamiento y área de espectadores techada. Ofrece servicios de entrenamiento personalizado y eventos deportivos para diferentes edades y niveles de experiencia.',
    prices: ['$100', '$200'],

    hours: [
        {
            days: 'Lunes - Viernes',
            hour: '6:00 AM - 11:00 PM'
        },
        {
            days: 'Sábados - Domingos',
            hour: '7:00 AM - 12:00 AM'
        }
    ],
    general_characteristics: [
        'Iluminación LED',
        'Vestuarios',
        'Estacionamiento',
        'Escenario',
        'Restaurante',
        'Parking',
        'Gradas para 50 personas'
    ],
    sports_available: [
        {
            sport_type: 'Fútbol',
            spaces: [
                {
                    id: 'futbol-1',
                    name: 'Cancha de Fútbol #1 "El Verde"',
                    dimensions: '100m x 60m',
                    capacity: 22,
                    surface_type: 'Césped sintético',
                    price_per_hour: 80,
                    available: true,
                    equipment: [
                        'Balones de fútbol',
                        'Porterías profesionales',
                        'Redes',
                        'Conos de entrenamiento'
                    ],
                    features: [
                        'Iluminación LED',
                        'Vestuarios',
                        'Gradas para 50 personas'
                    ],
                    gallery: [
                        'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop',
                        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
                        'https://www.parqueygrama.com/wp-content/uploads/2019/04/tipos-de-canchas-cancha-de-futbol.jpg',
                        'https://mx.habcdn.com/photos/project/medium/canchas-deportivas-pasto-sintetico-183506.jpg',
                        'https://alfombras.net.pe/wp-content/uploads/2025/02/grass-sintetico-deportivo.jpg',
                        'https://portaljesusmaria.com/wp-content/uploads/2024/08/campo-deportivo-canchas-de-grass-sintetico-768x1000.jpg'
                    ]
                },
                {
                    id: 'futbol-2',
                    name: 'Cancha de Fútbol #2 "La Roja"',
                    dimensions: '90m x 50m',
                    capacity: 18,
                    surface_type: 'Césped sintético',
                    price_per_hour: 70,
                    available: true,
                    equipment: [
                        'Balones de fútbol',
                        'Porterías',
                        'Redes',
                        'Bancos de suplentes'
                    ],
                    features: [
                        'Iluminación LED',
                        'Vestuarios compartidos'
                    ],
                    gallery: [
                        'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop',
                        'https://mx.habcdn.com/photos/project/medium/canchas-deportivas-pasto-sintetico-183506.jpg'
                    ]
                }
            ]
        },
        {
            sport_type: 'Vóley',
            spaces: [
                {
                    id: 'voley-1',
                    name: 'Cancha de Vóley #1',
                    dimensions: '18m x 9m',
                    capacity: 12,
                    surface_type: 'Piso sintético',
                    price_per_hour: 50,
                    available: true,
                    equipment: [
                        'Red de vóley',
                        'Balones de vóley',
                        'Postes ajustables'
                    ],
                    features: [
                        'Piso antideslizante',
                        'Iluminación LED'
                    ],
                    gallery: [
                        'https://imagenes.elpais.com/resizer/v2/MNSR6SIYBBCQM72V5DHKPGRIOI.jpg?auth=c1cb56c78d08926fa69eb360408c8fd819db75cb99afcc8a7e274566f60a8ed3&width=1960&height=1470&focal=2612%2C1589',
                        'https://img.olympics.com/images/image/private/t_16-9_640/f_auto/v1538355600/primary/i1hfk2awwhpojt2t7pcr'
                    ]
                }
            ]
        },
        {
            sport_type: 'Piscina',
            spaces: [
                {
                    id: 'piscina-1',
                    name: 'Piscina Olímpica',
                    dimensions: '50m x 25m',
                    capacity: 30,
                    surface_type: 'Azulejo',
                    price_per_hour: 120,
                    available: true,
                    equipment: [
                        'Carriles de natación',
                        'Bloques de salida',
                        'Salvavidas'
                    ],
                    features: [
                        'Agua climatizada',
                        'Vestuarios con duchas',
                        'Área de descanso'
                    ],
                    gallery: [
                        'https://larepublica.cronosmedia.glr.pe/original/2023/12/27/658c9495df259622a358bf12.jpg',
                        'https://fomentogestion.com/wp-content/uploads/2024/08/Diseno-sin-titulo-502.jpg',
                        'https://quillabamba.travel/wp-content/uploads/2024/07/piscina-de-sambaray-quillabamba-1024x576.jpg'
                    ]
                },
                {
                    id: 'piscina-2',
                    name: 'Piscina Recreativa',
                    dimensions: '20m x 10m',
                    capacity: 20,
                    surface_type: 'Azulejo',
                    price_per_hour: 80,
                    available: false,
                    equipment: [
                        'Juegos acuáticos',
                        'Flotadores',
                        'Salvavidas'
                    ],
                    features: [
                        'Área para niños',
                        'Tobogán',
                        'Zona de descanso'
                    ],
                    gallery: [
                        'https://larepublica.cronosmedia.glr.pe/original/2023/12/27/658c9495df259622a358bf12.jpg',
                        'https://fomentogestion.com/wp-content/uploads/2024/08/Diseno-sin-titulo-502.jpg'
                    ]
                }
            ]
        }
    ]
}


const reviews = [
        {
            name: 'Juan',
            calification: 5,
            date: '2023-01-15',
            opinion: 'Excelente lugar para jugar'
        },
        {
            name: 'María',
            calification: 4,
            date: '2023-02-20',
            opinion: 'Buena atmósfera'
        },
        {
            name: 'Diana',
            calification: 3,
            date: '2023-03-10',
            opinion: 'Lugar muy bien equipado'
        }
    ]

export { sportFacility, reviews };