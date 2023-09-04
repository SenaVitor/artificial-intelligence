const nos = require('./nos');
console.log(backtracking(getNo("A"), getNo("G").nome, nos)); //ex 1
console.log(backtracking(getNo("A"), "Z", nos)); // ex falha

function backtracking(inicial, objetivo, nos){
    let le = [inicial.nome];
    let lne = [inicial.nome];
    let bss = [];
    let ec = inicial;
    ec.marked = true;

    while(le && le.length > 0){
        if(ec.nome == objetivo) return le;
        if(!ec.filhos|| !ec.filhos.find(ecSon => ecSon.marked == false)){
            while(le.length > 0 && ec.nome == le[0]){
                bss.unshift(ec.nome);
                le.shift();
                lne.shift();
                ec = nos.find(no => lne && no.nome == lne[0]);
                ec = marcarFilhos(ec, le, lne, bss);
            }
            if(ec) le.unshift(ec.nome);
        }else{
            ec.filhos.forEach(filho => {
                if(filho.marked == false) lne.unshift(filho.nome);
            }); 
            ec = nos.find(no => no.nome == lne[0]);
            ec = marcarFilhos(ec, le, lne, bss);
            if(ec) le.unshift(ec.nome);
        }
    }
    return "FALHA";
}

function marcarFilhos(ec, le, lne, bss){
    if(ec && ec.filhos){
        ec.filhos.forEach(ecSon => {
            if(!ecSon.marked){
                const leEc = le && le.find(no => no == ecSon.nome);
                const lneEc = lne && lne.find(no => no == ecSon.nome);
                const bssEc = bss && bss.find(no => no == ecSon.nome);
                if(leEc || bssEc || lneEc) ecSon.marked = true;
            }
        });
    }
    return ec;
}

function getNo(nome){
    return nos.find(no => no.nome == nome);
}