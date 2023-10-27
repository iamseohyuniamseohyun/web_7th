const express= require("express")
const fs = require("fs")
const app = express()
const port = 3000
const template = require('./lib/template.js')

app.get('/',(req,res)=>{
    let {name} = req.query
    fs.readdir('page', (err, files) => {
        let list = template.list(files)
        fs.readFile(`page/${name}`,'utf8',(err, data)=>{
            let control = `<a href="/create">아이돌 추가</a> <a href="/update?name=${name}">내용 수정</a>
            <form action="delete_process" method="post">
                <input type="hidden" name="id" value="${name}">
                <button type="submit">삭제</button>
            </form>
            `
            if(name === undefined){
                name = '여돌덕 신서현이 만든'
                data = '어서오세요 :)'
                control = `<button><a href="/create">아이돌 추가</a></button>`
                img = `<img src="./img/newjeans">`
            }
        const html = template.HTML(name, list, `<h2>${name} 페이지</h2> <p>${data}</p>`, control, img)
        res.send(html)
        })
    });
})

app.get('/create',(req,res)=>{
    fs.readdir('page', (err, files) => {
        const name = 'create'
        const list = template.list(files)
        const data = template.create()
        const html = template.HTML(name,list,data, '', img)
        res.send(html)
    })
})

app.get('/update',(req,res)=>{
    let {name} = req.query
    fs.readdir('page', (err, files) => {
        let list = template.list(files)
        fs.readFile(`page/${name}`,'utf8',(err, content)=>{
            let control = `<a href="/create">아이돌 추가</a> <a href="/update?name=${name}">내용 수정</a>
            <form action="delete_process" method="post">
                <input type="hidden" name="id" value="${name}">
                <button type="submit">삭제</button>
            </form>
            `
            const data= template.update(name, content)
            const html = template.HTML(name, list, `<h2>${name} 페이지</h2> <p>${data}</p>`, control,img)
        res.send(html)
        })
    });
})

const qs = require('querystring')
app.post('/create_process',(req,res)=> {
    // res.send('성공')
    let body = ''
    req.on('data',(data)=>{
        body = body + data
    })
    req.on('end',()=>{
        const post = qs.parse(body)
        // console.log(post)
        const title = post.title
        const description = post.description
        fs.writeFile(`page/${title}`, description, 'utf8',(err)=>{
            res.redirect(302,`/?name=${title}`) // 처리 후 다른 page로 이동
        })
    })
    

})
app.post('/update_process',(req,res)=> {
    // res.send('성공')
    let body = ''
    req.on('data',(data)=>{
        body = body + data
    })
    req.on('end',()=>{
        const post = qs.parse(body)
        const id = post.id
        const title = post.title
        const description = post.description
        fs.rename(`page/${id}`, `page${title}`, (err)=>{
            fs.writeFile(`page/${title}`, description, 'utf8',(err)=>{
                res.redirect(302,`/?name=${title}`) // 처리 후 다른 page로 이동
            })
        })
    })
})

app.post('/delete_process',(req,res)=> { //지우는 작업 처리해주기
    let body = ''
    req.on('data',(data)=>{
        body = body + data
    })
    req.on('end',()=>{
        const post = qs.parse(body)
        const id = post.id
        fs.unlink(`page/${id}`, (err)=>{
            res.redirect(302, `/`)
        })
    })
})
app.listen(port, ()=>{
    console.log(`server running on port ${port}`)
})
