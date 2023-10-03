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
        filhos: [d, c, b],
        marked: false,
        x: 320,
        y: 32
    }
    u.filhos.push(f);
    i.filhos.push(e);
    h.filhos.push(e);
    g.filhos.push(c);
    f.filhos.push(c);
    f.filhos.push(b);
    e.filhos.push(b);
    d.filhos.push(a);
    c.filhos.push(a);
    b.filhos.push(a);
    const nos = [a,b,c,d,e,f,g,h,i,u];
    const inicial = nos.find(no => no.nome == "A");
    const objetivo = nos.find(no => no.nome == "G").nome;
    // const objetivo = "Z"; //falha

    let player = {
        x: inicial.x,
        y: inicial.y,
        width: 28,
        height: 28,
        speed: 2
    };

    var maze = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,0,0,0,1,0,0,0,0,0,0,0,0,1,1],
        [1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,0,1,1],
        [1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,0,1,1],
        [1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,0,1,1],
        [1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,0,1,1],
        [1,1,1,1,0,0,0,1,1,1,1,0,0,0,0,0,0,1,1,1,1],
        [1,1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1],
        [1,1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1],
        [1,1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1],
        [1,1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1],
        [1,1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1],
        [1,1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1],
        [1,1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1],
        [1,0,0,0,1,1,1,0,0,1,0,1,1,1,1,1,1,1,1,1,1],
        [1,0,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,0,0,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ];

    const retorno = backtracking(inicial, objetivo, nos);
    let le = [];
    let bss = [];
    let flag = true;
    le = retorno.le;
    bss = retorno.bss;
    if(le === "FALHA") player.speed = 8;
    let noAtual = inicial;

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
        ctx.fillRect(player.x, player.y, player.width, player.height);
        ctx.restore();
    }

    function loop(){
        update();
        render();
        requestAnimationFrame(loop, cnv);
        if(bss && bss.length > 0){
            const no = nos.find(no => no.nome == bss[0]);
            mvLeft = false; 
            mvRight = false;
            mvDown = false;
            mvUp = false;
            if(player.x != no.x || player.y != no.y){
                move(noAtual, no)
            }else{
                const nome = bss.shift();
                noAtual = nos.find(no => no.nome == nome);
                if(!no.filhos.find(filho => bss[0] === filho.nome)){
                    let noPai;
                    if(no.nome === "F" && bss[0] !== "C"){
                        noPai = nos.find(noAux => noAux.nome == no.filhos.find(filho => filho.y < no.y && filho.nome !== "C").nome);
                    }else{
                        noPai = nos.find(noAux => noAux.nome == no.filhos.find(filho => filho.y < no.y).nome);
                    }
                    bss.unshift(noPai.nome);
                }
            }
        }else{
            if(le != "FALHA"){
                if(le && le.length > 0){
                    mvLeft = false; 
                    mvRight = false;
                    mvDown = false;
                    mvUp = false;
                    const no = nos.find(no => no.nome == le[le.length-1]);
                    if(player.x != no.x || player.y != no.y){
                        move(noAtual, no)
                    }else{
                        let nome = le.pop();
                        noAtual = nos.find(no => no.nome == nome);
                    }
                }else{
                    if(flag){
                        alert("Objetivo alcançado no nó " + noAtual.nome + "!");
                        flag = false;
                    } 
                    console.log("Objetivo alcançado no nó " + noAtual.nome + "!");
                }
            }else{
                if(flag){
                    alert(le);
                    flag = false;
                } 
                console.log(le);
            }
        }
    }

    function move(objA, objB){
        if(objA.nome === "A"){
            if(objB.nome === "B"){
                if(player.x != objB.x){
                    mvLeft = true;
                }else{
                    mvDown = true;
                } 
            }else if(objB.nome === "C"){
                mvDown = true;
            }else{
                if(player.x != objB.x){
                    mvRight = true;
                }else{
                    mvDown = true;
                }
            }
        }else if(objA.nome === "B"){
            if(objB.nome === "E"){
                if(player.x != objB.x){
                    mvLeft = true;
                }else{
                    mvDown = true;
                } 
            }else if(objB.nome === "F"){
                if(player.y != objB.y){
                    mvDown = true;
                }else{
                    mvRight = true;
                }
            }else{
                if(player.y != objB.y){
                    mvUp = true;
                }else{
                    mvRight = true;
                }
            }
        }else if(objA.nome === "C"){
            if(objB.nome === "G"){
                if(player.x != objB.x){
                    mvRight = true;
                }else{
                    mvDown = true;
                } 
            }else if(objB.nome === "F"){
                if(player.y != objB.y){
                    mvDown = true;
                }else{
                    mvLeft = true;
                }
            }else{
                mvUp = true;
            }
        }else if(objA.nome === "D"){
            if(player.y != objB.y){
                mvUp = true;
            }else{
                mvLeft = true;
            } 
        }else if(objA.nome === "E"){
            if(objB.nome === "H"){
                if(player.x != objB.x){
                    mvLeft = true;
                }else{
                    mvDown = true;
                } 
            }else if(objB.nome === "I"){
                if(player.y != objB.y){
                    mvDown = true;
                }else{
                    mvRight = true;
                }
            }else{
                if(player.y != objB.y){
                    mvUp = true;
                }else{
                    mvRight = true;
                }
            }
        }else if(objA.nome === "F"){
            if(objB.nome === "C"){
                if(player.x != objB.x){
                    mvRight = true;
                }else{
                    mvUp = true;
                } 
            }else if(objB.nome === "U"){
                if(player.y != objB.y){
                    mvDown = true;
                }else{
                    mvRight = true;
                }
            }else{
                if(player.x != objB.x){
                    mvLeft = true;
                }else{
                    mvUp = true;
                }
            }
        }else if(objA.nome === "G"){
            if(player.y != objB.y){
                mvUp = true;
            }else{
                mvLeft = true;
            }
        }else if(objA.nome === "H"){
            if(player.y != objB.y){
                mvUp = true;
            }else{
                mvRight = true;
            }
        }else if(objA.nome === "I" || objA.nome === "U"){
            if(player.x != objB.x){
                mvLeft = true;
            }else{
                mvUp = true;
            } 
        }
    }

    function backtracking(inicial, objetivo, nos){
        let le = [inicial.nome];
        let lne = [inicial.nome];
        let bss = [];
        let ec = inicial;
        ec.marked = true;
    
        while(le && le.length > 0){
            if(ec.nome == objetivo) return {le: le, bss: bss};
            if(ec.filhos.length == 0 || (ec.filhos.length > 0 && !ec.filhos.find(ecSon => ecSon.marked == false))){
                while(le.length > 0 && ec.nome == le[0]){
                    bss.unshift(ec.nome);
                    le.shift();
                    lne.shift();
                    ec = nos.find(no => lne && no.nome == lne[0]);
                }
                if(ec) le.unshift(ec.nome);
            }else{
                ec.filhos.forEach(filho => {
                    if(filho.marked == false) lne.unshift(filho.nome);
                }); 
                ec = nos.find(no => no.nome == lne[0]);
                if(ec.filhos) ec = marcarFilhos(ec, le, lne, bss);
                le.unshift(ec.nome);
            }
        }
        return {le: "FALHA", bss: bss};
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