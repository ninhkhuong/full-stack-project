//number of elevator required commercial
const resElv = (req, res) => {
    const elvReq = (numFloors, numApps) => {
        const elevatorsRequired = Math.ceil(numApps / numFloors / 6)*Math.ceil(numFloors / 20);
        return elevatorsRequired
      }
      const numFloors = parseInt(req.query.numFloors)
      const numApps = parseInt(req.query.numApps)
      const numElv = elvReq(numFloors, numApps)
      res.status(200).json({ numElv })
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