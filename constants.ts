import { Course, ExerciseStatus, User } from './types';

export const MOCK_USER: User = {
  name: "Alex Ramirez",
  nickname: "CyberAlex_99",
  email: "alex.developer@university.edu",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  frame: 'frame_gold',
  isPublic: false, // Default to anonymous
  level: 12,
  streak: 5,
  streakHistory: [
    '2023-10-24', '2023-10-25', '2023-10-26', '2023-10-27', '2023-10-28' // Assume current date context
  ],
  xp: 1250,
  bio: "Estudiante de Ingeniería de Software apasionado por el desarrollo backend y la inteligencia artificial. Siempre buscando aprender nuevas tecnologías.",
  joinDate: "Septiembre 2023",
  achievements: [
    { id: 'a1', name: 'Primeros Pasos', icon: '🚀', description: 'Completaste tu primer ejercicio', date: '2023-09-10' },
    { id: 'a2', name: 'Racha de Fuego', icon: '🔥', description: 'Mantuviste una racha de 3 días', date: '2023-10-05' },
    { id: 'a3', name: 'Pythonista', icon: '🐍', description: 'Completaste el módulo de Python básico', date: '2023-11-20' },
    { id: 'a4', name: 'Madrugador', icon: '🌅', description: 'Resolviste un ejercicio antes de las 8 AM', date: '2024-01-15' }
  ],
  inventory: [
    { id: 'av_1', name: 'Default', type: 'avatar', preview: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', unlocked: true, requiredLevel: 1 },
    { id: 'av_2', name: 'Hacker', type: 'avatar', preview: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix', unlocked: true, requiredLevel: 5 },
    { id: 'av_3', name: 'Robot', type: 'avatar', preview: 'https://api.dicebear.com/7.x/bottts/svg?seed=Zack', unlocked: false, requiredLevel: 15 },
    { id: 'frame_none', name: 'Sin Marco', type: 'frame', preview: 'border-transparent', unlocked: true, requiredLevel: 1 },
    { id: 'frame_blue', name: 'Novato Azul', type: 'frame', preview: 'border-blue-400', unlocked: true, requiredLevel: 2 },
    { id: 'frame_gold', name: 'Oro Legendario', type: 'frame', preview: 'border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.6)]', unlocked: true, requiredLevel: 10 },
    { id: 'frame_neon', name: 'Cyber Neon', type: 'frame', preview: 'border-purple-500 shadow-[0_0_10px_#a855f7]', unlocked: false, requiredLevel: 20 },
  ]
};

export const MOCK_COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Fundamentos de Python',
    description: 'Aprende la sintaxis básica y estructuras de control.',
    progress: 75,
    icon: 'Python',
    totalExercises: 20,
    completedExercises: 15,
    exercises: [
      {
        id: 'e1',
        title: 'Variables y Tipos',
        description: 'Declara variables enteras y de texto.',
        fullDescription: 'En este ejercicio, debes declarar una variable llamada `edad` con valor 25 y una variable `nombre` con tu nombre. Luego imprime ambas.',
        status: ExerciseStatus.COMPLETED,
        difficulty: 'Fácil',
        initialCode: '# Escribe tu código aquí\n\n'
      },
      {
        id: 'e2',
        title: 'Bucles For',
        description: 'Itera sobre una lista de números.',
        fullDescription: 'Usa un bucle for para imprimir los números del 1 al 10. Asegúrate de incluir el 10.',
        status: ExerciseStatus.ATTEMPTED,
        difficulty: 'Fácil',
        initialCode: '# Itera del 1 al 10\nfor i in range(1, 11):\n    pass'
      },
      {
        id: 'e3',
        title: 'List Comprehensions',
        description: 'Crea listas de forma concisa.',
        fullDescription: 'Crea una lista con los cuadrados de los números pares del 0 al 20 usando list comprehension.',
        status: ExerciseStatus.PENDING,
        difficulty: 'Medio',
        initialCode: 'numeros = []\n# Tu código aquí'
      }
    ]
  },
  {
    id: 'c2',
    title: 'Algoritmos y Estructuras',
    description: 'Domina arrays, listas enlazadas y árboles.',
    progress: 30,
    icon: 'Binary',
    totalExercises: 15,
    completedExercises: 4,
    exercises: [
      {
        id: 'e4',
        title: 'Invertir Array',
        description: 'Invierte el orden de los elementos.',
        fullDescription: 'Dado un array de enteros, devuelve un nuevo array con los elementos en orden inverso sin usar métodos nativos de reversión.',
        status: ExerciseStatus.COMPLETED,
        difficulty: 'Medio',
        initialCode: 'def invertir_array(arr):\n    return []'
      },
      {
        id: 'e5',
        title: 'Búsqueda Binaria',
        description: 'Encuentra elementos eficientemente.',
        fullDescription: 'Implementa el algoritmo de búsqueda binaria para encontrar un número `target` en una lista ordenada.',
        status: ExerciseStatus.PENDING,
        difficulty: 'Difícil',
        initialCode: 'def busqueda_binaria(lista, target):\n    pass'
      }
    ]
  },
  {
    id: 'c3',
    title: 'Desarrollo Web con React',
    description: 'Construye interfaces modernas.',
    progress: 10,
    icon: 'React',
    totalExercises: 10,
    completedExercises: 1,
    exercises: [
      {
        id: 'e6',
        title: 'Componente Botón',
        description: 'Crea un componente reutilizable.',
        fullDescription: 'Crea un componente funcional `Button` que acepte una prop `label` y `onClick`.',
        status: ExerciseStatus.PENDING,
        difficulty: 'Fácil',
        initialCode: 'import React from "react";\n\nexport const Button = () => {\n  return <button></button>;\n}'
      }
    ]
  }
];