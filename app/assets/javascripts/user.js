$(function() {
  var search_list = $("#user-search-result");

  function appendSearch(user) {
    var html =  `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">
                    ${user.name}
                  </p>
                  <div id="text-button2" class="chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    
    search_list.append(html);
  }

  var add_list = $("#chat-group-user-8").parent()
  function appendAddname(data_name, data_id) {
    console.log("this");
    var name =  `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${data_id}'>
                  <p class='chat-group-user__name'>${data_name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn' id='aaa'>削除</div>
                </div>`

    add_list.append(name)
  }


  function appendErrMsgToHTML(msg) {
    var html =  `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">
                    ${ msg }
                  </p>
                </div>`

    search_list.append(html);
  }
  $("#user-search-field").on("keyup", function() {

    var input = $("#user-search-field").val();
    console.log(input);
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      search_list.empty();
      if (users.length !== 0 ) {
        users.forEach(function(user){
          appendSearch(user);
          // console.log(search.id);
          // console.log(search.name)
        
          return false;
        });
      }
      else {
        appendErrMsgToHTML("一致なし！");
        return false;
      }
      
    })
    .fail(function(){
      alert('error!');
      console.log('error!')
    });
  });
  
  $(".js-remove-btn").on("click", function() {
    $(this).parent().remove(); 
  });
  
  
  $(this).on("click", "#text-button2", function() {
    var data_name = $(this, '#text-button2').data('user-name');
    var data_id = $(this, '#text-button2').data('user-id');

    appendAddname(data_name, data_id);
  });
 
  $("#user-search-result").on("click", "#text-button2", function() {
    $(this).parent().empty ();
  });
  
  $(this).on("click", "#aaa", function(){
    console.log("aaa");
    $(this).parent().empty(); 
  });
});





