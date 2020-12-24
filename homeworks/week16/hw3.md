## hw3：Hoisting

```js
var a = 1
function fn(){
  console.log(a)
  var a = 5
  console.log(a)
  a++
  var a
  fn2()
  console.log(a)
  function fn2(){
    console.log(a)
    a = 20
    b = 100
  }
}
fn()
console.log(a)
a = 10
console.log(a)
console.log(b)
```
#### 程式碼的輸出

##### 依照順序印出：

```
undefined
5
6
20
1
10
100
```

#### 前言
每當進入一個 function 的時候，會產生一個 Execution Contexts（簡稱 EC）；除了 functione 會有 EC，全域的地方，也會產生一個 global EC。而每個 EC 都會有與之對應的 variable object（簡稱 VO），在裡面宣告的變數、函式跟函式參數，會被加進 VO 裡面。


#### 程式運作方式
##### 第一階段
首先進入全域的環境，產生了一個 global EC，對應的 variable object 也隨之產生，並進行 VO 的初始化。

1. 第一步先去找參數，但因為全域環境不是 function，所以沒有參數
2. 第二步是去找 function 的宣告，找到 `fn()`。
3. 第三步找變數宣告，找到 `a` ，並將其初始化為 `undefined` 。
  
```
global EC
global VO: {
  fn: function,
  a: undifined
}
```

##### 第二階段
接著開始執行程式碼。

4.  執行到第一行 `var a = 1`，a 被賦值為 1。
5.  來到第十六行，當呼叫 `fn()` 時，就進入一個新的 
EC，接著進行 `fn()` VO 的初始化。
6.  首先，先找裡面有沒有參數，沒有找到。
7.  接下來去找 function 的宣告，找到 `fn2()`。
8.  然後找變數的宣告，找到 `a`，並初始化為 `undefined`。

```
fn EC
fn VO: {
  fn2: function,
  a: undefined
}

global EC
global VO: {
  fn: function,
  a: 1
}

```

##### 第三階段
開始執行 `fn()` 程式碼。

9. 首先，執行到 `console.log(a)`，此時 `fn()` VO 內的 a 值為 undefined，所以輸出 a 值 「undefined」。 

```
fn EC
fn VO: {
  fn2: function,
  a: undefined
}

global EC
global VO: {
  fn: function,
  a: 1
}

```

10. 接著執行到 `var a = 5`，a 的值改為 5。
11. 下一段程式碼，執行 `console.log(a)`，會輸出 「5」。

```
fn EC
fn VO: {
  fn2: function,
  a: 5
}

global EC
global VO: {
  fn: function,
  a: 1
}
```
12.  下一行 `a++`，a 值再調整為 6。
13.  接著 `var a`，先前已有宣告，不會改變 VO 的內的變數狀態。

```
fn EC
fn VO: {
  fn2: function,
  a: 6
}

global EC
global VO: {
  fn: function,
  a: 1
}
```
##### 第四階段
開始執行 `fn2()` 程式碼。

14. 下一步，呼叫 `fn2()` 函式，進入一個新的 
EC，接著進行 `fn2()` VO 的初始化。
15. 進入 `fn2()` 函式裡面，發現裡面沒有任何參數、function 及 變數的宣告，所以 fn2 EC 內的 VO 為空。
16. 接著執行 `fn2()` 內的程式碼。
17. 首先遇到 `console.log(a)`，因為 `fn2` 的 VO 是空的，所以循著 scope chain 往上一層找到 `fn` 的 VO，裡面有 a = 6，因此 a 輸出為 「6」。

```
fn2 EC
fn2 VO: {  

}

fn EC
fn VO: {
  fn2: function,
  a: 6
}

global EC
global VO: {
  fn: function,
  a: 1
}
```

18. 接著執行 `a = 20`，此時 fn2 VO 仍為空，循著 scope chain，往上一層找到 `fn()` 的 VO，裡面有 a，然後將值改為 20。
19. 下一個步驟執行 ` b = 100`，由於 fn2 Vo 為空、往上一層找 `fn()` 也沒有；往上一層找到 `fn()`也沒有，因此就在 global VO 新增一個變數 b，然後賦值為 100（變成全域變數）。

```
fn2 EC
fn2 VO: {  

}

fn EC
fn VO: {
  fn2: function,
  a: 20
}

global EC
global VO: {
  fn: function,
  a: 1  
  b: 100
}
```

##### 第五階段

20. `fn2()` 執行結束之後，fn2 EC & VO 刪除。
21. 繼續回來執行 `fn()` 的程式碼，再遇到 `console.log(a)`，a 輸出為 20。
22. 當 `fn()` 執行完畢， fn  EC & VO 刪除。
23. 接著在全域環境，繼續執行程式碼。
24. 再次遇上 `console.log(a)` ，確認global VO 印出 「1」。

```
global EC
global VO: {
  fn: function,
  a: 1
  b: 100
}
```
25. 接著遇上 ` a= 10`，調整 global VO 的 a 改為 10。
26. 最後 `console.log(a)`，a 輸出為 「10」；` console.log(b)` 輸出為 「100」。

```
global EC
global VO: {
  fn: function,
  a: 10
  b: 100
}
```
27. 最後，程式碼全部執行完畢，global EC ＆ VO 刪除。

```
```