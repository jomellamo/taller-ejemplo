import { Course, ExerciseStatus } from './types';

export const MOCK_USER = {
  name: "Alex Dev",
  avatar: "https://picsum.photos/200",
  level: 12,
  streak: 5
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