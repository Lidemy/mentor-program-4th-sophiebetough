/* eslint-disable */
function escapeOutput(toOutput){
  return toOutput.replace(/\&/g, '&amp;')
    .replace(/\</g, '&lt;')
    .replace(/\>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/\'/g, '&#x27')
    .replace(/\//g, '&#x2F')
};

//留言 template
let todoID = 1;
let allTodo = 0;
let undoneTodo = 0;
let doneTodo = 0;
const template =`
  <div class="todo list-group-item justify-content-between align-items-center col-xl-6 todo-list {todoClass}">
    <div class="todo__content-wrapper custom-control custom-checkbox">
      <input type="checkbox" class="custom-control-input todo-checkbox" id="todo-{id}">
      <label class="todo__content custom-control-label input-content" for="todo-{id}">{content}</label>
      <input class="form-control edit-todo-input" value="" style="display: none">
    </div>
    <div class="todo-btn-group">
      <button type="button" class="btn-outline-info btn-update-todo">編輯</button>
      <button type="button" class="btn-outline-info btn-edit-ok" style="display: none">完成</button>
      <button type="button" class="btn-outline-danger btn-delete">刪除</button>
    </div>
  </div>
`

function updateTodoStatus() {
  $('.undoneTodo').text(undoneTodo)
  $('.allTodo').text(allTodo)
  $('.doneTodo').text(doneTodo)
}

$('.todos').on('click', '.todo-checkbox', (e) => {
  const isChecked = $(e.target).is(':checked') 
  if(isChecked) {
    $(e.target).parent().parent('.todo-list').addClass('checked')
    undoneTodo -= 1
    doneTodo += 1
  } else {
    $(e.target).parent().parent('.todo-list').removeClass('checked')
    undoneTodo += 1
    doneTodo -= 1
  }
  updateTodoStatus();
});
 
//新增 todo
$('.btn-add-todo').click(() => {
  const inputValue = $('.input-block').val()
  if(!inputValue) {
    alert("記得填入待辦事項");
    return
  } else {
    $('.todos').append(
      template
        .replace(/{id}/g, todoID)
        .replace('{content}', escapeOutput(inputValue)));
  }
  $('.input-block').val('');
  todoID += 1;
  allTodo += 1;
  undoneTodo += 1;

  updateTodoStatus();
});

$('.input-block').keydown((e) => {
  //console.log(e.key) 偵測 Enter 鍵 
  const inputValue = $('.input-block').val()
  if (e.key === 'Enter') {
    if(!inputValue) {
    alert("記得填入待辦事項");
    return
  } else {
    $('.todos').append(
      template
        .replace(/{id}/g, todoID)
        .replace('{content}', escapeOutput(inputValue)));
  }
  $('.input-block').val('');
  todoID += 1;
  allTodo += 1;
  undoneTodo += 1;
  }

  updateTodoStatus();
}) 

// 刪除 todo
$('.todos').on('click', '.btn-delete', (e) => {
  $(e.target).parent().parent().remove()
  allTodo -= 1;
  const isChecked = $(e.target).parent().parent().find('.todo-checkbox').is(':checked')
  if(!isChecked) {
    undoneTodo -= 1;
  } else {
    doneTodo -= 1;
  }
  updateTodoStatus();
})

// 編輯 todo
$('.todos').on('click', '.btn-update-todo', (e) => {
  const card = $(e.target).parent().parent();
  const content = card.find('.input-content').text().trim();
  const editEscape = escapeOutput(content);
  card.find('.edit-todo-input').show();
  card.find('.edit-todo-input').val(editEscape);
  card.find('.btn-edit-ok').show();
  card.find('.input-content').hide();
  card.find('.todo-checkbox').hide();
  card.find('.btn-update-todo').hide();  
})

$('.todos').on('click', '.btn-edit-ok', (e) => {
  const card = $(e.target).parent().parent();
  const content = card.find('.edit-todo-input').val();
  const editEscape = escapeOutput(content);
  card.find('.edit-todo-input').hide();
  card.find('.input-content').text(editEscape);
  card.find('.btn-edit-ok').hide();
  card.find('.input-content').show();
  card.find('.todo-checkbox').show();
  card.find('.btn-update-todo').show();  
})

// 清空 todo
$('.btn-empty').click(() => {
  $('.todos').empty();
  allTodo = 0;
  undoneTodo = 0;
  doneTodo = 0;

  updateTodoStatus();
})

// filter 事件-已完成
$('.btn-group').on('click', '.btn-doneTodo', (e) => {
  const target = $(e.target)
  const card = $(e.target).parents();
  card.find('.active') .removeClass('active')
  card.addClass('active')
  card.find('.todo').each((index, element) => {
    if (!$(element).hasClass('checked')) {
      $(element).addClass('hide') 
    } else {
      $(element).removeClass('hide')
    }
  })  
})

// filter 事件-未完成
$('.btn-group').on('click', '.btn-undoneTodo', (e) => {
  const target = $(e.target)
  const card = target.parents();
  card.find('.active') .removeClass('active')
  card.addClass('active')
  card.find('.todo').each((index, element) => {
    if ($(element).hasClass('checked')) {
      $(element).addClass('hide')
    } else {
      $(element).removeClass('hide')
    }
  })  
})

// filter 事件-全部
$('.btn-group').on('click', '.btn-allTodo', (e) => {
  const target = $(e.target)
  const card = target.parents();
  card.find('.active') .removeClass('active')
  card.addClass('active')
  card.find('.todo').each((index, element) => {
    $(element).removeClass('hide')
  })  
});

// Archive & POST
$('.btn-saved').click(() => {
  let allTodoData = []
  $('.todo').each((index, element) => {
    allTodoData.push({
      id: $(element).find('.todo-checkbox').attr('id').replace('todo-',''),
      content: $(element).find('.input-content').text(),
      checkstatus: $(element).find('.todo-checkbox').is(':checked')
    })
  })
  const data = JSON.stringify(allTodoData)
  $.ajax({
    type: 'POST',
    url: 'http://mentor-program.co/mtr04group1/sophiechang/week12/todolist/api_add_todo.php',
    data: {
      todo: data
    },
    success: function(res) {
      const resId = res.id
      window.location = 'index.html?id=' + resId
    },
    error: function() {
      alert('Error')
    }
  })
  console.log(resId)
});

// Archive & GET
const searchParams = new URLSearchParams(window.location.search);
const getID = searchParams.get('id');

if (getID) {
  $.getJSON('http://mentor-program.co/mtr04group1/sophiechang/week12/todolist/api_get_todo.php?id=' + getID, function(data) {
  const getTodo = JSON.parse(data.data.todo)
  restoreTodos(getTodo)
  });
}

function restoreTodos(getTodo) {
  if (getTodo.length === 0) return
  todoID = getTodo[getTodo.length - 1].id +1
  for(let i = 0;  i < getTodo.length; i++ ) {
    const todo = getTodo[i]
    $('.todos').append(
      template
        .replace(/{id}/g, todo.id)
        .replace('{content}', escapeOutput(todo.content))
        .replace('{todoClass}', todo.checkstatus ? 'checked' : '')
    )
    allTodo += 1
    if (todo.checkstatus) {
      $('#todo-' + todo.id).prop('checked', true)
      doneTodo += 1
    } else {
      undoneTodo += 1;
    }
  }
  updateTodoStatus();
}
