class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const names = {
  BRIE: 'Aged Brie',
  PASSES: 'Backstage passes to a TAFKAL80ETC concert',
  SULFURAS: 'Sulfuras, Hand of Ragnaros'
};

const quality = {
  MIN: 0,
  MAX: 50
};

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      if (item.name === names.SULFURAS) {
        continue;
      }

      item.sellIn = item.sellIn - 1;
      item.quality = item.quality - 2;

      if (item.name === names.BRIE) {
        item.quality = item.quality + 3;
      }

      if (item.name === names.PASSES) {
        item.quality = item.quality + 3;
      }

      if (item.name === names.PASSES && item.sellIn < 11) {
        item.quality = item.quality + 1;
      }

      if (item.name === names.PASSES && item.sellIn < 6) {
        item.quality = item.quality + 1;
      }

      if (item.sellIn < 0 && item.name === names.BRIE) {
        item.quality = item.quality + 1;
      }

      if (item.sellIn < 0 && item.name === names.PASSES) {
        item.quality = 0;
      }

      item.quality = Math.max(quality.MIN, item.quality);
      item.quality = Math.min(quality.MAX, item.quality);
    }

    return this.items;
  }
}

module.exports = {
  Item, Shop, names
};
