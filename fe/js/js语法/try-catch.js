/*
 * @Descripttion: try catch 相关知识点
 * @Author: zhangli45<zhangli45@baidu.com>
 */
/**
 * 【总结】
 * 一个try catch里面的return 是能阻止这个try catch后面的js代码运行的
 * 最后return出去的数据 才被作为这个更个try catch的返回值
 */
const test_try_catch = () => {
    try {
        console.log('执行try');
        ddd
        // return 'try';
    } catch (error) {
        console.log('执行catch', error);
        // return 'catch';
    } finally {
        console.log('执行finally');
        // return 'finally';
    }

    try {
        console.log('执行try2');
        ddd
        return 'try2';
    } catch (error) {
        console.log('执行catch2', error);
        return 'catch2';
    } finally {
        console.log('执行finally2');
        return 'finally2';
    }
}

console.log(test_try_catch());
