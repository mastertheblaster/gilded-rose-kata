const {Item, Shop} = require('../src/gilded_rose');

describe('Gilded rose', () => {
  it('should foo', function() {
    const gildedRose = new Shop([ new Item('foo', 0, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toEqual('fixme');
  });
});

