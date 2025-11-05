const albumParent = document.getElementById('albumCont'); 

const btn = document.getElementById('addItemBtn');
const titleInput = document.getElementById('titleInput');
const reviewInput = document.getElementById('reviewInput');
const imgInput = document.getElementById('imgInput');
const linkInput = document.getElementById('linkInput');

const reviews = document.querySelectorAll('.reviewText'); 

reviews.forEach(review => {
  review.addEventListener('click', () => {
    review.classList.toggle('expanded');
  });
});

btn.addEventListener('click', () => {
  const title = titleInput.value.trim();
  const review = reviewInput.value.trim();
  const imgUrl = imgInput.value.trim();

  if (!title || !review || !imgUrl) return; // nothing entered

  // create the element
  const itemDiv = document.createElement('div');
  itemDiv.className = 'albumBox';

    const linkUrl = linkInput.value.trim();
    const a = document.createElement('a');
    a.href =linkUrl;
    a.target = '_blank';
    itemDiv.appendChild(a);
    
    const img = document.createElement('img');
    img.src = imgUrl;
    img.alt = title;
    a.appendChild(img);
  


    const h3 = document.createElement('h3');
    h3.textContent = title;
    itemDiv.appendChild(h3);


    const p = document.createElement('p');
    p.textContent = review;
    itemDiv.appendChild(p);

  albumParent.appendChild(itemDiv);

  // clear inputs
  titleInput.value = '';
  reviewInput.value = '';
  imgInput.value = '';
});