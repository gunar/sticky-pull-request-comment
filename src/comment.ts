export async function findPreviousComment(octokit, repo, issue_number, header) {
  const { data: comments } = await octokit.issues.listComments({
    ...repo,
    issue_number
  });
  const h = headerComment(header);
  return comments.find(comment => comment.body.startsWith(h));
}
export async function updateComment(octokit, repo, comment_id, body, header) {
  await octokit.issues.updateComment({
    ...repo,
    comment_id,
    body: `${headerComment(header)}\n${body}`
  });
}
export async function createComment(octokit, repo, issue_number, body, header) {
  await octokit.issues.createComment({
    ...repo,
    issue_number,
    body: `${headerComment(header)}\n${body}`
  });
}

function headerComment(header) {
  return `<!-- Sticky Pull Request Comment${header} -->`;
}
