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

        Model.ins.initMgr().initDataProxy();
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
        let c = ComposeMgr.pop<BaseClip>(BaseClip);
        c.source({ json: "eff_bossfz_001_json", texture: "eff_bossfz_001_png" })
        // let c = ComposeMgr.pop<eui.Image>(eui.Image);
        c.x = 300;
        c.y = 600;
        this.addChild(c);
        c.scaleX = c.scaleY = 3;
        c.source({ json: "00110_json", texture: "00110_png" });
        egret.setTimeout(() => {
            c.source({ json: "00111_json", texture: "00111_png" });
        }, this, 200)
        egret.setTimeout(() => {
            c.source({ json: "00112_json", texture: "00112_png" });
        }, this, 310)

        egret.setTimeout(() => {
            c.source({ json: "001131_json", texture: "00113_png" });
        }, this, 300)

    }

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
