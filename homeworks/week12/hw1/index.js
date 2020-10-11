/* eslint-disable */

function escapeOutput(toOutput){
  return toOutput.replace(/\&/g, '&amp;')
    .replace(/\</g, '&lt;')
    .replace(/\>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/\'/g, '&#x27')
    .replace(/\//g, '&#x2F');
}

const commentsDom = $('.comments');
const siteKey = 'sophiechang';
const loadMoreButton = `<button class="btn btn-secondary btn-lg btn-block col-md-10 load-more-btn">載入更多</button>`;
let lastID = null;

function addCommentToDom(container, comment, isPrepend) {
  const html = `
  <div class="card">
      <div class="card-body">
        <h5 class="card-title">${escapeOutput(comment.nickname)}</h5>
        <p class="card-text">${escapeOutput(comment.content)}</p>
      </div>
    </div> 
  `

  if (isPrepend) {
    container.prepend(html);
  } else {
    container.append(html);
  }
}

// 串 API
function getCommentsAPI(siteKey, lastID, cb) {
  let url = "http://mentor-program.co/mtr04group1/sophiechang/week12/board_api/api_get_comments.php?site_key=" + siteKey;
  if (lastID) {
    url += "&before=" + lastID;
  }

  $.ajax({
    url: url
  }).done((data) => {
    cb(data);
  }); 
}

// 顯示留言
function getComments() {
  getCommentsAPI(siteKey, lastID, (data) => {
    $('.load-more-btn').hide();
    if (!data.ok) {
      alert(data.message);
      return;
    }
    const comments = data.discussions;
    for (const comment of comments) {
      addCommentToDom(commentsDom, comment, false);
    }
    const length = comments.length;
    lastID = comments[length - 1].id;
    console.log(lastID)
    if (lastID > 5) {
      commentsDom.append(loadMoreButton);
    }
  });
}

getComments();


commentsDom.on('click', $('.load-more-btn'), (e) => {
  getComments();
});

$('.add-comment-form').submit((e) => {
  e.preventDefault();
  const newCommentData = {
    site_key: 'sophiechang',
    nickname: $('input[name=nickname]').val(),
    content: $('textarea[name=content]').val()
  };
  $.ajax({
    type: 'POST',
    url: 'http://mentor-program.co/mtr04group1/sophiechang/week12/board_api/api_add_comment.php',
    data: newCommentData
  }).done((data) => {
    if (!data.ok) {
      alert(data.message);
      return;
    };
    $('input[name=nickname]').val('')
    $('textarea[name=content]').val('')

    addCommentToDom(commentsDom, newCommentData, true)   
  });
}); 
