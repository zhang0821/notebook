let testArray = [
    {
        name: '123',
        id: 1,
    },
    {
        name: '1234',
        id: 2,
    }
];
testArray.forEach(item => {
    item.id++;
});


console.log('testArray', testArray);
