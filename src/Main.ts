//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends eui.UILayer {


    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());


        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        // const result = await RES.getResAsync("description_json")
        // this.startAnimation(result);
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);

    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }


    /**
     * 创建场景界面
     * Create scene interface
     */
    protected createGameScene(): void {
        // console.log(egret.getQualifiedClassName(new win.BaseView()))
        // console.log(win.BaseView.prototype["__class__"])
        // console.log(new window["win"]["BaseView"])

        Main.MAIN = this;
        Model.ins.initMgr().initDataProxy().initLayer();
        globalData.stageWidth = this.stage.width;
        globalData.stageHeight = this.stage.height;
        function log(a) {
            console.log(a)
        }
        let a = {
            age: log,
            name: log,
            play: log,
            arr: log
        }
        Proxy.observe(a, this, DataModel.TestData)
        egret.setTimeout(() => {
            DataModel.TestData.age = 12;
        }, this, 3000)
        egret.setTimeout(() => {
            DataModel.TestData.name = "try";
            DataModel.TestData.play = { type: 12, info: "child" }
            DataModel.TestData.arr = [1, 2, 3]
        }, this, 4000)
        egret.setTimeout(() => {
            DataModel.TestData.play.info = "littleChild"
            DataModel.TestData.arr[1] = 12
        }, this, 4000)

        // let map = new MapContainer();
        // this.addChild(map);
        // this.Map = map;
        let role = CompomentMgr.pop<Actor>(Actor)
        this.addChild(role);
        role.y = globalData.stageHeight << 1;
        role.x = globalData.stageWidth << 1;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,(e:egret.TouchEvent)=>{
            role.play(behaviorType.run,e.stageX,e.stageY);
        },this)

        let r= [{name:"bob"},{name:"lili"}]
        let b = {name:"test"}
        r.push(b)
        let index = r.indexOf(b)
        let idx = r.indexOf({name:"bob"})
        console.log(index,idx)
        
    }
    public static MAIN:Main;
    // private Map:MapContainer;

    private async te(x, y) {
        let clip = new egret.MovieClip()
        clip.x = x;
        clip.y = y;
        this.addChild(clip);
        ClipMgr.setClipData("eff_bossfz_001_json", "eff_bossfz_001_png", clip, -1)

    }



}

class a {
    age: number;
    name: string;
    child: Array<any>;
    call: Object
}
