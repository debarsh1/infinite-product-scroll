const productList = document.getElementById('product-list');
const loading = document.getElementById('loading');
let pageNum = 1;

function fetchProducts() {
  loading.style.display = 'block';

  // Replace this URL with your API endpoint that returns a list of products
  fetch(`https://fakestoreapi.com/products?limit=10&page=${pageNum}`)
    .then(response => response.json())
    .then(products => {
      // Loop through the products and create HTML elements for each one
      products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');

        // Create and append the product image, name, price, etc.
        const productName = document.createElement('h3');
        productName.innerText = product.title;
        const productPrice = document.createElement('p');
        productPrice.innerText = `$${product.price}`;

        const productImage = document.createElement('img');
        productImage.src = product.image;
        productImage.alt = product.title;

        productItem.appendChild(productName);
        productItem.appendChild(productPrice);
        productItem.appendChild(productImage);

        productList.appendChild(productItem);
      });

      loading.style.display = 'none';
      pageNum++;
    });
}

// Call fetchProducts() when the page loads
fetchProducts();

// Fetch more products when the user scrolls to the bottom of the page
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
    fetchProducts();
  }
});
