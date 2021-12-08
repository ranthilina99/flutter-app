class Vehicle{
    constructor(id,vehicleTypeId,vehicleName,vehiclePrice,vehiclePic,active,enable){
        this.id = id;
        this.vehicleTypeId = vehicleTypeId;
        this.vehicleName = vehicleName;
        this.vehiclePrice = vehiclePrice;
        this.vehiclePic = vehiclePic;
        this.active = active;
        this.enable= enable;
    }
}

module.exports = Vehicle;
