'use strict';

import './style.css';
import jQuery from 'jquery';
import TicTac from './TicTac'

window.$ = window.jQuery = jQuery;

let tictac = new TicTac({
    containerRef : 'con',
    messageRef : 'winMessage'
});


$(() =>{
    tictac.draw();
    $('#restart').click( (event)=>{
        event.preventDefault();
        tictac.reStart();
        tictac.draw();
    })
})

