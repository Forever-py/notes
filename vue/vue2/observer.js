const data = {
    name: 'jerry',
    age: 18,
    yang: {
        age: 19,
        sex: 'famale'
    },
    arr: [1, 2, 3]
}

const arrayProto = Array.prototype;
const arrayMethods = Object.create(arrayProto);
['push', 'pop', 'shift', 'unshift', 'sort', 'splice', 'reverse'].forEach(method => {
    arrayMethods[method] = function () {
        arrayProto[method].call(this, ...arguments);
        render();
    }
})

function defineReactive(data, key, value) {
    observer(value);
    Object.defineProperty(data, key, {
        get() {
            console.log('读');
            return value;
        },
        set(newVal) {
            console.log('写');
            if (value == newVal) {
                return;
            }
            value = newVal;
            render();
        }
    })
}

function observer(data) {
    if (Array.isArray(data)) {
        data.__proto__ = arrayMethods;
        return;
    }
    if (typeof data === 'object') {
        for (let key in data) {
            defineReactive(data, key, data[key]);
        }
    }

}

function render() {
    console.log('页面渲染了');
}

function $set(data, key, value) {
    if (Array.isArray(data)) {
        data.splice(key, 1, value);
        return value;
    }
    defineReactive(data, key, value); // 这个是用来观察对象的
    render();
    return value;
}

function $delete(data, key) {
    if (Array.isArray(data)) {
        data.splice(key, 1)
        return;
    }
    delete data[key];
    render();
    return;
}

observer(data);

// console.log(data.age);
// data.name = '杨超';
// console.log(data.name);
// data.age = 18;
// console.log(data.age);
// data.yang.age = 20;
// console.log(data.yang.age); 

// data.arr.push(100);
// const oldPush = Array.prototype.push;
// Array.prototype.push = function () {
//     oldPush.call(this, ...arguments);
//     render();
// }
// data.arr.push(100);
// console.log(data.arr);

// const value = $set(data, 'color', 'red');
// console.log(value)
// $set(data.arr, 0, 100);
// console.log(data.arr);

$delete(data.yang, 'sex');
console.log(data.yang);
$delete(data.arr, 0);
console.log(data.arr);