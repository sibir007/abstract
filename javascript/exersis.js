async function test() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve('готово1'), 1000)
  });

  let result = await promise;
  console.log(result);
};

async function test2() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve('готово2'), 500)
  });

  let result = await promise;
  console.log(result);
};
test();
test2();
