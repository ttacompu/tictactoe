'use strict';

import './style.css';
import jQuery from 'jquery';
import TicTac from './TicTac'
import { arraySort,anagram } from './algo'

window.$ = window.jQuery = jQuery;

let tictac = new TicTac({
    containerRef : 'con',
    messageRef : 'winMessage'
});


$(() =>{
   //fizzbuzz();
    arraySort([{ id : 4, name : 'Foo'}, { id : 3, name : 'bar'}], (a, b)=> a.name.toLowerCase().localeCompare(b.name.toLowerCase()) );

    console.log(anagram('heart', 'earth'));


    tictac.draw();
    $('#restart').click( (event)=>{
        event.preventDefault();
        tictac.reStart();
        tictac.draw();
    })
})

