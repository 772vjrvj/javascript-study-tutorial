function bisect_gt(a, x) {
    let lo = 0, hi = a.length;
    while (lo < hi) {
        let mid = Math.floor((lo + hi) / 2);
        if (a[mid] < x) lo = mid + 1;
        else hi = mid;
    }
    return a.length - lo;
}

function solution(info, query) {
    const table = {"c": 3, "j": 5, "p": 6, "b": 6, "f": 5, "s": 6, "-": 0};
    const conv = (l, t) => [l.slice(0, -1).reduce((a, k) => (a << 3) + t(table[k[0]]), 0), Number(l[l.length - 1])];
    info = info.map(s => conv(s.split(" "), x => 7 - x));
    query = query.map(s => conv(s.split(" ").filter(c => c != "and"), x => x));
    const map = new Map();
    for (const [k, v] of info) {
        if (!map.has(k)) map.set(k, []);
        map.get(k).push(v);
    }
    const dict = Array.from(map.entries()).map(([k, l]) => [k, l.sort((a, b) => a - b)])
    return query.map(([q, v]) => dict.reduce((a, [k, l]) => a + (k & q ? 0 : bisect_gt(l, v)), 0));
}

solution(
["java backend junior pizza 150",
"python frontend senior chicken 210",
"python frontend senior chicken 150",
"cpp backend senior pizza 260",
"java backend junior chicken 80",
"python backend senior chicken 50"],
["java and backend and junior and pizza 100",
"python and frontend and senior and chicken 200",
"cpp and - and senior and pizza 250",
"- and backend and senior and - 150",
"- and - and - and chicken 100",
"- and - and - and - 150"]);