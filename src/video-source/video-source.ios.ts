
import common = require("./video-source-common");
import { Utils, path, knownFolders } from '@nativescript/core';
import definition = require("./video-source");

declare var android, AVPlayerItem, NSBundle, NSURL;

global.moduleMerge(common, exports);

export class VideoSource implements definition.VideoSource {
    public android: any; /// android.widget.VideoView
    public ios: any; /// AVPlayerItem
    height: any;
    width: any;

    public loadFromResource(name: string): boolean {
        let videoURL = NSBundle.mainBundle().URLForResourceWithExtension(name, null);
        let player = new AVPlayerItem(videoURL);
        this.ios = player;
        return this.ios != null;
    }

    public loadFromFile(filePath: string): boolean {
        var fileName = Utils.isString(filePath) ? filePath.trim() : "";

        if (fileName.indexOf("~/") === 0) {
            fileName = path.join(knownFolders.currentApp().path, fileName.replace("~/", ""));
        }

        let videoURL = NSURL.fileURLWithPath(fileName);
        let player = new AVPlayerItem(videoURL);
        this.ios = player;
        return this.ios != null;
    }

    public loadFromUrl(url: string): boolean {
        let videoURL = NSURL.URLWithString(url);
        let player = new AVPlayerItem(videoURL);
        this.ios = player;
        return this.ios != null;
    }

    public setNativeSource(source: any): boolean {
        this.ios = source;
        return source != null;
    }
}

