const fs = require('fs');
const { Item, Shop } = require('../src/gilded_rose');

const data = [];

range(90).forEach(sellIn => {
  range(90).forEach(quality => {
    ['Aged Brie', 'Backstage passes to a TAFKAL80ETC concert', 'Sulfuras, Hand of Ragnaros'].forEach(name => {
      const item = new Item(name, sellIn, quality);
      const shop = new Shop([item]);
      data.push({
        before: { name, sellIn, quality },
        after: shop.updateQuality()[0]
      });
    });
  });
});

fs.writeFileSync('./spec/generate-test-data.json', JSON.stringify(data, null, 2));

function range(size) {
  return [...Array(size * 2 + 1).keys()].map(i => i - size);
}
