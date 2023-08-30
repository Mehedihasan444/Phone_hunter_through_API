const loadPhone = async (searchElement,isShowAll) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchElement}`);
    const data = await response.json();
    const phones = data.data;
    showPhone(phones,isShowAll);

}


const showPhone = (phones,isShowAll) => {
    const phoneContainer = document.getElementById("phone-container");
    phoneContainer.textContent = '';
    const showAllContainer = document.getElementById('show-all');

    if (phones.length > 10 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    }
    else {
        showAllContainer.classList.add('hidden');
        
    }
    if (!isShowAll) {
        phones = phones.slice(0, 10);
        
    }
    if (phones.length===0) {
        loading(false);
        const Error = document.getElementById('error');
        Error.classList.remove('hidden');
    }

    phones.forEach(phone => {
        const phoneCard = document.createElement("div");
        phoneCard.classList = `card  bg-base-100 shadow-xl pt-5`;
        phoneCard.innerHTML =
            `<figure><img src="${phone.image}" alt="" /></figure>
        <div class="card-body">
        <h2 class="text-2xl font-bold text-center">${phone.phone_name}</h2>
        <p class="text-center">Lorem ipsum dolor sit, amet consectetur elit.</p>
        <div class="card-actions justify-center">
        <a class="text-blue-600 cursor-pointer">show details</a>
        </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard);
        loading(false);
    });
}

const searching = (isShowAll) => {
    loading(true);
    const searchField = document.getElementById('search-field');
    const searchFieldText = searchField.value;
    loadPhone(searchFieldText,isShowAll);

}

const loading = (isLoading) => {
    const loading = document.getElementById('loading');
    if (isLoading) {
        loading.classList.remove('hidden');
    }
    else {
        loading.classList.add('hidden');

    }
}

const showAll = () => {
  searching(true);
}

