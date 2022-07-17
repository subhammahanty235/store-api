const product = require('../models/product')
const Product = require('../models/product')
const getAllProductsStatic = async (req, res) => {
    const data = await Product.find({});
    res.status(200).json({ data, total: data.length })
    // res.json(data);

}
const getAllProducts = async (req, res) => {
    const { featured, company, name, sort, fields, dataFilter } = req.query;

    const queryData = {

    }
    if (featured) {
        queryData.featured = featured === 'true' ? 'true' : 'false';
    }
    if (company) {
        queryData.company = company
    }
    if (name) {
        queryData.name = { $regex: name, $options: 'i' };
    }
    if (dataFilter) {
        const operatormp = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
        }
        const regEx = /\b(<|>|>=|=|<|<=)\b/g
        let filters = dataFilter.replace(regEx , (match)=>`-${operatormp[match]}-`)
        const options = ['price' , 'rating'];
        filters = filters.split(',').forEach((item)=>{
            const [field , operator , value] = item.split('-');
            if(options.includes(field)){
                queryData[field] = {[operator]:Number(value)}
            }
        });
        
    }

    let data = Product.find(queryData)
    if (sort) {
        const sortList = sort.split(',').join()
        data = data.sort(sortList)
    }
    else {
        data = data.sort('createdAt')
    }
    if (fields) {
        const fieldList = fields.split(',').join();
        data = data.select(fieldList)
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit;
    data = data.skip(skip).limit(limit)

    const products = await data;
    res.status(200).json({ products, total: products.length })

}
const addNewProduct = async (req, res) => {
    const { name, price, company, featured } = req.body
    const new_data = new Product({
        name, price, company, featured
    })
    try {
        await new_data.save();
        res.status(200).json(new_data)
        console.log("saved Successfully")
    } catch (error) {
        console.log(error)
    }
}

module.exports = { getAllProducts, getAllProductsStatic, addNewProduct }