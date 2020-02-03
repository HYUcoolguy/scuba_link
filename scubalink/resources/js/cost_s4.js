function s4_calc(newVal){
  $('#step4 .s4_check_cost_revenue span').text(newVal+$("#c_main_cur select").val());

  //예상 총 수입
  var expect_income=parseInt(newVal)+parseInt($('#s3_f_cost')[0].innerText);
  $('#step4 #s4_check_cost_income span').text(expect_income+$("#c_main_cur select").val());

  //교육생 1인 비용
  var bgn_n=$('#step1 #cost_member input').get().map(function(el) {return el.value});
  var per_cost=parseInt(parseInt(expect_income)/parseInt(bgn_n[1]));
  $('#step4 .s4_check_cost_fin span').text(per_cost+$("#c_main_cur select").val());
  $('#step4 .mid_cost text').text(per_cost+$("#c_main_cur select").val());

  //조정 비용
  var control_cost=parseInt(per_cost)-parseInt($('#s2_p_total text')[0].innerText);
  var abs_control_cost=Math.abs(control_cost)

  if(control_cost<0){
    $('#control_cost select option:eq(0)').prop("selected",false);
    $('#control_cost select option:eq(1)').prop("selected",true);
    $('.s4_check_cost_control span:last-of-type').text('-'+abs_control_cost)
  }else{
    $('#control_cost select option:eq(0)').prop("selected",true);
    $('#control_cost select option:eq(1)').prop("selected",false);
    $('.s4_check_cost_control span:last-of-type').text('+'+abs_control_cost)
  }


  $('.s4_check_cost_control span:first-of-type').text($("#c_main_cur select").val())
  $('.s4_check_cost_control span:last-of-type').text(control_cost);
  $("#input-Amount").val(abs_control_cost);
}



//slide 조정 시, Step4 값 조정
$('#slide-range').on('input',function () {
  var newVal = $(this).val();
  $('#step4 #expect_cost input').val(newVal);
  s4_calc(newVal);

});

//예상 수익 조정 시, Step4 값 조정
$('#step4 #expect_cost input').on('input',function(){
  var newVal = $(this).val();
  $('#step4 #slide-range').val(newVal);
  s4_calc(newVal);
});


//교육생 1인 비용 조정 시, Step4 값 조정
$('#input-Amount').on('input', function(){
  var newVal=$(this).val();
  $('.s4_check_cost_control span:last-of-type').text(newVal)
  var plus_minus=$('#control_cost select').val();

  //조정 비용
  $('.s4_check_cost_control span:last-of-type').text(plus_minus+newVal)
  $('.s4_check_cost_control span:first-of-type').text($("#c_main_cur select").val())

  //교육생 1인 비용
  if(plus_minus=="+"){
  var per_cost=parseInt($('#s2_p_total text')[0].innerText)+parseInt(newVal);
  }else{
  var per_cost=parseInt($('#s2_p_total text')[0].innerText)-parseInt(newVal);
  }
  $('#step4 .s4_check_cost_fin span').text(per_cost+$("#c_main_cur select").val());
  $('#step4 .mid_cost text').text(per_cost+$("#c_main_cur select").val());
  //예상 총 수입
  var bgn_n=$('#step1 #cost_member input').get().map(function(el) {return el.value});
  var expect_income=parseInt(per_cost)*parseInt(bgn_n[1]);
  $('#step4 #s4_check_cost_income span').text(expect_income+$("#c_main_cur select").val());

  //예상 수익
  var expect_revenue=parseInt(expect_income)-parseInt($('#s3_f_cost')[0].innerText);
  $('#step4 .s4_check_cost_revenue span').text(expect_revenue+$("#c_main_cur select").val());
  $('#step4 #expect_cost input').val(expect_revenue);

});



// function s4_calc(newVal,plus_minus){
//   //조정 비용
//   $('.s4_check_cost_control span:last-of-type').text(plus_minus+newVal)
//   $('.s4_check_cost_control span:first-of-type').text($("#c_main_cur select").val())

//   //교육생 1인 비용
//   if(plus_minus=="+"){
//   var per_cost=parseInt($('#s2_p_total text')[0].innerText)+parseInt(newVal);
//   }else{
//   var per_cost=parseInt($('#s2_p_total text')[0].innerText)-parseInt(newVal);
//   }
//   $('#step4 .s4_check_cost_fin span').text(per_cost+$("#c_main_cur select").val());
//   $('#step4 .mid_cost text').text(per_cost+$("#c_main_cur select").val());
//   //예상 총 수입
//   var bgn_n=$('#step1 #cost_member input').get().map(function(el) {return el.value});
//   var expect_income=parseInt(per_cost)*parseInt(bgn_n[1]);
//   $('#step4 #s4_check_cost_income span').text(expect_income+$("#c_main_cur select").val());

//   //예상 수익
//   var expect_revenue=parseInt(expect_income)-parseInt($('#s3_f_cost')[0].innerText);
//   $('#step4 .s4_check_cost_revenue span').text(expect_revenue+$("#c_main_cur select").val());
//   $('#step4 #expect_cost input').val(expect_revenue);
// }




// //slide 조정 시, Step4 값 조정
// $('#slide-range').on('input',function () {
//   var newVal = $(this).val();
//   $("#input-Amount").val(newVal);
//   var plus_minus=$('#control_cost select').val();
//   s4_calc(newVal,plus_minus);

// });


// //교육생 1인 비용 조정 시, Step4 값 조정
// $('#input-Amount').on('input', function(){
//   //console.log($(this).val())
//   var newVal=$(this).val();
//   $('#slide-range').val(newVal)
//   $('.s4_check_cost_control span:last-of-type').text(newVal)
//   var plus_minus=$('#control_cost select').val();
//   s4_calc(newVal,plus_minus);

// });

// //예상 수익 조정 시, 1인 비용 조정
// $('#step4 #expect_cost input').on('input',function(){
//   var newVal=$(this).val();
//   //예상 수익
//   $('#step4 .s4_check_cost_revenue span').text(newVal+$("#c_main_cur select").val());

//   //예상 총 수입
//   var expect_income=parseInt(newVal)+parseInt($('#s3_f_cost')[0].innerText);
//   $('#step4 #s4_check_cost_income span').text(expect_income+$("#c_main_cur select").val());

//   //교육생 1인 비용
//   var bgn_n=$('#step1 #cost_member input').get().map(function(el) {return el.value});
//   var per_cost=parseInt(parseInt(expect_income)/parseInt(bgn_n[1]));
//   $('#step4 .s4_check_cost_fin span').text(per_cost+$("#c_main_cur select").val());
//    $('#step4 .mid_cost text').text(per_cost+$("#c_main_cur select").val());
//   //조정 비용
//   var control_cost=parseInt(per_cost)-parseInt($('#s2_p_total text')[0].innerText);
//   var abs_control_cost=Math.abs(control_cost)

//   if(control_cost<0){
//     $('#control_cost select option:eq(0)').prop("selected",false);
//     $('#control_cost select option:eq(1)').prop("selected",true);
//     $('.s4_check_cost_control span:last-of-type').text('-'+abs_control_cost)
//   }else{
//     $('#control_cost select option:eq(0)').prop("selected",true);
//     $('#control_cost select option:eq(1)').prop("selected",false);
//     $('.s4_check_cost_control span:last-of-type').text('+'+abs_control_cost)
//   }

  
//   $('.s4_check_cost_control span:first-of-type').text($("#c_main_cur select").val())

//   $('#slide-range').val(control_cost);
//   $('.s4_check_cost_control span:last-of-type').text(control_cost);
//   $("#input-Amount").val(abs_control_cost);

  
// })


//slide, CSS
$('input[type=range]').on('input', function(){
    var val = $(this).val()/5000;
    $(this).css('background', 'linear-gradient(to right, #145db2 0%, #145db2 '+ val +'%, rgba(20,93,178,0.3) ' + val + '%, rgba(20,93,178,0.3) 100%)');
  });

//조정 비용 이름
$('#step4 input[type=text]').on('input',function(){
  var cost_name=$(this).val();
  $('.s4_check_cost_control text').text(cost_name);
  if(cost_name==""){
    $('.s4_check_cost_control').css("color","#cccccc");
    $('.s4_check_cost_control text').css("color","#cccccc");
  }
  else{
    $('.s4_check_cost_control').css("color","#145db2");
    $('.s4_check_cost_control text').css("color","#145db2");
  }
})


function s4_to_s5(){
	var per_cost='';

	for(i=0;i<cost_arr.length;i++){
		var text=`<div class="s5_check_cost_arr"><text>`
		text+=cost_arr[i].name;
		text+=`</text><span>`
    text+=$('#s2_p_sum text:odd').eq(i).text();
		text+=`</span></div>`

		per_cost+=text;
	}
	$('#s5_check_cost_div').html(per_cost);


  if(($('#step4 input[type=text]').val()=="")&&($('#step4 #input-Amount').val()=="0")){
    $('.s5_check_cost_control').addClass('hide')
  }else{
    $('.s5_check_cost_control').removeClass('hide')
  }

	$('.s5_check_cost_control text').text($('.s4_check_cost_control text').text())
	$('.s5_check_cost_control span').text($('.s4_check_cost_control span').eq(1).text()+$('.s4_check_cost_control span').eq(0).text())
	$('.s5_check_cost_fin span').text($('.s4_check_cost_fin span').text());

	$('#s5_check_cost_income span').text($('#s4_check_cost_income span').text());
	$('#s5_check_cost_expense span').text($('#s4_check_cost_expense span').text());
	$('#s5_check_cost_revenue span').text($('.s4_check_cost_revenue span').text());
  $('#step5 .mid_cost text').text($('#step4 .mid_cost text').text());
};