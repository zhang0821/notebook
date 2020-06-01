let obj = {a: 1};
let handlers = {
    get(target, key, context) {
        console.log('accessing:', key);
        return Reflect.get(target, key, context);
    }
}
pobj = new Proxy(obj, handlers);
console.log(obj.a);
console.log(pobj.a);