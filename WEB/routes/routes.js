const express = require('express');
const auth =require('../middleware/auth/auth');
const auth1 =require('../middleware/auth/auth1');
const {getSpecificAdminUsers} = require("../controllers/UserController");
const {ResetPasswordUser} = require("../controllers/UserController");
const {resetPassword} = require("../controllers/UserController");
const {forgotPassword} = require("../controllers/UserController");
const {login} = require("../controllers/UserController");
const {deleteUsers} = require("../controllers/UserController");
const {getSpecificUser} = require("../controllers/UserController");
const {UserActiveEmail} = require("../controllers/UserController");
const {addUsers} = require("../controllers/UserController");
const {getUserAll} = require("../controllers/UserController");
const {adminAddUsers} = require("../controllers/UserController");
const {updateProfile} = require("../controllers/UserController");
const { addVehicle, getAllVehicle, getOneVehicle, updateVehicle, deleteVehicle, getAllItemsByType, getAllActiveItemsByType,getAllInactiveItemsByType} = require('../controllers/vehicleController');
const {addType,getAllType,getOneType,updateType,deleteType} = require('../controllers/VehicleTypeController');

const router = express.Router();

router.post('/vehicleType',addType);
router.get('/vehicleTypes',getAllType);
router.get('/vehicleType/:id',getOneType);
router.put('/vehicleType/:id',updateType);
router.delete('/vehicleType/:id',deleteType);


//item routes
router.post('/vehicle',addVehicle);
router.get('/vehicles',getAllVehicle);
router.get('/vehicle/:id',getOneVehicle);
router.put('/vehicle/:id',updateVehicle);
router.delete('/vehicle/:id',deleteVehicle);
router.get('/getAllVehicleByType/:id',getAllItemsByType);
router.get('/getAllActiveItemsByType',getAllActiveItemsByType);
router.get('/getAllInactiveItemsByType',getAllInactiveItemsByType);


//users routes
router.post('/register',addUsers );
router.post('/activate',UserActiveEmail );
router.get('/', auth,getSpecificUser);
router.post('/login',login);
router.post('/admin_register',adminAddUsers);
router.post('/all',getUserAll);
router.put('/update',auth,updateProfile);
router.delete('/delete/:id',auth,deleteUsers);
router.post('/forgot_password',forgotPassword);
router.post('/reset_password',auth1,resetPassword);
router.post('/update_password/:id',ResetPasswordUser);
router.get('/:id', getSpecificAdminUsers);

module.exports = {
    routes: router
}

