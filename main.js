const yearInput = document.querySelector('#year');
const monthInput = document.querySelector('#month');
const dayInput = document.querySelector('#day');
const showBtn = document.querySelector('.show-btn');
const errorTxts = document.querySelectorAll('.error-txt');
const lables = document.querySelectorAll('#lable');
const userYears = document.querySelector('#user-years');
const userMonths = document.querySelector('#user-months');
const userDays = document.querySelector('#user-days');
const inputs = [dayInput, monthInput, yearInput];

const today = new Date();

const currentDay = today.getDate();
const currentMonth = today.getMonth() + 1;
const currentYear = today.getFullYear();
const daysinpreviousMonth = new Date(currentYear, currentMonth - 1, 0).getDate();

dayInput.addEventListener('input', ()=>{
    dayInput.value = dayInput.value.replace(/\D/g, '')
    if(dayInput.value.length === 2){
        monthInput.focus();
    }
});

monthInput.addEventListener('input', ()=>{
    monthInput.value = monthInput.value.replace(/\D/g, '')
    if(monthInput.value.length === 2){
        yearInput.focus()
    }
});

yearInput.addEventListener('input', ()=>{
    yearInput.value = yearInput.value.replace(/\D/g, '');
})

window.addEventListener('load', ()=>{
    yearInput.value = '';
    monthInput.value = '';
    dayInput.value = '';
})

showBtn.addEventListener('click', ()=>{
    let isValid = true
    inputs.forEach((input, index)=>{
        if(input.value === ''){
            errorTxts[index].innerHTML = '<span>This field is required</span>';
            errorTxts[index].classList.add('error');
            input.style.border = '1px solid var(--Red400)';
            lables[index].style.color = 'var(--Red400)';
            isValid = false;
        }
        input.addEventListener('input', ()=>{
            if(input.value != ''){
                errorTxts[index].innerHTML = '';
                errorTxts[index].classList.remove('error');
                input.style.border = '1px solid var(--Purple500)';
                lables[index].style.color = 'var(--Grey500)';
                isValid = true;
            }
        })
        const dayNum = Number(dayInput.value);
        if(dayNum > 31 || dayNum === 0){
            errorTxts[0].innerHTML = '<span>This field is required</span>';
            errorTxts[0].classList.add('error');
            dayInput.style.border = '1px solid var(--Red400)';
            lables[0].style.color = 'var(--Red400)';
            isValid = false;
        }
        const monthNum = Number(monthInput.value);
        if(monthNum > 12 || monthNum === 0){
            errorTxts[1].innerHTML = '<span>This field is required</span>';
            errorTxts[1].classList.add('error');
            monthInput.style.border = '1px solid var(--Red400)';
            lables[1].style.color = 'var(--Red400)';
            isValid = false;
        }
        const yearNum = Number(yearInput.value);
        if( yearNum >= currentYear || yearNum === 0 || yearNum < 1930){
            errorTxts[2].innerHTML = '<span>This field is required</span>';
            errorTxts[2].classList.add('error');
            yearInput.style.border = '1px solid var(--Red400)';
            lables[2].style.color = 'var(--Red400)';
            isValid = false;
        }
    })
    if(isValid){
        const yearNum = Number(yearInput.value);
        let yearAnswer =  currentYear - yearNum;

        const monthNum = Number(monthInput.value);
        let monthAnswer = currentMonth - monthNum;

        const dayNum = Number(dayInput.value);
        let dayAnswer = currentDay - dayNum;

        if(dayAnswer < 0){
            monthAnswer--;
            dayAnswer += daysinpreviousMonth;
        }

        if(monthAnswer < 0){
            yearAnswer--;
            monthAnswer += 12;
        }

        userYears.textContent = yearAnswer;
        userMonths.textContent = monthAnswer;
        userDays.textContent = dayAnswer;
    }
})