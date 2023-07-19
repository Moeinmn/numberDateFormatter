const { format } = require("date-fns");
const accounting = require("accounting")
const {getType}=require("./getColumnsType")
// const numeral = require("numeral");



const customFormatter=(data,floatNumber)=>{

  return accounting.formatNumber(data, floatNumber, "'")
}

const dateFormatter = (date, pattern) => {
  let converted = new Date(date);
  let formattedDate = format(converted, pattern).toString();

  return formattedDate;
};

const autoForamtter = (
  contnet,
  colName,
  configFormatter,
  configChart,
  backupDataLink,
  numeral
) => {

  let colConfig = configFormatter.find((obj) => obj.colName === colName);
  // console.log(colConfig,"colConfig")

  if(colConfig){
    if ( (colConfig.overwrite ==true) ) {
      switch (colConfig.colType) {
        case "number":
          if (colConfig.outputFormat !== "matchInput") {

            if (colConfig.outputFormat==="1'000"){
              return (
                colConfig.colPrefix +
                customFormatter(contnet,0) +
                colConfig.colSuffix
              );
            }else if(colConfig.outputFormat==="1'000.[0]"){
              return (
                colConfig.colPrefix +
                customFormatter(contnet,1) +
                colConfig.colSuffix
              );
            }
            else
              return (
                colConfig.colPrefix +
                numeral(contnet).format(colConfig.outputFormat) +
                colConfig.colSuffix
              );
            
       
          } else {
            let findeObj= backupDataLink[colName].find((obj)=>{return contnet in obj});
            return findeObj[contnet];
          }
        case "date":
          if (colConfig.outputFormat !== "matchInput") {
            return dateFormatter(contnet, colConfig.outputFormat);
          } else {
            let findeObj= backupDataLink[colName].find((obj)=>{return contnet in obj});
            return findeObj[contnet];
          }
  
        case "string":
          return contnet
      }
    } else {
      switch (colConfig.colType) {
        case "number":
            if (configChart?.numberformatter.type==="customOne"){
                return (
                  configChart?.numberformatter.prefix +
               customFormatter(contnet,0) +
                  configChart?.numberformatter.suffix
                );
              }else if(configChart?.numberformatter.type==="customTwo"){
                return (
                  configChart?.numberformatter.prefix +
               customFormatter(contnet,1) +
                  configChart?.numberformatter.suffix
                );
              } else{
                return (
                  configChart?.numberformatter.prefix +
                  numeral(contnet).format(
                    configChart?.numberformatter.type !== "custom"
                      ? configChart?.numberformatter.type
                      : configChart?.numberformatter.custom
                  ) +
                  configChart?.numberformatter.suffix
                );
              }
  
   
        case "date":
          return dateFormatter(contnet, configChart?.dateformatter.type);
  
        case "string":
          return contnet
      }
    }
  }else{
    console.log("local_env");
    // console.log(contnet);

    return getType(contnet)=="date"?dateFormatter(contnet,config?.dateformatter.type):getType(contnet)=="number"?
    config?.numberformatter.prefix+numeral(contnet).format(config?.numberformatter.type)+config?.numberformatter.suffix
    :contnet
  }




};


// let config = [
//   {
//     colName: "X.1",
//     colType: "number",
//     outputFormat: "1,000",
//     colFormat: "",
//     colPrefix: "",
//     colSuffix: "",
//     overwrite: true,
//   },
//   {
//     colName: "2018",
//     colType: "number",
//     outputFormat: "matchInput",
//     colFormat: "12345.67",
//     colPrefix: "",
//     colSuffix: "K",
//     overwrite: true,
//   },
//   {
//     colName: "2019",
//     colType: "number",
//     outputFormat: "matchInput",
//     colFormat: "12345.67",
//     colPrefix: "",
//     colSuffix: "",
//     overwrite: false,
//   },
//   {
//     colName: "2020",
//     colType: "number",
//     outputFormat: "matchInput",
//     colFormat: "12345.67",
//     colPrefix: "",
//     colSuffix: "",
//     overwrite: false,
//   },
// ];
console.log(dateFormatter('2023-10-15T00:00:00.000', "MM/yyyy"));

module.exports = { autoForamtter,customFormatter };
