var Settings =
{
    SoundTrackLangPriority: new Array(),
    RestartTVChannel: 16, //start channel when TV start with Power key
    bLogWriteToFile: true, //log write to file
    bLogTimer: false, //add timer to log line
    HLS: new Object(),
    RecDir: "/dtv/usb/sda1/REC", //rec http source directory
    RecDirAlt: "/dtv/usb/sdb1/REC", //rec http source altenative directory 
    bCheckRecDir: true,
    autoPauseMode: true, //auto set Pause mode when detect standard source for channel
    TvList: "TvList.xml", //path or link to TvList.xml file//
    UserCategories: new Array(),
    MinCategoriesCreate: 3, //Minimum number program event to create category in Now on TV GUIDE
    IgnoringProgramProcent: 90, //Ignore program evet in Now on TV GUIDE if it takes longer to indicated value
    AddProgramIfMinutes: 5,  //Add program to Now on TV GUIDE if it start behind indicated value
    PremiereCategory: "Premiere", //Word of premiera item in short description
    bMoreStreamInfo: true,
    MoreStreamInfoExtAppPath: "/mtd_rwcommon/ffmpeg",
    DelayMoreStreamInfo: 5000,
    
};
//User Favorite Categories Array
Settings.UserCategories[0] = "Movie";
Settings.UserCategories[1] = "Music";
Settings.UserCategories[2] = "Docu";


//HLS Settings
Settings.HLS.STARTBITRATE = "HIGHEST"; //LOWEST, AVERAGE, HIGHEST
//SoundTrackLangPriority Settings
//Reference: http://forum.doom9.org/showthread.php?p=1419193#post1419193
Settings.SoundTrackLangPriority[0] = 6514035;//pol
Settings.SoundTrackLangPriority[1] = 7564395;//eng
Settings.SoundTrackLangPriority[2] = 7564399;//eng

//For any type stream
//If the Value < 1KB then set default Value
//E.g. If you want to set 5MB then set the Value to 5120KB = 1024 * 5
Settings.SetTotalBufferSize_AllType = 1024 * 250; //It sets the total It sets the total It sets the total (KB)
Settings.SetInitialBufferSize_AllType = 0; // It sets the initial buffered data size before start playback (KB)
Settings.SetPendingBufferSize_AllType = 0; //It sets the minimum data size which goes out from buffering, when media player is on buffering status (KB)
//If the Value < 1ms then set default Value
Settings.SetInitialTimeOut_AllType = 0; //It sets the maximum time out value for initial buffering before starting playback (ms)

//Individual for some type stream
Settings.SetTotalBufferSize = {
    'RADIO': 1024 * 1,
    'HTTP-HD': 1024 * 50,
};
Settings.SetInitialBufferSize = {
    'RADIO': 128 * 1,
    'HTTP-HD': 1024 * 12,
};
Settings.SetPendingBufferSize = {
    'RADIO': 128 * 1,
    'HTTP-HD': 1024 * 12,
};

Settings.SetInitialTimeOut = {
    'RADIO': 30,
    'HTTP-HD': 1000,
};



