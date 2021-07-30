// ----- IMPORTANTE -----

// IMPORTANTE!: Para este checkpoint tendrán en el archivo DS.js las implementaciones ya realizadas en las
// homeworks de Queue, LinkedLis y BinarySearchTree. Sobre dicha implementación van a tener que agregar nuevos
// métodos o construir determinadas funciones explicados más abajo. Pero todos los métodos ya implementados
// en las homeowrks no es necesario que los vuelvan a definir.
// NO DEBEN MODIFICAR EL ARCHIVO DS.js SINO QUE TODO SU CÓDIGO TENDRÁ QUE ESTAR EN ESTE ARCHIVO checkpoint.js

const { Queue, Node, LinkedList, BinarySearchTree } = require("./DS.js");

// ----------------------

// ----- Recursión -----

// EJERCICIO 1
// Implementar la función isAncestor: debe determinar si dado dos nombres de personas las mismas
// son parientes o no (La primera debe ser ancestro de la segunda). La función recibira un objeto
// que va a representar sólo la parte femenina del "arbol genealogico" familiar y será de la siguiente forma:
// const genealogyTree = {
//   "Mona Simpson": [],
//   "Marge Simpson": ["Lisa Simpson", "Maggie Simpson"],
//   "Jacqueline Bouvier": [ "Patty Bouvier", "Marge Simpson", "Selma Bouvier"],
//   "Patty Bouvier": [],
//   "Selma Bouvier": ["Ling Bouvier"],
//   "Edwina": ["Abigail Simpson"],
//   "Lisa Simpson": [],
//   "Maggie Simpson": [],
//   "Ling Bouvier": []
// }
// Ejemplo:
//  - Caso que devuelve true --> isAncestor(genealogyTree, "Jacqueline Bouvier", "Maggie Simpson")
//  - Caso que devuelve false --> isAncestor(genealogyTree, "Jacqueline Bouvier", "Abigail Simpson")
//  [Observar los tests para otros casos]

var isAncestor = function (genealogyTree, ancestor, descendant) {
  // Tu código aca:
  let encontro;
  let arrayAnc = genealogyTree[ancestor];
  if (arrayAnc.length > 0) {
    for (let i = 0; i < arrayAnc.length; i++) {
      if (arrayAnc[i] === descendant) {
        return true;
      } else {
        encontro = isAncestor(genealogyTree, arrayAnc[i], descendant);
        if (encontro) break;
      }
    }
  } else {
    return false;
  }
  return encontro;
};

// EJERCICIO 2
// Secuencia inventada: f(n) = f(n-1) x f(n-2) - f(n-2)
// Siendo f, secuenciaHenry.
// Donde las primeras dos posiciones son dadas por el parametro recibidos y a partir de
// la siguiente se calcula como la multiplicación de los 2 números anteriores restados al número anterior.
// object es un objeto del cual debemos obtener f(0) y f(1) siguiendo la siguiente lógica:
// f(0) será el valor de la propiedad llamada 'first'
// f(1) será un número igual a la cantidad de propiedades de obj
// Por ejemplo si recibimos:
// var obj = {
//   1: true,
//   first: 2,
//   7: ['F','r','a','n','c','o!'],
//   h: {a: 1},
//   z: [],
//   a: 1,
//   b: 2,
//   c: 3,
//   d: 4
// }
// deberíamos tener los siguientes 2 valores iniciales
// secuenciaHenry(0) = 2 y secuenciaHenry(1) = 9
// A partir de ahí la tercera posición sería  9 x 2 - 2 = 16 y así sucesivamente
// La función secuenciaHenry debe devolver el enésimo numero de la serie, por ejemplo para el objeto
// antes mencionado:
// secuencia: 2, 9, 16, 135, 2144, 289305
// secuenciaHenry(0) // 2  ya que el elemento de la posición 0 es cero
// secuenciaHenry(1) // 9 ya que el elemento de la posición 1 es 1
// secuenciaHenry(5) // 289305 ya que el elemento de la posición 5 es 289305
// Para números negativos de n debe devolver null
// PISTA: Pueden utilizar el método Object.keys() para f(1)

function cantidadProp(obj) {
  let cont = 0;
  for (const key in obj) {
    cont++;
  }
  return cont;
}

function secuenciaHenry(obj, n) {
  // Tu código aca:
  let f0 = obj.first;
  let f1 = cantidadProp(obj);
  if (n == 0) {
    return f0;
  }
  if (n === 1) {
    return f1;
  }
  if (n < 0) {
    return null;
  }
  let subTotal = f1;
  for (let i = 2; i <= n; i++) {
    subTotal = f0 * f1;
    subTotal = subTotal - f0;
    f0 = f1;
    f1 = subTotal;
  }
  return subTotal;
}

// ---------------------

// ----- LinkedList -----

// EJERCICIO 3
// Implementar el método size dentro del prototype de LinkedList que deberá retornar el tamaño actual de
// la LinkedList. En el caso de que la lista se encuentre vacía deberá retornar cero.
// Ejemplo:
//    var lista = new LinkedList();
//    lista.size(); --> 0
//    lista.add(1);
//    lista.size(); --> 1
//    lista.add(2);
//    lista.add(3);
//    lista.size(); --> 3

LinkedList.prototype.size = function () {
  // Tu código aca:
  let cont = 0;
  let current = this.head;
  if (!current) {
    return 0;
  }
  while (current) {
    cont++;
    current = current.next;
  }
  return cont;
};

// EJERCICIO 4
// Implementar el método switchPos dentro del prototype de LinkedList que deberá intercambiar
// el elemento que se encuentre en pos1 con el elemento en pos2
// En el caso de que alguna de las dos posiciones no sea válida (Supere el tamaño de la lista actual
// o sea un número negativo) debe devolver false.
// Si los nodos fueron removidos correctamente devolver true.
// Aclaración: la posición cero corresponde al head de la LinkedList
// Ejemplo 1:
//    Suponiendo que la lista actual es: Head --> [1] --> [2] --> [3] --> [4] --> [5]
//    lista.switchPos(1,3);
//    Ahora la lista quedaría: Head --> [1] --> [4] --> [3] --> [2] --> [5]
//    y la función debería haber devuelto true
// Ejemplo 2:
//    Suponiendo que se pide una posición inválida: removeFromPos(8) --> false

function valorPos(current, pos1, pos2) {
  let cont = 0;
  let arrayValores = [];
  while (current) {
    if (cont === pos1 || cont === pos2) {
      arrayValores.push(current.value);
    }
    current = current.next;
    cont++;
  }
  return arrayValores;
}
LinkedList.prototype.switchPos = function (pos1, pos2) {
  // Tu código aca:
  let current = this.head;
  let _length = this.size() - 1;
  let cont = 0;
  if (pos1 < 0 || pos2 > _length) {
    return false;
  }
  let valores = valorPos(current, pos1, pos2);
  while (current) {
    if (cont === pos1) {
      current.value = valores[1];
    }
    if (cont === pos2) {
      current.value = valores[0];
      return true;
    }
    cont++;
    current = current.next;
  }
};

// EJERCICIO 5
// Implementar la función mergeLinkedLists que, a partir de dos listas simplemente enlazadas
// del mismo tamaño retorne una nueva lista con los elementos de ambas listas
// Ejemplo:
//    Lista 1: Head --> 1 --> 7 --> 20 --> null
//    Lista 2: Head --> 4 --> 13 --> 2 --> null
//    Lista nueva luego de aplicar mergeLinkedLists:
//             Head --> 1 --> 4 --> 7 --> 13 --> 20 --> 2 --> null
// Nota: las listas enlazadas mergeadas intercalandose.
// El nodo 1 de la lista 1, se conecta con el nodo 1 de la lista 2.
// Continuando con el nodo 2 de la lista 2, conectandose con el nodo 2 de la lista 2.
var mergeLinkedLists = function (linkedListOne, linkedListTwo) {
  // Tu código aca:
  let newLista = new LinkedList();

  let oneCurrent = linkedListOne.head;
  let twoCurrent = linkedListTwo.head;

  while (oneCurrent && twoCurrent) {
    newLista.add(oneCurrent.value);
    newLista.add(twoCurrent.value);

    oneCurrent = oneCurrent.next;
    twoCurrent = twoCurrent.next;
  }
  return newLista;
};

// ----------------------

// ----- QUEUE -----

// EJERCICIO 6
// Implementar la función cardGame: a partir de dos Queues que va a recibir como paráemtro que
// van a representar mazos de cartas de dos jugadores debemos determinar quien va a ser el ganador
// de este juego que va a tener la siguiente dinámica:
// - Los jugadores tendrán que defender su "Castillo" que contiene un total de 100 puntos de resistencia
// - Cada carta tendrá puntos de ataque (attack) y puntos de defensa (defense)
// - Ambos jugadores van a sacar las dos primeras cartas de su mazo
//      * La primera carta será su carta asignada para atacar
//      * La segunda carta será su carta asignada para defender
// - La carta asignada para atacar del jugador uno se enfrentará contra la carta asignada para defender
//   del jugador dos y viceversa. Si el ataque supera los puntos de defensa el daño sobrante será aplicado
//   sobre el castillo.
// - El juego finaliza cuando alguno de los dos castillos se quede sin puntos de resistencia o cuando los mazos
//   se acaben. En este último caso ganará aquel jugador que tenga mayor cantidad de puntos de resistencia
//   restantes en su castillo.
// La función deberá devolver un string indicando al ganador: 'PLAYER ONE' o 'PLAYER TWO' (Respetar mayúsculas) o
// 'TIE' en el caso de empate
// NOTA: Ambos mazos contienen la misma cantidad de cartas
//
// Ejemplo:
// Los jugadores levantan 2 cartas cada uno.
// La primera carta del jugador uno va a atacar a la segunda carta del jugador dos
// La primer carta del jugador dos va a atacar a la segunda carta del jugador uno
//
// Primer carta del jugador 1 (ATAQUE) vs Segunda carta del jugador 2 (DEFENSA):
// {attack: 5, defense: 5} vs {attack: 5, defense: 26}
// Ataque 5 vs Defensa 20 --> 5 no supera 20 --> No hay daño sobre el castillo
//
// Primer carta del jugador 2 (ATAQUE) vs Segunda carta del jugador 1 (DEFENSA):
// {attack: 20, defense: 26} vs {attack: 15, defense: 10}
// Ataque 20 vs Defensa 10 --> 20 supera a 10 --> Como hay 10 puntos de diferencia esa cantidad de daño es aplicada
// al castillo del jugador 1
//
// Una vez terminada la ronda, se procede a repetir lo mismo con las siguientes 2 cartas de cada jugaodr hasta
// finalizar el juego.

var cardGame = function (playerOneCards, playerTwoCards) {
  // Tu código aca:
  let playerOne = playerOneCards;
  let playerTwo = playerTwoCards;

  let oneCastleLife = 100;
  let twoCastleLife = 100;
  while (playerOne.size() > 0 && playerTwo.size() > 0) {
    let attackP1 = playerOne.array[0].attack;
    let defenseP1 = playerOne.array[0].defense;

    let attackP2 = playerTwo.array[0].attack;
    let defenseP2 = playerTwo.array[0].defense;

    if (oneCastleLife > 0) {
      if (attackP1 > defenseP2) {
        let danoCastleTwo = attackP1 - defenseP2;
        twoCastleLife = twoCastleLife - danoCastleTwo;
      }
    } else {
      return "PLAYER TWO";
    }
    if (twoCastleLife > 0) {
      if (attackP2 > defenseP1) {
        let danoCastleOne = attackP2 - defenseP1;
        oneCastleLife = oneCastleLife - danoCastleOne;
      }
    } else {
      return "PLAYER ONE";
    }

    playerOne.dequeue();
    playerTwo.dequeue();
  }

  if (oneCastleLife > twoCastleLife) {
    // console.log("gano TWO");
    // console.log("vida ONE", oneCastleLife);
    // console.log("vida TWO", twoCastleLife);
    return "PLAYER TWO";
  } else if (twoCastleLife > oneCastleLife) {
    // console.log("gano ONE");
    // console.log("vida ONE", oneCastleLife);
    // console.log("vida TWO", twoCastleLife);
    return "PLAYER ONE";
  } else {
    // console.log("vida ONE", oneCastleLife);
    // console.log("vida TWO", twoCastleLife);
    return "TIE";
  }
};

// ---------------

// ----- BST -----

// EJERCICIO 7
// Implementar la función height dentro del prototype de BinarySearchTree que debe devolver la "altura"
// máxima del arbol recibido por parámetro.
// Ejemplo:
//             16             ---> Nivel 1
//          /      \
//        6         23        ---> Nivel 2
//      /  \       /   \
//     2    14    17    31    ---> Nivel 3
//      \
//       5                    ---> Nivel 4
// Este arbol tiene una altura de 4
// PISTA: Una forma de resolverlo es pensarlo recursivamente y usando Math.max
var max = Math.max;
BinarySearchTree.prototype.height = function () {
  // Tu código aca:
  if (!this.left && !this.right) {
    return 1;
  } else {
    if (this.left && !this.right) {
      return this.left.height() + 1;
    } else if (!this.left && this.right) {
      return this.right.height() + 1;
    } else {
      return max(this.left.height() + 1, this.right.height() + 1);
    }
  }
};

// ---------------

// Ejercicio 8
// Dado un arreglo ordenado, encontrar el índice de un elemento específico pasado como parámetro
// utilizando el método conocido como búsqueda binaria. En el caso de que el número buscado no se encuentre
// en el array devolver -1.
// Para mayor información sobre dicho método:
//    - https://www.khanacademy.org/computing/computer-science/algorithms/binary-search/a/binary-search
//    - https://en.wikipedia.org/wiki/Binary_search_algorithm
// Ejemplo:
//    array = [1,2,3,4,5,6,7,8,9,10];
//    binarySearch(array, 2) --> Devolvería 1 ya que array[1] = 2
//    [Donde 2 sería el número sobre el cuál queremos saber su posición en el array]

var binarySearch = function (array, target, min = 0, max = 0, flag = true) {
  // Tu código aca:
  if (flag) {
    max = array.length - 1;
    console.log("entre");
  }

  var promedio = Math.floor(min + max / 2);
  if (min > max) {
    return -1;
  }

  if (array[promedio] === target) {
    return promedio;
  }
  if (array[promedio] < target) {
    min = promedio + 1;
    return binarySearch(array, target, min, max, false);
  } else if (array[promedio] > target) {
    max = promedio - 1;
    return binarySearch(array, target, min, max, false);
  }
};

// EJERCICIO 9
// Ordená un arreglo de objetos usando un bubble sort pero con algunas particularidades.
// Además del arreglo a ordenar (array) la función va a recibir como parámetro una función
// que va a ser quien va a determinar si un elemento es "mayor" al otro para determinar su
// posición final
// Ejemplo:
// var array = [
//   {name: 'Franco', age: 26, height: 1.85},
//   {name: 'Toni', age: 30, height: 1.75},
//   {name: 'Mati', age: 25, height: 1.77},
//   {name: 'Leo', age: 40, height: 1.83}
// ]
//
// orderFunction(array[0], array[1]) --> Devolvera 1 si están bien ordenados o -1 si hay que intercambiarlos
// Suponiendo que la orderFunction devuelve -1 si la edad del segundo elemento es menor que la del primero
// specialSort(array, orderFunction) --> Retornaría el siguiente array:
// [
//   {name: 'Mati', age: 25, height: 1.77},
//   {name: 'Franco', age: 26, height: 1.85},
//   {name: 'Toni', age: 30, height: 1.75},
//   {name: 'Leo', age: 40, height: 1.83}
// ]

var specialSort = function (array, orderFunction) {
  // Tu código aca:
  let switcheo = true;
  while (switcheo) {
    switcheo = false;
    for (let i = 1; i < array.length; i++) {
      let currentData = array[i];
      let trigger = orderFunction(array[i - 1], currentData);
      if (trigger < 0) {
        let anterior = array[i - 1];
        array[i - 1] = currentData;
        array[i] = anterior;
        switcheo = true;
      }
    }
  }

  return array;
  //O(N) = 3 + 6N
};

// ----- Closures -----

// EJERCICIO 10
// Implementar la función closureDetect que recibe como parámetro:
//  - Un array (symptoms) que va a contener en cada posición un string representando un
//    síntoma médico de alguna enfermedad
//  - Un número (min) que va a indicar la cantidad mínima de síntomas que debe tener un
//    paciente para considerar que posee la enfermedad
// Ejemplos:
//   var symptoms = ['fever', 'dry cough', 'tiredness', 'sore throat', 'diarrhoea', 'loss of taste', 'loss of smell'];
//   var covidDetector = closureDetect(symptoms, 3);
//
//   var personOne = {
//     name: 'Franco',
//     age: 26,
//     symptoms: ['fever', 'congestion', 'loss of taste', 'tiredness']
//   }
//
//   var personTwo = {
//     name: 'Toni',
//     age: 30,
//     symptoms: ['congestion', 'tiredness']
//   }
//
//   covidDetector(personOne); --> true
//   covidDetector(personTwo); --> false
//  [Observar los tests para otros casos]

function closureDetect(symptoms, min) {
  // Tu código aca:
}

// -------------------

module.exports = {
  isAncestor,
  secuenciaHenry,
  LinkedList,
  Queue,
  cardGame,
  binarySearch,
  specialSort,
  closureDetect,
  BinarySearchTree,
  mergeLinkedLists,
};
