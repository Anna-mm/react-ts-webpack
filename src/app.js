// try catch 中的 promise 能捕获到
// try catch 中的 setTimeout 捕获不到
try{
    console.log(1);
    const test = await computeSourcemapLines();
    console.log(2);
} catch (e) {
    console.log('catch',e);
}

function computeSourcemapLines() {
    return new Promise(resolve => {
        console.log(inner);
        // 捕获不到
        // setTimeout(() => {
        //     console.log(inner);
        // }, 100)
        resolve(1);
    })
}

// try catch 中的 promise 去掉 wait 捕获不到
try{
  console.log(1);
  const test = computeSourcemapLines();
  console.log(2);
} catch (e) {
  console.log('catch',e);
}

function computeSourcemapLines() {
  return new Promise(resolve => {
      console.log(inner);
      resolve(1);
  })
}

// try catch 中的 setTimeout 捕获不到
try {
    console.log('try里面')
    setTimeout(() => {
      console.log('try里面的setTimeOut')
      window.someNonexistentFunction()
    }, 0)
  } catch (e) {
    console.log('error', e)
  }
  setTimeout(() => {
    console.log('我要执行')
  }, 100)