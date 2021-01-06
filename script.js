const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const addressInput = document.getElementById('address');
const cityInput = document.getElementById('city');
const stateInput = document.getElementById('state');
const zipInput = document.getElementById('zip');


const isRequired = (value) => value == '' ? false : true;
function setErrorMessage(input, message) { 
    let groupItem = input.parentElement;
    let error = groupItem.querySelector('small');

    error.innerText = message;
}
function clearError(input){
    let group = input.parentElement;
    let error = group.querySelector('small');

    error.innerText = '';
}

const isEmailValid = (email) => {
    const emailRegex = /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/;
    return emailRegex.test(email);
}

function isPhoneValid(phone) {
    const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
    return phoneRegex.test(phone);
}

function isZipValid(zip) {
    const zipRegex =  /\b\d{2}\-\d{3}\b/;
    return zipRegex.test(zip);
}

function validateName() {
    let valid = false;
    const nameValue = nameInput.value;
    if(!isRequired(nameValue)){
        setErrorMessage(nameInput, 'Name can not be blank')
    }else{
        clearError(nameInput);
        valid = true;
    }
    return valid;
}

function validateEmail() {
    let valid = false;
    const emailValue = emailInput.value;

    if(!isRequired(emailValue)){
        setErrorMessage(emailInput, 'Email can not be blank');
    }else if(!isEmailValid(emailValue)){
        setErrorMessage(emailInput, 'Not valid email')
    }else{
        clearError(emailInput);
        valid = true;
    }
    return valid;
}

function validatePhone() {
    let valid = false;
    let  phoneValue = phoneInput.value;

    if(!isRequired(phoneValue)){
        setErrorMessage(phoneInput, "Phone can not be blank");
    }else if(!isPhoneValid(phoneValue)){
        setErrorMessage(phoneInput, "Phone must be in format +XX-XXX-XXX-XXXX")
    }else{
        clearError(phoneInput);
        valid = true;
    }
    return valid;
}

function validateAddress() {
    let valid = false;
    let addressValue = addressInput.value.trim();

    if(!isRequired(addressValue)){
        setErrorMessage(addressInput, "Address can not be blank");
    }else{
        clearError(addressInput);
        valid = true;
    }
    return valid;
}

function validateCity() {
    let valid = false;
    const cityValue = cityInput.value;

    if(!isRequired(cityValue)){
        setErrorMessage(cityInput, 'City can not be blank');
    }else{
        clearError(cityInput);
        valid = true;
    }
    return valid;
}

function validateState() {
    let valid = false;
    let stateValue = stateInput.value;
    if(!isRequired(stateValue)){
        setErrorMessage(stateInput, 'State can not be blank');
    }else{
        clearError(stateInput);
        valid = true;
    }
    return valid;
}

function validateZip() {
    let valid = false;
    const zipValue = zipInput.value;
    if(!isRequired(zipValue)){
        setErrorMessage(zipInput, 'Zip can not be blank');
    }else if(!isZipValid(zipValue)){
        setErrorMessage(zipInput, 'Zip code must in format XX-XXX')
    }else{
        clearError(zipInput);
        valid = true;
    }
    return valid;
}
const form1 = document.getElementById('reg-form1');
const form2 = document.getElementById('reg-form2');
const nextBtn = document.getElementById('next');
const signUpBtn = document.getElementById('signup');
const tabFirst = document.getElementById('user-info');
const tabSecond = document.getElementById('user-preferences');

nextBtn.onclick = function () {  
    
    let isNameValid = validateName(),
        isEmailValid = validateEmail(),
        isPhoneValid = validatePhone(),
        isAddressValid = validateAddress(),
        isCityValid = validateCity(),
        isStateValid = validateState(),
        isZipValid = validateZip();
    
        let isFormValid;
        isFormValid = isNameValid && isEmailValid &&
                        isPhoneValid && isAddressValid &&
                        isCityValid && isStateValid && isZipValid;
    if(!isFormValid){
         return false;
    }else{

        form1.style.left = "-300px";
        form2.style.left = "25px";
        tabFirst.classList.remove('active');
        tabSecond.classList.add('active');
        localStorage.setItem('name', nameInput.value);
        localStorage.setItem('email', emailInput.value);
        localStorage.setItem('phone', phoneInput.value);
        localStorage.setItem('address', addressInput.value);
        localStorage.setItem('city', cityInput.value);
        localStorage.setItem('state', stateInput.value);
        localStorage.setItem('zip', zipInput.value);
    }
}

const allergiesInput = document.getElementById('allergies');
const formData = document.querySelector('.form-data');

function validateComment(){
    let valid = false;
    let commentValue = allergiesInput.value;
    if(commentValue === ''){
        setErrorMessage(allergiesInput, 'Required*')
    }else{
        clearError(allergiesInput);
        valid = true;
    }
    return valid;
}
function validateFrequency() {
    let valid=false;
    let freqValue;
    const frequencyGroup = document.querySelectorAll('input[name="frequency-option"]');
    for(let i=0; i<frequencyGroup.length; i++){
        if(frequencyGroup[i].checked){
            freqValue = frequencyGroup[i].value;
        }
    }    

    if(!freqValue){
        document.querySelector('.error-order--frequency').innerText = 'Required*';
    }else{
        document.querySelector('.error-order--frequency').innerText = '';
        valid = true;
    }
    return valid;
}

function validatePackage() { 
    let valid = false;
    const packageOption = document.querySelectorAll('input[name="package-option"]')

    let packageValue;
    for(let j=0; j<packageOption.length; j++){
        if(packageOption[j].checked){
            packageValue = packageOption[j].value;
        }
    }
    if(!packageValue){
        document.querySelector('.error-order--package').innerText = 'Required*';
    }else{
        document.querySelector('.error-order--package').innerText = '';
        valid = true;
    }
    return valid;
 }

function showData(){
    
    const frequencyOption = document.querySelector('input[name=frequency-option]:checked').value;
    const packageOption = document.querySelector('input[name=package-option]:checked').value;

    localStorage.setItem('frequencyOption', frequencyOption);
    localStorage.setItem('packageOption', packageOption);   
    localStorage.setItem('allergies', allergiesInput.value);
    
    formData.innerHTML += `
    <h3>Your form has been submitted</h3>
        <div class="form-data__field">
            <p>You entered the following data</p>
            <span>Name: ${localStorage.getItem('name')} </span>
            <span>Email: ${localStorage.getItem('email')} </span>
            <span>Phone: ${localStorage.getItem('phone')} </span>
            <span>Address: ${localStorage.getItem('address')} </span>
            <span>City: ${localStorage.getItem('city')} </span>
            <span>State: ${localStorage.getItem('state')} </span>
            <span>Zip: ${localStorage.getItem('zip')} </span>
            <span>allergies: ${localStorage.getItem('allergies')} </span>
            <span>frequency: ${localStorage.getItem('frequencyOption')} </span>
            <span>size: ${localStorage.getItem('packageOption')} </span>
        </div>`
}

signUpBtn.onclick = function () { 
    let isCommentValid = validateComment(),
        isFrequencyValid = validateFrequency(),
        isPackageValid = validatePackage();

    let isFieldsValid;
    isFieldsValid = isCommentValid && isFrequencyValid && isPackageValid;

    if(isFieldsValid){
        showData();
    }else{
        return false;
    }
    
 }      
