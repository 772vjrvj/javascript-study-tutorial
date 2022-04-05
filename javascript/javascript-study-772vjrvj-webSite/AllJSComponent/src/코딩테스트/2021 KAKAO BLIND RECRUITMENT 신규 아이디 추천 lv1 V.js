//https://programmers.co.kr/learn/courses/30/lessons/72410

function solution(new_id) {
    const answer = new_id
        .toLowerCase() // 1
        .replace(/[^\w-_.]/g, '') // 2
        .replace(/\.+/g, '.') // 3
        .replace(/^\.|\.$/g, '') // 4
        .replace(/^$/, 'a') // 5
        .slice(0, 15).replace(/\.$/, ''); // 6
    const len = answer.length;
    return len > 2 ? answer : answer + answer.charAt(len - 1).repeat(3 - len);
}


// no	new_id	                        result
// 예1	"...!@BaT#*..y.abcdefghijklm"	"bat.y.abcdefghi"
// 예2	"z-+.^."	                    "z--"
// 예3	"=.="	                        "aaa"
// 예4	"123_.def"	                    "123_.def"
// 예5	"abcdefghijklmn.p"	            "abcdefghijklmn"