let outer = document.querySelector('.outer').children
// set the class of all elements and make a grid of all the div's
for(let i=0;i<outer.length;i++){    
    let child = outer[i];
    child.classList.add("generalClass") 
    child.setAttribute('id' , `${i+1}`)    
}
const isWin = (n,c) =>{
    //n = 5    
    let x = parseInt((n-1)/3) ; //1
    let y = (n-1)%3 ; //1    
    let l = 3*x //3    
    // rows
    let found = true;
    for(let i = l;i<l+3;i++){
        let div = document.getElementById(`${i+1}`)
        if(div.value != c)
            {
                found = false;
                break;
            }
    }       
    if(found)
        return true;
    found = true;
    // columns
    for(let i=y,ctr=0;ctr<3;ctr++,i+=3){
        let div = document.getElementById(`${i+1}`)
        if(div.value != c)
            {
                found = false;
                break;
            }      
    }

    if(found)
        return true;
    found = true;

    // upper left diagonal
    for(let i=0;i<=8;i+=4){
        let div = document.getElementById(`${i+1}`)
        if(div.value != c)
            {
                found = false;
                break;
            }     
    }

    if(found)
        return true;
    found = true;

    // lower left diagonal
    for(let i=2;i<=6;i+=2){
        let div = document.getElementById(`${i+1}`)
        if(div.value != c)
            {
                found = false;
                break;
            }     
    }    
    if(found){
        console.log(`${c} has won the game!`)
        return true;
    }
    return false;    
}

// console.log(grid)
// let player = prompt('Enter the symbol you want')
let player = 1
let ai = 1 - player

const oneMoveWinnable = (c) =>{
    // rows 
    
    for(let i=0;i<3;i++){
        let ctr = 0;
        for(let j = i*3;j<i*3 + 3;j++)
        {
            let div = document.getElementById(`${j+1}`)
            if(div.value == c)
                ctr++;
        }
        if(ctr == 2)
            {
                        for(let j = i*3;j<i*3 + 3;j++)
                {
                    let div = document.getElementById(`${j+1}`)
                    if(div.value == undefined)
                        return j+1;
                }
            }
    }
    
    // column
    for(let i=0;i<3;i++){
        let ctr = 0;
        for(let j =i;j<=i+6;j+=3){
            let div = document.getElementById(`${j+1}`)
            if(div.value == c)
                ctr++;
        }
        if(ctr == 2)
            {
                        for(let j =i;j<=i+6;j+=3)
                {
                    let div = document.getElementById(`${j+1}`)
                    if(div.value == undefined)
                        return j+1;
                }
            }
    }
    
    // diagonal 1
    let ctr = 0;
    for(let i = 0;i<=8;i+=4){
        let div = document.getElementById(`${i+1}`)
            if(div.value == c)
                ctr++;                
    }
    if(ctr == 2)
    {
                for(let i = 0;i<=8;i+=4)
        {
            let div = document.getElementById(`${i+1}`)
            if(div.value == undefined)
                return i+1;
        }
    }  
    // diagonal 2
    ctr = 0;
    for(let i=2;i<=6;i+=2){
        let div = document.getElementById(`${i+1}`)
            if(div.value == c)
                ctr++;
    }
    
    if(ctr == 2)
            {
                        for(let i=2;i<=6;i+=2)
                {
                    let div = document.getElementById(`${i+1}`)
                    if(div.value == undefined)
                        return i+1;
                }
            }
    
    return -1;
}

const check = (e)=>{
    // if it is a marked block 
    if(e.target.value != undefined)
        {
            alert('already used');
            return;
        }
    // unmarked cell
    else    
        {
            let val = e.target.classList[0]
            let num = document.getElementById(`${val}`)
            console.log(val , "FROM PLAYER")
            num.value = "X"
            num.innerHTML = "X"          
            
            if(isWin(val,'X') == true)
                {
                    let p  = document.querySelector('p')
                    p.innerHTML = "Player has won!"
                    for(let i =1;i<10;i++){
                        let num = document.getElementById(`${val}`);
                        num.removeEventListener('click' , check)
                    }
                    return;
                }
            
        }
        // AI's turn 
        // First check whether AI player can be stopped from winning
        
        let b = oneMoveWinnable('O')
        if(b != -1){
            let div = document.getElementById(`${b}`)
            div.value = 'O'
            div.innerHTML = 'O'
            let p  = document.querySelector('p')
            p.innerHTML = "AI has won!"
            return
        }

        let a = oneMoveWinnable('X')
        if(a != -1){
            let div = document.getElementById(`${a}`)
            div.value = 'O'
            div.innerHTML = 'O'
            return;
        }                
        
        // implement onemove.. and write condition for random move                
        while(1){
            let n = Math.ceil(Math.random()*8) ;
            console.log(n)
            let div = document.getElementById(`${n}`)
            if(div.value == undefined)
            {
                div.innerHTML = div.value = 'O';                                                
                break;
            }
        }
}

for(let i =0;i<outer.length;i++){
    outer[i].addEventListener('click',check)
}

