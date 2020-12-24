## hw2：Event Loop + Scope

```js
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```
#### 程式碼的輸出

依照順序印出：

```
i: 0
i: 1
i: 2
i: 3
i: 4
5
5
5
5
5
```
#### 程式碼的執行方式
##### 第一階段
程式首先進入迴圈，將 for 迴圈丟進 Call Stack，設定 i = 0 判斷 i < 5，符合條件，繼續執行下一段程式碼。

* Call Stack

```
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```
##### 第二階段
接下來程式碼執行 `console.log('i: ' + i)`，並賦值 i = 0，輸出「i: 0」，結束後從 Call Stack 移除。

* Call Stack

```
console.log('i: ' + 0)

for(var i=0; i<5; i++) {
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```
##### 第三階段 (前)
接著程式執行到 `setTimeout(fn, i*1000)` ，發現是非同步的 WebAPI，就去跟瀏覽器說，請幫我設定一個計時器， 0 秒之後幫我呼叫 `setTimeout(fn, i*1000)` 裡面的 fn，接著執行結束，從 Call Stack 移除。

* Call Stack 

```
setTimeout(() => {
  console.log(i)
}, 0 * 1000)

for(var i=0; i<5; i++) {}
```

* WebAPIs

```
```
##### 第三階段 (後)

* Call Stack 

```
for(var i=0; i<5; i++) {}
```

* WebAPIs

```
setTimeout(() => {
  console.log(i)
}, 0 * 1000)
```
##### 第四階段
而瀏覽器為 `setTimeout(fn, i*1000)` 設定的計時器，0 秒一到，就把裡面的 fn 放進 Callback Queue 裡面排隊，等待Call Stack 裡面全部清空時，就可以進入 Call Stack 執行。
此時 i = 0 的迴圈跑完之後，i 再加上 1，這時候 i = 1。

* Callback Queue

```
() => {
  console.log(i)
}
```
##### 第五階段
程式進入迴圈， 此時 i = 1，判斷 i < 5，符合條件，繼續執行下一段程式碼。

* Call Stack 

```
for(var i=1; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```
##### 第六階段
接下來程式碼執行 `console.log('i: ' + i)`，並賦值 i = 1，輸出「i: 1」，結束後從 Call Stack 移除。

* Call Stack

```
console.log('i: ' + 1)

for(var i=1; i<5; i++) {
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```
##### 第七階段（前）
接著程式執行到 `setTimeout(fn, i*1000)` ，發現是非同步的 WebAPI，就去跟瀏覽器說，請幫我設定一個計時器， 1 秒之後幫我呼叫 `setTimeout(fn, i*1000)` 裡面的 fn，接著執行結束，從 Call Stack 移除。

* Call Stack 

```
setTimeout(() => {
  console.log(i)
}, 1 * 1000)

for(var i=1; i<5; i++) {}
```

* WebAPIs

```
```
##### 第七階段（後）

* Call Stack 

```
for(var i=1; i<5; i++) {}
```

* WebAPIs

```
setTimeout(() => {
  console.log(i)
}, 1 * 1000)
```
##### 第八階段
而瀏覽器為 `setTimeout(fn, i*1000)` 設定的計時器，1 秒一到，就把裡面的 fn 放進 Callback Queue 裡面排隊，等待Call Stack 裡面全部清空時，就可以進入 Call Stack 執行。
此時 i = 1 的迴圈跑完之後，i 再加上 1，這時候 i = 2。

* Callback Queue

```
() => {
  console.log(i)
}

() => {
  console.log(i)
}
```
##### 第九階段
程式進入迴圈， 此時 i = 2，判斷 i < 5，符合條件，繼續執行下一段程式碼。

* Call Stack 

```
for(var i=2; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```

##### 第十階段
接下來程式碼執行 `console.log('i: ' + i)`，並賦值 i = 2，輸出「i: 2」，結束後從 Call Stack 移除。

* Call Stack

```
console.log('i: ' + 2)

for(var i=2; i<5; i++) {
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```

##### 第十一階段（前）
接著程式執行到 `setTimeout(fn, i*1000)` ，發現是非同步的 WebAPI，就去跟瀏覽器說，請幫我設定一個計時器，2 秒之後幫我呼叫 `setTimeout(fn, i*1000)` 裡面的 fn，接著執行結束，從 Call Stack 移除。

* Call Stack 

```
setTimeout(() => {
  console.log(i)
}, 2 * 1000)

for(var i=2; i<5; i++) {}
```

* WebAPIs

```
```
##### 第十一階段（後）

* Call Stack 

```
for(var i=2; i<5; i++) {}
```

* WebAPIs

```
setTimeout(() => {
  console.log(i)
}, 2 * 1000)
```
##### 第十二階段
而瀏覽器為 `setTimeout(fn, i*1000)` 設定的計時器， 2 秒一到，就把裡面的 fn 放進 Callback Queue 裡面排隊，等待Call Stack 裡面全部清空時，就可以進入 Call Stack 執行。
此時 i = 2 的迴圈跑完之後，i 再加上 1，這時候 i = 3。

* Callback Queue

```
() => {
  console.log(i)
}

() => {
  console.log(i)
}

() => {
  console.log(i)
}
```
##### 第十三階段
程式進入迴圈， 此時 i = 3，判斷 i < 5，符合條件，繼續執行下一段程式碼。

* Call Stack 

```
for(var i=3; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```
##### 第十四階段
接下來程式碼執行 `console.log('i: ' + i)`，並賦值 i = 3，輸出「i: 3」，結束後從 Call Stack 移除。

* Call Stack

```
console.log('i: ' + 3)

for(var i=3; i<5; i++) {
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```
##### 第十五階段（前）
接著程式執行到 `setTimeout(fn, i*1000)` ，發現是非同步的 WebAPI，就去跟瀏覽器說，請幫我設定一個計時器，3 秒之後幫我呼叫 `setTimeout(fn, i*1000)` 裡面的 fn，接著執行結束，從 Call Stack 移除。

* Call Stack 

```
setTimeout(() => {
  console.log(i)
}, 3 * 1000)

for(var i=3; i<5; i++) {}
```

* WebAPIs

```
```
##### 第十五階段（後）

* Call Stack 

```
for(var i=3; i<5; i++) {}
```

* WebAPIs

```
setTimeout(() => {
  console.log(i)
}, 3 * 1000)
```
##### 第十六階段
而瀏覽器為 `setTimeout(fn, i*1000)` 設定的計時器， 3 秒一到，就把裡面的 fn 放進 Callback Queue 裡面排隊，等待Call Stack 裡面全部清空時，就可以進入 Call Stack 執行。
此時 i = 3 的迴圈跑完之後，i 再加上 1，這時候 i = 4。

* Callback Queue

```
() => {
  console.log(i)
}

() => {
  console.log(i)
}

() => {
  console.log(i)
}

() => {
  console.log(i)
}
```
##### 第十七階段
程式進入迴圈， 此時 i = 4，判斷 i < 5，符合條件，繼續執行下一段程式碼。

* Call Stack 

```
for(var i=4; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```
##### 第十八階段
接下來程式碼執行 `console.log('i: ' + i)`，並賦值 i = 4，輸出「i: 4」，結束後從 Call Stack 移除。

* Call Stack

```
console.log('i: ' + 4)

for(var i=3; i<5; i++) {
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```
##### 第十九階段（前）
接著程式執行到 `setTimeout(fn, i*1000)` ，發現是非同步的 WebAPI，就去跟瀏覽器說，請幫我設定一個計時器，4 秒之後幫我呼叫 `setTimeout(fn, i*1000)` 裡面的 fn，接著執行結束，從 Call Stack 移除。

* Call Stack 

```
setTimeout(() => {
  console.log(i)
}, 4 * 1000)

for(var i=4; i<5; i++) {}
```

* WebAPIs

```
```
##### 第十九階段（後）

* Call Stack 

```
for(var i=4; i<5; i++) {}
```

* WebAPIs

```
setTimeout(() => {
  console.log(i)
}, 4 * 1000)
```

##### 第二十階段
而瀏覽器為 `setTimeout(fn, i*1000)` 設定的計時器， 4 秒一到，就把裡面的 fn 放進 Callback Queue 裡面排隊，等待Call Stack 裡面全部清空時，就可以進入 Call Stack 執行。
此時 i = 4 的迴圈跑完之後，i 再加上 1，這時候 i = 5。

* Callback Queue

```
() => {
  console.log(i)
}

() => {
  console.log(i)
}

() => {
  console.log(i)
}

() => {
  console.log(i)
}

() => {
  console.log(i)
}
```
##### 第二十一階段 
程式進入迴圈， 此時 i = 5，判斷 i < 5，不符合條件，跳出迴圈，結束 for 迴圈。

* Call Stack 

```
for(var i=5; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```

##### 第二十一階段
這時候，Call Stack 已全數清空，Event Loop 就去把在 Callback Queue 排隊的程式碼，依照排隊優先順序，放進 Call Stack 執行。

* Call Stack 

```
```

* Callback Queue

```
() => {
  console.log(i)
}

() => {
  console.log(i)
}

() => {
  console.log(i)
}

() => {
  console.log(i)
}

() => {
  console.log(i)
}
```
##### 第二十二階段
此時 Callback Queue 的 i 值，雖然迴圈在 i = 5 時，判斷不符合條件，而結束迴圈執行，但因為函式具有閉包的特性，原本應該被釋放掉的資源，仍被保留在匿名函式的 scope chain 裡面，當匿名函式要印出 i 時，在同層找不到變數，就會循著 scope chain 往上一層找 i 值，最後成功找到 i = 5，並依照在 Callback Queue 的順序陸續印出「5」，共 5 次。

* Call Stack 

```
console.log(5)
```

* Callback Queue

```
() => {
  console.log(i)
}

() => {
  console.log(i)
}

() => {
  console.log(i)
}

() => {
  console.log(i)
}
```

##### 第二十三階段
等到 Callback Queue 清空之後，程式全部執行結束。

* Call Stack 

```
```

* Callback Queue

```
```