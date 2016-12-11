var Display =
{
    statusDiv : null,
    FIRSTIDX : 0,
    LASTIDX : 4,
    currentWindow : 0,

    SELECTOR : 0,
    LIST : 1,
    
    videoList : new Array(),
    
    checkmainInfo: 0,
    tMM: 0,
    widgetMenu: 0,

};

Display.init = function()
{
    var success = true;
    /* 
    this.statusDiv = document.getElementById("status");

    if (!this.statusDiv)
    {
    	alert("success vale 4:  " + success);   
        success = false;
    }
    */
    //Debug.Log("[Display] Display alert");
    
    return success;
};
Display.DebugOff = function () {
    document.getElementById("debug").style.display = "none";
    Debug.on = false;
}
Display.DebugOn = function () {
    document.getElementById("debug").style.display = "block";
    Debug.on = true;
}
Display.TogDebug = function () {
    if (Debug.on) {
        //Debug.ClearLog();
        Display.DebugOff();
        if (!Main.OnlineTVTurn && !Main.pause) {
            Main.pause = true;
            widgetAPI.sendReturnForceEvent();
        }
    }
    else {
        //Debug.Log("[Display] Debug start!");
        Display.DebugOn();
    }
};
Display.TogWidgetMenu = function () {
    if (this.widgetMenu) {
        this.widgetMenu = 0;
        Debug.Log("[Display] Widget menu off!");
    }
    else {
        this.widgetMenu = 1;
        Debug.Log("[Display] Widget menu on!");
    }
};

Display.statusS = function (status) {
    //alert(status);
    //widgetAPI.putInnerHTML(this.statusDiv, status);
    if (!Main.pause) {
        var infoNowPlayStatus = document.getElementById("mainSubtitleInfo"); //("mainStatusInfo");
        widgetAPI.putInnerHTML(infoNowPlayStatus, status);
    }
    //widgetAPI.putInnerHTML(this.statusDiv, status);
    //widgetAPI.putInnerHTML(this.statusDiv, status);
    //var infoNowPlayStatus = document.getElementById("mainInfoNowStatus");
    //widgetAPI.putInnerHTML(infoNowPlayStatus, status);
    //widgetAPI.putInnerHTML(this.statusDiv, status);
};
Display.status = function(status)
{
    //alert(status);
    //widgetAPI.putInnerHTML(this.statusDiv, status);
    if (!Main.pause) {
        var infoNowPlayStatus = document.getElementById("mainStatusInfo");
        widgetAPI.putInnerHTML(infoNowPlayStatus, status);
    }
    //widgetAPI.putInnerHTML(this.statusDiv, status);
    //widgetAPI.putInnerHTML(this.statusDiv, status);
    //var infoNowPlayStatus = document.getElementById("mainInfoNowStatus");
    //widgetAPI.putInnerHTML(infoNowPlayStatus, status);
    //widgetAPI.putInnerHTML(this.statusDiv, status);
};
Display.SetDispObject = function (statusDiv, status,color) {
    if (!Main.pause) {
        var sdiv = document.getElementById(statusDiv);
        ///Debug.Log("[REC] curRECTitle: " + status);
        widgetAPI.putInnerHTML(sdiv, status);
        if (status == "") {
            document.getElementById(statusDiv).style.display = "none";
        }
        else {
            document.getElementById(statusDiv).style.display = "block";
        }
        if (color) {
            document.getElementById(statusDiv).style.color = "#" + color;
        }
    }
    
    
};
Display.statusB = function(status)
{
    //widgetAPI.putInnerHTML(this.statusDiv, status);
    if (!Main.pause) {
        var infoNowPlayStatus = document.getElementById("mainInfoNowBuff");
        widgetAPI.putInnerHTML(infoNowPlayStatus, status);
    }
    //widgetAPI.putInnerHTML(this.statusDiv, status);
};

Display.hideMM = function()
{
	var infoMM = document.getElementById("mainInfoMM");
	widgetAPI.putInnerHTML(infoMM , "");
	document.getElementById("mainInfoMM").style.display = "none";
	Main.infocurrNum = 0;
};

Display.hide = function()
{
    document.getElementById("main").style.display="none";
};

Display.show = function()
{
    document.getElementById("main").style.display="block";
};
Display.hideMainInfo = function()
{
    document.getElementById("mainInfo").style.display="none";
};


Display.showMainInfo = function()
{
    document.getElementById("mainInfo").style.display="block";
};

Display.hideB = function()
{
    document.getElementById("mainInfoNowBuff").style.display="none";
};


Display.showB = function()
{
    if (!Main.pause) {
        document.getElementById("mainInfoNowBuff").style.display = "block";
    }
};

Display.hideStat = function ()
{
    document.getElementById("mainStatusInfo").style.display = "none";
    document.getElementById("mainVideoInfo").style.display = "none";
    document.getElementById("mainAudioInfo").style.display = "none";
    document.getElementById("mainSubtitleInfo").style.display = "none";
};


Display.showStat = function()
{
    if (!Main.pause) {
        document.getElementById("mainStatusInfo").style.display = "block";
        document.getElementById("mainVideoInfo").style.display = "block";
        document.getElementById("mainAudioInfo").style.display = "block";
        document.getElementById("mainSubtitleInfo").style.display = "block";
    }
};

Display.hideS = function () {
    document.getElementById("mainS").style.display = "none";
};


Display.showS = function () {
    if (!Main.pause) {
        document.getElementById("mainS").style.display = "block";
    }
};
Display.hideMainWidget = function () {
    document.getElementById("mainWidget").style.display = "none";
};
Display.showMainWidget = function () {
    if (!Main.pause) {
        document.getElementById("mainWidget").style.display = "block";
    }
};

// Add for multi-application
Display.checkMultiAppQueueAfterShow = function (pWidgetID) {
    //var widgetName = null;
    //var tObj = allWidgets.get(pWidgetID);
    //if (tObj) {
    //    widgetName = tObj.title;
    //}
    Debug.Log("[Display] CheckMultiAppQueueAfterShow - Activate  >>" + pWidgetID);

    var wInstance = window.getWidget(pWidgetID);
    if (wInstance) {
        Debug.Log("[Display] WidgetLifeUtil(AfterShow) Instance.setFocus : " + pWidgetID);
        wInstance.setFocus();

        //TRACE("HIDE CARD APP!!!");
        //WMGlobal.NNaviPlugin.SendEventToDevice(EVENT_TO_HIDE_CARD_APP, "0");
    }

    Debug.Log("[Display] CheckMultiAppQueueAfterShow END");
}
