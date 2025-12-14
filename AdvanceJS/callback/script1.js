function getdata(ID, getNextData) {
  setTimeout(() => {
    console.log("DATA", ID);

    if (getNextData) {
      getNextData();
    }
  }, 2000);
}

getdata(1, () => {
  getdata(2, () => {
    getdata(3,()=>{
        getdata(4)
    });
  });
});