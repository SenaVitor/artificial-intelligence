const base = [{
    name: "D1",
    x: 1,
    y: 1,
    centroide: null
},{
    name: "D2",
    x: 9.4,
    y: 6.4,
    centroide: null
},{
    name: "D3",
    x: 2.5,
    y: 2.1,
    centroide: null
},{
    name: "D4",
    x: 8,
    y: 7.7,
    centroide: null
},{
    name: "D5",
    x: 0.5,
    y: 2.2,
    centroide: null
},{
    name: "D6",
    x: 7.9,
    y: 8.4,
    centroide: null
},{
    name: "D7",
    x: 7,
    y: 7,
    centroide: null
},{
    name: "D8",
    x: 2.8,
    y: 0.8,
    centroide: null
},{
    name: "D9",
    x: 1.2,
    y: 3,
    centroide: null
},{
    name: "D10",
    x: 7.8,
    y: 6.1,
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

let pointsOne = [];
let pointsTwo = [];

function kMeans(){
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
            
            if(distToOne[distToOne.length-1] < distToTwo[distToTwo.length-1]){
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

            mediaX /= pointsOne.length;
            mediaY /= pointsOne.length;
            centroideTwo.x = mediaX;
            centroideTwo.y = mediaY;
        }
    }
}
kMeans();
console.log("Base\n" + JSON.stringify(base) + "\nPoints Centroide One\n" + JSON.stringify(pointsOne) + "\nPoints Centroide Two\n" + JSON.stringify(pointsTwo) + 
    "\nCentroid 1\n" + JSON.stringify(centroideOne) + "\nCentroid 2\n" + JSON.stringify(centroideTwo));