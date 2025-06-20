// Datos de ejemplo para las nuevas habilidades matemáticas
export const timeSeriesData = {
  labels: ['01/07', '05/07', '10/07', '15/07', '20/07', '25/07', '30/07'],
  datasets: [
    {
      label: 'Ana',
      data: [68, 70, 72, 74, 76, 78, 80],
      borderColor: '#8B5CF6',
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
      tension: 0.4,
    },
    {
      label: 'Carlos',
      data: [48, 50, 51, 53, 54, 57, 60],
      borderColor: '#06B6D4',
      backgroundColor: 'rgba(6, 182, 212, 0.1)',
      tension: 0.4,
    },
  ],
};

export const radarSkillsData = {
  labels: [
    'Reconocimiento de Números',
    'Conteo y Cantidad',
    'Comparación',
    'Formas Geométricas',
    'Patrones y Secuencias'
  ],
  datasets: [
    {
      label: 'Ana',
      data: [80, 78, 75, 82, 70],
      backgroundColor: 'rgba(139, 92, 246, 0.2)',
      borderColor: '#8B5CF6',
      borderWidth: 2,
    },
    {
      label: 'Carlos',
      data: [65, 60, 58, 62, 55],
      backgroundColor: 'rgba(6, 182, 212, 0.2)',
      borderColor: '#06B6D4',
      borderWidth: 2,
    },
  ],
};

export const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
  },
  scales: {
    r: {
      beginAtZero: true,
      max: 100,
      ticks: {
        stepSize: 20,
      },
    },
  },
};

// Datos de ejemplo para los niños con las nuevas habilidades
export const sampleChildren = [
  {
    id: 1,
    name: 'Ana',
    age: '6-7 años',
    avatar: '/avatars/ana.png',
    skills: {
      numberRecognition: 80,
      counting: 78,
      comparison: 75,
      shapes: 82,
      patterns: 70
    }
  },
  {
    id: 2,
    name: 'Carlos',
    age: '5-6 años',
    avatar: '/avatars/carlos.png',
    skills: {
      numberRecognition: 65,
      counting: 60,
      comparison: 58,
      shapes: 62,
      patterns: 55
    }
  }
];

// Configuraciones específicas para gráficos
export const lineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: 'Evolución de las puntuaciones en los últimos 30 días'
    },
    legend: {
      position: 'bottom',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 100,
      ticks: {
        stepSize: 10,
      },
    },
  },
};

export const radarChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: 'Visualización de todas las áreas matemáticas'
    },
    legend: {
      position: 'bottom',
    },
  },
  scales: {
    r: {
      beginAtZero: true,
      max: 100,
      ticks: {
        stepSize: 20,
        display: true,
      },
      pointLabels: {
        font: {
          size: 12,
        },
      },
    },
  },
};