const btn = document.querySelector('.btn')
const box = document.querySelector('.box')
console.log(box)
btn.addEventListener('click',()=>{
    box.classList.add('show')
    console.log('Hello')
})

const handleClose = () =>{
    box.classList.remove('show')   
    console.log("hello")
}