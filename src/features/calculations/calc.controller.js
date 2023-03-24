//number of elevator required commercial
const resElv = (req, res) => {
  try {
      let elvReqres, elvReqcom;
      const displayElvCalcResult = (buildingType) => {
          if (buildingType == "residential"){
              elvReqres = (numFloors, numApps) => {
                  const elevatorsRequired = Math.ceil(numApps / numFloors / 6)*Math.ceil(numFloors / 20);
                  return elevatorsRequired;
              };
          } else if (buildingType == 'commercial'){
              elvReqcom = (numFloors, maxOccupancy) => {
                  const elevatorsRequired = Math.ceil((maxOccupancy * numFloors) / 200)*Math.ceil(numFloors / 10);
                  const freighElevatorsRequired = Math.ceil(numFloors / 10);
                  return freighElevatorsRequired + elevatorsRequired;
              };
          } 
      };

      const buildingType = req.query.buildingType;
      const numFloors = parseInt(req.query.numFloors);
      const numApps = parseInt(req.query.numApps);
      const maxOccupancy = parseInt(req.query.maxOccupancy);
      const numElevators = parseInt(req.query.numElevators);

      const elvReqFn = displayElvCalcResult(buildingType);

      let numElvres, numElvcomm;

      if (buildingType == "residential") {
          numElvres = elvReqres(numFloors, numApps);
          res.status(200).json({ numElv: numElvres });
      } else if (buildingType == "commercial") {
          numElvcomm = elvReqcom(numFloors, maxOccupancy);
          res.status(200).json({ numElv: numElvcomm });
      } else {
          res.status(200).json({ numElv: numElevators });
      }

  } catch (error) {
      res.status(400).json({ error: error.message });
  }
}

module.exports = { resElv };
  
 
  


// const unitPrices = {
//     standard: 8000,
//     premium: 12000,
//     excelium: 15000,
// };
// const installPercentFees = {
//     standard: 10,
//     premium: 15,
//     excelium: 20,
// };

// // CALCULATIONS
// function calcResidentialElev(numFloors, numApts) {
//     const elevatorsRequired = Math.ceil(numApts / numFloors / 6)*Math.ceil(numFloors / 20);
//     console.log(elevatorsRequired)
//     return elevatorsRequired;
// }
// function calcCommercialElev(numFloors, maxOccupancy) {
//     const elevatorsRequired = Math.ceil((maxOccupancy * numFloors) / 200)*Math.ceil(numFloors / 10);
//     const freighElevatorsRequired = Math.ceil(numFloors / 10);
//     return freighElevatorsRequired + elevatorsRequired;
// }

// function calcInstallFee(totalPrice, installPercentFee) {
//     return (installPercentFee / 100) * totalPrice;
// }