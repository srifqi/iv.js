iv.js
=====

Simple Image Viewer for Web Pages in Javascript


#Usage
===================================
//build container
var myViewer = new IV();
myViewer.container = document.body;

//add image to album
myViewer.list.push({
    url: "test.png",
	desc: "Test Image"
});

//set the size
myViewer.width = 800;
myViewer.height = 600;

//draw
myViewer.draw();
===================================