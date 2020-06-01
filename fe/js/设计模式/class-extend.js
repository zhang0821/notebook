class HTMLElement {
    constructor(appName, getToken) {
        this.appName = appName;
        this.getToken = getToken;
    }
    static teststatic() {
        return this.appName;
    }
}
class DIVElement extends HTMLElement {
    constructor() {
        super();
    }
    // constructor(...args) {
    //     const self = super();
    // }
}