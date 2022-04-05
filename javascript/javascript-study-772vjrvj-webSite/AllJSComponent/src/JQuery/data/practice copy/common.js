$.fn.extend({
	valid : function(tests) {
			tests.forEach(function(test){
				var $input = $(this);
				var value = $input.val();
				if (Array.isArray(test)) {
					var testTerm = test[0];			//정규식
					var exceptionMessage = test[1];		//정규식이 틀릴 경우 보여줄 검증 실패 메시지

					//배열의 첫번째요소가 정규식이 아니거나 정규식 테스트를 실패한 경우에
					//exception에 검증실패메시지를 세팅한 후 throw한다.
					if( _.isRegExp(testTerm) && !(testTerm.test(value)) ){
						throw {exceptionMessage : exceptionMessage};
					}
				} else {
					throw {exceptionMessage : "스크립트 오류", input :$input};
				}
			}, this);

	},

	validFormNow : function(){
		var $this = $(this);
		$this.find(':input').each(function(idx, el){
			var validData = eval($(el).data("valid"));
			if(validData != ""){
				try{
					$this.valid.call(el, validData);
				} catch (e) {
					//정규식 검증 실패한 경우 실패 메시지 alert
					if(e.exceptionMessage){
						alert(e.exceptionMessage);
						//$(el).focus();
						return false;
					}
				}
			}
		});
		return true;
	}
});