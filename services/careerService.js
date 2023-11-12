exports.getAll = async () => { 
    const data = await careerModel.find();
    return data;
}