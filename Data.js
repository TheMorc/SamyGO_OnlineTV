var Data =
{
    videoNames : [ ],
    videoDesc : [ ],
    videoURLs : [ ],
    videoDescriptions : [ ],
	videoTypes : [ ],
	videoImages : [ ],
	videoTVID : [ ],
	
	
	videoNamesCopy : [ ],
	videoDescCopy : [ ],
    videoURLsCopy : [ ],
    videoDescriptionsCopy : [ ],
	videoTypesCopy : [ ],
	videoImagesCopy : [ ],
	videoTVIDCopy : [ ],
	
	category:  new Array(),
	categoryTitle: [ ],
	categoryTitleCopy: [ ],
	
	tvID : [ ],
	tvIdxURLs: [ ],
	tvSources: [ ],
	tvTypes: [ ],
	tvLink: [],

	langC: new Array(),
    langS: new Array(),
};
Data.Clean = function () {
    Data.videoNames = [];
    Data.videoDesc = [];
    Data.videoURLs = [];
    Data.videoDescriptions = [];
    Data.videoTypes = [];
    Data.videoImages = [];
    Data.videoTVID = [];
	
	
    Data.videoNamesCopy = [];
    Data.videoDescCopy = [];
    Data.videoURLsCopy = [];
    Data.videoDescriptionsCopy = [];
    Data.videoTypesCopy = [];
    Data.videoImagesCopy = [];
    Data.videoTVIDCopy = [];
	
    Data.category = new Array();
    Data.categoryTitle = new Array();
    Data.categoryTitleCopy = [];
	
    Data.tvID = [];
    Data.tvIdxURLs = [];
    Data.tvSources = [];
    Data.tvTypes = [];
    Data.tvLink = [];
};
Data.setCategoryNames = function()
{
	this.videoNames = this.categoryTitle;
	this.videoDesc = [];
	this.videoURLs = [];
	this.videoDescriptions = [];
	this.videoTypes = [];
	this.videoImages = [];
	this.videoTVID = [];
	for (var i = 0; i < this.categoryTitle.length; i++)
	{
		this.videoURLs[i] = null;
		this.videoDesc[i] = null;
		this.videoDescriptions[i] = "Lista kategorii kanałów TV";
		this.videoTypes[i] = null;
		this.videoImages[i] = null;
		this.videoTVID[i] = null;
	}
};

Data.setCategory = function(listCat, list)
{
	var idCat = -1;
	 //alert("categoryTitle: "+ Data.categoryTitleCopy);
	this.categoryTitle = new Array();
	for (var i = 0; i < listCat.length; i++)
	{
		var id = 0;
		alert("Nr kat: " + listCat[i]+ ", " +this.categoryTitleCopy[i]);
		var first = true;
		
		for (var j = 0; j < list.length; j++)
		{
			for (var k = 0; k < list[j].length; k++)
			{
				if(listCat[i] == list[j][k])
				{
					
					if(first)
					{
						idCat++;
						this.category[idCat] = new Array();
						//alert("this.categoryTitle["+idCat+"]: " + this.categoryTitleCopy[i]);
						this.categoryTitle[idCat] = this.categoryTitleCopy[i];
						
						first = false;
					}
					//alert("i:" + i + ", id: " + id + "=" + j);
					
					this.category[idCat][id++] = j;	
					break;
					
				}
			}
		}
	}
	this.categoryTitle[this.categoryTitle.length] = "Wszystkie";
};
Data.setVideoWithCategory = function(id)
{
	Main.strCategory = this.categoryTitle[id];
	alert("this.category.length:" +this.category.length);
	alert("this.categoryTitle.length:" +this.categoryTitle.length);
	if(id<this.category.length)
		{
		alert("id:" +id);
			var vNames = [ ];
			var vDesc = [ ];
			var vURLs = [ ];
			var vDescriptions = [ ];
			var vTypes = [ ];
			var vImages = [ ];
			var vTVID = [ ];
			//alert("this.category[id].length: " +this.category[id].length);
			for(var i=0; i<this.category[id].length;i++)
				{
					vNames[i] = this.videoNamesCopy[this.category[id][i]];
					vDesc [i] = this.videoDescCopy[this.category[id][i]];
					vURLs[i] =  this.videoURLsCopy[this.category[id][i]];
					vDescriptions[i] = this.videoDescriptionsCopy[this.category[id][i]];
					vTypes[i] = this.videoTypesCopy[this.category[id][i]];
					vImages[i] = this.videoImagesCopy[this.category[id][i]];
					vTVID[i] = this.videoTVIDCopy[this.category[id][i]];
				}
			this.videoNames = vNames;
			this.videoDesc = vDesc;
			this.videoURLs = vURLs;
			this.videoDescriptions = vDescriptions;
			this.videoTypes = vTypes;
			this.videoImages = vImages;
			this.videoTVID = vTVID;
		}
	else
		{
		alert("ggg");
		this.videoNames = this.videoNamesCopy;
		this.videoDesc = this.videoDescCopy;
		this.videoURLs = this.videoURLsCopy;
		this.videoDescriptions = this.videoDescriptionsCopy;
		this.videoTypes = this.videoTypesCopy;
		this.videoImages = this.videoImagesCopy;
		this.videoTVID = this.videoTVIDCopy;
		}
	
};
Data.findID = function(id, source)
{
	//alert("::this.tvID.length: " + this.tvID.length);//id + " ...and... " + source);
	 for (var idx = 0; idx < this.tvID.length; idx++)
	 {
		 alert(this.tvID[idx] + " == " +  id + " && "+ this.tvSources[idx] + " == " + source);
		 if(this.tvID[idx] == id && this.tvSources[idx] == source)
		 {
			 return idx;
		 }

	 }
	 return null;
};
Data.settvID = function(list)
{
	this.tvID = list;	
	alert("Tvid: " + this.tvID.length);
};
Data.settvIdxURLs = function(list)
{
	this.tvIdxURLs = list;	
	alert("tvIdxURLs: " + this.tvIdxURLs.length);
};
Data.settvSources = function(list)
{
	this.tvSources = list;	
	alert("tvSources: " + this.tvSources.length);
};
Data.settvTypes = function(list)
{
	this.tvTypes = list;	
	alert("tvTypes: " + this.tvTypes.length);
};
Data.settvLink = function(list)
{
	this.tvtvLink = list;	
	alert("tvtvLink: " + this.tvtvLink.length);
};

Data.setCategoryTitle = function(list)
{
	this.categoryTitleCopy = list;	
};

Data.setVideoNames = function(list)
{
    this.videoNames = list;
    this.videoNamesCopy = list;
};
Data.setVideoDesc = function(list)
{
    this.videoDesc = list;
    this.videoDescCopy = list;
};
Data.setVideoTVID = function(list)
{
    this.videoTVID= list;
    this.videoTVIDCopy = list;
};
Data.setVideoURLs = function(list)
{
    this.videoURLs = list;
    this.videoURLsCopy = list;
};

Data.setVideoDescriptions = function(list)
{
    this.videoDescriptions = list;
    this.videoDescriptionsCopy = list;
};

Data.setVideoTypes = function(list)
{
    this.videoTypes = list;
    this.videoTypesCopy = list;
};
Data.setVideoImages = function(list)
{
    this.videoImages = list;
    this.videoImagesCopy = list;
};
Data.getVideoURL = function(index)
{
    var url = this.videoURLs[index];
    
    if (url)    // Check for undefined entry (outside of valid array)
    {
        return url;
    }
    else
    {
        return null;
    }
};

Data.getVideoCount = function()
{
    return this.videoURLs.length;
};

Data.getCategoryTitles = function()
{
    return this.categoryTitle;
};
Data.getVideoNames = function()
{
    return this.videoNames;
};

Data.getVideoDescription = function(index)
{
    var description = this.videoDescriptions[index];
    
    if (description)    // Check for undefined entry (outside of valid array)
    {
        return description;
    }
    else
    {
        return "No description";
    }
};

Data.getVideoTypes= function(index)
{
    var type = this.videoTypes[index];
    
    if (type)    // Check for undefined entry (outside of valid array)
    {
        return type;
    }
    else
    {
        return "No type";
    }
};
Data.getVideoImages= function(index)
{
    var image = this.videoImages[index];
    
    if (image)    // Check for undefined entry (outside of valid array)
    {
        return image;
    }
    else
    {
        return "No image";
    }
};
Data.init = function () {
    //reference: http://forum.doom9.org/showthread.php?p=1419193#post1419193
    this.langC = [6381938, 6382187, 6382437, 6382440, 6382689, 6382713, 6383201, 6383208, 6383218, 6383982, 6384481, 6384491, 6384738, 6384741, 6384743, 6384756, 6385000, 6385255, 6385264, 6385761, 6386273, 6386275, 6386279, 6386285, 6386286, 6386288, 6386292, 6386295, 6386541, 6386548, 6386792, 6387059, 6387297, 6387301, 6387553, 6388077, 6388325, 6447460, 6447465, 6447467, 6447468, 6447469, 6447470, 6447473, 6447475, 6447476, 6448490, 6448492, 6448493, 6448494, 6448498, 6449263, 6449512, 6449515, 6449518, 6449523, 6450273, 6450804, 6451044, 6451059, 6451809, 6451813, 6452331, 6452577, 6452583, 6452588, 6452594, 6453614, 6512996, 6513001, 6513010, 6513012, 6513013, 6514018, 6514028, 6514035, 6514785, 6514786, 6514789, 6514791, 6514793, 6514795, 6514797, 6514798, 6514799, 6514800, 6514802, 6514805, 6514806, 6514809, 6516067, 6516592, 6516594, 6516595, 6516837, 6516838, 6516848, 6517349, 6517352, 6517360, 6517602, 6518131, 6519149, 6519397, 6578539, 6578542, 6578546, 6578553, 6579564, 6579566, 6579573, 6580082, 6580590, 6580598, 6582121, 6582881, 6583138, 6583649, 6583661, 6583668, 6584693, 6584943, 6645353, 6645625, 6646625, 6646892, 6646904, 6647399, 6647405, 6647919, 6648692, 6649203, 6649701, 6649711, 6709614, 6709615, 6709619, 6709620, 6711658, 6711660, 6711662, 6711669, 6713198, 6713953, 6713957, 6713965, 6713967, 6713970, 6713971, 6713977, 6714732, 6714738, 6775137, 6775161, 6775393, 6776173, 6776175, 6776178, 6776186, 6777196, 6777953, 6777957, 6777959, 6777974, 6778216, 6778728, 6778734, 6778738, 6778740, 6779490, 6779491, 6779493, 6779502, 6779767, 6780266, 6780777, 6840681, 6840692, 6840693, 6840695, 6841698, 6841714, 6842732, 6842733, 6842734, 6842740, 6843758, 6843759, 6845046, 6845282, 6845806, 6845808, 6846821, 6906465, 6906479, 6906725, 6906991, 6908265, 6908527, 6908789, 6909029, 6909039, 6909537, 6909539, 6909540, 6909541, 6909544, 6910059, 6910561, 6910575, 6910828, 6911073, 6971766, 6972015, 6975598, 6975602, 6976098, 7037281, 7037282, 7037283, 7037292, 7037293, 7037294, 7037298, 7037299, 7037300, 7037301, 7037303, 7037306, 7037540, 7039073, 7039081, 7039085, 7039087, 7039339, 7039342, 7039346, 7040354, 7040875, 7040877, 7040878, 7040882, 7040883, 7041125, 7041635, 7041644, 7041647, 7041653, 7042401, 7042413, 7042418, 7042420, 7102820, 7102824, 7102829, 7102831, 7102836, 7102838, 7103866, 7104877, 7104878, 7104884, 7106412, 7106426, 7107706, 7107937, 7107938, 7107943, 7107945, 7107950, 7107951, 7107955, 7168355, 7168356, 7168359, 7168360, 7168361, 7168363, 7168364, 7168366, 7168367, 7168368, 7168370, 7168371, 7168377, 7169126, 7169138, 7169390, 7169889, 7170403, 7170414, 7170419, 7170916, 7170920, 7171175, 7171188, 7171683, 7171689, 7171695, 7171944, 7171948, 7171950, 7171955, 7172713, 7172961, 7173484, 7173486, 7173491, 7173996, 7174002, 7174497, 7174510, 7174518, 7233896, 7233897, 7233904, 7233909, 7233910, 7234156, 7234661, 7234671, 7234675, 7234928, 7234935, 7235937, 7235939, 7235957, 7236708, 7237231, 7237474, 7237479, 7237486, 7237490, 7237999, 7238511, 7239010, 7239523, 7240033, 7240045, 7240046, 7240047, 7240297, 7299945, 7301737, 7303785, 7303789, 7304033, 7304051, 7304289, 7304303, 7364961, 7364967, 7364972, 7364973, 7364974, 7364976, 7364981, 7365999, 7366002, 7366761, 7366766, 7367785, 7368556, 7368558, 7368562, 7369313, 7369327, 7370099, 7430497, 7435621, 7496042, 7496048, 7496050, 7499617, 7499624, 7499629, 7499630, 7501165, 7501166, 7501168, 7501171, 7561572, 7561575, 7561576, 7561577, 7561580, 7561581, 7561582, 7561587, 7561588, 7562094, 7562095, 7562604, 7562605, 7563105, 7563118, 7563374, 7563620, 7563630, 7563631, 7563636, 7564385, 7564395, 7564399, 7564406, 7564641, 7564645, 7564649, 7564650, 7564654, 7564655, 7564659, 7564897, 7564900, 7564907, 7565159, 7565165, 7565166, 7565172, 7565409, 7565673, 7565924, 7565934, 7565936, 7565938, 7566177, 7566199, 7566699, 7566702, 7566707, 7566712, 7567201, 7567205, 7567715, 7567730, 7627112, 7627113, 7627117, 7627124, 7628140, 7628141, 7628146, 7628148, 7628651, 7628652, 7628897, 7629154, 7629159, 7629170, 7629174, 7629676, 7629928, 7629929, 7630184, 7630695, 7630702, 7630953, 7631721, 7631726, 7631727, 7632235, 7632237, 7632240, 7632242, 7632244, 7632492, 7632745, 7633270, 7693421, 7694177, 7694695, 7695218, 7695714, 7695972, 7696996, 7699042, 7758185, 7759214, 7760229, 7761772, 7761780, 7823723, 7823724, 7823730, 7823731, 7824748, 7824750, 7826542, 7827308, 7889260, 7891055, 7954799, 7954800, 7956836, 7958386, 7958635, 8020336, 8020588, 8021358, 8022113, 8022127, 8023652, 8025452, 8025454, 8026232, 8026721];
    this.langS = ["aar", "abk", "ace", "ach", "ada", "ady", "afa", "afh", "afr", "ain", "aka", "akk", "alb", "ale", "alg", "alt", "amh", "ang", "anp", "apa", "ara", "arc", "arg", "arm", "arn", "arp", "art", "arw", "asm", "ast", "ath", "aus", "ava", "ave", "awa", "aym", "aze", "bad", "bai", "bak", "bal", "bam", "ban", "baq", "bas", "bat", "bej", "bel", "bem", "ben", "ber", "bho", "bih", "bik", "bin", "bis", "bla", "bnt", "bod", "bos", "bra", "bre", "btk", "bua", "bug", "bul", "bur", "byn", "cad", "cai", "car", "cat", "cau", "ceb", "cel", "ces", "cha", "chb", "che", "chg", "chi", "chk", "chm", "chn", "cho", "chp", "chr", "chu", "chv", "chy", "cmc", "cop", "cor", "cos", "cpe", "cpf", "cpp", "cre", "crh", "crp", "csb", "cus", "cym", "cze", "dak", "dan", "dar", "day", "del", "den", "deu", "dgr", "din", "div", "doi", "dra", "dsb", "dua", "dum", "dut", "dyu", "dzo", "efi", "egy", "eka", "ell", "elx", "eng", "enm", "epo", "est", "eus", "ewe", "ewo", "fan", "fao", "fas", "fat", "fij", "fil", "fin", "fiu", "fon", "fra", "fre", "frm", "fro", "frr", "frs", "fry", "ful", "fur", "gaa", "gay", "gba", "gem", "geo", "ger", "gez", "gil", "gla", "gle", "glg", "glv", "gmh", "goh", "gon", "gor", "got", "grb", "grc", "gre", "grn", "gsw", "guj", "gwi", "hai", "hat", "hau", "haw", "heb", "her", "hil", "him", "hin", "hit", "hmn", "hmo", "hrv", "hsb", "hun", "hup", "hye", "iba", "ibo", "ice", "ido", "iii", "ijo", "iku", "ile", "ilo", "ina", "inc", "ind", "ine", "inh", "ipk", "ira", "iro", "isl", "ita", "jav", "jbo", "jpn", "jpr", "jrb", "kaa", "kab", "kac", "kal", "kam", "kan", "kar", "kas", "kat", "kau", "kaw", "kaz", "kbd", "kha", "khi", "khm", "kho", "kik", "kin", "kir", "kmb", "kok", "kom", "kon", "kor", "kos", "kpe", "krc", "krl", "kro", "kru", "kua", "kum", "kur", "kut", "lad", "lah", "lam", "lao", "lat", "lav", "lez", "lim", "lin", "lit", "lol", "loz", "ltz", "lua", "lub", "lug", "lui", "lun", "luo", "lus", "mac", "mad", "mag", "mah", "mai", "mak", "mal", "man", "mao", "map", "mar", "mas", "may", "mdf", "mdr", "men", "mga", "mic", "min", "mis", "mkd", "mkh", "mlg", "mlt", "mnc", "mni", "mno", "moh", "mol", "mon", "mos", "mri", "msa", "mul", "mun", "mus", "mwl", "mwr", "mya", "myn", "myv", "nah", "nai", "nap", "nau", "nav", "nbl", "nde", "ndo", "nds", "nep", "new", "nia", "nic", "niu", "nld", "nno", "nob", "nog", "non", "nor", "nqo", "nso", "nub", "nwc", "nya", "nym", "nyn", "nyo", "nzi", "oci", "oji", "ori", "orm", "osa", "oss", "ota", "oto", "paa", "pag", "pal", "pam", "pan", "pap", "pau", "peo", "per", "phi", "phn", "pli", "pol", "pon", "por", "pra", "pro", "pus", "qaa", "que", "raj", "rap", "rar", "roa", "roh", "rom", "ron", "rum", "run", "rup", "rus", "sad", "sag", "sah", "sai", "sal", "sam", "san", "sas", "sat", "scn", "sco", "sel", "sem", "sga", "sgn", "shn", "sid", "sin", "sio", "sit", "sla", "slk", "slo", "slv", "sma", "sme", "smi", "smj", "smn", "smo", "sms", "sna", "snd", "snk", "sog", "som", "son", "sot", "spa", "sqi", "srd", "srn", "srp", "srr", "ssa", "ssw", "suk", "sun", "sus", "sux", "swa", "swe", "syc", "syr", "tah", "tai", "tam", "tat", "tel", "tem", "ter", "tet", "tgk", "tgl", "tha", "tib", "tig", "tir", "tiv", "tkl", "tlh", "tli", "tmh", "tog", "ton", "tpi", "tsi", "tsn", "tso", "tuk", "tum", "tup", "tur", "tut", "tvl", "twi", "tyv", "udm", "uga", "uig", "ukr", "umb", "und", "urd", "uzb", "vai", "ven", "vie", "vol", "vot", "wak", "wal", "war", "was", "wel", "wen", "wln", "wol", "xal", "xho", "yao", "yap", "yid", "yor", "ypk", "zap", "zbl", "zen", "zha", "zho", "znd", "zul", "zun", "zxx", "zza"];
    return true;
};
Data.GetLang = function (code) {
    if (code != -1) {
        for (var i = 0; i < this.langC.length; i++) {
            if (this.langC[i] == code) {
                return this.langS[i];
            }
        }
    }
    return "$";
};