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
	tMM : 0,

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
    alert("Display alert");
    
    return success;
};



Display.status = function(status)
{
    alert(status);
    //widgetAPI.putInnerHTML(this.statusDiv, status);
    //var infoNowPlayStatus = document.getElementById("mainInfoNowStatus");
    //widgetAPI.putInnerHTML(infoNowPlayStatus, status);
    //widgetAPI.putInnerHTML(this.statusDiv, status);
};
Display.statusB = function(status)
{
    widgetAPI.putInnerHTML(this.statusDiv, status);
    var infoNowPlayStatus = document.getElementById("mainInfoNowBuff");
    widgetAPI.putInnerHTML(infoNowPlayStatus, status);
    widgetAPI.putInnerHTML(this.statusDiv, status);
};

Display.hideMM = function()
{
	var infoMM = document.getElementById("mainInfoMM");
	widgetAPI.putInnerHTML(infoMM , "");
	document.getElementById("mainInfoMM").style.display="none";
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
    document.getElementById("mainInfoNowBuff").style.display="block";
};


