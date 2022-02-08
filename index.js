const AWS = require('aws-sdk')


async function writeConfig(dbTableName,region,config) {
    console.log('writeConfig called')
    const docClient = new AWS.DynamoDB.DocumentClient({region});

    var item = {id: 'scrapingconfig', config: config}
    var params = {TableName: dbTableName, Item: item }
    try {
        console.log('about to write')
        const result = await docClient.put(params).promise();
        console.log('returned from write')
        console.log(result);
        return result;      
    } catch (err) {
        console.log('error in writeConfig')
        console.log(err);
    }
}

async function resetConfig(dbTableName,region) {
    console.log('resetConfig called');
    var config = {
        urls : [{url:'https://www.tesco.com/groceries/en-GB/shop/fresh-food/all',state:"ready",nextInChain:""},
                {url:'https://www.tesco.com/groceries/en-GB/shop/bakery/all',state:"ready",nextInChain:""},
                {url:'https://www.tesco.com/groceries/en-GB/shop/frozen-food/all',state:"ready",nextInChain:""},
                {url:'https://www.tesco.com/groceries/en-GB/shop/food-cupboard/all',state:"ready",nextInChain:""},
                {url:'https://www.tesco.com/groceries/en-GB/shop/drinks/all',state:"ready",nextInChain:""},
                {url:'https://www.tesco.com/groceries/en-GB/shop/baby/all',state:"ready",nextInChain:""},
                {url:'https://www.tesco.com/groceries/en-GB/shop/health-and-beauty/all',state:"ready",nextInChain:""},
                {url:'https://www.tesco.com/groceries/en-GB/shop/pets/all',state:"ready",nextInChain:""},
                {url:'https://www.tesco.com/groceries/en-GB/shop/household/all',state:"ready",nextInChain:""},
                {url:'https://www.tesco.com/groceries/en-GB/shop/home-and-ents/all',state:"ready",nextInChain:""},
                {url:'https://www.tesco.com/groceries/en-GB/shop/easter/all',state:"ready",nextInChain:""},
            ]
        }
        var result = await writeConfig(dbTableName,region,config);
        return result;
}

exports.resetConfig = resetConfig