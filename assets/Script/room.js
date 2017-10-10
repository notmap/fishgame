cc.Class({
    extends: cc.Component,

    properties: {

        playerA: {
            default: null,
            type: cc.Layout
        },

        playerB: {
            default: null,
            type: cc.Layout
        },

        playerC: {
            default: null,
            type: cc.Layout
        },

        playerD: {
            default: null,
            type: cc.Layout
        },

        playerE: {
            default: null,
            type: cc.Layout
        },

        cardAsset: {
            default: [],
            type: cc.SpriteFrame
        },

        cardPrefab: {
            default: null,
            type: cc.Prefab
        },

        
        player: [],
        cardAssetArr: [],
        cardArr: []
    },

    onLoad: function () {

        this.player = ['playerA', 'playerB', 'playerC', 'playerD', 'playerE'];  // 玩家数组
        var playerQuantity = this.player.length;                                // 玩家数量

        this.getCardAsset(() => {
            this.getCardArr(playerQuantity, () => {
                this.getCard();
            });
        });
    },

    getCardAsset: function(cb) {

        var asset = 'card3',  // 资源路径 assets/resources/card
            assetStart = 0,  // 目标资源的起始下标
            assetEnd = 51;   // 目标资源的结束下标

        cc.loader.loadResDir(asset, cc.SpriteFrame, (err, cardAsset) => {
            this.cardAsset = cardAsset;
            for(let i = assetStart; i <= assetEnd; i++) { this.cardAssetArr.push(i); }
            cb && cb();
        });
    },

    getCardArr: function(count, cb) {

        var cardQuantity = 5;  // 每一位牌的数量

        for(let i = 0; i < count; ++i) {
            var obj = {card: []}; 
            for(let i = 0; i < cardQuantity; i++) {
                let max = this.cardAssetArr.length - 1;
                let random = this.getRandom(0, max);
                obj.card.push(this.cardAssetArr[random]);
                this.cardAssetArr.splice(random, 1);
            }
            this.cardArr.push(obj);
        }
        cb && cb();
        // console.log(this.cardArr);
    },

    getCard: function() {

        this.sortCard();  // 计算牌组相关的数据 

        this.player.forEach((item, index, arr) => {
            var player = item;
            // this.cardArr[index]['card'].forEach((item, index, arr) => {
            this.cardArr[index]['type'].forEach((item, index, arr) => {
                this[player].node.children[index].getComponent(cc.Sprite).spriteFrame = this.cardAsset[item];
            });
        });
    },

    sortCard: function() {
        this.cardArr.forEach((cardData, index, arr) => {
            var five = 0, ten = 0, hua = 0, total = 0;
            cardData.cardShow = cardData.card.map((item, index, arr) => {
                var cardValue = Math.ceil((item + 1)/4);
                cardValue == 10 && ten++;
                cardValue > 10 && hua++;
                cardValue <= 5 && five++;
                total += cardValue > 10 ? 10 : cardValue;
                return cardValue;
            });
            cardData.five = five;
            cardData.ten = ten;
            cardData.hua = hua;
            cardData.total = total;
            cardData.type = this.getCardType(five, ten, hua, total, cardData.cardShow, cardData.card);
        });
        // console.log(this.cardArr);
    },

    getCardTypeArr: function(arr) {
        var arr = arr.sort((a, b) => {return a - b;}), typeArr = []; 
        for(let i = 0; i < arr.length;) {
            var lastSameIndex = arr.lastIndexOf(arr[i]); 
            typeArr.push({
                key: arr[i],
                num: lastSameIndex - i + 1
            });
            i = lastSameIndex + 1;
        }
        typeArr = typeArr.map((item) => {return item.num;});   // 需要的时候可注释掉
        return typeArr;
    },

    checkNiu: function(arr) {
        arr = arr.map((item, index, arr) => { return item > 10 ? 10 : item; });
        for(var indexA = 0; indexA < arr.length; indexA ++) {
            for(var indexB = indexA + 1; indexB < arr.length; indexB ++) {
                for(var indexC = indexB + 1; indexC < arr.length; indexC ++) {
                    var total = arr[indexA] + arr[indexB] + arr[indexC];
                    if(total % 10 == 0) {
                        return [indexA, indexB, indexC];
                    }
                }
            }
        }
    },

    getCardType: function(five, ten, hua, total, cardShow, card) {

        // var typeList = ['没牛', '牛一', '牛二', '牛三', '牛四', '牛五', '牛六', '牛七', '牛八', '牛九', '牛牛', '五花', '炸弹', '五小'],
        //     typeArr = this.getCardTypeArr(cardShow),
        //     type;

        // if(five == 5 && total < 10) type = 12;                                                          // 五小
        // if(Math.max.apply(null, typeArr) == 4) type = 11;                                               // 炸弹
        // if(hua == 5) type = 10;                                                                         // 五花
        // if(Math.max.apply(null, typeArr) == 3 && Math.min.apply(null, typeArr) == 2) type = undefined;  // 葫芦









        // console.log(card)


        var niu = this.checkNiu(cardShow);
        var cardSort;
        if(niu) {
            cardSort = card.map((item) => { return item; });
            niu.map((item) => {
                var insert = cardSort[item];
                cardSort.splice(item, 1);
                cardSort.splice(0, 0, card[item]);
            });
        }
        else {
            cardSort = card;
        }

        console.log(cardSort);

        return cardSort;



        















        // console.log(type);
    },

    getRandom: function(min, max) {
        return min + Math.floor((max + 1 - min) * cc.random0To1());
    },

    spare: function() {
        // let cardSlot = cc.instantiate(this.cardPrefab);
        // cardSlot.getComponent(cc.Sprite).spriteFrame = this.cardAsset[item];
        // this.playerA.node.addChild(cardSlot);
    }

    // ,update: function (dt) {}
});
