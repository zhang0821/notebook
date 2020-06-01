

// @see https://juejin.im/post/5ed08019e51d45786973c2e9

// 如何在给定元素上触发特定事件且能选择地传递自定义数据 ？
const triggerEvent = (el, eventType, detail) =>
    el.dispatchEvent(new CustomEvent(eventType, { detail }));

// 事例
triggerEvent(document.getElementById('myId'), 'click');
triggerEvent(document.getElementById('myId'), 'click', { username: 'bob' });

// 如何将一组表单子元素转化为对象 ？
const formToObject = form =>
    Array.from(new FormData(form)).reduce(
        (acc, [key, value]) => ({
            ...acc,
            [key]: value
        }),
        {}
    );

// 事例
formToObject(document.querySelector('#form'));
// { email: 'test@email.com', name: 'Test Name' }


// 如何隐藏所有指定的元素：
const hide = (el) => Array.from(el).forEach(e => (e.style.display = 'none'));

// 事例:隐藏页面上所有`<img>`元素?
hide(document.querySelectorAll('img'));

// 如何获取当前页面的滚动位置？

const getScrollPosition = (el = window) => ({
    x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
    y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
});

// 事例
getScrollPosition(); // {x: 0, y: 200}


// 如何平滑滚动到页面顶部？

const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, c - c / 8);
    }
}

// 事例
scrollToTop()
