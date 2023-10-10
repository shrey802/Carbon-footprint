const fs = require("fs");
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const port = 5500;
const User = require("./user.js");
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/CarbonDB")
  .then(() => {
    console.log("Database Connected");
  })
  .catch((e) => {
    console.log(e);
    console.log("Database Can't Be Connected");
  });

// Schema Definition
const carbonValueSchema = new mongoose.Schema({
  value: {
    type: Number,
    required: true
  }
});

// Model Definition
const CarbonValue = mongoose.model("CarbonValue", carbonValueSchema);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'registration.html'));
})

app.post("/reg", async (req, res) => {
  const userData = new User(req.body);
  await userData.save();
  let a = fs.readFileSync("registration.html");
  res.send(a.toString());
});

app.get('/calci', (req, res) => {
  try {
    let carbonCalculationHTML = fs.readFileSync('carbon_calculator.html', 'utf8');
    res.send(carbonCalculationHTML);
  } catch (error) {
    console.error('Error reading "carbon_calculator.html":', error);
    res.status(500).send('Internal Server Error');
  }
});



// function calculateFootprint(event) {
//   const form = event.target;
//   const formData = new FormData(form);

//   const waterDrinking = parseFloat(formData.get('waterDrinking'));
//   const waterBathing = parseFloat(formData.get('waterBathing'));
//   const waterCooking = parseFloat(formData.get('waterCooking'));
//   const clothesWashing = parseFloat(formData.get('clothesWashing'));
//   const utensilsWashing = parseFloat(formData.get('utensilsWashing'));
//   const houseWashing = parseFloat(formData.get('houseWashing'));
//   const toiletFlushing = parseFloat(formData.get('toiletFlushing'));
//   const foodPreparation = parseFloat(formData.get('foodPreparation'));
//   const fans = parseFloat(formData.get('fans'));
//   const ac = parseFloat(formData.get('ac'));
//   const lights = parseFloat(formData.get('lights'));
//   const elevator = parseFloat(formData.get('elevator'));
//   const devicesMobile = parseFloat(formData.get('devicesMobile'));
//   const devicesComputer = parseFloat(formData.get('devicesComputer'));
//   const devicesLaptops = parseFloat(formData.get('devicesLaptops'));
//   const clothingFootwear = parseFloat(formData.get('clothingFootwear'));
//   const carMileage = parseFloat(formData.get('carMileage'));
//   const bikeMileage = parseFloat(formData.get('bikeMileage'));
//   const busMileage = parseFloat(formData.get('busMileage'));
//   const rickshawMileage = parseFloat(formData.get('rickshawMileage'));

//   // Constants for average values
//   const averageWaterDrinking = 0.005; // liters per day
//   const averageWaterBathing = 0.055; // liters per day
//   const averageWaterCooking = 0.005; // liters per day
//   const averageClothesWashing = 0.020; // liters per day
//   const averageUtensilsWashing = 0.010; // liters per day
//   const averageHouseWashing = 0.010; // liters per day
//   const averageToiletFlushing = 0.010; // liters per day
//   const averageFoodPreparation = 0.2; // kg CO2 per meal
//   const averageFans = 0.018; // kWh per hour
//   const averageAC = 0.386; // kWh per hour
//   const averageLights = 0.055; // kWh per hour
//   const averageElevator = 0.02; // kWh per floor
//   const averageDevicesMobile = 0.17; // kg CO2 per hour
//   const averageDevicesComputer = 0.266; // kg CO2 per hour
//   const averageDevicesLaptops = 0.022; // kg CO2 per hour
//   const averageClothingFootwear = 0.019; // kg CO2 per day
//   const averageCarEmission = 0.171; // kg CO2 per km
//   const averageBikeEmission = 0.132; // kg CO2 per km
//   const averageBusEmission = 0.345; // kg CO2 per km
//   const averageRickshawEmission = 0.079; // kg CO2 per km

//   // Calculate the footprint based on the form field values
//   const totalWaterFootprint =
//     waterDrinking * averageWaterDrinking +
//     waterBathing * averageWaterBathing +
//     waterCooking * averageWaterCooking +
//     clothesWashing * averageClothesWashing +
//     utensilsWashing * averageUtensilsWashing +
//     houseWashing * averageHouseWashing +
//     toiletFlushing * averageToiletFlushing +
//     foodPreparation * averageFoodPreparation;

//   const totalElectricityFootprint =
//     fans * averageFans +
//     ac * averageAC +
//     lights * averageLights +
//     elevator * averageElevator +
//     devicesMobile +
//     devicesComputer +
//     devicesLaptops +
//     clothingFootwear * averageClothingFootwear;

//   const totalTransportationFootprint =
//     carMileage * averageCarEmission +
//     bikeMileage * averageBikeEmission +
//     busMileage * averageBusEmission +
//     rickshawMileage * averageRickshawEmission;

//   const totalFootprint =
//     totalWaterFootprint + totalElectricityFootprint + totalTransportationFootprint;

//   return totalFootprint;
// }


// app.post('/storeData', async (req, res) => {
//   try {
//     // Calculate the carbon footprint using your calculation logic
//     const totalFootprint = calculateFootprint(req.body);

//     // Create a new document in the CarbonValue collection
//     const carbonValueData = new CarbonValue({
//       value: totalFootprint,
//     });

//     await carbonValueData.save();

//     console.log('Data inserted into MongoDB');
    
//   } catch (error) {
//     console.error(error);
//     res.sendStatus(500);
//   }

// });

app.post('/storeData', async (req, res) => {
  try {
    const waterDrinking = parseFloat(req.body.waterDrinking);
  const waterBathing = parseFloat(req.body.waterBathing);
  const waterCooking = parseFloat(req.body.waterCooking);
  const clothesWashing = parseFloat(req.body.clothesWashing);
  const utensilsWashing = parseFloat(req.body.utensilsWashing);
  const houseWashing = parseFloat(req.body.houseWashing);
  const toiletFlushing = parseFloat(req.body.toiletFlushing);
  const foodPreparation = parseFloat(req.body.foodPreparation);
  const fans = parseFloat(req.body.fans);
  const ac = parseFloat(req.body.ac);
  const lights = parseFloat(req.body.lights);
  const elevator = parseFloat(req.body.elevator);
  const devicesMobile = parseFloat(req.body.devicesMobile);
  const devicesComputer = parseFloat(req.body.devicesComputer);
  const devicesLaptops = parseFloat(req.body.devicesLaptops);
  const clothingFootwear = parseFloat(req.body.clothingFootwear);
  const carMileage = parseFloat(req.body.carMileage);
  const bikeMileage = parseFloat(req.body.bikeMileage);
  const busMileage = parseFloat(req.body.busMileage);
  const rickshawMileage = parseFloat(req.body.rickshawMileage);

  
  const averageWaterDrinking = 0.005; // liters per day
  const averageWaterBathing = 0.055; // liters per day
  const averageWaterCooking = 0.005;  // liters per day
  const averageClothesWashing = 0.020; // liters per day
  const averageUtensilsWashing = 0.010; // liters per day
  const averageHouseWashing = 0.010;    // liters per day
  const averageToiletFlushing = 0.010; // liters per day
  const averageFoodPreparation = 0.2; // kg CO2 per meal
  const averageFans = 0.018;  // kWh per hour
  const averageAC = 0.386;   // kWh per hour
  const averageLights = 0.055; // kWh per hour
  const averageElevator = 0.02; // kWh per floor
  const averageDevicesMobile = 0.17; // kg CO2 per hour
  const averageDevicesComputer = 0.266; // kg CO2 per hour
  const averageDevicesLaptops = 0.022; // kg CO2 per hour
  const averageClothingFootwear = 0.019; // kg CO2 per day
  const averageCarEmission = 0.171;    // kg CO2 per km
  const averageBikeEmission = 0.132;   // kg CO2 per km
  const averageBusEmission = 0.345;    // kg CO2 per km
  const averageRickshawEmission = 0.079; // kg CO2 per km

  
  const totalWaterFootprint = (waterDrinking * averageWaterDrinking) +
                              (waterBathing * averageWaterBathing) +
                              (waterCooking * averageWaterCooking) +
                              (clothesWashing * averageClothesWashing) +
                              (utensilsWashing * averageUtensilsWashing) +
                              (houseWashing * averageHouseWashing) +
                              (toiletFlushing * averageToiletFlushing) +
                              foodPreparation;

  const totalElectricityFootprint = (fans * averageFans) +
                                    (ac * averageAC) +
                                    (lights * averageLights) +
                                    (elevator * averageElevator) +
                                    devicesMobile +
                                    devicesComputer +
                                    devicesLaptops +
                                    clothingFootwear;

  const totalTransportationFootprint = (carMileage * averageCarEmission) +
                                      (bikeMileage * averageBikeEmission) +
                                      (busMileage * averageBusEmission) +
                                      (rickshawMileage * averageRickshawEmission);

  const totalFootprint = totalWaterFootprint + totalElectricityFootprint + totalTransportationFootprint;
  const carbonData = new CarbonValue({
    value: totalFootprint
  })
  await carbonData.save();
  res.sendStatus(200);
  
  } catch (error) {
    console.log(error);
  }
});


app.listen(port, () => {
  console.log("App Running on port: ", port);
});