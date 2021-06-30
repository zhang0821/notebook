
const promise = (data)=> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data + 'after promise');
        }, 5000);
    });
}
const awake = (data) => {
    return new Promise((resolve, reject) => {
        promise(data).then(res => {
            resolve(res + ',after awake');
        })
    });
}
const getinfo = async () => {
    let result = await awake('init');
    console.log('result', result);
    return result;
}
const test = async () => {
    let res = await getinfo();
    if (res) {
        console.log('do something');
    }
}
test();