/* eslint-disable */
export function escapeOutput(toOutput){
  return toOutput.replace(/\&/g, '&amp;')
    .replace(/\</g, '&lt;')
    .replace(/\>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/\'/g, '&#x27')
    .replace(/\//g, '&#x2F');
};

export function addCommentToDom(container, comment, isPrepend) {
  const html = `
  <div class="card mt-4">
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