
//강사 할인 비용(체크) 입력 시, 실지출 div 생성
$(document).on("change","#step3 #cost_ins input",function(){
var actual_check=$('#step3 #cost_ins .cost_checkbox_container').children('input').get().map(function(el) { return el.checked })
var cost_no_s='';
var s3='#s3_cost_';
console.log(actual_check);
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

          <div class="accordion-toggle" data-toggle="collapse" data-target="#s3_cost_`
          div+=i;
          div+=`">1인 실지출 = <text class="p_real_cost">`
          div+=cost_arr[i].per_cost;
          div+=`</text>`
          div+=cost_arr[i].currency;
          div+=`
            <text class="cost2"></text>
            <text class="currency2"></text>
            <i><img src="../resources/img/ic-arrow-ltr.svg" class="arrow-bottom"></i>
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
})




//Step3, 실지출 비용 입력 시 값 조정
$(document).on("change","#step3 #cost_no_s_list input",function(){
var cost_ins_n=$('#step1 #cost_member input').get().map(function(el) {return el.value});
  var real_cost=$('#step3 #cost_no_s_list input').get().map(function(el) {return el.value});

  for(i=0;i<cost_arr.length;i++){
    $("#step3 #cost_no_s_list input").eq(i).closest('.input_cost').siblings('div.ex_cost').find('.p1').text(real_cost[i]);
    var cost=0;

 /**모두 클릭**/
    if((cost_arr[i].n_check)&&(cost_arr[i].ins_check)){
      cost=parseInt(parseInt(real_cost[i])*parseInt(cost_arr[i].p2)/(parseInt(cost_ins_n[0])+parseInt(cost_ins_n[1])));
    }else if((!cost_arr[i].n_check)&&(cost_arr[i].ins_check)){
      /**강사비용지원만 체크**/;
       cost=parseInt(parseInt(real_cost[i])*parseInt(cost_arr[i].p2)/parseInt(cost_ins_n[1]));
    }else if((cost_arr[i].n_check)&&(!cost_arr[i].ins_check)){
      /**공동비용지원 체크**/
      cost=parseInt(parseInt(real_cost[i])*parseInt(cost_arr[i].p2)/parseInt(cost_ins_n[1])*(parseInt(cost_ins_n[1])+1));
    }
    else{
      /**모두 미 체크시**/
      cost=parseInt(parseInt(real_cost[i])*parseInt(cost_arr[i].p2));
    }
    $("#step3 #cost_no_s_list input").eq(i).closest('.input_cost').siblings('div.ex_cost').find('.cost').text(cost);
    $("#step3 #cost_no_s_list input").eq(i).closest('.input_cost').siblings('div.ex_cost').find('.p_real_cost').text(cost);

}
})


/** Step 3 - 비용 추가/삭제 **/
function add_div_s3(){
  var div = document.createElement('div');
  div.innerHTML = document.getElementById('c_extra_first').innerHTML;
  document.getElementById('c_extra_sibling').appendChild(div);
}

function remove_div_s3(obj){
  document.getElementById('c_extra_sibling').removeChild(obj.parentNode.parentNode.parentNode);
}

