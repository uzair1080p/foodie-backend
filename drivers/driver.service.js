const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ email, password }) {
    const driver = await db.Driver.scope('withHash').findOne({ where: { email } });

    if (!driver || !(await bcrypt.compare(password, driver.hash)))
        throw 'Username or password is incorrect';

    // authentication successful
    const token = jwt.sign({ sub: driver.id }, config.secret, { expiresIn: '7d' });
    return { ...omitHash(driver.get()), token };
}

async function getAll() {
    return await db.Driver.findAll();
}

async function getById(id) {
    return await getDriver(id);
}

async function create(params) {
    // validate
    if (await db.Driver.findOne({ where: { email: params.email } })) {
        throw 'Username "' + params.email + '" is already taken';
    }

    // hash password
    if (params.password) {
        params.hash = await bcrypt.hash(params.password, 10);
    }

    // save user
    await db.Driver.create(params);
}

async function update(id, params) {
    const driver = await getDriver(id);

    // validate
    const emailChanged = params.email && driver.email !== params.email;
    if (emailChanged && await db.Driver.findOne({ where: { email: params.email } })) {
        throw 'Email "' + params.email + '" is already taken';
    }
    const usernameChanged = params.username && user.username !== params.username;
    if (usernameChanged && await db.Driver.findOne({ where: { username: params.username } })) {
        throw 'Username "' + params.username + '" is already taken';
    }

    // hash password if it was entered
    if (params.password) {
        params.hash = await bcrypt.hash(params.password, 10);
    }

    // copy params to driver and save
    Object.assign(driver, params);
    await driver.save();

    return omitHash(driver.get());
}

async function _delete(id) {
    const driver = await getDriver(id);
    await driver.destroy();
}

// helper functions

async function getDriver(id) {
    const driver = await db.Driver.findByPk(id);
    if (!driver) throw 'Driver not found';
    return driver;
}

function omitHash(user) {
    const { hash, ...userWithoutHash } = user;
    return userWithoutHash;
}