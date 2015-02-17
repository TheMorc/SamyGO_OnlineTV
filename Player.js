var Player =
{
    plugin: null,
    totalBuffPlayer: 1024,
    initBuffPlayer : 512,
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
    originalSource : null,
    
    w: 0,
    h: 0,
    
    mode : 0,
    
    STOPPED : 0,
    PLAYING : 1,
    PAUSED : 2,  
    FORWARD : 3,
    REWIND : 4,
    tB: null,

    resume: 0,
};
function onEvent(event, param) {
    alert("onEvent");
    alert("event " + event);

    switch (event) {

        case 14:// OnCurrentPlayBackTime, param = playback time in ms
            alert("updateStatus " + param);
            Player.setCurTime();
            break;

        case 1:		// OnConnectionFailed
            alert("Error: Connection failed");
            Player.OnConnectionFailed();
            break;

        case 2:		// OnAuthenticationFailed
            alert("Error: Authentication failed");
            Player.OnAuthenticationFailed();
            break;

        case 3:		// OnStreamNotFound
            alert("Error: Stream not found");
            Player.OnStreamNotFound();
            break;

        case 4:		// OnNetworkDisconnected
            alert("Error: Network disconnected");
            Player.OnNetworkDisconnected();
            break;

        case 6:		// OnRenderError
            var error;
            switch (param) {
                case 1:
                    error = "Unsupported container";
                    break;
                case 2:
                    error = "Unsupported video codec";
                    break;
                case 3:
                    error = "Unsupported audio codec";
                    break;
                case 6:
                    error = "Corrupted stream";
                    break;
                default:
                    error = "Unknown";
            }
            alert("Error: " + error);
            break;

        case 8:		// OnRenderingComplete
            alert("End of streaming");
            break;

        case 9:		// OnStreamInfoReady
            alert("updateStatus");

            
            Player.setTotalTime();
           
            //alert(" " + Player.plugin.Execute('StartSubtitle', Player.surl));
            //alert(" " + Player.plugin.Execute('SetStreamID', 5, 0));
            break;

        case 11:	// OnBufferingStart
            alert("Buffering started");
           
            Player.onBufferingStart();
            break;

        case 12:	// OnBufferingComplete
            alert("Buffering complete");
            Player.onBufferingComplete();
           
            break;

        case 13:	// OnBufferingProgress, param = progress in % 
            alert("Buffering: ");
            Player.onBufferingProgress(param);
            break;

        case 19:	// OnSubtitle, param = subtitle string for current playing time
            alert("Subtitle");
            break;
    }
}

Player.init = function()
{
    var success = true;
          alert("success vale :  " + success);    
    this.state = this.STOPPED;
    
    //this.plugin = document.getElementById("pluginPlayer");
    this.plugin = document.getElementById("PluginSef");
    this.plugin.Open('Player', '1.112', 'Player');
    this.plugin.OnEvent = 'this.onEvent';
    
    this.screen = document.getElementById('pluginObjectScreen');
    this.pluginNNavi = document.getElementById("pluginObjectNNavi");
    
    if (!this.plugin)
    {
          alert("success vale this.plugin :  " + success);    
         success = false;
    }
    
    alert("success vale :  " + success);    
    
    this.setWindow();
    
    alert("success vale :  " + success);    
    
    //this.plugin.OnCurrentPlayTime = 'Player.setCurTime';
    //this.plugin.Execute('OnStreamInfoReady','Player.setTotalTime');
    //this.plugin.OnBufferingStart = 'Player.onBufferingStart';
    //this.plugin.OnBufferingProgress = 'Player.onBufferingProgress';
    //this.plugin.OnBufferingComplete = 'Player.onBufferingComplete';           
    
    //this.plugin.OnConnectionFailed = 'Player.OnConnectionFailed';
    //this.plugin.OnNetworkDisconnected = 'Player.OnNetworkDisconnected';
    //this.plugin.OnStreamNotFound = 'Player.OnStreamNotFound';
    //this.plugin.OnRenderError = 'Player.OnRenderError';
    //this.plugin.onServerError = 'Player.onServerError';
    
    alert("success vale :  " + success);       
    return success;
};

Player.deinit = function()
{
      alert("Player deinit !!! " );       
      
      if (this.plugin)
      {
          this.plugin.Execute('Stop');
          this.plugin.Close();
      }
};
Player.toggle3DMode = function()
{
	if(this.mode==0)
	{
		alert("3D on");
		Main.str3Dstatus = Main.ON3D;
		this.mode=1;
		Main.setFullScreenMode();
		Player.playVideo();
	}
	else
	{
		alert("3D off");
		Main.str3Dstatus = Main.OFF3D;
		this.screen.Set3DEffectMode(0);
		this.mode=0;
	}
};


Player.setWindow = function()
{
    //this.plugin.SetDisplayArea(458, 58, 472, 270);
    //this.plugin.SetDisplayArea(0, 0, 960, 540);
    this.plugin.Execute('SetDisplayArea', 0, 0, 960, 540);
};

Player.setFullscreen = function()
{
    //this.plugin.SetDisplayArea(0, 0, 960, 540);
    this.plugin.Execute('SetDisplayArea', 0, 0, 960, 540);
};

Player.setVideoURL = function(url,type)
{
    this.url = url;
    this.Type = type;
    alert("URL = " + this.url);
    alert("TYPE = " + this.Type);
};



Player.httpGet = function(theUrl) 
{
	var req = new XMLHttpRequest();
	req.open("GET", theUrl, true);
	req.onreadystatechange = function (aEvt) {
	  if (req.readyState == 4) {
	     if(req.status == 200)
	    	 {
	    	 	
	    	 	alert(req.responseText);
	    	 	return(req.responseText);
	    	 }
	     else	
	    	 {
	    	 	alert("Error loading page\n");
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
Player.httpGetNoSync = function(theUrl) 
{
	var xmlHttp = null;
	
	xmlHttp = new XMLHttpRequest();
	//xmlHttp.setRequestHeader("User-Agent","Opera/9.80 (Windows NT 5.1; U; ru) Presto/2.9.168 Version/11.51");
	xmlHttp.open( "GET", theUrl, false );
	xmlHttp.send( null );
	//alert(xmlHttp.responseText);
	return xmlHttp.responseText;
	
	
};
Player.playVideo = function(type)
{
    if (this.url == null)
    {
        alert("No videos to play");
    }
    else
    {
        this.lang = [];
        this.langS = [];
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
        this.setWindow();
        //Display.show();
        var initBuff = this.initBuffPlayer;
        var totalBuff = this.totalBuffPlayer;
        switch (this.Type)
        {
	        case "HLS":
	            myurl = this.url + "|COMPONENT=HLS";
	            break;
            case "UDP":
                myurl = this.url;
                initBuff = 3145728;
                totalBuff = 10485760;
                break;
	        default:
	            myurl = this.url;
	        	break;
	        
	      
        }
        while (myurl == null)
            alert("wait...");
        this.url = myurl;
 
    
        //switch   (this.mode)
        //{
        //	case 0:
        //		alert(this.url);
        //this.plugin.Play( this.url );
        this.plugin.Execute('InitPlayer', this.url);
        switch (this.Type) {

            case "HLS":
                this.plugin.Execute('SetInitialBufferSize', 1024 * initBuff);
                break;
            case "UDP":
                //SetInitialTimeOut
                //this.plugin.Execute('SetInitialTimeOut', 1000);
                this.plugin.Execute("SetTotalBufferSize", initBuff * 3);//totalBuff);
                this.plugin.Execute("SetInitialBufferSize", initBuff);
                this.plugin.Execute("SetPendingBufferSize", initBuff/3);//initBuff); //1MB 
                break;
            default:
                this.plugin.Execute('SetInitialBufferSize', 1024 * initBuff);
                break;


        }
        
        this.plugin.Execute('StartPlayback');
        		//var res = Player.Execute('SetStreamID', '1', '1');
        //this.plugin.Execute('SetOSDState', 100, 100, 100, 100, 1);
        //$('#test').text(res);
       
        		alert("PLAY!!!!");
        	//	break;
        	//case 1:
        	//	//this.screen.Set3DEffectMode(2);
        	//	//this.plugin.Stop();
        	//	//this.plugin.InitPlayer(this.url);        
        	//	//this.plugin.SetDisplayArea(type.left,type.top,type.width,type.heigth);//(0, 0, 960, 540);        
        	//	//this.plugin.SetPlayerProperty(2, "3", 1);
        	//	//this.plugin.StartPlayback();
        	//	break;
        	//default:
        //}
        //this.plugin.Play( this.url );
        // Audio.plugin.SetSystemMute(false); 

        //var infoA = document.getElementById("mainSubtitleInfo");
        //widgetAPI.putInnerHTML(infoA, this.ur);
        //document.getElementById("mainSubtitleInfo").style.display = "block";
    }
};

Player.pauseVideo = function()
{
    if (this.state == this.PAUSED) {
        this.resumeVideo();
    }
    else {

        this.state = this.PAUSED;
        Display.status("<div style=\"color:#8BB573\">Pause</div>");
        Display.statusB("<div style=\"color:#8BB573\">Pause</div>");
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
        this.plugin.Execute('Stop');
        //Display.setTime(0);
        
        if (this.stopCallback)
        {
            this.stopCallback();
        }
    }
    else
    {
        alert("Ignoring stop request, not in correct state");
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
    Display.status("<div style=\"color:#8BB573\">Play</div>");
    Display.statusB("<div style=\"color:#8BB573\">Play</div>");
    clearTimeout(Display.tB);
    Display.tB = setTimeout("Display.hideB();", 1000);
    this.plugin.Execute('Resume');
    //this.plugin.Resume();
};

Player.skipForwardVideo = function()
{
    //this.skipState = this.FORWARD;
    //this.plugin.JumpForward(5);    
};

Player.skipBackwardVideo = function()
{
    //this.skipState = this.REWIND;
    //this.plugin.JumpBackward(5);
};

Player.getState = function()
{
    return this.state;
};

// Global functions called directly by the player 

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
    if (Player.Type == 'UDP') {
        Player.deinit();
        Player.init();
        Player.playVideo(0);
        
        var txt = "";

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

        Display.status("<div style=\"color:#FF0000\">" + this.Type + " - Connection Failed!</div>");
        Display.statusB("<div style=\"color:#FF0000\">" + this.Type + " - Connection Failed!</div>");
    }
        Display.showB();
        clearTimeout(Display.tB);
        Display.tB = setTimeout("Display.hideB();", 5000);
    
};
Player.OnAuthenticationFailed = function () {
    //Display.status("Connection Failed !");
    Display.status("<div style=\"color:#FF0000\">Authentication Failed!</div>");
    Display.statusB("<div style=\"color:#FF0000\">Authentication Failed!</div>");
    Display.showB();
    clearTimeout(Display.tB);
    Display.tB = setTimeout("Display.hideB();", 5000);
    //setTimeout("Player.ReturnMenu()", 2000);    
};

Player.OnNetworkDisconnected = function()
{
                //Display.status("Network Disconnected !");
    Display.status("<div style=\"color:#FF3333\">Network Disconnected!</div>");
    Display.statusB("<div style=\"color:#FF3333\">Network Disconnected!</div>");
                Display.showB();
                clearTimeout(Display.tB);
                Display.tB = setTimeout("Display.hideB();", 5000);
                //setTimeout("Player.ReturnMenu()", 2000);    
};

Player.OnStreamNotFound = function()
{
                //Display.status("Stream Not Found!");
    Display.status("<div style=\"color:#FF3333\">Stream Not Found!</div>");
    Display.statusB("<div style=\"color:#FF3333\">Stream Not Found!</div>");
                Display.showB();
                clearTimeout(Display.tB);
                Display.tB = setTimeout("Display.hideB();", 5000);
                //setTimeout("Player.ReturnMenu()", 2000);    
};
Player.changeLang = function()
{
    
    if (this.countAudio > 1) {
        
        this.currAudio++;
        //this.w = this.currAudio;
        //this.h = this.plugin.Execute('GetStreamLanguageInfo', 1, this.currAudio);
        if (this.currAudio > this.countAudio)
            this.currAudio = 0;
        this.plugin.Execute('SetStreamID', 1, this.currAudio);
        this.DispLangSA("mainAudioInfo", this.lang, this.currAudio);
        this.DispLangSA("mainSubtitleInfo", this.langS, -1);
    }
    
};
Player.onBufferingComplete = function()
{
    //Display.status("<div style=\"color:#8BB573\">Play</div>");
    Display.status("<div style=\"color:#8BB573\">Play</div>");
    Display.statusB("<div style=\"color:#8BB573\">Play</div>");
    clearTimeout(Display.tB);
    Display.tB = setTimeout("Display.hideB();", 1000);

    //if (this.lang.length == 0) {
    //    var countAudio = this.plugin.Execute('GetTotalNumOfStreamID', 1);
    //    for (var i = 0; i < countAudio; i++) {

    //        this.lang[i] = this.plugin.Execute('GetStreamLanguageInfo', 1, i);
    //    };
    //    this.countAudio = countAudio;
    //if (this.currAudio < this.countAudio)
    try
    {
        if (this.Type != "HLS" && this.lang.length == 0) {
            this.countAudio = this.plugin.Execute('GetTotalNumOfStreamID', 1);
            //this.lang = l + countAudio;
            for (var i = 0; i < this.countAudio; i++) {

                this.lang[i] = this.plugin.Execute('GetStreamLanguageInfo', 1, i);
            }
            if (this.countAudio > 0) {
                this.SetLang();
            }
        }
        if (this.Type != "HLS" && this.langS.length == 0) {
            this.countSubtitle = this.plugin.Execute('GetTotalNumOfStreamID', 4);
            for (var ii = 0; ii < this.countSubtitle; ii++) {

                this.langS[ii] = this.plugin.Execute('GetStreamLanguageInfo', 4, ii);
            }
            // this.DispLang();
            if (this.countSubtitle > 0) {

                //var nSubtitle = Player.plugin.Execute('GetTotalNumOfStreamID', 5);
                //if (nSubtitle.length > 1) {
                //    Player.plugin.Execute('StartSubtitle', '$TEMP/subtitle/subtitle.smi');
                //    Player.plugin.Execute('SetStreamID', 5, 0);
                //    Player.plugin.Execute('SetSubtitleSync', 500);    // delay subtitle event 500 millisecond
                //}

                Player.plugin.Execute('StartSubtitle', '$TEMP/subtitle/subtitle.smi');
                Player.plugin.Execute('SetStreamID', 5, 0);
                Player.plugin.Execute('SetSubtitleSync', 500);
            }
        }

        //this.DispLang();
        this.DispLangSA("mainAudioInfo", this.lang, this.currAudio);
        this.DispLangSA("mainSubtitleInfo", this.langS, -1);
        if (this.countAudio>0)
            this.plugin.Execute('SetStreamID', 1, this.currAudio);
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
            this.SetLang2(7368556);
            if (!this.oklang) { this.SetLang2(6647399) }
            if (!this.oklang) { this.SetLang2(6385255) }
            if (!this.oklang) { this.SetLang2(6579573) }
        }
    }
    catch (e) {
        Display.statusB("<div style=\"color:#8BB573\">SetLang: " + e + "</div>");
        clearTimeout(Display.tB);
        Display.tB = setTimeout("Display.hideB();", 8000);
    }
    //this.plugin.Execute('SetStreamID', 1, this.currAudio || 0);
};
Player.setCurTime = function()
{
    
    //Display.setTime(time);
};

Player.setTotalTime = function()
{
    this.GetVideoSize();


    try {

        this.GetVideoSize();
        //var l = this.lang.length + "/";
        this.countAudio = 0;
        this.countSubtitle = 0;
        this.lang = [];
        this.langS = [];
       
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
            l = this.Color("808080", "|");
            if (this.state != this.STOPPED) {

                //l = this.currAudio + "/" + this.countAudio;
                for (var i = 0; i < this.lang.length; i++) {
                    if (i == this.currAudio) {
                        l = l + this.Color("FFFFFF", Data.GetLang(this.lang[i])) + this.Color("808080", "|");
                    }
                    else {
                        l = l + Player.Color("999999", Data.GetLang(this.lang[i])) + this.Color("808080", "|");
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
            l = this.Color("808080", "|");
            if (this.state != this.STOPPED) {

                //l = this.currAudio + "/" + this.countAudio;
                for (var i = 0; i < source.length; i++) {
                    if (i == ids) {
                        l = l + this.Color("FFFFFF", Data.GetLang(source[i])) + this.Color("808080", "|");
                    }
                    else {
                        l = l + Player.Color("999999", Data.GetLang(source[i])) + this.Color("808080", "|");
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
	    var hh = this.plugin.Execute('GetVideoResolution').split("|");
	    this.h = hh[1];//.plugin.Execute('GetVideoHeight');
	    this.w = hh[0];//this.plugin.Execute('GetVideoWidth');
		
		//Main.strSize = " (" + this.w + "x" + this.h + ") ";
	    var infoA = document.getElementById("mainVideoInfo");
	    
	    widgetAPI.putInnerHTML(infoA, this.w + "x" + this.h);
	    document.getElementById("mainVideoInfo").style.display="block";
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

getBandwidth = function(bandwidth) { alert("getBandwidth " + bandwidth); };

onDecoderReady = function() { alert("onDecoderReady"); };

onRenderError = function() { alert("onRenderError"); };

stopPlayer = function()
{
    this.stopVideo();
};

setTottalBuffer = function(buffer) { alert("setTottalBuffer " + buffer); };

setCurBuffer = function(buffer) { alert("setCurBuffer " + buffer); };
