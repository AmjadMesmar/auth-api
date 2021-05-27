'use strict';

const server = require('../src/server.js');
const superTest = require('supertest');
const mongoose = require('mongoose');
require('dotenv').config();
const request = superTest(server.server);

mongoose.connect(process.env.MONGOOSE_TEST_URI, {
    useNewUrlParser: true,
    useUnifiedtopology: true,
  // }, async () => {// delete everything from db after tests
  //   await mongoose.connection.db.drobase();
  });


describe('Food api server', () => {
    afterAll(() => {// we need to close the connection after tests
        mongoose.connection.close();
      });
    let id;
    it('should create a new food using post request', async () => {
        //arrange
        let food = {
            name: 'apple',
            calories: 100,
            type: "fruit"
        }
        //act
        const response = await request.post('/api/v1/food').send(food);
        //assert
        expect(response.status).toEqual(201);
        expect(response.body.name).toEqual('apple');
        expect(response.body.calories).toEqual(100);
        expect(response.body.type).toEqual('FRUIT');
        expect(response.body._id.length).toBeGreaterThan(0);

        id = response.body._id;
    });

    it('should read all food using get request', async () => {
        //arrange
        let food = {
            name: 'apple',
            calories: 100,
            type: "fruit"
        }
        //act
        const response = await request.get('/api/v1/food').send(food);
        //assert
        expect(response.status).toEqual(200);
        expect(response.body[0].name).toEqual('apple');
        expect(response.body[0].calories).toEqual(100);
        expect(response.body[0].type).toEqual('FRUIT');
        expect(response.body[0]._id.length).toBeGreaterThan(0);

    });

    it('should read food with id using get request', async () => {
        //arrange
        let food = {
            name: 'apple',
            calories: 100,
            type: "fruit"
        }
        //act
        const response = await request.get(`/api/v1/food/${id}`).send(food);
        //assert
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual('apple');
        expect(response.body.calories).toEqual(100);
        expect(response.body.type).toEqual('FRUIT');
        expect(response.body._id.length).toBeGreaterThan(0);
    });

    it('should update food using put request', async () => {
        //arrange
        let editFood = {
            name: 'orange',
            calories: 100,
            type: "fruit"
        };
        //act
        const response = await request.put(`/api/v1/food/${id}`)
            .send(editFood);
        //asert
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual('orange');
    });

    it('should delete food with id using delete request', async () => {
        //arrange
        let deleteFood = {
            name: 'orange',
            calories: 100,
            type: "fruit"
        };
        //act
        const response = await request.delete(`/api/v1/food/${id}`)
            .send(deleteFood);
        //asert
        expect(response.status).toEqual(200);
        expect(response.body).toEqual(response.body);
    });

describe('Clothes api server', () => {
    afterAll(() => {// we need to close the connection after tests
        mongoose.connection.close();
      });
    let id;
    it('should create a new clothes using post request', async () => {
        //arrange
        let clothes = {
            name: 'T-Shirt',
            color: 'Blue',
            size: "XL"
        }
        //act
        const response = await request.post('/api/v1/clothes').send(clothes);
        //assert
        expect(response.status).toEqual(201);
        expect(response.body.name).toEqual('T-Shirt');
        expect(response.body.color).toEqual('Blue');
        expect(response.body.size).toEqual('XL');
        expect(response.body._id.length).toBeGreaterThan(0);

        id = response.body._id;
    });

    it('should read all clothes using get request', async () => {
        //arrange
        let clothes = {
            name: 'T-Shirt',
            color: 'Blue',
            size: "XL"
        }
        //act
        const response = await request.get('/api/v1/clothes').send(clothes);
        //assert
        expect(response.status).toEqual(200);
        expect(response.body[0].name).toEqual('T-Shirt');
        expect(response.body[0].color).toEqual('Blue');
        expect(response.body[0].size).toEqual('XL');
        expect(response.body[0]._id.length).toBeGreaterThan(0);

    });

    it('should read clothes with id using get request', async () => {
        //arrange
        let clothes = {
            name: 'T-Shirt',
            color: 'Blue',
            size: "XL"
        }
        //act
        const response = await request.get(`/api/v1/clothes/${id}`).send(clothes);
        //assert
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual('T-Shirt');
        expect(response.body.color).toEqual('Blue');
        expect(response.body.size).toEqual('XL');
        expect(response.body._id.length).toBeGreaterThan(0);
    });

    it('should update clothes using put request', async () => {
        //arrange
        let editClothes = {
            name: 'T-Shirt',
            color: 'Black',
            size:'XL'

        };
        //act
        const response = await request.put(`/api/v1/clothes/${id}`)
            .send(editClothes);
        //asert
        expect(response.status).toEqual(200);
        expect(response.body.color).toEqual('Black');
    });

    it('should delete clothes with id using delete request', async () => {
        //arrange
        let deleteClothes = {
            name: 'T-Shirt',
            color: 'Black',
            size:'XL'
        };
        //act
        const response = await request.delete(`/api/v1/clothes/${id}`)
            .send(deleteClothes);
        //asert
        expect(response.status).toEqual(200);
        expect(response.body).toEqual(response.body);
    });

});

});
