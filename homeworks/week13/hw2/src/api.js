/* eslint-disable */

export function getCommentsAPI(apiUrl, siteKey, lastID, cb) {
  var url = `${apiUrl}/api_get_comments.php?site_key=` + siteKey;
  if (lastID) {
    url += "&before=" + lastID;
  }

  $.ajax({
    url: url
  }).done((data) => {
    cb(data);
  }); 
}

export function addCommentsAPI(apiUrl, data, cb) {
  $.ajax({
    type: 'POST',
    url: `${apiUrl}/api_add_comment.php`,
    data: data
  }).done((data) => {
    if (!data.ok) {
      alert(data.message);
      return;
    }
    cb(data)
  });
}