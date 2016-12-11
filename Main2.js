/**
 * 
 */
var Main2 =
{
    arrTVID: new Array(),
    arrCategryList: new Array(),	// Array of Categry List Divs
    arrCategryTitle: [],	// Array of Categry Title Divs
    arrCategryImg: [],	// Array of Categry Title Divs
    arrCategryDesc: [],	// Array of Categry Title Divs
    arrCategryDuration: [],	// Array of Categry Title Divs
    idl_max: 7,
    title_max_num: 7,
    categoryIdx: 0,
    categoryIdxC: 0,
    titleIdx: 0,
  //  curPubCox: "",
    articleIdx: 0,     // article index

    // page
    totalPage: 0,
    currentPage: 0,

    totalPageC: 0,
    currentPageC: 0,

    categoryFlag: new Boolean(true),
    runOnlineTVDataForGUIDE: null,
    runOnlineTVExtendText: null,
    runOnlineTVExtendEPG: null,
    pressCatGUIDE: true,
    getCatGUIDE: false,
    pressCatGUIDETimer: 60000,

    bAddTimezone: false,
    rcid: 0,

    IDsExEPG: new Array(),
};
Main2.GetCats = function (cat) {
    var cats = cat.split(" | ");
    var cat2 = new Array();
    var id = 1;
    cat2[0] = "       " +$APPS_LANG$.CAT_GUIDE_All;
    if (cats.length > 5) {
        return cats; //set return without episode no.
    }
    else {
        if (cats[0].length > 3 && cats[0][0] != ("★") && cats[0][0] != "2" && cats[0][0] != "1") {
            var namecat = cats[0].split(", ");
            cat2[id++] = namecat[0];
            //if(namecat.length>1)
            //    cat2[id++] = namecat[1][0].toUpperCase() + namecat[1].slice(1);
        }
        if (cat.indexOf(Settings.PremiereCategory) != -1) {
            cat2[id++] = "   " + Settings.PremiereCategory;
        }
    }

    return cat2;
};
Main2.GetSpeciesViaLib = function () {
    if (this.pressCatGUIDE) {
        Main2.pressCatGUIDE = false;
        if (!this.getCatGUIDE) {
            this.getCatGUIDE = true;
            var ms = 0;
            var msink = 100;
            Util.httpGetNoSync(this.runOnlineTVDataForGUIDE);
            while (true) {
                var path = curWidget.id + "/OK";
                var fileSystemObj = new FileSystem();
                var fileObj = fileSystemObj.openCommonFile(path, "r");
                if (fileObj || ms > 3000) {
                    Debug.Log("[Main2] Read category data - time: " + ms + "ms");
                    fileSystemObj.closeCommonFile(fileObj);
                    break;
                }
                fileSystemObj.closeCommonFile(fileObj);
                ms += msink;
                Util.sleep(msink);
            }
            if (ms == 0) {
                var fixTime = 3000;
                Debug.Log("[Main2] Read category data - fixed time: " + fixTime + "ms");
                Util.sleep(fixTime);
            }
            Main2.getCatGUIDE = false;
        }
    
        // Util.httpGetNoSync(this.runOnlineTVDataForGUIDE);
        //Util.sleep(2000);
        if (!Main2.bAddTimezone) {
            Main2.rcid = 0;//Main.SEFPluginTV.Execute("GetTimeZone_Offset") / 60;
            var ans = Main2.ReadCategory(Main2.rcid);
            if (!ans) {
                Main2.rcid = Main.SEFPluginTV.Execute("GetTimeZone_Offset") / 60;
                //while (!ans) {
                ans = Main2.ReadCategory(Main2.rcid);
                //}
            }
            Main2.bAddTimezone = true;
        }
        else {
            Main2.ReadCategory(Main2.rcid);
        }
        Debug.Log("[Main2] Timezone add hour: +" + Main2.rcid);

        try {
            var notest = 0;
            var categoryTitle = new Array();
            categoryTitle[0] = $APPS_LANG$.CAT_GUIDE_OTHER;
            var category = new Array();
            category[0] = new Array();
            var ic2 = 1;
            var ctitle = "";
            for (var ic = 0; ic < Data.category.length; ic++) {
                notest = 1;
                ctitle = Data.categoryTitle[ic];
                for (var i = 0; i < Settings.UserCategories.length; i++) {
                    if (Settings.UserCategories[i] == Data.categoryTitle[ic]) {
                        ctitle = " " + Data.categoryTitle[ic];

                        break;
                    }
                }
                if (Data.category[ic].length >= Settings.MinCategoriesCreate || ctitle[0] == " ") {
                    notest = 2;
                    if (ctitle!=$APPS_LANG$.CAT_GUIDE_UNCATEGORIZED)
                        categoryTitle[ic2] = " " + ctitle;//Data.categoryTitle[ic];
                    else
                        categoryTitle[ic2] = ctitle;
                    notest = 3;
                    category[ic2] = Data.category[ic];
                    notest = 4;
                    ic2++;

                }
                else {

                    notest = 7;
                    for (var icO = 0; icO < Data.category[ic].length; icO++) {
                        category[0][category[0].length] = Data.category[ic][icO];
                    }

                }
                //Debug.Log("[Main2] (" + ic2 + ") ctitle:" + ctitle + ", Data.category" + Data.category[ic]);
            }
            Data.categoryTitle = categoryTitle;
            Data.category = category;
        }
        catch (exc) {
            Debug.Log("[Main2] Move single cat... error " + notest + ": " + exc.name + ", " + exc.message);
        }
        //for (var icatt = 0 ; icatt < Data.categoryTitle.length; icatt++) {

        //    Debug.Log(Data.categoryTitle[icatt]);
        //}


        //Debug.Log("[Main] Załadowałem!");
        Main2.setSpeciesTV();
        Main2.setCatList();
        //Server.dataReceivedCallbackS = null;
        var idx = Main.GetIDs(Main.selectMinorTemp, Main.selectMajorTemp);
        if (idx != null) {
            Main.currentTV = idx;
            Main.currentTVTemp = Main.currentTV;
        }

        setTimeout("Main2.pressCatGUIDE = true;", Main2.pressCatGUIDETimer);

    }
}
Main2.getSpecies = function () {

    Util.Tic();
    Main2.GetSpeciesViaLib();
    Display.showS();
    Debug.Log("[Main2] Time of generate species: " + Util.Toc() + "ms");

};
Main2.ReadCategory = function (addHours) {
    
    if (addHours == null)
        addHours = 0;
    Main2.clearSpeciesTV();
    //Util.sleep(2000);
    //Server.hh("species");
    var path = curWidget.id + "/DataForChannels.txt";
    var fileSystemObj = new FileSystem();
    var fileObj = fileSystemObj.openCommonFile(path, "r");
    var allCHList = -1;
    if (fileObj != null) {
        Main2.SetZeroForId();
        var str = fileObj.readAll().split("|:");// .replace("\\r\\n", "<br />");
        //Debug.Log("[Main2] Read GUIDE data: " + str);
        fileSystemObj.closeCommonFile(fileObj);

        var lchn = str.length;
        Debug.Log("[Main2] Load species of channel: " + lchn);
        var mark = 0;
        var chname_t = "";
        for (var ichs = 0; ichs < lchn; ichs++) {
            var lchparam = str[ichs].split("|.");
            if (lchparam.length > 0) {
                var chparam = lchparam[0].split("|;");
                var minor = chparam[0];
                var major = chparam[1];

                var id = Main.GetIDs(minor, major);

                var chname = chparam[2];
                var slength = 0;
                try {
                    slength = lchparam[1].split("|;").length;
                    //continue;
                    //Debug.Log(chname + ": " + minor + ", " + major + ": " + isspec);
                }
                catch (eee) {
                    Debug.Log("[Main2] ReadCategory error eee: " + eee.name + ", " + eee.message);
                }
                //

                if (lchparam.length > 1 && slength > 1) {
                    //Debug.Log(chname + ": " + minor + ", " + major);
                    //Debug.Log(chname + ": " + minor + ", " + major + ". ---->" + lchparam[1] + "<----");
                    for (var ispec = 1; ispec < lchparam.length; ispec++) {
                        var spec = lchparam[ispec].split("|;");
                        if (spec.length > 1) {


                            ////
                            try {
                                var ddNow = new Date();
                                var test1 = 0;
                                var start_stop = spec[0].split(" - ");
                                var st = start_stop[0].split(".");
                                var ds = st[3] * 60 * 60 + st[4] * 60;
                                var sts = start_stop[1].split(".");
                                var dss = sts[0] * 60 * 60 + sts[1] * 60;

                                var dStart = new Date(st[0], st[1] - 1, st[2], st[3], st[4], 0, 0);
                                // Debug.Log("[Main2] dStart:" + dStart.toDateString() + ", " + dStart.toTimeString());
                                dStart.setHours(dStart.getHours() + addHours);

                                test1 = 1;
                                var dStop = new Date(sts[0], sts[1] - 1, sts[2], sts[3], sts[4], 0, 0);
                                dStop.setHours(dStop.getHours() + addHours);
                                //Debug.Log("[Main2] :" + ds + " : " +dss);
                                //if (dss < ds)
                                //{
                                //    dStop.setDate(dStart.getDate() + 1);
                                //}
                                var duration = dStop.valueOf() - dStart.valueOf();

                                test1 = 2;

                                var dNow = new Date(ddNow.getFullYear(), ddNow.getMonth(), ddNow.getDate(), ddNow.getHours(), ddNow.getMinutes(), ddNow.getSeconds(), ddNow.getMilliseconds());
                                //Debug.Log("[Main] dNow:" + dNow.toDateString() + ", " + dNow.toTimeString());
                                var dDiff = parseInt(((dNow.valueOf() - dStart.valueOf())));
                                var dur = (dDiff / duration) * 100;
                                //Debug.Log("[Main2] duration:" + dur);
                                ////
                                //if (dur > 110 || dur < -10)
                                if (dur > 110)
                                    return false;
                                    //else if (dur > Settings.IgnoringProgramProcent)
                                    //   continue;
                                else if (dur < 0) {
                                    //dur = -1;
                                    var dDiff_ = dDiff / 60000;
                                    if (dDiff_ <= -Settings.AddProgramIfMinutes)
                                        continue;
                                    dur = (dDiff_ / Settings.AddProgramIfMinutes) * 100;
                                    //Debug.Log("[Main2] Different:" + dDiff_);

                                }
                                //Util.ValTo00
                                //var time = st[3] + ":" + st[4] + " - " + sts[3] + ":" + sts[4];
                                var time = Util.ValTo00(dStart.getHours()) + ":" + Util.ValTo00(dStart.getMinutes()) + " - " + Util.ValTo00(dStop.getHours()) + ":" + Util.ValTo00(dStop.getMinutes());
                            }
                            catch (exc) {
                                Debug.Log("[Main2] ReadCategory error " + test1 + ": " + exc.name + ", " + exc.message);
                            }
                            //Debug.Log(time);
                            var title = spec[1];
                            //Debug.Log(title);
                            var desc = spec[2];
                            //Debug.Log(desc);
                            //"19:45 - 20:40|20|title|age |desc";

                            var cat = desc;//var cat = desc.split("\t");
                            var info = "";
                            info = Util.GetInfoEPG(cat);
                            if (info != "") {//cat.length > 1) {
                                desc = "";//cat[1];
                                //cat = cat[0];
                                //info = Util.GetInfoEPG(cat);
                                //Debug.Log("[Main2] info:" + info);
                            }
                            else {
                                //else {
                                //cat = null;
                                //cat = "Uncategorized";
                                cat = $APPS_LANG$.CAT_GUIDE_UNCATEGORIZED;
                            }
                            if (true) {//cat != null) {

                                //Debug.Log(cat);
                                var cats = Main2.GetCats(cat);
                                if (cats != "") {
                                    if (title.length > 56)
                                        title = title.slice(0, 56) + "...";
                                    var v_d = time + "`" + dur + "`" + title + "`" + info + "`" + desc + "`" +minor+";"+ major +";"+ spec[3];
                                    //Debug.Log(spec[3]);
                                    Data.videoDesc[mark] = v_d;
                                    // for (var icats = 0; icats < cats.length; icats++) {

                                    for (var icats in cats) {
                                        if (icats == 0 && chname_t == chname) {
                                            continue;
                                        }
                                        //Debug.Log("[Main2] icats:" + icats);
                                        var b = 1;
                                        if (Data.categoryTitle.length == 0) {

                                            Data.categoryTitle[0] = icats;//cats[icats];
                                            Data.category[icats] = new Array();
                                            Data.category[icats][Data.category[icats].length] = mark + "|" + id;
                                            continue;
                                        }
                                        var test = 0;
                                        try {
                                            for (var icatt = 0 ; icatt < Data.categoryTitle.length; icatt++) {
                                                test = "1a";
                                                if (cats[icats] == Data.categoryTitle[icatt]) {
                                                    b = 0;
                                                    test = 1;
                                                    //if (Data.category[icatt].length == 0)
                                                    //    Data.category[icatt] = new Array();
                                                    Data.category[icatt][Data.category[icatt].length] = mark + "|" + id;
                                                    //Data.videoDesc[
                                                    break;
                                                }
                                            }
                                            if (b) {
                                                test = 2;
                                                Data.categoryTitle[Data.categoryTitle.length] = cats[icats];
                                                test = 3;
                                                Data.category[icatt] = new Array();
                                                test = 4;
                                                Data.category[icatt][Data.category[icatt].length] = mark + "|" + id;

                                            }
                                        }
                                        catch (exc) {
                                            Debug.Log("[Main2] ReadCategory add cat error " + test + ": " + exc.name + ", " + exc.message);
                                        }
                                    }




                                }


                            }



                        }


                    }
                }
                else {
                    //Debug.Log(chname + ": " + minor + ", " + major);
                    var v_d = " ` ` ` ` ";
                    Data.videoDesc[mark] = v_d;
                    if (allCHList == -1) {
                        if (Data.categoryTitle.length == 0) {
                            allCHList = 0;
                        }
                        else {
                            allCHList = Data.categoryTitle.length;
                        }
                        Debug.Log("[Main2] allCHList: " + allCHList);
                        var dddd = "       " + $APPS_LANG$.CAT_GUIDE_All;
                        Data.categoryTitle[allCHList] = dddd;//"          Channel list";
                        Data.category[allCHList] = new Array();
                    }

                    Data.category[allCHList][Data.category[allCHList].length] = mark + "|" + id;
                    //Debug.Log("[Main2] Empty data EPG");

                }

                //Data.category[0][Data.category[0].length] = mark + "|" + id;

            }
            mark++;
            chname_t = chname;
        }
    }
    else {
        Debug.Log("[Main2] FileObj read status error: " + fileObj);
        fileSystemObj.closeCommonFile(fileObj);
    }
    return true;
};
Main2.SetZeroForId = function () {
    Main2.categoryIdx=0;
    Main2.categoryIdxC = 0;
    Main2.titleIdx = 0;

    Main2.articleIdx = 0;     // article index

    // page
    Main2.totalPage = 0;
    Main2.currentPage = 0;

    Main2.totalPageC = 0;
    Main2.currentPageC = 0;
    for (var i = 0; i < this.idl_max; i++) {
        widgetAPI.putInnerHTML(document.getElementById("MainCategoryTitle" + i), "");
        Main2.blurTitle(i);
        Main2.blurCategory(i);

        widgetAPI.putInnerHTML(document.getElementById("MainListTitle" + i), "");
        document.getElementById("MainListBarSolid" + i).style.display = "none";
        document.getElementById("MainListBarEmpty" + i).style.display = "none";
        widgetAPI.putInnerHTML(document.getElementById("MainListTitleB" + i), "");
        widgetAPI.putInnerHTML(document.getElementById("MainListTitleC" + i), "");
        widgetAPI.putInnerHTML(document.getElementById("MainListImg" + i), "");

    }
}
Main2.clearSpeciesTV = function () {
    this.arrCategryList = new Array();	// Array of Categry List Divs
    this.arrCategryTitle = [];	// Array of Categry Title Divs
    this.arrCategryNo = [];	// Array of Categry Title Divs
    this.arrCategryImg = [];	// Array of Categry Title Divs
    this.arrCategryDesc = [];	// Array of Categry Title Divs
    this.arrCategryDuration = [];	// Array of Categry Title Divs

    Data.videoDesc = new Array();

    Data.category = new Array();
    Data.categoryTitle = new Array();
    Data.categoryTitleCopy = [];
    //for (var i = 0; i < this.idl_max; i++) {
    //    widgetAPI.putInnerHTML(document.getElementById("MainCategoryList" + i), "");
    //    //MainCategoryList0
    //    //MainCategoryTitle0
    //    //MainListTitle0
    //    //MainListBarEmpty0 none
    //}
};
Main2.setSpeciesTV = function () {
    var first = 1;
    var idd = 0;
    var idk = 0;
    var so = "d";
    var idl = 0;
    //var i = 0;
    Debug.Log("[Main2] Generate category for GUIDE go...");
    Debug.Log("[Main2] Category length: " + Data.category.length);

    var order = Util.SortOrder(Data.categoryTitle);
    
    for (var i = 0; i < order.length; i++) {
        first = 1;
        idk = 0;
        //Debug.Log(i);
        try {
            if (Data.categoryTitle[order[i]] != "") {
                if (idl > this.idl_max)
                    idl = 0;

                var s = Data.categoryTitle[order[i]] + ": ";
                //Debug.Log(s);
                this.arrCategryDuration = new Array();
                for (var k = 0; k < Data.category[order[i]].length; k++) {
                    var cat_mark_id = Data.category[order[i]][k].split("|");
                    var mark = cat_mark_id[0];
                    var id = cat_mark_id[1];
                    //Debug.Log("[Main2]: ID" + id);
                    //if (typeof Data.tvSources[id] != 'undefined' || Data.tvSources[id] != "None") {
                    if (Data.tvSources[id] != "None") {
                        //Debug.Log("Source: " +Data.tvSources[id]);
                        if (first) {
                            this.arrCategryTitle[idd] = new Array();
                            this.arrCategryNo[idd] = new Array();
                            this.arrCategryDesc[idd] = new Array();
                            this.arrCategryImg[idd] = new Array();
                            this.arrTVID[idd] = new Array();

                            this.arrCategryList[idd] = Data.categoryTitle[order[i]];
                            first = 0;
                        }
                        this.arrCategryTitle[idd][idk] = Data.videoNames[id];
                        this.arrCategryImg[idd][idk] = Data.videoImages[id];
                        this.arrCategryNo[idd][idk] = Data.videoTVID[id];
                        this.arrCategryDesc[idd][idk] = Data.videoDesc[mark];
                        this.arrCategryDuration[idk] = Data.videoDesc[mark].split("`")[1];

                        //Debug.Log("Image:::::::"+this.arrCategryDesc[idd][idk]);
                        so = "d";
                        if (Data.tvSources[id] == "ATV")
                            so = "a";
                        this.arrTVID[idd][idk] = so + Data.videoTVID[id];
                        //Main.selectMinorTemp,Main.selectMajorTemp

                        idk++;
                        //s = s + Data.videoNames[id] + ", ";
                    }
                }
                var order2 = Util.SortOrder(this.arrCategryDuration,1);
                var cT = this.arrCategryTitle[idd];
                var cI = this.arrCategryImg[idd];
                var cN = this.arrCategryNo[idd];
                var cD = this.arrCategryDesc[idd];
                var cTV = this.arrTVID[idd];
                this.arrCategryTitle[idd]= new Array();
                this.arrCategryImg[idd] = new Array();
                this.arrCategryNo[idd] = new Array();
                this.arrCategryDesc[idd] = new Array();
                this.arrTVID[idd] = new Array();
                for (var iord = 0; iord < order2.length; iord++) {
                    if (idd == 0) {
                        this.arrCategryTitle[idd][iord] = cT[iord];
                        this.arrCategryImg[idd][iord] = cI[iord];
                        this.arrCategryNo[idd][iord] = cN[iord];
                        this.arrCategryDesc[idd][iord] = cD[iord];
                        this.arrTVID[idd][iord] = cTV[iord];
                    }
                    else {
                        this.arrCategryTitle[idd][iord] = cT[order2[iord]];
                        this.arrCategryImg[idd][iord] = cI[order2[iord]];
                        this.arrCategryNo[idd][iord] = cN[order2[iord]];
                        this.arrCategryDesc[idd][iord] = cD[order2[iord]];
                        this.arrTVID[idd][iord] = cTV[order2[iord]];
                    }
                   // Debug.Log(this.arrCategryDuration[order2[iord]]);
                }
                //Debug.Log("___________________");
                idd++;
                //Debug.Log(s);
            }
        }
        catch (exc) {
            Debug.Log("[Main2] Error: " + exc.name + ", " + exc.message );
        }
        //i++;
    }
    Debug.Log("[Main2] Generate category for GUIDE done...");

};
Main2.setSpecies = function () {
    var idl = 0;
    this.arrCategryList = new Array();	// Array of Categry List Divs
    this.arrCategryTitle = [];	// Array of Categry Title Divs
    this.arrCategryNo = [];	// Array of Categry Title Divs
    this.arrCategryImg = [];	// Array of Categry Title Divs
    this.arrCategryDesc = [];	// Array of Categry Title Divs
    var first = 1;
    var idd = 0;
    var idk = 0;
    var so = "d";
    for (var i = 0; i < Data.category.length; i++) {
        first = 1;
        idk = 0;
        if (Data.categoryTitle[i] != "") {
            if (idl > this.idl_max)
                idl = 0;

            var s = Data.categoryTitle[i] + ": ";
            for (var k = 0; k < Data.category[i].length; k++) {
                var id = Data.category[i][k];
                if (Data.tvSources[id] != "None") {
                    //Debug.Log("Source: " +Data.tvSources[id]);
                    if (first) {
                        this.arrCategryTitle[idd] = new Array();
                        this.arrCategryNo[idd] = new Array();
                        this.arrCategryDesc[idd] = new Array();
                        this.arrCategryImg[idd] = new Array();
                        this.arrTVID[idd] = new Array();
                        this.arrCategryList[idd] = Data.categoryTitle[i];
                        first = 0;
                    }
                    this.arrCategryTitle[idd][idk] = Data.videoNames[id];
                    this.arrCategryImg[idd][idk] = Data.videoImages[id];
                    this.arrCategryNo[idd][idk] = Data.videoTVID[id];
                    this.arrCategryDesc[idd][idk] = Data.videoDesc[id];
                    //Debug.Log("Image:::::::"+this.arrCategryDesc[idd][idk]);
                    so = "d";
                    if (Data.tvSources[id] == "ATV")
                        so = "a";
                    this.arrTVID[idd][idk] = so + Data.videoTVID[id];
                    idk++;
                    s = s + Data.videoNames[id] + ", ";
                }
            }
            idd++;
            Debug.Log(s);
        }
    }


};
Main2.setCatList = function () {

    try
    {
        //Debug.Log("[Main2] SetCatList information-> Main2.categoryIdx: " + Main2.categoryIdx + "(" + cx+")");
       // this.blurTitle(this.articleIdx);
        //Main2.blurCategory(Main2.categoryIdx);
        //this.articleIdx = 0;
       /*while (this.arrCategryList.length <= Main2.categoryIdx && Main2.categoryIdx > 0)
            Main2.categoryIdx--;
        if (Main2.categoryIdx < 0)
            Main2.categoryIdx = 0;
            */
        for (var i = 0; i < this.idl_max; i++) {
            widgetAPI.putInnerHTML(document.getElementById("MainCategoryTitle" + i), "");
            Main2.blurTitle(i);
            Main2.blurCategory(i);
            
        }
        var idl = 0;
        this.totalPageC = Math.ceil(this.arrCategryList.length / this.idl_max);
        this.currentPageC = Math.floor(Main2.categoryIdxC / this.idl_max);
        //this.totalPageC = Math.ceil(this.arrCategryList.length / Main2.title_max_num); 
        //Debug.Log("[Main2] max: " + this.idl_max);
       
        var cxx = Main2.idl_max * Main2.currentPageC;// + Main2.categoryIdx - this.categoryIdx;
        //Debug.Log("[Main2] CXX go: " + cxx);
        for (var i = 0; i < this.idl_max; i++) //i = cy;i<cy+this.idl_max;i++)
        {
            if (this.arrCategryTitle.length <= cxx) {
                //Debug.Log("break;");
                //cxx = 0;
                break;
            }
            //if (idl >= this.idl_max)
            //    idl = 0;
            widgetAPI.putInnerHTML(document.getElementById("MainCategoryTitle" + idl), this.arrCategryList[cxx++]);
            idl++;
        }
        //
        //Main2.blurCategory(Main2.categoryIdx);
        //Main2.focusCategory(Main2.categoryIdx);
        //Main2.selectCategory(Main2.categoryIdx);
        
        //Debug.Log("[Main2] Main2.refreshCategory()");
        Main2.categoryFlag = true;
        Main2.refreshCategory();
        Main2.showTitleList();
        Main2.focusCategory(Main2.categoryIdx);
        //Debug.Log("[Main2] Main2.focusCategory(Main2.categoryIdx)");
        //Main2.blurTitle(Main2.titleIdx);
        //Main2.titleIdx = 0;
        //this.refreshTitle();
        
        //Debug.Log("[Main2] Main2.showTitleList()");
    }
    catch (exc) {
        Debug.Log("[Main2] SetCatList error: " + exc.name + ", " + exc.message);
         Debug.Log("[Main2] Total categories: " + this.arrCategryList.length);
         Debug.Log("[Main2] Total pages: " + this.currentPageC +"/"+this.totalPageC);
         Debug.Log("[Main2] Main2.categoryIdx: " + Main2.categoryIdx);
         Debug.Log("[Main2] Main2.categoryIdxC: " + Main2.categoryIdxC);
         Debug.Log("[Main2] CXX: " + cxx);
        Main2.SetZeroForId();
        Main2.setCatList();
    }

};
Main2.setCatTitle = function (cx, cy) {
    var n;
    for (var i = 0; i < this.idl_max; i++) {
        widgetAPI.putInnerHTML(document.getElementById("MainListTitle" + i), "");
        document.getElementById("MainListBarSolid" + i).style.display = "none";
        document.getElementById("MainListBarEmpty" + i).style.display = "none";
        widgetAPI.putInnerHTML(document.getElementById("MainListTitleB" + i), "");
        widgetAPI.putInnerHTML(document.getElementById("MainListTitleC" + i), "");
        widgetAPI.putInnerHTML(document.getElementById("MainListImg" + i), "");
    }
    //Debug.Log(":::::::::::" + this.arrCategryImg[cx][cyy]+"::::::::::::::");
    //var first = 1;
    var idl = 0;
    //Debug.Log("setCatTitle cx: "+ cx);
    this.totalPage = Math.ceil(this.arrCategryTitle[cx].length / this.idl_max);
    var cyy = cy - this.titleIdx;
    if (this.arrCategryTitle[cx].length <= this.idl_max)
        cyy = 0;
    Main2.IDsExEPG = new Array();
    for (var i = cy; i < cy + this.idl_max; i++) {
        ///Debug.Log(this.arrCategryTitle[i].length);
        if (this.arrCategryTitle[cx].length <= cyy) {
            //Debug.Log("break;");
            //break;
            //if(this.arrCategryTitle[cx].length<=this.idl_max)
            break;
            cyy = 0;
        }

        if (idl > this.idl_max)
            idl = 0;
        //Debug.Log("CX: " + cx);
        //Debug.Log(":::::::::" + cyy +"::::::::::::::::::"+this.arrCategryTitle[cx][cyy]);
        
        
        n = this.arrCategryDesc[cx][cyy].split("`");
        //Main2.curPubCox=n;
        if (n[0] == null)
            n[0] = " ";
        if (n[2] == null)
            n[2] = " ";
        if (n[3] == null)
            n[3] = " ";
       
        var img = this.arrCategryImg[cx][cyy];
        if (img == "None")
            img = "icons/OTV_85.png";
        

        //////////////////////////////////////////////////////////
        if (n[5] != "") {
            Main2.IDsExEPG[i] = n[5] + ";" + this.arrCategryNo[cx][cyy] + ";" + this.arrCategryTitle[cx][cyy] + ";" + img;
        }
        else {
            Main2.IDsExEPG[i] = "None";
        }
        Debug.Log("[Main2] Main2.IDsExEPG: " + n[5]);
        //////////////////////////////////////////////////////////

        widgetAPI.putInnerHTML(document.getElementById("MainListImg" + idl), "<img src=\"" + img + "\"  style=\"opacity:1;height:auto; width:auto; max-width:53px; max-height:53px;\">");
        widgetAPI.putInnerHTML(document.getElementById("MainListTitleB" + idl), n[0] + "     " + n[2]);
        if (n[1] != null) {
            if (n[1] >= 0) {
                document.getElementById("MainListBarEmpty" + idl).style.display = "block";
                document.getElementById("MainListBarSolid" + idl).style.width = n[1] + "%";
                document.getElementById("MainListBarSolid" + idl).style.display = "block";
                document.getElementById("MainListBarSolid" + idl).style.backgroundImage="url('Images/mainInfoTimePBarSolid.png')";
            }
            else {
                document.getElementById("MainListBarEmpty" + idl).style.display = "block";
                document.getElementById("MainListBarSolid" + idl).style.width = (-1*n[1]) + "%";
                document.getElementById("MainListBarSolid" + idl).style.display = "block";
                document.getElementById("MainListBarSolid" + idl).style.backgroundImage = "url('Images/mainInfoTimePBarSolidGreen.png')";
            }
        }
        //Debug.Log(":::::::::" + img + "::::::::::::::::::");
        if (n[0] == " ") {
            document.getElementById("MainListBarEmpty" + idl).style.display = "none";
            document.getElementById("MainListBarSolid" + idl).style.display = "none";
        }
        
        //widgetAPI.putInnerHTML(document.getElementById("MainListTitle" + idl), "<strong>" + this.arrCategryNo[cx][cyy] + "</strong> " + this.arrCategryTitle[cx][cyy++] + n[3]);
        widgetAPI.putInnerHTML(document.getElementById("MainListTitle" + idl), "<strong>" + this.arrCategryNo[cx][cyy] + "</strong> " + this.arrCategryTitle[cx][cyy++]);
        widgetAPI.putInnerHTML(document.getElementById("MainListTitleC" + idl), n[3] + "     ");
        //widgetAPI.putInnerHTML(document.getElementById("MainListImg"+0), this.arrCategryTitle[cx][cyy++]);
        idl++;
    }
    //this.highlightTitle(this.titleIdx);

};
Main2.focusCategory = function (index) {
    document.getElementById("MainCategoryList" + index).style.backgroundImage = "url(Images/newsImg/category_highlight.png)";
    document.getElementById("MainCategoryTitle" + index).style.color = "#000000";
};
Main2.selectCategory = function (index) {
    document.getElementById("MainCategoryList" + index).style.backgroundImage = "url(Images/newsImg/category_selected.png)";
    document.getElementById("MainCategoryTitle" + index).style.color = "#86d7f2";
};

Main2.blurCategory = function (index) {
    document.getElementById("MainCategoryList" + index).style.backgroundImage = "none";
    document.getElementById("MainCategoryTitle" + index).style.color = "#eeeeee";
    //document.getElementById("MainListTitleB" + index).style.color = "#eeeeee";
    //document.getElementById("MainListTitleC" + index).style.color = "#eeeeee";
};
Main2.highlightTitle = function (index) {
    //Debug.Log("SceneMain.prototype.highlightTitle()");
    //Debug.Log(index);
    document.getElementById("MainList" + index).style.backgroundImage = "url(Images/newsImg/left_category_highlight.png)";
    document.getElementById("MainListTitle" + index).style.color = "#000000";
    document.getElementById("MainListTitleB" + index).style.color = "#000000";
    document.getElementById("MainListTitleC" + index).style.color = "#000000";

    var chan = Main2.arrTVID[Main2.categoryIdxC][Main2.articleIdx];
    Main.currentTV = Main2.GetCurrentTV(chan);
};
Main2.blurTitle = function (index) {
    //Debug.Log("SceneMain.prototype.blurTitle()");
    document.getElementById("MainList" + index).style.backgroundImage = "none";
    document.getElementById("MainListTitle" + index).style.color = "#eeeeee";
    document.getElementById("MainListTitleB" + index).style.color = "#eeeeee";
    document.getElementById("MainListTitleC" + index).style.color = "#eeeeee";
};
Main2.GetCurrentTV = function (chan)
{
    var so = chan.substring(0, 1);
    chan = chan.substring(1, chan.length);
    var CH;
    //Debug.Log("Enter chan: " + chan);
    //Debug.Log("Enter so: " + so);
    var minor;
    if (so == "d") {
        CH = Main.dIDs[chan];
        minor = 65534;
    }
    else {
        minor = 1;
        CH = Main.aIDs[chan];
    }
    return Main.GetIDs(minor,CH);
}


Main2.previousPage = function () {
    //Debug.Log("previousPage()");

    this.blurTitle(this.titleIdx);
    this.currentPage--;
    if (this.currentPage < 0) {
        this.currentPage = Math.round(this.arrCategryTitle[this.categoryIdxC].length / this.idl_max);
    }
    this.titleIdx = 0;
    this.articleIdx = this.currentPage * this.idl_max + 0;

    // refresh List
    this.showTitleList(this.articleIdx);
    //$('#MainScroll').sfScroll('move', this.currentPage);
    this.refreshTitle();
    //Debug.Log("[Main2] Page-----currentPage:" + this.currentPage + "-" + Math.round(this.arrCategryTitle[this.categoryIdxC].length / this.idl_max));
    //this.highlightTitle(this.titleIdx);


};

Main2.nextPage = function () {
    //Debug.Log("nextPage()");

    this.blurTitle(this.titleIdx);
    this.currentPage++;
    
    if (this.currentPage >= this.arrCategryTitle[this.categoryIdxC].length / this.idl_max) {
        this.currentPage = 0;
    }
    this.titleIdx = 0;
    this.articleIdx = this.currentPage * this.idl_max + 0;

    // refresh List
    this.showTitleList(this.articleIdx);
    // $('#MainScroll').sfScroll('move', this.currentPage);
    this.refreshTitle();
    //Debug.Log("[Main2] Page-----currentPage:" + this.currentPage + "-" + Math.round(this.arrCategryTitle[this.categoryIdxC].length / this.idl_max));
   // this.highlightTitle(this.titleIdx);


};

Main2.upArticle = function () {
    this.blurTitle(this.titleIdx);
    this.articleIdx--;
    this.titleIdx--;

    if (this.titleIdx < 0) {
        this.titleIdx = this.articleIdx % this.title_max_num;
        //  var cxx = Main2.idl_max * Main2.currentPageC + Main2.categoryIdx - this.categoryIdx;
        if (this.articleIdx < 0) {

            this.articleIdx = this.arrCategryTitle[this.categoryIdxC].length - 1;  // move to last article
            // if (this.articleIdx  > this.title_max_num) {
            this.titleIdx = this.articleIdx % this.title_max_num;
            //}
            // else {
            //    
            //    this.titleIdx = this.articleIdx;
            //    this.articleIdx = 0;
            // }
            //Debug.Log("// move to last article: " + this.titleIdx + "::a::" + this.articleIdx);
        }
        this.refreshTitle();

    }
    this.highlightTitle(this.titleIdx);

};

Main2.downArticle = function () {


    this.blurTitle(this.titleIdx);
    this.articleIdx++;
    this.titleIdx++;
    if (this.articleIdx % this.title_max_num == 0 || this.articleIdx > this.arrCategryTitle[this.categoryIdxC].length - 1) {
        this.titleIdx = 0;


        if (this.articleIdx > this.arrCategryTitle[this.categoryIdxC].length - 1) { // if last index is focused, move to first index.
            this.articleIdx = 0;
        }
        this.refreshTitle();

    }
    Main2.showTitleList();
    this.highlightTitle(this.titleIdx);

};

Main2.downArticleC = function () {
    Main2.blurCategory(Main2.categoryIdx);
    Main2.categoryIdxC++;
    if (Main2.categoryIdxC > this.arrCategryTitle.length - 1) { 
        Main2.categoryIdxC = 0;
    }
    Main2.categoryIdx = Main2.categoryIdxC % this.title_max_num;
    this.titleIdx = 0;
 
    Main2.setCatList();

};
Main2.SetArticleIdx = function (cid) {
    for (var idd = 0; idd < Main2.arrTVID[cid].length; idd++) {

        if (this.arrTVID[cid][idd] == "d" + Main.selectMajorTemp  || (this.arrTVID[cid][idd] == "a" + Main.selectMajorTemp && Main.selectMinorTemp==0)) {
            Debug.Log("[Main2] Current channel no.: " + idd);
            Main2.categoryIdx = 0;
            Main2.categoryIdxC = 0;
            Main2.articleIdx = idd;
            Main2.titleIdx = 0;
            Main2.currentPage = Math.round(idd / Main2.idl_max);
        }
    }
}
Main2.upArticleC = function () {
    Main2.blurCategory(Main2.categoryIdx);
    Main2.categoryIdxC--;
    if (Main2.categoryIdxC < 0 ) {
        Main2.categoryIdxC = this.arrCategryTitle.length-1;
    }
    Main2.categoryIdx = Main2.categoryIdxC % this.title_max_num;
    this.titleIdx = 0;

    Main2.setCatList();

};
Main2.refreshCategory = function () {
  
        this.titleIdx = 0;
        this.articleIdx = 0;
        if(this.categoryIdxC==0)
            Main2.SetArticleIdx(0);
    
    //for (var i = 0; i < this.idl_max; i++) {
    //    widgetAPI.putInnerHTML(document.getElementById("MainCategoryTitle" + i), "");
    //}
    this.setCatTitle(this.categoryIdxC, this.articleIdx);
    //delete this.arrArticles;           
    //Controller.start(Controller.categoryData[this.categoryIdx]);
};
Main2.refreshTitle = function () {
    this.showTitleList();
    this.setCatTitle(this.categoryIdxC, this.articleIdx);
    //delete this.arrArticles;           
    //Controller.start(Controller.categoryData[this.categoryIdx]);
};

Main2.showTitleList = function (index) {  // this index is starting index of articles shows first. 
    //Debug.Log("SceneMain.showTitleList()");

    // page Number
    var showPage = document.getElementById("MainPageNumber");

    //this.currentPage = this.articleIdx;
    var page = this.articleIdx + 1;
    page += "/";
    page += this.arrCategryTitle[this.categoryIdxC].length;//this.totalPage;
    showPage.innerHTML = page;

    // scroll
    //this.adjustScrollBar();

    // article List
    // var article = null;
    //for(var a = 0; a < this.title_max_num; a++) {
    //   article = this.arrArticles[index + a];
    //   if(article) {
    ///      this.arrTitles[a].innerHTML = this.wrapInTable(article.title, "", "MainListTitle_style");
    //	this.arrList[a].style.cursor = "pointer";
    //}
    //else {
    //    this.arrTitles[a].innerHTML = "";
    //     this.arrList[a].style.cursor = "default";
    // }
    //}
};