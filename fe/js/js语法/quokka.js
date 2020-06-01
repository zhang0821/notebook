let p1 = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
resolve(1);
        },1000);
    })
}

let p2 = () => {
    Promise.resolve(2);
};

const add = (xpromise, ypromise) => {
    return Promise.all([xpromise,ypromise]).then((r1, r2) => {
        console.log(r1, r2)
        return r1+r2;
    })
}
add(p1, p2).then(res => {
    console.log(res);
})