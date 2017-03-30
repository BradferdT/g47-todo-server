$(document).ready(function(){

  $('#getData').click(function(){
    $('.displayData ul').empty();
    $.ajax({
           method: 'GET',
           url: 'http://localhost:8000/read',
           dataType: "json",
         })
         .done(function(data){
           for(var i = 0; i < data.length; i++){
             $('.displayData ul').append(`<li>ID: ${data[i].id}<br>Title: ${data[i].title}<br>Completed: ${data[i].completed}</li>`);
           }
         })
  })

  $('#formA').submit(function(){
    var id = $('#prodId').val();
    var title = $('#title').val();
    var bool = $('.selected option:checked').val();
    var createObj = { "id": id, "title": title, "completed": bool};
    $.ajax({
      type: 'POST',
      url: 'http://localhost:8000/add',
      data: createObj,
    })
    .done(function(){
      console.log(createObj);
    })
    .fail(function(){
      alert('Error');
    })
    event.preventDefault();
  })

  $('#deleteData').click(function(){
    var id = $('#prodId').val();
    var title = $('#title').val();
    var bool = $('.selected option:checked').val();
    var objData = { "id": id, "title": title, "completed": bool};
    $.ajax({
      type: 'DELETE',
      url: 'http://localhost:8000/delete',
      data: objData
    })
    .done(function(){
      alert('Done');
    })
    .fail(function(){
      alert('Not so done');
    })
  })

  $('#updateData').click(function(){
    var id = $('#prodId').val();
    var title = $('#title').val();
    var bool = $('.selected option:checked').val();
    var objData = { "id": id, "title": title, "completed": bool};
    $.ajax({
      type: 'PUT',
      url: 'http://localhost:8000/update',
      data: objData
    })
    .done(function(){
      alert('Done');
    })
    .fail(function(){
      alert('Not so done');
    })
  })

});
