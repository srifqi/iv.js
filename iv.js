var IV = IV || function(){
	this.container = {};
	this.list = [];
	this.width = 0;
	this.height = 0;
	this.at = 0;
	this.timer = {};
	this.id = Date.now();
	
	window["IV"+this.id] = this;
	
	window["IV"+this.id+"_prev"] = new Function("window['IV"+this.id+"'].prev();");
	window["IV"+this.id+"_next"] = new Function("window['IV"+this.id+"'].next();");
};

IV.prototype = {
	next: function(){
		this.at = this.at<this.list.length-1?this.at+1:0;
		this.draw();
	},
	prev: function(){
		this.at = this.at>0?this.at-1:this.list.length-1;
		this.draw();
	},
	"goto": function(at){
		this.at = Math.min(Math.max(at-1,0),this.list.length);
		this.draw();
	},
	play: function(time,from){
		this.at = from || 0;
		this.timer = setInterval(new Function("window['IV"+this.id+"_next']()"),time);
		this.draw();
	},
	stop: function(){
		clearInterval(this.timer);
	},
	draw: function(){
		var wLonger = this.width > this.height ? true : false;
		this.container.innerHTML = "<div class='ivjs-container' style='"+
				"position:relative;"+
				"width:"+this.width+";"+
				"height:"+this.height+";"+
				"background:black;"+
				"color:white;"+
				"display:table-cell;"+
				"vertical-align:middle;"+
				"text-align:center;"+
		"'>"+
			"<style>"+
				"div.ivjs-container div{"+
					"opacity:0;"+
					"position:absolute;"+
					"top:"+(this.height*2/5)+"px;"+
					"font-size:"+(this.height/5)+"px;"+
				"}"+
				"div.ivjs-container:hover div{"+
					"opacity:1;"+
				"}"+
			"</style>"+
			"<img src='"+this.list[this.at].url+"' style='"+
				"max-width:"+this.width+";"+
				"max-height:"+this.height+";"+
			"' />"+
			"<div style='"+
				"left:0px;cursor:pointer;"+
				"width:"+(this.width/10)+"px;'"+
			" onclick='IV"+this.id+"_prev()'><b>&lt;</b></div>"+
			"<div style='"+
				"right:0px;cursor:pointer;"+
				"width:"+(this.width/10)+"px;'"+
			" onclick='IV"+this.id+"_next()'><b>&gt;</b></div>"+
			"<div style='"+
				"top:0px;left:"+(this.width/10)+"px;"+
				"width:"+(this.width*8/10)+"px;"+
				"height:"+(this.height)+"px;"+
				"padding:8px;"+
			"'>"+
				"<span style='"+
					"font-family:Arial;"+
					"font-size:20px;"+
					"background:black;"+
				"'>"+
					this.list[this.at].desc+
				"</span>"+
			"</div>"+
		"</div>";
		console.log(this.container.innerHTML);
	}
};
