import { post } from './const'

export function logApi(params) {
  return post(window.localStorage.getItem('ipAddr') + ':8083/master/api', params)
}

export function masterApi(params, token) {
  return post(window.localStorage.getItem('ipAddr') + ':8083/master/api', params, token)
}

export function uploadImg(fd) {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST",window.localStorage.getItem('ipAddr') + ':8084/resources/api',true);
    xmlhttp.setRequestHeader("token", window.localStorage.getItem('tokenPlate'));

    xmlhttp.send(fd);
}

export const uploadFactory = function(imgId) {
    var state = {
        uploading: false
    }
    return {
        state: state,
        callback: function(field_name, url, type, win) {
            if(type=='image') {
                $('#' + field_name).attr('placeholder', '上传中...')
                var $img = $('#' + imgId)
                if (state.uploading) {
                    alert('请等待现有一张图片上传')
                    return
                }
                $img.click()
                $img.unbind('change')
                $img.on('change', function(e){
                    var file = e.target.files[0]
                    var formData = new FormData()
                    state.uploading = true
                    formData.append('pictureUrl', file)
                    Promise.resolve($.ajax({
                        url: '/picture/uploadArticle.do',
                        data: formData,
                        type: "POST",
                        processData: false,
                        contentType: false,
                        cache: false
                    })).then(function(res){
                        console.log(res)
                        // res = JSON.parse(res)
                        $('#' + field_name).val(res.data)
                        $('#' + field_name).attr('placeholder', '')
                       state.uploading = false
                    })
                })
            }
        } 
    }
}

