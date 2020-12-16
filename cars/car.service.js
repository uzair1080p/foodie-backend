const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.Car.findAll();
}

async function getById(id) {
    return await getCar(id);
}

async function create(params) {
    await db.Car.create(params);
}

async function update(id, params) {
    const car = await getCar(id);
    // copy params to user and save
    Object.assign(car, params);
    await car.save();

    return car.get();
}

async function _delete(id) {
    const car = await getCar(id);
    await car.destroy();
}

// helper functions

async function getCar(id) {
    const car = await db.Car.findByPk(id);
    if (!car) throw 'Car not found';
    return car;
}