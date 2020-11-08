## hw1：Event Loop

```js
console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)
```
#### 程式碼的輸出

依照順序印出：

```
1
3
5
2
4
```
#### 程式碼的執行方式
##### 第一階段
程式首先進入 `console.log(1)` 這段程式碼，接著會把這段程式碼丟到 Call Stack，然後輸出「1」，結束之後從 Call Stack 中移除。 

* Call Stack

```
console.log(1)
```

##### 第二階段
程式緊接著進入 `setTimeout(fn, 0)` 這段程式碼，一開始會進入 Call Stack 執行。

* Call Stack

```
setTimeout(() => {
  console.log(2)
}, 0)
```

##### 第三階段
Call Stack 在執行 `setTimeout(fn, 0)` 時，發現 `setTimeout(fn, 0)` 是 非同步的 WebAPI，就去跟瀏覽器說，請先設定一個計時器，0 秒之後幫我呼叫 `setTimeout(fn, 0)` 裡面的 fn。接著執行結束，從 Call Stack 移除。

* Call Stack

```
```

* WebAPIs

```
setTimeout(() => {
  console.log(2)
}, 0)
```

##### 第四階段
接著程式繼續執行下一行，`console.log(3)` 被丟到 Call Stack，然後輸出「3」，結束之後從 Call Stack 中移除。而先前瀏覽器為 `setTimeout(fn, 0)` 設定的計時器，0 秒一到，就把裡面的 fn 放進 Callback Queue 裡面排隊，等待Call Stack 裡面全部清空時，就可以進入 Call Stack 執行。

* Callback Queue

```
() => {
  console.log(2)
}
```

* WebAPIs

```

```

##### 第五階段
程式繼續在運作，接著來到另一個 `setTimeout(fn, 0)` 程式碼，然後丟進 Call Stack 執行。

* Call Stack

```
setTimeout(() => {
  console.log(4)
}, 0)
```

##### 第六階段
Call Stack 執行時發現 `setTimeout(fn, 0)` 是非同步的 WebAPI，就去跟瀏覽器說，請幫我設定一個計時器，0 秒之後再來呼叫 `setTimeout(fn, 0)` 裡面的 fn。接著執行結束，從 Call Stack 移除。

* Call Stack

```
```

* WebAPIs

```
setTimeout(() => {
  console.log(4)
}, 0)
```

##### 第七階段
程式繼續執行下一行：`console.log(5)`，進入 Call Stack，
輸出「5」之後，結束後並從 Call Stack 移出。而先前瀏覽器執行 `setTimeout(fn, 0)` 設定的計時器，0 秒一到，就把裡面的 fn 放入 Callback Queue 裡面排隊。等到 Call Stack 全部淨空之後，就可以進入 Call Stack 執行。

* Callback Queue

```
() => {
  console.log(2)
}
() => {
  console.log(4)
}

```

* WebAPIs

```

```

##### 第八階段
程式繼續執行下一行，`console.log(5)` 被丟到 Call Stack，然後輸出「5」，結束之後從 Call Stack 中移除。這時候，Call Stack 已全數清空，Event Loop 就去把在 Callback Queue 排隊的程式碼，依照排隊優先順序，放進 Call Stack 執行。

* Call Stack

```
```

* Callback Queue

```
() => {
  console.log(2)
}
() => {
  console.log(4)
}

```

##### 第九階段
首先會先將排名順位第一名的的 fn 丟進來執行裡面的 `console.log(2)` 程式碼，輸出「2」之後，結束並從 Call Stack 移出。

* Call Stack

```
() => {
  console.log(2)
}
```

* Callback Queue

```
() => {
  console.log(4)
}
```

##### 第十階段
首先會先將排名順位第二名的的 fn 丟進來執行裡面的 `console.log(4)` 程式碼，輸出「4」之後，結束並從 Call Stack 移出。

* Call Stack

```
() => {
  console.log(4)
}
```

* Callback Queue

```

```

##### 第十一階段
程式全部執行結束

* Call Stack

```

```

* Callback Queue

```

```
