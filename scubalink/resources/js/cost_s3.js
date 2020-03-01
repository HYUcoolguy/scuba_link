$(document).on("change","#step3 input, #step3 select",function(){
  //실지출 처리
  var real_cost=$('#step3 .s3_cost_expense input').get().map(function(el) {return el.value});
  var cost_ins_n=$('#step1 #cost_member input').get().map(function(el) {return el.value});
  var sum_revenue=0;
  var sum_extra=0;

  for(i=0;i<cost_arr.length;i++){
    cost_arr[i].actual_p1=real_cost[i];
    var real_expense=cost_calc(cost_arr[i], cost_ins_n[0], cost_ins_n[1]);
    $('#step3 .s3_calc_expense .cost3_expense').eq(i).text(real_expense);
    var change_expense=ex_rate(cost_arr[i].currency, $("#c_main_cur select").val(), real_expense);
    $('#step3 .s3_calc_expense .s3_cost_fin_expense').eq(i).text(change_expense);
    var cost_revenue=parseInt($('#step3 .s3_cost_fin').eq(i).text())-parseInt(change_expense);
    $('#step3 .s3_cost_revenue .s3_calc_revenue').eq(i).text(cost_revenue);
    if(cost_revenue<0){
      $('#step3 .s3_cost_revenue').eq(i).css('color','#e02020')
    }else{
      $('#step3 .s3_cost_revenue').eq(i).css('color','#145db2')
    }
    sum_revenue+=cost_revenue;
  }

  //추가 지출 처리(공동 비용, 강사비용 포함)
  var extra_name=$('#step3 .ex_cost_name').get().map(function(el) {return el.value});
  var extra_p1=$('#step3 .ex_cost_p1 input').get().map(function(el) {return el.value});
  var extra_p2=$('#step3 .ex_cost_p2 input').get().map(function(el) {return el.value});
  var extra_currency=$('#step3 .ex_cost_p1 select').get().map(function(el) {return el.value});
  var extra_unit=$('#step3 .ex_cost_p2 select').get().map(function(el) {return el.value});
  
  for(i=0;i<extra_p1.length;i++){
    var extra_cost=parseInt(parseInt(extra_p1[i])*parseInt(extra_p2[i])/parseInt(cost_ins_n[1]))||0;
    $('#step3 .ex_cost_calc .expense text:first-of-type').eq(i).text(extra_cost);
    $('#step3 .ex_cost_calc .expense text:nth-of-type(2)').eq(i).text(extra_currency[i]);
    var change_extra_cost=ex_rate(extra_currency[i], $("#c_main_cur select").val(), extra_cost);
    $('#step3 .ex_cost_calc .ex_expense text:first-of-type').eq(i).text(change_extra_cost);
    $('#step3 .ex_cost_calc .revenue text:nth-of-type(2)').eq(i).text(0-parseInt(change_extra_cost));
    sum_extra+=change_extra_cost;
    $('#step3 .ex_cost_0_income .extra_cur').eq(i).text(extra_currency[i]);
    $('#step3 .ex_cost_0_income .extra_p2').eq(i).text(extra_p2[i]);
    $('#step3 .ex_cost_0_income .extra_unit').eq(i).text(extra_unit[i]);

    if(extra_currency[i]!==$("#c_main_cur select").val()){
      $('#step3 .ex_cost_calc .expense').eq(i).removeClass('hide');
    }else{
      $('#step3 .ex_cost_calc .expense').eq(i).addClass('hide');
    }
  }
    var per_revenue=sum_revenue-sum_extra;
    $('#step3 .mid_cost .per_revenue').text(per_revenue);
    $('#step3 .mid_cost .total_revenue').text(parseInt(cost_ins_n[1])*per_revenue);
    if(per_revenue<0){
      $('#step4 #slide-range').attr('min',per_revenue);
      $('#step4 #slide-range-text text:first-of-type').text(per_revenue);
      $('#slide-range').css('background','rgba(224, 32, 32, 0.3)');
      $('#slide-range').addClass('red');
    }else{
      $('#step4 #slide-range').attr('min',0);
      $('#step4 #slide-range-text text:first-of-type').text('0');
      $('#slide-range').css('background','rgba(20, 93, 178, 0.3)');
      $('#slide-range').removeClass('red');
    }
    $('#step4 #slide-range').val(per_revenue);
    mid_cost();

});


//체크에 따라 계산식 적용
function cost_calc(cost_arr, ins_n, bgn_n){
      /**모두 클릭**/
    if((cost_arr.n_check)&&(cost_arr.ins_check)){
      var cost=parseInt(parseInt(cost_arr.actual_p1)*parseInt(cost_arr.p2)/parseInt(bgn_n));
    }else if((!cost_arr.n_check)&&(cost_arr.ins_check)){
      /**강사비용지원만 체크**/
      cost=parseInt(parseInt(cost_arr.actual_p1)*parseInt(cost_arr.p2)*(1+parseInt(ins_n)/parseInt(bgn_n)));
    }else if((cost_arr.n_check)&&(!cost_arr.ins_check)){
      /**공동비용지원 체크**/
      cost=parseInt(parseInt(cost_arr.actual_p1)*parseInt(cost_arr.p2)/(parseInt(ins_n)+parseInt(bgn_n)));
    }
    else{
      /**모두 미 체크시**/
      cost=parseInt(parseInt(cost_arr.actual_p1)*parseInt(cost_arr.p2));
    }
    return parseInt(cost);
}


function cost_calc_(n_check, ins_check, p1, p2, ins_n, bgn_n){
      /**모두 클릭**/
    if((n_check)&&(ins_check)){
      var cost=parseInt(parseInt(p1)*parseInt(p2)/parseInt(bgn_n));
    }else if((!n_check)&&(ins_check)){
      /**강사비용지원만 체크**/
      cost=parseInt(parseInt(p1)*parseInt(p2)*(1+parseInt(ins_n)/parseInt(bgn_n)));
    }else if((n_check)&&(!ins_check)){
      /**공동비용지원 체크**/
      cost=parseInt(parseInt(p1)*parseInt(p2)/(parseInt(ins_n)+parseInt(bgn_n)));
    }
    else{
      /**모두 미 체크시**/
      cost=parseInt(parseInt(p1)*parseInt(p2));
    }
    return parseInt(cost);
}

//환율에 따라 최종 비용 계산
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
  mid_cost();
}





function s3_to_s4(){
  var extra_name=$('#step3 input.ex_cost_name').get().map(function(el) {return el.value});

  var s_table=`<tr id="s4_control_cost_input">
                  <th class="s4_cost_name">
                    <text>수익 조정을 위한 항목</text><br>
                    <input type="text" placeholder="예) 교육비, 예비비" value="`
                    if($('#step4 #s4_control_cost_input input[type="text"]')!==""){
                      s_table+=$('#step4 #s4_control_cost_input input[type="text"]').val();
                    }
      s_table+=`"><br>
          <text class="s4_input_err">항목 이름을 입력하세요.</text></th>
                  <td class="s4_income"><text>0</text>
                  <text>`
                  s_table+=$("#c_main_cur select").val();
                  s_table+=`</text></td>
                  <td class="s4_revenue">
                  <input type="number" id="s4_control_revenue" onchange="s4_input_func(this)" value="`
                  if($('#step4 #s4_control_cost_input input[type="number"]')!==""){
                      s_table+=$('#step4 #s4_control_cost_input input[type="number"]').val();
                    }
                  s_table+=`"><span>`
                  s_table+=$("#c_main_cur select").val();
                  s_table+=`</span></td>
                  </tr>`


  for(i=0;i<cost_arr.length;i++){
    var table=` <tr>
                  <th class="s4_cost_name">`
        table+=cost_arr[i].name;
        table+=`</th><td class="s4_income"><text>`
        table+=$('#step3 .s3_cost_fin').eq(i).text();
        table+=`</text><text>`
        table+=$("#c_main_cur select").val();
        table+=`</text></td><td class="s4_revenue"`
        if(parseInt($('#step3 .s3_calc_revenue').eq(i).text())<0){
          table+=` style="color:#e02020"`
        }
        table+=`><text>`
        table+=$('#step3 .s3_calc_revenue').eq(i).text();
        table+=`</text><text>`
        table+=$("#c_main_cur select").val();
        table+=`</text></td></tr>`

    s_table+=table;
  }

  for(i=0;i<extra_name.length;i++){
    if(extra_name[i]!==""){
      var table=` <tr>
                  <th class="s4_cost_name">`
        table+=extra_name[i];
        table+=`<span class="s4_extra_cost">추가 지출</span>
                </th>
                <td class="s4_income"><text>`
        table+=0;
        table+=`</text><text>`
        table+=$("#c_main_cur select").val();
        table+=`</text></td><td class="s4_revenue" style="color:#e02020"><text>`
        table+=$('#step3 .ex_cost_calc .revenue text:nth-of-type(2)').eq(i).text();
        table+=`</text><text>`
        table+=$("#c_main_cur select").val();
        table+=`</text></td></tr>`

    s_table+=table;
    }
    
  } 

  $('#s4_control_cost tbody').html(s_table);

  $('#step4 #s4_control_cost thead .s4_income text:first-of-type').text($('#step3 .per_cost').text());
  $('#step4 #s4_control_cost thead .s4_income text:last-of-type').text($("#c_main_cur select").val());

    $('#step4 #s4_control_cost thead .s4_revenue text:first-of-type').text($('#step3 .per_revenue').text());

  $('#step4 #s4_control_cost thead .s4_revenue text:last-of-type').text($("#c_main_cur select").val());

window.scrollTo({
    top: 0
});
}
