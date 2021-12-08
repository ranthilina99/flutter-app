'use strict';

const firebase = require('../db');
const items = require('../models/vehicle');
const firestore = firebase.firestore();

const addVehicle = async(req,res,next) => {
    try{
        const data = req.body;
        await firestore.collection('vehicle').doc().set(data);
        res.send('vehicle saved successfully')
    }catch(error){
        res.status(400).send(error.message);
    }
}


const getAllVehicle = async(req,res,next) => {
    try{
        const vehicleItems = await firestore.collection('vehicle');
        const data = await vehicleItems.get();
        const vehicleArray = [];
        if (data.empty){
            res.status(200).send('No vehicleType record found')
        }else{
            data.forEach(doc =>{
                const Vehicle = new items(
                    doc.id,
                    doc.data().vehicleTypeId,
                    doc.data().vehicleName,
                    doc.data().vehiclePrice,
                    doc.data().vehiclePic,
                    doc.data().active,
                    doc.data().enable
                );
                vehicleArray.push(Vehicle);
            });
            res.send(vehicleArray);
        }
    }catch(error){
        res.status(400).send(error.message);
    }
}

const getOneVehicle = async(req,res,next) => {
    try{
        const id = req.params.id;
        const vehicle = await firestore.collection('vehicle').doc(id);
        const data = await vehicle.get();
        if (!data.exists){
            res.status(200).send('No vehicle record found')
        }else{
            res.send(data.data());
        }
    }catch(error){
        res.status(400).send(error.message);
    }
}

const updateVehicle= async(req,res,next) => {
    try{
        const id = req.params.id;
        const data = req.body;

        const vehicle = await firestore.collection('vehicle').doc(id);
        await vehicle.update(data);
        res.status(200).send('vehicle data updated successfully');

    }catch(error){
        res.status(400).send(error.message);
    }
}

const deleteVehicle = async(req,res,next) => {
    try{
        const id = req.params.id;
        await firestore.collection('vehicle').doc(id).delete();
        res.status(200).send('vehicle data deleted successfully');

    }catch(error){
        res.status(400).send(error.message);
    }
}


const getAllItemsByType = async(req,res,next) => {
    try{

        const vehicleItems = await firestore.collection('vehicle').where('vehicleTypeId','==',req.params.id);
        console.log(vehicleItems.get())
        const data = await vehicleItems.get();
        const VehicleItemsArray = [];
        if (data.empty){
            res.status(404).send('No vehicle record found')
        }else{
            data.forEach(doc =>{
                const Item = new items(
                    doc.id,
                    doc.data().vehicleTypeId,
                    doc.data().vehicleName,
                    doc.data().vehiclePrice,
                    doc.data().vehiclePic,
                    doc.data().active,
                    doc.data().enable
                );
                vehicleItems.push(Item);
            });
            res.send(vehicleItems);
        }
    }catch(error){
        res.status(400).send(error.message);
    }
}
const getAllActiveItemsByType = async(req,res,next) => {
    try{

        const vehicleItems = await firestore.collection('vehicle').where('active','==',"true");
        console.log(vehicleItems.get())
        const data = await vehicleItems.get();
        const VehicleItemsArray = [];
        if (data.empty){
            res.status(404).send('No vehicle record found')
        }else{
            data.forEach(doc =>{
                const Item = new items(
                    doc.id,
                    doc.data().vehicleTypeId,
                    doc.data().vehicleName,
                    doc.data().vehiclePrice,
                    doc.data().vehiclePic,
                    doc.data().active,
                    doc.data().enable
                );
                vehicleItems.push(Item);
            });
            res.send(vehicleItems);
        }
    }catch(error){
        res.status(400).send(error.message);
    }
}
const getAllInactiveItemsByType = async(req,res,next) => {
    try{

        const vehicleItems = await firestore.collection('vehicle').where('active','==',"true");
        console.log(vehicleItems.get())
        const data = await vehicleItems.get();
        const VehicleItemsArray = [];
        if (data.empty){
            res.status(404).send('No vehicle record found')
        }else{
            data.forEach(doc =>{
                const Item = new items(
                    doc.id,
                    doc.data().vehicleTypeId,
                    doc.data().vehicleName,
                    doc.data().vehiclePrice,
                    doc.data().vehiclePic,
                    doc.data().active,
                    doc.data().enable
                );
                vehicleItems.push(Item);
            });
            res.send(vehicleItems);
        }
    }catch(error){
        res.status(400).send(error.message);
    }
}

module.exports = {
    addVehicle,
    getAllVehicle,
    getOneVehicle,
    updateVehicle,
    deleteVehicle,
    getAllItemsByType,
    getAllActiveItemsByType,
    getAllInactiveItemsByType
}
