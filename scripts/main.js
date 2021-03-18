
const API = 'https://www.thecocktaildb.com/api/json/v1/1/'
let form, input, output
output= document.createElement('div')
output.className="output"
form = document.createElement('form')
input= document.createElement('input')


getAllCocktails = async()=>{
    const req = await fetch (API+'filter.php?c=Cocktail')
    const resp = await req.json()
    renderCocktail(resp.drinks)
}
compareFunc = ()=>{
    input.value.length <2 ? getAllCocktails() : serchCocktailsByName()
}
createSearchForm = ()=> {
    form.addEventListener('keyup',()=>{
        compareFunc()
    })
    input.id='serchParametr'
    input.setAttribute('placeholder', 'enter cocktail name')
    form.appendChild(input)
    document.body.appendChild(form)
    compareFunc()
}
createSearchForm()

serchCocktailsByName = async() => {
    output.innerHTML=''
    let nameCocktail = input.value 
    const req = await fetch (API+'search.php?s='+nameCocktail)
    const resp = await req.json()
    renderCocktail(resp.drinks)
}
renderCocktail = async (arr) =>{
    let error = document.createElement('p')
    error.style.color='red'
    error.innerHTML='ПУСТО'
    arr ? arr.map((el, index)=>{
        let div = document.createElement('div')
        div.className ="card"
        div.addEventListener('click',()=>{
            createSearchid(el.idDrink) 
        })
    
        let nameCocktail = document.createElement('h1')
        let imgCocktail = document.createElement('img')
        imgCocktail.src= el.strDrinkThumb
        nameCocktail.innerHTML=el.strDrink
        div.appendChild(imgCocktail)
        div.appendChild(nameCocktail)
        output.appendChild(div)
    }):output.appendChild(error)
    document.body.appendChild(output)
}
createSearchid = async (id)=> {
        output.innerHTML =''
        const req = await fetch (API +"lookup.php?i="+id)
        const resp = await req.json()
        renderFullinformation(resp)
        window.history.back()
        console.log(resp.drinks)
}
     let lastcard =document.createElement('div')
    renderFullinformation = (arr) =>{
    let name = document.createElement('h1')
    let img = document.createElement('img')
    let type = document.createElement('h1')
    let instructions = document.createElement('p')
    let ingredients = document.createElement ('p')
    let category = document.createElement('h1')
    name.innerHTML = arr.drinks[0].strDrink
    category.innerHTML = arr.drinks[0].strCategory
    img.src = arr.drinks[0].strDrinkThumb
    type.innerHTML = arr.drinks[0].strAlcoholic
    instructions.innerHTML = arr.drinks[0].strInstructions
    ingredients.innerHTML = 'Ingredients:</br>'+ arr.drinks[0].strIngredient1 +'</br>' + arr.drinks[0].strIngredient2 +'</br>' +arr.drinks[0].strIngredient3 +'</br>' +arr.drinks[0].strIngredient4 +'</br>' 
    
    lastcard.className ='lastcard'
    document.body.appendChild(lastcard)
    lastcard.appendChild(instructions)
    lastcard.appendChild(type)
    lastcard.appendChild(ingredients)
    lastcard.prepend(name)
    lastcard.appendChild(img)
    lastcard.appendChild(category)
    lastcard.prepend(button)
}

    let button = document.createElement('button')
    button.innerHTML='Go back'
    button.addEventListener('click',()=>{
    lastcard.innerHTML=""
    output.innerHTML =""
    serchCocktailsByName();
    })


