const rows = document.querySelectorAll('.card-item-body')
const btnAdd = document.querySelector('#btn-add')
const btnReset = document.querySelector('#btn-reset')
const btnSave = document.querySelector('#btn-save')
const $file = document.querySelector('input[type="file"]')
const imagesSection = document.querySelector('.images')


$file.addEventListener('change', (e) => {
    const file = e.target.files[0]
    
    if (!file) return

    const reader = new FileReader()

    reader.onload = function(e){
        const img = document.createElement('img')
        img.src = e.target.result
        img.alt = 'imagen'
        img.draggable = true
        img.classList.add('img-drop')
        img.id = crypto.randomUUID()
        imagesSection.appendChild(img)
        imagesSection.addEventListener('dragstart',(e) => {
            e.dataTransfer.setData("img", e.target.id);
        })
        
    }

    reader.readAsDataURL(file);
    
})

btnReset.addEventListener('click', () => {
    const  images = document.querySelectorAll('.img-drop')
    if (images.length === 0) return
    
    images.forEach(img => imagesSection.appendChild(img))
    
    
})


rows.forEach((row) => {
    row.addEventListener("dragenter", (e) => {
        e.preventDefault(); 
        console.log(e);
        
        row.classList.add('hover')
        
    });
})
rows.forEach((row) => {
    row.addEventListener("dragleave", (e) => {
        e.preventDefault(); 
        row.classList.remove('hover')
        
    });
})

rows.forEach((row) => {
    row.addEventListener("dragover", (e) => {
        e.preventDefault(); 
        
    });
})
rows.forEach((row) => {
    row.addEventListener("drop", (e) => {
        e.preventDefault();
        const id = e.dataTransfer.getData("img")
        if (!id) return

        const img = document.getElementById(id)
        img.addEventListener('dragstart',(e) => {
            e.dataTransfer.setData("img", e.target.id);
        })
        row.appendChild(img)
        row.classList.remove('hover')
    });
})

btnSave.addEventListener('click',generateScreen)


 async function generateScreen() {
    const card = document.querySelector('.card')
    const canvas = await html2canvas(card)
    
    const img = canvas.toDataURL("image/png");

    const anchor = document.createElement('a');
    anchor.href = img;
    anchor.download = 'imagen'
    anchor.click()    

 }



