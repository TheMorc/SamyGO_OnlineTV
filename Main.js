var widgetAPI = new Common.API.Widget();
var tvKey = new Common.API.TVKeyValue();
var pluginAPI = new Common.API.Plugin();




var Main = 
{
		selectMajor : -1,
		selectMajorTemp : -1,
		selectMinor : -1,
		selectMinorTemp : -1,
		selectSource : -1,
		selectSourceTemp: -1,
        
		exitState: -1,

		tDesc : 0,
		tReset: 0,
		tStop: 0,
		tChCH : null,
		infoTic : 5000,
		isInfo :0,
		showGuide: 0,
		showS: 0,
		showST: 0,
		mxInfoNum:55,
		MXGuideNum: 55,
		infocurrNum: 0,
		currentTVTemp: 0,
		currentTV :null,
		aIDs : [ ],
		dIDs : [ ],
		minor: null,
		noTurn : 0,
		starting: 0,
		tvObject: null,
		appid: 0,
};

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

Main.keyReg = function()
{
	//pluginAPI.registKey(tvKey.KEY_TOOLS);
	//pluginAPI.registKey(tvKey.KEY_INFO);
	pluginAPI.registKey(tvKey.KEY_PAUSE);
	pluginAPI.unregistKey(tvKey.KEY_VOL_UP);
	pluginAPI.unregistKey(tvKey.KEY_VOL_DOWN);
	pluginAPI.SetBannerState(2);
	pluginAPI.registKey(tvKey.KEY_SUBT);
	pluginAPI.registIMEKey();
	Main.keyRECReg();
	//pluginAPI.unregistKey(tvKey.KEY_INFOLINK);

	//pluginAPI.unregistKey(tvKey.KEY_WLINK);

	//pluginAPI.unregistKey(tvKey.KEY_CONTENT);
};

Main.keyUnreg = function()
{
    pluginAPI.unregistKey(tvKey.KEY_SUBT);
	pluginAPI.unregistKey(tvKey.KEY_TOOLS);
	//pluginAPI.unregistKey(tvKey.KEY_INFO);
	pluginAPI.unregistKey(tvKey.KEY_PAUSE);
	
	pluginAPI.unregistIMEKey();
	Main.keyRECUnreg();

    //pluginAPI.registKey(tvKey.KEY_INFOLINK);	
    //pluginAPI.registKey(tvKey.KEY_WLINK);	
    //pluginAPI.registKey(tvKey.KEY_CONTENT);	
};
Main.GetIDs = function ()
{
    var idx = null;//Data.findID(Main.selectMajor,Main.selectMinor);
    //Display.showMainInfo();
    if (Main.selectMinor == 65534) {
        Main.minor = 1;
        idx = Main.dIDs[Main.selectMajor];
    }
    else {
        Main.minor = 0;
        idx = Main.aIDs[Main.selectMajor];
    }
    return idx;
}
function scroll(){ 


	//Display.show();
	if (Main.starting)
	{
		Main.selectMajor = windowplugin.GetCurrentChannel_Major();
		Main.selectMinor = windowplugin.GetCurrentChannel_Minor();
		Main.selectSource = windowplugin.GetSource();


		if (Main.selectMajor!=Main.selectMajorTemp || Main.selectMinor!=Main.selectMinorTemp)
		{
			try
			{
			    document.getElementById("mainInfoMM").style.display = "none";
				clearTimeout(Display.tMM);
				Display.hideMM();
				
				
				


				//var infoElement = document.getElementById("mainInfoLogo");
				//var infoElementT = document.getElementById("mainInfoTitle");
				
				var oko = 0;
				var idx = Main.GetIDs();
				if (Data.tvTypes[idx]==1 || Main.minor == 0)
					oko = 1;
				 
				clearTimeout(Main.tDesc);
				
				Main.SetInfo(idx, oko);
				
				
				if (idx!=null)
				{
					
					
					Main.hide();
					Display.hideB();
					Display.status("");
					document.getElementById("mainInfoNowTime").style.display="block";
					document.getElementById("mainInfoNowPlay").style.display = "none";

					Main.noTurn = 0;
					Display.show();
					Main.currentTV = idx;
					Player.stopVideo();
					//Player.deinit();
					if(Data.tvTypes[idx]==1)
					{
						alert("start RUN");
						windowplugin.SetSource(43);
						//Player.init();
						Player.setVideoURL( Data.getVideoURL(Data.tvIdxURLs[idx]),Data.getVideoTypes(Data.tvIdxURLs[idx]));
						Player.playVideo(windowplugin.GetScreenRect());
						Display.hide();
						alert("ok RUN");

						Main.keyReg();

					}
					else
					{
						Main.keyUnreg();
						windowplugin.SetSource(0);
						Display.hide();
					}

					Main.selectMajorTemp = Main.selectMajor;
					Main.selectMinorTemp = Main.selectMinor;
					Main.selectSourceTemp = Main.selectSource;

					alert("OKO");
					
					
					//Main.show();

				}
				else
				{
					//if(Main.noTurn==0)
					//{
						document.getElementById("mainInfoNowTime").style.display="none";
						Main.noTurn = 1;
						Display.status("");
						Main.SetInfo(1,0);
						Display.showMainInfo();
						Main.isInfo = 1;
						Main.tDesc = setTimeout("Main.hide();", 5000);
						
						Main.selectMajorTemp = Main.selectMajor;
						Main.selectMinorTemp = Main.selectMinor;
						Main.selectSourceTemp = Main.selectSource;
					//}
				}
			}
			catch(e)
			{
				alert(e);
			}
		}
	}
}

Main.SetInfo =  function(idx,oko)
{
	
	var infoElement = document.getElementById("mainInfoLogo");
	var infoElementT = document.getElementById("mainInfoTitle");
	var t = "";
	var l = "";
	if (Main.noTurn==0)
	{
		var imgXY = 80;
		t = "<h1>" + Data.videoTVID[Data.tvIdxURLs[idx]] + "<b style=\"color:#7BC3F8\"> " + Data.videoNames[Data.tvIdxURLs[idx]] + "</b></h1>";
		//t = "<h1><font color=\"#7BC3F8\">" + Data.videoTVID[Data.tvIdxURLs[idx]] + "</font> " + Data.videoNames[Data.tvIdxURLs[idx]] + "</h1>"; 
		l = "<img src=\""+Data.getVideoImages(Data.tvIdxURLs[idx])+ "\" style=\"max-height:"+imgXY+"px;\"" + "\"></img>";
		
		var desc = Data.getVideoDescription(Data.tvIdxURLs[idx]);
		if(desc.substring(0,4)=="http")
			{
				Main.getDescInHttp(desc,oko);
				document.getElementById("mainInfoNowPlay").style.display="block";
			}
		else
			{
			   var d = " | | | | | ";
			   
			   Main.setInfoNowPlay(d,0);
			   //document.getElementById("mainInfoTimePBarSolid").style.display="none";
			   document.getElementById("mainInfoNowPlay").style.display="none";
			}


		
	}
	else
	{
		document.getElementById("mainInfoNowPlay").style.display="none";
		l = "<h1>Channel empty...</h1>";
		Display.status("");
	}

	widgetAPI.putInnerHTML(infoElementT, t);
	widgetAPI.putInnerHTML(infoElement, l);


};
Main.getDescInHttp = function(description,oko)
{
    //description from external server
	var sDesc = Main.selectMajor;
	var req = new XMLHttpRequest();

	var i = 0;
	req.onreadystatechange = function (aEvt) {

		if(sDesc!=Main.selectMajor)
		{
			req.abort();

			alert("Canceled description for video:" + sDesc);
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
				alert("Error loading page\n");
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
		this.showGuide=0;
	}
};
Main.toggleDispS = function()
{
    
	if (Main2.arrCategryList!=null)
		
	if(Main.showS==0)
	{
	    
		clearTimeout(Display.tMM);
		Display.hideMM();
		Main.hide();
		Main2.getSpecies();
		Main.showS=1;
		alert("GO!");
		
		Server.dataReceivedCallbackS = function()
		{
			
		   Display.showS();
		   alert("Load!");
		   Main2.setSpecies();
		   Main2.setCatList(Main2.categoryIdx);
		   Server.dataReceivedCallbackS = null;
		   var idx = Main.GetIDs();
		   if (idx != null) {
		       Main.currentTV = idx;
		   Main.currentTVTemp = Main.currentTV;
		   }
		};
		
	}
	else
	{
		Display.hideS();
		Main.showS = 0;
		Main.currentTV = Main.currentTVTemp;
	}
};
Main.DispGuide = function(idx)
{
	alert(":::::::::::::" +idx);
	if(this.showGuide==1)
	{
		var infoElement = document.getElementById("guideMainInfoCont");
	    // description from external server 
		var desc = Data.getVideoDescription(Data.tvIdxURLs[idx]);
		if(desc.substring(0,4)=="http")
		{
			widgetAPI.putInnerHTML(infoElement, Player.httpGetNoSync(desc+"/"+this.infocurrNum));
			this.mxInfoNum =this.MXGuideNum;
		}
		else
		{
			widgetAPI.putInnerHTML(infoElement, "<h1>"+ Data.videoNames[Data.tvIdxURLs[idx]] + "</h1></p>Description empty...");
			this.mxInfoNum=0;
		}
		//if(Main.isInfo==0)
			Main.hide();
		Main.show();

		document.getElementById("guideMainInfo").style.display="block";

	}
	else
	{
		this.showGuide = 0;
		this.infocurrNum = 0;
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
	
	
	

	if(n[1]>100)
		n[1]=100;
	widgetAPI.putInnerHTML(infoNowPlayTimeStr, n[0]);
	document.getElementById("mainInfoTimePBarSolid").style.width =  n[1] + "%";
	widgetAPI.putInnerHTML(infoNowPlayTitle, n[2]);
	widgetAPI.putInnerHTML(infoNowPlaySpecies, n[3]);
	widgetAPI.putInnerHTML(infoNowPlayNext, "Next: " + n[4]);
	
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

	
	document.getElementById("mainInfoMM").style.display = "block";
	Display.tMM = setTimeout("Display.hideMM();", 3300);

};
Main.setWindowMode = function()
{

	Display.show();

	Player.setWindow();

};

Main.onLoad = function()
{


    //var script = document.createElement("script");
    //script.setAttribute("type", "text/javascript");
    //script.setAttribute("src", "$MANAGER_WIDGET/Common/webapi/1.0/webapis.js");    // use this for linked script
    ////script.setAttribute("text","");               // use this for inline script
    //document.getElementsByTagName("head")[0].appendChild(script);

    var oSpan = document.createElement("span");
    document.body.appendChild(oSpan);
    ///widgetAPI.putInnerHTML(infoElementT, t);
    //TEST
    oSpan.innerHTML = '<object id="PluginSefTV" border="0" classid="clsid:SAMSUNG-INFOLINK-SEF" style="opacity:0.0; background-color:#000000; width:300px; height:100px;"> </object>';
    //if (webapis.smarthome.init() == true) {
        alert(":0");
        if (Server.init() && Player.init() && Display.init() && Data.init()) {


            Player.stopCallback = function () {
                /* Return to windowed mode when video is stopped
                        (by choice or when it reaches the end) */
                Main.setWindowMode();
            };
            alert(":1");
            Server.dataReceivedCallback = function () {
                /* Use video information when it has arrived */
                alert(":2");
                //Server.dataReceivedCallbackTV = function()
                //{
                //Data.getVideoNames();
                Main.starting = 1;
                alert(Main.dIDs);
                alert("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
                for (var index = 0; index < Main.aIDs.length; index++) {
                    alert(Data.videoNames[Main.aIDs[index]]);
                }

                window.setInterval(function () { scroll() }, 100);
                window.setInterval(function () { UpdateTime() }, 1000);
                alert(":3");
                //Server.dataReceivedCallbackS = function()
                //{
                //  alert("speciesz1!!!!!!!!!");
                //  Server.dataReceivedCallbackS = null;
                //};
                //Server.hh("species");
                Server.dataReceivedCallback = null;
                //};
                //Server.tv(null);//fetchVideoList(); /* Request video information from server */
                //Main.updateCurrentVideo();
            };
            Server.hh(null);//fetchVideoList(); /* Request video information from server */
            Display.hideS();
            //Main.SetTime();

            //Main.keyRECReg();
            alert("Main.onLoad");
            //TEST
            Main.tvObject = document.getElementById("PluginSefTV");
            Main.tvObject.Open('TaskManager', '1.002', 'TaskManager');
            
            //Main.tvObject = document.getElementById("PluginSefTV");
            //Main.tvObject.Open('TV', '1.001', 'TV');
            //////this.tvObject = document.getElementById("tvObject");
            //Main.tvObject.Execute('SetEvent', 103);
            //Main.tvObject.Execute('SetEvent', 113);
            //Main.tvObject.OnEvent = 'this.OnEvent';

            //tvObject.SetEvent(113);
            //this.tvObject = document.getElementById("tvObject");
            //this.tvObject.SetEvent(103);
            //this.tvObject.SetEvent(113);
            //this.tvObject.OnEvent = 'this.OnEvent';
            //document.getElementById("welcome").innerHTML = windowplugin.GetCurrentChannel_Major() + "-"+windowplugin.GetCurrentChannel_Minor();
            //Main.hide();
            widgetAPI.sendReadyEvent();
            //pluginAPI.registFullWidgetKey();
            //pluginAPI.unregistKey(tvKey.KEY_PLAY);
            //scroll();


            //Main.show();

        }
        else {
            alert("Failed to initialise");
        }
    //}

};
function OnEvent(id) {
    switch (parseInt(id)) {
        case 103:
            {
                //UpdateChannelData();
                break;
            }
        case 113:
            {
                widgetAPI.sendExitEvent();
                //Main.DispGuide(Main.currentTV);
                //Main.SetInfo(Main.currentTV, 0);
                //Main.show();
                //UpdateProgramData();
                break;
            }
    }
}
//function OnEvent(e) {

	//var oo = windowplugin.GetCurrentChannel_Major() + "-"+windowplugin.GetCurrentChannel_Minor();
	//alert("oko: "+oo);
	//document.getElementById("welcome").innerHTML = "Channel: " + oo;
	//switch (parseInt(e)) {
	//case 113:
	//    alert(windowplugin.GetCurrentChannel_ProgramNumber());
	//   scroll();
	//   break;
	// }
//}
Main.ChageChannel= function()
{
	
	Main.selectMinorTemp = -1;
	//Main.selectSource = -1;
	Main.selectSourceTemp = -1;
	//Main.keyReg();
};
Main.SetKey = function(id)
{	
	
	clearTimeout(Main.tChCH);
	Main.keyUnreg();
	
  //Main.selectMajor = -1;
	//Main.selectMajorTemp = -1;
	//Main.selectMinor = -1;
	//Main.selectMinorTemp = -1;
	//Main.selectSource = -1;
	//Main.selectSourceTemp = -1;
	windowplugin.SetSource(0);
	windowplugin.SetSource(3);

	
	
	
	Main.tChCH = setTimeout("Main.ChageChannel();", 1500);
	appCom.SendKeyToTVViewer(id);
	
	
};
Main.keyDown = function()
{
    document.getElementById("mainInfoMM").style.display = "none";
    clearTimeout(Display.tMM);
	// Key handler 
	var keyCode = event.keyCode;
	alert("Key Pressed = "+keyCode);
    //Display.status("Key Pressed = " + keyCode);
	//widgetAPI.putInnerHTML(document.getElementById("mainSubtitleInfo"), "KEY: " + keyCode);
	//document.getElementById("mainSubtitleInfo").style.display = "block";


	switch (keyCode)
	{
	    case tvKey.KEY_TOOLS:

	        widgetAPI.blockNavigation(event);
	        break;
	case tvKey.KEY_INFO:
 
		//widgetAPI.blockNavigation(event);

	    break;
	    case tvKey.KEY_SOURCE:

	        widgetAPI.blockNavigation(event);

	        break;

	case tvKey.KEY_0:
		Main.SetKey(17);
		break;
	case tvKey.KEY_1:
		Main.SetKey(101);
		break;
	case tvKey.KEY_2:
		Main.SetKey(98);
		break;
	case tvKey.KEY_3:
		Main.SetKey(6);
		break;
	case tvKey.KEY_4:
		Main.SetKey(8);
		break;
	case tvKey.KEY_5:
		Main.SetKey(9);
		break;
	case tvKey.KEY_6:
		Main.SetKey(10);
		break;
	case tvKey.KEY_7:
		Main.SetKey(12);
		break;
	case tvKey.KEY_8:
		Main.SetKey(13);
		break;
	case tvKey.KEY_9:
		Main.SetKey(14);
		break;
	case tvKey.KEY_PRECH:
		Main.SetKey(259);
		break; 
	case tvKey.KEY_TOOLS:
		Main.SetKey(115);
		break;
	    case tvKey.KEY_PLAY:
	        //appCom.SendKeyToTVViewer(12);
	        //Player.resumeVideo();
	        break;
	    case tvKey.KEY_PAUSE:
	        Player.pauseVideo();
		//if (windowplugin.GetSource()==2)
		//	{
		//		Main.SetKey(1129);
		//		widgetAPI.sendReturnEvent();
		//		Main.SetKey(1129);
		//	}
		break;
	case tvKey.KEY_ENTER:
		if(Main.showS)
		{
		    
		Player.stopVideo();
			var chan =  Main2.arrTVID[Main2.categoryIdxC][Main2.articleIdx];
			var so = chan.substring(0,1);
			chan = chan.substring(1,chan.length);
			var CH;
			//alert(Main.dIDs);
			alert("Enter chan: " + chan);
			alert("Enter so: " + so);
			var minor;
			//var plugin = document.getElementById("windowplugin");
			if (so == "d")
				{
					//windowplugin.SetSource(0);
					//windowplugin.SetSource(3);
				  CH = Main.dIDs[chan];
				  minor = 65534;
				}
			else
				{
				//windowplugin.SetSource(0);
				//windowplugin.SetSource(2);
				minor= 1;
				CH = Main.aIDs[chan];
				}
			Main.toggleDispS();
		    //Main2.blurTitle(Main2.titleIdx);
			windowplugin.SetChannel(parseInt(chan),parseInt(minor));
			
			alert("Enter channel: " + Data.videoNames[Data.tvIdxURLs[CH]]);
			
		}
		break;
            case tvKey.KEY_UP:
            	
            break;

            case tvKey.KEY_DOWN:
            	
            break;
/*
            case tvKey.KEY_RETURN:
            alert("RETURN");
            event.preventDefault();
            Main.update_File();
            widgetAPI.sendReturnEvent();
            break;
		 */
	case tvKey.KEY_LEFT:
		alert("KEY_LEFT");
		if(Main.showGuide==1)
		{
			if(Main.infocurrNum>0)
				Main.infocurrNum--;
			Main.DispGuide(Main.currentTV);
		}
		else
		{
			Main.infocurrNum=0;
		}
		if(Main.showS)
		{
			alert("shows_L");
			
		}
		break;
	case tvKey.KEY_RIGHT:
		alert("KEY_RIGHT");
		if(Main.showGuide==1)
		{
			if(Main.infocurrNum<Main.mxInfoNum)
				Main.infocurrNum++;
			Main.DispGuide(Main.currentTV);
		}
		else
		{
			Main.infocurrNum=0;
		}
		if(Main.showS)
		{
			alert("shows_R");
			
		}
		break;
	    case tvKey.KEY_RED:
            
	        break;
	    case 652: //
	        widgetAPI.blockNavigation(event);
	        Player.changeLang();
	        Display.status("subtitles: " + Player.countSubtitle);
	        break;
	case tvKey.KEY_YELLOW://KEY_EXIT:
		//alert("hide");
		//widgetAPI.sendExitEvent();
		//Main.hide();
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
		Main.SetInfo(Main.currentTV, 0);
		Main.DispGuide(Main.currentTV);
		
		break;
	    case tvKey.KEY_EXIT:
	        widgetAPI.blockNavigation(event);
	        Main.exitState++;
	        if(Main.exitState > 0)
	        {
	            event.preventDefault();
	            widgetAPI.sendExitEvent();
	            //widgetAPI.sendReturnEvent();
	        }
	        break;
	    case tvKey.KEY_RETURN:
	        widgetAPI.blockNavigation(event);
	        break;
	case tvKey.KEY_GREEN://KEY_EXIT:
		alert("show");
		//document.getElementById("welcome").innerHTML = windowplugin.GetCurrentChannel_Major() + "-"+windowplugin.GetCurrentChannel_Minor();
		//widgetAPI.sendExitEvent();
		clearTimeout(Display.tMM);
		Display.hideB();
		Display.hideMM();
		if (Main.isInfo)
		{
			Main.hide();
		}
		else
		{
		   // Player.GetVideoSize();
			Main.SetInfo(Main.currentTV,0);
			Main.show();
		}
		
		
		
		break;
	    case tvKey.KEY_BLUE:
	        
	       
	        break;

	case tvKey.KEY_CH_UP:
	case tvKey.KEY_CH_DOWN://KEY_EXIT:
		alert("UP/DOWN");
		//document.getElementById("welcome").innerHTML = windowplugin.GetCurrentChannel_Major() + "-"+windowplugin.GetCurrentChannel_Minor();
		break;
		
	} 


};
Main.ResetChannel = function()
{
    Main.selectMajorTemp = -1;
    Main.selectMinorTemp = -1;
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
	if(!Main.showGuide)
		Main.tDesc = setTimeout("Main.hide();", Main.infoTic);

};
Main.onUnload = function()
{
    alert("Main.onUnload");
    Player.deinit();
    //Main.tvObject.Execute('UnsetEvent', 103);
    //Main.tvObject.Execute('UnsetEvent', 113);
    Main.tvObject.Close();
	widgetAPI.sendReturnEvent();
};
function DateFmt(fstr) {
	this.formatString = fstr;

	var mthNames = ["01","02","03","04","05","06","07","08","09","10","11","12"];
	var dayNames = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat" ];
	var zeroPad = function(number) {
		return ("0"+number).substr(-2,2);
	};

	var dateMarkers = {
			d:['getDate',function(v) { return zeroPad(v);}],
			m:['getMonth',function(v) { return zeroPad(v+1);}],
			n:['getMonth',function(v) { return mthNames[v]; }],
			w:['getDay',function(v) { return dayNames[v]; }],
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
Main.SetTime = function()
{
	setInterval ("Main.UpdateTime();", 1000 );
};
function UpdateTime()
{
	fmt = new DateFmt("%w, %d.%n.%y - %H:%M:%S");
	nowTime  = fmt.format(new Date());
	//alert("!!!!!!!!!!!!!tick!!!!!!!!!!!");
	//alert(nowTime);
	//var nowTimeElement = document.getElementById("nowTime");
	//widgetAPI.putInnerHTML(nowTimeElement, nowTime);

	var mainInfoNowTimeElement = document.getElementById("mainInfoNowTime");
	widgetAPI.putInnerHTML(mainInfoNowTimeElement, nowTime);
	if (Main.exitState > -1)
	{
	    setTimeout("Main.exitState = -1;", 5000);
	}


}

window.onkeydown = Main.keyDown;