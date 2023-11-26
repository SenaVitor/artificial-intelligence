(function(){
    var cnv = document.querySelector("canvas");
    var ctx = cnv.getContext("2d");

    const WIDTH = cnv.width, HEIGHT = cnv.height;
    
    const LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;
    let mvLeft = mvUp = mvRight = mvDown = false;

    const tileSize = 32;
    
    const base = [{
        name: "D1",
        x: 32,
        y: 32,
        centroide: null
    },{
        name: "D2",
        x: 128,
        y: 128,
        centroide: null
    },{
        name: "D3",
        x: 640,
        y: 640,
        centroide: null
    },{
        name: "D4",
        x: 160,
        y: 160,
        centroide: null
    },{
        name: "D5",
        x: 224,
        y: 224,
        centroide: null
    },{
        name: "D6",
        x: 576,
        y: 576,
        centroide: null
    },{
        name: "D7",
        x: 576,
        y: 640,
        centroide: null
    },{
        name: "D8",
        x: 64,
        y: 128,
        centroide: null
    },{
        name: "D9",
        x: 192,
        y: 64,
        centroide: null
    },{
        name: "D10",
        x: 448,
        y: 448,
        centroide: null
    }]
    
    let centroideOne = {
        x: base[2].x,
        y: base[2].y
    }
    
    let centroideTwo = {
        x: base[7].x,
        y: base[7].y
    } 

    var maze = [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ];

    const retorno = kMeans(base, centroideOne, centroideTwo);
    centroideOne = retorno.centroideOne;
    centroideTwo = retorno.centroideTwo;
    let pointsOne = retorno.pointsOne;
    let pointsTwo = retorno.pointsTwo;

    function update(){
        
    }

    function render(){
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        for(var row in maze){
            for(var column in maze[row]){
                var tile = maze[row][column];
                var x = column*tileSize;
                var y = row*tileSize;
                if(base.find(no => no.x === x && no.y === y)){
                    ctx.fillStyle = "#000";
                    ctx.fillRect(x,y,tileSize,tileSize);
                }

                if(pointsOne.length > 0){
                    if(pointsOne.find(point => point.x === x && point.y === y)){
                        ctx.fillStyle = "#09f";
                        ctx.fillRect(x,y,tileSize,tileSize);
                    }else if(pointsTwo.find(point => point.x === x && point.y === y)){
                        ctx.fillStyle = "#01f";
                        ctx.fillRect(x,y,tileSize,tileSize);
                    }
                }

                if(findCloser(centroideOne.x) === x && findCloser(centroideOne.y) === y){
                    ctx.fillStyle = "#091";
                    ctx.fillRect(x,y,tileSize - 12,tileSize - 12);
                }else if(findCloser(centroideTwo.x) === x && findCloser(centroideTwo.y) === y){
                    ctx.fillStyle = "#011";
                    ctx.fillRect(x,y,tileSize - 12,tileSize - 12);
                }
            }
        }
    }

    function loop(){
        update();
        render();
        requestAnimationFrame(loop, cnv);
    }

    function findCloser(number) {
        const quotient = Math.floor(number / 32);
      
        const lowerMultiple = 32 * quotient;
        const higherMultiple = 32 * (quotient + 1);
      
        const result = Math.abs(number - lowerMultiple) < Math.abs(number - higherMultiple) ? lowerMultiple : higherMultiple;
        
        // console.log(`O múltiplo de 32 mais próximo de ${number} é: ${result}`);
        return result;
      }

    function kMeans(base, centroideOne, centroideTwo){
        let pointsOne = [];
        let pointsTwo = [];
        let distToOne = [];
        let distToTwo = [];
        let centroidesUpdated = true;
        
        while(centroidesUpdated){
            centroidesUpdated = false;
            base.forEach(point => {
                let x = point.x - centroideOne.x;
                let y = point.y - centroideOne.y;
                distToOne.push(Math.sqrt(Math.pow(x,2) + Math.pow(y,2)));
                
                x = point.x - centroideTwo.x;
                y = point.y - centroideTwo.y;
                distToTwo.push(Math.sqrt(Math.pow(x,2) + Math.pow(y,2)));
                
                if(Number(distToOne[distToOne.length-1]) < Number(distToTwo[distToTwo.length-1])){
                    if(point.centroide != centroideOne){
                        point.centroide = centroideOne;
                        centroidesUpdated = true;
                    }
                }else{
                    if(point.centroide != centroideTwo){
                        point.centroide = centroideTwo;
                        centroidesUpdated = true;
                    }
                }
            });
    
            if(centroidesUpdated){
                let mediaX = 0;
                let mediaY = 0;
    
                pointsOne = base.filter(point => point.centroide === centroideOne);
                pointsTwo = base.filter(point => point.centroide === centroideTwo);
                
                pointsOne.forEach(point => {
                    mediaX += point.x;
                    mediaY += point.y;
                });
    
                mediaX /= pointsOne.length;
                mediaY /= pointsOne.length;
                centroideOne.x = mediaX;
                centroideOne.y = mediaY;
                
                mediaX = 0;
                mediaY = 0;
    
                pointsTwo.forEach(point => {
                    mediaX += point.x;
                    mediaY += point.y;
                });
    
                mediaX /= pointsTwo.length;
                mediaY /= pointsTwo.length;
                centroideTwo.x = mediaX;
                centroideTwo.y = mediaY;
            }
        }

        return {
            pointsOne: pointsOne,
            pointsTwo: pointsTwo,
            centroideOne: centroideOne,
            centroideTwo: centroideTwo
        }
    }
    
    // requestAnimationFrame(loop, cnv);
    render();
}());