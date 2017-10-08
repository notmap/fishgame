cc.Class({
    extends: cc.Component,

    properties: {

        jingdian: {
            default: null,
            type: cc.Sprite
        },

        tongbi: {
            default: null,
            type: cc.Sprite
        },

        fengkuang: {
            default: null,
            type: cc.Sprite
        }
    },

    onLoad: function () {
        this.jingdian.node.on('mousedown', function(){
            cc.director.loadScene('room');
        });

        this.tongbi.node.on('mousedown', function(){
            cc.director.loadScene('room');
        });

        this.fengkuang.node.on('mousedown', function(){
            cc.director.loadScene('room');
        });
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
