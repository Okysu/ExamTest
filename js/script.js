console.clear();
var ans=0;
const loginBtn = document.getElementById('Mode_rem');
const signupBtn = document.getElementById('Mode_do');
loginBtn.addEventListener('click', (e) => {
	let parent = e.target.parentNode.parentNode;
	Array.from(e.target.parentNode.parentNode.classList).find((element) => {
		if(element !== "slide-up") {
			//parent.classList.add('slide-up')
		}else{
			signupBtn.parentNode.classList.add('slide-up')
			parent.classList.remove('slide-up')
		}
	});
});

signupBtn.addEventListener('click', (e) => {
	let parent = e.target.parentNode;
	Array.from(e.target.parentNode.classList).find((element) => {
		if(element !== "slide-up") {
			//parent.classList.add('slide-up')
		}else{
			loginBtn.parentNode.parentNode.classList.add('slide-up')
			parent.classList.remove('slide-up')
		}
	});
});
$("#Q").on("click",function(){
    Fresh();
});
$("#Rem_Q").on("click",function(){
    Fresh_Rem();
});
$("#LookD").on("click",function(){
    $("#L_CON").html($("#Q").html());
    $("#L_A").html($("#A").html());
    $("#L_B").html($("#B").html());
    $("#L_C").html($("#C").html());
    $("#L_D").html($("#D").html());
});
$("#Set").on("click",function(){
    if(On_Bg==false)
    {
        $("#Set").html("随机背景[开]");
    }else{
        $("#Set").html("随机背景[关]");
    }
    On_Bg = !On_Bg;
});
function Fresh_Exam() {
    var Q_Type;
    if(Finished == 100)
    {
        document.getElementById("Mode_rem").click();
        return;
    }
    if(Finished >=80)
    {
         Q_Type = 1;
    }else{
         Q_Type = 6;
    }
    var BG_ID = randomNum(1,9999999);
    $.ajax({
        type: "POST",//请求方式
        url: "CreateTest.php",//请求的url
        data: "type=" + Q_Type,
        dataType: "json",//后台数据返回类
        success: function (res) {//响应成功执行的
            if(Q_Type >= 5){
                right_id = res.Q_ANS;
                $("#A").html(res.Q_O1);
                $("#B").html(res.Q_O2);
                $("#C").html(res.Q_O3);
                $("#D").html(res.Q_O4);
                $("#Q_E").html(res.Q_CON);
                document.getElementById("C").style.display = "";
                document.getElementById("D").style.display = "";
                $('#LookArea').css('display','');
            }else{
                right_id = res.Q_ANS;
                $("#A").html("A.正确");
                $("#B").html('B.错误');
                $("#Q_E").html(res.Q_CON);
                document.getElementById("C").style.display = "none";
                document.getElementById("D").style.display = "none";
                $('#LookArea').css('display','none');
            }
            if(On_Bg !== false){
                $("#Bg").attr("style",'background-image: url("https://api.uomg.com/api/rand.img2?random' + BG_ID + ') ');
            }
        }
    });
}
function Right_E(id) {
    Finished++;
    if(Finished == 100)
    {
        document.getElementById("Mode_rem").click();
    }
    if(id==right_id)
    {
        Grade[Finished]=1;
    }else{
        Grade[Finished]=0;
    }
    if(Finished !== 100)
    {
        Fresh_Exam();
        $("#Mode_do").html("正在测试["+ (Finished + 1) +"/100]");
    }

}
$("#LookG").on("click",function(){
    var i;
    ans = 0;
    for(i=1;i<=100;i++)
    {
        ans = ans + Grade[i];
    }
    alert("你的得分是：" + ans);
});