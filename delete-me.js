// Parse 'limit' and 'page' as numbers
let limit = Number(2)
let page = Number('asd')

console.log(page)

console.log(isNaN(limit), isNaN(page))

// Check if 'limit' is invalid or less than 1, then assign default
if (isNaN(limit) || limit < 1) {
  limit = 10
}

// Check if 'page' is invalid or less than 1, then assign default
if (isNaN(page) || page < 1) {
  page = 1
}

console.log(limit, page)
