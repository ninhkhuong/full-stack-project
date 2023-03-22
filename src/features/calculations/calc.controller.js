//number of elevator required commercial
const comElv = async (req, res, next) => {
    const numFloors = req.body.numFloors;
    const maxOccupancy = req.body.maxOccupancy;


    const calcCommercialElev = (numFloors, maxOccupancy) => {
        const elevatorsRequired = Math.ceil((maxOccupancy * numFloors) / 200)*Math.ceil(numFloors / 10);
        const freighElevatorsRequired = Math.ceil(numFloors / 10);
        return freighElevatorsRequired + elevatorsRequired;
    };

    try {
        const elevatorsRequired = calcCommercialElev(numFloors, maxOccupancy);
        res.json(elevatorsRequired);
    } catch (error) {
        res.status(500).json({
            message:'An error occurred!',
            error: error.message
        });
    }
};



//number of elevator required residential
const resElv = async (req, res, next) => {
    const numFloors = req.body.numFloors;
    const numApts = req.body.numApts;

    const calcResidentialElev = (numFloors, numApts) => {
        const elevatorsRequired = Math.ceil(numApts / numFloors / 6)*Math.ceil(numFloors / 20);
        console.log(elevatorsRequired)
        return elevatorsRequired;
    };

    try {
        const elevatorsRequired = calcResidentialElev(numFloors, numApts);
        res.json(elevatorsRequired);
    } catch (error) {
        res.status(500).json({
            message:'An error occurred!',
            error: error.message
        });
    }
};
        
module.exports = { comElv, resElv };


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