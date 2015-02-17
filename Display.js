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


Display.statusS = function (status) {
    alert(status);
    //widgetAPI.putInnerHTML(this.statusDiv, status);
    var infoNowPlayStatus = document.getElementById("mainSubtitleInfo"); //("mainStatusInfo");
    widgetAPI.putInnerHTML(infoNowPlayStatus, status);
    //widgetAPI.putInnerHTML(this.statusDiv, status);
    //widgetAPI.putInnerHTML(this.statusDiv, status);
    //var infoNowPlayStatus = document.getElementById("mainInfoNowStatus");
    //widgetAPI.putInnerHTML(infoNowPlayStatus, status);
    //widgetAPI.putInnerHTML(this.statusDiv, status);
};
Display.status = function(status)
{
    alert(status);
    //widgetAPI.putInnerHTML(this.statusDiv, status);
    var infoNowPlayStatus = document.getElementById("mainStatusInfo");
    widgetAPI.putInnerHTML(infoNowPlayStatus, status);
    //widgetAPI.putInnerHTML(this.statusDiv, status);
    //widgetAPI.putInnerHTML(this.statusDiv, status);
    //var infoNowPlayStatus = document.getElementById("mainInfoNowStatus");
    //widgetAPI.putInnerHTML(infoNowPlayStatus, status);
    //widgetAPI.putInnerHTML(this.statusDiv, status);
};
Display.statusB = function(status)
{
    //widgetAPI.putInnerHTML(this.statusDiv, status);
    var infoNowPlayStatus = document.getElementById("mainInfoNowBuff");
    widgetAPI.putInnerHTML(infoNowPlayStatus, status);
    //widgetAPI.putInnerHTML(this.statusDiv, status);
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

Display.hideStat = function ()
{
    document.getElementById("mainStatusInfo").style.display = "none";
    document.getElementById("mainVideoInfo").style.display = "none";
    document.getElementById("mainAudioInfo").style.display = "none";
    document.getElementById("mainSubtitleInfo").style.display = "none";
};


Display.showStat = function()
{
    document.getElementById("mainStatusInfo").style.display = "block";
    document.getElementById("mainVideoInfo").style.display = "block";
    document.getElementById("mainAudioInfo").style.display = "block";
    document.getElementById("mainSubtitleInfo").style.display = "block";
};

Display.hideS = function () {
    //document.getElementById("mainS").style.display = "none";
};


Display.showS = function () {
    //document.getElementById("mainS").style.display = "block";
};