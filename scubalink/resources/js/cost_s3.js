
//강사 할인 비용(체크) 입력 시, 실지출 div 생성
$(document).on("change","#step3 #cost_ins input",function(){
var actual_check=$('#step3 #cost_ins .cost_checkbox_container').children('input').get().map(function(el) { return el.checked })
var cost_no_s='';
var s3='#s3_cost_';
console.log(actual_check);
//아무것도 체크 안 했을 경우
if(actual_check.every(x=>!x)){
  $('#step3 #cost_no_s_list_empty').removeClass("hidden");
  $('#step3 #cost_no_s_list').addClass("hidden");
}

else{
  $('#step3 #cost_no_s_list_empty').addClass("hidden");
  $('#step3 #cost_no_s_list').removeClass("hidden");
  for(i=0;i<actual_check.length;i++){

  var div='';
  //실지출 check시에만 생성
  if(actual_check[i]){
    cost_arr[i].actual_check=true; //cost_arr 배열에 추가
    console.log(cost_arr);

    div+=`<div><div class="input_cost">`;

    if(cost_arr[i].check=="true"){
      div+=`<div class="actual_box"><span class="label label-default hide">FOC 미적용</span>
            <span class="label">FOC 적용</span>`
    }else{
      div+=`<div class="actual_box"><span class="label label-default">FOC 미적용</span>
            <span class="label hide">FOC 적용</span>`}

    if(cost_arr[i].n_check){
      div+=`<span class="label label-default hide">개인 비용</span>
           <span class="label">공동 비용</span>`
    }else{
      div+=`<span class="label label-default">개인 비용</span>
            <span class="label hide">공동 비용</span>`}
  
    if(cost_arr[i].ins_check){
      div+=`<span class="label label-default hide">강사비용 미포함</span>
           <span class="label">강사비용 포함</span></div>`
    }else{
      div+=`<span class="label label-default">강사비용 미포함</span>
            <span class="label hide">강사비용 포함</span></div>`}


  
    div+=`<div class="input_cost_name">`
    div+=cost_arr[i].name;
    div+=`</div>

            <div class="cost_p1">
              <input type="number" value="`;
    div+=cost_arr[i].p1;
    div+=`">
              <span class="cost_ins_unit">`
              div+=cost_arr[i].currency;
              div+=`</span>
            </div>

            <span>X</span>
            <text>`
            div+=cost_arr[i].p2;
            div+=`</text>
            <text>`
            div+=cost_arr[i].unit;


          div+=`</text>

          </div><!-- input cost-->



        <div class="ex_cost">
          <div id="s3_cost_`
          div+=i;
          div+=`" class="collapse">
            <div>`
            div+=document.getElementsByClassName("ex_cost_detail")[i].innerHTML;
            div+=`</div>
          </div>

          <div class="accordion-toggle collapsed" data-toggle="collapse" data-target="#s3_cost_`
          div+=i;
          div+=`">1인 실지출 = <text class="p_real_cost">`
          div+=cost_arr[i].per_cost;
          div+=`</text>`
          div+=cost_arr[i].currency;
          div+=`
            <text class="cost2"></text>
            <text class="currency2"></text>
            <i><img src="../resources/img/group-16.svg"></i>
          </div>
        </div>
        </div>`

        
  }else{
    cost_arr[i].actual_check=false;
    div+=`<div class="actual_box hide"> <input type="number" value="0"></div>`
  }
  cost_no_s+=div;
  
}

$('#cost_no_s_list').html(cost_no_s);
}

});




//Step3, 실지출 비용 입력 시 값 조정
$(document).on("change","#step3 input, #step3 select",function(){
var cost_ins_n=$('#step1 #cost_member input').get().map(function(el) {return el.value});
var real_cost=$('#step3 #cost_no_s_list input').get().map(function(el) {return el.value});
var actual_check=$('#step3 #cost_ins .cost_checkbox_container').children('input').get().map(function(el) { return el.checked })
var main_cur=$("#c_main_cur select").val();

var s3_t_cost=0;//교육생 1인 실지출


  for(i=0;i<cost_arr.length;i++){

    var cost=0;
    cost_arr[i].actual_p1=real_cost[i];//cost_arr에 값 추가


    if(actual_check[i]){
    //모두 클릭
      if((cost_arr[i].n_check)&&(cost_arr[i].ins_check)){
        cost=parseInt(parseInt(real_cost[i])*parseInt(cost_arr[i].p2)/parseInt(cost_ins_n[1]));
      }else if((!cost_arr[i].n_check)&&(cost_arr[i].ins_check)){
        //강사비용지원만 체크
         cost=parseInt(parseInt(real_cost[i])*parseInt(cost_arr[i].p2)*(1+parseInt(cost_ins_n[0])/parseInt(cost_ins_n[1])));
      }else if((cost_arr[i].n_check)&&(!cost_arr[i].ins_check)){
        //공동비용지원 체크
        cost=parseInt(parseInt(real_cost[i])*parseInt(cost_arr[i].p2)/(parseInt(cost_ins_n[0])+parseInt(cost_ins_n[1])));
      }
      else{
        //모두 미 체크시
        cost=parseInt(parseInt(real_cost[i])*parseInt(cost_arr[i].p2));
      }

      //실제 지출 단가 : 설명
      $("#step3 #cost_no_s_list input").eq(i).closest('.input_cost').siblings('div.ex_cost').find('.p1').text(real_cost[i]);
      $("#step3 #cost_no_s_list input").eq(i).closest('.input_cost').siblings('div.ex_cost').find('.cost').text(cost);
      $("#step3 #cost_no_s_list input").eq(i).closest('.input_cost').siblings('div.ex_cost').find('.p_real_cost').text(cost);

     cost_arr[i].actual_per_cost=cost;
    }


      //교육생 1인 실지출 :ex_per_cost
      
      var ex_cost= new Array();
      if(actual_check[i]){
        $("#step3 #s3_p_cal .ex_per_cost").eq(i).text(cost);
        ex_cost[i] = ex_rate(cost_arr[i].currency, main_cur, cost);
      }
      else{
        $("#step3 #s3_p_cal .ex_per_cost").eq(i).text(cost_arr[i].per_cost);
        ex_cost[i] = ex_rate(cost_arr[i].currency, main_cur, cost_arr[i].per_cost);
      }
      
      //교육생 1인 실지출: s3_p_num
      $("#step3 #s3_p_sum text:odd").eq(i).text(ex_cost[i]+main_cur);
      
      //교육생 1인 실지출: s3_p_total, actual_t_cost
      s3_t_cost+=parseInt(ex_cost[i]);
    }
      $("#step3 #s3_p_total text").eq(0).html(s3_t_cost);
      $("#step3 .actual_t_cost").text(s3_t_cost);






var extra_c_name=$('#step3 .c_list input.cost_name').get().map(function(el) {return el.value});
var extra_c_cost=$('#step3 .c_list .c_select input').get().map(function(el) {return el.value});
var extra_c_currency=$('#step3 .c_list select').get().map(function(el) {return el.value});
var cost_ins_n=$('#step1 #cost_member input').get().map(function(el) {return el.value});
  
var s3_sum_name=`= (교육생 1인 실지출 x 교육생 수)`
var s3_sum_cal='';
var s3_sum_cal_ex='';
var extra_cost_sum=0;


if(extra_c_name!=""){
for(i=0;i<extra_c_name.length;i++){
  s3_sum_name+=` + `;
  s3_sum_name+=extra_c_name[i];

  s3_sum_cal+=` + `;
  s3_sum_cal+=extra_c_cost[i];
  s3_sum_cal+=extra_c_currency[i];

  s3_sum_cal_ex+=` + `;
  s3_sum_cal_ex+=ex_rate(extra_c_currency[i], main_cur, extra_c_cost[i]);
  s3_sum_cal_ex+=$("#c_main_cur select").val();

  extra_cost_sum+=ex_rate(extra_c_currency[i], main_cur, extra_c_cost[i]);
  }
}

  $('#step3 #s3_sum_cost #s3_sum_name').text(s3_sum_name);
  $('#step3 #s3_sum_cal #extra_cost').text(s3_sum_cal);
  $('#step3 #s3_sum_cal_ex #extra_cost_ex').text(s3_sum_cal_ex);
  
  console.log(extra_cost_sum);

  if(extra_cost_sum==0){
    var s3_f_cost=parseInt(s3_t_cost)*parseInt(cost_ins_n[1]);
  }else{
    var s3_f_cost=parseInt(s3_t_cost)*parseInt(cost_ins_n[1])+parseInt(extra_cost_sum);
  }

  $('#step3 #s3_f_cost').html(s3_f_cost);
  $('#step3 #s3_f_cur').html(main_cur);
  $('#step3 .mid_cost text').html(s3_f_cost+main_cur)
});


function ex_rate(cur, main_cur, num){
  //원화로 먼저 통일
    switch(cur){
    case("원"):
      var text=parseInt(num);
      break;
    case("달러"):
      var text=parseInt(num)*parseInt($('#check_currency .custom input').eq(0).val());
      break;
    case("엔"):
      var text=parseInt(num)*parseInt($('#check_currency .custom input').eq(1).val())/100;
      break;
    case("페소"):
      var text=parseInt(num)*parseInt($('#check_currency .custom input').eq(2).val());
      break;
    case("유로"):
      var text=parseInt(num)*parseInt($('#check_currency .custom input').eq(3).val());
      break;
    }

    //기본 통화의 환율 적용
    switch(main_cur){
    case("원"):
      text=parseInt(text);
      break;
    case("달러"):
      text=parseInt(text)/parseInt($('#check_currency .custom input').eq(0).val());
      break;
    case("엔"):
      text=parseInt(text)/parseInt($('#check_currency .custom input').eq(1).val())*100;
      break;
    case("페소"):
      text=parseInt(text)/parseInt($('#check_currency .custom input').eq(2).val());
      break;
    case("유로"):
      text=parseInt(text)/parseInt($('#check_currency .custom input').eq(3).val());
      break;
    }

    return parseInt(text);
}





/** Step 3 - 비용 추가/삭제 **/
function add_div_s3(){
  var div = document.createElement('div');
  div.innerHTML = document.getElementById('c_extra_first').innerHTML;
  document.getElementById('c_extra_sibling').appendChild(div);
}

function remove_div_s3(obj){
  document.getElementById('c_extra_sibling').removeChild(obj.parentNode.parentNode.parentNode);
}

$(document).on("change","#step3 input",function(){

});



function s3_to_s4(){
  var per_cost='';

  for(i=0;i<cost_arr.length;i++){
    var text=`<div class="s4_check_cost_arr">`
    text+=cost_arr[i].name;
    text+=`<span>+ `
    text+=$('#s2_p_sum text:odd').eq(i).text();
    text+=`</span></div>`

    per_cost+=text;
  }
  $('#s4_check_per_cost').html(per_cost);


  $('#step4 .s4_check_cost_fin span').text($('#s2_p_total text')[0].innerText+$('#s2_p_total text')[1].innerText);
  $('#step4 #s4_check_cost_income span').text($('#total_c text')[0].innerText + $('#total_c text')[1].innerText);
  $('#step4 #s4_check_cost_expense span').text($('#s3_f_cost')[0].innerText + $('#s3_f_cur')[0].innerText);
  $('#step4 .s4_check_cost_revenue span').text(parseInt($('#total_c text')[0].innerText)-parseInt($('#s3_f_cost')[0].innerText)+$("#c_main_cur select").val());
  $('#step4 .set_cost span').text($("#c_main_cur select").val());
  $('#step4 #expect_cost span').text($("#c_main_cur select").val());

}
