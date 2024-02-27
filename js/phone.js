
const loadPhone = async (searchText,isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json()
    const phones = data.data
    // console.log(phones)
    displayPhone(phones,isShowAll)
}


const displayPhone = (phones,isShowAll) => {
    const phoneContainer=document.getElementById('phone-container')
    phoneContainer.textContent=''
    // display show all more than btn
    const showAllContainer=document.getElementById('show-all-container')
    if(phones.length>12 && !isShowAll){
        showAllContainer.classList.remove('hidden')
    }
    else{
        showAllContainer.classList.add('hidden')

    }

    // display only 12 phones
    if(!isShowAll){
        phones=phones.slice(0,12)
    }
    phones.forEach(phone => {
        // console.log(phone)
        const phoneCard = document.createElement('div')
        phoneCard.classList = 'card bg-gray-100 p-4 shadow-xl'
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
                    <div class="card-body">
                      <h2 class="card-title">${phone.phone_name}</h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div class="card-actions justify-center">
                        <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show details</button>
                      </div>
                    </div>
        `
        phoneContainer.appendChild(phoneCard)
    })
    // hide loading spinner
    toggleLoadingSpinner(false) 
}

const handleShowDetails=async(id)=>{
    const res=await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data=await res.json()
    const phone=data.data
    showDetails(phone)
}
const showDetails=(phone)=>{
    console.log(phone)
    const phoneName=document.getElementById('phone-name')
    phoneName.innerText=phone.name

    const showDetailContainer=document.getElementById('show-detail-container')
    showDetailContainer.innerHTML=`
    <img src="${phone.image}" alt="" />
    <p><span>Storage:<span>${phone?.mainFeatures?.storage}</p>
    `
    // show modal
    show_details_modal.showModal()
}

// handle search btn
const handleSearch=(isShowAll)=>{
    toggleLoadingSpinner(true)
    const SearchField=document.getElementById('input-field')
    const searchText=SearchField.value
    // console.log(searchText)
    loadPhone(searchText,isShowAll)
}

const toggleLoadingSpinner=(isLoading)=>{
    const loadingSpinner=document.getElementById('loading-spinner')
    if(isLoading){
        loadingSpinner.classList.remove('hidden')
    }
    else{
        loadingSpinner.classList.add('hidden')
    }
}

// show all then show all
const handleShowAll=()=>{
    handleSearch(true)
}