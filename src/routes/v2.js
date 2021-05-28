'use strict';

const fs = require('fs');
const express = require('express');
const Collection = require('../auth/models/data-collection.js');
const permession = require('../auth/middleware/acl.js');
const bearerAuth = require('../auth/middleware/bearer.js');

const router = express.Router();

const models = new Map();

router.param('model', (req, res, next) => {
  const modelName = req.params.model;
  if (models.has(modelName)) {
    req.model = models.get(modelName);
    next();
  } else {
    const fileName = `${__dirname}/../auth/models/${modelName}/model.js`;
    if (fs.existsSync(fileName)) {
      const model = require(fileName);
      models.set(modelName, new Collection(model));
      req.model = models.get(modelName);
      next();
    }
    else {
      next("Invalid Model");
    }
  }
});

router.get('/:model', bearerAuth,permession('read'),handleGetAll);
router.get('/:model/:id', bearerAuth,permession('read'), handleGetOne);
router.post('/:model',  bearerAuth,permession('create'),handleCreate);
router.put('/:model/:id',  bearerAuth,permession('update'),handleUpdate);
router.delete('/:model/:id', bearerAuth,permession('delete'),handleDelete);

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
async function handleGetAll(req, res) {
  let allRecords = await req.model.get();
  res.status(200).json(allRecords);
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */

async function handleGetOne(req, res) {
  const id = req.params.id;
  let theRecord = await req.model.get(id)
  res.status(200).json(theRecord);
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */

async function handleCreate(req, res) {
  let obj = req.body;
  let newRecord = await req.model.create(obj);
  res.status(201).json(newRecord);
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */

async function handleUpdate(req, res) {
  const id = req.params.id;
  const obj = req.body;
  let updatedRecord = await req.model.update(id, obj)
  res.status(200).json(updatedRecord);
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */

async function handleDelete(req, res) {
  let id = req.params.id;
  let deletedRecord = await req.model.delete(id);
  res.status(200).json(deletedRecord);
}


module.exports = router;
