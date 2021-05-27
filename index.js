const fetch = require('node-fetch');
const cheerio = require('cheerio');
const Sheet = require('./sheet');

const getPrice = async (url) => {
    const res = await fetch('https://www.investing.com/equities/tesla-motors');
    const text = await res.text();
    const $ = cheerio.load(text);
    const price = $('.instrument-price_last__KQzyA').text();
    return price;
}

(async () => {
    const sheet = new Sheet();
    await sheet.load();
    const stocks = await sheet.getRows(0);
    
    const dayPrices = {};

    for(let stock of stocks) {
        const price = await getPrice(stock.url);
        dayPrices[stock.ticker] = price;
    }

    dayPrices.date = new Date().toDateString();

    await sheet.addRows([dayPrices], 1);

})();