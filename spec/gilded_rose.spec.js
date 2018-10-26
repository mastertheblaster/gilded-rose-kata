const data = require('./generate-test-data.json');
const { Item, Shop, names } = require('../src/gilded_rose');

describe('Gilded rose', () => {

  it('should cover legacy functionality', () => {
    data.forEach(({ before, after }) => {
      const shop = new Shop([new Item(before.name, before.sellIn, before.quality)]);
      const [item] = shop.updateQuality();
      expect(item.name).toEqual(after.name);
      expect(item.sellIn).toEqual(after.sellIn);
      if (names.SULFURAS === item.name) {
        expect(item).toEqual(jasmine.objectContaining(after));
      } else {
        expect(item.name).toEqual(after.name);
        expect(item.sellIn).toEqual(after.sellIn);
        expect(item.quality >= 0 && item.quality <= 50).toEqual(true);
      }
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
  });

  it('Once the sell by date has passed, Quality degrades twice as fast', () => {
    const shop = new Shop([new Item('', -1, 10)]);
    const [updatedItem] = shop.updateQuality();
    expect(updatedItem).toEqual(jasmine.objectContaining({
      name: '', sellIn: -2, quality: 8
    }));
  });

  it('The Quality of an item is never negative', () => {
    const shop = new Shop([new Item('', -1, 0)]);
    const [updatedItem] = shop.updateQuality();
    expect(updatedItem).toEqual(jasmine.objectContaining({
      name: '', sellIn: -2, quality: 0
    }));
  });

  it('"Aged Brie" actually increases in Quality the older it gets', () => {
    const shop = new Shop([new Item('Aged Brie', 1, 0)]);
    const [updatedItem] = shop.updateQuality();
    expect(updatedItem).toEqual(jasmine.objectContaining({
      name: 'Aged Brie', sellIn: 0, quality: 1
    }));
  });

  it('The Quality of an item is never more than 50', () => {
    const shop = new Shop([new Item('Aged Brie', 1, 50)]);
    const [updatedItem] = shop.updateQuality();
    expect(updatedItem).toEqual(jasmine.objectContaining({
      name: 'Aged Brie', sellIn: 0, quality: 50
    }));
  });

  it('"Sulfuras", being a legendary item, never has to be sold or decreases in Quality', () => {
    const shop = new Shop([new Item('Sulfuras, Hand of Ragnaros', 1, 40)]);
    const [updatedItem] = shop.updateQuality();
    expect(updatedItem).toEqual(jasmine.objectContaining({
      name: 'Sulfuras, Hand of Ragnaros', sellIn: 1, quality: 40
    }));
  });

  describe('"Backstage passes", like aged brie, increases in Quality as its SellIn value approaches', () => {
    it('Quality increases by 2 when there are 10 days or less', () => {
      const shop = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 40)]);
      const [updatedItem] = shop.updateQuality();
      expect(updatedItem).toEqual(jasmine.objectContaining({
        name: 'Backstage passes to a TAFKAL80ETC concert', sellIn: 9, quality: 42
      }));
    });
    it('Quality increases by 3 when there are 5 days or less', () => {
      const shop = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 40)]);
      const [updatedItem] = shop.updateQuality();
      expect(updatedItem).toEqual(jasmine.objectContaining({
        name: 'Backstage passes to a TAFKAL80ETC concert', sellIn: 4, quality: 43
      }));
    });
    it('Quality drops to 0 after the concert', () => {
      const shop = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 40)]);
      const [updatedItem] = shop.updateQuality();
      expect(updatedItem).toEqual(jasmine.objectContaining({
        name: 'Backstage passes to a TAFKAL80ETC concert', sellIn: -1, quality: 0
      }));
    });
  });

  it('"Sulfuras" is a legendary item and as such its Quality is 80 and it never alters.', () => {
    const shop = new Shop([new Item('Sulfuras, Hand of Ragnaros', 0, 80)]);
    const [updatedItem] = shop.updateQuality();
    expect(updatedItem).toEqual(jasmine.objectContaining({
      name: 'Sulfuras, Hand of Ragnaros', sellIn: 0, quality: 80
    }));
  });

});

