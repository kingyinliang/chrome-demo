

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
    // function DataStatistics(){
    //     external.nativeCall("SLDataReport",[{category: "SlipWord",action:"SLB_W0001",label:"Slip",catever:"1.0.0",url:request}]);
    // }
    // DataStatistics();
    console.log(request.textstr);
    var query_leovosmart = {  //划词传参
        "event": {
            "header": {
                "namespace": "Search",
                "name": "OneStepSearch",
                "messageId": "OneStepSearch_msg_01",
                "dialogRequestId": "OneStepSearch_01"
            },
            "payload": {
                "query": {
                    "format": "plainText",
                    "content": request.textstr
                }
            }
        },
        "context": ""
    };

    var query_leovosmartjson = JSON.stringify(query_leovosmart);
    var returndata =[];
    $.ajax({  
        type: 'post',
        url: 'https://pvtcui.lenovo.com.cn:8443/api/search/v1.0/',
        data: query_leovosmartjson,
        dataType: "json",
        async: false,
        contentType : "application/json",
        success: function (result) {
                // console.log(result.directive.payload.content.result_list);
                returndata = result.directive.payload.content.result_list;
                console.log(returndata);
                
            }
    })
        sendResponse(returndata);
    
});