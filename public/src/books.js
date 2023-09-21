function findAuthorById(authors = [], id = 0) {
  return authors.find((author)=> author.id === id)
}

// //given an array of authors, filter all book object including author id (num)
function findBookById(books =[], id = "") {
  return books.find((bookObj)=> bookObj.id === id)
}
// //given an array of books with ids, take in a given id and return books that match
function partitionBooksByBorrowedStatus(books=[]) {
  const borrowedBooks = books.filter((bookObj) => {
    const firstBorrow = bookObj.borrows[0];
  return firstBorrow ? firstBorrow.returned === false : false})
  const returnedBooks = books.filter((bookObj2) => {
    const firstBorrow = bookObj2.borrows[0];
    return firstBorrow ? firstBorrow.returned === true : false})

  return [borrowedBooks,returnedBooks];
}
// //create 2 arrays based on books returned (t/f) - return 2 arrays
function getBorrowersForBook(book={}, accounts=[]) {
  //given a book loop through accounts filtering all who borrowed return array of accounts with returned
  const {borrows} = book;
  const result = borrows.map((borrowsObj)=>{
    const {id, returned} = borrowsObj;
    const foundAccount = accounts.find((accountObj)=>{
      return accountObj.id === id
    })
    foundAccount.returned = returned;
    return foundAccount;
  })
  return result.slice(0,10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
