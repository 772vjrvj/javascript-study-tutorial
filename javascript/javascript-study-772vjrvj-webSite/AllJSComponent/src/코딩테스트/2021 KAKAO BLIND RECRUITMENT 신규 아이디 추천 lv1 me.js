function solution(new_id) {

    const step1 = new_id.toLowerCase();
    const step2 = step1.replace(/[^a-z0-9-_.]/g,'');
    
    let step3 = step2;
    dotFind(step2);
    
    const step4 = step3.replace(/^[\.]|[\.]$/g, '');
    
    let step5 = step4;
    if(step4 === ''){
        step5 = 'a'
    }
    
    let step6 = step5;
    if(step5.length >= 16){
        step6 = str = step5.substring(0,15);
        if(str.charAt(str.length-1) === '.'){
            step6 = step5.substring(0, str.length-1);
        }
    }
    
    let step7 = step6;
    if(step6.length <= 2){
        let iterNum = 3- step6.length;
        let lastChar = step6.charAt(step6.length-1);
        for (let i = 0; i < iterNum; i++) {
            step6 = step6 + lastChar;
        }
        step7 = step6;
    }
    
    function dotFind(str){
        const findIdx = str.indexOf('..');
        if(findIdx > -1){
            step3 = str.replace(/\.\./g,'\.');
            dotFind(step3);
        }
    }
    
    var answer = step7;
    return answer;
    }
        console.log('====================================');
        console.log('...!@BaT#*..y.abcdefghijklm');
        console.log(solution('...!@BaT#*..y.abcdefghijklm'));
        console.log('bat.y.abcdefghi');
        console.log('====================================');
        console.log('z-+.^.');
        console.log(solution('z-+.^.'));
        console.log('z--');
        console.log('====================================');
        console.log('=.=');
        console.log(solution('=.='));
        console.log('aaa');
        console.log('====================================');
        console.log('123_.def');
        console.log(solution('123_.def'));
        console.log('123_.def');
        console.log('====================================');
        console.log('...!@BaT#*..y.abcdefghijklm');
        console.log(solution('abcdefghijklmn.p'));
        console.log('abcdefghijklmn');
        console.log('====================================');
    