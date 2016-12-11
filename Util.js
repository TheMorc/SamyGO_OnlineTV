var Util = {
    xmlHttp: null,
    xmlHTTPMoreInfoStream: null,
    tic: 0,
};

Util.StrParam2Num = function (str) {
    try {
        if (str[1] != "{") {
            //{param1:0,parm2:0} -> {param1 0,param2 0}
            //{param1:0,parm2:43,parm3:2} - > {param1 0,param2 43,param3 2}
            var pout = [];
            var p = str.split(":");
            var i;
            for (i = 1; i < p.length - 1; i++) {
                pout[i - 1] = p[i].split(",")[0];
            }
            pout[i - 1] = p[i].split("}")[0];
            return pout;

        }
        else {
            return str;
        }
    }
    catch (e) {
        Debug.Log("[Util] StrParam2Num error: " + e.message);
    }
};
Util.Bit2Str = function (bit) {
    var MAX_NUM_LENTH = 3;
    var B = " B";
    var KB = " KB";
    var MB = " MB";
    var GB = " GB";
    var TB = " TB";
    var cntDivision = 0;
    var result = bit;
    while (result > 1000) {
        result = result / 1024;
        cntDivision++;
    }

    result = result.toFixed(MAX_NUM_LENTH - result.toFixed(0).length);

    switch (cntDivision) {
        case 0:		// B
            result = result + B;
            break;
        case 1:		// KB
            result = result + KB;
            break;
        case 2:		// MB
            result = result + MB;
            break;
        case 3:		// GB
            result = result + GB;
            break;
        case 4:		// TB
            result = result + TB;
            break;
        default:	// optical speed
            break;
    }
    return result;
};
Util.Bitrate2str = function (average,mno) {
    if (mno == null) {
        mno = 1;
    }
    else {
        mno = 8;
    }

    var MAX_NUM_LENTH = 3;
    var BPS = " b/s";
    var KBPS = " Kb/s";
    var MBPS = " Mb/s";
    var GBPS = " Gb/s";
    var TBPS = " Tb/s";

    var result = average * mno;
    var cntDivision = 0;

    while (result > 1000) {
        result = result / 1024;
        cntDivision++;
    }

    result = result.toFixed(MAX_NUM_LENTH - result.toFixed(0).length);

    switch (cntDivision) {
        case 0:		// b/s
            result = result + BPS;
            break;
        case 1:		// kb/s
            result = result + KBPS;
            break;
        case 2:		// Mb/s
            result = result + MBPS;
            break;
        case 3:		// Gb/s
            result = result + GBPS;
            break;
        case 4:		// Tb/s
            result = result + TBPS;
            break;
        default:	// optical speed
            break;
    }

    return result;
}
Util.CreateMsg = function (defArea, p) {
    try{
        var msg = "";
        for (i = 0; i < p.length; i++) {
            msg = msg + defArea[p[i]] + "(" + p[i] + ")";
            if (i!=p.length-1)
                msg += ", "
        }
        return msg;
    }
    catch (e) {
        Debug.Log("[Util] CreateMsg  error: " + e.message);
    }
};

Util.LanguageNumToStr = function (num) {
    var nHex = num.toString(16);
    var sHex1 = "0x" + nHex.substr(0, 2);
    var sHex2 = "0x" + nHex.substr(2, 2);
    var sHex3 = "0x" + nHex.substr(4, 2);
    var str1 = String.fromCharCode(sHex1);
    var str2 = String.fromCharCode(sHex2);
    var str3 = String.fromCharCode(sHex3);
    var str = str1 + str2 + str3;
    if (str == "zz{")
        str = "org";
    return str
};

Util.httpGetNoSync = function(theUrl) 
{
    if (Util.xmlHttp != null) {
        Util.xmlHttp.abort();
        Util.xmlHttp = null;
    }

    Util.xmlHttp = new XMLHttpRequest();

    Util.xmlHttp.open("GET", theUrl, false);
    Util.xmlHttp.send(null);

    var out = Util.xmlHttp.responseText;
	Util.xmlHttp = null; 
	return out;
};

Util.httpGetSync = function (theUrl, func) {
    if (Util.xmlHTTPMoreInfoStream != null) {
        Util.xmlHTTPMoreInfoStream.abort();
        Util.xmlHTTPMoreInfoStream = null;
    }

    Util.xmlHTTPMoreInfoStream = new XMLHttpRequest();

    Util.xmlHTTPMoreInfoStream.open("GET", theUrl, true);

    Util.xmlHTTPMoreInfoStream.onreadystatechange = func;
    Util.xmlHTTPMoreInfoStream.send(null);
};
Util.ValTo00 = function (val) {
    val = parseInt(val);
    return ("0" + val).substr(-2, 2);
};
Util.SecToStr = function (sec) {
    sec = Math.round(sec);
    var h = Math.floor(sec / (60 * 60));

    var divisor_for_minutes = sec % (60 * 60);
    var m = Math.floor(divisor_for_minutes / 60);

    var divisor_for_seconds = divisor_for_minutes % 60;
    var s = Math.ceil(divisor_for_seconds);
    var str = Util.ValTo00(h) + ":" + Util.ValTo00(m) + ":" + Util.ValTo00(s);
    //if (m > 0)
    //    str = Util.ValTo00(m) + ":" + str;
    //else if (h > 0)
    //    str = Util.ValTo00(h) + ":" + str;
    
    return str
};
Util.Tic = function () {
    var d = new Date();
    Util.tic = d.valueOf();
}
Util.Toc = function () {
    var d = new Date();
    var toc = d.valueOf() - Util.tic;
    return toc;
}
Util.ReadFile = function (file) {
    path = curWidget.id + '/' + file;
    var str = null;
    var fileSystemObj = new FileSystem();
    var fileObj = fileSystemObj.openCommonFile(path, 'r');
    if (fileObj != null) {
        str = fileObj.readAll();
        fileSystemObj.closeCommonFile(fileObj);
        return str;
    }
    
    return str;
}
Util.WriteFile = function (file,str) {
    path = curWidget.id + '/' + file;

    var fileSystemObj = new FileSystem();
    var fileObj = fileSystemObj.openCommonFile(path, 'w+');
    if (fileObj != null) {
        str = fileObj.writeAll(str);
        fileSystemObj.closeCommonFile(fileObj);
    }
}
Util.GetEventRCKeyData = function () {
    var keyData = null;
    var keyNo = null;
    var kd=null;
    var path = curWidget.id + '/eventRCKey.txt';
    var fileSystemObj = new FileSystem();
    var fileObj = fileSystemObj.openCommonFile(path, 'r');
    if (fileObj != null) {
        kd = fileObj.readLine().split(" ");
        keyData = parseInt(kd[0]);
        keyNo = parseInt(kd[1]);
        kd[0] = keyData;
        kd[1] = keyNo;
        //Debug.Log("[Main] The key input event no: " + keyNo);
    }
    fileSystemObj.closeCommonFile(fileObj);
    return kd;
}
Util.GetCurrTime = function () {
    var d = new Date();
    return ("0" + d.getHours()).substr(-2, 2) + ":" + ("0" + d.getMinutes()).substr(-2, 2) + ":" + ("0" + d.getSeconds()).substr(-2, 2) + "." + ("00" + d.getMilliseconds()).substr(-3, 3);
}

Util.sleep = function (delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
};

Util.SortOrder = function (data, no) {
    try {
        var bno = 0;
        if (no != null) {
            if (no == 1) {
                bno = 1;
            }
        }

        var list = [];
        var order = 0;
        for (var j in data) {
            list.push({ 'name': data[j], 'order': order++ });
        }

        //2) sort:
        if (bno==1) {
            list.sort(function (a, b) {
                return (a.name - b.name);
                //Sort could be modified to, for example, sort on the age 
                // if the name is the same.
            });
        }
        else {
            list.sort(function (a, b) {
                return ((a.name < b.name) ? -1 : ((a.name == b.name) ? 0 : 1));
                //Sort could be modified to, for example, sort on the age 
                // if the name is the same.
            });
        }
        order = new Array();
        //3) separate them back out:
        for (var k = 0; k < list.length; k++) {
            order[k] = list[k].order;
        }
        return order;
    }
    catch (exc) {
        Debug.Log("[Util] Error: " + exc.name + ", " + exc.message);
    }
};
Util.GetInfoEPG = function (str_2) {
    if (str_2 == "")
        return "";
    var info = "";
    info = str_2.replace(/★/gm, "<span style=\"color:#EEE8AA\">★</span>");//#FFD700
    info = info.replace(/☆/gm, "<span style=\"color:#EEE8AA\">☆</span>");
    var str_3 = info.split(" | ");
    var str_4 = str_3[0].split(", ");
    if (str_4.length > 1) {
        str_4[1]=str_4[1].replace("(", ""); str_4[1]=str_4[1].replace(")", "");
        info = str_4[1][0].toUpperCase() + str_4[1].slice(1);
        for (var i = 1; i < str_3.length; i++) {
            info = info + " | " + str_3[i];
        }
    }
    return info;
};
Util.ExistsFile = function (path) {
    var command = "Main.FilePlugin.IsExistedPath('" + path + "')";
    var result = eval(command);
    Debug.Log("[Util] Existing " + path + " -> status: " +result);
    return result;
};
Util.Color = function (color, text) {
    return "<span style=\"color:#" + color + "\">" + text + "</span>";
};
Util.CheckRECDir = function () {
    if (Settings.bCheckRecDir && Util.ExistsFile(Settings.RecDir) != 1) {
        Settings.RecDir = Settings.RecDirAlt;
    }

}
Util.RedInfo = function (str) {
    Display.status("<div style=\"color:#FF0000\">" + str+"</div>");
    Display.statusB("<div style=\"color:#FF0000\">" + str+"</div>");

    Display.showB();
    clearTimeout(Display.tB);
    Display.tB = setTimeout("Display.hideB();", 5000);
};

Util.ReadChannelJSONValue = function(minor, major, key)
{
    var value = null;
    var tfile = Util.ReadFile('test');
    if (tfile != null) {
        var jsonObj = JSON.parse(tfile);
        Debug.Log("[Util] ReadChannelJSONValue: " + jsonObj);
        try {
            if (jsonObj != null) {
                Debug.Log("[Main] ReadChannelJSONValue ok");
                for (var i = 0; i < jsonObj.length; i++) {
                    if (jsonObj[i].minor == minor && jsonObj[i].major == major) {
                        value = jsonObj[i][key];
                        Debug.Log("[Main] ReadChannelJSONValue key: " + key + ", value: " + value);
                    }
                }
            }
            else {
                Debug.Log("[Main] JSON null");
            }
        } catch (e) {
                Debug.Log("[Util] Error ReadChannelJSONValue: " + e.message);
        }
        
    }
    return value;
    //////////////////////
}
Util.WriteChannelJSON = function (jsonOBJ,name) {
    var str = "{}";
    try {
        if (jsonOBJ != null) {
            Debug.Log("[Util] WriteChannelJSON OK");

            str = Util.JSON2Str(jsonOBJ);
            Debug.Log("[Util] WriteChannelJSON: "+str);
            if (str == null) {
                Debug.Log("[Util] WriteChannelJSON from JSON2Str is null!");
                str = "{}";
            }
        }
        else {
            Debug.Log("[Util] WriteChannelJSON null");
        }
        Util.WriteFile(name, str);

    } catch (e) {
        Debug.Log("[Util] Error WriteChannelJSON: " + e.message);
    }
}
Util.CreateCHKey = function (minor, major) {
    return "ch_" + minor + "_" + major;
}
Util.JSON2Str = function (j) {
    var MyObjectStringify = JSON.stringify(j);// "[";
    //var last = j.length;
    //var count = 0;
    //for (x in j) {
    //    MyObjectStringify += JSON.stringify(j[x]);
    //    count++;
    //    if (count < last)
    //        MyObjectStringify += ",";
    //}
    //MyObjectStringify += "]";
    return MyObjectStringify;
}
Util.ReadChannelJSON = function (name) {
    var jsonObj = null;
    var tfile = Util.ReadFile(name);
    if (tfile != null) {
        jsonObj = JSON.parse(tfile);
        if (jsonObj == null)
            jsonObj = JSON.parse("{}");
        Debug.Log("[Util] ReadJSON "+name+": OK");
    }
    else {
        jsonObj = JSON.parse("{}");
        Debug.Log("[Util] ReadJSON " + name+": empty");
    }
    return jsonObj;
    //////////////////////
}
Util.ValueFromStr = function (strin, start, stop) {
    var strout = null;
    var temp = strin.split(stop);
    if (temp.length > 1) {
        temp = temp[temp.length - 2];
        //Debug.Log("[Util] Util.ValueFromStr(1): " + temp);
        temp = temp.split(start);
        //Debug.Log("[Util] Util.ValueFromStr(2): " + temp.length);
        //for (var oo = 0; oo < temp.length; oo++)
        //    Debug.Log("[Util] Util.ValueFromStr(2.): " + temp[oo]);
        if (temp.length > 1)
            strout = temp[temp.length-1];
    }
    //Debug.Log("[Util] Util.ValueFromStr(3): " + strout);
    return strout;

}
Util.GetAudioCodecName = function (str) {
    var strout = null;
    if (str.search("mp2") != -1)
        strout = "mp2";
    else if (str.search("mp1") != -1)
        strout = "mp1";
    else if (str.search("mp3") != -1)
        strout = "mp3";
    else if (str.search("eac3") != -1)
        strout = "DD+";
    else if (str.search("ac3") != -1)
        strout = "DD";
    return strout;
}
Util.GetVideoCodec = function (str) {
    var strout = null;
    if (str.search("h264") != -1)
        strout = "h.264";
    else if (str.search("mpeg2video") != -1)
        strout = "MPEG-2";
    return strout;
}
Util.GetVideoCodecQ = function (str) {
    var strout = null;
    if (str.search("Main") != -1)
        strout = "MP";
    else if (str.search("Progressive") != -1)
        strout = "PHiP";
    else if (str.search("High") != -1)
        strout = "HiP";
    else if (str.search("Baseline") != -1)
        strout = "BP";
    else if (str.search("Extended") != -1)
        strout = "XP";
   
    return strout;
}
Util.GetSpeakers = function (str) {
    var strout = null;
    if (str.search("2 channels") != -1)
        strout = "2.0";
    else if (str.search("1 channels") != -1)
        strout = "1.0";
    else if (str.search("stereo") != -1)
        strout = "stereo";
    else if (str.search("5.1,") != -1)
        strout = "5.1";
    else if (str.search("7.1,") != -1)
        strout = "7.1";
    else if (str.search("mono") != -1)
        strout = "mono";
    return strout;
}
Util.GetStreamInfo = function (link) {

    inParams = '0=1&1=GetStreamInfo&2=' + link + '&3=' + Settings.MoreStreamInfoExtAppPath + '&4=4';
    var chk = Util.CreateCHKey(Main.selectMinorTemp, Main.selectMajorTemp);
    //Debug.Log("[Util] Request: " + inParams);
    func = function () {
        if (Util.xmlHTTPMoreInfoStream.readyState == 4) {
            if (Util.xmlHTTPMoreInfoStream.status == 200) {
                var chk = Util.CreateCHKey(Main.selectMinorTemp, Main.selectMajorTemp);
                var tab = new Object();
                var resText = Util.xmlHTTPMoreInfoStream.responseText.replace("At least one output file must be specified", "");
                var out = resText.split("Stream #");
                for (var ii = 0; ii < out.length; ii++) {
                    if (ii == 0) {
                        Debug.Log("[Util] " + out[ii]);
                        continue;
                    }

                    var temp = out[ii].split("]: ");
                    var temp2;
                    if (temp.length > 1) {
                        temp2 = temp[1];
                    }
                    else {
                        temp2 = out[ii].split("](");
                        temp2 = "(" + temp2[1];
                    }
                    temp = out[ii].split("]");
                    temp = temp[0].split("[");
                    var pid = parseInt(temp[1], 16);
                    tab["P" + pid] = "Stream (PID: " + pid + "): " + temp2;
                    Debug.Log("[Util] " + tab["P" + pid]);


                }
                Main.ChannelsStreamInfos[chk] = new Object();
                Main.ChannelsStreamInfos[chk] = tab;
                Util.SetMoreStreamInfoToPlayer();
            }
        }
    };
    if (Main.ChannelsStreamInfos[chk] == undefined) {
        Debug.Log("[Util] Request to external app about more stream info...");
        
        Util.httpGetSync(Player.listenCHurl + inParams, func);
    }
    else {
        Debug.Log("[Util] Reading more stream info...");
        //for (var ii = 0; ii < Main.ChannelsStreamInfos[chk].length; ii++) {
        var vpid = Player.CurrVPID();
        if (vpid != -1) {
            Debug.Log("[Util] " + Main.ChannelsStreamInfos[chk]["P" + vpid]);
            if (Main.ChannelsStreamInfos[chk]["P" + vpid] == undefined) {
                Util.httpGetSync(Player.listenCHurl + inParams, func);
                return;
            }
        }
        var apid = Player.CurrAPID();//
        if (apid != -1) {
            Debug.Log("[Util] " + Main.ChannelsStreamInfos[chk]["P" + apid]);
            if (Main.ChannelsStreamInfos[chk]["P" + apid] == undefined) {
                Util.httpGetSync(Player.listenCHurl + inParams, func);
                return;
            }
        }
        var spid = Player.CurrSPID();//
        if (spid != -1) {
            Debug.Log("[Util] " + Main.ChannelsStreamInfos[chk]["P" + spid]);
            if (Main.ChannelsStreamInfos[chk]["P" + spid] == undefined) {
                Util.httpGetSync(Player.listenCHurl + inParams, func);
                return;
            }
        }
        Util.SetMoreStreamInfoToPlayer();
        //}
    }

}
Util.SetMoreStreamInfoToPlayer = function () {
    var chk = Util.CreateCHKey(Main.selectMinorTemp, Main.selectMajorTemp);
    // Debug.Log("[Util] Request: " + inParams);
    if (Main.ChannelsStreamInfos[chk] != undefined) {
        var temp;
        var vpid = Player.CurrVPID();
        if (vpid != -1) {
            //Debug.Log("[Util] " + Main.ChannelsStreamInfos[chk][vpid]);
            temp = Util.ValueFromStr(Main.ChannelsStreamInfos[chk]["P" + vpid], ", ", " fps,");
            if (temp != null)
                Player.fps = temp;
            temp = Util.GetVideoCodec(Main.ChannelsStreamInfos[chk]["P" + vpid]);
            if (temp != null)
                Player.vcodec = temp;
            temp = Util.GetVideoCodecQ(Main.ChannelsStreamInfos[chk]["P" + vpid]);
            if (temp != null)
                Player.vcq = temp;
            
        }
        var apid = Player.CurrAPID();//
        if (apid != -1) {
            temp = Util.GetAudioCodecName(Main.ChannelsStreamInfos[chk]["P" + apid]);
            if (temp != null)
                Player.acodec = temp;
            temp = Util.GetSpeakers(Main.ChannelsStreamInfos[chk]["P" + apid]);
            if (temp != null)
                Player.speaker = temp;
            //Debug.Log("[Util] " + Main.ChannelsStreamInfos[chk][apid]);
        }
        var spid = Player.CurrSPID();//
        if (spid != -1) {
            //Debug.Log("[Util] " + Main.ChannelsStreamInfos[chk][spid]);
        }
    }
}