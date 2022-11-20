class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    for (let item of this.items) {
      if (item.name == "Sulfuras, Hand of Ragnaros") {
        continue;
      }

      item.sellIn--;

      if (item.name == "Aged Brie") {
        const increaseQuality = (item.sellIn >= 0)?1:2;
        item.quality = Math.min(50, item.quality + increaseQuality)
        continue;
      }

      if (item.name == "Backstage passes to a TAFKAL80ETC concert") {
        if (item.sellIn < 0) {
          item.quality = 0;
          continue;
        }

        let qualityImprovement = 1;
        if (item.sellIn < 10) qualityImprovement++;
        if (item.sellIn < 5) qualityImprovement++;

        item.quality = Math.min(50, item.quality + qualityImprovement)
        continue;
      }

      const decay = (item.sellIn >= 0) ? 1 : 2;
      item.quality = Math.max(item.quality - decay, 0);
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop,
};
