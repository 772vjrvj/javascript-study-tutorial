
function solution(sales, links) {
    var answer = 0;
    const n = sales.length;
    const tree = makeTree(links, n);
    const d = new Array(n+1).fill().map(row => new Array(2).fill(-1));

    for(let i=1; i<=n; i++){
        if(tree[i].length === 0){
            d[i][0] = 0;
            d[i][1] = sales[i-1];
        }
    }

    const dp = (node, flag) => {
        if(d[node][flag] >= 0){
            return d[node][flag];
        }else{
            if(flag === 0){
                let min = dp(node, 1);
                for(let i=0; i<tree[node].length; i++){
                    let cost = 0;
                    tree[node].forEach((child,idx) => {
                        cost += dp(child, idx===i?1:0);
                    });
                    min = Math.min(min, cost);
                }

                return d[node][flag] = min;
            }else{
                let cost = sales[node-1];
                tree[node].forEach(child => {
                    cost += dp(child, 0);
                });

                return d[node][flag] = cost;
            }
        }
    }

    answer = Math.min(dp(1, 0), dp(1, 1));

    return answer;
}

const makeTree = (links, n) => {
    const tree = new Array(n+1).fill().map(row => []);

    links.forEach(link => {
        tree[link[0]].push(link[1]);
    });

    return tree;
}