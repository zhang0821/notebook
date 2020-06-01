/*
 * @Descripttion: 一些不常用语法的复习
 * @Author: zhangli45<zhangli45@baidu.com>
 */
const testUrl = 'www.baidu.com';

function stringify(query = {}) {
    if (!query) {
        return '';
    }
    let search = '';
    for (let key in query) {
        if (query.hasOwnProperty(key)) {
            let value = query[key];
            if (value == null) {
                value = '';
            }
            else if (typeof value === 'object') {
                value = JSON.stringify(value);
            }
            search += '&' + encodeURIComponent(key) + '=' + encodeURIComponent(value);
        }
    }
    return search.slice(1);
}

const testQuery = {
    a: 3,
    b: 1
};
const renderUrl = (url, params) => {
    console.log(url, ~url.indexOf('w'));
    if (~url.indexOf('w')) {
        console.log('找到了');
    }
    return url + (~url.indexOf('?') ? '&' : '?') + stringify(params);
};

console.log(renderUrl(testUrl, testQuery));