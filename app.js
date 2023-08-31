const loadPhone = async (searchElement, isShowAll) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchElement}`);
    const data = await response.json();
    const phones = data.data;
    showPhone(phones, isShowAll);

}


const showPhone = (phones, isShowAll) => {
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
    if (phones.length === 0) {
        loading(false);
        const Error = document.getElementById('error');
        Error.classList.remove('hidden');
    }
    else{
        const Error = document.getElementById('error');

        Error.classList.add('hidden');

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
        <a class="text-blue-600 cursor-pointer" onclick="loadPhoneDetails('${phone.slug}')">show details</a>
        </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard);
        loading(false);
    });
}



const loadPhoneDetails = async (id) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await response.json();
    const details = data.data;
    showDetails(details);
}



const showDetails = (details) => {
    const modal = document.getElementById('modal-form');
    modal.innerHTML =
        `
            <figure class = "flex justify-center">
                <img class=""
                    src="${details.image}"
                    alt="">
            </figure>
            <div class="space-y-2">
                <h3 class="text-2xl font-bold mt-5">${details.name}</h3>
                <p class="py-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam officia repellendus sunt doloribus, eum tempore. Eos nostrum perferendis magnam libero!</p>
                <p class=""><span class="text-md font-bold">Storage : </span>${details.mainFeatures.storage}</p>
                <p class=""><span class="text-md font-bold">Display Size : </span>${details.mainFeatures.displaySize}</p>
                <p class=""><span class="text-md font-bold">Chipset : </span>${details.mainFeatures.chipSet}</p>
                <p class=""><span class="text-md font-bold">Memory : </span>${details.mainFeatures.memory}</p>
                <p class=""><span class="text-md font-bold">Slug : </span>${details.slug}</p>
                <p class=""><span class="text-md font-bold">Release data :</span>${details.releaseData}</p>
                <p class=""><span class="text-md font-bold">Brand : </span>${details.brand}</p>
                
            </div>
            <div class="modal-action">
                <button class="btn text-md font-bold bg-blue-600 px-7 py-3 text-white rounded-lg">Close</button>
            </div>
    `
    phone_details.showModal();
}



const searching = (isShowAll) => {
    loading(true);
    const searchField = document.getElementById('search-field');
    const searchFieldText = searchField.value;
    loadPhone(searchFieldText, isShowAll);

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

