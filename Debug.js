var Debug=
{
    logMessage: "",
    on: false,
    max_line: 37,
    logDate: null,
    logName: null,
    isWriteToFile: false,
};
Debug.init = function () {
    
    if (Settings.bLogWriteToFile) {
        var date = new Date();

        Debug.logDate = date.toDateString() + " - " + ("0" + date.getHours()).substr(-2, 2) + ":" + ("0" + date.getMinutes()).substr(-2, 2) + ":" + ("0" + date.getSeconds()).substr(-2, 2) + ".log";
        Debug.logName = "OnlineTV.log";
        if (this.logName != null) {
            try {

                    var fileSystemObj = new FileSystem();
                    Debug.LogOnScreen('Create FileSystem object status: ' + fileSystemObj);

                    var bValid = fileSystemObj.isValidCommonPath(curWidget.id);
                    if (bValid == 0) {
                        Debug.LogOnScreen("<-----------New Directory needs to be created----------->");
                        var cResult = fileSystemObj.createCommonDir(curWidget.id);
                        if (cResult) {
                            Debug.LogOnScreen("<-----------Common Dir Created----------->");
                        }
                        else {
                            Debug.LogOnScreen("<-----------Unable to create Common Dir----------->");
                        }
                    }
                    else if (bValid == 1) {
                        Debug.LogOnScreen("<-----------Directory already exists----------->");
                    }
                    else if (bValid == 2) {
                        Debug.LogOnScreen("<-----------Invalid path ..... Directory cannot be created----------->");
                    }
                    else {
                        Debug.LogOnScreen("<-----------Unknown Error----------->");
                    }
                    var path = curWidget.id + '/' + Debug.logName;
                    Debug.LogOnScreen('Debug logs path: ' + path);
                    var error = "";
                    var result = 0;
                try {
                    var path2 = curWidget.id + "/Before" + Debug.logName;
                    var p1 = "/mtd_rwcommon/common/OnlineTV/" + Debug.logName;
                    Main.includePlugin(PL_ENUM_FILESYSTEM);
                    var p2 = "/mtd_rwcommon/common/OnlineTV/Before" + Debug.logName;
                    if (!exists(p1))
                    {
                        var p1 = "/mtd_unirw/rwcommon/common/OnlineTV/" + Debug.logName;
                        var p2 = "/mtd_unirw/rwcommon/common/OnlineTV/Before" + Debug.logName;
                    }
                   
                    result  = copy(p1, p2);
                    }
                catch (e) {
                        error = "[Debug] Error: Name: " + e.Name + ", Message: " + e.message + ", Description: " + e.description;
                        Debug.LogOnScreen(error);
                    }
                    
                    var fileObj = fileSystemObj.openCommonFile(path, 'w');
                    //if (fileObj == null) {
                    //    //Debug.logName = 'logs.dat';
                    //    Debug.logName = ("0" + date.getDay()).substr(-2, 2) + ("0" + date.getMonth()).substr(-2, 2) + ("0" + date.getYear()).substr(-2, 2) +
                    //         ("0" + date.getHours()).substr(-2, 2) + ("0" + date.getMinutes()).substr(-2, 2) + ("0" + date.getSeconds()).substr(-2, 2) + ".log";
                    //    path = curWidget.id + '/' + Debug.logName;
                    //    fileObj = fileSystemObj.openCommonFile(path, 'w');
                    //}
                    Debug.LogOnScreen('OpenCommonFile status: ' + fileObj);

                    //fileObj.writeAll('Start: ' + this.logName + '\n');
                    //var date = new Date();
                    //var y = date.getFullYear();//
                    var y = "2016";
                    fileObj.writeLine("SamyGO E/F/H " + curWidget.name + " v. " + curWidget.version + " (c) " + curWidget.authorName + " " + y);
                //Debug.Log("Create log file: " + Debug.logName);
                    if (error!="")
                        fileObj.writeLine(error);
                    fileObj.writeLine('[Debug] Create BeforeOnlineTV.log status: ' + result);
                    fileObj.writeLine('[Debug] Start write to file: ' + Debug.logName);
                    fileObj.writeLine('[Debug] Date: ' + Debug.logDate);

                    fileSystemObj.closeCommonFile(fileObj);
                    Debug.LogOnScreen('CloseCommonFile status: true');



                    this.isWriteToFile = true;
                    
                }
                
            catch (e) {
                Debug.LogOnScreen("Error: Debug.init(), Name: " + e.Name + ", Message: " + e.message + ", Description: " + e.description);
                this.isWriteToFile = false;
                //return false;
            }
            return true;
        }
        return false;
    }
    return true;
    
};
Debug.DisplayClass = function (s, str) {
    if (str == null)
        toFile = false;
    else
        toFile = true;
    var cc = s;
    var data = "Class:" + '\n';
    for (var key in cc) {
        data = data + 'key: ' + key + ', value: ' + cc[key] + '\n';
    }
    Debug.LogOnScreen(data);
    if (toFile)
        File.WriteChannel(data, str);
};
Debug.CheckMaxLine = function () {
    var n = this.logMessage.split("</br>");
    if (n.length > this.max_line) {
        var mess = "";
        for (var i = n.length - this.max_line; i < n.length; i++) {
            if (i == n.length - 1) {
                mess = mess + n[i];
            }
            else {
                mess = mess + n[i] + "</br>";
            }
        }
        this.logMessage = mess;
    }
};

Debug.Log = function (message) {
    if (this.isWriteToFile) {
        try {
            var fileSystemObj = new FileSystem();
            var fileObj = fileSystemObj.openCommonFile(curWidget.id + '/' + Debug.logName, 'a');
            if (Settings.bLogTimer) {
                message = "-> " + Util.GetCurrTime() + " <- " + message;
            }
            fileObj.writeLine(message);
            fileSystemObj.closeCommonFile(fileObj);
        }
        catch (e) {
            Debug.LogOnScreen("Error: Debug.Log, Name: " + e.Name + ", Message: " + e.message + ", Description: " + e.description);
        }
    }
    Debug.LogOnScreen(message);
  
};
Debug.LogOnScreen = function (message) {
        this.CheckMaxLine();
        var logDivElement = document.getElementById("debug");
        this.logMessage = this.logMessage + message + "</br>";
        widgetAPI.putInnerHTML(logDivElement, this.logMessage);
};
//Debug.LogPara = function (message) {
//    var logDivElement = document.getElementById("debug");
//    this.logMessage = this.logMessage + "<p>" + message + "</p>";
//    widgetAPI.putInnerHTML(logDivElement, this.logMessage);
//};

Debug.ClearLog = function () {
    var logDivElement = document.getElementById("debug");
    this.logMessage = "";
    widgetAPI.putInnerHTML(logDivElement, this.logMessage);
};

function copy(from, to) {
    var command = "Main.FilePlugin.Copy('" + from + "', '" + to + "')";
    var result = eval(command);
    return result;
};
function exists(from) {
    var command = "Main.FilePlugin.IsExistedPath('" + from + "')";
    var result = eval(command);
    return result;
};