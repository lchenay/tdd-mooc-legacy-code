var { expect } = require("chai");
var { Shop, Item } = require("../src/gilded_rose.js");


describe("Gilded Rose", function () {
  it('Should exists', function() {
    expect(Shop).to.exist;
    expect(Item).to.exist;
  })
  
  describe('constructor', function() {
    it('should have items', function() {
      let shop = new Shop();
      expect(shop.items).to.be.an('array');
      expect(shop.items.length).to.equal(0);

      shop = new Shop([
        new Item('tata', 1, 0),
        new Item('yoyo', 2, 0),
      ]);
      const results = shop.updateQuality();
      
      expect(results).to.be.an('array');
      expect(results.length).to.equal(2);
      expect(results[0].name).to.equal('tata');
      expect(results[1].name).to.equal('yoyo');
    });
  })

  describe('WTF those tests give this resut', function() {
    const items = [
      [new Item('foo', 1, 0), 0],
      [new Item('Sulfuras, Hand of Ragnaros', 1, 0), 1]
    ];

    items.forEach(([item, expected]) => {
      it(`should increase decrease sellIn by 1 for ${item.name}`, function () {
        let shop= new Shop([item]);
        shop.updateQuality();
        expect(item.sellIn).to.equal(expected);
      });
    });
  });

  describe('Why don\'t they haven write any docs?', function() {
    const items = [
      [new Item('foo', 0, 1), 0],
      [new Item('foo', -1, 1), 0],
      [new Item('foo', -1, 0), 0],
      [new Item('foo', -1, 2), 0],
      [new Item('foo', 1, 1), 0],
      [new Item('foo', 1, 2), 1],
      [new Item('foo', 1, 0), 0],
      [new Item('foo', -2, 10), 8],
      [new Item('Aged Brie', -1, 0), 2],
      [new Item('Aged Brie', -1, 50), 50],
      [new Item('Aged Brie', 1, 0), 1],
      [new Item('Aged Brie', 1, 50), 50],
      [new Item('Aged Brie', 0, 49), 50],
      [new Item('Sulfuras, Hand of Ragnaros', -1, 0), 0],
      [new Item('Sulfuras, Hand of Ragnaros', -1, 1), 1],
      [new Item('Sulfuras, Hand of Ragnaros', 1, 0), 0],
      [new Item('Sulfuras, Hand of Ragnaros', 1, 1), 1],
      [new Item('Backstage passes to a TAFKAL80ETC concert', -1, 2), 0],
      [new Item('Backstage passes to a TAFKAL80ETC concert', 1, 0), 3],
      [new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49), 50],
      [new Item('Backstage passes to a TAFKAL80ETC concert', 6, 49), 50],
      [new Item('Backstage passes to a TAFKAL80ETC concert', 5, 47), 50],
      [new Item('Backstage passes to a TAFKAL80ETC concert', 6, 47), 49],
      [new Item('Backstage passes to a TAFKAL80ETC concert', 11, 49), 50],
      [new Item('Backstage passes to a TAFKAL80ETC concert', 11, 48), 49],
      [new Item('Backstage passes to a TAFKAL80ETC concert', 12, 49), 50],
      [new Item('Backstage passes to a TAFKAL80ETC concert', 13, 49), 50],
      [new Item('Backstage passes to a TAFKAL80ETC concert', 1, 0), 3]
    ];

    items.forEach(([item, expected]) => {
      it(`If I find who have write this code I will ****. Let's test for ${item.name}`, function () {
        let shop= new Shop([item]);
        shop.updateQuality();
        console.log(item.quality, expected)
        expect(item.quality).to.equal(expected);
      });
    });
  });
});
