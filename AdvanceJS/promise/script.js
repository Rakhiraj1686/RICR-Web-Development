function getData(ID) {
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

// const abc = getData(3);

getData(1)
  .then((res) => {
    return getData(2);
  })
  .then((res) => {
    return getData(3);
  })
  .then((res) => {
    return getData(4);
  })
  .catch((rej) => {
    console.log(rej);
  });