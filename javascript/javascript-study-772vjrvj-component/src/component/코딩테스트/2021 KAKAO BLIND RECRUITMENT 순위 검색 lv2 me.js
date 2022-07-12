function solution(info, query) {

    let answer = Array(query.length).fill(0);

    let i = Array(info.length);
    info.forEach((val, idx) => i[idx]=val.split(' '));

    let q = Array(query.length);
    for (let i = 0; i < query.length; i++) {
        let s1 = query[i].split(' and ');
        let s2 = s1[s1.length-1].split(' ');
        s1[s1.length-1] = s2[0];
        s1.push(s2[1]);
        q[i]= s1;
    }

    for (let j = 0; j < q.length; j++){

        let query = q[j];
        for (let k = 0; k < i.length; k++) {
            let info = i[k];

            let md = Array(5).fill(false);
            for (let l = 0; l < query.length; l++) {
                if(l !== query.length-1){
                    if(query[l] === '-'){
                        md[l] = true;
                    }else if(info[l] === query[l]){
                        md[l] = true;
                    }
                }else{
                    if(Number(info[l])-Number(query[l]) >= 0){
                        md[l] = true;
                    }
                }
            }
            let fi = md.findIndex((val, idx) => val === false);
            if(fi === -1){
                answer[j] = answer[j] + 1;
            }
        }
    }
    return answer;
}







solution(
    [
        "java backend junior pizza 150",
        "python frontend senior chicken 210",
        "python frontend senior chicken 150",
        "cpp backend senior pizza 260",
        "java backend junior chicken 80",
        "python backend senior chicken 50"
    ],
    [
        "java and backend and junior and pizza 100",
        "python and frontend and senior and chicken 200",
        "cpp and - and senior and pizza 250",
        "- and backend and senior and - 150",
        "- and - and - and chicken 100",
        "- and - and - and - 150"
    ]
)