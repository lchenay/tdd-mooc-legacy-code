var { expect } = require("chai");
var { Shop, Item } = require("../src/gilded_rose.js");


const testCase = (name, sellIn, quality, expectSellIn, expectedQality) => {
  const shop = new Shop([
    new Item(name, sellIn, quality)
  ]);
  const results = shop.updateQuality();

  expect(results[0].sellIn).to.equal(expectSellIn);
  expect(results[0].quality).to.equal(expectedQality);
}

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

  describe('updateQuality', function() {
    describe('Default behavior', function() {
      it('should decay sellIn and quality', function() {
        testCase('foo', 5, 1, 4, 0);
      });

      it('should decay quality twice fast if lower than 0', function() {
        testCase('foo', 1, 10, 0, 9);
        testCase('foo', 0, 10, -1, 8);
      });
    });

    describe('Special case for Sulfuras, Hand of Ragnaros', function() {
      it('sellIn or quality must never change', function() {
        testCase('Sulfuras, Hand of Ragnaros', 1, 1, 1, 1);
        testCase('Sulfuras, Hand of Ragnaros', 10, 10, 10, 10);
        testCase('Sulfuras, Hand of Ragnaros', 50, 50, 50, 50);
      })
    });

    describe('Special case for Aged Brie', function() {
      it('quality should increase', function() {
        testCase('Aged Brie', 1, 0, 0, 1);
      })

      it('quality should increase twice fast if sellIn is lower than 0', function() {
        testCase('Aged Brie', 0, 0, -1, 2);
      });
    })

    describe('Special case for Backstage passes to a TAFKAL80ETC concert', function() {
      it('quality should increase', function() {
        testCase('Backstage passes to a TAFKAL80ETC concert', 30, 0, 29, 1);
      });
      it('quality should increase twice fast if sellIn is lower than 10', function() {
        testCase('Backstage passes to a TAFKAL80ETC concert', 11, 0, 10, 1);
        testCase('Backstage passes to a TAFKAL80ETC concert', 10, 0, 9, 2);
      });
      it('quality should increase three times fast if sellIn is lower than 5', function() {
        testCase('Backstage passes to a TAFKAL80ETC concert', 6, 0, 5, 2);
        testCase('Backstage passes to a TAFKAL80ETC concert', 5, 0, 4, 3);
      });
      it('quality should drop to 0 if sellIn is lower than 0', function() {
        testCase('Backstage passes to a TAFKAL80ETC concert', 1, 10, 0, 13);
        testCase('Backstage passes to a TAFKAL80ETC concert', 0, 10, -1, 0);
      });
    })
  });
});
