## hw4：What is this？

```js
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // ??
obj2.hello() // ??
hello() // ??
```
##### 依照順序印出：

```
2
2
undefined
```

##### 關於 this 自我補充
> 脫離物件導向之後，this 就沒有太大意義 

 ```
function goodDay(){
  console.log(this)
}
  
goodDay()
 ```
1. 嚴格模式下，`goodDay()` 輸出 `undefined`。
2. 非嚴格模式，`goodDay()` 在瀏覽器會輸出 `window`。
3. 非嚴格模式，`goodDay()` 在 node.js 環境下會輸出 `global`。

##### 題目說明
題目直接創造一個物件（也算是物件導向的類型），沒有透過 class，所以不會看到 new 這個關鍵字。

>this 的值與作用域跟程式碼的位置在哪裡無關，只跟你「如何呼叫」有關。

我們可以透過將 function call 轉成運用 `call` 的形式來確認，會用這個形式來驗證，是因為 `call` 的第一個參數就是 this，所以我們可以來判斷 this 的值是什麼。

```
const obj2 = obj.inner
const hello = obj.inner.hello

obj.inner.hello() // obj.inner.hello.call(obj.inner) ＝> 2
obj2.hello() //obj2.hello.call(obj.inner) => 2
hello() // hello.call() => undefined
```

