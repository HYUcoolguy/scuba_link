

$(document).on("change","#step2 input",function(){
  var cost_ins_n=$('#step1 #cost_member input').get().map(function(el) {return el.value});
  var cost_p1=$('#step2 .cost_p1 input').get().map(function(el) {return el.value});
  var cost_p2=$('#step2 .cost_p2 input').get().map(function(el) {return el.value});
  var cost_cur=$('#step2 .cost_p1 select').get().map(function(el) {return el.value});
  var cost_unit=$('#step2 .cost_p2 select').get().map(function(el) {return el.value});
  var cost_name = $('#step2 .cost_name').get().map(function(el) { return el.value });
  var cost_n=$('#step2 .cost_n .cost_checkbox_container').children('input').get().map(function(el) { return el.checked });
  var cost_ins=$('#step2 .cost_ins .cost_checkbox_container').children('input').get().map(function(el) { return el.checked });
  var cost_foc_=$('#step2 .input_cost .label').get().map(function(el) {return el.classList.length});
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

      actual_check:s3_actual_check[i]

    })
  }


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
    
      cost=parseInt(parseInt(cost_arr[i].p1)*parseInt(cost_arr[i].p2)/(parseInt(cost_ins_n[0])+parseInt(cost_ins_n[1])));
      

    }else if((!cost_n[i])&&(cost_ins[i])){
      /**강사비용지원만 체크**/
      c_check_1.eq(i).removeClass('hide');
      c_check_2.eq(i).addClass('hide');
      c_check_3.eq(i).addClass('hide');

      check_1.removeClass('hide');
      check_2.addClass('hide');
      check_3.addClass('hide');
      cost=parseInt(parseInt(cost_arr[i].p1)*parseInt(cost_arr[i].p2)/parseInt(cost_ins_n[1]));
    }else if((cost_n[i])&&(!cost_ins[i])){
      /**공동비용지원 체크**/
      c_check_1.eq(i).addClass('hide');
      c_check_2.eq(i).removeClass('hide');
      c_check_3.eq(i).addClass('hide');


      check_1.addClass('hide');
      check_2.removeClass('hide');
      check_3.addClass('hide');
      cost=parseInt(parseInt(cost_arr[i].p1)*parseInt(cost_arr[i].p2)/parseInt(cost_ins_n[1])*(parseInt(cost_ins_n[1])+1));
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
    $('#step2 #s2_p_cal .ex_per_cost').eq(i).text(cost);
    
  }





//교육생 1인 비용(합계)
$('#s2_p_name text:first-child').text(cost_arr[0].name);
  var c_name='';
  var c_per_cost='';
  var c_p_sum=0;

  for(i=0;i<cost_arr.length;i++){
    c_name+=`<text> + </text><text>`;
    c_name+=cost_arr[i].name;
    c_name+=`</text>`;

    c_per_cost+=`<text> + </text><text class="ex_per_cost">`;
    c_per_cost+=document.getElementsByClassName("cost2")[i].innerText;
    c_per_cost+=`</text><text>`;
    c_per_cost+=cost_arr[i].currency;
    c_per_cost+=`</text>`

    c_p_sum+=parseInt(document.getElementsByClassName("cost2")[i].innerText);
}



//환율 계산 : 각 통화끼리 합산 후, 환율 조정
  var c_krw=0;
  var c_usd=0;
  var c_jpy=0;
  var c_php=0;
  var c_eur=0;



//같은 통화끼리 합산
  for(i=0;i<cost_arr.length;i++){
    switch(cost_arr[i].currency){
      case("원") :
      c_krw+=parseInt(document.getElementsByClassName("cost2")[i].innerText);
      break;
      case("달러") :
      c_usd+=parseInt(document.getElementsByClassName("cost2")[i].innerText);
      break;
      case("엔") :
      c_jpy+=parseInt(document.getElementsByClassName("cost2")[i].innerText);
      break;
      case("페소") :
      c_php+=parseInt(document.getElementsByClassName("cost2")[i].innerText);
      break;
      case("유로") :
      c_eur+=parseInt(document.getElementsByClassName("cost2")[i].innerText);
      break;
    }
  }

  
    
    //합산된 통화 화면에 표시
    var text='= ';  
    if(c_krw!=0){
      text+=c_krw;
      text+='원';
    }
    if(c_usd!=0){
      text+=` + `;
      text+=c_usd;
      text+='달러'
    }
    if(c_jpy!=0){
      text+=` + `;
      text+=c_jpy;
      text+="엔"
    }
    if(c_php!=0){
      text+=` + `;
      text+=c_php;
      text+='페소';
    }
    if(c_eur!=0){
      text+=` + `;
      text+=c_eur;
      text+='유로'
    }


    $("#step2 #s2_p_sum").html(text);


  $('#check_currency .custom input').eq(0).val()
    c_usd*=parseInt($('#check_currency .custom input').eq(0).val()) || 0;
    c_jpy*=parseInt($('#check_currency .custom input').eq(1).val())/100  || 0;
    c_php*=parseInt($('#check_currency .custom input').eq(2).val())  || 0;
    c_eur*=parseInt($('#check_currency .custom input').eq(3).val())  || 0;

    t_cost=parseInt(c_krw)+parseInt(c_usd)+parseInt(c_jpy)+parseInt(c_php)+parseInt(c_eur);
  //최종에 기본 통화로 계산/표시
  var currency=$("#c_main_cur select").val();
  switch(currency){
    case("원"):
      t_cost=parseInt(t_cost);
      break;
    case("달러"):
      t_cost=parseInt(parseInt(t_cost)/parseInt($('#check_currency .custom input').eq(0).val()));
      break;
    case("엔"):
      t_cost=parseInt(parseInt(t_cost)/parseInt($('#check_currency .custom input').eq(1).val())*100);
      break;
    case("페소"):
      t_cost=parseInt(parseInt(t_cost)/parseInt($('#check_currency .custom input').eq(2).val()));
    case("유로"):
      t_cost=parseInt(parseInt(t_cost)/parseInt($('#check_currency .custom input').eq(3).val()));
      break;
  }

$("#step2 #s2_p_total text").eq(0).html(t_cost);
$("#step2 #s2_p_total text").eq(1).html(currency);


$("#step2 .mid_cost text").text(t_cost+currency);







//교육생 1인 비용 : 비용 이름
$('#s2_p_name').html(c_name);
$('#s2_p_name text:first-child').html('= ');
//교육생 1인 비용 : 비용 나열
$('#s2_p_cal').html(c_per_cost)
$('#s2_p_cal text:first-child').html('= ');


$('#step2 #p_cost').html(t_cost); //예상 총 수입 : 교육생 1인 비용
$('#step2 .t_cur').html(currency);//예상 총 수입 : 기본 통화
$('#step3 .t_cur').html(currency);//예상 총 수입 : 기본 통화(Step3)
$('#step2 #total_c text').eq(1).html(currency);
var bgn_n=$('#step1 #cost_member input').get().map(function(el) {return el.value});
  $('#step2 .bgn_n').text(cost_ins_n[1]);
  $('#step3 .bgn_n').text(cost_ins_n[1]);
  $('#step2 .ins_n').text(cost_ins_n[0]);
var total_cost=parseInt(t_cost)*parseInt(bgn_n[1]);

$('#step2 #total_c text:first-child').html(total_cost);








// //계산식 변경 : 공동 비용, 강사 포함 비용 
//   var cost_n=$('.cost_n input').get().map(function(el) { return el.checked});
//   var cost_ins=$('.cost_ins input').get().map(function(el) {return el.checked});
//   var c_check_1=$('.ex_cost .collapse .check1');
//   var c_check_2=$('.ex_cost .collapse .check2');
//   var c_check_3=$('.ex_cost .collapse .check3');
//   var e="#ex_cost_"
//   var cost_ins_n=$('#step1 #cost_member input').get().map(function(el) {return el.value});
  
//   for(i=0;i<=cost_n.length;i++){

//     var check_1=$(e+(i+1)+' .check_1');
//     var check_2=$(e+(i+1)+' .check_2');
//     var check_3=$(e+(i+1)+' .check_3');
//     var cost=''
//     /**모두 클릭**/
//     if((cost_n[i])&&(cost_ins[i])){
//       c_check_1.eq(i).addClass('hide');
//       c_check_2.eq(i).addClass('hide');
//       c_check_3.eq(i).removeClass('hide');

//       check_1.addClass('hide');
//       check_2.addClass('hide');
//       check_3.removeClass('hide');
    
//       cost=parseInt(parseInt(cost_arr[i].p1)*parseInt(cost_arr[i].p2)/(parseInt(cost_ins_n[0])+parseInt(cost_ins_n[1])));
      

//     }else if((!cost_n[i])&&(cost_ins[i])){
//       /**강사비용지원만 체크**/
//       c_check_1.eq(i).removeClass('hide');
//       c_check_2.eq(i).addClass('hide');
//       c_check_3.eq(i).addClass('hide');

//       check_1.removeClass('hide');
//       check_2.addClass('hide');
//       check_3.addClass('hide');
//        cost=parseInt(parseInt(cost_arr[i].p1)*parseInt(cost_arr[i].p2)/parseInt(cost_ins_n[1]));
//     }else if((cost_n[i])&&(!cost_ins[i])){
//       /**공동비용지원 체크**/
//       c_check_1.eq(i).addClass('hide');
//       c_check_2.eq(i).removeClass('hide');
//       c_check_3.eq(i).addClass('hide');


//       check_1.addClass('hide');
//       check_2.removeClass('hide');
//       check_3.addClass('hide');
//       cost=parseInt(parseInt(cost_arr[i].p1)*parseInt(cost_arr[i].p2)/parseInt(cost_ins_n[1])*(parseInt(cost_ins_n[1])+1));
//     }

//     else{
//       /**모두 미 체크시**/
//       c_check_1.eq(i).addClass('hide');
//       c_check_2.eq(i).addClass('hide');
//       c_check_3.eq(i).addClass('hide');

//       check_1.addClass('hide');
//       check_2.addClass('hide');
//       check_3.addClass('hide');
//       cost=parseInt(parseInt(cost_arr[i].p1)*parseInt(cost_arr[i].p2));
//     }


//     $('#step2 .cost').eq(i).text(cost);
//     $('#step2 .cost2').eq(i).text(cost);
//     $('#step2 #s2_p_cal .ex_per_cost').eq(i).text(cost);
//     cost_arr[i].per_cost=cost;
//   }
});



// //계산식 변경 : 공동 비용, 강사 포함 비용 
// $(document).on("change","#step2 input",function(){
//   var cost_n=$('.cost_n input').get().map(function(el) { return el.checked});
//   var cost_ins=$('.cost_ins input').get().map(function(el) {return el.checked});
//   var c_check_1=$('.ex_cost .collapse .check1');
//   var c_check_2=$('.ex_cost .collapse .check2');
//   var c_check_3=$('.ex_cost .collapse .check3');
//   var e="#ex_cost_"
//   var cost_ins_n=$('#step1 #cost_member input').get().map(function(el) {return el.value});
  
//   for(i=0;i<=cost_n.length;i++){

//     var check_1=$(e+(i+1)+' .check_1');
//     var check_2=$(e+(i+1)+' .check_2');
//     var check_3=$(e+(i+1)+' .check_3');
//     var cost=''
//     /**모두 클릭**/
//     if((cost_n[i])&&(cost_ins[i])){
//       c_check_1.eq(i).addClass('hide');
//       c_check_2.eq(i).addClass('hide');
//       c_check_3.eq(i).removeClass('hide');

//       check_1.addClass('hide');
//       check_2.addClass('hide');
//       check_3.removeClass('hide');
    
//       cost=parseInt(parseInt(cost_arr[i].p1)*parseInt(cost_arr[i].p2)/(parseInt(cost_ins_n[0])+parseInt(cost_ins_n[1])));
      

//     }else if((!cost_n[i])&&(cost_ins[i])){
//       /**강사비용지원만 체크**/
//       c_check_1.eq(i).removeClass('hide');
//       c_check_2.eq(i).addClass('hide');
//       c_check_3.eq(i).addClass('hide');

//       check_1.removeClass('hide');
//       check_2.addClass('hide');
//       check_3.addClass('hide');
//        cost=parseInt(parseInt(cost_arr[i].p1)*parseInt(cost_arr[i].p2)/parseInt(cost_ins_n[1]));
//     }else if((cost_n[i])&&(!cost_ins[i])){
//       /**공동비용지원 체크**/
//       c_check_1.eq(i).addClass('hide');
//       c_check_2.eq(i).removeClass('hide');
//       c_check_3.eq(i).addClass('hide');


//       check_1.addClass('hide');
//       check_2.removeClass('hide');
//       check_3.addClass('hide');
//       cost=parseInt(parseInt(cost_arr[i].p1)*parseInt(cost_arr[i].p2)/parseInt(cost_ins_n[1])*(parseInt(cost_ins_n[1])+1));
//     }

//     else{
//       /**모두 미 체크시**/
//       c_check_1.eq(i).addClass('hide');
//       c_check_2.eq(i).addClass('hide');
//       c_check_3.eq(i).addClass('hide');

//       check_1.addClass('hide');
//       check_2.addClass('hide');
//       check_3.addClass('hide');
//       cost=parseInt(parseInt(cost_arr[i].p1)*parseInt(cost_arr[i].p2));
//     }


//     $('#step2 .cost').eq(i).text(cost);
//     $('#step2 .cost2').eq(i).text(cost);
//     $('#step2 #s2_p_cal .ex_per_cost').eq(i).text(cost);
//     cost_arr[i].per_cost=cost;
//   }

// })


//Step2 -> Step3 
function s2_to_s3(){
  var s2_input = $('#step2 .cost_name').get().map(function(el) { return el.value });
  var cost_ins="";
  

  //강사 할인 비용
  for(i=0;i<s2_input.length;i++){
  var li="";
  var actual_cost_box='';
  li+=`<li>
            <label class="cost_checkbox_container">`
  li+=s2_input[i];
  li+=`<input type="checkbox"`
  if(cost_arr[i].actual_check){
    li+=` checked`
  }
  li+=`><span class="cost_checkmark"></span>
            </label>
            
            <div class="custom">
              <div>
              <text>`
  li+=cost_arr[i].p1;
  li+=`</text>
              <text>`
              li+=cost_arr[i].currency;
              li+=`</text>
              <text> x </text>
              <text>`
              li+=cost_arr[i].p2;
              li+=`</text>
              <text>`
              li+=cost_arr[i].unit;
              li+=`</text>
              <text> | </text>
              <text>1인 비용 : </text>
              <text>`
              li+=document.getElementsByClassName("cost2")[i].innerText;
              li+=cost_arr[i].currency;
              li+=`</text>

            </div>
           <div class="cost_ins_check">`


  if(cost_arr[i].check=="true"){
  actual_cost_box+=`<div class="actual_box"><span class="label label-default hide">FOC 미적용</span>
       <span class="label">FOC 적용</span>`
  }else{
  actual_cost_box+=`<div class="actual_box"><span class="label label-default">FOC 미적용</span>
       <span class="label hide">FOC 적용</span>`}

  if(cost_arr[i].n_check){
  actual_cost_box+=`<span class="label label-default hide">개인 비용</span>
        <span class="label">공동 비용</span>`
  }else{
  actual_cost_box+=`<span class="label label-default">개인 비용</span>
        <span class="label hide">공동 비용</span>`}

  if(cost_arr[i].ins_check){
  actual_cost_box+=`<span class="label label-default hide">강사비용 미포함</span>
       <span class="label">강사비용 포함</span></div>`
  }else{
  actual_cost_box+=`<span class="label label-default">강사비용 미포함</span>
       <span class="label hide">강사비용 포함</span></div>`
     }
  li+=actual_cost_box;
  li+=`</div>`
 
  cost_ins = cost_ins + li;

}
  $('#cost_ins ul').html(cost_ins);
  for(i=0;i<s2_input.length;i++){
    $('#step3 #cost_no_s .actual_box').eq(i).html(actual_cost_box);
  }

  for(i=0;i<cost_arr.length;i++)
    cost_arr[i].per_cost=$('#step2 .cost2').eq(i).text();
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
                <i class="glyphicon glyphicon-pencil"></i>
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
        FOC_list+="<input type='checkbox'"
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
  }
