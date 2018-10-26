const data = require('./generate-test-data.json');
const {Item, Shop} = require('../src/gilded_rose');

describe('Gilded rose', () => {

  it('should cover legacy functionality', () => {
    data.forEach(({ before, after }) => {
      const shop = new Shop([new Item(before.name, before.sellIn, before.quality)]);
      const [item] = shop.updateQuality();
      expect(item.name).toEqual(after.name);
      expect(item.sellIn).toEqual(after.sellIn);
      expect(item.quality).toEqual(after.quality);
    });
  });

  it('All items have a SellIn value which denotes the number of days we have to sell the item', () => {
    const item = new Item('', 1, 0);
    expect(item.sellIn).toEqual(1);
  });

  it('All items have a Quality value which denotes how valuable the item is', () => {
    const item = new Item('', 0, 1);
    expect(item.quality).toEqual(1);
  });

  it('At the end of each day our system lowers both values for every item', () => {
    const item = new Item('', 1, 1);
    const shop = new Shop([item]);
    const [updatedItem] = shop.updateQuality();
    expect(updatedItem).toEqual(jasmine.objectContaining({
      name: '', sellIn: 0, quality: 0
    }));
  })

});

