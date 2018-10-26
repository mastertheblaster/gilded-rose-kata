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
      if (item.name != names.BRIE && item.name != names.PASSES) {
        if (item.quality > quality.MIN) {
          if (item.name != names.SULFURAS) {
            item.quality = item.quality - 1;
          }
        }
      } else {
        if (item.quality < quality.MAX) {
          item.quality = item.quality + 1;
          if (item.name == names.PASSES) {
            if (item.sellIn < 11) {
              if (item.quality < 50) {
                item.quality = item.quality + 1;
              }
            }
            if (item.sellIn < 6) {
              if (item.quality < quality.MAX) {
                item.quality = item.quality + 1;
              }
            }
          }
        }
      }
      if (item.name != names.SULFURAS) {
        item.sellIn = item.sellIn - 1;
      }
      if (item.sellIn < 0) {
        if (item.name != names.BRIE) {
          if (item.name != names.PASSES) {
            if (item.quality > quality.MIN) {
              if (item.name != names.SULFURAS) {
                item.quality = item.quality - 1;
              }
            }
          } else {
            item.quality = item.quality - item.quality;
          }
        } else {
          if (item.quality < quality.MAX) {
            item.quality = item.quality + 1;
          }
        }
      }
    }

    return this.items;
  }
}

module.exports = {
  Item, Shop
};
