const services = require('../app/modules/users/services');
const dataBase = require('../app/services/mongoose');
const controller = require('../app/modules/users/controller');
const  mongoose  = require('mongoose');

let connection;
let db;
beforeAll(async ()=>{
    connection = await dataBase();
});

afterAll(async () => {

    await mongoose.disconnect();
})

describe('test user', () => {
    test('get user', async () => {
        const res = await controller.getUser("61b85401eec0a488a53aea2c");
        console.log(res);
        expect(res.name).toBe('Manuel');
    }),
    test('modificar un usuario', async () => {
        const data = {
            name: "cambiando"
        };
        const res = await controller.updateUser('61b8546aeec0a488a53aea2e', data);
        console.log(res);
        expect(res).toBe(undefined);
    }),
    test('agregar usuario', () => {
        
    })
    
    
    
});