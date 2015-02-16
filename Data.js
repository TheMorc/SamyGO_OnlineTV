var Data =
{
    videoNames : [ ],
    videoURLs : [ ],
    //videoDescriptions : [ ],
	videoTypes : [ ],
	videoImages : [ ],
	videoTVID : [ ],
	
	
	videoNamesCopy : [ ],
    videoURLsCopy : [ ],
    //videoDescriptionsCopy : [ ],
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
	tvLink: [ ],
};
Data.setCategoryNames = function()
{
	this.videoNames = this.categoryTitle;
	this.videoURLs = [];
	//this.videoDescriptions = [];
	this.videoTypes = [];
	this.videoImages = [];
	this.videoTVID = [];
	for (var i = 0; i < this.categoryTitle.length; i++)
	{
		this.videoURLs[i] = null;
		//this.videoDescriptions[i] = "Lista kategorii kanałów TV";
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
	this.categoryTitle[this.categoryTitle.length] = "Any";
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
			var vURLs = [ ];
			//var vDescriptions = [ ];
			var vTypes = [ ];
			var vImages = [ ];
			var vTVID = [ ];
			//alert("this.category[id].length: " +this.category[id].length);
			for(var i=0; i<this.category[id].length;i++)
				{
					vNames[i] = this.videoNamesCopy[this.category[id][i]];
					vURLs[i] =  this.videoURLsCopy[this.category[id][i]];
					//vDescriptions[i] = this.videoDescriptionsCopy[this.category[id][i]];
					vTypes[i] = this.videoTypesCopy[this.category[id][i]];
					vImages[i] = this.videoImagesCopy[this.category[id][i]];
					vTVID[i] = this.videoTVIDCopy[this.category[id][i]];
				}
			this.videoNames = vNames;
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
		this.videoURLs = this.videoURLsCopy;
		//this.videoDescriptions = this.videoDescriptionsCopy;
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
    //this.videoDescriptions = list;
    //this.videoDescriptionsCopy = list;
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
    //var description = this.videoDescriptions[index];
    
    //if (description)    // Check for undefined entry (outside of valid array)
    //{
    //    return description;
    //}
    //else
    //{
    //    return "No description";
    //}
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