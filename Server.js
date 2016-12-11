var Server =
{
    /* Callback function to be set by client */
    dataReceivedCallback : null,
    dataReceivedCallbackTV : null,
    dataReceivedCallbackS : null,
    //req: null,
    XHRObj : null,
    url : null,
    host: null
};

Server.init = function()
{
    var success = true;
   
    if (this.XHRObj)
    {
        this.XHRObj.destroy();  // Save memory
        this.XHRObj = null;
    }
    
    return success;
};
//Server.tv = function()
//{

//

//	Debug.Log("[Server] URL loadedTV---------------------:" + theUrl);
//	Server.fetchTVList(theUrl);


//};
Server.hh = function (param) {
    var link = Settings.TvList;
    Server.host = null;
    Server.fetchVideoList(link);
};

Server.fetchVideoList = function (url) {
    ////Debug.Log("URL : " + url);
    this.url = url;
    if (this.XHRObj == null) {
        this.XHRObj = new XMLHttpRequest();
    }

    if (this.XHRObj) {
        this.XHRObj.open("GET", url, true);

        this.XHRObj.send(null);


        this.XHRObj.onreadystatechange = function () {
            if (Server.XHRObj.readyState == 4) {
                if (Server.XHRObj.status == 200) {
                    Server.createVideoList();
                }
            }
        };


    }
    else {
        //Debug.Log("Failed to create XHR");
    }
    //Debug.Log("Server XHR status: " + Server.XHRObj.status);

};

Server.createVideoList = function () {

    if (this.XHRObj.status != 200) {
        Display.status("XML Server Error " + this.XHRObj.status);
    }
    else {
        var xmlElement = this.XHRObj.responseXML.documentElement;

        if (!xmlElement) {
            //Debug.Log("[Server] Failed to get valid XML");
        }
        else {
            // Parse RSS
            // Get all "item" elements
            var items = xmlElement.getElementsByTagName("item");

            var videoNames = [];
            var videoURLs = [];
            var videoDesc = [];
            var videoDescriptions = [];
            var videoTypes = [];
            var videoImages = [];
            var videoTVID = [];
            var tvTypes = [];
            var tvIdxURLs = [];
            var videoCatsID = new Array();
            var tvSources = [];
            var id = 0;
            var cats = xmlElement.getElementsByTagName("category");
            var categoryTitle = [];
            var categoryID = [];

            for (var index = 0; index < cats.length; index++) {
                var catIDEle = cats[index].getElementsByTagName("category_id")[0];
                var catTitleEle = cats[index].getElementsByTagName("category_title")[0];

                categoryTitle[index] = catTitleEle.firstChild.data;
                categoryID[index] = catIDEle.firstChild.data;

            }
            var idd = 0;
            for (var index = 0; index < items.length; index++) {
                var titleElement = items[index].getElementsByTagName("title")[0];
                var descriptionElement = items[index].getElementsByTagName("description")[0];
                var linkElement = items[index].getElementsByTagName("link")[0];
                var videoTypeElement = items[index].getElementsByTagName("type")[0];
                var videoImageElement = items[index].getElementsByTagName("image")[0];

                var videoCatsElement = items[index].getElementsByTagName("ch_category")[0];
                var videoTVIDElement = items[index].getElementsByTagName("tvid")[0];
                var source = items[index].getElementsByTagName("source")[0];
                var desc = items[index].getElementsByTagName("prog_now_desc")[0];

                if (titleElement && descriptionElement && linkElement && videoTypeElement && videoImageElement && videoTVIDElement && source) {
                    //Debug.Log("[Server] videoTVIDElement:::::::: "+ videoTVIDElement.firstChild.data);
                    if (videoTVIDElement.firstChild != null) {
                        //Debug.Log("[Server] videoTVIDElement::::" + idd + "---->" + index + " :::: "+ videoTVIDElement.firstChild.data);
                        videoNames[idd] = titleElement.firstChild.data;
                        videoURLs[idd] = linkElement.firstChild.data;

                        videoTypes[idd] = videoTypeElement.firstChild.data;
                        try {
                            videoDescriptions[idd] = descriptionElement.firstChild.data;
                        }
                        catch (e) {
                            videoDescriptions[idd] = "";
                        }
                        try {
                            videoImages[idd] = videoImageElement.firstChild.data;
                        }
                        catch (e) {
                            videoImages[idd] = "icons/Tutorial_Video_115.png";
                        }
                        videoTVID[idd] = videoTVIDElement.firstChild.data;
                        tvSources[idd] = source.firstChild.data;
                        if (desc)
                            videoDesc[idd] = desc.firstChild.data;
                        if (source.firstChild.data != "None") {

                            if (source.firstChild.data == "OnlineTV") {
                                tvTypes[idd] = 1;
                            }
                            else {
                                tvTypes[idd] = 0;
                            }

                            if (source.firstChild.data == "OnlineTV" || source.firstChild.data == "DTV" || source.firstChild.data == "CDTV" || source.firstChild.data == "SATD") {
                                Main.dIDs[videoTVID[idd]] = idd;
                                ///
                            }
                            else {
                                Main.aIDs[videoTVID[idd]] = idd;
                                ////Debug.Log("[Server] TITLE::::::::::::: " +videoNames[Main.aIDs[videoTVID[idd]]]);
                            }
                            tvIdxURLs[idd] = idd;
                            //alert(videoTVID[idd]+"->>>> URL::::" + videoURLs[idd]);
                            //Debug.Log("[Server] TV: " +Data.videoURLs[tvIdxURLs[id]]);
                            //id++;
                        }
                        var cElement = videoCatsElement.getElementsByTagName("id_category");
                        videoCatsID[idd] = new Array();
                        var ida = 0;
                        for (var i = 0; i < cElement.length; i++) {
                            ////Debug.Log("[Server] cElement.length: " +cElement.length);
                            if (cElement[i].firstChild != null) {
                                videoCatsID[idd][ida++] = cElement[i].firstChild.data;
                                ////Debug.Log("[Server] index:"+index +", i:" + i+ "= " + videoCatsID[index,i]);
                            }
                        }
                        idd++;
                    }
                }
            }

            Data.setCategoryTitle(categoryTitle);
            ////Debug.Log("[Server] categoryID: " +categoryID.length);
            ////Debug.Log("[Server] videoCatsID: " +videoCatsID.length);
            Data.setCategory(categoryID, videoCatsID);



            Data.setVideoNames(videoNames);
            Data.setVideoDesc(videoDesc);
            Data.setVideoURLs(videoURLs);
            Data.setVideoDescriptions(videoDescriptions);
            Data.setVideoTypes(videoTypes);
            Data.setVideoImages(videoImages);
            Data.setVideoTVID(videoTVID);
            Data.settvTypes(tvTypes);
            Data.settvIdxURLs(tvIdxURLs);
            Data.settvSources(tvSources);
            //Data.setVideoWithCategory(3);

            if (this.dataReceivedCallback) {
                Debug.Log("[Server] dataReceivedCallback GO");
                this.dataReceivedCallback();    /* Notify all data is received and stored */
                Debug.Log("[Server] dataReceivedCallback Done");
            }
            //if (this.dataReceivedCallbackS)
            //    {
            //        this.dataReceivedCallbackS();    /* Notify all data is received and stored */
            //    }

        }
    }
};