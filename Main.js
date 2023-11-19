var widgetAPI = new Common.API.Widget();
var tvKey = new Common.API.TVKeyValue();
var pluginAPI = new Common.API.Plugin();
var $APPS_LANG$ = new Object();
//var imeBox = null;



var Main = 
{
		selectMajor : -1,
		selectMajorTemp : -1,
		selectMinor : -1,
		selectMinorTemp : -1,
		selectSource : -1,
		selectSourceTemp: -1,
		selectbgApp : -1,
		selectbgAppTemp: -1,
		selectbgAppTemp2: -1,

        ActiveApp: -1,
        
		exitState: -1,
        returnState: -1,

		tDesc : 0,
		tReset: 0,
		tStop: 0,
		tChCH : null,
		infoTic : 5000,
		isInfo :0,
		showGuide: 0,
		showS: 0, //GUIDE
		showST: 0, //GUIDENowOnTV
		mxInfoNum:55,
		MXGuideNum: 55,
		infocurrNum: 0,
		currentTVTemp: 0,
		currentTV :null,
		aIDs : [ ],
		dIDs : [ ],
		minor: null,
		noTurn: 0,
		OnlineTVTurn: 0,
		starting: 0,
		tvObject: null,
		//appid: null,
		//scrid: null,
		testid: null,
		lang: ["en", "pl", "hr", "bg", "sk", "es", "ru", "de"],
		//appCom: null,
		pluginWindow: null,
        sefPlugin: null,
		widgetURL: null,
		screenShotURL: null,
		isPIP: false,
		noBGApp: null,
		//TVOevents: [101, 102, 103, 111, 114, 115, 117, 126, 516, 603, 607, 608, 609],
		runCHAN: null,
		isBusy: false,
		OTV: null,
		bPVR: false,
		bEPG: false,
		bREC: false,
		curRECTitle: "",
		curRECTick: 0,
        tcurREC: null,
		//curTitle: "",
        curChannelName: "",
        bWidgetReady: false,
        powerTimer: null,
        bPowerOff: false,
        pressGUIDE: true,
        pressGUIDETimer: 2000,
        tPressGUIDE: 0,
        isSoftPowerOff: 0,
        
        Address_IP: "",
        
        pause: false,
        itv: false,
        hClock: null,
        checkNoSignal: false,
        hTimerCheckRegPowerKey: null,
        WaitToPress: false,
        bWriteChannelsJSON: false,
        bWriteChannelsStreamInfos: false,
        ChannelsStreamInfos: new Array(),
};
Main.includePlugin = function (pPluginEnum , forceOption) {
    try {
        //TRACE("SmartHomeMain.includePlugin() " + pPluginEnum);

        if (forceOption != true) {
            // enum -> plugin reference
            var tPluginReference = eval(PL_REFERENCE[pPluginEnum]);

            if (tPluginReference) {
                Debug.Log("[Main] This Plugin has already included.  name: " + PL_OBJECT_ID[pPluginEnum]);
                return;
            }
        }
        else {
            Debug.Log("[Main] Plugin Force Include Option !!!");
        }

        var domNode = document.createElement('div');
        domNode.id = '_Plugin_' + PL_OBJECT_ID[pPluginEnum];
        domNode.style.position = 'absolute';
        domNode.style.left = '0px';
        domNode.style.top = '0px';
        domNode.style.display = 'block';

        var pluginDiv = document.getElementById('MainPluginDiv');
        pluginDiv.appendChild(domNode);

        var tObjID = 'pluginObject' + PL_OBJECT_ID[pPluginEnum];
        var tDiv = document.getElementById(domNode.id);
        tDiv.innerHTML = "<OBJECT id='" + tObjID + "' border=0 classid='clsid:SAMSUNG-INFOLINK-" + PL_CLASS_ID[pPluginEnum] + "' style='opacity:0.0;background-color:#000000;width:0px;height:0px;'></OBJECT>";

        switch (pPluginEnum) {
            case PL_ENUM_NNAVI:
                Main.NNaviPlugin = document.getElementById(tObjID);
                //Main.NNaviPluginVer = Main.NNaviPlugin.GetPluginInfo(PL_CMN_INFO_VERSION);
                break;
            case PL_ENUM_NETWORK:
                Main.NetworkPlugin = document.getElementById(tObjID);
                //Main.NetworkPluginVer = Main.NetworkPlugin.GetPluginInfo(PL_CMN_INFO_VERSION);
                break;
            case PL_ENUM_DEVICE:
                Main.DevicePlugin = document.getElementById(tObjID);
                //Main.DevicePluginVer = Main.DevicePlugin.GetPluginInfo(PL_CMN_INFO_VERSION);
                break;
            case PL_ENUM_FILESYSTEM:
                Main.FilePlugin = document.getElementById(tObjID);
                //Main.FilePluginVer = Main.FilePlugin.GetPluginInfo(PL_CMN_INFO_VERSION);
                break;
            case PL_ENUM_TVMW:
                Main.TVMWPlugin = document.getElementById(tObjID);
                //Main.TVMWPluginVer = Main.TVMWPlugin.GetPluginInfo(PL_CMN_INFO_VERSION);
                break;
            case PL_ENUM_DOWNLOAD:
                Main.DownloadPlugin = document.getElementById(tObjID);
                //Main.DownloadPluginVer = Main.DownloadPlugin.GetPluginInfo(PL_CMN_INFO_VERSION);
                break;
            case PL_ENUM_AUDIO:
                Main.AudioPlugin = document.getElementById(tObjID);
                //Main.AudioPluginVer = Main.AudioPlugin.GetPluginInfo(PL_CMN_INFO_VERSION);
                break;
            case PL_ENUM_VIDEO:
                Main.VideoPlugin = document.getElementById(tObjID);
                //Main.VideoPluginVer = Main.VideoPlugin.GetPluginInfo(PL_CMN_INFO_VERSION);
                break;
            case PL_ENUM_LOGGING:
                Main.LoggingPlugin = document.getElementById(tObjID);
                //Main.LoggingPluginVer = Main.LoggingPlugin.GetPluginInfo(PL_CMN_INFO_VERSION);
                break;
            case PL_ENUM_WINDOW:
                Main.windowPlugin = document.getElementById(tObjID);
                //Main.WindowPluginVer = Main.WindowPlugin.GetPluginInfo(PL_CMN_INFO_VERSION);
                break;
            case PL_ENUM_TV:
                Main.TVPlugin = document.getElementById(tObjID);
                //Main.TVPluginVer = Main.TVPlugin.GetPluginInfo(PL_CMN_INFO_VERSION);
                break;
            case PL_ENUM_APPCOMMON:
                Main.SEFPluginAppcommonmonPluginVer = document.getElementById(tObjID);
                //Main.SEFPluginAppcommonmonPluginVer = Main.SEFPluginAppcommonmonPlugin.GetPluginInfo(PL_CMN_INFO_VERSION);
                break;
            case PL_ENUM_TASKMANAGER:
                Main.TaskManagerPlugin = document.getElementById(tObjID);
                //Main.TaskManagerPluginVer = Main.TaskManagerPlugin.GetPluginInfo(PL_CMN_INFO_VERSION);
                break;
            case PL_ENUM_FRONTPANEL:
                Main.FrontPanelPlugin = document.getElementById(tObjID);
                //Main.FrontPanelPluginVer = Main.FrontPanelPlugin.GetPluginInfo(PL_CMN_INFO_VERSION);
                break;
            case PL_ENUM_EXTERNALWIDGET:
                Main.ExternalWidgetInterface = document.getElementById(tObjID);
                //Main.ExternalWidgetInterfaceVer = Main.ExternalWidgetInterface.GetPluginInfo(PL_CMN_INFO_VERSION);
                break;
            case PL_ENUM_SCREEN:
                Main.ScreenPlugin = document.getElementById(tObjID);
                //Main.ScreenPluginVer = Main.ScreenPlugin.GetPluginInfo(PL_CMN_INFO_VERSION);
                break;
            case PL_ENUM_STORAGE:
                Main.StoragePlugin = document.getElementById(tObjID);
                //Main.StoragePluginVer = Main.StoragePlugin.GetPluginInfo(PL_CMN_INFO_VERSION);
                break;
            case PL_ENUM_SECURITY:
                Main.SecurityPlugin = document.getElementById(tObjID);
                //Main.SecurityPluginVer = Main.SecurityPlugin.GetPluginInfo(PL_CMN_INFO_VERSION);
                break;
            case PL_ENUM_SEF:
                Main.SEFPlugin = document.getElementById(tObjID);
                //Main.SEFPluginVer = Main.SEFPlugin.GetPluginInfo(PL_CMN_INFO_VERSION);
                break;
            case PL_ENUM_SEFAUI:
                Main.SEFPluginAUI = document.getElementById(tObjID);
                // Main.SEFPluginAUIVer = Main.SEFPluginAUI.GetPluginInfo(PL_CMN_INFO_VERSION);
                Main.SEFPluginAUI.Open("AUI", "1.000", "AUI");
                break;
            case PL_ENUM_SEFTV:
                Main.SEFPluginTV = document.getElementById(tObjID);
                // Main.TVPluginVer = Main.SEFPluginTV.GetPluginInfo(PL_CMN_INFO_VERSION);
                Main.SEFPluginTV.Open("TV", "1.000", "TV");
                break;
            case PL_ENUM_SEFTASKMANAGER:
                Main.SEFPluginTaskManager = document.getElementById(tObjID);
                // Main.SEFPluginTaskManagerVer = Main.SEFPluginTaskManager.GetPluginInfo(PL_CMN_INFO_VERSION);
                Main.SEFPluginTaskManager.Open("TaskManager", "1.000", "TaskManager");
                break;
            case PL_ENUM_SEFLOGWIDGET:
                Main.SEFPluginLogWidget = document.getElementById(tObjID);
                // Main.SEFPluginLogWidgetVer = Main.SEFPluginLogWidget.GetPluginInfo(PL_CMN_INFO_VERSION);
                Main.SEFPluginLogWidget.Open("Logging", "1.000", "Logging");
                break;
            case PL_ENUM_SEFLOGTV:
                Main.SEFPluginLogTV = document.getElementById(tObjID);
                // Main.SEFPluginLogTVVer = Main.SEFPluginLogTV.GetPluginInfo(PL_CMN_INFO_VERSION);
                Main.SEFPluginLogTV.Open("Logging", "1.000", "Logging");
                break;
            case PL_ENUM_SEFLOGCHANNEL:
                Main.SEFPluginLogChannel = document.getElementById(tObjID);
                // Main.SEFPluginLogTVVer = Main.SEFPluginLogTV.GetPluginInfo(PL_CMN_INFO_VERSION);
                Main.SEFPluginLogChannel.Open("Logging", "1.000", "Logging");
                break;
            case PL_ENUM_SEFMEMORY:
                Main.SEFPluginMemory = document.getElementById(tObjID);
                //Main.SEFPluginMemoryVer = Main.SEFPluginMemory.GetPluginInfo(PL_CMN_INFO_VERSION);
                Main.SEFPluginMemory.Open("Memory", "1.000", "Memory");
                break;
            case PL_ENUM_SEFALLSHARERA:
                Main.SEFPluginAllshareRA = document.getElementById(tObjID);
                //Main.SEFPluginAllshareRAVer = Main.SEFPluginAllshareRA.GetPluginInfo(PL_CMN_INFO_VERSION);
                Main.SEFPluginAllshareRA.Open("RAStack", "0.500", "RAStack");
                break;
            case PL_ENUM_SEFALLSEARCH:
                Main.SEFPluginAllSearch = document.getElementById(tObjID);
                Main.SEFPluginAllSearch.Open("AllSearch", "1.000", "AllSearch");
                break;
            case PL_ENUM_SEFPLAYERMANAGER:
                Main.SEFPluginPlayerManager = document.getElementById(tObjID);
                Main.SEFPluginPlayerManager.Open("PlayerManager", "1.000", "PlayerManager");
                break;
            case PL_ENUM_SEFRECOGNITION:
                Main.SEFPluginRecognition = document.getElementById(tObjID);
                Main.SEFPluginRecognition.Open("RECOG", "1.000", "RECOG");
                break;
            case PL_ENUM_SEFANALYZER:
                Main.SEFPluginAnalyzer = document.getElementById(tObjID);
                Main.SEFPluginAnalyzer.Open("Analyzer", "1.000", "Analyzer");
                break;
            case PL_ENUM_SEFNNAVI:
                Main.SEFPluginNNavi = document.getElementById(tObjID);
                Main.SEFPluginNNavi.Open("NNavi", "1.000", "NNavi");
                break;
            case PL_ENUM_SEFWINDOW:
                Main.SEFPluginWindow = document.getElementById(tObjID);
                Main.SEFPluginWindow.Open("Window", "1.000", "Window");
                break;
            case PL_ENUM_SEFSECURITY:
                Main.SEFPluginSecurity = document.getElementById(tObjID);
                //Main.SEFPluginSecurityVer = Main.SEFPluginSecurity.GetPluginInfo(PL_CMN_INFO_VERSION);
                Main.SEFPluginSecurity.Open("Security", "1.000", "Security");
                break;
            case PL_ENUM_SEFPLAYER:
                Main.SEFPluginPlayer = document.getElementById(tObjID);
                Main.SEFPluginPlayer.Open("Player", "1.000", "Player");
                break;
            case PL_ENUM_SEFACR:
                Main.SEFPluginAcr = document.getElementById(tObjID);
                //Main.SEFPluginAcrVer = Main.SEFPluginAcr.GetPluginInfo(PL_CMN_INFO_VERSION);
                Main.SEFPluginAcr.Open("ACR", "1.000", "ACR");
                break;
            case PL_ENUM_SEFFILESYSTEM:
                Main.SEFPluginFileSystem = document.getElementById(tObjID);
                //Main.SEFPluginFileSystemVer = Main.SEFPluginFileSystem.GetPluginInfo(PL_CMN_INFO_VERSION);
                Main.SEFPluginFileSystem.Open("FileSystem", "1.000", "FileSystem");
                break;
            case PL_ENUM_SEFAPPCOMMON:
                Main.SEFPluginAppcommon = document.getElementById(tObjID);
                Main.SEFPluginAppcommon.Open("AppCommon", "1.000", "AppCommon");
                break;
            case PL_ENUM_SEFCONTENTSMGR:
                Main.SEFPluginContentsMgr = document.getElementById(tObjID);
                Main.SEFPluginContentsMgr.Open("ContentsMgr", "1.000", "ContentsMgr");
                break;
            case PL_ENUM_SEFMBR:
                Main.SEFPluginMBR = document.getElementById(tObjID);
                Main.SEFPluginMBR.Open("MBR", "1.000", "MBR");
                break;
            case PL_ENUM_SEFTVMW:
                Main.SEFPluginTVMW = document.getElementById(tObjID);
                Main.SEFPluginTVMW.Open("TVMW", "1.000", "TVMW");
                break;
            case PL_ENUM_SEFEXTERNALWIDGET:
                Main.SEFPluginExtWidget = document.getElementById(tObjID);
                Main.SEFPluginExtWidget.Open("ExternalWidgetInterface", "1.000", "ExternalWidgetInterface");
                break;
            case PL_ENUM_SEFDEVICE:
                Main.SEFPluginDevice = document.getElementById(tObjID);
                Main.SEFPluginDevice.Open("Device", "1.003", "Device");
                break;
            case PL_ENUM_SEFMULTIAPP:
                Main.SEFPluginMultiApp = document.getElementById(tObjID);
                Main.SEFPluginMultiApp.Open("MultiApp", "1.000", "MultiApp");
                break;
            case PL_ENUM_SEFRTS:
                Main.SEFRTS = document.getElementById(tObjID);
                Main.SEFRTS.Open("RemoteManagement", "1.000", "RemoteManagement");
                break;
            case PL_ENUM_SEFTIME:
                Main.SEFPluginTime = document.getElementById(tObjID);
                Main.SEFPluginTime.Open("Time", "1.000", "Time");
                break;
            case PL_ENUM_SEFINSTALLER:
                Main.SEFPluginInstaller = document.getElementById(tObjID);
                Main.SEFPluginInstaller.Open("Installer", "1.000", "Installer");
                break;
            case PL_ENUM_SEFAUDIO:
                Main.SEFPluginAudio = document.getElementById(tObjID);
                Main.SEFPluginAudio.Open("Audio", "1.000", "Audio");
                break;
            case PL_ENUM_SEFPSA:
                Main.SEFPluginPSA = document.getElementById(tObjID);
                Main.SEFPluginPSA.Open("PsaApp", "1.004", "PsaApp");
                break;
            case PL_ENUM_SEFDRM:
                Main.SEFPluginDRM = document.getElementById(tObjID);
                Main.SEFPluginDRM.Open("DRM", "1.004", "DRM");
                break;
            case PL_ENUM_SEFIPTV:
                Main.SEFPluginIPTV = document.getElementById(tObjID);
                Main.SEFPluginIPTV.Open("IPTV", "1.000", "IPTV");
                break;
            case PL_ENUM_SEFNETWORK:
                Main.SEFPluginNetwork = document.getElementById(tObjID);
                Main.SEFPluginNetwork.Open("Network", "1.000", "Network");
                Main.SEFPluginNetwork.OnEvent = OnNetworkEvent;
                break;
            case PL_ENUM_SEFSCREEN:
                Main.SEFPluginScreen = document.getElementById(tObjID);
                Main.SEFPluginScreen.Open("Screen", "1.000", "Screen");
                break;
            case PL_ENUM_SEFAD:
                Main.SEFPluginAD = document.getElementById(tObjID);
                Main.SEFPluginAD.Open("AD", "1.000", "AD");
                break;
        }
        Debug.Log("[Main] This Plugin is completed to include. name: " + PL_OBJECT_ID[pPluginEnum]);
    }
    catch (e) {
        Debug.Log("[Main] includePlugin error: " + e.name + ", " + e.message);
    }
};
function OnNetworkEvent(event, data1, data2) {
    Debug.Log("[Main] OnNetworkEvent event : " + event);

    switch (event) {
        case PL_EVENT_NETWORK_CABLE_CONNECT_STATE:
            Debug.Log("[Main] EVENT_NET_CABLE : " + data1);
            if (parseInt(data1) == 0) {
                Debug.Log("[Main] Wired Disconnected !!!");
            }
            else {
                Debug.Log("[Main] Wired Connected !!!");
            }
            break;
        case PL_EVENT_NETWORK_WIRELESS_CONNECT_STATE:
            Debug.Log("[Main] EVENT_NET_WIRELESS : " + data1);
            if (parseInt(data1) == 0) {
                Debug.Log("[Main] Wireless Disconnected !!!");
            }
            else {
                Debug.Log("[Main] Wireless Connected !!!");
            }
            break;
        case PL_EVENT_NETWORK_GATEWAY_CONNECT_STATE:
            Debug.Log("[Main] EVENT_NET_STATUS_GATEWAY_CONNECTED : " + data1);
            if (parseInt(data1) == 0) {
                Debug.Log("[Main] Gateway Disconnected !!!");
            }
            else {
                if (Main.OnlineTVTurn) {
                    Main.ResetChannel();
                    Main.ChangeChannel(100);
                }
                Debug.Log("[Main] Gateway Connected !!!");
            }
            break;
    }
}
Main.keyRECReg = function()
{
    pluginAPI.registKey(tvKey.KEY_PAUSE);
    pluginAPI.registKey(tvKey.KEY_PLAY);
};
Main.keyRECUnreg = function()
{
    pluginAPI.unregistKey(tvKey.KEY_PAUSE);
    pluginAPI.unregistKey(tvKey.KEY_PLAY);
};
Main.Vol_SetBannerState = function () {
    
    pluginAPI.registKey(tvKey.KEY_CH_UP);
    pluginAPI.registKey(tvKey.KEY_CH_DOWN);
    pluginAPI.registKey(tvKey.KEY_CH_PANNEL_UP);
    pluginAPI.registKey(tvKey.KEY_CH_PANNEL_DOWN);

    pluginAPI.SetBannerState(1);
    pluginAPI.unregistKey(tvKey.KEY_VOL_UP);
    pluginAPI.unregistKey(tvKey.KEY_VOL_DOWN);
    pluginAPI.unregistKey(tvKey.KEY_VOL_PANNEL_UP);
    pluginAPI.unregistKey(tvKey.KEY_VOL_PANNEL_DOWN);
    pluginAPI.unregistKey(tvKey.KEY_MUTE);
    Debug.Log("[Main] Vol_SetBannerState");
}
Main.VolCH_SetBannerState = function () {
    pluginAPI.SetBannerState(2);
    pluginAPI.unregistKey(tvKey.KEY_CH_UP);
    pluginAPI.unregistKey(tvKey.KEY_CH_DOWN);
    pluginAPI.unregistKey(tvKey.KEY_CH_PANNEL_UP);
    pluginAPI.unregistKey(tvKey.KEY_CH_PANNEL_DOWN);

    pluginAPI.unregistKey(tvKey.KEY_VOL_UP);
    pluginAPI.unregistKey(tvKey.KEY_VOL_DOWN);
    pluginAPI.unregistKey(tvKey.KEY_VOL_PANNEL_UP);
    pluginAPI.unregistKey(tvKey.KEY_VOL_PANNEL_DOWN);
    pluginAPI.unregistKey(tvKey.KEY_MUTE);
    Debug.Log("[Main] VolCH_SetBannerState");
}
Main.keyReg = function () {
   
    pluginAPI.registKey(tvKey.KEY_INFO);
    pluginAPI.registKey(tvKey.KEY_PAUSE);
    //pluginAPI.registKey(tvKey.KEY_PANEL_POWER);
    //pluginAPI.registKey(tvKey.KEY_POWER);
    
    Main.VolCH_SetBannerState();

    pluginAPI.registKey(tvKey.KEY_SUBT);
    pluginAPI.registIMEKey();
    Main.keyRECReg();
    pluginAPI.unregistKey(tvKey.KEY_TOOLS);

    
    
    Main.CheckRegPowerKey();
    Debug.Log("[Main] Regist key");
    //pluginAPI.unregistKey(tvKey.KEY_INFOLINK);

    //pluginAPI.unregistKey(tvKey.KEY_WLINK);

    //pluginAPI.unregistKey(tvKey.KEY_CONTENT);
};

Main.keyUnreg = function () {
    pluginAPI.unregistKey(tvKey.KEY_SUBT);
    pluginAPI.unregistKey(tvKey.KEY_TOOLS);
    pluginAPI.unregistKey(tvKey.KEY_INFO);
    pluginAPI.unregistKey(tvKey.KEY_PAUSE);
    pluginAPI.unregistKey(tvKey.KEY_PANEL_POWER);
    pluginAPI.unregistKey(tvKey.KEY_POWER);
    pluginAPI.unregistIMEKey();
    Main.keyRECUnreg();
    Debug.Log("[Main] Unregist key");
    //pluginAPI.registKey(tvKey.KEY_INFOLINK);	
    //pluginAPI.registKey(tvKey.KEY_WLINK);	
    //pluginAPI.registKey(tvKey.KEY_CONTENT);	
};
Main.GetIDs = function (Minor, Major) {
    var idx = null;//Data.findID(Main.selectMajor,Main.selectMinor);
    //Display.showMainInfo();
    if (Minor == 0) {
        Main.minor = 0;
        idx = Main.aIDs[Major];
        
    }
    else {
        Main.minor = 1;
        idx = Main.dIDs[Major];
    }
    return idx;
};
Main.CheckRegKey = function (id) {

   // var appCom = document.getElementById("appCom");
    //Main.testid = Main.testid + "," + appCom.IsKeyRegister(id);
    return Main.SEFPluginAppcommonmonPluginVer.IsKeyRegister(id);
}
Main.CheckRegPowerKey = function () {
    if (!Main.CheckRegKey(tvKey.KEY_POWER) && !Main.bPowerOff) {
        pluginAPI.registKey(tvKey.KEY_PANEL_POWER);
        pluginAPI.registKey(tvKey.KEY_POWER);
        Debug.Log("[Main] Power key registered");
    };
};
Main.CheckingRegKey = function (id) {
    Debug.Log("[Main] CheckRegKey: " + Main.CheckRegKey(id));
    Debug.Log("[Main] OnlineTVTurn: " + Main.OnlineTVTurn);
    if (Main.OnlineTVTurn) {//!Main.CheckRegKey(id)
       
        //Main.testid = Main.testid + "," + 2;
        Main.keyReg();
        //Main.selectbgAppTemp = Main.SEFPluginTaskManager.Execute('GetActiveApplication');
        //Debug.Log("[Main] App: " + Util.CreateMsg(Define.APP, [Main.selectbgAppTemp]));
        //try {
        //    if (Main.selectbgAppTemp != webapis._pluginDef.PL_TASKMANAGER_DTV_APP_INFOLINK2) {
        //        var ans = Main.SEFPluginTaskManager.Execute('SetBgApplication', Main.selectbgAppTemp);
        //        Debug.Log("[Main] SetBgApplication: " + ans);
        //        var ans = Main.SEFPluginTaskManager.Execute('ActivateApplication', webapis._pluginDef.PL_TASKMANAGER_DTV_APP_TVVIEWER);
        //        Debug.Log("[Main] ActiveApplication: " + ans);
        //        Main.selectbgAppTemp = Main.SEFPluginTaskManager.Execute('GetActiveApplication');
        //        Debug.Log("[Main] App: " + Util.CreateMsg(Define.APP, [Main.selectbgAppTemp]));
        //    }
        //}
        //catch (exc) {
        //    Debug.Log("[Main] ActivateApplication: " + exc.name + ", " + exc.message);
        //}
    }
};
function scroll(Minor, Major) {


    //Display.show();
    try
    {
        if (Main.starting) {
            Main.windowPlugin.SetSource(0);
                
            //var setSourceCB_ = function (sInfo, windowID) {
            //     Debug.Log("[Main] start TV MODE: ok"); 
            //}
            //var errorCB_ = function () { Debug.Log("[Main] start TV MODE: errorCB"); }
            //webapis.tv.window.setSource({ type: webapis.tv.window.SOURCE_MODE_TV, number: webapis._pluginDef.PL_WINDOW_SOURCE_TV }, setSourceCB_, errorCB_, 0);

            //inParams = '0=1&1=abort&2=&3=&4=3';
            //Player.httpGetNoSync(this.listenCHurl + inParams);
            //Main.appid = Main.appid + " | " + Main.selectbgApp;
            //Main.scrid = Main.scrid + " | " + Main.selectSource;
                
            Main.testid = Main.testid + " | " + Main.SEFPluginTaskManager.Execute('GetScreenRect_PosMode');
            //if (Main.selectMajor != Main.selectMajorTemp || Main.selectMinor != Main.selectMinorTemp || Main.CheckPrevActiveApp(Main.selectbgAppTemp))
            //{

                //Debug.Log("[Main] App no: " + Main.selectbgApp);
                   

                document.getElementById("mainInfoMM").style.display = "none";
                clearTimeout(Display.tMM);
                Display.hideMM();


                var oko = 0;
                Debug.Log("[Main] Minor: " + Minor);
                Debug.Log("[Main] Major: " + Major);
                if (Minor == -1 || Major == -1) {
                    Minor = Main.windowPlugin.GetCurrentChannel_Major();
                    Major = Main.windowPlugin.GetCurrentChannel_Minor();
                    //Minor = Main.selectMajor;
                    //Major = Main.selectMinor;
                    Debug.Log("[Main] Minor: " + Minor);
                    Debug.Log("[Main] Major: " + Major);
                }
                var idx = Main.GetIDs(Minor,Major);

               
                //if (Data.tvTypes[idx] == 1 || Main.minor == 0)
                //oko = 1;

                clearTimeout(Main.tDesc);

                //var NNaviPlugin = document.getElementById("pluginObjectNNavi");

                if (idx != null) {
                    Main.hide();
                    Display.hideB();
                    Display.status("");
                    //document.getElementById("mainInfoNowTime").style.display="block";
                    document.getElementById("mainInfoNowPlay").style.display = "none";
                    Display.hideMainInfo();

                    Main.noTurn = 0;
                    Display.show();
                    Main.currentTV = idx;

                    //

                    if (Data.tvTypes[idx] == 1) {
                        
                        Main.curChannelName = Data.videoNames[idx];
                        Debug.Log("----- OnlineTV channel name: " + Data.videoNames[idx] + " -----");
                        Debug.Log("[Main] idx: " + idx);
                        Debug.Log("[Main] TV Type: " + Data.tvTypes[idx]);


                        Main.selectbgAppTemp = Main.SEFPluginTaskManager.Execute('GetActiveApplication');
                        Debug.Log("[Main] App: " + Util.CreateMsg(Define.APP, [Main.selectbgAppTemp]));
                        if (PLR_TRUE == Main.TVPlugin.GetPIP()) {
                            var ret = Main.SEFPluginWindow.Execute("SetWindow", 0);
                            //Debug.Log("[Main] SetWindow: PIP ret = " + ret);
                        }
                        else {
                            if (Settings.autoPauseMode) {
                                if (Main.pause || Main.selectbgAppTemp != Main.noBGApp) {
                                    Debug.Log("[Main] Check pause");
                                    Debug.Log("[Main] Main.itv: " + Main.itv);
                                    if (!Main.itv) {
                                        Debug.Log("[Main] Check OnlienTV Run");
                                        Util.httpGetNoSync(Main.widgetURL + "TVComm");
                                    }
                                }
                            }
                        }
                        Main.pause = false;
                        //try {
                        //    if (Main.selectbgAppTemp != webapis._pluginDef.PL_TASKMANAGER_DTV_APP_INFOLINK2) {
                        //        var ans = Main.SEFPluginTaskManager.Execute('SetBgApplication', Main.selectbgAppTemp);
                        //        Debug.Log("[Main] SetBgApplication: " + ans);
                        //        var ans = Main.SEFPluginTaskManager.Execute('ActivateApplication', webapis._pluginDef.PL_TASKMANAGER_DTV_APP_INFOLINK2);
                        //        Debug.Log("[Main] ActiveApplication: " + ans);
                        //        Main.selectbgAppTemp = Main.SEFPluginTaskManager.Execute('GetActiveApplication');
                        //        Debug.Log("[Main] App: " + Util.CreateMsg(Define.APP, [Main.selectbgAppTemp]));
                        //    }
                        //}
                        //catch (exc) {
                        //    Debug.Log("[Main] ActivateApplication: " + exc.name + ", " + exc.message);
                        //}

                        
                        //window.focus();
                            
                        //if (!Main.bEPG) {
                        if (parseFloat(window.managerWidget.version) < 5) {
                            if (!curWidget.isShow() || !curWidget.isFocus()) {
                                curWidget.show();
                                curWidget.setFocus();
                                Debug.Log("[Main] OnlineTV set focus or show!");
                                //document.getElementById("Main_KeyHandler").focus();
                            }
                        }
                        Debug.Log("[Main] OnlineTV show status: " + curWidget.isShow() + ", focus status: " + curWidget.isFocus());
                        //}
                        //Main.SEFPluginTaskManager.Execute('RunMoviePlayerDataID', 16, Data.getVideoURL(Data.tvIdxURLs[idx]));
                        //Main.SEFPluginTaskManager.Execute('RunMediaPlayer', 16, Data.getVideoURL(Data.tvIdxURLs[idx]));
                        Main.OTV = OnlineChannel;
                        Main.OTV.init(Data.getVideoURL(Data.tvIdxURLs[idx]), Data.getVideoTypes(Data.tvIdxURLs[idx]));

                        Main.OnlineTVTurn = 1;
                        pluginAPI.unregistKey(tvKey.KEY_TOOLS);
                        //Main.SetInfo(idx, oko);
                        //widgetAPI.sendReadyEvent();
                        Main.checkNoSignal = false;

                      
                    }
                    else {
                            
                            
                        Debug.Log("----- TV channel name: " + Data.videoNames[idx] + " -----");
                        Main.curChannelName = Data.videoNames[idx];
                        Debug.Log("[Main] TV channel go... (" + curWidget.id + ")");
                        Debug.Log("[Main] idx: " + idx);
                        Debug.Log("[Main] TV Type: " + Data.tvTypes[idx]);
                        Main.OnlineTVTurn = 0;
                        
                        //widgetAPI.hideCurTicker();
                        if (Settings.autoPauseMode && !Main.pause && !Main.itv) {
                            Main.pause = true;
                            widgetAPI.sendReturnForceEvent();
                            widgetAPI.sendReturnEvent();
                        }
                        Display.hide();

                        Debug.Log("[Main] TV channel ...done (" + curWidget.id + ")");
                        //Main.SetInfo(idx, oko);
                        Main.checkNoSignal = false;
                        //Main.itv = false;
                        Main.windowPlugin.SetSource(0);

                        //try {
                        //    if (Main.selectbgAppTemp != webapis._pluginDef.PL_TASKMANAGER_DTV_APP_TVVIEWER) {
                        //        var ans = Main.SEFPluginTaskManager.Execute('SetBgApplication', Main.selectbgAppTemp);
                        //        Debug.Log("[Main] SetBgApplication: " + ans);
                        //        var ans = Main.SEFPluginTaskManager.Execute('ActivateApplication', webapis._pluginDef.PL_TASKMANAGER_DTV_APP_TVVIEWER);
                        //        Debug.Log("[Main] ActiveApplication: " + ans);
                        //        Main.selectbgAppTemp = Main.SEFPluginTaskManager.Execute('GetActiveApplication');
                        //        Debug.Log("[Main] App: " + Util.CreateMsg(Define.APP, [Main.selectbgAppTemp]));
                        //    }
                        //}
                        //catch (exc) {
                        //    Debug.Log("[Main] ActivateApplication: " + exc.name + ", " + exc.message);
                        //}
                        

                        //if (curWidget.isShow() || curWidget.isFocus()) {
                        //    document.getElementById("Main_KeyHandler").blur();
                        //    curWidget.hide();
                        //}
                        //widgetAPI.sendReturnForceEvent();


                        //var bHighLight = Main.TaskManagerPlugin.IsHighLight();
                        //Debug.Log("[Main] IsHighLight: " + bHighLight);
                        //if (!bHighLight) {
                        //    var tEventType = Common.API.EVENT_ENUM.LOSE_HIGHTLIGHT;
                        //    var ans = Main.sendAsyncEvent(window.widget.id, tEventType, "SET");

                        //var bHighLight = Main.TaskManagerPlugin.IsHighLight();
                        //Debug.Log("[Main] IsHighLight: " + bHighLight);
                        //}

                        
                    }
                }
                else {
                    Debug.Log("----- Channel no exist in TvList.xml -----");
                    Main.curChannelName = "";
                    Debug.Log("[Main] idx: " + idx);
                    document.getElementById("mainInfoNowTime").style.display = "none";
                    Main.noTurn = 1;
                    Display.status("");
                    //Main.SetInfo(1, 0);
                    //Display.showMainInfo();
                    Main.isInfo = 1;
                    Main.pause = true;
                    if (Settings.autoPauseMode) {
                        widgetAPI.sendReturnForceEvent();
                    }
                    Main.checkNoSignal = true;
                    Main.windowPlugin.SetSource(0);

                    //Main.tDesc = setTimeout("Main.hide();", 5000);
                    //if (curWidget.isShow() || curWidget.isFocus()) {
                    //    document.getElementById("Main_KeyHandler").blur();
                    //    curWidget.hide();
                    //}
                }
                //pluginAPI.registKey(tvKey.KEY_PAUSE);
                
                //var cc = deviceapis._plugin("TV", "GetCurrentProgram");
                //var tvChannel = webapis.tv.channel;
                //var cc = tvChannel.getCurrentProgram();
                //cc = webapis.smarthome;//document.getElementById("PluginSef");//webapis.avplay.getAVPlay(successCB, errorCB);//_plugin("Player");//webapis.tv.closedcaption;//deviceapis.tv.info;
                ////cc.Open('Player', '1.112', 'Player');
                //var net = webapis.network.getAvailableNetworks();

                //var cc = curWidget;
                //var data = "cc" +'\n';
                //for (var key in cc) {
                //    data = data + 'key: ' + key + ', value: ' + cc[key] + '\n';
                //    Debug.Log(data);

                //}
                //File.WriteChannel(data, 'curWidget');
                //File.WriteChannel(curWidget, 'curWidget');
                //var c = sf.core.plugin("NNAVI");

                //var iii = 1;
                //Debug.Log("[Main] CC title :" + deviceapis._plugin("TV", "GetProgram_Title", iii));
                //Debug.Log("[Main] CC startTime :" + deviceapis._plugin("TV", "GetProgram_StartTime", iii));
                //Debug.Log("[Main] CC duration :" + deviceapis._plugin("TV", "GetProgram_Duration", iii));
                //Debug.Log("[Main] CC detailedDescription :" + deviceapis._plugin("TV", "GetProgram_DetailedDescription", iii));
                //Debug.Log("[Main] CC language :" + deviceapis._plugin("TV", "GetProgram_Language", iii));
                //Debug.Log("[Main] CC rating :" + deviceapis._plugin("TV", "GetProgram_Rating",iii));

            //}
        }
        Debug.Log("[Main] CheckingRegKey start");
        Main.CheckingRegKey(tvKey.KEY_SUBT);
        //setTimeout("pluginAPI.unregistKey(tvKey.KEY_TOOLS),1000);");
        Debug.Log("[Main] CheckingRegKey stop");
     
    }
    catch (excs) {
        Debug.Log("[Main] scroll error: " + excs.name + ", " + excs.message);
    }
}
Main.sendAsyncEvent = function (id, type, data) {
    Debug.Log("[Main] Main.sendAsyncEvent id:" + id + " ,t:" + type + " ,d:" + data);
    var widgetEvent = new WidgetEvent(type, data);
    var ans = window.sendWidgetEvent(id, widgetEvent, true); // async call
    Debug.Log("[Main] window.sendWidgetEvent: " + ans);
}


var errorCallback = function () { };
var ProgramListSuccuessCallback = function (programs) {
    for (var i = 0; i < programs.length; i++) {
        console.log("title : " + programs[i].title)
        console.log("startTime : " + programs[i].startTime)
        console.log("duration : " + programs[i].duration)
        console.log("detailedDescription : " + programs[i].detailedDescription)
        console.log("language : " + programs[i].language)
        console.log("rating : " + programs[i].rating)
    }
};



Main.SetInfo =  function(idx,oko)
{
    if (!oko)
        oko = Main.infocurrNum;
	var infoElement = document.getElementById("mainInfoLogo");
	var infoElementT = document.getElementById("mainInfoTitle");
	var t = "";
	var l = "";
	if (Main.noTurn==0)
	{
	    var imgY = 90;
	    var imgX = 100;
	    var imgLogo = Data.getVideoImages(Data.tvIdxURLs[idx]);
	    if (imgLogo == "None")
	        imgLogo = "icons/OTV_100.png";
		t = "<h1>" + Data.videoTVID[Data.tvIdxURLs[idx]] + "<b style=\"color:#7BC3F8\"> " + Data.videoNames[Data.tvIdxURLs[idx]] + "</b></h1>";
		//t = "<h1><font color=\"#7BC3F8\">" + Data.videoTVID[Data.tvIdxURLs[idx]] + "</font> " + Data.videoNames[Data.tvIdxURLs[idx]] + "</h1>"; 
	    l = "<img src=\"" + imgLogo + "\" style=\"max-height:" + imgY + "px;max-width:" + imgX + "px;\"" + "\"></img>";
		//l = "<img src=\"" + Data.getVideoImages(Data.tvIdxURLs[idx]) + "\" style=\"padding:0;margin: 0;max-width: 100%;display: block;margin: auto;max-height:" + imgY + "px;\"" + "\"></img>";
		
		var desc = Data.getVideoDescription(Data.tvIdxURLs[idx]);
		if (desc.substring(0, 4) == "http") {
		    //Main.getDescInHttp(desc, oko);
		    //document.getElementById("mainInfoNowPlay").style.display = "block";
		}
		else {
		    var cc = webapis.tv.channel.getCurrentProgram();

		    if (cc.title != -1) {
		        //var now = null;
		        var duration = cc.duration;
		        var startTime = cc.startTime;
		        var title = cc.title;

		        var st = startTime.split("/");
		        var ds = st[3] * 60 * 60 + st[4] * 60;
		        var drd = duration + ds;
		        var drm = Math.floor(drd / 60) % 60;
		        var drh = Math.floor(drd / 3600) % 24;

		        var ddNow = new Date();
		        var dStart = new Date(st[0], st[1] - 1, st[2], st[3], st[4], ddNow.getSeconds(), ddNow.getMilliseconds());
		        //Debug.Log("[Main] dStart:" + dStart.toDateString() + ", " + dStart.toTimeString());

		        var dNow = new Date(ddNow.getFullYear(), ddNow.getMonth(), ddNow.getDate(), ddNow.getHours(), ddNow.getMinutes(), ddNow.getSeconds(), ddNow.getMilliseconds());
		        //Debug.Log("[Main] dNow:" + dNow.toDateString() + ", " + dNow.toTimeString());
		        var dDiff = parseInt(((dNow.valueOf() - dStart.valueOf()) / 1000));
		        var dur = (dDiff / cc.duration) * 100;
		        //Debug.Log("[Main] duration:" + dur + "%");
		        var start = st[3] + ":" + st[4] + " - " + ("0" + drh).substr(-2, 2) + ":" + ("0" + drm).substr(-2, 2);

		        var next = " ";
		        try {
		            var o = Main.SEFPluginTime.Execute("GetEpochTime");

		            var m = Main.SEFPluginTV.Execute("GetProgramList", o, 3600 * 24 * 7);
		            var c = Main.SEFPluginTV.Execute("GetProgramList_Size");
		            var s = null;
		            if (c > oko)
		                s = oko+1;
		            Debug.Log("[Main] s:"+s+ ", GetProgramList_Size:" + oko + "/" + c);
		            if (s!=null)
		            {
		                next = Main.SEFPluginTV.Execute("GetProgram_Title", s);
		                if (next == -1) {
		                    next = " ";
		                }
		                if (oko > 0) {

		                    next = ": " + start + " " + title;
		                    title = Main.SEFPluginTV.Execute("GetProgram_Title", s - 1);

		                    startTime = Main.SEFPluginTime.Execute("ConvertEpochToLocalTime",Main.SEFPluginTV.Execute("GetProgram_StartTime", s - 1));
		                    duration = Main.SEFPluginTV.Execute("GetProgram_Duration", s - 1);

		                    st = startTime.split("/");

		                    ds = st[3] * 60 * 60 + st[4] * 60;
		                    drd = duration + ds;
		                    
		                    drm = Math.floor(drd / 60) % 60;
		                    drh = Math.floor(drd / 3600) % 24;
		                    ddNow = new Date();
		                    dStart = new Date(st[0], st[1] - 1, st[2], st[3], st[4], ddNow.getSeconds(), ddNow.getMilliseconds());
		                    //Debug.Log("[Main] dStart:" + dStart.toDateString() + ", " + dStart.toTimeString());

		                    dNow = new Date(ddNow.getFullYear(), ddNow.getMonth(), ddNow.getDate(), ddNow.getHours(), ddNow.getMinutes(), ddNow.getSeconds(), ddNow.getMilliseconds());
		                    //Debug.Log("[Main] dNow:" + dNow.toDateString() + ", " + dNow.toTimeString());
		                    dDiff = parseInt(((dNow.valueOf() - dStart.valueOf()) / 1000));
		                    dur = (dDiff / cc.duration) * 100;
		                    //Debug.Log("[Main] duration:" + dur + "%");
		                    start = st[3] + ":" + st[4] + " - " + ("0" + drh).substr(-2, 2) + ":" + ("0" + drm).substr(-2, 2);
		                }
		            }
		        } catch (exc) {
		            Debug.Log("[Main] GetProgramList_Size error: " + exc.name + ", " + exc.message);
		        }


		        var d = start + "|" + dur + "|" + title + "| |"+ next +"|";
		        Main.setInfoNowPlay(d, 0);
		        document.getElementById("mainInfoNowPlay").style.display = "block";
		        this.pressGUIDE = true;
		        clearTimeout(Main.tPressGUIDE);
		        Main.SetGuideAndInfo(oko);
		           
		        Debug.Log("[Main] Displayed EPG: " + title + ", " + startTime + ", " + duration);
		        if (next != " ") {
		            Debug.Log("[Main] Next: " + next);
		        }
		    }
		    else {
		        var d = " | | | | | ";

		        Main.setInfoNowPlay(d, 0);
		        document.getElementById("mainInfoNowPlay").style.display = "none";
		    }
		}


		
	}
	else
	{
		document.getElementById("mainInfoNowPlay").style.display="none";
		l = "<h1>" +$APPS_LANG$.CHANNEL_EMPTY + "</h1>";
		Display.status("");
	}

	widgetAPI.putInnerHTML(infoElementT, t);
	widgetAPI.putInnerHTML(infoElement, l);


};
Main.getDescInHttp = function(description,oko)
{
	var sDesc = Main.selectMajor;
	var req = new XMLHttpRequest();

	var i = 0;
	req.onreadystatechange = function (aEvt) {

		if(sDesc!=Main.selectMajorTemp)
		{
			req.abort();

			//Debug.Log("[Main] Canceled description for video:" + sDesc);
			i = 1;
			return;

		}
		if (req.readyState == 4) {
			if(req.status == 200)
			{
				description = req.responseText;
				
				Main.setInfoNowPlay(description,oko);
			}

			else	
			{
				Debug.Log("[Main] Error loading page\n");
			}
		}
	};
	if(i==1)
		return;
	req.open("GET", description+"?nowtime", true);
	req.send(null);
};
Main.toggleDispInfoMode = function()
{
	if(this.showGuide==0)
	{
		this.showGuide=1;
	}
	else
	{
	    this.showGuide = 0;
	    if (!Main.OnlineTVTurn && !Main.pause) {
	        Main.pause = true;
	        if(Settings.autoPauseMode)
	            widgetAPI.sendReturnForceEvent();
	    }
	}
};
Main.ShowNowOnTV = function()
{
    Main.TimeZoneOffset = Main.SEFPluginTV.Execute("GetTimeZone_Offset");
	if (Main2.arrCategryList!=null)
		
	if(Main.showS==0)
	{
	    
		clearTimeout(Display.tMM);
		Display.hideMM();
		Main.hide();

		Main2.getSpecies();
		Main.showS = 1;
		if (Main.showS)
		    Main.Vol_SetBannerState();
		//Debug.Log("[Main] Rozpoczełem!");
		
		Server.dataReceivedCallbackS = function()
		{
			
		   Display.showS();
           //Debug.Log("[Main] Załadowałem!");
		   Main2.setSpecies();
		   Main2.setCatList(Main2.categoryIdx);
		   Server.dataReceivedCallbackS = null;
		   var idx = Main.GetIDs(Main.selectMinorTemp,Main.selectMajorTemp);
		   if (idx != null) {
		       Main.currentTV = idx;
		       Main.currentTVTemp = Main.currentTV;
		   }
		   
		};
		
	}
	else
	{
	    Main.VolCH_SetBannerState();
		Display.hideS();
		Main.showS = 0;
		Main.currentTV = Main.currentTVTemp;
		if (!Main.OnlineTVTurn && !Main.pause) {
		    Main.pause = true;
		    if (Settings.autoPauseMode)
		        widgetAPI.sendReturnForceEvent();
		}
	}
};
Main.SetGuideAndInfo = function (idx) {
    while (Main2.getCatGUIDE)
        Util.sleep(500);
    if (this.pressGUIDE) {
        this.pressGUIDE = false;
        Util.httpGetNoSync(Main2.runOnlineTVExtendText + idx);
        tPressGUIDE = setTimeout("Main.pressGUIDE = true;", Main.pressGUIDETimer);
        var ms = 0;
        var msink = 5;
        while (true) {
            var path = curWidget.id + '/OK';
            var fileSystemObj = new FileSystem();
            var fileObj = fileSystemObj.openCommonFile(path, 'r');
            if (fileObj || ms>500) {
                Debug.Log("[Main] Data read time: " + ms + "ms");
                fileSystemObj.closeCommonFile(fileObj);
                break;
            }
            fileSystemObj.closeCommonFile(fileObj);
            ms += msink;
            Util.sleep(ms);
        }
        
    }
    //
    var infoElement = document.getElementById("guideMainInfoCont");
    var infoNowPlaySpecies = document.getElementById("mainInfoNowSpecies");
    var path = curWidget.id + '/ExtendedText.txt';
    var fileSystemObj = new FileSystem();
    var fileObj = fileSystemObj.openCommonFile(path, 'r');
    if (fileObj != null) {
        var str = fileObj.readAll().replace(/(\r\n|\n|\r)/gm, "<br />");// .replace("\\r\\n", "<br />");
        //Debug.Log("[Main] Read EPG data: " + str);
        var str_2 = str.split("\t<br />");
        var info = "";
        if (str_2.length > 1) {
            info = Util.GetInfoEPG(str_2[0]);
            str = str_2[1];
        }
        else {
            str = str_2[0];
        }

        //Debug.Log(str);
        widgetAPI.putInnerHTML(infoElement, str);
        
    }
    else {
        Debug.Log("[Main] FileObj read status error: " + fileObj);
        widgetAPI.putInnerHTML(infoElement, "<h1>" + Data.videoNames[Data.tvIdxURLs[idx]] + "</h1></p>" + $APPS_LANG$.NO_EPG);
        this.mxInfoNum = 0;
    }
    widgetAPI.putInnerHTML(infoNowPlaySpecies, info);
    fileSystemObj.closeCommonFile(fileObj);
};
Main.DispGuide = function(idx)
{
    Debug.Log("[Main] Guide idx: " + idx);
    var infoElement = document.getElementById("guideMainInfoCont");
	if(this.showGuide==1)
	{
	    if (Main.showST) {
	        Debug.Log("[Main] Get ex EPG: " + Main2.IDsExEPG[Main2.articleIdx]);
	        if (Main2.IDsExEPG[Main2.articleIdx] != "None") {
	            var n = Main2.IDsExEPG[Main2.articleIdx].split(";");

	            ////////////////////////////

	            var infoElement = document.getElementById("mainInfoLogo");
	            var infoElementT = document.getElementById("mainInfoTitle");
	            var t = "";
	            var l = "";
	                var imgY = 90;
	                var imgX = 100;
	   
	                t = "<h1>" + n[3] + "<b style=\"color:#7BC3F8\"> " + n[4] + "</b></h1>";
	                l = "<img src=\"" + n[5] + "\" style=\"max-height:" + imgY + "px;max-width:" + imgX + "px;\"" + "\"></img>";

	                while (Main2.getCatGUIDE)
	                    Util.sleep(500);
	                if (this.pressGUIDE) {
	                    this.pressGUIDE = false;
	                    var data = Main2.runOnlineTVExtendEPG + n[0] + "&1=" + n[1] + '&2=' + n[2];
	                    Debug.Log("[Main] Main2.runOnlineTVExtendEPG: " + data);
	                    Util.httpGetNoSync(data);
	                    tPressGUIDE = setTimeout("Main.pressGUIDE = true;", Main.pressGUIDETimer);
	                    var ms = 0;
	                    var msink = 5;
	                    while (true) {
	                        var path = curWidget.id + '/OK';
	                        var fileSystemObj = new FileSystem();
	                        var fileObj = fileSystemObj.openCommonFile(path, 'r');
	                        if (fileObj || ms > 500) {
	                            Debug.Log("[Main] Data read time: " + ms + "ms");
	                            fileSystemObj.closeCommonFile(fileObj);
	                            break;
	                        }
	                        fileSystemObj.closeCommonFile(fileObj);
	                        ms += msink;
	                        Util.sleep(ms);
	                    }
	                }
                    
	            //////////////
	            //
	                var infoElementM = document.getElementById("guideMainInfoCont");
	                var infoNowPlaySpecies = document.getElementById("mainInfoNowSpecies");
	                var infoNowPlayTitle = document.getElementById("mainInfoNowTitle");
	                var infoNowPlayTimeStr = document.getElementById("mainInfoTimeStr");
	                var infoNowPlaySpecies = document.getElementById("mainInfoNowSpecies");
	                var path = curWidget.id + '/ExtendedText.txt';
	                var fileSystemObj = new FileSystem();
	                var fileObj = fileSystemObj.openCommonFile(path, 'r');
	                var info = "";
	                if (fileObj != null) {
	                    var str = fileObj.readAll().replace(/(\r\n|\n|\r)/gm, "<br />");// .replace("\\r\\n", "<br />");
	                    
	                    var str_2 = str.split("\t<br />");
	                    var dinfo = str_2[0].split("|;");

	                    //Debug.Log("[Main] Read EPG data: " + dinfo[2]);
	                    info = Util.GetInfoEPG(dinfo[2]);
	                    var h = dinfo[0].split(" - ");//2016.12.11.00.05
	                    var h1 = h[0].split(".");
	                    var h2 = h[1].split(".");
	                    h = h1[3] + ":" + h1[4] + " - " + h2[3] + ":" + h2[4];
	                    if (str_2.length > 1) {
	                        str = str_2[1];
	                    }
	                    else {
	                        str = str_2[0];
	                        str = info;
	                        info = "";
	                    }
	                   
	                    var dnow = h + "|" + "0" + "|" + dinfo[1] + "|" + "" + "|" + "" + "|";
	                    
	                    
	                    //Debug.Log("[Main] ___________Read EPG data: " + dnow);
	                    Main.setInfoNowPlay(dnow, 0);
	                    widgetAPI.putInnerHTML(infoNowPlaySpecies, info);
	                    //Debug.Log(str);
	                    widgetAPI.putInnerHTML(infoElementM, str);
	                    

	                }
	                else {
	                    Debug.Log("[Main] FileObj read status error: " + fileObj);
	                    widgetAPI.putInnerHTML(infoElement, "<h1>" + Data.videoNames[Data.tvIdxURLs[idx]] + "</h1></p>" + $APPS_LANG$.NO_EPG);
	                    //this.mxInfoNum = 0;
	                }
	                //widgetAPI.putInnerHTML(infoNowPlaySpecies, info);
	                fileSystemObj.closeCommonFile(fileObj);

                ////////////////////

	                //var d = start + "|" + dur + "|" + title + "| |" + next + "|";
	                //Main.setInfoNowPlay(d, 0);
	                //document.getElementById("mainInfoNowPlay").style.display = "block";
	                //this.pressGUIDE = true;
	                //clearTimeout(Main.tPressGUIDE);
	                //Main.SetGuideAndInfo(oko);

	                //Debug.Log("[Main] Displayed EPG: " + title + ", " + startTime + ", " + duration);
	                //if (next != " ") {
	                //    Debug.Log("[Main] Next: " + next);
	                //}
	            //}
	            //else {
	            //    var d = " | | | | | ";

	            //    Main.setInfoNowPlay(d, 0);
	            //    document.getElementById("mainInfoNowPlay").style.display = "none";
	            //}

	        }
	        else {
	            document.getElementById("mainInfoNowPlay").style.display = "none";
	            l = "<h1>" + $APPS_LANG$.CHANNEL_EMPTY + "</h1>";
	            Display.status("");
	        }

	        widgetAPI.putInnerHTML(infoElementT, t);
	        widgetAPI.putInnerHTML(infoElement, l);

	        //////////////////////////////

	    }
	    else {

	        Main.SetInfo(Main.currentTV, Main.infocurrNum);
	        this.mxInfoNum = this.MXGuideNum;
	        Main.SetGuideAndInfo(Main.infocurrNum);
	    }
	    Main.hide();
	    Main.show();

	    document.getElementById("guideMainInfo").style.display = "block";

	}
	else
	{
		this.showGuide = 0;
		Main.infocurrNum = 0;
		Main.hide();
		document.getElementById("guideMainInfo").style.display="none";
	}
};

Main.setInfoNowPlay = function(desc,oko)
{
    if (oko == 1) {
        Main.setInfoNowPlay2(desc);
    }

	var n=desc.split("|"); 

	document.getElementById("mainInfoNowPlay").style.display="block";
	var infoNowPlayTitle = document.getElementById("mainInfoNowTitle");
	var infoNowPlayTimeStr = document.getElementById("mainInfoTimeStr");
	var infoNowPlaySpecies = document.getElementById("mainInfoNowSpecies");
	var infoNowPlayNext = document.getElementById("mainInfoNowNext");
	
	
	//.

	if(n[1]>100)
		n[1]=100;
	widgetAPI.putInnerHTML(infoNowPlayTimeStr, n[0]);
	document.getElementById("mainInfoTimePBarSolid").style.width = n[1] + "%";
	if (n[2].length > 75)
	    n[2] = n[2].substring(0, 75) + "...";
	widgetAPI.putInnerHTML(infoNowPlayTitle, n[2]);
	//Main.curTitle = n[2];
	widgetAPI.putInnerHTML(infoNowPlaySpecies, n[3]);
	if (n[4].length > 90)
	    n[4] = n[4].substring(0, 90) + "...";
	if (n[4] != " ") {
	    if (n[4][0] == ":")
	        widgetAPI.putInnerHTML(infoNowPlayNext, Util.Color("8BB573", $APPS_LANG$.EPG_NOW + n[4].slice(1)));
        else
	        widgetAPI.putInnerHTML(infoNowPlayNext, $APPS_LANG$.EPG_NEXT + n[4]);
	}
	else {
	    widgetAPI.putInnerHTML("");
	}
	document.getElementById("mainInfoNowPlay").style.display="block";
	document.getElementById("mainInfoTimePBarSolid").style.display="block";

};
Main.setInfoNowPlay2 = function(desc)
{

   

	var n=desc.split("|"); 

	

	if(n[1]>100)
		n[1]=100;
	var d = n[2];

	if (d.length < 1) {
	    return;
	}

	var i = 40;
	if (d.length>i)
	{
		d = d.substring(0,i-3) + "...";
	}	
	
	
	var infoMM = document.getElementById("mainInfoMM");
	widgetAPI.putInnerHTML(infoMM, d + "<div style=\"background-image: url('Images/mainInfoTimePBarEmpty100.png'); position:absolute; left:550px; width:100px; height:8px; z-index:16\"> <\div>" +
                                       "<div style=\"background-image: url('Images/mainInfoTimePBarSolid100.png'); position:absolute; opacity:0.65; width:" + n[1] + "%; height:8px; z-index:15; left:0px; top:0px;\"> <\div>");

	//widgetAPI.putInnerHTML(infoMM, d + "<div style=\"background-image: url('https://www.dropbox.com/s/1bhvxefd2qapmlg/mainInfoTimePBarEmpty100.png?dl=1'); position:absolute; left:550px; width:100px; height:8px; z-index:15\"> <\div>" +
    //                                   "<div style=\"background-image: url('https://www.dropbox.com/s/0j8foark0l1hcxo/mainInfoTimePBarSolid100.png?dl=1'); position:absolute; opacity:0.65; width:" + n[1] + "%; height:8px; z-index:15; left:0px; top:0px;\"> <\div>");
    //widgetAPI.putInnerHTML(infoMM, n[1] + "% | " + d); //
	//widgetAPI.putInnerHTML(infoMM , d);
	
	document.getElementById("mainInfoMM").style.display = "block";
	Display.tMM = setTimeout("Display.hideMM();", 3300);

};
Main.WindowsPlayerFullScreen = function () {
    if (OnlineChannel.Player != null) {
       
        OnlineChannel.Player.setFullscreen();

        if (!curWidget.isShow || !curWidget.isFocus()) {
            curWidget.show();
            curWidget.setFocus();
            //document.getElementById("Main_KeyHandler").focus();
        }
    }
};
Main.setWindowMode = function()
{

	Display.show();

	OnlineChannel.Player.setWindow();

};
Main.SetTimetrs = function (bSet) {
    if (bSet) {
        if (Main.hClock == null) {
            Main.hClock = setInterval(function () { UpdateTime() }, 1000);
        }
        if (Main.hTimerCheckRegPowerKey == null) {
           // Main.hTimerCheckRegPowerKey = setInterval("Main.CheckRegPowerKey();", 500);
        }
    }
    else {
        if (Main.hClock != null) {
            clearInterval(Main.hClock);
            Main.hClock = null;
        }
        if (Main.hTimerCheckRegPowerKey != null) {
            clearInterval(Main.hTimerCheckRegPowerKey);
            Main.hTimerCheckRegPowerKey = null;
        }
    }
}
Main.onLoad = function()
{
    var rDebug = Debug.init();
    Debug.Log("[Main] Debug.js status: " + rDebug);
    var rServer = Server.init();
    Debug.Log("[Main] Server.js status: " + rServer);
    var rPlayer = Player.init();
    Debug.Log("[Main] Player.js status: " + rPlayer);
    var rDisplay = Display.init();
    Debug.Log("[Main] Display.js status: " + rDisplay);
    var rData = Data.init();
    Debug.Log("[Main] Data.js status: " + rData);
    var rFile = File.init();
    Debug.Log("[Main] File.js status: " + rFile);
    //pluginAPI.setOnIdleEvent();
    if (rDebug && rServer && rPlayer && rDisplay && rData) {
        Debug.Log("[Main] Functions status ok");

            //Player.stopCallback = function () {
            //    Debug.Log("[Main] Player stoped!");
            //    //Main.setWindowMode();
            //};
            Server.dataReceivedCallback = function () {
                Debug.Log("[Main] Loaded " + Data.tvIdxURLs.length + " channels");
                Debug.Log("[Main] Analog channels: " + Main.aIDs.length);
                Debug.Log("[Main] Digital channels: " + Main.dIDs.length);
                Main.starting = 1;
                //Main.SetTimetrs(true);
                //window.setInterval(function () { scroll() }, 100);
                //Main.hClock = setInterval(function () { UpdateTime() }, 1000);
                //Main.hTimerCheckRegPowerKey = setInterval("Main.CheckRegPowerKey();", 500);
                Debug.Log("[Main] Start timer");
                
                if (!Main.bWidgetReady) {
                    widgetAPI.sendReadyEvent();
                    Debug.Log("----- OnlineTV send ready event -----");
                    Main.bWidgetReady = true;
                }
                else {
                    Debug.Log("----- Try OnlineTV Channel (Server.dataReceivedCallback) -----");
                    setTimeout("Main.ChangeChannel(0);", 2500);
                }
                
                //window.setInterval(function () { Main.CheckingRegKey(tvKey.KEY_INFO) }, 1500);
                //Debug.Log("[Main] Start checking register key");
                //window.setInterval(function () { Main.ResumePlay() }, 1000);

                Data.videoDescriptions = [];

                
               
                Server.dataReceivedCallback = null;
     
                

                //try {
                //    var Owidget = window.parent;//.getWidget("10130000000");
                //    Debug.DisplayClass(Owidget, 'window.parent.txt');
                //    Debug.Log("[Main] OnlineTV: show " + Owidget.id);
                //} catch (exc) {
                //    Debug.Log("[Main] OnlineTV show: " + exc.name + ", " + exc.message);
                //}
                

               // Server.hh(null);
               
                Server.dataReceivedCallback = function () {
                    
                    Debug.Log("[Main] Loaded " + Data.tvIdxURLs.length + " channels");
                    Debug.Log("[Main] Analog channels: " + Main.aIDs.length);
                    Debug.Log("[Main] Digital channels: " + Main.dIDs.length);

                    Server.dataReceivedCallback = null;
                    var idx = Main.GetIDs(Main.selectMinorTemp, Main.selectMajorTemp);
                    if (idx != null) {
                        Main.currentTV = idx;
                        Main.currentTVTemp = Main.currentTV;
                    }
                   
                }
                

            };
           
            Display.hideS();

            Debug.Log("[Main] Main.onLoad");

            //Main.windowPlugin = document.getElementById("windowplugin");
            Debug.Log("----- Plugin define go -----");
            Main.includePlugin(PL_ENUM_SEFTIME);
            Main.includePlugin(PL_ENUM_SEFAPPCOMMON);
            Main.includePlugin(PL_ENUM_WINDOW);
            Main.includePlugin(PL_ENUM_SEFNNAVI);
            Main.NNaviVer = Main.SEFPluginNNavi.Execute("GetNNaviVersion");
            Main.Model = Main.SEFPluginNNavi.Execute("GetModel");
            Main.Firmware = Main.SEFPluginNNavi.Execute("GetFirmware");
            Main.SEFPluginNNavi.Close();
            Main.includePlugin(PL_ENUM_SEFTASKMANAGER);
            Main.MultiApp = Main.SEFPluginTaskManager.Execute("CheckSupportMultiTaskingApp");
            
            Main.includePlugin(PL_ENUM_NNAVI);
            Main.APver = Main.NNaviPlugin.GetSystemVersion(PL_NNAVI_SYSTEM_VERSION_COMP);
            Main.BPver = Main.NNaviPlugin.GetSystemVersion(PL_NNAVI_SYSTEM_VERSION_LEEUM);
            Main.includePlugin(PL_ENUM_SEFTV);
            Main.ProductCode = Main.SEFPluginTV.Execute("GetProductCode");
            Main.TimeZone = Main.SEFPluginTV.Execute("GetTimeZone");
            Main.TimeZoneOffset = Main.SEFPluginTV.Execute("GetTimeZone_Offset");

            Main.includePlugin(PL_ENUM_SEFWINDOW);
            Main.includePlugin(PL_ENUM_TVMW);
            Main.includePlugin(PL_ENUM_SEFNETWORK);
            Main.includePlugin(PL_ENUM_TASKMANAGER);
            Main.includePlugin(PL_ENUM_TV);
            Main.includePlugin(PL_ENUM_SEFTVMW);
            Main.includePlugin(PL_ENUM_APPCOMMON);
            Debug.Log("----- Plugin define done -----");

            Debug.Log("----- Basic information go -----");
            Debug.Log("[Main] SupportMultiTaskingApp: " + Main.MultiApp);
            Debug.Log("[Main] Product code " + Main.ProductCode);
            Debug.Log("[Main] Widget Manager Ver. " + window.managerWidget.version);
            Debug.Log("[Main] BP Ver. " + Main.BPver);
            Debug.Log("[Main] AP Ver. " + Main.APver);
            Debug.Log("[Main] Model " + Main.Model);
            Debug.Log("[Main] Firmware " + Main.Firmware);
            Debug.Log("[Main] NNavi Ver. " + Main.NNaviVer);
            Debug.Log("[Main] TimeZone " + Main.TimeZone);
            Debug.Log("[Main] TimeZone Offset " + Main.TimeZoneOffset);
            Debug.Log("[Main] Country " + webapis.tv.info.getCountry());
            Debug.Log("[Main] Language " + webapis.tv.info.getLanguage());// Main.TVPlugin.GetLanguage());
            
            Debug.Log("----- Check external files go -----");
            var chlist = Util.ExistsFile("/dtv/www/phpsysinfo/listCH/listCH.sh");
            chlist = chlist && Util.ExistsFile("/dtv/www/phpsysinfo/listCH/oko.php");
            if (chlist)
                Player.isWeebTV = Util.ExistsFile("/dtv/www/phpsysinfo/listCH/WeebTV.sh");
            if (!chlist) {
                chlist = Util.ExistsFile("/mnt/var/www/phpsysinfo/listCH/listCH.sh");
                chlist = chlist && Util.ExistsFile("/mnt/var/www/phpsysinfo/listCH/oko.php");
                if (chlist)
                    Player.isWeebTV = Util.ExistsFile("/mnt/var/www/phpsysinfo/listCH/WeebTV.sh");
            }
            
            var dataforguide = 0;
            if (Util.ExistsFile("/mnt/opt/privateer/usr/libso/libOnlineTV/libOnlineTVDataForGUIDE.so")==1)
            {
                dataforguide = Util.ExistsFile("/dtv/www/phpsysinfo/runOnlineTVDataForGUIDE/runOnlineTVDataForGUIDE.php")==1 &&
                                   Util.ExistsFile("/dtv/www/phpsysinfo/runOnlineTVDataForGUIDE/runOnlineTVDataForGUIDE.sh")==1 &&
                                   Util.ExistsFile("/dtv/www/phpsysinfo/runOnlineTVDataForGUIDE/runOnlineTVExtendText.php")==1 &&
                                   Util.ExistsFile("/dtv/www/phpsysinfo/runOnlineTVDataForGUIDE/runOnlineTVExtendText.sh") == 1 &&
                                   Util.ExistsFile("/dtv/www/phpsysinfo/runOnlineTVDataForGUIDE/runOnlineTVExtendEPG.php") == 1 &&
                                   Util.ExistsFile("/dtv/www/phpsysinfo/runOnlineTVDataForGUIDE/runOnlineTVExtendEPG.sh") == 1;
                if (!dataforguide) {
                    dataforguide = Util.ExistsFile("/mnt/var/www/phpsysinfo/runOnlineTVDataForGUIDE/runOnlineTVDataForGUIDE.php") == 1 &&
                                   Util.ExistsFile("/mnt/var/www/phpsysinfo/runOnlineTVDataForGUIDE/runOnlineTVDataForGUIDE.sh") == 1 &&
                                   Util.ExistsFile("/mnt/var/www/phpsysinfo/runOnlineTVDataForGUIDE/runOnlineTVExtendText.php") == 1 &&
                                   Util.ExistsFile("/mnt/var/www/phpsysinfo/runOnlineTVDataForGUIDE/runOnlineTVExtendText.sh") == 1 &&
                                   Util.ExistsFile("/mnt/var/www/phpsysinfo/runOnlineTVDataForGUIDE/runOnlineTVExtendEPG.php") == 1 &&
                                   Util.ExistsFile("/mnt/var/www/phpsysinfo/runOnlineTVDataForGUIDE/runOnlineTVExtendEPG.sh") == 1;
                }
                if (dataforguide) {
                    //setInterval(function () { Main2.GetSpeciesViaLib() }, 60000);
                }
            }
            var runwidget = 0;
            if (Util.ExistsFile("/mnt/opt/privateer/usr/libso/libRunWidget.so") == 1) {
                runwidget = Util.ExistsFile("/dtv/www/phpsysinfo/runWidget/runWidget.php")==1 &&
                            Util.ExistsFile("/dtv/www/phpsysinfo/runWidget/runWidget.sh") == 1;
                if (!runwidget) {
                    runwidget = Util.ExistsFile("/mnt/var/www/phpsysinfo/runWidget/runWidget.php") == 1 &&
                                Util.ExistsFile("/mnt/var/www/phpsysinfo/runWidget/runWidget.sh") == 1;
                }
            }
            if (Settings.bMoreStreamInfo) {
                var scMSI = Util.ExistsFile("/dtv/www/phpsysinfo/listCH/GetStreamInfo.sh");
                if (!scMSI)
                    scMSI=Util.ExistsFile("/mnt/var/www/phpsysinfo/listCH/GetStreamInfo.sh");
                Settings.bMoreStreamInfo = Util.ExistsFile(Settings.MoreStreamInfoExtAppPath) && chlist;
            }
            
            Main.isSoftPowerOff = Util.ExistsFile("/dtv/SoftPowerOff.log");
            Util.CheckRECDir();

            Debug.Log("----- Check external files done -----");
            if (Settings.autoPauseMode == true && runwidget == 1)
                Settings.autoPauseMode = true;
            else
                Settings.autoPauseMode = false;
            Debug.Log("[Main] AutoPauseMode status: " + Settings.autoPauseMode);

            var cType = Main.SEFPluginNetwork.Execute('GetActiveType');
            if (cType != -1) {
                var ip = Main.SEFPluginNetwork.Execute('GetIP', cType);
                if (ip == null)
                    ip = '127.0.0.1';
                Main.Address_IP = ip;
                if (runwidget) {
                    Main.widgetURL = 'http://' + Main.Address_IP + ':1080/phpsysinfo/runWidget/runWidget.php?0=';
                    Debug.Log("[Main] Get widget url: " + Main.widgetURL);
                }
                Main.screenShotURL = 'http://' + Main.Address_IP + ':1080/phpsysinfo/runScreenShot/runScreenShot.php';
                
                if (chlist) {
                    Player.listenCHurl = 'http://' + Main.Address_IP + ':1080/phpsysinfo/listCH/oko.php?'
                    Debug.Log("[Main] Get listen channel url: " + Player.listenCHurl);
                }
                if (dataforguide) {
                    Main2.runOnlineTVDataForGUIDE = 'http://' + Main.Address_IP + ':1080/phpsysinfo/runOnlineTVDataForGUIDE/runOnlineTVDataForGUIDE.php';
                    Debug.Log("[Main] Get runOnlineTVDataForGUIDE url: " + Main2.runOnlineTVDataForGUIDE);
                    Main2.runOnlineTVExtendText = 'http://' + Main.Address_IP + ':1080/phpsysinfo/runOnlineTVDataForGUIDE/runOnlineTVExtendText.php?0=';
                    Debug.Log("[Main] Get runOnlineTVExtendText url: " + Main2.runOnlineTVExtendText);
                    Main2.runOnlineTVExtendEPG = 'http://' + Main.Address_IP + ':1080/phpsysinfo/runOnlineTVDataForGUIDE/runOnlineTVExtendEPG.php?0=';
                    Debug.Log("[Main] Get runOnlineTVExtendEPG url: " + Main2.runOnlineTVExtendEPG);
                }
                //Player.httpGetNoSync('http://' + ip + ':1080/phpsysinfo/listCH/RostelecomList.php');
            }
            
            Main.noBGApp = webapis._pluginDef.PL_TASKMANAGER_DTV_APP_INFOLINK2;
            Main.ChannelsJSON = Util.ReadChannelJSON('channels');
            Main.ChannelsStreamInfos = Util.ReadChannelJSON('streamInfos');
            Main.setLanguage();
            Debug.Log("----- Basic information done -----");
            Debug.Log("----- Event registration go -----");
            Debug.Log("----- Event window go -----");
            window.onShow = Main.showHandler;
            window.onResume = Main.resumeHandler;
            window.onHide = Main.hideHandler;
            window.onPause = Main.pauseHandler;
            Debug.Log("----- Event widget go -----");
        //Debug.Log("[Main] Params: " + window.location.search);
            curWidget.onWidgetEvent = Main.onWidgetEvent;
            Debug.Log("----- Event SEFPluginAppcommon go -----");
            for (var i = 0; i <= 45; i++)
                Main.SEFPluginAppcommon.Execute('SubscribeEvent', i);
            Main.SEFPluginAppcommon.OnEvent = OnEvent;
            
        
            
            Debug.Log("----- Event SEFPluginTV go -----");
            Main.SEFPluginTV.OnEvent = OnEvent2;
            for (var i = 1; i < 6000;i++){//Main.SEFPluginTVevents.length; i++) {
                if (i == 505)
                    continue;
                try
                {
                    var a = Main.SEFPluginTV.Execute('SetEvent', i);//Main.SEFPluginTVevents[i]);
                }
                catch(exc){}
            }
            Debug.Log("----- Event registration done -----");
            Debug.Log("----- TvList.xml load start -----");
            Server.hh(null);

            if (!Main.bWidgetReady) {
                widgetAPI.sendReadyEvent();
                Debug.Log("----- OnlineTV send ready event -----");
                Main.bWidgetReady = true;
            }
            else {
                Debug.Log("----- Try OnlineTV Channel (onLoad) -----");
                setTimeout("Main.ChangeChannel(0);", 500);
            }
        }
        else {
            Debug.Log("[Main] Failed to initialise");
        }
    //}

};
Main.ReloadFunction = function (name, source) {
    try {
        sf.core.getEnvValue(name);

        sf.core.loadJS(source, function () {
            Debug.Log("[Main] Function is reload");
        });
        //sf.core.loadJS(webapis.tv.info.getLanguage(), function () { Debug.Log("[Main] Language load done"); });
    }
    catch (exc) {
        Debug.Log("[Main] Function reload error: " + exc.name + ", " + exc.message);
    }
};
Main.setLanguage = function () {
    try {
        sf.core.getEnvValue('lang');
        var lang_us = webapis.tv.info.getLanguage();
        var lang = "en";
        
        for (var i = 0; i < Main.lang.length; i++) {
            if (Main.lang[i] == lang_us) {
                lang = Main.lang[i];
                break;
            }
        }
        var lang_file = 'lang/' + lang + '.js'
        sf.core.loadJS(lang_file, function () {
            Debug.Log("[Main] Language load done...");
        });
        //sf.core.loadJS(webapis.tv.info.getLanguage(), function () { Debug.Log("[Main] Language load done"); });
    }
    catch (exc) {
        Debug.Log("[Main] Language error: " + exc.name + ", " + exc.message);
    }
};
//var showHandler = function (event) {
Main.showHandler = function (event) {
    Main.pause = false;
    Main.SetTimetrs(true);
    Debug.Log("[Main] On window go...");
    Debug.Log("[Main] Event type = " + event.type);
    Debug.Log("[Main] Event data = " + event.data);

    if (OnlineChannel.Player != null) {
        OnlineChannel.Player.setFullscreen();
    }
    else {
        Main.ResetChannel();
    }

    //curWidget.setFocus();
    Main.CheckingRegKey(tvKey.KEY_SUBT);
    Debug.Log("[Main] On window! 1");
    //Main.keyReg();
    //curWidget.show();
    //document.getElementById("Main_KeyHandler").focus();
    //curWidget.setFocus();
    Main.selectbgAppTemp = Main.SEFPluginTaskManager.Execute('GetActiveApplication');
    Debug.Log("[Main] App: " + Util.CreateMsg(Define.APP, [Main.selectbgAppTemp]));
  
    //Main.Save(event, 'window' + Main.selectbgAppTemp);
    Debug.Log("[Main] On window done...");
   

};
Main.hideHandler = function (event) {
    Main.pause = true;
    Main.SetTimetrs(false);
    Debug.Log("[Main] On hide window go...");
    Debug.Log("[Main] Event type = " + event.type);
    //Debug.Log("[Main] Event data = " + event.data);
    Main.keyUnreg();
    Main.selectbgAppTemp = Main.SEFPluginTaskManager.Execute('GetActiveApplication');
    Debug.Log("[Main] App: " + Util.CreateMsg(Define.APP, [Main.selectbgAppTemp]));
    //Main.Save(event, 'window' + Main.selectbgAppTemp);
    Debug.Log("[Main] On hide window done...");
    //curWidget.show();
    
    

};
Main.pauseHandler = function (event) {

    Main.pause= true;
    Main.SetTimetrs(false);
    Debug.Log("[Main] On pause window go...");
    Debug.Log("[Main] Event type = " + event.type);
    //Debug.Log("[Main] Event data = " + event.data);
    if (Main.OTV != null) {
        Main.OTV.deinit();
        Main.OTV = undefined;
        delete Main.OTV;
    }
    Main.keyUnreg();
    Main.selectbgAppTemp = Main.SEFPluginTaskManager.Execute('GetActiveApplication');
    Debug.Log("[Main] App: " + Util.CreateMsg(Define.APP, [Main.selectbgAppTemp]));
    //Main.Save(event, 'window' + Main.selectbgAppTemp);
    Debug.Log("[Main] On pause window done...");
    

};<
Main.resumeHandler = function (event) {
    Main.pause = false;
    Main.SetTimetrs(true);
    Debug.Log("[Main] On resume window go...");
    Debug.Log("[Main] Event type = " + event.type);
    Debug.Log("[Main] Event data = " + event.data);
    Main.keyReg();
    if (OnlineChannel.Player != null) {
        OnlineChannel.Player.setFullscreen();
    }
    else {
        Main.ResetChannel();
    }

    //curWidget.setFocus();
    Main.CheckingRegKey(tvKey.KEY_SUBT);
    //Debug.Log("[Main] On resume window! 1");
    //Main.keyReg();
    //curWidget.show();
    //document.getElementById("Main_KeyHandler").focus();
    //curWidget.setFocus();
    Main.selectbgAppTemp = Main.SEFPluginTaskManager.Execute('GetActiveApplication');
    Debug.Log("[Main] App: " + Util.CreateMsg(Define.APP, [Main.selectbgAppTemp]));
    //Main.Save(event, 'window' + Main.selectbgAppTemp);
    Debug.Log("[Main] On resume window done...");


};
//var onWidgetEvent = function (event) {
Main.onWidgetEvent = function (event) {

    //pluginAPI.setOffIdleEvent();
    //pluginAPI.setOffScreenSaver();
    //pluginAPI.setOnWatchDog();
    Main.selectbgAppTemp = Main.SEFPluginTaskManager.Execute('GetActiveApplication');
    //Main.Save(event, 'owe' + Main.selectbgAppTemp);
    Debug.Log("[Main] App: " + Util.CreateMsg(Define.APP, [Main.selectbgAppTemp]) + ". On widget event, type: " + event.type + ", data: " + event.data);
    switch (parseInt(event.type)) {
        case 48:
            break;
        case 47:
            break;
        default:
            Debug.Log("[Main] Message onWidgetEvent: " + event.type);
            break;

    }
    
    
    //var type = Common.API.GET_HIGHTLIGHT;
    //var data = curWidget.id;// + "|?|" + pURL;
    //var widgetEvent = new WidgetEvent(type, data);	// async call
    //sendWidgetEvent("", widgetEvent, false);
    //Debug.Log("[Main] On Widget Event!: OK");
    //Main.Save(event, "event_" + event.type);

};
function OnEvent(event, data1, data2) {
    try
    {
        var Aapp = Main.SEFPluginTaskManager.Execute('GetActiveApplication');
        var data = data1.split("/");
        //var size = Main.SEFPluginTVMW.Execute('GetTVUseMode');
        //Debug.Log("[Main] GetTVUseMode: " + size)
        switch (data[0]) {
            case "00000000":
                {
                    Debug.Log("[Main] The App is deactivated: " + Util.CreateMsg(Define.APP, [Main.ActiveApp])+ ", OnlineTV focus: " + curWidget.isFocus());
                
                    switch (Main.ActiveApp)
                    {
                        case webapis._pluginDef.PL_TASKMANAGER_DTV_APP_PVR:
                            Main.bPVR = false;
                            break;
                        case webapis._pluginDef.PL_TASKMANAGER_DTV_APP_FAVCHLIST:
                            Main.itv = false;
                            break;
                        case webapis._pluginDef.PL_TASKMANAGER_DTV_APP_CM:
                            Main.itv = false;
                            break;
                        case webapis._pluginDef.PL_TASKMANAGER_DTV_APP_TVVIEWER:
                            if (Main.itv)
                                Main.itv = false;
                            break;
                        case webapis._pluginDef.PL_TASKMANAGER_DTV_APP_GLOBAL_FUNCTION:
                            Main.itv = false;
                            break;
                        case webapis._pluginDef.PL_TASKMANAGER_DTV_APP_EPG:
                            Main.bEPG = false;
                            Main.itv = false;
                            //curWidget.show();
                            //curWidget.setFocus();
                            break;
                        case Main.noBGApp: //case window.PL_TVMW_DTVAPP_INFOLINK:
                        case 134://window.PL_TASKMANAGER_DTV_APP_HOMEPANEL:
                            if (Main.itv) {
                                Main.itv = false;
                                Debug.Log("[Main] Change app")
                                Main.ResetChannel();
                                Main.ChangeChannel();
                                Main.selectbgApp = Aapp;
                            }
                            break;
                        default:
                            //Debug.Log("[Main] D1")
                            if (Main.OTV == null) {

                                //Debug.Log("[Main] D3")
                                //Main.ResetChannel();

                            }
                            else {
                                try {
                                    //var NNaviPlugin = document.getElementById("pluginObjectNNavi");
                                    //NNaviPlugin.SendEventToDevice(22000, "1");
                                    if (Main.OnlineTVTurn) {
                                        //Debug.Log("[Main] D4")
                                        if (Main.bEPG) {
                                            Main.WindowsPlayerFullScreen();
                                            Main.bEPG = false;
                                            //Debug.Log("[Main] D5")
                                        }
                                    
                                        //Main.CheckingRegKey(tvKey.KEY_SUBT);
                                        //document.getElementById("Main_KeyHandler").focus();
                                        //Debug.Log("[Main] D6")
                                    
                                    }
                                    //Main.keyUnreg();
                                } catch (exc) {
                                    Debug.Log("[Main] OnlineTV event: " + exc.message);
                                }
                            }
                        
                            break;
                    }
                    break;
                }
            case "00000001":
                {
                    Debug.Log("[Main] The App is activated: " + Util.CreateMsg(Define.APP, [Aapp]) + ", OnlineTV focus: " + curWidget.isFocus());
                    Main.ActiveApp = Aapp;
                    //var list = Main.SEFPluginTVMW.Execute("GetActiveApp");//Main.SEFPluginTaskManager.Execute('GetHighlightedApplication');
                    //Debug.Log("[Main] Main.SEFPluginTVMW.Execute(\"GetActiveApp\"): " + list)
                    switch (Aapp) {
                        case webapis._pluginDef.PL_TASKMANAGER_DTV_APP_SOURCE:
                            if (Main.isSoftPowerOff && Main.bPowerOff) {
                                //Main.UnsetEvent();
                                //Debug.Log("[Main] Power off UnsetEvent");
                                //pluginAPI.unregistKey(tvKey.KEY_PANEL_POWER);
                                //pluginAPI.unregistKey(tvKey.KEY_POWER);
                                Main.SEFPluginAppcommonmonPluginVer.SendKeyToTVViewer(tvKey.KEY_POWER);
                                Debug.Log("[Main] Power off done...");

                                //setTimeout("pluginAPI.unregistKey(tvKey.KEY_PANEL_POWER);pluginAPI.unregistKey(tvKey.KEY_POWER);Main.SEFPluginAppcommonmonPluginVer.SendKeyToTVViewer(tvKey.KEY_POWER); Debug.Log(\"[Main] Power off done...\");", 1000);

                            }
                            break;
                        case webapis._pluginDef.PL_TASKMANAGER_DTV_APP_EPG:
                            Main.bEPG = true;
                        case webapis._pluginDef.PL_TASKMANAGER_DTV_APP_FAVCHLIST:
                        case webapis._pluginDef.PL_TASKMANAGER_DTV_APP_FULLBROWSER:
                        case 134://window.PL_TASKMANAGER_DTV_APP_HOMEPANEL:
                        case webapis._pluginDef.PL_TASKMANAGER_DTV_APP_CM:
                            Debug.Log("[Main] Change app")
                            Main.selectbgApp = Aapp;
                            Main.itv = true;
                            Main.ResetChannel();
                            //curWidget.pause();
                            break;
                        case webapis._pluginDef.PL_TASKMANAGER_DTV_APP_GLOBAL_FUNCTION:
                            Main.itv = true;
                            break;
                        case webapis._pluginDef.PL_TASKMANAGER_DTV_APP_TVVIEWER:
                            //Main.itv = true;
                            break;
                        case webapis._pluginDef.PL_TASKMANAGER_DTV_APP_PVR:
                            Main.bPVR = true;
                            break;
                        default:
                            //Debug.Log("[Main] default activate comunication");
                            //curWidget.show();
                            //curWidget.setFocus();
                            break;
                    }
                    break;
                }
            case "00000002":
                {
                    Debug.Log("[Main] The App is initialized");
                    break;
                }
            case "00000010":
                {
                    //Debug.Log("[Main] Notify banner hide");
                    break;
                }
            case "00000015":
                {
                    Debug.Log("[Main] The power on from standby mode");
                    break;
                }
            case "00000016":
                {
                    Debug.Log("[Main] The power on by wakeup upgrade");
                    break;
                }
            case "00000017":
                {
                    Debug.Log("[Main] The power on by wakeup standby");
                    break;
                }
            case "00000018":
                {
                    Debug.Log("[Main] Notify Power off");
                    break;
                }
            case "00000020":
                {
                    Debug.Log("[Main] The child lock state change");
                    break;
                }
            case "00000021":
                {
                    Debug.Log("[Main] The rating block state change");
                    break;
                }
            case "00000022":
                {
                    Debug.Log("[Main] The audio language change");
                    break;
                }
            case "00000023":
                {
                    ///dtv/LogRCkey.log 
                    try
                    {
                        if (Main.pause && Settings.autoPauseMode) {
                            sleep(1000);
                            var keyData = null;
                            var keyNo = null;
                            var path = curWidget.id + '/eventRCKey.txt';
                            var fileSystemObj = new FileSystem();
                            var fileObj = fileSystemObj.openCommonFile(path, 'r');
                            if (fileObj != null) {
                                var kd = fileObj.readLine().split(" ");
                                keyData = parseInt(kd[0]);
                                keyNo = parseInt(kd[1]);
                                //Debug.Log("[Main] The key input event no: " + keyNo);
                            }
                            fileSystemObj.closeCommonFile(fileObj);
                            
                            if (keyData != null && keyNo > 9) {
                                Debug.Log("[Main] The key no.: " + keyData + " input event, count: " + keyNo);
                                switch (keyData) {
                                    case tvKey.KEY_YELLOW:
                                    case tvKey.KEY_RED:
                                    case tvKey.KEY_BLUE:
                                    case tvKey.KEY_GREEN:
                                        Debug.Log("[Main] Show OnlineTV");
                                        Main.pause = false;
                                        Player.httpGetNoSync(Main.widgetURL + "TVComm");
                                        //var fileOld = fileSystemObj.openCommonFile(path, 'w');
                                        //if (fileOld != null) {
                                        //    fileOld.writeAll(keyData + " 0");
                                        //    fileSystemObj.closeCommonFile(fileOld);
                                        //}
                                        //sleep(500);
                                        //Main.SEFPluginAppcommonmonPluginVer.SendKeyToTVViewer(keyNo);
                                        break;
                                }
                                switch (keyData) {
                                    case tvKey.KEY_YELLOW:
                                        Debug.Log("[Main] Loading ShowGUIDEonTV window on pause mode");
                                        Main.ShowGUIDEonTV();
                                        break;
                                    case tvKey.KEY_RED:
                                        Debug.Log("[Main] Loading Debug window on pause mode");
                                        Display.TogWidgetMenu();
                                        Display.TogDebug();
                                        break;
                                    case tvKey.KEY_BLUE:
                                        Debug.Log("[Main] Loading ShowNowOnTV window on pause mode");
                                        Main.ShowNowOnTV();
                                        break;
                                    case tvKey.KEY_GREEN:
                                        Debug.Log("[Main] Loading ShowShortInfo window on pause mode");
                                        Main.ShowShortInfo();
                                        break;
                                }
                            }
                        }
                    }
                    catch (e) {
                        Debug.Log("[Main] The key input event error: " + e);
                    }
                    break;
                }
            case "00000040":
                {
                    Debug.Log("[Main] The WakeUp UpGrade Start");
                    break;
                }
            case "00000042":
                {
                    Debug.Log("[Main] The Remind Record");
                    break;
                }
            case "00000041":
                {
                    Util.WriteChannelJSON(Main.ChannelsJSON, 'channels');
                    Main.bWriteChannelsJSON = true;
                    Util.WriteChannelJSON(Main.ChannelsStreamInfos, 'streamInfos');
                    Main.bWriteChannelsStreamInfos = true;
                    //var CH = Settings.RestartTVChannel;
                    //if (CH != -1) {
                    //    var minor = 65534;
                    //    Main.windowPlugin.SetChannel(parseInt(CH), parseInt(minor));
                    //    Debug.Log("[Main] The Power Off Start");
                    //    break;
                    //}
                }
            default:
                Debug.Log("[Main] Message OnEvent: " + data1);
                break;
        }
        //Main.CheckingRegKey(tvKey.KEY_SUBT);
        //scroll();
        //Debug.Log(event);
        //Debug.Log(data1);
        //Debug.Log(data2);
    }
    catch (exco) {
        Debug.Log("[Main] OnEvent error: " + exco.name + ", " + exco.message);
    }
};
Main.CheckChannelChange = function () {
    try {
        Main.selectMajor = Main.windowPlugin.GetCurrentChannel_Major();
        Main.selectMinor = Main.windowPlugin.GetCurrentChannel_Minor();
        //Debug.Log("[Main] Major:" +Main.selectMajor);
        //Debug.Log("[Main] Minor:" +Main.selectMinor);
        Main.selectbgApp = Main.SEFPluginTaskManager.Execute('GetActiveApplication');
        //var aa = Main.SEFPluginTaskManager.Execute('GetBgApplication');
        //Debug.Log("[Main] App BG no: " + aa);
        Main.selectSource = Main.windowPlugin.GetSource();
        //Main.selectMajor = 201;
        //Main.selectMinor = 65534;

        //Debug.Log("[Main] APP: " + Main.selectbgApp + " :Size: " + windowplugin.GetScreenRect());
       
        if ((Main.selectMajor != Main.selectMajorTemp || Main.selectMinor != Main.selectMinorTemp) && (Main.selectSource<16 || Main.selectSource==43))// || Main.CheckActiveApp(Main.selectbgAppTemp,Main.selectbgApp))
        {
           
            Debug.Log("[Main] Message TV event: " + Util.CreateMsg(Define.TvEEvent, ["113"]) + " -> (" + Main.selectMajorTemp + "->" + Main.selectMajor + "). Source no.: " + Main.selectSource);
            //Player.stopVideo();
            //Player.deinit();
            ////Player = null;
            //delete Player;
            //delete Main;
            if (Main.OTV != null) {
                Main.OTV.deinit();
                Main.OTV = null;
                delete Main.OTV;
            }
            Main.selectMajorTemp = Main.selectMajor;
            Main.selectMinorTemp = Main.selectMinor;
            Main.selectbgAppTemp = Main.selectbgApp;
            Main.selectSourceTemp = Main.selectSource;
            //Main.isBusy = true;

            //Main.isBusy = false;
            return true;
        }
    }
    catch (e) {
        Debug.Log("[Main] Main error: " + e);
    }
    return false;
};
Main.ChangeChannel = function (tout)
{
    if (Main.CheckChannelChange()) {
        
        
        //setTimeout("delete Player;", 0);
        //setTimeout("delete Main;", 0);
        Main.keyUnreg();
        //scroll();
        if (tout == null)
            tout = 0;
        if (tout > 0) {
            clearTimeout(Main.runCHAN);
            Main.runCHAN = setTimeout("scroll(Main.selectMinorTemp,Main.selectMajorTemp);", tout);
        }
        else {
            if (!Main.bPVR) {
                scroll(Main.selectMinorTemp, Main.selectMajorTemp);
            }
            else {
                if (Main.selectMajorTemp != -1) {
                    Main.bPVR = false;
                    Debug.Log("[Main] PVR: " + Main.bPVR);
                }
                else {
                    Debug.Log("[Main] PVR: " + Main.bPVR);
                }

            }
            
        }
      
    }
    else {
        //Debug.Log("[Main] No change channel");
    }
    //Debug.Log("[Main] Try a channel change");
};
function OnEvent2(event, param1, param2) {

    try
    {
        Main.ChangeChannel(0);
        var p = Util.StrParam2Num(param2);
        var msg = "[Main] Message TV event: " + Util.CreateMsg(Define.TvEEvent,[param1]) + " -> (";
        switch (parseInt(param1)) {
            case 101: //EVENT_NO_SIGNAL
                msg = msg + param2;//Util.CreateMsg(Define.SOURCE, p);
                if (Main.checkNoSignal) {
                    Main.checkNoSignal = false;
                    Main.ChangeChannel(0);
                }
                else if (Main.OnlineTVTurn) {
                    Main.TVMWPlugin.SetMediaSource();
                }
                break;
            case 113: //EVENT_CHANNEL_CHANGED
                //msg = msg + Util.CreateMsg(Define.SOURCE, p);
                break;
            case 114: //EVENT_SOURCE_CHANGED
                msg = msg + Util.CreateMsg(Define.SOURCE, p);
                if (Main.windowPlugin.GetSource() != 43) {
                    if (Main.OTV != null) {
                        Main.OTV.deinit();
                        Main.OTV = null;
                        delete Main.OTV;
                    }
                }
                break;
            case 115: //EVENT_CHANGE_TV_MODE
                msg = msg + Util.CreateMsg(Define.ChannelTvMode, p);
            
                break;
            case 117: //EVENT_RESOLUTION_CHANGED
                
                
                msg = msg + Util.CreateMsg(Define.ScreenEResolution, [p[0]]) + ", " + Util.CreateMsg(Define.EWindow, [p[1]]);
                if (Main.OTV != null) {
                    Main.OTV.Player.GetVideoSize();
                    switch (Define.ScreenEResolution[p[0]]) {
                        case "PL_WINDOW_RESOLUTION_1080I":
                            Main.OTV.Player.resolution = "1080i";
                            break;
                        case "PL_WINDOW_RESOLUTION_1080P":
                            Main.OTV.Player.resolution = "1080p";
                            break;
                        case "PL_WINDOW_RESOLUTION_720P":
                            Main.OTV.Player.resolution = "720p";
                            break;
                        case "PL_WINDOW_RESOLUTION_480P":
                            Main.OTV.Player.resolution = "480p";
                            break;
                        case "PL_WINDOW_RESOLUTION_480I":
                            Main.OTV.Player.resolution = "480i";
                            break;
                        case "PL_WINDOW_RESOLUTION_576P":
                            Main.OTV.Player.resolution = "576p";
                            break;
                        case "PL_WINDOW_RESOLUTION_576I":
                            Main.OTV.Player.resolution = "576i";
                            break;
                        case "PL_WINDOW_RESOLUTION_PAL":
                            if (Main.OTV.Player.h == 576)
                                Main.OTV.Player.resolution = "576i";
                            break;
                        default:
                            if (Main.OTV.Player.w>0 && Main.OTV.Player.h>0)
                                Main.OTV.Player.resolution = Main.OTV.Player.w + " x " + Main.OTV.Player.h;
                            break;
                    }
                }
                //if (p[1] == 1) {
                //    Debug.Log("[Main] PIP");
               
                //}
                if (PLR_TRUE == Main.TVPlugin.GetPIP()) {
                    Debug.Log("[Main] PIP get true");
                    var ret = Main.SEFPluginWindow.Execute("SetWindow", p[1]);
                    Debug.Log("[Main] SetWindow: " + Util.CreateMsg(Define.EWindow, [p[1]])+ ": ret = " + ret);
                }
                else {
                    Debug.Log("[Main] PIP get false");
                }
                break;
            case 118: //EVENT_RESOLUTION_DETECTED
                msg = msg + Util.CreateMsg(Define.ScreenEResolution, [p[0]]) + ", " + Util.CreateMsg(Define.EWindow, [p[1]]);
                break;
            case 126: //EVENT_SATCR
                // msg = msg + Util.CreateMsg(Define.SOURCE, p);
                msg = "";
                break;
            case 211: //EVENT_CHANGE_POWER_STATE
                msg = msg + Util.CreateMsg(Define.TVEPowerType, p[0]) + ", " + p[1];
                if (p[0] == 6) {
                    OnlineChannel.deinit();
                }
                if (p[0] == 7) {
                    scroll(Main.selectMinorTemp, Main.selectMajorTemp);
                }
                break;
            case 404: //EVENT_EXTSOURCE_SIGNAL_OK
                msg = msg + Util.CreateMsg(Define.SOURCE, p);
                break;
            default:
                //msg += param2;
                msg = "";
                break;
        }
        if (msg != "") {
            msg += ")";
            Debug.Log(msg);
        }
        //Main.CheckingRegKey(tvKey.KEY_SUBT);
    }
    catch (exco2) {
        Debug.Log("[Main] scroll: " + exco2.name + ", " + exco2.message);
    }
};

Main.SetKey = function(id,source,timeout)
{
    if (source == null)
        source = 3;
    if (timeout == null)
        timeout = 1500;
	Main.keyUnreg();
	Main.windowPlugin.SetSource(0);
	Main.windowPlugin.SetSource(source);
	Main.WaitToPress = true;
	if(Main.tWaitToPress!=null)
	    clearTimeout(Main.tWaitToPress);
	Main.tWaitToPress = setTimeout("Main.WaitToPress=false;", 2000);
	//var appCom = document.getElementById("appCom");
	//if (timeout > 0) {
	    //clearTimeout(Main.tChCH);
	    //Main.tChCH = setTimeout("Main.ResetChannel(); Main.ChangeChannel(100); Main.windowPlugin.SetSource(10);", timeout);
	    Main.SEFPluginAppcommonmonPluginVer.SendKeyToTVViewer(id);
	//}
	//else {

    //Main.windowPlugin.SetSource(0);
	    //Main.tChCH = setTimeout("Main.ChangeChannel(0);", 0);
	//}
	//appCom.SendKeyToTVViewer(id);
		
	//if (timeout <= 0) {

	  //Main.tChCH = setTimeout("Main.ChangeChannel(100); Main.windowPlugin.SetSource(10);", timeout);
    
    //Main.windowPlugin.SetSource(3);
    
	//}
	//Main.keyReg();
	
};
Main.RunWidget = function(id,name)
{

    if (Display.widgetMenu) {
        Display.TogWidgetMenu();
        Debug.Log("[Main] Run widget. Name: " + name + ", ID:" + id);
        Player.httpGetNoSync(Main.widgetURL + id);
        Display.TogDebug();
    }
};
Main.keyUp = function () {
    var keyCode = event.keyCode;
    
    switch (keyCode) {
        case tvKey.KEY_PANEL_POWER:
        case tvKey.KEY_POWER:

            Debug.Log("[Main] Key Power UP = " + keyCode);
            if (Main.isSoftPowerOff && this.powerTimer > 1000) {
                Debug.Log("[Main] Power off go...");
                pluginAPI.unregistKey(tvKey.KEY_PANEL_POWER);
                pluginAPI.unregistKey(tvKey.KEY_POWER);
                pluginAPI.unregistKey(tvKey.KEY_SOURCE);
                //Main.keyUnreg();
                setTimeout("Main.windowPlugin.SetSource(0);", 1)
                //setTimeout("Main.windowPlugin.SetChannel(parseInt(1), parseInt(65534));", 1);
                setTimeout("Main.bPowerOff=true; Debug.Log(\"[Main] Source key down...\"); Main.SEFPluginAppcommonmonPluginVer.SendKeyToTVViewer(tvKey.KEY_SOURCE);", 100);
                
                //Util.sleep(3100);
               
            }
            else {
                Debug.Log("[Main] Power standby go...");
                pluginAPI.unregistKey(tvKey.KEY_PANEL_POWER);
                pluginAPI.unregistKey(tvKey.KEY_POWER);
                //Main.keyUnreg();
                Debug.Log("[Main] Power standby key unreg");
                Main.SEFPluginAppcommonmonPluginVer.SendKeyToTVViewer(tvKey.KEY_POWER);
                Debug.Log("[Main] Power standby done...");
                

            }
            this.powerTimer = null;
            break;
    }
};
Main.keyDown = function () {
    document.getElementById("mainInfoMM").style.display = "none";
    clearTimeout(Display.tMM);
    // Key handler 
    var keyCode = event.keyCode;
    //Main.Save(event, "event.keyDown");

    //Display.status("Key Pressed = " + keyCode);
    //widgetAPI.putInnerHTML(document.getElementById("mainSubtitleInfo"), "KEY: " + keyCode);
    //document.getElementById("mainSubtitleInfo").style.display = "block";


    switch (keyCode) {
        case tvKey.KEY_INFO:
            Debug.Log("[Main] Press: KEY_INFO");
            // 
            //Main.ResetChannel();
            Main.SetKey(tvKey.KEY_INFO, 3, 500);
            //Main.keyUnreg();
            //windowplugin.SetSource(0);
            //windowplugin.SetSource(10);

            //appCom.SendKeyToTVViewer(tvKey.KEY_INFO);
            ////clearTimeout(Main.tChCH);

            //Main.keyReg();
            //Main.ResetChannel();
            //widgetAPI.blockNavigation(event);
           // Main.tChCH = setTimeout("Main.ResetChannel();", 1000);
            //windowplugin.SetSource(10);

            break;
            //case tvKey.KEY_SOURCE:

            //widgetAPI.blockNavigation(event);

            //    break;
        case tvKey.KEY_PANEL_POWER:
        case tvKey.KEY_POWER:
            Debug.Log("[Main] Press: KEY_POWER");
            this.powerTimer = 0;
            widgetAPI.blockNavigation(event);
            //Main.ResetChannel();
            //Main.ChangeChannel();
            //Debug.Log("[Main] Key Power Down");
            //pluginAPI.unregistKey(tvKey.KEY_PANEL_POWER);
            //pluginAPI.unregistKey(tvKey.KEY_POWER);
            ////var appCom = document.getElementById("appCom");
            //Main.SEFPluginAppcommonmonPluginVer.SendKeyToTVViewer(tvKey.KEY_POWER);
            break;
        case tvKey.KEY_0:
            Main.SetKey(tvKey.KEY_0);
            Debug.Log("[Main] Press: KEY_0");
            break;
        case tvKey.KEY_1:
            Main.SetKey(tvKey.KEY_1);
            Debug.Log("[Main] Press: KEY_1");
            break;
        case tvKey.KEY_2:
            Main.SetKey(tvKey.KEY_2);
            Debug.Log("[Main] Press: KEY_2");
            break;
        case tvKey.KEY_3:
            Main.SetKey(tvKey.KEY_3);
            Debug.Log("[Main] Press: KEY_3");
            break;
        case tvKey.KEY_4:
            Main.SetKey(tvKey.KEY_4);
            Debug.Log("[Main] Press: KEY_4");
            break;
        case tvKey.KEY_5:
            Main.SetKey(tvKey.KEY_5);
            Debug.Log("[Main] Press: KEY_5");
            break;
        case tvKey.KEY_6:
            Main.SetKey(tvKey.KEY_6);
            Debug.Log("[Main] Press: KEY_6");
            break;
        case tvKey.KEY_7:
            Main.SetKey(tvKey.KEY_7);
            Debug.Log("[Main] Press: KEY_7");
            break;
        case tvKey.KEY_8:
            Main.SetKey(tvKey.KEY_8);
            Debug.Log("[Main] Press: KEY_8");
            break;
        case tvKey.KEY_9:
            Debug.Log("[Main] Press: KEY_9");
            Main.SetKey(tvKey.KEY_9);
            break;
        case tvKey.KEY_PRECH:
            Debug.Log("[Main] Press: KEY_PRECH");
            Main.SetKey(tvKey.KEY_PRECH, 10, -1);
            break;
        case tvKey.KEY_PLAY:
            Debug.Log("[Main] Press: KEY_PLAY");
            var host = "";
            var myurl = "";
            if (Main.bREC) {
                Main.bREC = false;

                inParams = '0=1&1=StopREC&2=' + "" + '&3=' + host + '&4=3';

                Debug.Log("[REC] Request: " + inParams);
                try {
                    myurl = Util.httpGetNoSync(Player.listenCHurl + inParams);
                    Display.SetDispObject("mainInfoREC", "","FF0000");
                    clearInterval(Main.tcurREC);
                    Main.curRECTitle = "";
                    Main.curRECTick = 0;
                    myurl = myurl.substring(7, myurl.length);
                }
                catch (e) {
                    Debug.Log("[REC] Error REC!");
                }
            }
            else {

                try {
                    if (Main.curChannelName != "" && Player.Type == "HTTP" && Player.url.substring(0, Player.rtmpHost.length) != Player.rtmpHost && Player.url.substring(0, 3) != "mms") {
                        var cc = webapis.tv.channel.getCurrentProgram();
                        var title = "";
                        var date = new Date();
                        // var time = date.toDateString() + "-" + ("0" + date.getHours()).substr(-2, 2) + ":" + ("0" + date.getMinutes()).substr(-2, 2) + ":" + ("0" + date.getSeconds()).substr(-2, 2);
                        var time = date.toDateString() + "-" + Util.ValTo00(date.getHours()) + ":" + Util.ValTo00(date.getMinutes()) + ":" + Util.ValTo00(date.getSeconds());
                        if (cc.title != -1) {
                            title = cc.title;
                        }
                        var host = Settings.RecDir + "/" + Main.curChannelName + "_" + time + "_" + title + ".ts";
                        //var host = Settings.RecDir + "/" + "ts.ts";
                        inParams = '0=1&1=StartREC&2=' + Player.url + '&3=' + host.replace(/ /g, "_").replace("+", "") + '&4=3';


                        Debug.Log("[REC] Request: " + inParams);
                        myurl = Util.httpGetNoSync(Player.listenCHurl + inParams);
                        Main.curRECTitle = "&#x25cf; " + Main.curChannelName + " - " + title + ": ";
                        Debug.Log("[REC] curRECTitle: " + Main.curRECTitle);
                        Main.tcurREC = setInterval("Display.SetDispObject(\"mainInfoREC\", Main.curRECTitle + Util.SecToStr(++Main.curRECTick),\"FF0000\");", 1000);

                        Main.bREC = true;
                        myurl = myurl.substring(7, myurl.length);


                    }
                }
                catch (e) {
                    Debug.Log("[REC] Error REC!");
                }
            }
            Debug.Log("[REC] Rec status: " + myurl);
            break;
        case tvKey.KEY_PAUSE:
            Debug.Log("[Main] Press: KEY_PAUSE");
            if (Main.OnlineTVTurn) {
                OnlineChannel.Player.pauseVideo();
            }
            else {
                var c1 = webapis.pvr.initialize();
                Debug.Log("[Main] :1::" + c1);
                c1 = webapis.pvr.timeshiftPauseStart();
                Debug.Log("[Main] :2::" + c1);
            }
            break;
        case tvKey.KEY_ENTER:
            Debug.Log("[Main] Press: KEY_ENTER");
            //Main.TVMWPlugin.UnregForBGApp();
            //Display.checkMultiAppQueueAfterShow("OnlineTV");
            
            if (Main.showS) {

                if (Main2.categoryFlag == true) {
                    //Main2.upArticle();
                    Main2.nextPage();
                    break;
                }
                else {
                    Player.stopVideo();
                    var chan = Main2.arrTVID[Main2.categoryIdxC][Main2.articleIdx];
                    var so = chan.substring(0, 1);
                    chan = chan.substring(1, chan.length);
                    var CH;
                    //Debug.Log(Main.dIDs);
                    Debug.Log("[Main] Enter chan: " + chan);
                    Debug.Log("[Main] Enter so: " + so);
                    var minor;
                    //var plugin = document.getElementById("windowplugin");
                    if (so == "d") {
                        //windowplugin.SetSource(0);
                        //windowplugin.SetSource(3);
                        CH = Main.dIDs[chan];
                        minor = 65534;
                    }
                    else {
                        //windowplugin.SetSource(0);
                        //windowplugin.SetSource(2);
                        minor = 1;
                        CH = Main.aIDs[chan];
                    }
                    Main.ShowNowOnTV();
                    //Main2.blurTitle(Main2.titleIdx);
                    Main.windowPlugin.SetChannel(parseInt(chan), parseInt(minor));

                    Debug.Log("[Main] Enter channel: " + Data.videoNames[Data.tvIdxURLs[CH]]);
                    break;
                }
            }
            if(Main.isInfo)
                break;
            //else {
            Player.Reload();
                break;
            //}
            Main.RunWidget("ForkPlayer", "ForkPlayer");
            break;
        case tvKey.KEY_UP:
            Debug.Log("[Main] Press: KEY_UP");
            Main.RunWidget("111299001912", "YouTube");
            if (Main.showS) {
                if (Main2.categoryFlag == false) {
                    Main2.upArticle();
                }
                else {   // If the focus move to category.   
                    Main2.upArticleC();
                }
            }

            break;

        case tvKey.KEY_DOWN:
            Debug.Log("[Main] Press: KEY_DOWN");
            if (Display.widgetMenu) {
                Debug.Log("[Main] GO to Widgets List");
                //Main.ReloadFunction("Main3.js","https://www.dropbox.com/s/68tyqkscb4fxh4f/Main3.js?dl=1");
                Main3.showMainWidget();
            }
            //Main.RunWidget("111299001322", "Skype");
            if (Main.showS) {
                if (Main2.categoryFlag == false) {
                    Main2.downArticle();
                }
                else {   // If the focus move to category. 
                    Main2.downArticleC();
                }
                
            }

            break;
        case tvKey.KEY_LEFT:
           
            Debug.Log("[Main] Press: KEY_LEFT");
            //try
            //{
            //for (var iii = 1; iii < 2; iii++)
            //{
            //widgetAPI.setIPTVSource();
            //var vv = curWidget.getPreference();
            //pluginAPI.setOnWatchDog();
            //pluginAPI.setCaptionState(1);
            //Debug.Log("[Main] v_v: "+ vv);
            //}
            //}
            //catch (e) {
            //Debug.Log("[Main] vvv e: " + e);
            //}
            try {
                if (Display.widgetMenu) {
                    widgetAPI.runWebBrowser("http://new.meteo.pl/um/php/meteorogram_id_um.php?ntype=0u&id=1595");
                }
                //var ret = Main.SEFPluginTV.Execute("GetProgramList");
                //Debug.Log("GetProgramList: " + ret);
                //var TVMW = document.getElementById("pluginObjectTVMW");
                //for (var i = 0; i <= 115; i++) {
                //    var r = TVMW.GetProfile(i);
                //    //var NNaviPlugin = document.getElementById("pluginObjectNNavi");
                //    //NNaviPlugin.ActivateWithData(Main.idt++,"");
                //    Debug.Log("[Main] IDT: " + i +", " + r);
                //}
                //widgetAPI.runWebBrowser("http://wp.pl");
                //var pURL = "http://forum.samygo.tv/viewforum.php?f=63";
                //var type = Common.API.RUN_SHOP_DEMO;
                //var data = curWidget.id;// + "|?|" + pURL;

                //if (pKeyWord) {
                //    data += "|?|" + pKeyWord;
                //}Main.infocurrNum

                //var widgetEvent = new WidgetEvent(type, data);	// async call
                //sendWidgetEvent("", widgetEvent, false);
                //if (Main.isPIP) {
                //    document.getElementById("pip").style.display = "none";
                //    Main.isPIP = false;
                //    imeBox.onClose();
                //    Debug.Log("[Main] KEY_LEFT Off OK");
                //    PIP.stop();
                //}
                //else {
                //    document.getElementById("pip").style.display = "block";
                //    PIP.init();
                //    PIP.play();

                //    Main.isPIP = true;

                //    imeBox.onShow();
                //    Debug.Log("[Main] KEY_LEFT On OK");

                //}
            }
            catch (e) {
                Debug.Log("[Main] KEY_LEFT error: " + e);
            }
            //Main.RunWidget("20131000001", "WebBrowser");
            //Debug.Log("[Main] KEY_LEFT");
           // if (Main.isInfo == 1) {
               // if (Main.infocurrNum > 0)
                    //Main.infocurrNum--;
                //Main.SetInfo(Main.currentTV, Main.infocurrNum);
            //}
            if (Main.showGuide == 1 ||  Main.isInfo == 1) {
                if (Main.infocurrNum > 0)
                    Main.infocurrNum--;
            }
            if (Main.showGuide == 1)
                Main.DispGuide(Main.currentTV);

            if (Main.showGuide == 0 && Main.isInfo == 1) {
                Main.SetInfo(Main.currentTV, Main.infocurrNum);
                Main.retsrtShortInfoTimer();
            }

            if (Main.showS) {
                Debug.Log("[Main] shows_L");
                if (Main2.categoryFlag == false) {
                    Main2.categoryFlag = true;
                    Main2.focusCategory(Main2.categoryIdx);
                    Main2.blurTitle(Main2.titleIdx);
                }
            }
            break;
        case tvKey.KEY_RIGHT:
            Debug.Log("[Main] Press: KEY_RIGHT");
            Main.idt--;
            Main.RunWidget("111299001898", "VoD Onet");
            Debug.Log("[Main] KEY_RIGHT");

            if (Main.showGuide == 1 || Main.isInfo == 1) {
                if (Main.infocurrNum < Main.mxInfoNum)
                    Main.infocurrNum++;
            }
            if (Main.showGuide == 1)
                Main.DispGuide(Main.currentTV);

            if (Main.showGuide == 0 && Main.isInfo == 1) {
                Main.SetInfo(Main.currentTV, Main.infocurrNum);
                Main.retsrtShortInfoTimer();
            }
            if (Main.showS) {
                Debug.Log("[Main] shows_R");
                if (Main2.categoryFlag == true) {
                    Main2.categoryFlag = false;
                    Main2.selectCategory(Main2.categoryIdx);
                    Main2.highlightTitle(Main2.titleIdx);
                }
            }
            break;
        case tvKey.KEY_RED:
            Debug.Log("[Main] Press: KEY_RED");


            //curWidget.hide();
            //Main.RunWidget("ID", "NAME");
            Display.TogWidgetMenu();
            Display.TogDebug();
            break;
        case 652: //
            Debug.Log("[Main] Press: KEY_AD/SUBT.");
            widgetAPI.blockNavigation(event);
            OnlineChannel.Player.changeLang();
            //Display.status("subtitles: " + OnlineChannel.Player.countSubtitle);
            break;
        case tvKey.KEY_YELLOW:
            Debug.Log("[Main] Press: KEY_YELLOW");
            //if (Display.widgetMenu) {
            //    //http://188.165.200.96/media/15111513_zachodniopomorskie_jb_01.avi
            //    var ddNow = new Date();

            //    var mth = ddNow.getMonth() + 1;
            //    var url = "http://188.165.200.96/media/" + ddNow.getDate() + mth + ddNow.getYear() + "13_zachodniopomorskie_jb_01.avi";

            //    Debug.Log("[Main] Pogoda.TV: " + url);
            //    if (Main.OTV != null) {
            //        Main.OTV.deinit();
            //        Main.OTV = undefined;
            //        delete Main.OTV;
            //    }
            //    Main.OTV = OnlineChannel;
            //    Main.OTV.init(url, "HTTP");
            //    return;
            Main.RunWidget("111299001095", "PogodaTV");
            //}
            Main.ShowGUIDEonTV();

            break;
        case tvKey.KEY_EXIT:
            Debug.Log("[Main] Press: KEY_EXIT");
            Main.exitState++;
            if (Main.exitState > 0) {
                //event.preventDefault();
                Debug.Log("[Main] OnlineTV exit by user...");
                //Main.onUnload();
                widgetAPI.sendExitEvent();
                //widgetAPI.sendReturnEvent();
            }
            else {
                widgetAPI.blockNavigation(event);
            }
            break;
        case tvKey.KEY_RETURN:
            Debug.Log("[Main] Press: KEY_RETURN");
            Main.returnState++;
            if (Main.returnState > 0) {
                //event.preventDefault();
                Debug.Log("[Main] OnlineTV pause by user...");
                widgetAPI.sendReturnEvent();
            }
            else {
                widgetAPI.blockNavigation(event);
            }
            break;
        case tvKey.KEY_GREEN://KEY_EXIT: 
            Debug.Log("[Main] Press: KEY_GREEN");
            Main.RunWidget("11101338901", "ipla");

            Main.ShowShortInfo();



            break;
        case tvKey.KEY_BLUE:
            Debug.Log("[Main] Press: KEY_BLUE");
            Main.RunWidget("111199000440", "TVN Player");
            Main.ShowNowOnTV();
            break;
        case tvKey.KEY_CH_PANNEL_UP:
        case tvKey.KEY_CH_UP:
            Debug.Log("[Main] Press: KEY_CH_UP");
            if (Main.showS) {

                //if (Main2.categoryFlag == true) {
                    Main2.previousPage();
                    //break;
                //}
            }
            break;
        case tvKey.KEY_CH_PANNEL_DOWN:
        case tvKey.KEY_CH_DOWN://KEY_EXIT:
            Debug.Log("[Main] Press: KEY_CH_DOWN");
            if (Main.showS) {

                //if (Main2.categoryFlag == true) {
                    Main2.nextPage();
                    //break;
               // }
            }
            break;
        case tvKey.KEY_FF:
            Debug.Log("[Main] Press: KEY_FF");
            if (Display.widgetMenu) {
                document.location = "http://192.168.0.106:1080/phpsysinfo/runWidget/reloadOnlineTV.php";
                //widgetAPI.runWebBrowser("http://192.168.0.106:1080/phpsysinfo/runWidget/reloadOnlineTV.php");
            }
            if (Main.OTV != null) {
                if (Main.OTV.Player != null) {
                    Main.OTV.Player.skipForwardVideo();
                }
            }
            break;
        case tvKey.KEY_RW:
            Debug.Log("[Main] Press: KEY_RW");
            if (Main.OTV != null) {
                if (Main.OTV.Player != null) {
                    Main.OTV.Player.skipBackwardVideo();
                }
            }
            break;
        default:
            Debug.Log("[Main] Key Pressed: " + keyCode);
            break;
    }
};
Main.ShowShortInfo = function () {
    try {
        clearTimeout(Display.tMM);
        Display.hideB();
        Display.hideMM();
        if (Main.isInfo) {
            Main.hide();
            main.infocurrNum = 0;
            Debug.Log("[Main] Hide EPG");
            if (!Main.OnlineTVTurn && !Main.pause) {
                Main.pause = true;
                if (Settings.autoPauseMode)
                    widgetAPI.sendReturnForceEvent();
            }
        }
        else {
            // Player.GetVideoSize();
            Main.SetInfo(Main.currentTV, Main.infocurrNum);
            Main.show();
            Debug.Log("[Main] Show EPG");
        }
    }
    catch (e) {
        Debug.Log("[Main] SetInfo error: " + e.name + ", " + e.message);
    }
}
Main.ShowGUIDEonTV = function () {
    clearTimeout(Display.tMM);
    Display.hideMM();
    Display.hideB();
    //Player.GetVideoSize();
    Main.toggleDispInfoMode();
    if (Main.showS) {
        Display.hideS();
        Main.showST = 1;
        Main.showS = 0;
        
    }
    else if (Main.showST) {
        Display.showS();
        Main.showST = 0;
        Main.showS = 1;
    }
    
    Main.DispGuide(Main.currentTV);
}
Main.ResetChannel = function()
{
    if (Main.OnlineTVTurn) {
        Main.selectMajorTemp = -1;
        Main.selectMinorTemp = -1;
        Main.selectbgAppTemp = -1;
        Main.selectSourceTemp = -1;
    }
    else {
        //if (curWidget.isShow || curWidget.isFocus()) {
        //    curWidget.hide();
        //}
    }

};
Main.hide = function()
{
	clearTimeout(Main.tDesc);
	Display.hideMainInfo();
	Main.isInfo = 0;
};

Main.show = function()
{
	Display.showMainInfo();
	Main.isInfo = 1;
	if (!Main.showGuide)
	    Main.retsrtShortInfoTimer();
	    //Main.tDesc = setTimeout("Main.hide();if (!Main.OnlineTVTurn && !Main.pause) {Main.pause = true; if(Settings.autoPauseMode) {widgetAPI.sendReturnForceEvent();}}", Main.infoTic);

};
Main.retsrtShortInfoTimer = function () {
    clearTimeout(Main.tDesc);
    Main.tDesc = setTimeout("Main.hide();if (!Main.OnlineTVTurn && !Main.pause) {Main.pause = true; if(Settings.autoPauseMode) {widgetAPI.sendReturnForceEvent();}}", Main.infoTic);
}
Main.UnsubscribeEvent = function () {
    for (var i = 0; i <= 45; i++)
        Main.SEFPluginAppcommon.Execute('UnsubscribeEvent', i);
};
Main.UnsetEvent = function () {
    for (var i = 100; i < 5975; i++) {//Main.SEFPluginTVevents.length; i++) {
        if (i == 505)
            continue;
        var a = Main.SEFPluginTV.Execute('UnsetEvent', i);//Main.SEFPluginTVevents[i]);
    }
};
Main.onUnload = function()
{
   
    Debug.Log("[Main] Main.onUnload go...");
    //
    if(!Main.bWriteChannelsJSON)
        Util.WriteChannelJSON(Main.ChannelsJSON, 'channels');
    if (!Main.bWriteChannelsStreamInfos)
        Util.WriteChannelJSON(Main.ChannelsStreamInfos, 'streamInfos');

    //
    Main.UnsubscribeEvent();
    Main.UnsetEvent();
    //for (var i = 0; i < Main.SEFPluginTVevents.length; i++) {
    //    var a = Main.SEFPluginTV.Execute('UnsetEvent', Main.SEFPluginTVevents[i]);
    //}
    //windowplugin.SetChannel(parseInt(16), parseInt(65534));
    if (OnlineChannel.Player!=null)
        OnlineChannel.Player.deinit();
    //Player2.deinit();
    Main.SEFPluginTVMW.Close();
    Main.SEFPluginTV.Close();
    Main.SEFPluginNetwork.Close();
    Main.SEFPluginWindow.Close();
    Main.SEFPluginTaskManager.Close();
    Debug.Log("[Main] Main.onUnload ...done");
    widgetAPI.sendExitEvent();
    //widgetAPI.sendReturnDestroyEvent();
};
function DateFmt(fstr) {
	this.formatString = fstr;

	var mthNames = ["01","02","03","04","05","06","07","08","09","10","11","12"];
	//var dayNames = ["Niedz.","Pn.","Wt.","Śr.","Czw.","Pt.","Sob."];
	var zeroPad = function(number) {
		return ("0"+number).substr(-2,2);
	};

	var dateMarkers = {
			d:['getDate',function(v) { return zeroPad(v);}],
			m:['getMonth',function(v) { return zeroPad(v+1);}],
			n:['getMonth',function(v) { return mthNames[v]; }],
			w:['getDay', function (v) { return $APPS_LANG$.DAY_NAMES[v]; }],
			y:['getFullYear'],
			H:['getHours',function(v) { return zeroPad(v);}],
			M:['getMinutes',function(v) { return zeroPad(v);}],
			S:['getSeconds',function(v) { return zeroPad(v);}],
			i:['toISOString']
	};

	this.format = function(date) {
		var dateTxt = this.formatString.replace(/%(.)/g, function(m, p) {
			var rv = date[(dateMarkers[p])[0]]();

			if ( dateMarkers[p][1] != null ) rv = dateMarkers[p][1](rv);

			return rv;

		});

		return dateTxt;
	};

}
//Main.SetTime = function()
//{
//	setInterval ("Main.UpdateTime();", 1000 );
//};
function UpdateTime()
{
	fmt = new DateFmt("%w, %d.%n.%y - %H:%M:%S");
	nowTime  = fmt.format(new Date());

	var mainInfoNowTimeElement = document.getElementById("mainInfoNowTime");
	var mainSTimeElement = document.getElementById("MainNowTime");
	widgetAPI.putInnerHTML(mainInfoNowTimeElement, nowTime);
	widgetAPI.putInnerHTML(mainSTimeElement, nowTime);
	if (Main.exitState > -1)
	{
	    setTimeout("Main.exitState = -1;", 5000);
	}
	if (Main.returnState > -1) {
	    setTimeout("Main.returnState = -1;", 5000);
	}
	if (this.powerTimer != null)
	    this.powerTimer += 1000;
}

Main.onError = function (message, param, param2) {
    Debug.Log("[OnError] Script: " + para + ", line: " + param2);
    Debug.Log("[OnError] Message: " + message);
    switch (param){
        case "Main2.setCatList":
            Main2.SetZeroForId();
            break;
    }


    //Debug.Log("[OnError] Param3: " + param3);
}

window.onkeydown = Main.keyDown;
window.onkeyup = Main.keyUp;
window.onerror = Main.onError;
