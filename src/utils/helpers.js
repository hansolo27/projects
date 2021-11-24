const statuses = { 0: 'Draft', 1: 'Active',
2: 'Finished', 3: 'Archive',
4:'Canceled' };

export default {
  getValue(value){
    let newArray = [];
    if(value.length) {
      newArray = value.map((i) => {
        if (i.creationDate.length){
          i.creationDate = new Date(i.creationDate).toLocaleString();
        }
        if (i.status >= 0) {
          i.status = { value: i.status, name: statuses[i.status] || ''};
        }
        return i;
      })
      return newArray;
    } else return value;
  }
}