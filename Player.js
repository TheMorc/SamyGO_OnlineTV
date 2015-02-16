var Player =
{
    plugin : null,
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
};

Player.init = function()
{
    var success = true;
          alert("success vale :  " + success);    
    this.state = this.STOPPED;
    
    this.plugin = document.getElementById("pluginPlayer");
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
    
    this.plugin.OnCurrentPlayTime = 'Player.setCurTime';
    this.plugin.OnStreamInfoReady = 'Player.setTotalTime';
    this.plugin.OnBufferingStart = 'Player.onBufferingStart';
    this.plugin.OnBufferingProgress = 'Player.onBufferingProgress';
    this.plugin.OnBufferingComplete = 'Player.onBufferingComplete';           
    
    this.plugin.OnConnectionFailed = 'Player.OnConnectionFailed';
    this.plugin.OnNetworkDisconnected = 'Player.OnNetworkDisconnected';
    this.plugin.OnStreamNotFound = 'Player.OnStreamNotFound';
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
            this.plugin.Stop();
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
    this.plugin.SetDisplayArea(0, 0, 960, 540);
};

Player.setFullscreen = function()
{
    this.plugin.SetDisplayArea(0, 0, 960, 540);
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
        Display.statusB("Loading...");
        clearTimeout(Display.tB);
        Display.tB = setTimeout("Display.hideB();", 3200);
       
        this.setWindow();
        //Display.show();
        switch (this.Type)
        {
         
	       
	        case "HLS":
	        	this.url = this.url+"|COMPONENT=HLS";
	        	break;
	        default:
	        	//this.plugin.Play( this.url );
	        	break;
	        
	      
        }
        switch   (this.mode)
        {
        	case 0:
        		alert(this.url);
        		this.plugin.Play( this.url );
        		alert("PLAY!!!!");
        		break;
        	case 1:
        		this.screen.Set3DEffectMode(2);
        		this.plugin.Stop();
        		this.plugin.InitPlayer(this.url);        
        		this.plugin.SetDisplayArea(type.left,type.top,type.width,type.heigth);//(0, 0, 960, 540);        
        		this.plugin.SetPlayerProperty(2, "3", 1);
        		this.plugin.StartPlayback();
        		break;
        	default:
        }
        //this.plugin.Play( this.url );
       // Audio.plugin.SetSystemMute(false); 
    }
};

Player.pauseVideo = function()
{
    this.state = this.PAUSED;
    document.getElementById("play").style.opacity = '1.0';
    document.getElementById("stop").style.opacity = '1.0';
    document.getElementById("pause").style.opacity = '0.2';
    document.getElementById("forward").style.opacity = '0.2';
    document.getElementById("rewind").style.opacity = '0.2';
    //Display.status("Pause");
    this.plugin.Pause();
};

Player.stopVideo = function()
{
    if (this.state != this.STOPPED)
    {
    	Display.hide();
    	document.getElementById("mainAudioInfo").style.display="none";
        this.state = this.STOPPED;
        /*
        document.getElementById("play").style.opacity = '1.0';
        document.getElementById("stop").style.opacity = '0.2';
        document.getElementById("pause").style.opacity = '0.2';
        document.getElementById("forward").style.opacity = '0.2';
        document.getElementById("rewind").style.opacity = '0.2';
         */
        //Display.status("");

        this.plugin.Stop();
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
    document.getElementById("play").style.opacity = '0.2';
    document.getElementById("stop").style.opacity = '1.0';
    document.getElementById("pause").style.opacity = '1.0';
    document.getElementById("forward").style.opacity = '1.0';
    document.getElementById("rewind").style.opacity = '1.0';
    //Display.status("Play");
    this.plugin.Resume();
};

Player.skipForwardVideo = function()
{
    this.skipState = this.FORWARD;
    this.plugin.JumpForward(5);    
};

Player.skipBackwardVideo = function()
{
    this.skipState = this.REWIND;
    this.plugin.JumpBackward(5);
};

Player.getState = function()
{
    return this.state;
};

// Global functions called directly by the player 

Player.onBufferingStart = function()
{

	Display.showB();
	//Display.statusB("Buffering...");
    Display.status("Buffering...");
    switch(this.skipState)
    {
        case this.FORWARD:
            document.getElementById("forward").style.opacity = '0.2';
            break;
        
        case this.REWIND:
            document.getElementById("rewind").style.opacity = '0.2';
            break;
    }
};

Player.onBufferingProgress = function(percent)
{
	Display.showB();
	Display.statusB("Buffering:" + percent + "%");
    //Display.status("Buffering:" + percent + "%");
};
Player.OnConnectionFailed = function()
{
                //Display.status("Connection Failed !");
                Display.statusB("Connection Failed !");
                Display.showB();
                clearTimeout(Display.tB);
                Display.tB = setTimeout("Display.hideB();", 5000);
                //setTimeout("Player.ReturnMenu()", 2000);    
};

Player.OnNetworkDisconnected = function()
{
                //Display.status("Network Disconnected !");
                Display.statusB("Network Disconnected !");
                Display.showB();
                clearTimeout(Display.tB);
                Display.tB = setTimeout("Display.hideB();", 5000);
                //setTimeout("Player.ReturnMenu()", 2000);    
};

Player.OnStreamNotFound = function()
{
                //Display.status("Stream Not Found!");
                Display.statusB("Stream Not Found!");
                Display.showB();
                clearTimeout(Display.tB);
                Display.tB = setTimeout("Display.hideB();", 5000);
                //setTimeout("Player.ReturnMenu()", 2000);    
};
Player.onBufferingComplete = function()
{

	
    //Display.status("Play");
    clearTimeout(Display.tB);
    Display.tB = setTimeout("Display.hideB();", 1000);
    //var PlayerEmp = document.getElementById('PluginSef');
    //var countAudio;
    //countAudio = this.plugin.totalNumOfAudio;

    //alert('Total audio tracks: ' + countAudio);
    //var l = countAudio+ ": ";
    //for (var i = 0; i < countAudio; i++) {

    	//l =  l + this.plugin.GetStreamLanguageInfo(1,i) + ", ";

    //};
    //var audio= PlayerEmp.Execute('GetStreamLanguageInfo', 1,0);
    Player.GetVideoSize();

    
    switch(this.skipState)
    {
        case this.FORWARD:
            document.getElementById("forward").style.opacity = '1.0';
            break;
        
        case this.REWIND:
            document.getElementById("rewind").style.opacity = '1.0';
            break;
    }
};

Player.setCurTime = function(time)
{
    //Display.setTime(time);
};

Player.setTotalTime = function()
{
    //Display.setTotalTime(Player.plugin.GetDuration());
    
    //setTimeout("Player.GetVideoSize()", 200); 
};

Player.GetVideoSize = function()
{  
	if(this.state!= this.STOPPED)
	{	
		this.h= this.plugin.GetVideoHeight();
		this.w= this.plugin.GetVideoWidth();
		
		//Main.strSize = " (" + this.w + "x" + this.h + ") ";
	    var infoA = document.getElementById("mainAudioInfo");
	    
	    widgetAPI.putInnerHTML(infoA, this.w + "x" + this.h);
	    document.getElementById("mainAudioInfo").style.display="block";
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
    Player.stopVideo();
};

setTottalBuffer = function(buffer) { alert("setTottalBuffer " + buffer); };

setCurBuffer = function(buffer) { alert("setCurBuffer " + buffer); };
