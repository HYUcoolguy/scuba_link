function update_cost_arr(){
   var cost_ins_n=$('#step1 #cost_member input').get().map(function(el) {return el.value});
  var cost_p1=$('#step2 .cost_p1 input').get().map(function(el) {return el.value});
  var cost_p2=$('#step2 .cost_p2 input').get().map(function(el) {return el.value});
  var cost_cur=$('#step2 .cost_p1 select').get().map(function(el) {return el.value});
  var cost_unit=$('#step2 .cost_p2 select').get().map(function(el) {return el.value});
  var cost_name = $('#step2 .cost_name').get().map(function(el) { return el.value });
  var cost_n=$('#step2 .cost_n .cost_checkbox_container').children('input').get().map(function(el) { return el.checked });
  var cost_ins=$('#step2 .cost_ins .cost_checkbox_container').children('input').get().map(function(el) { return el.checked });
  var cost_foc_=$('#step2 .input_cost .label').get().map(function(el) {return el.classList.length});
  var s3_actual_p1=$('#step3 .s3_cost_expense input').get().map(function(el) {return el.value});
    //length==2는 FOC 체크 true
    var cost_foc={};
    for(i=0;i<cost_n.length;i++){
      if(cost_foc_[i]==2){
        cost_foc[i]="true";
      }else{
        cost_foc[i]="false";}
      }
  var s3_actual_check=$('#step3 #cost_ins .cost_checkbox_container').children('input').get().map(function(el) { return el.checked })




//비용 배열 생성
  cost_arr.splice(0,cost_arr.length);

  for(i=0;i<cost_n.length;i++){
    cost_arr.push({
      name:cost_name[i], //명칭
      p1:cost_p1[i],  //단가
      p2:cost_p2[i],  //횟수
      currency:cost_cur[i], //통화
      unit:cost_unit[i],  //단위
      n_check:cost_n[i],  //공동 비용(체크)
      ins_check:cost_ins[i],  //강사 포함 비용(체크)
      check:cost_foc[i],  //FOC(체크)
      per_cost:'',  //1인 비용
    })
  }

  if(s3_actual_p1!==""){
    for(i=0;i<cost_arr.length;i++){
      cost_arr[i].actual_p1=s3_actual_p1[i];
    }
  }

}


$(document).on("change","#step2 input, #step2 select",function(){
  var cost_ins_n=$('#step1 #cost_member input').get().map(function(el) {return el.value});
  var cost_p1=$('#step2 .cost_p1 input').get().map(function(el) {return el.value});
  var cost_p2=$('#step2 .cost_p2 input').get().map(function(el) {return el.value});
  var cost_cur=$('#step2 .cost_p1 select').get().map(function(el) {return el.value});
  var cost_unit=$('#step2 .cost_p2 select').get().map(function(el) {return el.value});
  var cost_name = $('#step2 .cost_name').get().map(function(el) { return el.value });
  var cost_n=$('#step2 .cost_n .cost_checkbox_container').children('input').get().map(function(el) { return el.checked });
  var cost_ins=$('#step2 .cost_ins .cost_checkbox_container').children('input').get().map(function(el) { return el.checked });
  var cost_foc_=$('#step2 .input_cost .label').get().map(function(el) {return el.classList.length});
  var s3_actual_p1=$('#step3 .s3_cost_expense input').get().map(function(el) {return el.value});
    //length==2는 FOC 체크 true
    var cost_foc={};
    for(i=0;i<cost_n.length;i++){
      if(cost_foc_[i]==2){
        cost_foc[i]="true";
      }else{
        cost_foc[i]="false";}
      }
  var s3_actual_check=$('#step3 #cost_ins .cost_checkbox_container').children('input').get().map(function(el) { return el.checked })




update_cost_arr();

//비용 배열 계산
var e="#ex_cost_";
var cur2=document.getElementsByClassName("currency2");
var c_check_1=$('.ex_cost .collapse .check1');
  var c_check_2=$('.ex_cost .collapse .check2');
  var c_check_3=$('.ex_cost .collapse .check3');
//입력 값 : 계산 내역에 표시

  
  for(i=0;i<=cost_n.length;i++){
    var cost='';
    var ex_p1=$(e+(i+1)+' .p1');
    var ex_p2=$(e+(i+1)+' .p2');

    var ex_currency=$(e+(i+1)+' .cur');
    var ex_unit=$(e+(i+1)+' .unit');
  
    $('.currency2').eq(i).html(cost_cur[i]);

    ex_p1.text(cost_p1[i]);
    ex_p2.text(cost_p2[i]);

    ex_currency.text(cost_cur[i]);
    ex_unit.text(cost_unit[i]);
    var check_1=$(e+(i+1)+' .check_1');
    var check_2=$(e+(i+1)+' .check_2');
    var check_3=$(e+(i+1)+' .check_3');
    var cost=''
    /**모두 클릭**/
    if((cost_n[i])&&(cost_ins[i])){
      c_check_1.eq(i).addClass('hide');
      c_check_2.eq(i).addClass('hide');
      c_check_3.eq(i).removeClass('hide');

      check_1.addClass('hide');
      check_2.addClass('hide');
      check_3.removeClass('hide');
      cost=parseInt(parseInt(cost_arr[i].p1)*parseInt(cost_arr[i].p2)/parseInt(cost_ins_n[1]));
    }else if((!cost_n[i])&&(cost_ins[i])){
      /**강사비용지원만 체크**/
      c_check_1.eq(i).addClass('hide');
      c_check_2.eq(i).removeClass('hide');
      c_check_3.eq(i).addClass('hide');


      check_1.addClass('hide');
      check_2.removeClass('hide');
      check_3.addClass('hide');

      cost=parseInt(parseInt(cost_arr[i].p1)*parseInt(cost_arr[i].p2)*(1+parseInt(cost_ins_n[0])/parseInt(cost_ins_n[1])));
    }else if((cost_n[i])&&(!cost_ins[i])){
      /**공동비용지원 체크**/
      c_check_1.eq(i).removeClass('hide');
      c_check_2.eq(i).addClass('hide');
      c_check_3.eq(i).addClass('hide');

      check_1.removeClass('hide');
      check_2.addClass('hide');
      check_3.addClass('hide');
      cost=parseInt(parseInt(cost_arr[i].p1)*parseInt(cost_arr[i].p2)/(parseInt(cost_ins_n[0])+parseInt(cost_ins_n[1])));

    }

    else{
      /**모두 미 체크시**/
      c_check_1.eq(i).addClass('hide');
      c_check_2.eq(i).addClass('hide');
      c_check_3.eq(i).addClass('hide');

      check_1.addClass('hide');
      check_2.addClass('hide');
      check_3.addClass('hide');
      cost=parseInt(parseInt(cost_p1[i])*parseInt(cost_p2[i]));
    }


    $('#step2 .cost').eq(i).text(cost);
    $('#step2 .cost2').eq(i).text(cost);
    $('#step2 .cost3').eq(i).text(cost);


  }

for(i=0;i<cost_arr.length;i++){

  $('#step2 .s2_cost_name').eq(i).text(cost_arr[i].name);
  $('#step2 .s2_cost_p1').eq(i).text(cost_arr[i].p1);
  $('#step2 .s2_cost_currency').eq(i).text(cost_arr[i].currency);
  $('#step2 .s2_cost_p2').eq(i).text(cost_arr[i].p2);
  $('#step2 .s2_cost_unit').eq(i).text(cost_arr[i].unit);
  $('#step2 .s2_cost_currency_').eq(i).text(cost_arr[i].currency);
  $('#step2 .main_currency').text($("#c_main_cur select").val());


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





  var currency=$("#c_main_cur select").val();
  var s2_p_sum='';
  var t_cost=0;

  for(i=0;i<cost_arr.length;i++){

    //원화로 먼저 통일
    switch(cost_arr[i].currency){
    case("원"):
      var text=parseInt(document.getElementsByClassName("cost2")[i].innerText);
      break;
    case("달러"):
      var text=parseInt(document.getElementsByClassName("cost2")[i].innerText)*parseInt($('#check_currency .custom input').eq(0).val());
      break;
    case("엔"):
      var text=parseInt(document.getElementsByClassName("cost2")[i].innerText)*parseInt($('#check_currency .custom input').eq(1).val())/100;
      break;
    case("페소"):
      var text=parseInt(document.getElementsByClassName("cost2")[i].innerText)*parseInt($('#check_currency .custom input').eq(2).val());
      break;
    case("유로"):
      var text=parseInt(document.getElementsByClassName("cost2")[i].innerText)*parseInt($('#check_currency .custom input').eq(3).val());
      break;
    }

    //기본 통화의 환율 적용
    switch(currency){
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
    $('#step2 .s2_cost_fin').eq(i).text(parseInt(text));
    t_cost+=parseInt(text);

  }

$('#step2 #s2_p_total #t_cost').html(t_cost); //예상 총 수입 : 교육생 1인 비용
$('#step2 .main_currency').text(currency);
$('#step2 #s2_p_total #t_cur').html(currency);//예상 총 수입 : 기본 통화
$('#step2 .mid_cost #t_cost_').html(t_cost);

$('#step3 .t_cur').html(currency);//예상 총 수입 : 기본 통화(Step3)
$('#step3 .main_currency').text(currency);
$('#step3 .mid_cost .per_cost').html(t_cost);

var bgn_n=$('#step1 #cost_member input').get().map(function(el) {return el.value});
  $('#step2 .bgn_n').text(cost_ins_n[1]);
  $('#step3 .bgn_n').text(cost_ins_n[1]);
  $('#step2 .ins_n').text(cost_ins_n[0]);
  $('#step2 .all_n').text(parseInt(cost_ins_n[0])+parseInt(cost_ins_n[1]));
var total_cost=parseInt(t_cost)*parseInt(bgn_n[1]);

$('#step2 #total_c text:first-child').html(total_cost);

mid_cost();
});




//Step2 -> Step3 
function s2_to_s3(){
  var s2_input = $('#step2 .cost_name').get().map(function(el) { return el.value });
  var s_div="";
  update_cost_arr();

  //Step3 : 실지출 입력 - 양식 복사
  for(i=0;i<s2_input.length;i++){
  var div="";
    div+=`<li>
            <div>
              <span class="s3_FOC_n">FOC 미적용</span>
              <span class="s3_FOC_y hide">FOC 적용</span>
              <span class="s3_n_n">개인 비용</span>
              <span class="s3_n_y hide">공동 비용</span>
              <span class="s3_ins_n">강사비용 미포함</span>
              <span class="s3_ins_y hide">강사비용 포함</span>
            </div>

        <div class="s3_cost_name">숙박</div>
        <!--수입-->
        <div class="s3_cost_income">
          <span>
            <text>수입</text>
            <text class="s3_cost_p1">0</text>
            <text class="s3_cost_currency"></text>
            <text>x</text>
            <text class="s3_cost_p2">0</text>
            <text class="s3_cost_unit"></text>
          </span>

          <span class="s3_calc_income">
            <span class="ex_calc hide">
              <text class="cost3">0</text>
              <text class="s3_cost_currency_">0</text>
              <text> = </text>
            </span>
            <span>
              <text class="s3_cost_fin">0</text>
              <text class="main_currency">원</text>
            </span>
          </span>
        </div>


        <!--지출-->
        <div class="s3_cost_expense">
          <span>
            <text>지출</text>
            <input type="number" value="0" onkeypress="this.style.width = ((this.value.length + 1) * 8) + 'px';">
            <text class="s3_cost_currency"></text>
            <text>x</text>
            <text class="s3_cost_p2">0</text>
            <text class="s3_cost_unit"></text>
          </span>

          <span class="s3_calc_expense">
            <span class="ex_calc hide">
              <text class="cost3_expense">0</text>
              <text class="s3_cost_currency_">0</text>
              <text> = </text>
            </span>
            <span>
              <text class="s3_cost_fin_expense">0</text>
              <text class="main_currency">원</text>
            </span>
          </span>
        </div>


        <!--수익-->
        <div class="s3_cost_revenue">
          수익: 
          <text class="s3_calc_revenue">0</text>
          <text class="main_currency"></text>
        </div>
      </li>`

      s_div+=div;
 
}
  $('#s3_cost_arrange ul').html(s_div);


  var cost_ins_n=$('#step1 #cost_member input').get().map(function(el) {return el.value});

  for(i=0;i<cost_arr.length;i++)
    cost_arr[i].per_cost=$('#step2 .cost2').eq(i).text();
  //Step3 : 실지출 입력 - 값 입력
  if(cost_arr.length!=0){
    for(i=0;i<cost_arr.length;i++){

    //FOC, 개인/공동, 강사 비용 체크 + 환율 계산
    if(cost_arr[i].check=="true"){
      $('#step3 .s3_FOC_n').eq(i).addClass('hide');
      $('#step3 .s3_FOC_y').eq(i).removeClass('hide')
    }else{
      $('#step3 .s3_FOC_n').eq(i).removeClass('hide');
      $('#step3 .s3_FOC_y').eq(i).addClass('hide')
    }
    if(cost_arr[i].n_check){
      $('#step3 .s3_n_n').eq(i).addClass('hide');
      $('#step3 .s3_n_y').eq(i).removeClass('hide')
    }else{
      $('#step3 .s3_n_n').eq(i).removeClass('hide');
      $('#step3 .s3_n_y').eq(i).addClass('hide')
    }

    if(cost_arr[i].ins_check){
      $('#step3 .s3_ins_n').eq(i).addClass('hide');
      $('#step3 .s3_ins_y').eq(i).removeClass('hide')
    }else{
      $('#step3 .s3_ins_n').eq(i).removeClass('hide');
      $('#step3 .s3_ins_y').eq(i).addClass('hide')
    }

    if(cost_arr[i].currency!==$("#c_main_cur select").val()){
      $('#step3 .s3_cost_income .ex_calc').eq(i).removeClass('hide');
      $('#step3 .s3_cost_expense .ex_calc').eq(i).removeClass('hide');
    }else{
      $('#step3 .s3_cost_income .ex_calc').eq(i).addClass('hide');
      $('#step3 .s3_cost_expense .ex_calc').eq(i).addClass('hide');
    }

    //수입
    $('#step3 .s3_cost_name').eq(i).text(cost_arr[i].name);
    $('#step3 .s3_cost_income .s3_cost_p1').eq(i).text(cost_arr[i].p1);
    $('#step3 .s3_cost_income .s3_cost_currency').eq(i).text(cost_arr[i].currency);
    $('#step3 .s3_cost_income .s3_cost_p2').eq(i).text(cost_arr[i].p2);
    $('#step3 .s3_cost_income .s3_cost_unit').eq(i).text(cost_arr[i].unit);
    $('#step3 .s3_cost_income .s3_cost_currency_').eq(i).text(cost_arr[i].currency);
    $('#step3 .main_currency').text($("#c_main_cur select").val());
    $('#step3 .s3_cost_income .ex_calc .cost3').eq(i).text(cost_arr[i].per_cost);
    $('#step3 .s3_cost_income .s3_cost_fin').eq(i).text(ex_rate(cost_arr[i].currency, $("#c_main_cur select").val(), cost_arr[i].per_cost));
    
    //지출
    $('#step3 .s3_cost_expense input').eq(i).val(cost_arr[i].p1);
    $('#step3 .s3_cost_expense .s3_cost_currency').eq(i).text(cost_arr[i].currency);
    $('#step3 .s3_cost_expense .s3_cost_p2').eq(i).text(cost_arr[i].p2);
    $('#step3 .s3_cost_expense .s3_cost_unit').eq(i).text(cost_arr[i].unit);
    $('#step3 .s3_cost_expense .s3_cost_currency_').eq(i).text(cost_arr[i].currency);
    $('#step3 .s3_cost_expense .ex_calc .cost3_expense').eq(i).text(cost_arr[i].per_cost);
    $('#step3 .s3_cost_expense .s3_cost_fin_expense').eq(i).text(ex_rate(cost_arr[i].currency, $("#c_main_cur select").val(), cost_arr[i].per_cost));
    
    //S3에서 입력한 값 있을 경우, 실행
    if(cost_arr[i].actual_p1){
      $('#step3 .s3_cost_expense input').eq(i).val(cost_arr[i].actual_p1);
      var real_expense=cost_calc(cost_arr[i], cost_ins_n[0], cost_ins_n[1]);
      $('#step3 .s3_calc_expense .cost3_expense').eq(i).text(real_expense);
      var change_expense=ex_rate(cost_arr[i].currency, $("#c_main_cur select").val(), real_expense);
      $('#step3 .s3_calc_expense .s3_cost_fin_expense').eq(i).text(change_expense);
      var cost_revenue=parseInt($('#step3 .s3_cost_fin').eq(i).text())-parseInt(change_expense);
      $('#step3 .s3_cost_revenue .s3_calc_revenue').eq(i).text(cost_revenue);
    }

    }
  }
  mid_cost();
  window.scrollTo({
    top: 0
});
}





// Step 2 -> Step 1
function s2_to_s1(){
  var s1_input = $('#step1 .cost_name').get().map(function(el) { return el.value });
  var s2_input = $('#step2 .cost_name').get().map(function(el) { return el.value });

  var FOC_list_sum="";

  if(s2_input!=s1_input){
    $('#room_type input.cost_name').val(s2_input[0]);

    var s_div="";
    for(i=1;i<s2_input.length;i++){
      var div=`<div class="input_cost">
                <div>
                  <input type="text" class="cost_name" placeholder="비용을 입력해주세요"
                  value="`
          div+=s2_input[i];
          div+=`" onkeyup="update_arr()">
                <span class="remove_div btn" onclick="remove_div(this)"><img src="../resources/img/ic-close.svg"></span> 
                </div>
                </div>
                `
        var s_div = s_div+div;
      }
      document.getElementById('field').innerHTML=s_div;

      /**Step 1 - FOC 할인 항목도 동일하게 복사**/
      for(i=0;i<s2_input.length;i++){
        var FOC_list="<li><label class='cost_checkbox_container'>";
        FOC_list+=s2_input[i];
        FOC_list+="<input type='checkbox' class='FOC_sale'"
          if(cost_arr_s1[i].check==="true"){
            FOC_list+=`checked>`
          }else{
            FOC_list+=`'>`
          }
        FOC_list+="<span class='cost_checkmark'></span></label></li>"
        FOC_list_sum+=FOC_list
      }

      document.getElementById('FOC_ul').innerHTML=FOC_list_sum;
    }

    for(i=0;i<cost_arr.length;i++)
      cost_arr[i].per_cost=$('#step2 .cost2').eq(i).text();

    mid_cost();
    window.scrollTo({
    top: 0
  });
  };



function mid_cost(){
  //1인 수입
  var per_income=0;
  per_income=parseInt($('#s2_p_total #t_cost').text())+parseInt($('#s4_control_cost_input .s4_income text:first-child').text());
  
  $('.per_cost').text(per_income);
  $('#s4_control_cost thead .s4_income text:first-of-type').text(per_income);
  $('#s5_cost_arr>div span text:first-of-type').text(per_income);
  //1인 수익
  var per_revenue=0;
    //Step3
  var s3_check=$('#step3 .s3_cost_expense input').get().map(function(el) {return el.value});

  if(s3_check.length!==0){
    for(i=0;i<cost_arr.length;i++){
      per_revenue+=parseInt($('#step3 .s3_cost_revenue .s3_calc_revenue').eq(i).text());
    }
    var extra_p1=$('#step3 .ex_cost_p1 input').get().map(function(el) {return el.value});
    for(i=0;i<extra_p1.length;i++){
      per_revenue+=parseInt($('#step3 .ex_cost_calc .revenue text:nth-of-type(2)').eq(i).text());
    }
  }
    
    //Step4
  if($('#s4_control_revenue').val()!==""){
    per_revenue+=parseInt($('#s4_control_revenue').val());
  }

  $('.per_revenue').text(per_revenue);
  $('#s4_control_cost thead .s4_revenue text:first-of-type').text(per_revenue);
  if(per_revenue<0){
     $('#s4_control_cost thead .s4_revenue').css('color','#e02020')
  }else{
    $('#s4_control_cost thead .s4_revenue').css('color','#145db2')
  }
  

  //총 수익
  var cost_ins_n=$('#step1 #cost_member input').get().map(function(el) {return el.value});
  $('.total_revenue').text(parseInt(cost_ins_n[1])*per_revenue);
}

