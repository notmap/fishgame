cc.Class({
    extends: cc.Component,
    properties: {
        // timer: {
        //    default:null,
        //    type:cc.Label
        // },
        flag: true,

        progressBar: {
           default:null,
           type:cc.ProgressBar,
           progress: 0
        }
    },

    onLoad: function () {

        // var timeIn=10;
        // this.timer.string=timeIn;
        // this.schedule(function(){
        //     timeIn--;
        //     this.timer.string=timeIn;
        //     if(timeIn===0){
        //         cc.director.loadScene('main');
        //     }
        // }, 1);

        // this.label.node.on('mousedown', function(){
        //     cc.director.loadScene('main');
        // })
    },

    update: function (dt) {
        var progress = this.progressBar.progress;
        progress += dt/3;
        this.progressBar.progress = progress;
        if(progress > 1 && this.flag == true) {
            this.flag = false;
            return cc.director.loadScene('room');
        }
    }
});
