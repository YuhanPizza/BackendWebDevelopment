const { v4: uuidv4 } = require('uuid');
const prompt = require('prompt-sync')();

let a_car=[
    {type: "Truck", licensePlate:"ABC 124", avail: false},
    {type: "Sedan", licensePlate:"BXL 009", avail: true},
    {type: "SUV", licensePlate:"KML 155", avail: true}
];

let reservationDetails = {
    id: "",
    type: "",
    licensePlate: "",
    days: 0,
    needsCarSit: "",
    subtotal: 0.0,
    tax: 0.0,
    total: 0.0,
};

let reservations = [];
//To Do create function that loops through Type and Availability 
const findVehicle = (carType) =>{
    for(let i = 0;i < a_car.length; i++){
        if(a_car[i].type === carType && a_car[i].avail === true){
            return i;
        }
    }
    return -1;
};

//To Do create a function that stores users reservation details.
const createReservation = (reservationDetails) => {
    reservationDetails.type = prompt("What type of car do you want to rent? ");
    reservationDetails.days = prompt("How many days? (min 1): ");
    reservationDetails.needsCarSeat = prompt("Do you need a car seat? (y/n): ");

    let found = findVehicle(reservationDetails.type);
    if(found > -1 ){
        reservationDetails.licensePlate = a_car[found].licensePlate;
        reservationDetails.id = uuidv4();

        let fee = reservationDetails.days
            ,seatFee = 0
                , tax = 13;

    
    switch (reservationDetails.type){
        case "SUV":
            fee *= 15;
            break;
        case "Sedan":
            fee *= 10;
            break;
        default:
            fee *= 20;
            break;
    }
    if (reservationDetails.needsCarSeat){
        seatFee = reservationDetails.days;
        if(reservationDetails.days >= 3){
            seatFee *=2;
        }
        else{
            seatFee *= 5;
        }
    }
    reservationDetails.subtotal = fee + seatFee;
    reservationDetails.tax = (reservationDetails.subtotal * tax) /100;
    reservationDetails.total = reservationDetails.subtotal + reservationDetails.tax;
    console.log("\n-------------------");
    console.log("RECEIPT");
    console.log("-------------------");
    console.log(`Reservation Number: ${reservationDetails.id}`);
    console.log(`Car Type: ${reservationDetails.type}`);
    console.log(`LicensePlate: ${reservationDetails.licensePlate}`);
    console.log(`Subtotal: $${reservationDetails.subtotal.toFixed(2)}`);
    console.log(`Tax: $${reservationDetails.tax}`);
    console.log(`Total: $${reservationDetails.total}`);
    reservations.push(reservationDetails);
    }
    else {
        console.log("\nA matching vehicle cannot be found");
    }
};

const main = () => {
    console.log("-------------------------------");
    console.log("Welcome to Lorenzo's Car Rentals");
    console.log("-------------------------------");
    createReservation(reservationDetails);
};

main();