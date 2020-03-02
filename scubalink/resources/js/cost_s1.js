/** 비용 - form wizard **/
$(document).ready(function () {

    //Wizard
    $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {

        var $target = $(e.target);
    
        if ($target.parent().hasClass('disabled')) {
            return false;
        }
    });

    $(".next-step").click(function (e) {

        var $active = $('.wizard .nav-tabs li.active');
        $active.next().removeClass('disabled');
        nextTab($active);

    });
    $(".prev-step").click(function (e) {

        var $active = $('.wizard .nav-tabs li.active');
        prevTab($active);

    });



});

function nextTab(elem) {
    $(elem).next().find('a[data-toggle="tab"]').click();
}
function prevTab(elem) {
    $(elem).prev().find('a[data-toggle="tab"]').click();
}




var s1_input = $('#step1 .cost_name').get().map(function(el) { return el.value });
var s2_input = $('#step2 .cost_name').get().map(function(el) { return el.value });
var cost_arr=new Array();

//3. 비용 이름 --> 4. FOC 항목
//빈칸 체크
function update_arr(){
  var s1_input = $('#step1 .cost_name').get().map(function(el) { return el.value });
  var FOC_list_sum="";
  for(i=0;i<s1_input.length;i++){
    var FOC_list="<li><label class='cost_checkbox_container'>";
    FOC_list+=s1_input[i];
    FOC_list+=`<input type='checkbox' class="FOC_sale"><span class='cost_checkmark'></span></label></li>`
    FOC_list_sum+=FOC_list
  }
document.getElementById('FOC_ul').innerHTML=FOC_list_sum;



//비용 항목 :입력 시 다음 활성화
  var check_cost_name=0;
  for(i=0;i<s1_input.length;i++){
    if(s1_input[i]==""){
      check_cost_name+=1;
    }else{
      check_cost_name+=0;
    }
  }
    if(check_cost_name==0){
      $('#step1 .next-step').css("background-color","#145db2");
    }else{
      $('#step1 .next-step').css("background-color","#cccccc")
    }

//빈칸 체크
for(i=0;i<s1_input.length;i++){
  if(s1_input[i]==""){
    $('#step1 .name_empty_error').eq(i).css("display","block");
  }
  else{
    $('#step1 .name_empty_error').eq(i).css("display","none");
  } 
}
};//end of : update_arr();





var cur_arr=new Array();
// 2. 환율 체크 --> select option 생성
$(document).on("change","#step1 #check_currency input","#step1 select",function(){
  var c_cur=$('#step1 #check_currency .cost_checkbox_container').children('input').get().map(function(el) { 
    if(el.checked==true){ return el.value;}});

      for(i=0;i<c_cur.length;i++){
        if(c_cur[i]){
          $("#step1 #c_main_cur option").eq(i).removeClass("hide");
        }else{
          $("#step1 #c_main_cur option").eq(i).addClass("hide");
        }
      }
      //환율 계산을 위한 배열 생성
    var c_val=$('#step1 .custom input[type="number"]').get().map(function(el) {return el.value});
    cur_arr.splice(0,cur_arr.length);
    for(i=1;i<5;i++){
      cur_arr.push({
      name:c_cur[i],
      currrency:c_val[i-1]
    })
    }

});



//강사 수, 교육생 수 입력 시 다음 Step에 반영
$(document).on("change","#step1 #cost_member input",function(){
  var cost_ins_n=$('#step1 #cost_member input').get().map(function(el) {return el.value});
  $('#step2 .bgn_n').text(cost_ins_n[1]);
  $('#step2 .ins_n').text(cost_ins_n[0]);
  $('#step3 .bgn_n').text(cost_ins_n[1]);
  $('#step3 .ins_n').text(cost_ins_n[0]);
  $('#step4 .bgn_n').text(cost_ins_n[1]);
  $('#step4 .ins_n').text(cost_ins_n[0]);
  $('#step5 .bgn_n').text(cost_ins_n[1]);
  $('#step5 .ins_n').text(cost_ins_n[0]);
  $('#step2 .all_n').text(parseInt(cost_ins_n[0])+parseInt(cost_ins_n[1]));
})


//비용 추가
function add_div(){
  var s1_input = $('#step1 .cost_name').get().map(function(el) { return el.value });
  var div = document.createElement('div');
  div.innerHTML = document.getElementById('room_type').innerHTML;
  document.getElementById('field').appendChild(div);
  //FOC 항목 재설정
  var FOC_list_sum="";
  for(i=0;i<s1_input.length;i++){
    var FOC_list="<li><label class='cost_checkbox_container'>";
    FOC_list+=s1_input[i];
    FOC_list+=`<input type='checkbox' class="FOC_sale"><span class='cost_checkmark'></span></label></li>`
    FOC_list_sum+=FOC_list
  }
document.getElementById('FOC_ul').innerHTML=FOC_list_sum;
}

//비용 삭제
function remove_div(obj){
  document.getElementById('field').removeChild(obj.parentNode.parentNode);
  //FOC 항목 재설정
  var s1_input = $('#step1 .cost_name').get().map(function(el) { return el.value });
  var FOC_list_sum="";
  for(i=0;i<s1_input.length;i++){
    var FOC_list="<li><label class='cost_checkbox_container'>";
    FOC_list+=s1_input[i];
    FOC_list+=`<input type='checkbox' class="FOC_sale"><span class='cost_checkmark'></span></label></li>`
    FOC_list_sum+=FOC_list
  }
document.getElementById('FOC_ul').innerHTML=FOC_list_sum;

}




var cost_arr_s1=new Array();
$(document).on("change","#step1 #FOC_ul input",function(){
  cost_arr_s1.splice(0,cost_arr_s1.length);

  var FOC_check=$('#FOC_ul .cost_checkbox_container').children('input').get().map(function(el) { return el.checked });
  var cost_name=$('#FOC_ul .cost_checkbox_container').get().map(function(el) { return el.outerText });
  for(i=0;i<FOC_check.length;i++){
  var cost={name:"", check:""}
  cost.name=cost_name[i];
  if(FOC_check[i]){
    cost.check="true";
  }else{cost.check="false";}
  
  cost_arr_s1.push(cost);
  }
});


function update_s1(){
  var FOC_sale=$('.FOC_sale');
  var s1_input = $('#step1 .cost_name').get().map(function(el) { return el.value });

  if(FOC_sale.length!=0){
  cost_arr_s1.splice(0,cost_arr_s1.length);
  for(i=0;i<FOC_sale.length;i++){
    if($(FOC_sale).eq(i).is(":checked")){
    cost_arr_s1.push({name:s1_input[i], check:"true"});
  }
  else{cost_arr_s1.push({name:s1_input[i], check:"false"});


  }}}}



//통화/환율 체크 시 입력창 on/off
$(document).on("change","#step1 .cost_checkbox_container input",function(){
  var div= $(this).closest("label").next();
    if($(this).is(":checked")) {
        div.removeClass("hide");
    } else {
        div.addClass("hide");
    }
})



//기본 통화 변경 시, Step 4 - Slider 범위 조정
//기본 통화 변경 시, Step 2 - 교육생 1인 비용 : 텍스트 수정
$('#step1 #c_main_cur select').on('input', function(){
  var newVal=$(this).val();
  $('.mid_cost .main_currency').text($("#c_main_cur select").val());
  $('#s5_cost_arr>div span text:last-of-type').text($("#c_main_cur select").val())
  switch(newVal){
    case("원"):
      $('#step4 #slide-range').attr('max',150000);
      $('#step4 #slide-range-text text:last-of-type').text('150,000');
      $('#step4 #slide-range-text text:first-of-type').text('-50,000');
      $('#step2 #main_cur').text('대한민국 원')
      break;
    case("달러"):
      $('#step4 #slide-range').attr('max',150);
      $('#step4 #slide-range-text text:last-of-type').text('150');
      $('#step4 #slide-range-text text:first-of-type').text('-50');
      $('#step2 #main_cur').text('미국 달러')
      break;
    case("엔"):
      $('#step4 #slide-range').attr('max',1500);
      $('#step4 #slide-range-text text:last-of-type').text('1,500');
      $('#step4 #slide-range-text text:first-of-type').text('-500');
      $('#step2 #main_cur').text('일본 엔')
      break;
    case("페소"):
      $('#step4 #slide-range').attr('max',750);
      $('#step4 #slide-range-text text:last-of-type').text('750');
      $('#step4 #slide-range-text text:first-of-type').text('-250');
      $('#step2 #main_cur').text('필리핀 페소')
      break;
    case("유로"):
      $('#step4 #slide-range').attr('max',1500);
      $('#step4 #slide-range-text text:last-of-type').text('1,500');
      $('#step4 #slide-range-text text:first-of-type').text('-500');
      $('#step2 #main_cur').text('유럽 유로')
      break;
  }
});

//Step 1 -> Step 2
function s1_to_s2(){

  var s1_input = $('#step1 .cost_name').get().map(function(el) { return el.value });
  var s2_input = $('#step2 .cost_name').get().map(function(el) { return el.value });
  var c_cur=$('#step1 #check_currency .cost_checkbox_container').children('input').get().map(function(el) { 
    if(el.checked==true){ return el.value;}});
  var cost_ins_n=$('#step1 #cost_member input').get().map(function(el) {return el.value});
  

  //Step2 : select에 선택된 통화 추가
  var text='';
    for(i=0;i<c_cur.length;i++){
      if(c_cur[i]){
      text+=`<option value="`;
      text+=c_cur[i];
      text+=`"`;
      if(c_cur[i]==$("#c_main_cur select").val()){
        text+=` selected="selected"`;  
      }
      text+=`>`
      text+=c_cur[i];
      text+=`</option>`
    }
  }
  $('#step2 .cost_p1 select').html(text);
  $('#step3 .ex_cost_p1 select').html(text);





if(s1_input!==s2_input){
  //첫 번째 항목만 별도 처리 : div의 id가 다름
  $('#step2 #c_first input.cost_name').val(s1_input[0]);
   if(cost_arr_s1[0].check==="true"){
    $('#step2 #c_first div.label-default').removeClass('hide');
  }else{
    $('#step2 #c_first div.label-default').addClass('hide');
  }


  var s_div="";
  for(i=1;i<cost_arr_s1.length;i++){
    var div ="";
    div='<div><div class="input_cost">';
    div+=`<div class="label label-default`
    
    if(cost_arr_s1[i].check==="true"){//FOC 체크 표시
      div+=`">FOC 적용</div>`
    }else{
      div+=` hide">FOC 적용</div>`
    }

    div+=`<div class="s2_div">`
    div+=document.getElementById('c_first').getElementsByClassName('s2_div')[0].innerHTML;
    div+='</div></div>';

    div+="<div class='ex_cost'>";
    div+="<div id='ex_cost_";
    div+=i+1;
    div+="' class='collapse'>";
    div+=`<div><span class="check1 hide">공동비용지원 체크 시</span>
              <span class="check2 hide">강사비용지원 체크 시</span>
              <span class="check3 hide">공동비용, 강사비용지원 체크 시</span></div>`

    div+=`<div class="ex_cost_detail"><div>1인 비용</div>
          <span>= 단가 x 횟수</span>
              <span class="check_1"> /참여자 수</span>
              <span class="check_2 hide"> + (단가 x 횟수) x 강사 수 /교육생 수</span>
              <span class="check_3 hide"> /교육생 수</span>




          <div>=
            <text class="p1"></text>
            <text class="cur"></text>
            <text> x </text>
            <text class="p2"></text>
            <text class="unit"></text>

            <span class="check_1">
              <text>/</text>
              <text class="all_n"></text>
              <text>명</text>
            </span>

            <span class="hide check_2">
              <text>+(</text>
                  <text class="p1"></text>
                  <text class="cur"></text>
                  <text>x</text>
                  <text class="p2"></text>
                  <text class="unit"></text>
                  <text>)x</text>
                  <text class="ins_n"></text>
                  <text>명</text>
                  <text>/</text>
                  <text class="bgn_n"></text>
                  <text>명</text>
            </span>


              <span class="hide check_3">
                  <text>/</text>
                  <text class="bgn_n"></text>
                  <text>명</text>
            </span>

            <br>
              <text> = </text>
              <text class="cost">0</text>
              <text class="cur"></text> 
            
            </div></div></div>`
    div+='<div class="accordion-toggle collapsed" data-toggle="collapse" data-target="#ex_cost_';
    div+=i+1;
    div+='">1인 비용 = <text class="cost2">0</text><text class="currency2">원</text>';
    div+='<i><img src="../resources/img/group-16.svg" class="arrow-bottom"></i></div></div></div>';

    var s_div = s_div + div;
}
  //양식 생성
  document.getElementById('c_sibling').innerHTML=s_div;
  //양식에 이름 넣기
  for(i=0;i<s1_input.length;i++){
    $('#step2 input.cost_name').eq(i).val(s1_input[i]);
  

    //FOC 체크 시, 강사 포함 비용 disabeld 처리
    //FOC 체크 시, step2 비용 정리에 표시
    if($('#step1 #FOC_ul input.FOC_sale').eq(i).is(":checked")){
      console.log(i);
      $('#step2 .cost_ins input[type="checkbox"]').eq(i).attr('disabled',true);
      $('#step2 .cost_ins input[type="checkbox"]').eq(i).prop('checked',false);
      $('#step2 .cost_ins').eq(i).css("opacity","0.3");
      if(cost_arr.length!=0){
        cost_arr[i].ins_check=false;}

    }else{
      $('.cost_ins input[type="checkbox"]').eq(i).attr('disabled',false);
      $('.cost_ins').eq(i).css("opacity","1.0");
    }

  }




    



  //설정된 값이 있을 경우, 값 불러오기
  for(i=0;i<cost_arr.length;i++){
    if(cost_arr.length!=0){
      ex_calc_cost(i, cost_arr[i]);
      $('.cost_p1 input').eq(i).val(cost_arr[i].p1);
      $('.cost_p2 input').eq(i).val(cost_arr[i].p2);
      $('.cost_p1 select').eq(i).val(cost_arr[i].currency);
      $('.cost_p2 select').eq(i).val(cost_arr[i].unit);
    
    if(cost_arr[i].n_check){
      $('.cost_n input[type="checkbox"]').eq(i).prop('checked',true);
    }
    if(cost_arr[i].ins_check){
      $('.cost_ins input[type="checkbox"]').eq(i).prop('checked',true);
    }
    }

 
    //FOC 체크 시, 강사 포함 비용 disabeld 처리
    //FOC 체크 시, step2 비용 정리에 표시
    if($('#step1 #FOC_ul input.FOC_sale').eq(i).is(":checked")){
      console.log(i);
      $('#step2 .cost_ins input[type="checkbox"]').eq(i).attr('disabled',true);
      $('#step2 .cost_ins input[type="checkbox"]').eq(i).prop('checked',false);
      $('#step2 .cost_ins').eq(i).css("opacity","0.3");
      if(cost_arr.length!=0){
        cost_arr[i].ins_check=false;}

      $('#step2 .s2_FOC_n').eq(i).addClass('hide');
      $('#step2 .s2_FOC_y').eq(i).removeClass('hide')
    }else{
      $('.cost_ins input[type="checkbox"]').eq(i).attr('disabled',false);
      $('.cost_ins').eq(i).css("opacity","1.0");

      $('#step2 .s2_FOC_n').eq(i).removeClass('hide');
      $('#step2 .s2_FOC_y').eq(i).addClass('hide')
    }

    
  }
}

var s1_input = $('#step1 .cost_name').get().map(function(el) { return el.value });
 //Step2 : 하단 교육생 1인 비용 li 생성
  var s_div="";
  for(i=0;i<s1_input.length;i++){
    var div="";
    div+=`<li>
            <div>
              <span class="s2_FOC_n`
              if(cost_arr_s1[i].check=="true"){
                div+=` hide"`}
              div+=`">FOC 미적용</span>
              <span class="s2_FOC_y`
              if(cost_arr_s1[i].check=="false"){
                div+=` hide"`}
              div+=`">FOC 적용</span>`
              div+=`<span class="s2_n_n">개인 비용</span>
              <span class="s2_n_y hide">공동 비용</span>
              <span class="s2_ins_n">강사비용 미포함</span>
              <span class="s2_ins_y hide">강사비용 포함</span>
            </div>

          <div class="s2_cost_name">`
          div+=s1_input[i];
          div+=`</div>
        <div class="s2_cost_ex">
          <span>
            <text class="s2_cost_p1">0</text>
            <text class="s2_cost_currency"></text>
            <text>x</text>
            <text class="s2_cost_p2">0</text>
            <text class="s2_cost_unit"></text>
          </span>

          <span class="s2_cost_calc">
            <span class="ex_calc hide"><text class="cost3">0</text>
              <text class="s2_cost_currency_">0</text>
              <text> = </text>
            </span>
            <span>
            <text class="s2_cost_fin">0</text>`
              div+=`<text class="main_currency">`
              div+=$("#c_main_cur select").val();
              div+=`</text>
            </span>
          </span>
        </div>
      </li>`

      s_div+=div;
}
document.getElementById('s2_cost_arrange').innerHTML=s_div;

  //설정된 값이 있을 경우, 값 불러오기
  if(cost_arr.length!=0){
    for(i=0;i<s1_input.length;i++){
    
    $('#step2 .s2_cost_name').eq(i).text(s1_input[i]);
    $('#step2 .s2_cost_p1').eq(i).text(cost_arr[i].p1);
    $('#step2 .s2_cost_currency').eq(i).text(cost_arr[i].currency);
    $('#step2 .s2_cost_p2').eq(i).text(cost_arr[i].p2);
    $('#step2 .s2_cost_unit').eq(i).text(cost_arr[i].unit);
    $('#step2 .s2_cost_currency_').eq(i).text(cost_arr[i].currency);
    $('#step2 .main_currency').text($("#c_main_cur select").val());
    $('#step2 .ex_calc .cost3').eq(i).text(cost_arr[i].per_cost);
    $('#step2 .s2_cost_fin').eq(i).text(ex_rate(cost_arr[i].currency, $("#c_main_cur select").val(), cost_arr[i].per_cost));

    if(cost_arr[i].n_check){
      $('#step2 .s2_n_n').eq(i).addClass('hide');
      $('#step2 .s2_n_y').eq(i).removeClass('hide')
    }else{
      $('#step2 .s2_n_n').eq(i).removeClass('hide');
      $('#step2 .s2_n_y').eq(i).addClass('hide')
    }

    if(cost_arr[i].ins_check){
      $('#step2 .s2_ins_n').eq(i).addClass('hide');
      $('#step2 .s2_ins_y').eq(i).removeClass('hide')
    }else{
      $('#step2 .s2_ins_n').eq(i).removeClass('hide');
      $('#step2 .s2_ins_y').eq(i).addClass('hide')
    }

    if(cost_arr[i].currency!==$("#c_main_cur select").val()){
      $('#step2 .ex_calc').eq(i).removeClass('hide');
    }else{
      $('#step2 .ex_calc').eq(i).addClass('hide');
    }

  }
}
    


}





//누락된 입력값 체크
$('#step1 .next-step').click(function(event){
var error_count=0;
var c_cur=$('#step1 #check_currency .cost_checkbox_container').children('input').get().map(function(el) { 
    if(el.checked==true){ return el.value;}});

//참여자 수 누락
 var cost_ins_n=$('#step1 #cost_member input').get().map(function(el) {return el.value});
 if(cost_ins_n[0]==""||cost_ins_n[1]==""){
    $('#step1 #cost_member .participate_empty_error').css("display","block");
    event.stopImmediatePropagation();
    $('html, body').animate({scrollTop : $('#cost_member').offset().top-300}, 400);
    error_count=1;
 }else{
    $('#step1 #cost_member .participate_empty_error').css("display","none");
 }


//환율 누락
for(i=1;i<c_cur.length;i++){
  if(c_cur[i]){
    if($('#check_currency .custom input').eq(i-1).val()==""){
      $('#check_currency div.custom').eq(i-1).children('div:first-of-type').css("display","block");
      event.stopImmediatePropagation();
      if(error_count!=1){
       $('html, body').animate({scrollTop : $('#check_currency .custom input').eq(i-1).offset().top-300}, 400); 
      }
      error_count=1;
      
    }
    else{
       $('#check_currency div.custom').eq(i-1).children('div:first-of-type').css("display","none");
    }
  }
}

//항목 누락
var s1_input = $('#step1 .cost_name').get().map(function(el) { return el.value });

for(i=0;i<s1_input.length;i++){
  if(s1_input[i]==""){
    $('#step1 .name_empty_error').eq(i).css("display","block");
    event.stopImmediatePropagation();
    if(error_count!=1){
      $('html, body').animate({scrollTop : $('#step1 .name_empty_error').eq(i).offset().top-300}, 400);
    }
  }
  else{
    $('#step1 .name_empty_error').eq(i).css("display","none");
  } 
}



window.scrollTo({
    top: 0,
});


});




 
function ex_calc_cost(i,cost_arr){
  var cost_ins_n=$('#step1 #cost_member input').get().map(function(el) {return el.value});

  $('#step2 #ex_cost_'+(i+1)+' .p1').text(cost_arr.p1);
  $('#step2 #ex_cost_'+(i+1)+' .p2').text(cost_arr.p2);
  $('#step2 #ex_cost_'+(i+1)+' .cur').text(cost_arr.currency);
  $('#step2 #ex_cost_'+(i+1)+' .unit').text(cost_arr.unit);
  $('#step2 .ins_n').text(cost_ins_n[0]);
  $('#step2 .bgn_n').text(cost_ins_n[1]);
  $('#step2 .all_n').text(parseInt(cost_ins_n[0])+parseInt(cost_ins_n[1]));
  $('#step2 .currency2').eq(i).html(cost_arr.currency);
  $('#step2 .cost').eq(i).text(cost_arr.per_cost);
  $('#step2 .cost2').eq(i).text(cost_arr.per_cost);
  $('#step2 #s2_p_cal .ex_per_cost').eq(i).text(cost_arr.per_cost);


  var c_check_1=$('.ex_cost .collapse .check1');
  var c_check_2=$('.ex_cost .collapse .check2');
  var c_check_3=$('.ex_cost .collapse .check3');

  var check_1=$('#ex_cost_'+(i+1)+' .check_1');
  var check_2=$('#ex_cost_'+(i+1)+' .check_2');
  var check_3=$('#ex_cost_'+(i+1)+' .check_3');

    /**모두 클릭**/
    if((cost_arr.n_check)&&(cost_arr.ins_check)){
      console.log('1')
      c_check_1.eq(i).addClass('hide');
      c_check_2.eq(i).addClass('hide');
      c_check_3.eq(i).removeClass('hide');


      check_1.addClass('hide');
      check_2.addClass('hide');
      check_3.removeClass('hide');
    }else if((!cost_arr.n_check)&&(cost_arr.ins_check)){
      /**강사비용지원만 체크**/
      console.log('2')

      c_check_1.eq(i).addClass('hide');
      c_check_2.eq(i).removeClass('hide');
      c_check_3.eq(i).addClass('hide');


      check_1.addClass('hide');
      check_2.removeClass('hide');
      check_3.addClass('hide');
    }else if((cost_arr.n_check)&&(!cost_arr.ins_check)){
      /**공동비용지원 체크**/
      console.log('3')

      c_check_1.eq(i).removeClass('hide');
      c_check_2.eq(i).addClass('hide');
      c_check_3.eq(i).addClass('hide');

      check_1.removeClass('hide');
      check_2.addClass('hide');
      check_3.addClass('hide');
    }

    else{
      console.log('4')

      /**모두 미 체크시**/
      c_check_1.eq(i).addClass('hide');
      c_check_2.eq(i).addClass('hide');
      c_check_3.eq(i).addClass('hide');

      check_1.addClass('hide');
      check_2.addClass('hide');
      check_3.addClass('hide');
    }
  return;
  };

function addComma(num) {
                var regexp = /\B(?=(\d{3})+(?!\d))/g;
                return num.toString().replace(regexp, ',');
            }

function removeComma(num){
  return parseInt(num.replace(/,/g, '')) 
}