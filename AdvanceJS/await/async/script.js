async function getData(ID) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (ID === 3) {
        reject("ID not Found");
      } else {
        console.log("Data", ID);
        resolve("Task Done");
      }
    }, 2000);
  });
}

try {
  const res = await getData(1);
  console.log(res);  

  await getData(3);

  await getData(4);

  await getData(5);
} catch (error) {
  console.log(error);
}