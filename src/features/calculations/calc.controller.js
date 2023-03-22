//number of elevator required commercial
const resElv = (req, res) => {
    try {
      const elvReq = (numFloors, numApps) => {
        const elevatorsRequired = Math.ceil(numApps / numFloors / 6)*Math.ceil(numFloors / 20);
        return elevatorsRequired
      }
      const numFloors = parseInt(req.query.numFloors)
      const numApps = parseInt(req.query.numApps)
  
      if (isNaN(numFloors) || isNaN(numApps)) {
        throw new Error('Invalid input: numFloors and numApps must be integers.')
      }
  
      const numElv = elvReq(numFloors, numApps)
      res.status(200).json({ numElv })
    } catch (error) {
      res.status(400).json({ error: error.message })
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