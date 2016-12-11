var File =
{
    filePlugin: null, 
    //chin: "/mtd_rwcommon/common/OnlineTV/channelin",
    //chout: "/mtd_rwcommon/common/OnlineTV/channelout",
    //chokr: "/mtd_rwcommon/common/OnlineTV/channelokr",
};
File.init  = function ()
{
    this.filePlugin = document.getElementById("pluginFileSystem");
    //if (this.filePlugin != null) {
    //    File.Delete(File.chokr);
    //    File.Delete(File.chout);
    //    File.Delete(File.chin);
    //    return true;
    //}
    return true;
};

File.Exist = function (path) {
    var command = "this.filePlugin.IsExistedPath('" + path + "')";
    var result = eval(command);
    if (result)
        Debug.Log("[File] Exist file: '" + path + "'");
    return result;
};
File.Delete = function (path) {
    var result = this.Exist(path);
    if (result) {
        var command = "this.filePlugin.Delete('" + path + "')";
        result = eval(command);
        try
        {
            if (result)
                Debug.Log("[File] Delete file: '" + path + "'");
        }
        catch (e)
        { }
    }
    return result;
};
File.WriteChannel = function (data,name) {
    try {
        var fileSystemObj = new FileSystem();
        //Debug.Log(fileSystemObj);
        var fileObj = fileSystemObj.openCommonFile(curWidget.id + '/' + name, 'w');
        //Debug.Log("[File] ----------");
        fileObj.writeAll(data);
        //Debug.Log(fileObj);
        fileSystemObj.closeCommonFile(fileObj);
        Debug.Log("[File] Write: " +data);
    }
    catch (e) {
        Debug.Log("[File] Write error:: " + e.message);
    }

};
File.Read = function (path) {
    Debug.Log("[File] Path: " + path);
    var result = null;
    if (File.Exist(path)) {
        try {
            var fileSystemObj = new FileSystem();
            var fileObj = fileSystemObj.openCommonFile(path, 'r');
            if (fileObj != null) {
                result = fileObj.readAll();
                Debug.Log("[File] Read status: 1");
            }
            else {
                Debug.Log("[File] Read status: 0");
            }
        }
        catch (e) {

            Debug.Log(e.message);
            return null;
        }
    }
    else {
       
    }
    return result;

};

