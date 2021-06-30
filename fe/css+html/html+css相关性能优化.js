/*
 * @Descripttion: 页面渲染相关的性能优化
 * @Author: zhangli45<zhangli45@baidu.com>
 */

/**
 * todo 1 一次渲染几十万+数据时的处理方法
 *
 * 利用 window.createDocumentFragment控制数据插入对页面的修改次数 
 * +
 * 利用requestAnimationFrame控制页面绘制的时机
 */
const addThousandsData = (dataCount) => {
    let countOfRender = Math.ceil(dataCount / 200); // 比如一次渲染200条数据
    function add() {
        const fragment = document.createDocumentFragment();
        for(let i = 0; i < once; i++) {
            const li = document.createElement('li');
            li.innerText = Math.floor(Math.random() * total);
            fragment.appendChild(li);
        }
        document.appendChild(fragment);
        countOfRender += 1;
        loop();
    }
    function loop() {
        if(countOfRender < loopCount) {
            window.requestAnimationFrame(add);
        }
    }
    loop();
}