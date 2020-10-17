/* eslint-disable */
import $ from 'jquery';
import { getCommentsAPI, addCommentsAPI } from './api'
import { addCommentToDom } from './utils'
import { loadMoreButton, css, getForm } from './templates'

// 初始化，傳入參數取得留言板 plugin
export function init(options) {
  const siteKey = options.siteKey
  const apiUrl = options.apiUrl
  let lastID = null
  let containerElement = $(options.containerSelector)

  const loadMoreClassName = `${siteKey}-load-more-btn`;
  const commentsClassName = `${siteKey}-comments`;
  const formClassName = `${siteKey}-add-comment-form`

  containerElement.append(getForm(formClassName, commentsClassName));
 
  const styleElement = document.createElement('style');
  styleElement.type = 'text/css';
  styleElement.appendChild(document.createTextNode(css))
  document.head.appendChild(styleElement)

  // 顯示留言
  function getComments() {
    getCommentsAPI(apiUrl, siteKey, lastID, (data) => {
      $('.' + loadMoreClassName).hide();
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
      if (lastID > 5 && length >= 5) {
        console.log(lastID)
        commentsDom.append(loadMoreButton(loadMoreClassName));
      } 
    }) 
  };

  const commentsDom = $('.' + commentsClassName);
  getComments();
  
  commentsDom.on('click', $('.' + loadMoreClassName), (e) => {
    getComments();
  });

  $(`.${formClassName}`).submit((e) => {
    e.preventDefault();
    const nicknameDom = $(`.${formClassName} input[name=nickname]`);
    const contentDom = $(`.${formClassName} textarea[name=content]`)
    const newCommentsData = {
      site_key: siteKey,
      nickname: nicknameDom.val(),
      content: contentDom.val()
    };
    addCommentsAPI(apiUrl, newCommentsData, (data) => {
      addCommentToDom(commentsDom, newCommentsData, true)   
    })
    nicknameDom.val('') 
    contentDom.val('') 
  }) 
}
