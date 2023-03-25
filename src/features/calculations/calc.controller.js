


//number of elevator required commercial
const elvReq = (req, res) => {
  try {
      const buildingType = req.params.buildingType;
      const numFloors = parseInt(req.query.numFloors);
      const numApps = parseInt(req.query.numApps);
      const maxOccupancy = parseInt(req.query.maxOccupancy);
      const numElevators = parseInt(req.query.numElevators);

        // Validate path params
    if (buildingType !== 'residential' && buildingType !== 'commercial' && buildingType !== 'industrial') {
          res.status(400).json({ error: 'Invalid building type' });
          return;
        }
    if (!Number.isInteger(numFloors) && !Number.isInteger(numApps) && !Number.isInteger(maxOccupancy) && !Number.isInteger(numElevators)) {
        res.status(400).json({ error: 'Parameters must be integers' });
        return;
      }

      const calculateElevatorsRequired = (buildingType, numFloors, numApps, maxOccupancy) => {
          if (buildingType === "residential") {
              return Math.ceil(numApps / numFloors / 6) * Math.ceil(numFloors / 20);
          } else if (buildingType === "commercial") {
              const elevatorsRequired = Math.ceil((maxOccupancy * numFloors) / 200) * Math.ceil(numFloors / 10);
              const freighElevatorsRequired = Math.ceil(numFloors / 10);
              return freighElevatorsRequired + elevatorsRequired;
          } else {
              return numElevators;
          }
      };

      const numElv = calculateElevatorsRequired(buildingType, numFloors, numApps, maxOccupancy);

      res.status(200).json({ numElv });

  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};



//price per elv unit and install percent fees
const unitPrices = {
    standard: 8000,
    premium: 12000,
    excelium: 15000,
  };
  
  const installPercentFees = {
    standard: 1.10,
    premium: 1.15,
    excelium: 1.20,
  };

//calculate quote 
const quotePrice = (req, res) => {
    try {
        //input
        const productLineSelected = req.params.productLineSelected;
        const numElvReq = req.query.numElvReq;

        //validate path params
        if (productLineSelected !== 'standard' && productLineSelected !== 'premium'&& productLineSelected !== 'excelium') {
            res.status(400).json({ error: 'Invalid building type' });
            return;
          }

        //output
        let unitPrice = unitPrices[productLineSelected];
        let installPercentFee = installPercentFees[productLineSelected];
        let subtotal = unitPrice * numElvReq;
        let totalInstallFee = (installPercentFee / 100) * subtotal;
        let totalPrice = subtotal + totalInstallFee;

        const calculatePrice = (productLineSelected, numElvReq) => {
            return {unitPrice, subtotal, totalInstallFee, totalPrice};
        }
        
        const calcTotal = calculatePrice(productLineSelected, numElvReq);
        console.log(calcTotal);

        res.status(200).json({ calcTotal });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { elvReq, quotePrice };

  
 
  
// function calcInstallFee(totalPrice, installPercentFee) {
//     return (installPercentFee / 100) * totalPrice;
// }

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