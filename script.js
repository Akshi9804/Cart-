// Two sets of images for two products
const products = {
    1: ['Media/panda1.png', 'Media/panda2.png', 'Media/panda3.png', 'Media/panda4.png'],
    2: ['Media/plants1.png', 'Media/plants2.png', 'Media/plants3.png', 'Media/plants4.png']
};

// Current product and image index for lightbox
let currentProduct = 1;
let currentImageIndex = 0;

// Display product thumbnails
function loadThumbnails() {
    Object.keys(products).forEach(productId => {
        const thumbnailContainer = document.getElementById('thumbnails' + productId);
        products[productId].forEach((image, index) => {
            const imgElement = document.createElement('img');
            imgElement.src = image;
            imgElement.alt = 'Thumbnail ' + (index + 1);
            imgElement.onclick = () => changeMainImage(productId, index);
            thumbnailContainer.appendChild(imgElement);
        });
    });
}

// Change the main image of a product when a thumbnail is clicked
function changeMainImage(productId, index) {
    const mainImage = document.getElementById('mainImage' + productId);
    mainImage.src = products[productId][index];
}

// Open the lightbox with the selected product
function openLightbox(productId) {
    currentProduct = productId;
    currentImageIndex = 0;
    document.getElementById('lightbox').style.display = 'block';
    updateLightboxImage();
    loadLightboxThumbnails();
}

// Update the lightbox image
function updateLightboxImage() {
    document.getElementById('lightboxImage').src = products[currentProduct][currentImageIndex];
}

// Load thumbnails in the lightbox
function loadLightboxThumbnails() {
    const lightboxThumbnailsContainer = document.getElementById('lightbox-thumbnails');
    lightboxThumbnailsContainer.innerHTML = '';  // Clear previous thumbnails

    products[currentProduct].forEach((image, index) => {
        const imgElement = document.createElement('img');
        imgElement.src = image;
        imgElement.alt = 'Lightbox Thumbnail ' + (index + 1);
        imgElement.onclick = () => {
            currentImageIndex = index;
            updateLightboxImage();
        };
        lightboxThumbnailsContainer.appendChild(imgElement);
    });
}

// Close the lightbox
function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

// Change image in lightbox (next/previous)
function changeImage(direction) {
    currentImageIndex += direction;
    if (currentImageIndex < 0) {
        currentImageIndex = products[currentProduct].length - 1;
    } else if (currentImageIndex >= products[currentProduct].length) {
        currentImageIndex = 0;
    }
    updateLightboxImage();
}

// Load the initial thumbnails when the page loads
window.onload = loadThumbnails;


//cart operations

//an array to hold cart items
var list=[];
//a variable to hold total value of the cart
var total=0;


//function to open the cart
document.getElementById("openCart").addEventListener("click",()=>{
    document.getElementById("cart").style.display="flex";
    updateCart();
 })


//function to clode cart
const closeCart = () => {
    document.getElementById("cart").style.display="none";
}


//function to add item to the cart
const addItem=(name,price)=>{
    var product = list.find(i => i.name == name)
    if(product)
    {
        product.quantity+=1;
    }
    else{
        list.push({name,price,quantity:1});
    }
    total+=+price;
    document.getElementById("totalBill").innerText=total;
    updateCart()
};


//function to remove the item
const removeItem=(name,price)=>{
    var product = list.find(i => i.name == name)
    product.quantity-=1;
    if(product.quantity==0)
    {
        list = list.filter(item => item.name !== product.name);
    }
    total-=+price;
    document.getElementById("totalBill").innerText=total;
    updateCart()
};


//function to update items in the cart used when adding and deleting items
//we add a remove button to the cart as well
const updateCart = () => {
    const cartItems = document.getElementById("cartItems");
    cartItems.innerHTML = "";
    console.log(list.length);
    if(list.length==0)
    {
        cartItems.innerText="Your cart is empty!!!";
        cartItems.style.fontSize="1.5rem";
        cartItems.style.fontWeight="bold";
        document.getElementById("billTag").style.display="none";
    }else{
    list.forEach(i => {
        cartItems.style.fontSize="medium";
        cartItems.style.fontWeight="normal";
        const pr = document.createElement("li");
        document.getElementById("billTag").style.display="block";
        pr.textContent = `
        Name: ${i.name}, Price: ${i.price}, Quantity: ${i.quantity}`;
        //Remove button creation
        const removeBtn=document.createElement("button");
        removeBtn.className="removeItem";
        removeBtn.textContent="Remove";
        removeBtn.setAttribute("attName",i.name)
        removeBtn.setAttribute("attPrice",i.price)

        //Event listener for remove item button
        removeBtn.onclick = () => {
        confirmation=document.getElementById("removeConfirm");
        confirmation.style.display="none";
        setTimeout(function() {
            confirmation.style.display = "flex";
        }, 100);
        setTimeout(function() {
            confirmation.style.display = "none";
        }, 4000);
            const n = removeBtn.getAttribute('attName');
            const p = removeBtn.getAttribute('attPrice');
            removeItem(n, p);
        };
        pr.appendChild(removeBtn);
        cartItems.appendChild(pr);
    });
    }
};


//Event listener for add item button
document.querySelectorAll(".addItem").forEach(i => {
    i.addEventListener('click',() => {
        confirmation=document.getElementById("addConfirm");
        confirmation.style.display="none";
        setTimeout(function() {
            confirmation.style.display = "flex";
        }, 100);
        setTimeout(function() {
            confirmation.style.display = "none";
        }, 4000);
        const n = i.getAttribute('at-name');
        const p = i.getAttribute('at-price');
        addItem(n,p);
       
    })
})
