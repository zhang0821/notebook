/*
 * @Descripttion: try catch 相关知识点
 * @Author: zhangli45<zhangli45@baidu.com>
 */
const test_try_catch = () => {
    try {
        console.log('执行try');
        ddd
        return 'try';
    } catch (error) {
        console.log('执行catch', error);
        return 'catch';
    } finally {
        console.log('执行finally');
        return 'finally';
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