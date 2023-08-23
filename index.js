function partitionString(str) {
  const regex = /([a-zA-Zа-яА-Я]+)(\d+)?/;
  const matches = str.match(regex);
  return [matches[1] || '', matches[2] || ''];
}

function customSortReverse(a, b) {
  const [lettersA, numbersA] = partitionString(a.name);
  const [lettersB, numbersB] = partitionString(b.name);

  const letterComparison = lettersA.localeCompare(lettersB);

  if (letterComparison !== 0) {
    return -letterComparison; // Обратная сортировка букв
  }

  const numberA = parseInt(numbersA, 10);
  const numberB = parseInt(numbersB, 10);

  return numberB - numberA; // Обратная сортировка чисел
}

function findAndFilterData(tree, targetName) {
  if (!tree || !Array.isArray(tree)) {
    return [];
  }

  let result = [];

  for (const node of tree) {
    if (node[targetName] && Array.isArray(node[targetName])) {
      const filteredArray = node[targetName].filter(item => item.name !== undefined && item.name !== 'empty');
      const sortedArray = filteredArray.sort(customSortReverse);
      result = result.concat(sortedArray);
      return result
    }

    for (const key in node) {
      if (node.hasOwnProperty(key) && key.includes('tree') && Array.isArray(node[key])) {
        result = result.concat(findAndFilterData(node[key], targetName));
      }
    }
  }

  return result;
}

const data = {
  tree: [
    {
      name: 'name1',
      tree_1: [
        { name: 'name2' },
        { name: 'name3' },
        {
          name: 'name4',
          tree_2: [
            { name: 'name5' },
            { name: 'name6' },
            {
              tree_3: [
                { name: undefined },
                { name: 'name7', age: 20 },
                { name: 'name8', age: 15,},
                { name: 'name9', age: 31 },
                { name: 'name10', age: 30 },
                { name: undefined, age: undefined },
                { name: 'empty', age: 'empty' },
              ],
            },
          ],
        },
        { name: 'name11' },
      ],
    },
    {
      name: 'name12',
      tree_4: [{ name: 'name3' }],
    },
  ],
};

const nodeName = 'tree_3'; // Имя узла, который нужно найти и обработать

const filteredAndSortedData = findAndFilterData(data.tree, nodeName);

console.log(filteredAndSortedData);