export default obj => {
  for (let key in obj) {
    if (!obj.hasOwnProperty(key)) {
      return true;
    } else if (obj[key] !== '') {
      return false
    } 
  }
  return true
}