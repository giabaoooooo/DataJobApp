const careerService = require('../services/careerService');
const cereerModel = require('../modules/career');

exports.getAll = async (req, res, next) => { 
    const result = await careerService.getAll();
    return result;
}