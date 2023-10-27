//템플릿이라는 메소드안에 함수 오브젝트가 존재

module.exports = {
    HTML:function(name, list, body, control){
        return `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>${name}</title>
    </head>
    <body style="background-color:Aliceblue">
        <h1><a href="/">4세대 여돌 소개 페이지</a></h1>
        <!-- 메뉴 부분-->
        ${list}
        ${control}
        ${body}
    </body>
    </html>
    `
    }, list:function(files){
        let list = '<ol>'
        // 데이터 개수만큼 리스트 생성
        for(i=0;i<files.length;i++){
            list = list + `<li><a href="?name=${files[i]}">${files[i]}</a></li>`
        }
    list = list + '</ol>'
    return list
    }, create:function(){
        return `<form action="/create_process" method="post">
        <p><input type="text" name="title" placeholder="title"></p>
        <p><textarea name="description" placeholder="description"></textarea></p>
        <p><button type="submit">보내기</button></p>
        </form>
    `
    }, update:function(name, content){
        return `<form action="/update_process" method="post">
        <p><input type="hidden" name="id" value="${name}"></p>
        <p><input type="text" name="title" placeholder="title" value="${name}"></p>
        <p><textarea name="description" placeholder="description">${content}</textarea></p>
        <p><button type="submit">보내기</button></p>
        </form>
        `
    }
}