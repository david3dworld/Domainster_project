$(document).ready(function() {
    //for checking the ipv4 format using regular expression (match function is used for this)
    var ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    $('input[name="ipAddress"]').keyup(function(){
        var value=$(this).val().trim()
        if(value.match(ipformat)){
        this.setCustomValidity('');
            $(".errorIp").addClass("hidden");
        }else{
            this.setCustomValidity('IP address is invalid');
            $(".errorIp").removeClass("hidden");
            $(".errorIp").addClass("error active");
            $(".errorIp").text("IP is invalid")
        }
    });  

    $("button").click(function(){
        $(".errorList").addClass("hidden");
        if($('input[name="ipAddress"]').val()==="" || $('input[name="owner"]').val()==="" || $('input[name="acquired"]').val()==="" || !$(".errorIp").hasClass("hidden") ){
            console.log("CANNOT");
            $(".errorList").removeClass("hidden");
            $(".errorList").addClass("error active");
            $(".errorList").text("Enter the required Field")
            
        }else{
            var data={}
            $("button").attr("disabled","disabled");
            data["owner"] = $("input[name='owner']").val();
            data["acquired"] = $("input[name='acquired']").val();
            data["ipAddress"] = $("input[name='ipAddress']").val();
            data["secret"]="vIIiqhUVN04";
            data["request"]="update.domain";
            data["domain"]= 'sus.com'; //$("input[name='domain']").val();
            var radioValue = $("input[type='radio']:checked");
            const values = Object.values(radioValue)
            for (value in values){
                if(values[value].name && values[value].value==="Y"){
                    data[values[value].name]=values[value].value;
                }
            }
            const postURL="https://www.domainster.com/com"
            var xhr = new XMLHttpRequest();
            xhr.onload = () => {
                // print JSON response
                if (xhr.status >= 200 && xhr.status < 300) {
                    // parse JSON
                    const response = JSON.parse(xhr.responseText);
                    console.log(response);
                         $("button").attr("disabled",false);

                }
            };
            xhr.open('POST',postURL);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(data));
            console.log(JSON.stringify(data))
            // listen for `load` event            
        } 
    });

});

 