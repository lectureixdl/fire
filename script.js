$(document).ready(function(){
	console.log("ready");


	var temp_y = 0;
	var flag = 1;
	var shakepoint = 0;


	var shake = function(){ // 폰을 좌우로 흔듬에 따라 shakepoint가 +1 씩 증가한다.


		if(temp_y > 4 && flag === -1){ // 여기서 flag는 만약 한쪽으로 폰을 기울이고 있으면
			shakepoint++;          // 값이 계속 증가하기 때문에 값이 한번 증가하면 더이상 증가하지 않도록
			flag = 1;              // 해주기 위해 넣은 조건변수.
		}
		else if(temp_y < 2 && flag === 1) // 폰을 흔들면 x값이 양수와 음수값으로 왔다갔다하는데 
		{				   // 이부분을 체크하여 shakepoint가 +1씩 증가한다. 
			shakepoint++;              // 위의 if문은 x가 양수일때 +1
			flag = -1;                 //  else if문은 x가 음수일때 +1
		}
	}


	var firepoint = function(){
		if(shakepoint > 15){
				changeFireState('w04');
	        }
	        else if(shakepoint > 10){
				changeFireState('w03');
	        }
	        else if (shakepoint > 5){
				changeFireState('w02');
	        }
	}


	var fan = function(){
		if(temp_y === 7){
	           $('.fan').removeClass('fan2');
		   $('.fan').removeClass('fan3');
	        }
	        else if(temp_y === 5){
	           $('.fan').addClass('fan2');
	        }
	     	else if(temp_y === 3){
	           $('.fan').addClass('fan3');
	        }

	}




	function handleMotionEvent(event) {


		var x = event.accelerationIncludingGravity.x; // 스마트폰 센서 값 받아오는 명령어 x값
		var y = event.accelerationIncludingGravity.y; // y값
		var z = event.accelerationIncludingGravity.z; // z값
		y = Math.round(y); // 1이하 소숫점 버림.
		temp_y = y;


		$("#xVal").html(Math.round(y));
		$("#sVal").html(shakepoint);


		var maxX = window.innerWidth - $("#ball").width();
		var maxY = window.innerHeight - $("#ball").height();


		var orgX = parseFloat(orgX); // 스트링을 숫자로 변환
		var newX = orgX + x;
		newX = Math.max(0, newX);
		newX = Math.min(maxX, newX);




		var orgY = $("#ball").css("top");
		orgY = parseFloat(orgY);
		var newY = orgY - y;
		newY = Math.max(0, newY);
		newY = Math.min(maxY, newY);

		changeFanState(y);


	}




	window.addEventListener("devicemotion", handleMotionEvent, true);
	setInterval(shake,100); // 계속 이 함수가 돌아가게 만들기 위해 선언함. 0.1초마다 이 함수가 실행됨(1000 = 1초)
	setInterval(firepoint,500);
	//setInterval(fan,0);


});

var changeFireState= function(state)
{
	$("#fire").removeClass();
	$("#fire").addClass("fullimage").addClass(state);
}

var changeFanState = function(slope)
{
	var opacityFan1 = [0.0, 0.0, 0.0, 0.0, 0.3, 0.7, 1.0];
	var opacityFan2 = [0.0, 0.3, 0.7, 1.0, 0.7, 0.3, 0.0];
	var opacityFan3 = [1.0, 0.7, 0.3, 0.0, 0.0, 0.0, 0.0];

	slope = Math.round(slope);
	slope = Math.min(slope, 6);
	slope = Math.max(slope, 0);

	$(".fan1").css({opacity: opacityFan1[slope]});
	$(".fan2").css({opacity: opacityFan2[slope]});
	$(".fan3").css({opacity: opacityFan3[slope]});

}
