'use strict';

const firebase = require('../db');
const supplier = require('../models/vehicleType');
const firestore = firebase.firestore();

const addType = async(req,res,next) => {
    try{
        const data = req.body;
        await firestore.collection('type').doc().set(data);
        res.send('type saved successfully')
    }catch(error){
        res.status(400).send(error.message);
    }
}

const getAllType = async(req,res,next) => {
    try{
        const type = await firestore.collection('type');
        const data = await type.get();
        const typeArray = [];
        if (data.empty){
            res.status(404).send('No type record found')
        }else{
            data.forEach(doc =>{
                const VehicleType = new supplier(
                    doc.id,
                    doc.data().typeName,
                    doc.data().typePic,
                );
                typeArray.push(VehicleType);
            });
            res.send(typeArray);
        }
    }catch(error){
        res.status(400).send(error.message);
    }
}

const getOneType = async(req,res,next) => {
    try{
        const id = req.params.id;
        const type = await firestore.collection('type').doc(id);
        const data = await type.get();
        if (!data.exists){
            res.status(404).send('No type record found')
        }else{
            res.send(data.data());
        }
    }catch(error){
        res.status(400).send(error.message);
    }
}

const updateType= async(req,res,next) => {
    try{
        const id = req.params.id;
        const data = req.body;

        const type = await firestore.collection('type').doc(id);
        await type.update(data);
        res.status(200).send('type data updated successfully');

    }catch(error){
        res.status(400).send(error.message);
    }
}

const deleteType = async(req,res,next) => {
    try{
        const id = req.params.id;


        await firestore.collection('type').doc(id).delete();
        res.status(200).send('type data deleted successfully');

    }catch(error){
        res.status(400).send(error.message);
    }
}

module.exports = {
    addType,
    getAllType,
    getOneType,
    updateType,
    deleteType
}
