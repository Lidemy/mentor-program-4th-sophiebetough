/* eslint-disable */
export function loadMoreButton(className) {
  return `<button class=" ${className} btn btn-secondary btn-lg btn-block col-md-10 load-more-btn">載入更多</button>`
} 

export const css =`
  .form-group label {
    font-size: 20px;
  }

  .load-more-btn {
    margin: 0 auto;
    margin-top: 30px;
  }
`

export function getForm(FormClassName, commentsClassName) {
  return `
  <div>
    <form class="${FormClassName} mt-5">
      <div class="form-group">
        <label for="form-nickname">你的暱稱</label>
        <input name="nickname" type="text" class="form-control">
      </div>
      <div class="form-group">
        <label for="content-textarea">你的留言內容</label>
        <textarea name="content" class="form-control"  rows="3"></textarea>
      </div>
      <button type="submit" class="btn btn-primary">送出</button>
    </form>
    <div class="${commentsClassName}">
    </div>
  </div>
`
}
