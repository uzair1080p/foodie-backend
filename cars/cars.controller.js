const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const carService = require('./car.service');

const multer = require('multer')
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/uploads/cars/')
        },
        filename: function (req, file, cb) {
            const ext = file.originalname.split('.').pop()
            cb(null, 'car-' + Date.now() + '.' + ext)
        }
    })
})

// routes
router.post('/', upload.single('image'), updateSchema, create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', upload.single('image'), updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;

function create(req, res, next) {
    if(req.file){
        req.body.image = req.file.filename
    }
    carService.create(req.body)
        .then(() => res.json({ message: 'Car created successfully' }))
        .catch(next);
}

function getAll(req, res, next) {
    carService.getAll()
        .then(cars => res.json(cars))
        .catch(next);
}

function getById(req, res, next) {
    carService.getById(req.params.id)
        .then(car => res.json(car))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().empty(''),
        make: Joi.string().empty(''),
        model: Joi.string().empty(''),
        price: Joi.number().greater(0),
        dealership: Joi.string().empty('')
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    if(req.file){
        req.body.image = req.file.filename
    }
    carService.update(req.params.id, req.body)
        .then(car => res.json(car))
        .catch(next);
}

function _delete(req, res, next) {
    carService.delete(req.params.id)
        .then(() => res.json({ message: 'Car deleted successfully' }))
        .catch(next);
}