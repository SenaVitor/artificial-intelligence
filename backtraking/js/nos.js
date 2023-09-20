const u = {
    nome: "U",
    filhos: [],
    marked: false
}
const i = {
    nome: "I",
    filhos: [],
    marked: false
}
const h = {
    nome: "H",
    filhos: [],
    marked: false
}
const g = {
    nome: "G",
    filhos: [],
    marked: false
}
const f = {
    nome: "F",
    filhos: [u],
    marked: false
}
const e = {
    nome: "E",
    filhos: [h, i],
    marked: false
}
const d = {
    nome: "D",
    filhos: [],
    marked: false
}
const c = {
    nome: "C",
    filhos: [f, g],
    marked: false
}
const b = {
    nome: "B",
    filhos: [e, f],
    marked: false
}
const a = {
    nome: "A",
    filhos: [b, c, d],
    marked: false
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

module.exports = nos;