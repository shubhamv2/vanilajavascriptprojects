const accordion = document.querySelectorAll('.accordion')
accordion.forEach(item=>{
    item.addEventListener('click',(e)=>{
        const isVisible = item.lastElementChild.classList.contains('visible')
        accordion.forEach(item=>{
            item.lastElementChild.classList.remove('visible')
        })
        if(isVisible){
            e.currentTarget.lastElementChild.classList.remove('visible')
        }
        else{
            e.currentTarget.lastElementChild.classList.add('visible')
        }
    })
})
