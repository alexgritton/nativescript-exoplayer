
import definition = require("./subtitle-source");
import common = require("./subtitle-source-common");
import { Utils, path, knownFolders } from "@nativescript/core"

global.moduleMerge(common, exports);

declare var android: any;

export class SubtitleSource implements definition.SubtitleSource {
    public android: any; /// String - url or resource
    public ios: any; /// NSString

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

}