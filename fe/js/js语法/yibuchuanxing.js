let oneStepSuccess = data => () => new Promise(resolve => {
    console.log('data:', data);
    return resolve(data);
});
let oneStepFail = data => () => new Promise(reject => reject(data));

let myPromises = [
    oneStepSuccess(),
    oneStepSuccess(),
    oneStepSuccess()
];

let ReducePromises = list => {
    list.reduce(
        (previousPromise, nextPromise, index) => previousPromise.then(res => nextPromise(res))
        , Promise.resolve('start')
    );
}

let result = ReducePromises(myPromises);
console.log('result', result);
