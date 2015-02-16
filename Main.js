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
		selectSourceTemp : -1,

		tDesc : 0,
		tChCH : null,
		infoTic : 5000,
		isInfo :0,
		showGuide: 0,
		mxInfoNum:55,
		MXGuideNum: 55,
		infocurrNum:0,
		currentTV :null,
		aIDs : [ ],
		dIDs : [ ],
		minor: null,
		noTurn : 0,
		starting : 0,
};

Main.keyRECReg = function()
{
	pluginAPI.registKey(tvKey.KEY_PAUSE);
};
Main.keyRECUnreg = function()
{
	pluginAPI.unregistKey(tvKey.KEY_PAUSE);
};

Main.keyReg = function()
{
	pluginAPI.registKey(tvKey.KEY_TOOLS);
	//pluginAPI.registKey(tvKey.KEY_INFO);
	pluginAPI.registKey(tvKey.KEY_PAUSE);
	pluginAPI.unregistKey(tvKey.KEY_VOL_UP);
	pluginAPI.unregistKey(tvKey.KEY_VOL_DOWN);
	pluginAPI.SetBannerState(2);
	pluginAPI.registIMEKey();
};

Main.keyUnreg = function()
{
	pluginAPI.unregistKey(tvKey.KEY_TOOLS);
	//pluginAPI.unregistKey(tvKey.KEY_INFO);
	pluginAPI.unregistKey(tvKey.KEY_PAUSE);
	pluginAPI.unregistIMEKey();
};

function scroll(){ 

	if (Main.starting)
	{
		Main.selectMajor = windowplugin.GetCurrentChannel_Major();
		Main.selectMinor = windowplugin.GetCurrentChannel_Minor();
		Main.selectSource = windowplugin.GetSource();

		var emulatorTest = false;
		if (emulatorTest) {
		    Main.selectMajor = 111;
		    Main.selectMinor = 65534;
		}
		if (Main.selectMajor!=Main.selectMajorTemp || Main.selectMinor!=Main.selectMinorTemp)
		{
			try
			{
				clearTimeout(Display.tMM);
				Display.hideMM();
				
				
				var idx = null;//Data.findID(Main.selectMajor,Main.selectMinor);
				//Display.showMainInfo();
				if(Main.selectMinor==65534)
				{
					Main.minor = 1;
					idx = Main.dIDs[Main.selectMajor];
				}
				else
				{
					Main.minor = 0;
					idx = Main.aIDs[Main.selectMajor];
				}
				


				//var infoElement = document.getElementById("mainInfoLogo");
				//var infoElementT = document.getElementById("mainInfoTitle");
				
				var oko = 0;
				//if (Data.tvTypes[idx]==1 || Main.minor == 0)
				//	oko = 1;
				 
				clearTimeout(Main.tDesc);
				//Main.SetInfo(idx,oko);
				
				if (idx!=null)
				{
				    alert("OSTARTKO:::::" + idx);
					Display.hideMM();
					
					Main.hide();
					Display.hideB();
					Display.status("");
					document.getElementById("mainInfoNowTime").style.display="block";
					document.getElementById("mainInfoNowPlay").style.display="none";
					Main.noTurn = 0;
					Display.show();
					Main.currentTV = idx;
					Player.stopVideo();
					if(Data.tvTypes[idx]==1)
					{
						alert("start RUN");
						windowplugin.SetSource(43);
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

Main.SetInfo = function(idx,oko)
{
	
	var infoElement = document.getElementById("mainInfoLogo");
	var infoElementT = document.getElementById("mainInfoTitle");
	var t = "";
	var l = "";
	if (Main.noTurn==0)
	{
		var imgXY = 80;
		t = "<h1>"+ Data.videoNames[Data.tvIdxURLs[idx]] + "</h>";
		l = "<img src=\""+Data.getVideoImages(Data.tvIdxURLs[idx])+ "\" style=\"max-height:"+imgXY+"px;\"" + "\"></img>";
		
		//var desc = Data.getVideoDescription(Data.tvIdxURLs[idx]);
		//if(desc.substring(0,4)=="http")
		//	{
		//		Main.getDescInHttp(desc,oko);
		//		document.getElementById("mainInfoNowPlay").style.display="block";
		//	}
		//else
		//	{
		//	   var d = " | | | | | ";
			   
		//	   Main.setInfoNowPlay(d,oko);
		//	   //document.getElementById("mainInfoTimePBarSolid").style.display="none";
		//	   document.getElementById("mainInfoNowPlay").style.display="none";
		//	}


		
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
//	var sDesc = Main.selectMajor;
//	var req = new XMLHttpRequest();

//	var i = 0;
//	req.onreadystatechange = function (aEvt) {

//		if(sDesc!=Main.selectMajor)
//		{
//			req.abort();

//			alert("Canceled description for video:" + sDesc);
//			i = 1;
//			return;

//		}
//		if (req.readyState == 4) {
//			if(req.status == 200)
//			{
//				description = req.responseText;
				
//				Main.setInfoNowPlay(description,oko);
//			}

//			else	
//			{
//				alert("Error loading page\n");
//			}
//		}
//	};
//	if(i==1)
//		return;
//	req.open("GET", description+"?nowtime", true);
//	req.send(null);
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
Main.DispGuide = function(idx)
{
	alert(":::::::::::::" +idx);
	if(this.showGuide==1)
	{
		var infoElement = document.getElementById("guideMainInfoCont");

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
	widgetAPI.putInnerHTML(infoNowPlayNext, "Następne: " + n[4]);
	
	document.getElementById("mainInfoNowPlay").style.display="block";
	document.getElementById("mainInfoTimePBarSolid").style.display="block";
	if (oko==1)
		{
		Main.setInfoNowPlay2(desc);
		}
};
Main.setInfoNowPlay2 = function(desc)
{

	var n=desc.split("|"); 

	
	if(n[1]>100)
		n[1]=100;
	var d = n[2];
	var i = 40;
	if (d.length>i)
	{
		d = d.substring(0,i-3) + "...";
	}	
	
	Display.tMM = setTimeout("Display.hideMM();", 3300);
	var infoMM = document.getElementById("mainInfoMM");
	widgetAPI.putInnerHTML(infoMM , d);
	
	document.getElementById("mainInfoMM").style.display="block"; 

};
Main.setWindowMode = function()
{

	Display.show();

	Player.setWindow();

};

Main.onLoad = function()
{
	alert(":0");
	if (Server.init() && Player.init() && Display.init()) {


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
	        //window.setInterval(function () { Main.CheckingRegKey(31) }, 1500);
               
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
	    Server.hh(null);
		//Main.SetTime();

		Main.keyRECReg();
		alert("Main.onLoad");
		//tvObject.SetEvent(113);
		tvObject.SetEvent(113);
		tvObject.OnEvent = OnEvent;
		//document.getElementById("welcome").innerHTML = windowplugin.GetCurrentChannel_Major() + "-"+windowplugin.GetCurrentChannel_Minor();
		//Main.hide();
		widgetAPI.sendReadyEvent();
		//scroll();


		//Main.show();

	}
	else
	{
		alert("Failed to initialise");
	}


};

function OnEvent(e) {

	var oo = windowplugin.GetCurrentChannel_Major() + "-"+windowplugin.GetCurrentChannel_Minor();
	alert("oko: "+oo);
	//document.getElementById("welcome").innerHTML = "Channel: " + oo;
	//switch (parseInt(e)) {
	//case 113:
	//    alert(windowplugin.GetCurrentChannel_ProgramNumber());
	//   scroll();
	//   break;
	// }
}
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
	windowplugin.SetSource(2);

	
	
	
	Main.tChCH = setTimeout("Main.ChageChannel();", 1500);
	appCom.SendKeyToTVViewer(id);
	
	Main.keyReg();
};
Main.keyDown = function()
{ 
	// Key handler 
	var keyCode = event.keyCode;
	alert("Key Pressed = "+keyCode);


	switch (keyCode)
	{

	case tvKey.KEY_INFO:
    {
		//widgetAPI.blockNavigation(event);

//your code
        break;
    }   
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
	case tvKey.KEY_PAUSE:
		if (windowplugin.GetSource()==2)
			{
				Main.SetKey(1129);
				widgetAPI.sendReturnEvent();
				Main.SetKey(1129);
			}
		break;
		/*

            case tvKey.KEY_UP:
            Main.loadList();
            break;

            case tvKey.KEY_DOWN:
            Main.update_File();
            break;

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
		break;
    case tvKey.KEY_RED:
	        
	        break;
	case tvKey.KEY_YELLOW://KEY_EXIT:
		//alert("hide");
		//widgetAPI.sendExitEvent();
		//Main.hide();
		clearTimeout(Display.tMM);
		Display.hideMM();
		Player.GetVideoSize();
		Main.toggleDispInfoMode();
		Main.DispGuide(Main.currentTV);
		break;

	case tvKey.KEY_GREEN://KEY_EXIT:
		alert("show");
		//document.getElementById("welcome").innerHTML = windowplugin.GetCurrentChannel_Major() + "-"+windowplugin.GetCurrentChannel_Minor();
		//widgetAPI.sendExitEvent();
		clearTimeout(Display.tMM);
		Display.hideMM();
		if (Main.isInfo)
		{
			Main.hide();
		}
		else
		{
			Player.GetVideoSize();
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
	widgetAPI.sendReturnEvent();
};
function DateFmt(fstr) {
	this.formatString = fstr;

	var mthNames = ["01","02","03","04","05","06","07","08","09","10","11","12"];
	var dayNames = ["Niedz.","Pn.","Wt.","Śr.","Czw.","Pt.","Sob."];
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
}

window.onkeydown = Main.keyDown;