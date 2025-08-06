const sportFacility = {
    name_facility: 'Recreo y Deporte Amazonas',
    address: 'Amazonas 123, Barranquilla Av. Centenario',
    calification: 4,
    like: 124,
    phone: '+51 925 075 598',
    website: 'www.recreoamazonas.com',
    description: 'Recreo Amazonas es un establecimiento deportivo que brinda servicios de deportes en la ciudad de Barranquilla. Cancha de fútbol profesional con césped sintético de última generación. Perfecta para partidos de fútbol 11, entrenamientos y eventos deportivos. Cuenta con iluminación LED, vestuarios equipados, estacionamiento y área de espectadores techada. Ofrece also servicios de entrenamiento personalizado y eventos deportivos para diferentes edades y niveles de experiencia.',
    hours: [
        {
            days: 'Lunes - Viernes',
            hour: '10:00 - 18:00'
        },
        {
            days: 'Sábado - Domingo',
            hour: '10:00 - 22:00'
        }
    ],
    general_characteristics: [
        'Iluminación LED',
        ' ji edue ewvu  fewv ebfhe fe fhue fuVestuarios',
        'Estacionamiento',
        'Escenario',
        'Restaurante'
    ],
    spaces: [
        {
            type: 'Fútbol',
            dimensions: '100m x 60m',
            name: 'Cancha de fútbol',
            capacity: 10,
            surface_type: 'Césped sintético',
            equipment: [
                'Balón de fútbol',
                'Portería',
                'Redes',
                'Canastas'
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
            type: 'Baloncesto',
            dimensions: '30m x 15m',
            name: 'Cancha de baloncesto',
            capacity: 12,
            surface_type: 'Césped sintético',
            equipment: [
                'Balón de baloncesto',
                'Redes',
                'Canastas'
            ],
            gallery: [
                'https://imagenes.elpais.com/resizer/v2/MNSR6SIYBBCQM72V5DHKPGRIOI.jpg?auth=c1cb56c78d08926fa69eb360408c8fd819db75cb99afcc8a7e274566f60a8ed3&width=1960&height=1470&focal=2612%2C1589',
                'https://img.olympics.com/images/image/private/t_16-9_640/f_auto/v1538355600/primary/i1hfk2awwhpojt2t7pcr',
                'https://medac.es/sites/default/files/blog/destacadas/posiciones-baloncesto.jpg'
            ]
        },
        {
            type: 'Piscina',
            dimensions: '20m x 10m',
            name: 'Piscina',
            capacity: 20,
            surface_type: 'Loza',
            equipment: [
                'Pistola',
                'Bomba',
                'Canchas'
            ],
            gallery: [
                'https://larepublica.cronosmedia.glr.pe/original/2023/12/27/658c9495df259622a358bf12.jpg',
                'https://fomentogestion.com/wp-content/uploads/2024/08/Diseno-sin-titulo-502.jpg',
                'https://quillabamba.travel/wp-content/uploads/2024/07/piscina-de-sambaray-quillabamba-1024x576.jpg',
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