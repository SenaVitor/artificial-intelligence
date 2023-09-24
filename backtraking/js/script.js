(function(){
    var cnv = document.querySelector("canvas");
    var ctx = cnv.getContext("2d");

    const WIDTH = cnv.width, HEIGHT = cnv.height;
    
    const LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;
    let mvLeft = mvUp = mvRight = mvDown = false;

    const tileSize = 32;
    
    const u = {
        nome: "U",
        filhos: [],
        marked: false,
        x: 384,
        y: 576,
        ways: {}
    }
    const i = {
        nome: "I",
        filhos: [],
        marked: false,
        x: 192,
        y: 576,
        ways: {}
    }
    const h = {
        nome: "H",
        filhos: [],
        marked: false,
        x: 32,
        y: 576,
        ways: {}
    }
    const g = {
        nome: "G",
        filhos: [],
        marked: false,
        x: 512,
        y: 448,
        ways: {}
    }
    const f = {
        nome: "F",
        filhos: [u],
        marked: false,
        x: 288,
        y: 448,
        ways: {
            U: "y"
        }
    }
    const e = {
        nome: "E",
        filhos: [h, i],
        marked: false,
        x: 128,
        y: 448,
        ways: {
            H: "x",
            I: "x"
        }
    }
    const d = {
        nome: "D",
        filhos: [],
        marked: false,
        x: 576,
        y: 192,
        ways: {}
    }
    const c = {
        nome: "C",
        filhos: [f, g],
        marked: false,
        x: 320,
        y: 192,
        ways: {
            F: "y",
            G: "x",
        }
    }
    const b = {
        nome: "B",
        filhos: [e, f],
        marked: false,
        x: 224,
        y: 192,
        ways: {
            E: "x",
            F: "x"
        }
    }
    const a = {
        nome: "A",
        filhos: [b, c, d],
        marked: false,
        x: 320,
        y: 32,
        ways: {
            B: "x",
            C: "y",
            D: "x"
        }
    }
    i.filhos.push(e);
    i.filhos.push(h);
    u.filhos.push(f);
    g.filhos.push(c);
    f.filhos.push(c);
    f.filhos.push(b);
    e.filhos.push(b);
    d.filhos.push(a);
    c.filhos.push(a);
    b.filhos.push(a);
    const nos = [a,b,c,d,e,f,g,h,i,u];
    const inicial = nos.find(no => no.nome == "A");
    const objetivo = nos.find(no => no.nome == "G");

    let walls = [];

    let player = {
        x: inicial.x + 2,
        y: inicial.y + 2,
        width: 28,
        height: 28,
        speed: 2
    };

    var maze = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,0,0,1,0,0,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,0,0,1,0,1,0,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,0,1,1,0,1,0,0,0,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,0,1,1,0,1,1,1,0,0,0,0,0,1,1],
        [1,1,1,1,0,0,0,1,1,1,1,0,0,1,1,1,1,1,1,1,1],
        [1,1,1,1,0,1,1,0,1,1,0,1,0,1,1,1,1,1,1,1,1],
        [1,1,1,1,0,1,1,0,1,1,0,1,0,1,1,1,1,1,1,1,1],
        [1,1,1,1,0,1,1,0,1,1,0,1,0,0,0,1,1,1,1,1,1],
        [1,1,1,1,0,1,1,0,1,1,0,1,1,1,0,1,1,1,1,1,1],
        [1,1,1,1,0,1,1,0,1,1,0,0,0,1,0,0,0,1,1,1,1],
        [1,1,1,1,0,1,1,0,1,1,1,1,0,1,1,1,0,1,1,1,1],
        [1,1,1,1,0,1,1,0,1,1,1,1,0,1,1,1,0,1,1,1,1],
        [1,1,1,1,1,1,1,0,0,1,0,0,0,1,1,1,1,1,1,1,1],
        [1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,0,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1],
        [1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1],
        [1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ];

    // var maze = [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];
    // nos.forEach(no => {
    //     for(let i = 0; i < 18; i++){
    //         let linha = '';
    //         if(no.filhos){
    //             // for(let j = 0; j < no.filhos.length; j++){

    //             // }               
    //             for(let j = 0; j < 20; j++){
    //                 if(no.filhos.length == 1){

    //                 }
    //             }
    //         }else{
    //             for(let j = 0; j < 20; j++){
    //                 if(j == 0 || j == 19){
    //                     linha += '1'
    //                 }else{
    //                     linha += '0';    
    //                 }
    //             }
    //         }
    //         maze.push(linha);
    //     }
    //     maze.push([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]);
    // });

    for(var row in maze){
        for(var column in maze[row]){
            var tile = maze[row][column];
            if(tile === 1){
                var x = column*tileSize;
                var y = row*tileSize;
                if(!nos.find(no => no.x === x && no.y === y)){
                    walls.push({
                        x: x,
                        y: y,
                        width: tileSize,
                        height: tileSize
                    });
                }
            }
        }
    } 

    let le = backtracking(inicial, objetivo.nome, nos);
    let noAtual = nos.find(no => no.nome == le.pop());

    function blockRectangle(objA, objB){
        let distX = (objA.x + objA.width/2) - (objB.x + objB.width/2);
        let distY = (objA.y + objA.height/2) - (objB.y + objB.height/2);
        let sumWidth = (objA.width + objB.width)/2;
        let sumHeight = (objA.height + objB.height)/2;
        if(Math.abs(distX) < sumWidth && Math.abs(distY) < sumHeight){
            let overlapX = sumWidth - Math.abs(distX);
            let overlapY = sumHeight - Math.abs(distY);
   
            if(overlapX > overlapY){
                objA.y = distY > 0 ? objA.y + overlapY : objA.y - overlapY;
            }else{
                objA.x = distX > 0 ? objA.x + overlapX : objA.x - overlapX;
            }
        }
    }

    // window.addEventListener("keydown", keydownHandler, false);
    // window.addEventListener("keyup", keyupHandler, false);

    function keydownHandler(e){
        let key = e.keyCode;
        switch(key){
            case LEFT:
                mvLeft = true;
                break;
            case UP:
                mvUp = true;
                break;
            case RIGHT:
                mvRight = true;
                break;
            case DOWN:
                mvDown = true;
                break;
        }
    }
    
    function keyupHandler(e){
        let key = e.keyCode;
        switch(key){
            case LEFT:
                mvLeft = false;
                break;
            case UP:
                mvUp = false;
                break;
            case RIGHT:
                mvRight = false;
                break;
            case DOWN:
                mvDown = false;
                break;
        }
    }

    function isWall(x, y){
        return walls.find(wall => wall.x == x && wall.y == y);
    }

    function update(){
        if(mvLeft && !mvRight){
            player.x -= player.speed;
        }else if(mvRight && !mvLeft){
            player.x += player.speed;
        }
        if(mvUp && !mvDown){
            player.y -= player.speed; 
        }else if(mvDown && !mvUp){
            player.y += player.speed;
        }

        walls.forEach(wall => {
            blockRectangle(player, wall);
        });
    }

    function render(){
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        ctx.save();
        for(var row in maze){
            for(var column in maze[row]){
                var tile = maze[row][column];
                if(tile === 1){
                    var x = column*tileSize;
                    var y = row*tileSize;
                    if(nos.find(no => no.x === x && no.y === y)){
                        ctx.fillStyle = "#091";
                        ctx.fillRect(x,y,tileSize,tileSize);
                        ctx.restore();
                    }else{
                        ctx.fillStyle = "#000";
                        ctx.fillRect(x,y,tileSize,tileSize);
                    } 
                }
            }
        }
        ctx.fillStyle = "#00f";
        // ctx.fillRect(323, 34, 28, 28); //inicial(A)
        ctx.fillRect(player.x, player.y, player.width, player.height);
        ctx.restore();
    }

    function loop(){
        update();
        render();
        requestAnimationFrame(loop, cnv);
        if(le != "FALHA"){
            if(le && le.length > 0){
                const no = nos.find(no => no.nome == le[le.length-1]);
                if(noAtual.ways[no.nome] === "y"){
                    moveY(no);
                }else if(noAtual.ways[no.nome] === "x"){
                    moveX(no);
                }

                if(player.x - 2 === no.x && player.y - 2 === no.y){
                    let nome = le.pop();
                    noAtual = nos.find(no => no.nome == nome);
                }
            }else{
                mvLeft = false; 
                mvRight = false;
                mvDown = false; 
                mvUp = false;
            }
        }
    }

    function moveX(no){
        if(player.x - 2 < no.x){
            if(!isWall((player.x + tileSize), player.y-2)){
                mvLeft = false; 
                mvRight = true;
            }else{
                moveY(no);
            }
        }else if(player.x - 2 > no.x){
            if(!isWall((player.x - tileSize), (player.y-2))){
                // alert(isWall((player.x + tileSize), player.y-2));
                mvLeft = true; 
                mvRight = false;
                // alert("x " + player.x + " y " + player.y)
            }else{
                // alert("x " + player.x + " y " + player.y)
                moveY(no);
            }
        }else{
            mvLeft = false; 
            mvRight = false;
        }
        // alert("mvLeft " + mvLeft + " mvRight " + mvRight + " mvDown " + 
        // mvDown + " mvUp " + mvUp);
    }

    function moveY(no){
        if(player.y - 2 < no.y){
            if(!isWall((player.x-2), (player.y + tileSize))){
                mvDown = true; 
                mvUp = false;
            }else{
                moveX(no);
            }
        }else if(player.y -2 > no.y){
            if(!isWall((player.x-2), (player.y - tileSize))){
                mvDown = false; 
                mvUp = true;
            }else{
                moveX(no);
            }
        }else{
            mvDown = false; 
            mvUp = false;
        }
    }

    function backtracking(inicial, objetivo, nos){
        let le = [inicial.nome];
        let lne = [inicial.nome];
        let bss = [];
        let ec = inicial;
        ec.marked = true;
    
        while(le && le.length > 0){
            if(ec.nome == objetivo) return le;
            if(ec.filhos.length == 0 || (ec.filhos.length > 0 && !ec.filhos.find(ecSon => ecSon.marked == false))){
                while(le.length > 0 && ec.nome == le[0]){
                    bss.unshift(ec.nome);
                    le.shift();
                    lne.shift();
                    ec = nos.find(no => lne && no.nome == lne[0]);
                    ec = marcarFilhos(ec, le, lne, bss);
                }
                le.unshift(ec.nome);
            }else{
                ec.filhos.forEach(filho => {
                    if(filho.marked == false) lne.unshift(filho.nome);
                }); 
                ec = nos.find(no => no.nome == lne[0]);
                ec = marcarFilhos(ec, le, lne, bss);
                le.unshift(ec.nome);
            }
        }
        return "FALHA";
    }
    
    function marcarFilhos(ec, le, lne, bss){
        ec.filhos.forEach(ecSon => {
            if(!ecSon.marked){
                const leEc = le && le.find(no => no == ecSon.nome);
                const lneEc = lne && lne.find(no => no == ecSon.nome);
                const bssEc = bss && bss.find(no => no == ecSon.nome);
                if(leEc || bssEc || lneEc) ecSon.marked = true;
            }
        });
        return ec;
    }
    
    function getNo(nos, nome){
        return nos.find(no => no.nome == nome);
    }
    
    requestAnimationFrame(loop, cnv);
}());