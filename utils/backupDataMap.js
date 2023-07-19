function backupDataMap(obj1, obj2) {
    let extractedObj={}
 0
    let columns=Object.keys(obj1[0])
 
    for(let i=0;i<columns.length;i++){
     
       let innerArray=[]
     
       for(let d=0;d<obj1.length;d++){
          let innerObj={}
          innerObj[obj2[d][columns[i]]]=obj1[d][columns[i]]
          innerArray.push(innerObj)
          
       }
       extractedObj[columns[i]]=innerArray
 
 
    }
   return  extractedObj;
 
  }
  module.exports = { backupDataMap };
