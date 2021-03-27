var slider = document.getElementById("brushSizeSelector");

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
var brushStatus = 0;

const img = document.querySelector("img"); 
ctx.drawImage(img, 0, 0);

const brushSelector = document.getElementById('brushSelector');
const ctxBS = brushSelector.getContext('2d')
const brushPreset = ctxBS.createImageData(brushSelector.width, brushSelector.height);
for (let i = 0; i< brushPreset.data.length; i+=4){
    brushPreset.data[i + 0] = 255;  // R value
    brushPreset.data[i + 1] = 255;    // G value
    brushPreset.data[i + 2] = 255;  // B value
    brushPreset.data[i + 3] = 0;  // A value
}

const brush1 = ctx.createImageData(brushSelector.width, brushSelector.height);
for (let i = 0; i< brush1.data.length; i+=4){
    brush1.data[i + 0] = 255;  // R value
    brush1.data[i + 1] = 255;    // G value
    brush1.data[i + 2] = 255;  // B value
    brush1.data[i + 3] = 0;  // A value
}

function brushSize(){
    var size = slider.value;
    var centreX = brushSelector.width/2;
    var centreY = brushSelector.width/2;

    for (let i = 0; i< brushPreset.data.length; i+=4){
        var x = (i/4) % brushSelector.width;
        var y = Math.floor((i/4)/brushSelector.width);
        posX = Math.pow(x-centreX, 2)
        posY = Math.pow(y-centreY, 2);
        size2 = Math.pow(size, 2);
        if( posX+posY < size2){
            brushPreset.data[i + 0] = 0;  // R value
            brushPreset.data[i + 1] = 0;    // G value
            brushPreset.data[i + 2] = 0;  // B value
            brushPreset.data[i + 3] = 255;  // A value
        }else{
            brushPreset.data[i + 0] = 0;  // R value
            brushPreset.data[i + 1] = 0;    // G value
            brushPreset.data[i + 2] = 0;  // B value
            brushPreset.data[i + 3] = 0;  // A value
        }
        //console.log(posX + ":" + posY + ":" + size2);
    }
    ctxBS.clearRect(0, 0, brushSelector.width, brushSelector.height);
    ctxBS.putImageData(brushPreset, 0, 0);
    for (let i = 0; i< brushPreset.data.length; i+=1){
        brush1.data[i] = brushPreset.data[i];  // R value
    }
}

function brushDown(){
    brushStatus = 1;
};

function brushUp(){
    brushStatus = 0;
};

function paint(event){

    if(brushStatus == 1){
        var canvasRect = canvas.getBoundingClientRect();
        var x = event.pageX - (canvasRect.x + (brushSelector.height/2));
        var y = event.pageY - (canvasRect.y + (brushSelector.width/2));
        var imageChange = ctx.getImageData(x, y, brush1.width, brush1.height);
        for(let i = 0; i < brush1.data.length; i+=4){
            if ( brush1.data[i+3] == 255 ){
                imageChange.data[i] = 0;
                imageChange.data[i+1] =  0;
                imageChange.data[i+2] =  0;
                imageChange.data[i+3] =  255;
            }    
        }
        console.log(imageChange);
        ctx.putImageData(imageChange, x, y)
    }

};


function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

