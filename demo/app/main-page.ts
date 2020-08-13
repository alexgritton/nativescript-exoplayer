import { Page } from 'ui/page';
import { EventData } from 'data/observable';
import { HelloWorldModel } from './main-view-model';
import { isAndroid, Device, Color, Application } from "@nativescript/core";

// Event handler for Page "loaded" event attached in main-page.xml
export function pageLoaded(args: EventData) {
    // Get the event sender
    let page = <Page>args.object;
    page.bindingContext = new HelloWorldModel(page);

    if (isAndroid && Device.sdkVersion >= "21") {
        let window = Application.android.startActivity.getWindow();
        window.setStatusBarColor(new Color("#d32f2f").android);
    }

}