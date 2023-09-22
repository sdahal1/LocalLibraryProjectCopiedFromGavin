const getTotalBooksCount = (books=[]) => books.length;

function getTotalAccountsCount(accounts=[]) {
  return accounts.length
}

function getBooksBorrowedCount(books=[]) {
  const borrowedBooks = books.filter((booksObj)=>
    booksObj.borrows[0].returned === false);
  return borrowedBooks.length;
}

function getMostCommonGenres(books=[]) {
  //creat empty obj to store pairings
  const genreCounts = {};
  //run thru list of books
  for (const book of books){
  //get genre
  const genre = book.genre;
  //create condition where we add to the count if pre existing and initialize a count otherwise
  if (genreCounts[genre]){
    genreCounts[genre]++ 
  } else { 
    genreCounts[genre] = 1;
  }}
  //create open array to store result
  const genreArray = [];
  //run thru list of genres 
  for (const genres in genreCounts){
    //map the pairings inside genrecounts
    genreArray.push({name: genres, count: genreCounts[genres]})
  }
  //sort pairings based off count
  genreArray.sort((genre1, genre2)=> genre2.count - genre1.count);
  //return sliced result
  return genreArray.slice(0,5)
}

function getMostPopularBooks(books=[]) {

  const sortedBooks = books.sort((book1, book2)=> {
    return book2.borrows.length - book1.borrows.length 
  });

  const popularBooks = sortedBooks.map(({title, borrows})=>({
    name: title,
    count: borrows.length
}))
  return popularBooks.slice(0,5)
}
//loop thru books array total number of borrows (borrows.length) and sort by that number

function getMostPopularAuthors(books=[], authors=[]) {
const borrowsCount = {};

books.forEach(({authorId,borrows})=>{
  if (borrowsCount[authorId]){
 borrowsCount[authorId] += borrows.length
} else {
  borrowsCount[authorId] = borrows.length
}})

const popAuthors = [];
for (const author of authors){
  const authorId = author.id;
  const borrowCount = borrowsCount[authorId];
  // const authorName = `${author.name.first} ${author.name.last}`;
  popAuthors.push({name: joinFirstAndLastNames(author), count: borrowCount})  
}

popAuthors.sort((author1, author2)=> author2.count - author1.count)
  return popAuthors.slice(0,5)
  
}

function joinFirstAndLastNames(author){
  return `${author.name.first} ${author.name.last}`
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
