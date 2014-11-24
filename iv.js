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
		this.container.innerHTML = [
			"<table class='ivjs-container' style='",
				"background:black url(",this.list[this.at].url,");",
				"background-position:center;",
				"background-repeat:no-repeat;",
				"background-size:",
					(wLonger===true?"auto 100%;":"100% auto;"),
			"'>",
				"<style>",
					".ivjs-container td {",
						"height:100%;",
						"color:white;",
						"font-size:",(this.width/5),"px;",
						"opacity:0;",
					"}",
					".ivjs-container:hover td {",
						"opacity:1;",
					"}",
				"</style>",
				"<tbody>",
					"<tr>",
						"<td ",
							"style='cursor:pointer;width:"+(this.width/10)+"px;'",
							"onclick='IV",this.id,"_prev()'",
						">&lt;</td>",
						"<td>",
							"<div style='",
								"width:"+(this.width*8/10)+"px;",
								"height:"+(this.height)+"px;",
								"text-align:center;",
								"padding:8px;",
							"'>",
								"<span style='",
									"font-family:Arial;",
									"font-size:20px;",
									"background:black;",
								"'>",
									this.list[this.at].desc,
								"</span>",
							"</div>",
						"</td>",
						"<td ",
							"style='cursor:pointer;width:"+(this.width/10)+"px;'",
							"onclick='IV",this.id,"_next()'",
						">&gt;</td>",
					"</tr>",
				"</tbody>",
			"</table>"
		].join("");
	}
};