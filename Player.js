var Player =
{
    plugin: null,
    oklang: 0,
    countAudio: null,
    currAudio: 0,
    lang: [],
    countSubtitle: null,
    currSubtitle: 0,
    langS: [],
    screen: null,
    state : -1,
    skipState : -1,
    stopCallback : null,    /* Callback function to be set by client */
    originalSource: null,

    xmlHttp: null,

    duration:-1,

    w: 0,
    h: 0,
    wwpar: 0,
    hwpar: 0,
    q: "",
    ar: "",
    fps: "",
    acodec: "",
    speaker: "",
    resolution: "",
    vcodec: "",
    vcq: "",

    tt: 0,
    tl: 0,
    tw: 960,
    th: 540,
    
    mode : 0,
    
    STOPPED : 0,
    PLAYING : 1,
    PAUSED : 2,  
    FORWARD : 3,
    REWIND : 4,
    tB: null,

    resume: 0,

    listCHTimeOut: 25000,
    listCHTimeOutStep: 250,
    listCHTimeOutTemp: 0,
    listenCHurl: null,
    rtmpHost: "http://127.0.0.1:1935",
    dumpHost: "/dtv/www",

    currTimeTemp: -2,
    currTimeTStat: -1,

    currDownloaded: 0,
    tickDownloaded:0,
    TotalBufferSize: 0,
    tickProcBuffer:0,
    currTotalBuffer: 0,
    InitialBufferSize: 0,
    PendingBufferSize: 0,
    SetInitialTimeOut: 0,


};
function onEvent(event, param) {
    //Debug.Log("[Player] onEvent");
    //Debug.Log("[Player] event " + event);
    switch (event) {

        case 14:// OnCurrentPlayBackTime, param = playback time in ms
            //Debug.Log("[Player] Update status: " + param);
            //if (param == 0 && Player.state == Player.PLAYING) {
            //    Debug.Log("[Player] updateStatus_____________________ " + param);
            //    Player.state = Player.STOPPED;
            //    Player.stopVideo();
            //    Player.playVideo(windowplugin.GetScreenRect());
            //}
            //Player.state = Player.PLAYING;
            Player.setCurTime(param);
            break;

        case 1:		// OnConnectionFailed
            Debug.Log("[Player] Error: Connection failed");
            Player.OnConnectionFailed();
            break;

        case 2:		// OnAuthenticationFailed
            Debug.Log("[Player] Error: Authentication failed");
            Player.OnAuthenticationFailed();
            break;

        case 3:		// OnStreamNotFound
            Debug.Log("[Player] Error: Stream not found");
            Player.OnStreamNotFound();
            break;

        case 4:		// OnNetworkDisconnected
            Debug.Log("[Player] Error: Network disconnected");
            Player.OnNetworkDisconnected();
            break;
        case 5:		// OnNetworkSlow
            Debug.Log("[Player] Error: Network slow");
            var txt = this.Type + " - Network slow";
            Util.RedInfo(txt);
            break;
        case 6:		// OnRenderError
            var error;
            switch (param) {
                case "0":
                    error = "Unknown";
                    break;
                case "1":
                    error = "Unsupported container";
                    break;
                case "2":
                    error = "Unsupported video codec";
                    break;
                case "3":
                    error = "Unsupported audio codec";
                    break;
                case "4":
                    error = "Unsupported video resolution";
                    break;
                case "5":
                    error = "Unsupported frame rate";
                    break;
                case "6":
                    error = "Corrupted stream";
                    break;
                default:
                    error = "Other: " + param;
                  
            }
            Debug.Log("[Player] On Render Error: " + error);
            var txt = "On Render Error: " + error;
            Util.RedInfo(txt);
            if (param == "2" || param == "3")
                
                Player.Reload();
            //if (Player.Type == "WeebTV") {
            //    var type = Player.Type;
            //    var url = Player.url;
            //    Player.stopVideo();
            //    Player.deinit();
            //    Player.init();
            //    Player.playVideo();
            //    //Player.plugin.Execute('InitPlayer', myurl);
            //    //Player.setWindow(Player.tt, Player.tl, Player.tw, Player.th);
            //    //Player.plugin.Execute('StartPlayback');
            //    Debug.Log("[Player] Video start playback!!!");
            //}
	        //Player.stopVideo();
	    break;
        case 7: // OnRenderingStart
            Debug.Log("[Player] Video played");
            //Main.WindowsPlayerFullScreen();
            break;

        case 8:		// OnRenderingComplete
            
            Debug.Log("[Player] End of streaming");
            //Player.plugin.Execute('ResumePlay','Player.url');
		//var ld = this.plugin.Execute('GetLiveDuration');
		//
		//Debug.Log("[Player] Live: " + ld);
            break;

        case 9:		// OnStreamInfoReady
            Debug.Log("[Player] On stream info ready");
            Player.setTotalTime();
        //    var d = this.plugin.Execute('GetDuration');
		//var ld = this.plugin.Execute('GetLiveDuration');
		//Debug.Log("[Player] Duration: " + d);
		//Debug.Log("[Player] Live: " + ld);
            //Debug.Log("[Player]  " + Player.plugin.Execute('StartSubtitle', Player.surl));
            //Debug.Log("[Player]  " + Player.plugin.Execute('SetStreamID', 5, 0));
            break;

        case 11:	// OnBufferingStart
            Debug.Log("[Player] Buffering started");
           
            Player.onBufferingStart();
            break;

        case 12:	// OnBufferingComplete
            Debug.Log("[Player] Buffering complete");
            Player.onBufferingComplete();
           
            break;

        case 13:	// OnBufferingProgress, param = progress in % 
            Debug.Log("[Player] Buffering: " + param + "%");
            Player.onBufferingProgress(param);
            break;
        case 15:
            Debug.Log("[Player] Ad start");
            break;
        case 16:
            Debug.Log("[Player] Ad end");
            break;
        case 17:
            Debug.Log("[Player] Resolution changed");
            break;
        case 19:	// OnSubtitle, param = subtitle string for current playing time
                Debug.Log("[Player] Subtitle " + param + " event " + event);
                Player.onSubtitle(param);
                break;
        default:
            Debug.Log("[Player] Default on event e:" + event + ", p:" + param);
            break;
    }
}
Player.StopBackgroundSH = function()
{
    //if (type != "WilmaaTV" && type != "WilmaaTVHD" && type != "WeebTV") {

        inParams = '0=1&1=Empty&2=0&3=0&4=3';
        var url_sucess = false;
        //Debug.Log("[Player] Request: " + inParams);
        while (!url_sucess) {
            try {
                Player.httpGetNoSync(this.listenCHurl + inParams);
                url_sucess = true;
            }
            catch (e) {
                Debug.Log("[Player] Await SamyGO!");
                url_sucess = false;
                sleep(500);
            }
        }
        Debug.Log("[Player] SH script stopped");
    //}
};
Player.init = function()
{
    var success = true;
    this.state = this.STOPPED;
    
    //this.plugin = document.getElementById("pluginPlayer");
    this.plugin = document.getElementById("PluginSef");
    this.plugin.Open('Player', '1.112', 'Player');
    //var ver = this.plugin.Execute('GetPlayerVersion');
    //Debug.Log("[Player] Player version:  " + ver);
    this.plugin.OnEvent = 'this.onEvent';
    Player.currTimeTemp = -2;
    Player.currTimeTStat = -1;
    Player.currDownloaded = 0;
    Player.TotalBufferSize = 0;
    Player.InitialBufferSize = 0;
    Player.PendingBufferSize = 0;
    Player.SetInitialTimeOut = 0;
    
    Player.tickDownloaded = 0;
    //this.screen = document.getElementById('pluginObjectScreen');
    //this.pluginNNavi = document.getElementById("pluginObjectNNavi");
    
    if (!this.plugin)
    {
        success = false;
	//Debug.Log("[Player] Player init success value:  " + success);  
    }
    
    //Debug.Log("[Player] Player init success value:  " + success);    
    
    //this.setWindow(this.tt,this.tl,this.tw, this.th);  
    return success;
};

Player.deinit = function()
{
    if (this.plugin) {
        try {
            if (Player.tDownloaded)
                clearInterval(Player.tDownloaded);
            var ans = this.plugin.Close();//.Execute('Close');
            this.plugin = null;
            if (this.xmlHttp!=null) {
                this.xmlHttp.abort();
            }
            if (Settings.bMoreStreamInfo) {
               
                if (Util.xmlHttp != null) {
                    Util.xmlHttp.abort();
                    Util.xmlHttp = null;
                }
                if (Player.GetStreamInfo)
                    clearTimeout(Player.GetStreamInfo);
            }
            this.currDownloaded = 0;
            this.TotalBufferSize = 0;
            this.InitialBufferSize = 0;
            this.PendingBufferSize = 0;
            this.SetInitialTimeOut = 0;
            this.tickDownloaded = 0;
            this.xmlHttp = null;
            this.screen = null;
            this.url = null;
            this.Type = null;
            delete Player.plugin;
            delete Player.xmlHttp;
            delete Player.screen;
            Debug.Log("[Player] Player deinit: " + ans);
        }
    catch (e) {
        Debug.Log("[Player] Player deinit error:" + e.message);
        }

    }
};
Player.toggle3DMode = function()
{
	if(this.mode==0)
	{
		Debug.Log("[Player] 3D on");
		Main.str3Dstatus = Main.ON3D;
		this.mode=1;
		Main.setFullScreenMode();
		Player.playVideo();
	}
	else
	{
		Debug.Log("[Player] 3D off");
		Main.str3Dstatus = Main.OFF3D;
		this.screen.Set3DEffectMode(0);
		this.mode=0;
	}
};


Player.setWindow = function(tt, tl, tw, th)
{

    if (PLR_TRUE == Main.TVPlugin.GetPIP()) {

        ret = Main.SEFPluginWindow.Execute("SetWindow", 0);
        ret = Main.SEFPluginWindow.Execute("SetScreenRect", tt, tl, tw, th);
        Main.TVMWPlugin.SetMediaSource();
        Main.SEFPluginWindow.Execute("Show", 1);
        this.plugin.Execute('SetDisplayArea', tt, tl, tw, th);
        Debug.Log("[Player] ==== PluginAPIMgr.SetPIG(0): ret = " + ret + " : x = " + tt + ", y = " + tl + ", w = " + tw + ", h = " + th);
        var ret = Main.SEFPluginWindow.Execute("SetWindow", 1);
        //var res = Main.windowPlugin.GetScreenRect();
        //var n = res.split("/");
        //var x = parseInt(n[0]); var y = parseInt(n[1]); var w = parseInt(n[2]); var h = parseInt(n[3]);
        //var ret = Main.SEFPluginWindow.Execute("SetScreenRect", x, y, w, h);
        //Debug.Log("[Player] ==== PluginAPIMgr.SetPIG(1): ret = " + ret + " : x = " + tt + ", y = " + tl + ", w = " + tw + ", h = " + th);
        Main.SEFPluginWindow.Execute("SetPreviousSource");

        //Debug.Log("[Main] SetWindow: PIP ret = " + ret);

    }
    else {
        Main.TVMWPlugin.SetMediaSource();
        if (tw == 0 || th == 0) {
            Debug.Log("[Player] Bad custom video mode, pos (" + tt + "," + tl + ") & size (" + tw + "," + th + ")");
            Player.setFullscreen();
        }
        else {
            this.plugin.Execute('SetDisplayArea', tt, tl, tw, th);
            Debug.Log("[Player] Set custom video mode, pos (" + tt + "," + tl + ") & size (" + tw + "," + th + ")");
        }
    }
};

Player.setFullscreen = function()
{
    //this.plugin.SetDisplayArea(0, 0, 960, 540);
    this.plugin.Execute('SetDisplayArea', 0, 0, 960, 540);
    Player.tt = 0;
    Player.tl = 0;
    Player.tw = 960;
    Player.th = 540;
    Debug.Log("[Player] Set full video mode, pos (" + Player.tt + "," + Player.tl + ") & size (" + Player.tw + "," + Player.th + ")");
};

Player.setVideoURL = function(url,type)
{
    this.url = url;
    this.Type = type;
    Debug.Log("[Player] URL = " + this.url);
    Debug.Log("[Player] TYPE = " + this.Type);
};



Player.httpGet = function(theUrl) 
{
	var req = new XMLHttpRequest();
	req.open("GET", theUrl, true);
	req.onreadystatechange = function (aEvt) {
	  if (req.readyState == 4) {
	     if(req.status == 200)
	    	 {
	    	 	
	    	 	Debug.Log(req.responseText);
	    	 	return(req.responseText);
	    	 }
	     else	
	    	 {
	    	 	Debug.Log("[Player] Error loading page");
	    	 }
	  }
	};
	req.send(null);
	//var xmlHttp = null;
	
	//xmlHttp = new XMLHttpRequest();
	//xmlHttp.setRequestHeader("User-Agent","Opera/9.80 (Windows NT 5.1; U; ru) Presto/2.9.168 Version/11.51");
	//xmlHttp.open( "GET", theUrl, false );
	//xmlHttp.send( null );
	
	//return xmlHttp.responseText;
	
	
};
//Player.httpGet = function (theUrl) {
//    var req = new XMLHttpRequest();
//    req.open("GET", theUrl, true);
//    req.onreadystatechange = function (aEvt) {
//        if (req.readyState == 4) {
//            if (req.status == 200) {

//                Debug.Log(req.responseText);
//                return (req.responseText);
//            }
//            else {
//                Debug.Log("[Player] Error loading page\n");
//            }
//        }
//    };
//    req.send(null);
//    //var xmlHttp = null;

//    //xmlHttp = new XMLHttpRequest();
//    //xmlHttp.setRequestHeader("User-Agent","Opera/9.80 (Windows NT 5.1; U; ru) Presto/2.9.168 Version/11.51");
//    //xmlHttp.open( "GET", theUrl, false );
//    //xmlHttp.send( null );

//    //return xmlHttp.responseText;


//};
Player.httpGetNoSync = function(theUrl) 
{
    if (Player.xmlHttp != null) {
        Player.xmlHttp.abort();
        Player.xmlHttp = null;
    }
	//Debug.Log("[Player] Adress: " + theUrl);
    Player.xmlHttp = new XMLHttpRequest();

    Player.xmlHttp.open("GET", theUrl, false);
    Player.xmlHttp.send(null);
	//Debug.Log("[Player] Adress: " + theUrl);
    //Debug.Log("[Player] Response: " + xmlHttp.rea);
    var out = Player.xmlHttp.responseText;
	Player.xmlHttp = null; 
	return out;
	
	
};
function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}
Player.sendToListCH = function(inParams)
{
var myurl=null;
try
                {
		    this.listCHTimeOutTemp = 0;
                    File.WriteChannel(inParams);

                    while (myurl==null) {
                        myurl = File.ReadChannel();
                        sleep(this.listCHTimeOutStep);
                        this.listCHTimeOutTemp = this.listCHTimeOutTemp + this.listCHTimeOutStep;
                        //Debug.Log("[Player] wait: " + this.listCHTimeOutTemp);
                        if (this.listCHTimeOutTemp > this.listCHTimeOut) {
                            Debug.Log("[Player] Error: break no read: " +this.Type);
                            break;
                        }
                    }

                    File.Delete(File.chokr);
                    File.Delete(File.chout);
                }
                catch (e) {
                    Debug.Log(this.Type +" error: " + e.message);
                }
return myurl;
};
Player.playVideo = function(type)
{
    this.lang = [];
    this.langS = [];
    this.resolution = "";
    this.ar = "";
    this.fps = "";
    this.acodec = "";
    this.speaker = "";
    this.q = "";
    this.vcodec = "";
    this.vcq = "";
    if (type == null) {
       type =  "0000/0000/0960/0540";
    }
    try
    {
        Debug.Log("[Player] Screen resolution: " + type);
        var n = type.split("/");
        this.tt = parseInt(n[0]); this.tl = parseInt(n[1]); this.tw = parseInt(n[2]); this.th = parseInt(n[3]);
        if (this.url == null) {
            Debug.Log("[Player] No videos to play");
        }
        else {
            
            //this.currAudio = 0;
            //this.plugin.Execute('SetStreamID', 1, this.currAudio)
            this.state = this.PLAYING;
            /*
            document.getElementById("play").style.opacity = '0.2';
            document.getElementById("stop").style.opacity = '1.0';
            document.getElementById("pause").style.opacity = '1.0';
            document.getElementById("forward").style.opacity = '1.0';
            document.getElementById("rewind").style.opacity = '1.0';
             */
            //Display.status("Loading...");
            Display.showB();
            Display.showStat();
            Display.statusB("<div style=\"color:#EE5C23\">Loading...</div>");
            //clearTimeout(Display.tB);
            //Display.tB = setTimeout("Display.hideB();", 3200);
            var myurl = null;
            //this.setWindow();
            //Display.show();

            var inParams = '0=1&1=null&2=null&3=null&4=3';
            if (Player.url == null)
                return;
            switch (this.Type) {

                case "WeebTV":
                    var n = this.url.split("/");
                    var l = n[n.length - 1];
                    
                    inParams = '0=1&1=' + this.Type + '&2=' + l + '&3=' + this.rtmpHost + '&4=3';
                    var url_sucess = false;
                    Debug.Log("[Player] Request: " + inParams);
                    var cTry = 5;
                    var c = 0;
                    
                    while (!url_sucess)
                    {
                        try {
                            //Debug.Log("[Player] Adress: " + this.listenCHurl + inParams);
                            //myurl = Player.httpGetNoSync('http://127.0.0.1:1080/phpsysinfo/listCH/oko.php?' + inParams);

                            myurl = Player.httpGetNoSync(this.listenCHurl + inParams);

                            //Debug.Log("[Player] url: " + myurl);
                            url_sucess = true;

                            //if (myurl == "") {
                            //    url_sucess = false;
                            //    sleep(500);
                            //}0=1&1=Telewiz&2=' + l + '&3=0&4=3

                        }
                        catch(e)
                        {
                            if(c<cTry)
                            {
                                Debug.Log("[Player] Await WeebTV!: " + ++c);
                                url_sucess = false;
                                sleep(500);
                            }
                            else
                            {
                                
                                Debug.Log("[Player] Timeout WeebTV!");
                                url_sucess = true;
                            }
                        }
                    }
                    Debug.Log("[Player] WeebTV link: " + myurl);
                   
                    break;
                
                case "MJPEG":
                    inParams = '0=1&1=' + this.Type + '&2=' + this.url + '&3=0&4=3';
                    var url_sucess = false;
                    Debug.Log("[Player] Request: " + inParams);
                    var cTry = 5;
                    var c = 0;

                    while (!url_sucess) {
                        try {
                            myurl = Player.httpGetNoSync(this.listenCHurl + inParams);
                            url_sucess = true;
                        }
                        catch (e) {
                            if (c < cTry) {
                                Debug.Log("[Player] Await MJPEG!: " + ++c);
                                url_sucess = false;
                                sleep(500);
                            }
                            else {

                                Debug.Log("[Player] Timeout MJPEG!");
                                url_sucess = true;
                            }
                        }
                    }
                    Debug.Log("[Player] MJPEG link: " + myurl);
                    break;

                case "RTSP":
                    myurl = Player.httpGetNoSync(this.url);
                    break;
                case "HLS":
                    //Debug.Log("[Player] !!!!!!!!!!!!!!!!! " + myurl)
                    //myurl = this.url + "|STARTBITRATE=" + Settings.HLS.STARTBITRATE + "|SKIPBITRATE=HIGHEST|COMPONENT=HLS";
                    //Debug.Log("[Player] !!!!!!!!!!!!!!!!! " + myurl);
                    myurl = this.url + "|COMPONENT=HLS";
                    break;
                case "HAS":
                    myurl = this.url + "|COMPONENT=HAS";
                    break;
                case "UDP":
                    myurl = this.url;
                    break;
                default:
                    myurl = this.url;
                    break;
            }
           

            if (myurl != null) {
                //this.url = myurl;
                this.plugin.Execute('InitPlayer', myurl);
                var ret;
                var bit_val = 0;
                //Settings.SetTotalBufferSize
                if (Settings.SetTotalBufferSize[this.Type])
                    bit_val = Settings.SetTotalBufferSize[this.Type] * 1024;
                else if (Settings.SetTotalBufferSize_AllType > 0)
                    bit_val = Settings.SetTotalBufferSize_AllType * 1024;
                if (bit_val > 0) {
                    ret = this.plugin.Execute("SetTotalBufferSize", bit_val);
                    Debug.Log("[Player] SetTotalBufferSize: value=" + Util.Bit2Str(bit_val) + ", status=" + ret);
                    Player.TotalBufferSize = bit_val;
                    bit_val = 0;
                }
                //Settings.SetInitialBufferSize
                if (Settings.SetInitialBufferSize[this.Type])
                    bit_val = Settings.SetInitialBufferSize[this.Type] * 1024;
                else if (Settings.SetInitialBufferSize_AllType > 0)
                    bit_val = Settings.SetInitialBufferSize_AllType * 1024;
                if (bit_val > 0) {
                    ret = this.plugin.Execute("SetInitialBufferSize", bit_val);
                    Debug.Log("[Player] SetInitialBufferSize: value=" + Util.Bit2Str(bit_val) + ", status=" + ret);
                    Player.InitialBufferSize = bit_val;
                    bit_val = 0;
                }
                //Settings.SetPendingBufferSize
                if (Settings.SetPendingBufferSize[this.Type])
                    bit_val = Settings.SetPendingBufferSize[this.Type] * 1024;
                else if (Settings.SetPendingBufferSize_AllType > 0)
                    bit_val = Settings.SetPendingBufferSize_AllType * 1024;
                if (bit_val > 0) {
                    ret = this.plugin.Execute("SetPendingBufferSize", bit_val);
                    Debug.Log("[Player] SetPendingBufferSize: value=" + Util.Bit2Str(bit_val) + ", status=" + ret);
                    Player.PendingBufferSize = bit_val;
                }
                //Settings.SetInitialTimeOut
                var timeout_val = 0;
                if (Settings.SetInitialTimeOut[this.Type])
                    timeout_val = Settings.SetInitialTimeOut[this.Type];
                else if (Settings.SetInitialTimeOut_AllType > 0)
                    timeout_val = Settings.SetInitialTimeOut_AllType;
                if (timeout_val > 0) {
                    ret = this.plugin.Execute("SetInitialTimeOut", timeout_val);
                    Debug.Log("[Player] SetInitialTimeOut: value=" + timeout_val + " ms, status=" + ret);
                    Player.SetInitialTimeOut = timeout_val;
                }

                Player.setWindow(this.tt, this.tl, this.tw, this.th);

                this.plugin.Execute('StartPlayback');
                if (this.Type != "HLS") {
                    clearTimeout(Player.tDownloaded);
                    Player.tDownloaded = setInterval("Player.IncreseDownloadValue();", 1000);
                }
                Debug.Log("[Player] Video start playback!!!");
                if (parseFloat(window.managerWidget.version) < 5) {
                    //Debug.Log("[Player] ver: " + parseFloat(window.managerWidget.version));
                    clearTimeout(Player.tReload);
                    Player.tReload = setTimeout("Player.CheckDoStreamPlay();", 1000);
                }

            }
            else {
                Display.status("<div style=\"color:#FF0000\">" + this.Type + " - Channel empty!</div>");
                Display.statusB("<div style=\"color:#FF0000\">" + this.Type + " - Channel empty!</div>");
                Display.showB();
                clearTimeout(Display.tB);
                Display.tB = setTimeout("Display.hideB();", 5000);

            }

        }
    }
    catch (e) {
        Debug.Log("[Player] Player video error: " + e.message + ", " + e.name);
        Player.deinit();
    }
};
Player.CheckDoStreamPlay = function () {
    if (Player.currTimeTemp <= 0) {
        Debug.Log("[Player] Stream not play!");
        Player.Reload();
    }
    else {
        Debug.Log("[Player] Stream playing! Playing time: " + Util.SecToStr(Math.round(Player.currTimeTemp / 1000)));
    }
}
Player.ProcTotalBuffer = function () {
    var value = Player.plugin.Execute('GetDownloadSpeed');

    if (value > 0)
        Player.currTotalBuffer += value / 8;
    var v = Math.round(Player.currTotalBuffer / Player.TotalBufferSize * 100);
    if (v > 100)
        v = 100;
    // setInterval("Display.SetDispObject(\"mainInfoREC\", Main.curRECTitle + Util.SecToStr(++Player.tickProcBuffer));", 1000);
    var strPause = "&#10073; &#10073;  " + Util.SecToStr(++Player.tickProcBuffer) + " | " + v + "%";
    Display.SetDispObject("mainInfoREC", strPause,"EE5C23");
    //Display.statusB("<div style=\"color:#8BB573\">Pause: "+ Math.round(Player.currTotalBuffer/Player.TotalBufferSize)*100 +"%</div>");
    //Debug.Log("[Player] Downloaded file id " + ++Player.tickDownloaded + ": " + Util.Bit2Str(Player.currDownloaded)+" ("+Util.Bitrate2str(value)+")");

};
Player.IncreseDownloadValue = function () {
    if (Player.currTimeTemp > 3000) {
        var value = Player.plugin.Execute('GetDownloadSpeed');
        if (value > 0)
            Player.currDownloaded += value / 8;
    }
    //Debug.Log("[Player] Downloaded file id " + ++Player.tickDownloaded + ": " + Util.Bit2Str(Player.currDownloaded)+" ("+Util.Bitrate2str(value)+")");

};
Player.pauseVideo = function()
{
    if (this.state == this.PAUSED) {
        if (Player.tProcTotalBuffer) {
            clearInterval(Player.tProcTotalBuffer);
            Display.SetDispObject("mainInfoREC", "");
        }
        this.resumeVideo();
    }
    else {
        Player.currTotalBuffer = 0;
        Player.tickProcBuffer=0;
        this.state = this.PAUSED;
        //Display.status("<div style=\"color:#8BB573\">Pause</div>");
        Display.statusB("<div style=\"color:#8BB573\">&#10073; &#10073;</div>");
        Player.tProcTotalBuffer = setInterval("Player.ProcTotalBuffer();", 1000);
        Display.showB();
        this.plugin.Execute('Pause');
    }
  
    //document.getElementById("play").style.opacity = '1.0';
    //document.getElementById("stop").style.opacity = '1.0';
    //document.getElementById("pause").style.opacity = '0.2';
    //document.getElementById("forward").style.opacity = '0.2';
    //document.getElementById("rewind").style.opacity = '0.2';
    
    //this.plugin.Pause();
};

Player.stopVideo = function()
{
    if (this.state != this.STOPPED)
    {
        Display.hide();
        Display.hideStat();
    	document.getElementById("mainVideoInfo").style.display = "none";
    	var infoA = document.getElementById("mainVideoInfo");
    	widgetAPI.putInnerHTML(infoA, "");
    	document.getElementById("mainAudioInfo").style.display = "none";
    	infoA = document.getElementById("mainAudioInfo");
    	widgetAPI.putInnerHTML(infoA, "");
        this.state = this.STOPPED;
        /*
        document.getElementById("play").style.opacity = '1.0';
        document.getElementById("stop").style.opacity = '0.2';
        document.getElementById("pause").style.opacity = '0.2';
        document.getElementById("forward").style.opacity = '0.2';
        document.getElementById("rewind").style.opacity = '0.2';
         */
        //Display.status("");

        //this.plugin.Stop();
        this.plugin.Execute('ClearScreen');
        var retVal = this.plugin.Execute('Stop');
        Debug.Log("[Player] Video stopped: " + retVal);
        if (Player.tProcTotalBuffer) {
            clearInterval(Player.tProcTotalBuffer);
            Display.SetDispObject("mainInfoREC", "");
        }
        //Player.StopBackgroundSH();
        //Display.setTime(0);
        
        //if (this.stopCallback)
        //{
        //    this.stopCallback();
        //}
    }
    else
    {
        Debug.Log("[Player] Ignoring stop request, not in correct state");
    }
};

Player.resumeVideo = function()
{
    this.state = this.PLAYING;
    //document.getElementById("play").style.opacity = '0.2';
    //document.getElementById("stop").style.opacity = '1.0';
    //document.getElementById("pause").style.opacity = '1.0';
    //document.getElementById("forward").style.opacity = '1.0';
    //document.getElementById("rewind").style.opacity = '1.0';
    //Display.status("<div style=\"color:#8BB573\">Play</div>");
    Display.statusB("<div style=\"color:#8BB573\">&#9658;</div>");
    clearTimeout(Display.tB);
    Display.tB = setTimeout("Display.hideB();", 1000);

    Player.plugin.Execute('Resume');
    Debug.Log("[Player] Reasume video");
	//var d = this.plugin.Execute('GetDuration');
	//var ld = this.plugin.Execute('GetLiveDuration');
	//Debug.Log("[Player] Duration: " + d);
	//Debug.Log("[Player] Live: " + ld);
    //this.plugin.Resume();
};

Player.skipForwardVideo = function()
{
    //this.skipState = this.FORWARD;
    //this.plugin.JumpForward(5);    
    if(Player.duration>0)
        this.plugin.Execute('JumpForward',60);
};

Player.skipBackwardVideo = function()
{
    //this.skipState = this.REWIND;
    //this.plugin.JumpBackward(5);
    if (Player.duration > 0)
        this.plugin.Execute('JumpBackward', 60);
};

Player.getState = function()
{
    return this.state;
};

// Global functions called directly by the player 
Player.onSubtitle = function (param) {
    var subtitle_ID;
    Debug.Log("[Player] sub - " + param);
    //document.getElementById("subtitle").innerHTML = param;
}
Player.onBufferingStart = function()
{

    Display.showB();
    Display.showStat();
	//Display.statusB("Buffering...");
	Display.status("<div style=\"color:#EE5C23\"> Buffering...</div>");
	Display.statusB("<div style=\"color:#EE5C23\"> Buffering...</div>");
    //switch(this.skipState)
    //{
    //    case this.FORWARD:
    //        document.getElementById("forward").style.opacity = '0.2';
    //        break;
        
    //    case this.REWIND:
    //        document.getElementById("rewind").style.opacity = '0.2';
    //        break;
    //}
};

Player.onBufferingProgress = function(percent)
{
	Display.showB();
	Display.status("<div style=\"color:#EE5C23\"> Buffering:" + percent + "%</div>");
	Display.statusB("<div style=\"color:#EE5C23\"> Buffering:" + percent + "%</div>");
    //Display.status("Buffering:" + percent + "%");
};
Player.OnConnectionFailed = function()
{
    var txt = "";
    if (Player.Type == 'UDP') {
        Player.deinit();
        Player.init();
        Player.playVideo();
        
        

        switch (Player.resume) {
            case 0:
                txt = this.Type + " - Resume";
                break;
            case 1:
                txt = this.Type + " - Resume.";
                break;
            case 2:
                txt = this.Type + " - Resume..";
                break;
            case 3:
                txt = this.Type + " - Resume...";
                Player.resume = -1;
                break;
        }
        Player.resume++;
        Display.status("<div style=\"color:#EE5C23\">" +  txt + "</div>");
        Display.statusB("<div style=\"color:#EE5C23\">" + txt + "</div>");

    }
    else {
        txt = this.Type + " - Connection Failed!";
        //Display.status("<div style=\"color:#FF0000\">" + this.Type + " - Connection Failed!</div>");
        //Display.statusB("<div style=\"color:#FF0000\">" + this.Type + " - Connection Failed!</div>");
    }
        //Display.showB();
        //clearTimeout(Display.tB);
    //Display.tB = setTimeout("Display.hideB();", 5000);
    Util.RedInfo(txt);
    
};
Player.OnAuthenticationFailed = function () {
    //Display.status("Connection Failed !");
    //Display.status("<div style=\"color:#FF0000\">Authentication Failed!</div>");
    //Display.statusB("<div style=\"color:#FF0000\">Authentication Failed!</div>");
    //Display.showB();
    //clearTimeout(Display.tB);
    //Display.tB = setTimeout("Display.hideB();", 5000);
    var txt = this.Type + " - Authentication Failed!";
    Util.RedInfo(txt);
    //setTimeout("Player.ReturnMenu()", 2000);    
};

Player.OnNetworkDisconnected = function()
{
                //Display.status("Network Disconnected !");
    //Display.status("<div style=\"color:#FF3333\">Network Disconnected!</div>");
    //Display.statusB("<div style=\"color:#FF3333\">Network Disconnected!</div>");
    //            Display.showB();
    //            clearTimeout(Display.tB);
    //            Display.tB = setTimeout("Display.hideB();", 5000);
    //setTimeout("Player.ReturnMenu()", 2000);    
   var  txt = this.Type + " - Network Disconnected!";
   Util.RedInfo(txt);
   Player.Reload();
};

Player.OnStreamNotFound = function()
{
                //Display.status("Stream Not Found!");
    //Display.status("<div style=\"color:#FF3333\">Stream Not Found!</div>");
    //Display.statusB("<div style=\"color:#FF3333\">Stream Not Found!</div>");
    //            Display.showB();
    //            clearTimeout(Display.tB);
    //            Display.tB = setTimeout("Display.hideB();", 5000);
    //setTimeout("Player.ReturnMenu()", 2000);    
    var txt = this.Type + " - Stream Not Found!";
    Util.RedInfo(txt);
};
Player.changeLang = function()
{
    
    if (this.countAudio > 1) {
        
        this.currAudio++;
        //this.w = this.currAudio;
        //this.h = this.plugin.Execute('GetStreamLanguageInfo', 1, this.currAudio);
        if (this.currAudio >= this.countAudio)
            this.currAudio = 0;
        this.plugin.Execute('SetStreamID', 1, this.currAudio);
        var chk = Util.CreateCHKey(Main.selectMinorTemp, Main.selectMajorTemp);
        Debug.Log("[Main] Channel key: " + chk);
        var apid = Player.plugin.Execute('GetStreamPID', 1, Player.plugin.Execute('GetCurrentStreamID', 1));
        //if (Main.ChannelsJSON[chk] != null) {
        //if (Main.ChannelsJSON == null)
        //    Main.ChannelsJSON = {};
        var obj = { apid: apid };
        Main.ChannelsJSON[chk] = obj;
        if (Player.tSetMoreStreamInfoToPlayer) {
            clearTimeout(Player.tSetMoreStreamInfoToPlayer);
        }
        Player.tSetMoreStreamInfoToPlayer = setTimeout("Util.SetMoreStreamInfoToPlayer();", 500);
            //Debug.Log("[Main] Channel added: " + Util.JSON2Str(Main.ChannelsJSON));
        //} else {
        //    Debug.Log("[Main] Channel added error");
       // }
        //if (Main.selectMajorTemp == 85) {
        //    var ret = this.plugin.Execute('SetStreamPID', 1, 851);
        //    Debug.Log("[Main] SetStreamPID: " + ret);
        //}
        //var chObj = '{"minor": Main.selectMinorTemp,"major": Main.selectMajorTemp, "apid": this.currAudio, }';
        //Util.CreateChannelJSONValue(chObj);
        //////////////////////
        //var tfile = Util.ReadFile('test');
        //if (tfile != null) {
        //    var jsonObj = JSON.parse(tfile);
        //    Debug.Log("[Main] JSON: " + jsonObj);
        //    try {
        //        if (jsonObj != null) {
        //            Debug.Log("[Main] JSON ok");
        //            for (var i = 0; i < jsonObj.length; i++) {
        //                var type = jsonObj[i].display;
        //                var msg = jsonObj[i].url;
        //                Debug.Log("[Main] KEY: " + type + ", " + msg);
        //            }
        //        }
        //        else {
        //            Debug.Log("[Main] JSON null");
        //        }
        //    } catch (e) {
        //        Debug.Log("[Main] Error: " + e.message);
        //    }
        //}
        //////////////////////
        //this.DispLangSA("mainAudioInfo", this.lang, this.currAudio);
        //this.DispLangSA("mainSubtitleInfo", this.langS, -1);
    }
    
};
Player.onBufferingComplete = function()
{
    //Display.status("<div style=\"color:#8BB573\">Play</div>");
    
    //Display.status("<div style=\"color:#8BB573\">Play</div>");
    Display.statusB("<div style=\"color:#8BB573\">&#9658;</div>");
    clearTimeout(Display.tB);
    Display.tB = setTimeout("Display.hideB();", 1000);
    var bt = this.plugin.Execute('GetCurrentBitrates');
    Debug.Log("[Player] Current bitrate: " + Util.Bitrate2str(bt,8));
    //setTimeout("Display.status(\"<div style=\"color:#8BB573\">" + bt+ "</div>\");", 5000);
    //if (this.lang.length == 0) {
    //    var countAudio = this.plugin.Execute('GetTotalNumOfStreamID', 1);
    //    for (var i = 0; i < countAudio; i++) {

    //        this.lang[i] = this.plugin.Execute('GetStreamLanguageInfo', 1, i);
    //    };
    //    this.countAudio = countAudio;
    //if (this.currAudio < this.countAudio)
    try
    {
        //if (this.Type != "HLS") {
        //    try {
        //        //var ed = this.plugin.Execute('GetStreamExtraData', 0);
        //        //Debug.Log("[Player] GetStreamExtraData: " + ed);
        //        //GetStreamExtraData
        //    } catch (exc) {
        //        Debug.Log("[Player] GetStreamExtraData error: "+ exc.name + ", " + exc.message);
        //    }
        //}
        if (this.Type != "HLS" && this.lang.length == 0) {
            this.countAudio = this.plugin.Execute('GetTotalNumOfStreamID', 1);
            //this.lang = l + countAudio;
            
            for (var i = 0; i < this.countAudio; i++) {

                this.lang[i] = this.plugin.Execute('GetStreamLanguageInfo', 1, i);
                Debug.Log("[Player] Detected the soundtrack " + i + ": " + Util.LanguageNumToStr(this.lang[i]));
                //var slc = this.plugin.Execute('GetStreamExtraData', 1, i);
                //Debug.Log("[Player] Detected the soundtrack GetStreamExtraData " + i + ": " + slc);
                
               
            }
            if (this.countAudio > 0) {
                this.SetLang();
            }
        }
        if (this.Type != "HLS" && this.langS.length == 0) {
            this.countSubtitle = this.plugin.Execute('GetTotalNumOfStreamID', 4);
            for (var ii = 0; ii < this.countSubtitle; ii++) {

                this.langS[ii] = this.plugin.Execute('GetStreamLanguageInfo', 4, ii);
                Debug.Log("[Player] Detected the subtitle " + ii + ": " + Util.LanguageNumToStr(this.langS[ii]));
            }
            // this.DispLang();
            //if (this.countSubtitle > 0) {

            //    //var nSubtitle = Player.plugin.Execute('GetTotalNumOfStreamID', 5);
            //    //if (nSubtitle.length > 1) {
            //    //    Player.plugin.Execute('StartSubtitle', '$TEMP/subtitle/subtitle.smi');
            //    //    Player.plugin.Execute('SetStreamID', 5, 0);
            //    //    Player.plugin.Execute('SetSubtitleSync', 500);    // delay subtitle event 500 millisecond
            //    //}
               
            //    try
            //    {
            //        //option = null;
            //        //option.streamID=1;
                    
            //        var xxx = 0;
            //        var ok1 = Player.plugin.Execute('SetStreamID', 4, xxx);
            //        var ok2 = Player.plugin.Execute('StartSubtitle', xxx);
            //        //var closedcaption = webapis.tv.closedcaption;
            //        //closedcaption.registerCaptionChangeCallback(function () { Debug.Log("cap") });
            //        //Debug.DisplayClass(closedcaption, "webapis.tv.closedcaption.txt");
            //        Debug.Log("[Player] Subtitle is OK!, ok1: " + ok1 + ", ok2: " + ok2);
            //    }
            //    catch (e) {
            //        Debug.Log("[Player] Subtitle is error: " + e);
            //    }
            //    //Player.plugin.Execute('SetSubtitleSync', 500);
            //}
        }

        //this.DispLang();
        //this.DispLangSA("mainAudioInfo", this.lang, this.currAudio);
        //this.DispLangSA("mainSubtitleInfo", this.langS, -1);
       
        }
        catch(e)
        {
            Display.statusS("<div style=\"color:#8BB573\">BuffComplete: " + e + "</div>");
        }
        
    //}
  

    //Player.GetVideoSize();

    
    //switch(this.skipState)
    //{
    //    case this.FORWARD:
    //        document.getElementById("forward").style.opacity = '1.0';
    //        break;
        
    //    case this.REWIND:
    //        document.getElementById("rewind").style.opacity = '1.0';
    //        break;
    //}
};
var option =
{
    streamID: null,
}
Player.SetLang2 = function (code) {

    try{
        for (var i = 0; i < this.countAudio; i++) {
            if (this.lang[i] == code) {
                this.currAudio = i;
            
                this.oklang = 1;
                break;
            }
        }
    }
    catch (e) {
        Display.statusB("<div style=\"color:#8BB573\">SetLang2: " + e + "</div>");
        clearTimeout(Display.tB);
        Display.tB = setTimeout("Display.hideB();", 8000);
    }
};
Player.SetLang = function ()
{
    try
    {
        this.oklang = 0;
        this.currAudio = 0;
        if (this.countAudio > 1) {
            var chk = Util.CreateCHKey(Main.selectMinorTemp, Main.selectMajorTemp);
            
            var setAPID = -1;
            //if (Main.ChannelsJSON[chk] != null) {
            //    if (Main.ChannelsJSON[chk].apid != null) {
            //        setAPID = this.plugin.Execute('SetStreamPID', 1, Main.ChannelsJSON[chk].apid);
            //        //this.currAudio = this.plugin.Execute('GetCurrentStreamID', 1);
            //        Debug.Log("[Player] Channel key: " + chk + ", set stream audio PID: " + Main.ChannelsJSON[chk].apid + ", status: " + setAPID);
            //        if (Player.tSetMoreStreamInfoToPlayer) {
            //            clearTimeout(Player.tSetMoreStreamInfoToPlayer);
            //        }
            //        Player.tSetMoreStreamInfoToPlayer = setTimeout("Util.SetMoreStreamInfoToPlayer();", 500);
            //        //}
            //    }
            //}
            
            //
            if (setAPID == -1) {
                for (var i = 0; i < Settings.SoundTrackLangPriority.length; i++) {
                    this.SetLang2(Settings.SoundTrackLangPriority[i]);
                    if (this.oklang) {
                        Debug.Log("[Player] Detected SoundTrackLangPriority" + i + ": " + Util.LanguageNumToStr(Settings.SoundTrackLangPriority[i]));
                        break;
                    }
                }
                if (this.countAudio > 0)
                    this.plugin.Execute('SetStreamID', 1, this.currAudio);
            }

            //this.SetLang2(Settings.SoundTrackLangPriority0);
            //if (!this.oklang) { this.SetLang2(Settings.SoundTrackLangPriority1) }
            //if (!this.oklang) { this.SetLang2(Settings.SoundTrackLangPriority2) }
            //if (!this.oklang) { this.SetLang2(Settings.SoundTrackLangPriority3) }
            //var f_ = this.plugin.Execute('SetDisplayLock', 1);
            //Debug.Log("[Player] SetDisplayLock: " + f_);
            //var fo_ = this.plugin.Execute('SetVariableFrameRate');
            //Debug.Log("[Player] SetVariableFrameRate: " + fo_);
            //var fo = this.plugin.Execute('GetAvailableBitrates');//, 3, Player.plugin.Execute('GetStreamPID', 3, Player.plugin.Execute('GetCurrentStreamID', 3)));
            //Debug.Log("[Player] GetAvailableBitrates: " + Util.Bitrate2str(fo));
            
        }
    }
    catch (e) {
        Display.statusB("<div style=\"color:#8BB573\">SetLang: " + e + "</div>");
        clearTimeout(Display.tB);
        Display.tB = setTimeout("Display.hideB();", 8000);
    }
    //this.plugin.Execute('SetStreamID', 1, this.currAudio || 0);
};
Player.Reload = function () {
    Debug.Log("[Player] Reload go (Downloaded: " + Util.Bit2Str(Player.currDownloaded) +
              ", Play time: " + Util.SecToStr(Math.round(Player.currTimeTemp / 1000)) + ")");
    Main.TVMWPlugin.SetMediaSource();
    Player.currTimeTemp = -2;
    Player.currTimeTStat = -1;
    Player.plugin.Execute('ClearScreen');
    Player.state = Player.STOPPED;
    this.currDownloaded = 0;
    this.tickDownloaded = 0;
    var retVal = Player.plugin.Execute('Stop');
    Debug.Log("[Player] Video stopped: " + retVal);
    if (Player.Type == "HTTP") {
        Player.plugin.Execute('Play', Player.url);
        //Player.plugin.Execute('StartPlayback');
        Player.state = Player.PLAYING;
    }
    else {
        this.TotalBufferSize = 0;
        this.InitialBufferSize = 0;
        this.PendingBufferSize = 0;
        this.SetInitialTimeOut = 0;
        Player.playVideo();
    }
    Debug.Log("[Player] Reload done");
}
Player.CurrVPID = function () {
    return Player.plugin.Execute('GetStreamPID', 3, Player.plugin.Execute('GetCurrentStreamID', 3));//video
};
Player.CurrAPID = function () {
    return Player.plugin.Execute('GetStreamPID', 1, Player.plugin.Execute('GetCurrentStreamID', 1));//audio
};
Player.CurrSPID = function () {
    return Player.plugin.Execute('GetStreamPID', 4, Player.plugin.Execute('GetCurrentStreamID', 4));//subtitle
};
Player.setCurTime = function(time_param)
{
    
    //Debug.Log("[Player] Duration: " + d);
    //Debug.Log("[Player] Live: " + ld);
    if (Player.currTimeTemp == time_param && Player.currTimeTemp > -1) {
        if (Player.currTimeTemp < 5000) {
            if (Player.currTimeTStat < 5) {
                Player.currTimeTStat++;
                Debug.Log("[Player] Count time stat: " + Player.currTimeTStat);
            }
            else {
                Debug.Log("[Player] Set reload by count time stat: " + Player.currTimeTStat);
                Player.Reload();
            }
        }
        else {
            Debug.Log("[Player] Set reload by short start time: " + Player.currTimeTemp);
            Player.Reload();
        }
    }
    else {
        var bt = 0;
        
        Player.currTimeTemp = time_param;
        Player.currTimeTStat = -1;
        //if (Main.isInfo | Main.showS) {
        if (Player.currTimeTemp > 3000) {
            bt = Util.Bitrate2str(Player.plugin.Execute('GetDownloadSpeed'));
        }

            var time_s = Util.SecToStr(Math.round(time_param / 1000));
            var download_s = Util.Bit2Str(Player.currDownloaded);
            var sapid = "apid: ";
            var svpid = "vpid: ";
            var sspid = "spid: ";
            var sq = "";
            var sar = "";
            var sfps = "";
            var sacodec = "";
            var sspeaker = "";
            var svcodec = "";
            var svcq = "";
            if (Player.q != "")
                sq = Player.q + this.Color("CCCCCC", " | ");
            if (Player.fps != "")
                sfps = Player.fps + "fps" + this.Color("CCCCCC", " | ");
            if (Player.acodec != "")
                sacodec = Player.acodec + this.Color("CCCCCC", " | ");
            if (Player.speaker != "")
                sspeaker = Player.speaker + this.Color("CCCCCC", " | ");
            if (Player.ar != "")
                sar = Player.ar + this.Color("CCCCCC", " | ");
            if (Player.vcodec != "")
                svcodec = Player.vcodec + this.Color("CCCCCC", " | ");
            if (Player.vcq != "")
                svcq = Player.vcq + this.Color("CCCCCC", " | ");
            var res = "";
            if (this.resolution!="")
                var res = this.resolution + this.Color("CCCCCC", " | ");//Player.wwpar + " x " + Player.hwpar + " | " + this.resolution + " | " + Player.w + " x " + Player.h;

            var alang = "";
            if (Player.lang.length > 0) {
                alang = Util.LanguageNumToStr(Player.lang[Player.plugin.Execute('GetCurrentStreamID', 1)]) + " | ";
            }
        try
        {
            var apid = Player.CurrAPID();//audio
            if (apid != -1) {
                apid = sapid + apid + " | ";
            }
            else {
                apid = "";
            }
            var vpid = Player.CurrVPID();//video
            if (vpid != -1) {
                vpid = svpid + vpid + " | ";
            }
            else {
                vpid = "";
            }
            var spid = Player.CurrSPID();//subtitle
            if (spid != -1) {
                spid = sspid + spid + " | ";
            }
            else {
                spid = "";
            }
            var download_str = "";
            if (this.Type != "HLS") {
                download_str = this.Color("8BB573", download_s) + this.Color("CCCCCC", " | ");
            }
            //var test = Player.plugin.Execute('GetStreamExtraData', 1, Player.plugin.Execute('GetCurrentStreamID', 1));//test
            Display.status("<div>" + this.Color("CCCCCC", " | ") + res + sfps + svcodec + svcq + sq + sar + alang + sacodec + sspeaker +
                this.Color("8BB573", bt) + this.Color("CCCCCC", " | ") +
                 download_str +
                this.Color("8BB573", time_s) + this.Color("CCCCCC", " | ") + "</div>");
            Display.statusS("<div>" + this.Color("CCCCCC", " | ") + this.Color("CCCCCC", vpid + apid + spid) + "</div>");
            //var streaming_buff = Util.Bit2Str(Player.plugin.Execute('GetStreamingBufferSize'));
            //Debug.Log("[Player] GetStreamingBufferSize: " + streaming_buff);
            //Display.status("<div><strong style=\"color:#8BB573\">" + vpid + apid + spid + " | " + bt + " | " + time_s + "</strong></div>");
        }
        catch (err) {
            Display.status("<div>" + res + this.Color("CCCCCC", " | ") + sq + sar + "<strong style=\"color:#8BB573\">" + bt + " | " + time_s + this.Color("CCCCCC", " | ") + "</strong></div>");
        }
            
        //}

        //var ld = Player.plugin.Execute('GetLiveDuration');
        //Debug.Log("[Player] Live: " + ld);
        //ld = Player.plugin.Execute('GetDuration');
        //Debug.Log("[Player] Duration: " + ld);
    }

    //var type = Main.pluginWindow.GetScreenRect();
    //var n = type.split("/");
    //if (this.tt != parseInt(n[0]) || this.tl != parseInt(n[1]) || this.tw != parseInt(n[2]) || this.th != parseInt(n[3])) {
    //    this.tt = parseInt(n[0]); this.tl = parseInt(n[1]); this.tw = parseInt(n[2]); this.th = parseInt(n[3]);
    //    Player.setWindow(this.tt, this.tl, this.tw, this.th);
    //}//Display.setTime(time);
};

Player.setTotalTime = function()
{
    //this.GetVideoSize();
    Player.duration = Player.plugin.Execute('GetDuration');
    if (Player.duration > 0)
        Debug.Log("[Player] Video duration: " + Player.duration);
   

    try {
        //if (this.Type != "HLS") {

        //    var a1 = this.plugin.Execute('GetTotalNumOfStreamID', 0);
        //    Debug.Log("[Player] TotalNumOfStreamID 0: " + a1);
        //    a1 = this.plugin.Execute('GetTotalNumOfStreamID', 1);
        //    Debug.Log("[Player] TotalNumOfStreamID 1: " + a1);
        //    a1 = this.plugin.Execute('GetTotalNumOfStreamID', 2);
        //    Debug.Log("[Player] TotalNumOfStreamID 2: " + a1);
        //    a1 = this.plugin.Execute('GetTotalNumOfStreamID', 3);
        //    Debug.Log("[Player] TotalNumOfStreamID 3: " + a1);
        //    a1 = this.plugin.Execute('GetTotalNumOfStreamID', 4);
        //    Debug.Log("[Player] TotalNumOfStreamID 4: " + a1);
        //    a1 = this.plugin.Execute('GetTotalNumOfStreamID', 5);
        //    Debug.Log("[Player] TotalNumOfStreamID 5: " + a1);
        //}

        //this.GetVideoSize();
        //var l = this.lang.length + "/";
        this.countAudio = 0;
        this.countSubtitle = 0;
        this.lang = [];
        this.langS = [];
        if (Settings.bMoreStreamInfo) {
            if (this.Type == "HTTP")
            {
                //clearTimeout(Player.GetStreamInfo);
                var chk = Util.CreateCHKey(Main.selectMinorTemp, Main.selectMajorTemp);
                if (Main.ChannelsStreamInfos[chk] != undefined) {
                    Util.GetStreamInfo(Player.url);
                }
                else {
                    Player.GetStreamInfo = setTimeout("Util.GetStreamInfo(Player.url);", Settings.DelayMoreStreamInfo);
                }
            }
        }
       
    }
    catch (e) {
        Display.status("<div style=\"color:#8BB573\">setCurTime: " + e + "</div>");
        clearTimeout(Display.tB);
        Display.tB = setTimeout("Display.hideB();", 8000);
    }
    //Display.setTotalTime(Player.plugin.GetDuration());
    
    //setTimeout("Player.GetVideoSize()", 200); 
};
Player.Color = function (color, text) {
    return "<span style=\"color:#" + color + "\">" + text + "</span>";
};
Player.DispLang = function ()
{
    var l = "";
    if (this.lang.length > 0) {
        if (this.lang.length == 1 &&  Data.GetLang(this.lang[0]) == "$") {
        }
        else{
            l = this.Color("CCCCCC", "|");
            if (this.state != this.STOPPED) {

                //l = this.currAudio + "/" + this.countAudio;
                for (var i = 0; i < this.lang.length; i++) {
                    if (i == this.currAudio) {
                        l = l + this.Color("FFFFFF", Data.GetLang(this.lang[i])) + this.Color("CCCCCC", "|");
                    }
                    else {
                        l = l + Player.Color("CCCCCC", Data.GetLang(this.lang[i])) + this.Color("CCCCCC", "|");
                    }
                }
            }
        }
    }
    var infoA = document.getElementById("mainAudioInfo");
    widgetAPI.putInnerHTML(infoA, l);
    document.getElementById("mainAudioInfo").style.display = "block";
};
Player.DispLangSA = function (div,source,ids) {
    var l = "";
    if (source.length > 0) {
        if (source.length == 1 && Data.GetLang(source[0]) == "$") {
        }
        else {
            l = this.Color("CCCCCC", "|");
            if (this.state != this.STOPPED) {

                //l = this.currAudio + "/" + this.countAudioS
                for (var i = 0; i < source.length; i++) {
                    if (i == ids) {
                        l = l + this.Color("FFFFFF", Util.LanguageNumToStr(source[i])) + this.Color("CCCCCC", "|"); //Data.GetLang(source[i]))
                    }
                    else {
                        l = l + Player.Color("CCCCCC", Util.LanguageNumToStr(source[i])) + this.Color("CCCCCC", "|"); //Data.GetLang(source[i]))
                    }
                }
            }
        }
    }
    var infoA = document.getElementById(div);
    widgetAPI.putInnerHTML(infoA, l);
    document.getElementById(div).style.display = "block";
};
Player.GetVideoSize = function()
{  
	if(this.state!= this.STOPPED)
	{
	    Player.resolution = "";
	    var hhwpar = Player.plugin.Execute('GetResolutionWithPAR')
	    if (hhwpar != -1)
	        hhwpar = hhwpar.split("|");
	    else
	        return;
	    Player.hwpar = hhwpar[1];
	    Player.wwpar = hhwpar[0];
	    var hh = Player.plugin.Execute('GetVideoResolution')
	    if (hh != -1)
	        hh = hh.split("|");
	    else
	        return;
	    Player.h = hh[1];//.plugin.Execute('GetVideoHeight');
	    Player.w = hh[0];//this.plugin.Execute('GetVideoWidth');
	    Player.q = "";
	    if (Player.h >= 720)
	        Player.q = "HD";
	    else if (Player.h >= 480)
	        Player.q = "SD";
	    Player.ar = "";
	    if (Math.round((Player.wwpar / Player.hwpar) * 100) / 100 == Math.round((16 / 9) * 100) / 100)
	        Player.ar = "16:9";
	    else if (Math.round((Player.wwpar / Player.hwpar) * 100) / 100 == Math.round((4 / 3) * 100) / 100)
	        Player.ar = "4:3";
	    else if (Math.round((Player.wwpar / Player.hwpar) * 100) / 100 == Math.round((3 / 2) * 100) / 100)
	        Player.ar = "3:2";
	    else if (Math.round((Player.wwpar / Player.hwpar) * 100) / 100 == 1.85)
	        Player.ar = "1.85:1";
	    else if (Math.round((Player.wwpar / Player.hwpar) * 100) / 100 == 2.39)
	        Player.ar = "2.39:1";
	    Debug.Log("[Player] GetResolution: " + Player.w + " x " + Player.h + ", GetResolutionWithPAR: " + Player.wwpar + " x " + Player.hwpar + " " + Player.q + " " + Player.ar);
		//Main.strSize = " (" + this.w + "x" + this.h + ") ";
	    var infoA = document.getElementById("mainVideoInfo");
	    
	    //widgetAPI.putInnerHTML(infoA, this.w + "x" + this.h);
	    document.getElementById("mainVideoInfo").style.display="none";
	}
};
onServerError = function()
{
    //Display.status("Server Error!");
};

OnNetworkDisconnected = function()
{
    ///Display.status("Network Error!");
};

getBandwidth = function(bandwidth) { Debug.Log("[Player] getBandwidth " + bandwidth); };

onDecoderReady = function() { Debug.Log("[Player] onDecoderReady"); };

onRenderError = function() { Debug.Log("[Player] onRenderError"); };

stopPlayer = function()
{
    this.stopVideo();
};

setTottalBuffer = function(buffer) { Debug.Log("[Player] setTottalBuffer " + buffer); };

setCurBuffer = function(buffer) { Debug.Log("[Player] setCurBuffer " + buffer); };
