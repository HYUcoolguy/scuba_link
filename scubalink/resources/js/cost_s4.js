
//slide 조정 시, Step4 값 조정
$('#slide-range').on('input',function () {
  var newVal = $(this).val();
  s4_calc(newVal);
  $('#step4 #s4_control_cost_input .s4_revenue input').val(newVal);
  mid_cost();
});

//Step4 값 조정 시, slide 조정
function s4_input_func(){
  var newVal=$('#s4_control_revenue').val();
  console.log(newVal);
  s4_calc(newVal);
  $('#slide-range').val(newVal);
  mid_cost();
}


//수익 - 일 경우, 빨간색 표시
function s4_calc(newVal){
  if(newVal<0){
    $('#s4_control_cost_input .s4_income text:first-of-type').text('0');
    $('#s4_control_cost_input .s4_revenue input').css('color','#e02020');
    $('#s4_control_cost_input .s4_revenue span').css('color','#e02020');
    $('#slide-range').css('background','rgba(224, 32, 32, 0.3)');
    $('#slide-range').addClass('red');
  }else{
    $('#s4_control_cost_input .s4_income text:first-of-type').text(newVal);
    $('#s4_control_cost_input .s4_revenue input').css('color','#145db2');
    $('#s4_control_cost_input .s4_revenue span').css('color','#145db2');
    $('#slide-range').css('background','rgba(20, 93, 178, 0.3)');
    $('#slide-range').removeClass('red');
  }

  }







function s4_to_s5(){

var ul='';
var cost_ins_n=$('#step1 #cost_member input').get().map(function(el) {return el.value})

//수익 조정
var control_name=$('#s4_control_cost_input .s4_cost_name input').val();
var control_revenue=$('#s4_control_revenue').val();
if(control_name!==''&&control_revenue!==''){
  ul=s5_cost_arr("false",false,false,
                  control_name, control_revenue, 1, $("#c_main_cur select").val(), '회',
                  control_revenue, $("#c_main_cur select").val(), cost_ins_n[0], cost_ins_n[1], false)
}

//비용 항목
var real_cost=$('#step3 .s3_cost_expense input').get().map(function(el) {return el.value});

for(i=0;i<cost_arr.length;i++){
  var cost_arr_li=s5_cost_arr(cost_arr[i].check, cost_arr[i].n_check, cost_arr[i].ins_check,
                  cost_arr[i].name, cost_arr[i].p1, cost_arr[i].p2, cost_arr[i].currency, cost_arr[i].unit,
                  real_cost[i], $("#c_main_cur select").val(), cost_ins_n[0], cost_ins_n[1], false)
  ul+=cost_arr_li;
}
//추가 지출
var extra_name=$('#step3 input.ex_cost_name').get().map(function(el) {return el.value});
var extra_p1=$('#step3 .ex_cost_p1 input').get().map(function(el) {return el.value});
var extra_p2=$('#step3 .ex_cost_p2 input').get().map(function(el) {return el.value});
var extra_currency=$('#step3 .ex_cost_p1 select').get().map(function(el) {return el.value});
var extra_unit=$('#step3 .ex_cost_p2 select').get().map(function(el) {return el.value});

for(i=0;i<extra_name.length;i++){
    var extra_arr_li=s5_cost_arr("false", true, true,
                      extra_name[i], 0, extra_p2[i], extra_currency[i], extra_unit[i],
                      extra_p1[i], $("#c_main_cur select").val(), cost_ins_n[0], cost_ins_n[1], true)
    ul+=extra_arr_li;
  }

$('#s5_cost_arr ul').html(ul);

  window.scrollTo({
    top: 0
});
};





function s5_cost_arr(FOC_check,n_check,ins_check,
                    c_name,p1,p2,currency,unit,
                    real_p1, main_currency, ins_n, bgn_n, extra_check){
  var li=`<li>
            <div>`
       if(FOC_check=="true"){
          li+=`<span class="s5_FOC_y">FOC 적용</span>` 
       }else{
          li+=`<span class="s5_FOC_n">FOC 미적용</span>`
       }

       if(n_check){
        li+=`<span class="s5_n_y">공동 비용</span>`
       }else{
        li+=`<span class="s5_n_n">개인 비용</span>`
       }

       if(ins_check){
        li+=`<span class="s5_ins_y">강사비용 포함</span>`}
        else{
          li+=`<span class="s5_ins_n">강사비용 미포함</span>`
        }
        li+=`</div>

        <div class="s5_cost_name">`
        li+=c_name
        if(extra_check){
          li+=`<span class="s5_extra_cost">추가 지출</span>`
        }
        li+=`</div>
        <!--수입-->
        <div class="s5_cost_income">
          <span>
            <text>수입</text>
            <text class="s5_cost_p1">`
            li+=p1
            li+=`</text>
            <text class="s5_cost_currency">`
            li+=currency
            li+=`</text>
            <text>x</text>
            <text class="s5_cost_p2">`
            li+=p2
            li+=`</text>
            <text class="s5_cost_unit">`
            li+=unit
            li+=`</text>
          </span>

          <span class="s5_calc_income">
            <span class="ex_calc`
            if(currency==main_currency){
              li+=` hide">`
            }else{
              li+=`">`
            }
            
              li+=`<text class="cost3">`
              li+=cost_calc_(n_check, ins_check, p1, p2, ins_n, bgn_n)
              li+=`</text>
              <text class="s5_cost_currency_">`
              li+=currency
              li+=`</text>
              <text> = </text>
            </span>
            <span>
              <text class="s5_cost_fin">`
              li+=ex_rate(currency, main_currency, cost_calc_(n_check, ins_check, p1, p2, ins_n, bgn_n))
              li+=`</text>
              <text class="main_currency">`
              li+=main_currency
              li+=`</text>
            </span>
        </div>


        <!--지출-->
        <div class="s5_cost_expense">
          <span>
            <text>지출</text>
            <text class="s5_cost_p1">`
            li+=real_p1
            li+=`</text>
            <text class="s5_cost_currency">`
            li+=currency
            li+=`</text>
            <text>x</text>
            <text class="s5_cost_p2">`
            li+=p2
            li+=`</text>
            <text class="s5_cost_unit">`
            li+=unit
            li+=`</text>
          </span>

          <span class="s5_calc_expense">
            <span class="ex_calc`
            if(currency==main_currency){
              li+=` hide">`
            }else{
              li+=`">`
            }
             li+=`<text class="cost3_expense">`
             li+=cost_calc_(n_check, ins_check, real_p1, p2, ins_n, bgn_n)
             li+=`</text>
              <text class="s5_cost_currency_">`
              li+=currency
              li+=`</text>
              <text> = </text>
            </span>
            <span>
              <text class="s5_cost_fin_expense">`
              li+=ex_rate(currency, main_currency, cost_calc_(n_check, ins_check, real_p1, p2, ins_n, bgn_n))
              li+=`</text>
              <text class="main_currency">`
              li+=main_currency
              li+=`</text>
            </span>
          </span>
        </div>


        <!--수익-->
        <div class="s5_cost_revenue"`
        if(extra_check||parseInt(ex_rate(currency, main_currency, cost_calc_(n_check, ins_check, p1, p2, ins_n, bgn_n)))-parseInt(ex_rate(currency, main_currency, cost_calc_(n_check, ins_check, real_p1, p2, ins_n, bgn_n)))<0){
          li+=` style='color:#e02020'>`}
          else{
            li+=`>`}
          li+=`수익: 
          <text class="s5_calc_revenue">`
          li+=parseInt(ex_rate(currency, main_currency, cost_calc_(n_check, ins_check, p1, p2, ins_n, bgn_n)))-parseInt(ex_rate(currency, main_currency, cost_calc_(n_check, ins_check, real_p1, p2, ins_n, bgn_n)))
          li+=`</text>
          <text class="main_currency">`
          li+=main_currency
          li+=`</text>
        </div>
      </li>`

      return li;
}



