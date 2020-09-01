
import * as definition from "./video-source";
import * as common from "./video-source-common";
import { Utils, path, knownFolders } from "@nativescript/core";

global.moduleMerge(common, exports);


declare var android, AVPlayer: any;

export class VideoSource implements definition.VideoSource {
    public android: any; /// android.widget.VideoView
    public ios: any; /// AVPlayer

    public loadFromResource(name: string): boolean {
        this.android = null;


        var res = Utils.ad.getApplicationContext().getResources();
        if (res) {
            var UrlPath = "android.resource://org.nativescript.videoPlayer/R.raw." + name;
            this.android = UrlPath;

        }

        return this.android != null;
    }

    public loadFromUrl(url: string): boolean {
        this.android = null;
        this.android = url;
        return this.android != null;
    }

    public loadFromFile(filePath: string): boolean {


        var fileName = Utils.isString(filePath) ? filePath.trim() : "";
        if (fileName.indexOf("~/") === 0) {
            fileName = path.join(knownFolders.currentApp().path, fileName.replace("~/", ""));
        }

        this.android = fileName;
        return this.android != null;
    }

    public setNativeSource(source: any): boolean {
        this.android = source;
        return source != null;
    }


    get height(): number {
        if (this.android) {
            return this.android.getHeight();
        }

        return NaN;
    }

    get width(): number {
        if (this.android) {
            return this.android.getWidth();
        }

        return NaN;
    }

}