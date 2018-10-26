const data = require('./generate-test-data.json');
const {Item, Shop} = require('../src/gilded_rose');

describe('Gilded rose', () => {

  it('should cover legacy functionality', function() {
    data.forEach(({ before, after }) => {
      const shop = new Shop([new Item(before.name, before.sellIn, before.quality)]);
      const [item] = shop.updateQuality();
      expect(item.name).toEqual(after.name);
      expect(item.sellIn).toEqual(after.sellIn);
      expect(item.quality).toEqual(after.quality);
    });
  });

});

