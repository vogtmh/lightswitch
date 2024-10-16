var appstring;

(function () {
    let lamp = null;

    // Asynchronously get access to the flashlight (Lamp)
    Windows.Devices.Lights.Lamp.getDefaultAsync().then(function (defaultLamp) {
        if (defaultLamp) {
            try {
                lamp = defaultLamp;
                lamp.isEnabled = true;
            }
            catch (e) {
                console.log(e.message);
            }
        }
    });

    var versionlabel = document.getElementById("versionlabel");
    try {
        appVersion = Windows.ApplicationModel.Package.current.id.version;
        appstring = `${appVersion.major}.${appVersion.minor}.${appVersion.build}`;
    }
    catch (e) {
        appstring = '';
    }
    versionlabel.innerHTML = "<a href='https://github.com/vogtmh/lightswitch'>LightSwitch</a> v" + appstring;

    // This code was meant to prevent the app getting closed on suspend, but didn't work
    // I'm leaving it here, so someone might be able to solve it.

    /*
    function onSuspending(event) {
        let deferral = event.suspendingOperation.getDeferral();

        // Turn off the flashlight if it's on
        if (lamp && lamp.isEnabled) {
            lamp.isEnabled = false;
        }

        // Complete the deferral
        deferral.complete();
    }

    function onResuming(event) {
        if (defaultLamp) {
            try {
                lamp = defaultLamp;
                lamp.isEnabled = true;
            }
            catch (e) {
                console.log(e.message);
            }
        }
    }

    // Register for the suspending/resuming events
    Windows.UI.WebUI.WebUIApplication.addEventListener("suspending", onSuspending);
    Windows.UI.WebUI.WebUIApplication.addEventListener("resuming", onResuming);
    */

})();