var data = [
    {member: 'Nguyễn  Đình Sơn', toDo: 'Nộp bài Js',  deaLine: '25/01/2022'},
    {member:'Nguyễn Bá Phi', toDo: 'Kiểm tra Tiếng Anh',  deaLine: '27/01/2022'},
    {member:'Trần Hồng Vân', toDo: 'Học Html, Css',  deaLine: '20/12/2023'}
]

function Sort(array){
    data.sort(function(a, b){
        let after = new Date(a.deaLine.split('/').reverse().join('/'))
        let before = new Date(b.deaLine.split('/').reverse().join('/'))
        if(after < before){
            return -1
        }
    })
}

function render(){
    Sort(data)
    for(let i =0; i < data.length; i++){
        let today = new Date()
        let newDate = new Date(data[i].deaLine.split('/').reverse().join('/'))
        const user = `   
        <tr class = "items ${newDate - today < 0 ? "red" : newDate - today < 7*24*3600*1000? "orange": ""}">
            <th class = "member">${data[i].member}</th>
            <th class = "todo">${data[i].toDo}</th>
            <th class = "dealine" >${data[i].deaLine.split('-').reverse().join('/')}</th>
            <th><button class = "edit" onclick = 'editData(${i})'>Edit</button>
                <button class = "remove" onclick = 'deleteData(${i})'>X</button>
            </th>
        </tr>       
        `
      
        $('.TodoList').append(user)
    }
}
render()

function add(i){  
    const memBer = $('#member').val()
    const toDo = $('#toDo').val()
    const deaLine = $('#deaLine').val()
    if(memBer == '' || toDo == '' || deaLine == ''){
        alert("Nhập đủ các trường còn trống")
    }else{
        data.push({member: memBer, toDo:toDo, deaLine:deaLine})
        $('#member').val('')
        $('#toDo').val('')
        $('#deaLine').val('')
        $('.TodoList').html('')
        render()
    }
}

function deleteData(i){
    data.splice(i,1)
    $('.TodoList').html('')
    render()
}

$('.modal-content').animate({opacity: 0, top:-100})

function editData(i){
    $('.modal').show()
    $('.modal-content').animate({opacity: 1, top:0})
    $('.change').off('click')
    $('.change').on('click', function(){
        const newMemBer = $('#newMember').val()
        const newToDo = $('#newTodo').val()
        const newDeaLine = $('#newDeaLine').val()
            data[i] = {member: newMemBer, toDo:newToDo, deaLine:newDeaLine}
            $('#newMember').val('')
            $('#newTodo').val('')
            $('#newDeaLine').val('')
            $('.TodoList').html('')
            render()
            $('.modal').hide()
            $('.modal-content').animate({opacity: 0, top:-100})
    })
}

$('.cancel').on('click', function(){
    $('.modal-content').animate({opacity: 0, top:-100})
    $('.modal').hide()
})

$('.fa-times').on('click', function(){
    $('.modal-content').animate({opacity: 0, top:-100})
    $('.modal').hide()
})