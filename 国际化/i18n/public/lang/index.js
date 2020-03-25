let lang = function(locale){
  return {
    data:require('./'+locale+'/test.json')
  }
}
export default lang 

// let lang = function(locale){
//   var xhr = new XMLHttpRequest();
//   xhr.open('get','./'+locale+'/test.json',true);
//   xhr.send()
//   xhr.onreadystatechange=function(){
//     console.log(11111)
//     return {
//       data:require('./'+locale+'/test.json')
//     }  
//   }
  
// }
// export default lang 