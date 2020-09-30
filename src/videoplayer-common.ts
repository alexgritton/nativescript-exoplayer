﻿import * as VideoSource from "./video-source/video-source";
import * as SubtitleSource from "./subtitle-source/subtitle-source";
import { Utils, View, Property, booleanConverter, ImageSource } from "@nativescript/core";

// on Android we explicitly set propertySettings to None because android will invalidate its layout (skip unnecessary native call).
// var AffectsLayout = platform.device.os === platform.platformNames.android ? dependencyObservable.PropertyMetadataSettings.None : dependencyObservable.PropertyMetadataSettings.AffectsLayout;

function onSrcPropertyChanged(view, oldValue, newValue) {

    const video = view;
    let value = newValue;

    if (Utils.isString(value)) {
        value = value.trim();
        video.videoSource = null;
        video["_url"] = value;
        video.isLoadingProperty = true;
        if (Utils.isFileOrResourcePath(value)) {
            video.videoSource = VideoSource.fromFileOrResource(value);
            video.isLoadingProperty = false;
        } else {
            if (video["_url"] === value) {
                video.videoSource = VideoSource.fromUrl(value);
                video.isLoadingProperty = false;
            }
        }
    } else if (value instanceof VideoSource.VideoSource) {
        video.videoSource = value;
    } else {
        video.videoSource = VideoSource.fromNativeSource(value);
    }
}

function onSubtitlesPropertyChanged(view, oldValue, newValue) {
    const video = view;
    if (Utils.isString(newValue)) {
        let value = newValue.trim();
        video.subtitleSource = null;
        if (Utils.isFileOrResourcePath(value)) {
            video.subtitleSource = SubtitleSource.fromFileOrResource(value);
        } else {
            video.subtitleSource = SubtitleSource.fromUrl(value);
        }
    }
}

function onImgSrcPropertyChanged(view, oldValue, newValue) {
    const video = view;
    let value = newValue;

    if (Utils.isString(value)) {
        value = value.trim();
        video["_url"] = value;
        video.isLoadingProperty = true;
        if (Utils.isFileOrResourcePath(value)) {
            video.imageSource = ImageSource.fromFileOrResourceSync(value);
            video.isLoadingProperty = false;
        } else {
            if (video["_url"] === value) {
                video.imageSource = ImageSource.fromUrl(value);
                video.isLoadingProperty = false;
            }
        }
    } else if (value instanceof ImageSource) {
        video.imageSource = value;
    } else {
        video.imageSource = new ImageSource(value);
    }
}

/**
 * Video aspect/fill handling
 */
export enum VideoFill {
    default = "default",
    aspect = "aspect",
    aspectFill = "aspectFill"
}

export class Video extends View {
    public static finishedEvent: string = "finished";
    public static playbackReadyEvent: string = "playbackReady";
    public static playbackStartEvent: string = "playbackStart";
    public static seekToTimeCompleteEvent: string = "seekToTimeComplete";
    public static currentTimeUpdatedEvent: string = "currentTimeUpdated";

    public _emit: any;
    public android: any;
    public ios: any;
    public src: string; /// video source file
    public srcType: number = 0; /// video source file type
    public imgSrc: string;
    public imgType: number = 1;
    public subtitles: string; /// subtitles source file
    public subtitleSource: string; /// subtitle source content
    public observeCurrentTime: boolean; // set to true if want to observe current time.
    public autoplay: boolean = false; /// set true for the video to start playing when ready
    public controls: boolean = true; /// set true to enable the media player's playback controls
    public loop: boolean = false; /// whether the video loops the playback after extends
    public muted: boolean = false;
    public backgroundAudio: boolean = false;
    public fill: VideoFill = VideoFill.default;

    public static IMAGETYPEMONO = 1;
    public static IMAGETYPESTEREOTOPBOTTOM = 2;
    public static IMAGETYPESTEREOLEFTRIGHT = 3;

}

export const srcProperty = new Property<Video, any>({
    name: "src",
    valueChanged: onSrcPropertyChanged
});
srcProperty.register(Video);

export const srcTypeProperty = new Property<Video, any>({
    name: "srcType"
});
srcTypeProperty.register(Video);

export const imgSrcProperty = new Property<Video, any>({
    name: "imgSrc",
    valueChanged: onImgSrcPropertyChanged
});
imgSrcProperty.register(Video);

export const imgTypeProperty = new Property<Video, any>({
    name: "imgType",
});
imgTypeProperty.register(Video);

export const subtitlesProperty = new Property<Video, any>({
    name: "subtitles",
    valueChanged: onSubtitlesPropertyChanged
});
subtitlesProperty.register(Video);

export const subtitleSourceProperty = new Property<Video, any>({
    name: "subtitleSource",
});
subtitleSourceProperty.register(Video);

export const videoSourceProperty = new Property<Video, any>({
    name: "videoSource",
});
videoSourceProperty.register(Video);

export const imageSourceProperty = new Property<Video, any>({
    name: "imageSource",
});
imageSourceProperty.register(Video);


export const isLoadingProperty = new Property<Video, boolean>({
    name: "isLoading",
    valueConverter: booleanConverter,
});
isLoadingProperty.register(Video);

export const observeCurrentTimeProperty = new Property<Video, boolean>({
    name: "observeCurrentTime",
    valueConverter: booleanConverter,
});
observeCurrentTimeProperty.register(Video);

export const autoplayProperty = new Property<Video, boolean>({
    name: "autoplay",
    valueConverter: booleanConverter,
});
autoplayProperty.register(Video);

export const controlsProperty = new Property<Video, boolean>({
    name: "controls",
    valueConverter: booleanConverter,
});
controlsProperty.register(Video);

export const loopProperty = new Property<Video, boolean>({
    name: "loop",
    valueConverter: booleanConverter,
});
loopProperty.register(Video);

export const mutedProperty = new Property<Video, boolean>({
    name: "muted",
    valueConverter: booleanConverter,
});
mutedProperty.register(Video);

export const backgroundAudioProperty = new Property<Video, boolean>({
    name: "backgroundAudio",
    valueConverter: booleanConverter,
});
backgroundAudioProperty.register(Video);

export const fillProperty = new Property<Video, VideoFill>({
    name: "fill"
});
fillProperty.register(Video);