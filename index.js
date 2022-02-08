const AWS = require('aws-sdk')


async function writeConfig(dbTableName,region,config) {
    const docClient = new AWS.DynamoDB.DocumentClient({region});

    var item = {id: 'scrapingconfig', config: config}
    var params = {TableName: dbTableName, Item: item }
    try {
        const result = await docClient.put(params).promise();
        return result;      
    } catch (err) {
        console.log('error in writeConfig')
        console.log(err);
    }
}

async function resetConfig(dbTableName,region) {
    var config = {
        urls : [{url:'https://www.tesco.com/groceries/en-GB/shop/fresh-food/all',state:"ready",nextInChain:""},
                {url:'https://www.tesco.com/groceries/en-GB/shop/bakery/all',state:"ready",nextInChain:""},
                {url:'https://www.tesco.com/groceries/en-GB/shop/frozen-food/all',state:"ready",nextInChain:""},
                {url:'https://www.tesco.com/groceries/en-GB/shop/food-cupboard/all',state:"ready",nextInChain:""},
                {url:'https://www.tesco.com/groceries/en-GB/shop/drinks/all',state:"ready",nextInChain:""},
                {url:'https://www.tesco.com/groceries/en-GB/shop/baby/all',processed:false},
                {url:'https://www.tesco.com/groceries/en-GB/shop/health-and-beauty/all',state:"ready",nextInChain:""},
                {url:'https://www.tesco.com/groceries/en-GB/shop/pets/all',state:"ready",nextInChain:""},
                {url:'https://www.tesco.com/groceries/en-GB/shop/household/all',state:"ready",nextInChain:""},
                {url:'https://www.tesco.com/groceries/en-GB/shop/home-and-ents/all',state:"ready",nextInChain:""},
                {url:'https://www.tesco.com/groceries/en-GB/shop/easter/all',state:"ready",nextInChain:""},
            ]
        }
        return writeConfig(dbTableName,region,config);
}

exports.resetConfig = resetConfig