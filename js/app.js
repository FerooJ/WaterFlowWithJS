window.onload = function () {
    imgLocation("container", "box")

    var imgData={"data":[{"src":"jj1.jpg"},{"src":"jj2.jpg"},{"src":"jj3.jpg"},{"src":"jj4.jpg"},{"src":"jj5.jpg"},{"src":"jj6.jpg"},{"src":"jj7.jpg"},{"src":"jj8.jpg"},{"src":"jj9.jpg"},{"src":"jj10.jpg"},{"src":"jj1.jpg"}]};
    window.onscroll = function () {
        if(checkFlay()){
            var cparent = document.getElementById("container");
            for(var i=0; i<imgData.data.length;i++){
                var ccontent = document.createElement("div");
                ccontent.className="box";
                cparent.appendChild(ccontent);
                var boximg = document.createElement("div");
                boximg.className="box_img";
                ccontent.appendChild(boximg);
                var cimg = document.createElement("img");
                cimg.src="img/"+imgData.data[i].src;
                boximg.appendChild(cimg);
            }
            imgLocation("container", "box");
        }
    }
}

//处理滚动加载更多
function checkFlay() {
    var cparent = document.getElementById("container");
    var ccontent = getChildElement(cparent, "box");
    var lastContentHeight = ccontent[ccontent.length-1].offsetTop;
    var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
    var pageHeight = document.documentElement.clientHeight||document.body.clientHeight;
    if (lastContentHeight < scrollTop+pageHeight){
        return true;
    }

}

function imgLocation(parent, content) {
    //将parent下所有的content全部取出
    var cparent = document.getElementById(parent);
    var ccontent = getChildElement(cparent,content);
    //处理总宽度
    var imgWidth =ccontent[0].offsetWidth;
    var num = Math.floor(document.documentElement.clientWidth / imgWidth);
    cparent.style.cssText = "width:"+imgWidth*num+"px;margin:0 auto";

    //将下一行第一个图放在上一行最矮的图下方
    var boxHeightArr=[];
    for(var i=0;i<ccontent.length;i++){
        if(i<num){
            boxHeightArr[i]=ccontent[i].offsetHeight;
        }else {
            var minheight = Math.min.apply(null, boxHeightArr);
            var minIndex = getMinHeightLocation(boxHeightArr,minheight);
            ccontent[i].style.position = "absolute";
            ccontent[i].style.top=minheight+"px";
            ccontent[i].style.left=ccontent[minIndex].offsetLeft+"px";
            boxHeightArr[minIndex] = boxHeightArr[minIndex]+ccontent[i].offsetHeight;
        }
    }
}

function getMinHeightLocation(boxHeightArr, minHeight) {
    for(var i in boxHeightArr){
        if(boxHeightArr[i] == minHeight){
           return i;
        }
    }
}

function getChildElement(parent,content) {
    var contentArr = [];
    var allcontent = parent.getElementsByTagName("*");
    for (var i = 0; i<allcontent.length;i++){
        if(allcontent[i].className==content){
            contentArr.push(allcontent[i]);
        }
    }
    return contentArr;
}