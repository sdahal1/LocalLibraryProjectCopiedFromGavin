const { findAuthorById } = require("./books");

function findAccountById(accounts=[], id=0) {
  return accounts.find((accountIds)=>
    accountIds.id === id)
}

function sortAccountsByLastName(accounts=[]) {
  return accounts.sort((user1, user2)=>
     user1.name.last.toLowerCase() < user2.name.last.toLowerCase() ? -1 : 1)
}
//use sort
function getTotalNumberOfBorrows(account={}, books=[]) {
  const total = books.reduce((count, bookObj)=>{
    return count + bookObj.borrows.reduce((borrowCount, borrowObj)=>{
      return borrowObj.id === account.id ? borrowCount +1 : borrowCount;
    }, 0)
  }, 0)
  return total
}


function getBooksPossessedByAccount(account = {}, books = [], authors = []) {
  const accountId = account.id;
  const booksPossessedByAccount = [];

  books.forEach((book) => {
    const { borrows, authorId } = book;

    const isPossessed = borrows.some((borrowedObj) => {
      return borrowedObj.id === accountId && !borrowedObj.returned;
    });

    if (isPossessed) {
      const author = findAuthorById(authors, authorId )
      booksPossessedByAccount.push({ ...book, author });
    }
  });

  return booksPossessedByAccount;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
