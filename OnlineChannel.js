var OnlineChannel =
{
    Player: null,
    hPlayer: null,
};

OnlineChannel.deinit = function () {
    OnlineChannel.Player.stopVideo();
    Debug.Log("[OnlineChannel] Player stop!");
    OnlineChannel.Player.deinit();
    Debug.Log("[OnlineChannel] Player deinit!");
    OnlineChannel.Player = undefined;
    Debug.Log("[OnlineChannel] Player undefined!");
    delete OnlineChannel.Player;
    Debug.Log("[OnlineChannel] Player delete!");
};
OnlineChannel.init = function (Type, URL) {
    OnlineChannel.Player = Player;
    Debug.Log("[OnlineChannel] OnlineTV GO_1");
    var errorCallback = function () { Debug.Log("[OnlineChannel] start RUN: errorCallback"); };

    var setSourceCB = function (sInfo, windowID) {
        //Debug.Log("[OnlineChannel] Set source: sInfo: " + sInfo + ", windowID:" +windowID);
        OnlineChannel.Player.init();
        OnlineChannel.Player.setVideoURL(Type, URL);


        //Player.playVideo(windowplugin.GetScreenRect());
        //Main.selectbgAppTemp = Main.SEFPluginTaskManager.Execute('GetActiveApplication');
        //Debug.Log("[OnlineChannel] App: " + Util.CreateMsg(Define.APP, [Main.selectbgAppTemp]));
        //try {
        //    if (Main.selectbgAppTemp != webapis._pluginDef.PL_TASKMANAGER_DTV_APP_INFOLINK2) {
        //        var ans = Main.SEFPluginTaskManager.Execute('SetBgApplication', Main.selectbgAppTemp);
        //        Debug.Log("[OnlineChannel] SetBgApplication: " + ans);
        //        var ans = Main.SEFPluginTaskManager.Execute('ActivateApplication', webapis._pluginDef.PL_TASKMANAGER_DTV_APP_INFOLINK2);
        //        Debug.Log("[OnlineChannel] ActiveApplication: " + ans);
        //        Main.selectbgAppTemp = Main.SEFPluginTaskManager.Execute('GetActiveApplication');
        //        Debug.Log("[OnlineChannel] App: " + Util.CreateMsg(Define.APP, [Main.selectbgAppTemp]));
        //    }
        //}
        //catch (exc) {
        //    Debug.Log("[OnlineChannel] ActivateApplication: " + exc.name + ", " + exc.message);
        //}
        var noapp = Main.SEFPluginTaskManager.Execute('GetActiveApplication');
        Debug.Log("[OnlineChannel] Load video source, select app: " + Util.CreateMsg(Define.APP, [noapp]));
        clearTimeout(this.hPlayer);
        if (noapp == Main.noBGApp) {
            Debug.Log("[OnlineChannel] Full screen");
            OnlineChannel.Player.playVideo();
            //this.hPlayer= setTimeout("OnlineChannel.Player.playVideo();", 0);
        }
        else {
            Debug.Log("[OnlineChannel] Auto rect screen");
            OnlineChannel.Player.playVideo(Main.windowPlugin.GetScreenRect());
            //this.hPlayer = setTimeout("OnlineChannel.Player.playVideo(Main.windowPlugin.GetScreenRect());", 0);
        }

        Display.hide();

        
        //try {
        //    var v = Main.SEFPluginTVMW.Execute("SetProfile", 109, curWidget.id);
        //    Main.SEFPluginTVMW.Close();
        //    Debug.Log("[OnlineChannel]  SetProfile 109: " + v);

        //} catch (exc) {
        //    Debug.Log("[OnlineChannel] SetProfile error: " + exc.message);
        //}
        //curWidget.show();
        //curWidget.setFocus();
        Debug.Log("[OnlineChannel] OnlineTV Success");
        //var currentChannel = webapis.tv.channel.getCurrentChannel(windowID);
        //var startTime = webapis.tv.info.getEpochTime();
        //var duration = 3600;
        //webapis.tv.channel.getProgramList(currentChannel, startTime, ProgramListSuccuessCallback, errorCallback, duration);
    }
    //var ret = Main.sefPlugin.Execute("SetWindow", 1);
    //Debug.Log("[OnlineChannel] SetWindow PIP: " +ret);
    //ret = Main.sefPlugin.Execute("SetSource", "43");
    //Debug.Log("[OnlineChannel] SetSource Media: " + ret);
    ////ret = this.sefPlugin.Execute("Show", 1);
    ////Debug.Log("[OnlineChannel] Show: " + ret);
    //ret = Main.sefPlugin.Execute("SetWindow", 0);
    //Debug.Log("[OnlineChannel] SetWindow TV: " + ret);
    //ret = this.sefPlugin.Execute("SetPreviousSource");
    //Debug.Log("[OnlineChannel] SetPreviousSource: " + ret);
    var errorCB = function () { Debug.Log("[OnlineChannel] OnlineTV set source failed"); }

    //Main.TVMWPlugin.SetMediaSource();
    setSourceCB();
    //webapis.tv.window.setSource({ type: webapis.tv.window.SOURCE_MODE_MEDIA, number: webapis._pluginDef.PL_WINDOW_SOURCE_DTV}, setSourceCB, errorCB, 0);


};