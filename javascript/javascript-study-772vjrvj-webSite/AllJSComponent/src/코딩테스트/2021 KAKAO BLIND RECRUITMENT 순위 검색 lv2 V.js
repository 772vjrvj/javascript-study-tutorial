//https://programmers.co.kr/learn/courses/30/lessons/72412

function solution(info, query) {
    const answer = [];
    const infoMap = {};
    
    function combination(array, score, start) {
        const key = array.join("");
        const value = infoMap[key];
        
        if (value) {
            infoMap[key].push(score);
        } else {  
            infoMap[key] = [score];
        }
        
        for (let i = start; i < array.length; i++) {
            const temp = [...array];
            temp[i] = "-";
            combination(temp, score, i + 1);
        }
    }
    
    for (const e of info) {
        const splited = e.split(" ");
        const score = Number(splited.pop());
        combination(splited, score, 0);
    }
    
    for (const key in infoMap) {
        infoMap[key] = infoMap[key].sort((a, b) => a - b);
    }
    
    for (const e of query) {
        const splited = e.replace(/ and /g, " ").split(" ");
        const score = Number(splited.pop());
        const key = splited.join("");
        const array = infoMap[key];
        
        if (array) {
            let start = 0;
            let end = array.length;
            while (start < end) {
                const mid = Math.floor((start + end) / 2);
                
                if (array[mid] >= score) {
                    end = mid;
                } else if (array[mid] < score) {
                    start = mid + 1;
                }
            }
            
            const result = array.length - start;
            answer.push(result);
        } else {
            answer.push(0);
        }
    }
    
    return answer;
}