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
        y: 576
    }
    const i = {
        nome: "I",
        filhos: [],
        marked: false,
        x: 192,
        y: 576
    }
    const h = {
        nome: "H",
        filhos: [],
        marked: false,
        x: 32,
        y: 576
    }
    const g = {
        nome: "G",
        filhos: [],
        marked: false,
        x: 512,
        y: 448
    }
    const f = {
        nome: "F",
        filhos: [u],
        marked: false,
        x: 288,
        y: 448
    }
    const e = {
        nome: "E",
        filhos: [h, i],
        marked: false,
        x: 128,
        y: 448
    }
    const d = {
        nome: "D",
        filhos: [],
        marked: false,
        x: 576,
        y: 192
    }
    const c = {
        nome: "C",
        filhos: [f, g],
        marked: false,
        x: 320,
        y: 192
    }
    const b = {
        nome: "B",
        filhos: [e, f],
        marked: false,
        x: 224,
        y: 192
    }
    const a = {
        nome: "A",
        filhos: [b, c, d],
        marked: false,
        x: 320,
        y: 32
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

    let player = {
        x: inicial.x + 2,
        y: inicial.y + 2,
        width: 28,
        heigth: 28,
        speed: 2
    };

    // var maze = [
    //     [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    //     [1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1],
    //     [1,0,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,0,0,0,1],
    //     [1,0,1,1,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1],
    //     [1,1,1,1,1,1,0,1,1,1,0,1,1,1,0,1,1,0,0,0,1],
    //     [1,1,1,1,1,0,0,1,1,0,0,0,1,0,0,0,0,0,0,0,1],
    //     [1,1,1,1,0,0,1,1,0,0,1,0,0,1,1,1,0,0,0,0,1],
    //     [1,1,1,0,0,0,1,0,0,0,1,0,0,0,1,1,0,0,0,0,1],
    //     [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    //     [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    //     [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    //     [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    //     [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    //     [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    //     [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    //     [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    //     [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    //     [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    //     [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    //     [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    //     [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    // ];

    var maze = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,0,0,1,0,0,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,0,0,1,0,1,0,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,0,1,1,0,1,0,0,0,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,0,1,1,0,1,1,1,0,0,0,0,0,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,0,1,1,0,1,0,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,0,1,1,0,1,0,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,0,1,1,0,1,0,0,0,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,0,1,1,0,1,1,1,0,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,0,1,1,0,0,0,1,0,0,0,1,1,1,1],
        [1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,0,1,1,1,1],
        [1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,0,1,1,1,1],
        [1,1,1,1,1,0,0,0,0,1,0,0,0,1,1,1,1,1,1,1,1],
        [1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1],
        [1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1],
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

    window.addEventListener("keydown", keydownHandler, false);
    window.addEventListener("keyup", keyupHandler, false);

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

    function update(){
        if(mvLeft && !mvRight){
            player.x -= player.speed;
        }else if(mvRight && !mvLeft){
            player.x += player.speed;
        }else if(mvUp && !mvDown){
            player.y -= player.speed; 
        }else if(mvDown && !mvUp){
            player.y += player.speed;
        }
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
        ctx.fillRect(player.x, player.y, player.width, player.heigth);
        ctx.restore();
    }

    function loop(){
        update();
        render();
        requestAnimationFrame(loop, cnv);
    }
    requestAnimationFrame(loop, cnv);
}());