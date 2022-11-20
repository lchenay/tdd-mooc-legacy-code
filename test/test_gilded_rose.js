var { expect } = require("chai");
var { Shop, Item } = require("../src/gilded_rose.js");

describe("Gilded Rose", function () {
  describe('constructor', function() {
    it('should have items', function() {
      let shop = new Shop();
      expect(shop.items).to.be.an('array');
    });
  })
  
  describe('Why don\'t they haven write any docs?', function() {
    const items = [
      [new Item('foo', -1, 2), 0],
      [new Item('Aged Brie', -1, 0), 2],
      [new Item('Aged Brie', -1, 50), 50],
      [new Item('Sulfuras, Hand of Ragnaros', -1, 0), 0],
      [new Item('Sulfuras, Hand of Ragnaros', -1, 1), 1],
      [new Item('Backstage passes to a TAFKAL80ETC concert', -1, 2), 0],
      [new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49), 50],
      [new Item('Backstage passes to a TAFKAL80ETC concert', 11, 49), 50],
    ];

    items.forEach(([item, expected]) => {
      it(`I have no idea what i'm doing with ${JSON.stringify(item)} and expect ${expected} as quality`, function () {
        let shop= new Shop([item]);
        shop.updateQuality();
        console.log(item.quality, expected)
        expect(item.quality).to.equal(expected);
      });
    });
  });
});
