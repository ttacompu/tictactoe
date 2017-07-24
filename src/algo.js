'use strict';

const fizzbuzz = () =>{
    for(let i =1 ; i < 101 ; i++ ){
         const fizzbuzz = i % 3 == 0 && i % 5 == 0;
         const fizz = i % 3 == 0;
         const buzz = i % 5 == 0;

       const result =fizzbuzz ? 'fizzbuzz' : (fizz ? 'fizz' : (buzz ? 'buzz' : i));
       console.log(result);


    }
}

const arraySort = ( unsorted, fn )=>{
 const copy = unsorted.slice();
    if (fn){
        copy.sort(fn)
    }else{
        copy.sort();
    }
    console.log(unsorted);
    console.log(copy);
    return copy;
}

const arrSortCaseIgnore = (unsorted, fn) =>{

}

const anagram = (s1, s2) =>{
    if(s1.length !== s2.length){
            return false;
    }
    let charObj ={};
    for(let char of s1.split('')){
        charObj[char]!== undefined ? charObj[char]= charObj[char]+1 : charObj[char] = 1;
    }
    for(let char of s2.split('')){
        if(charObj[char]===undefined){
            return false;
        }
        delete charObj[char];
    }
    
    if(Object.keys(charObj).length !== 0){
        return false;
    }
    return true;
}

export {fizzbuzz, arraySort, anagram};