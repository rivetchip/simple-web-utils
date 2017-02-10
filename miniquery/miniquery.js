"use strict";



function l(t) {
console.log(t);
}





var x$ = function(selector) {
    return new $.fn.find(selector);
};




var x = ( function( window, document, undefined ) { // optionnal

    var selector, elements;


    function MiniQuery( s )
    {
        selector = s;

        elements = document.querySelectorAll(s);


        if( elements.length === 0 )
        {

        }

        // if start # and not contain ',' -> getElementById
        // if start . or other ->querySelectorAll

        // TODO: test if 'window' or 'document'


        // TODO: return element $('ff');
    }

    MiniQuery.prototype = {

        on: function( events, callback )
        {
            loop(elements, function( element ) {

                addEvent(element, events, callback);
            });

            return this;
        },

        click: function( callback )
        {
            return this.on('click touchstart', callback);
        },

        trigger: function( events )
        {
            loop(elements, function( element ) {

                triggerEvent(element, events);
            });

            return this;
        },

        each: function( callback )
        {
            /*loop(elements, function( element ) {

                callback(element);
            });*/

            loop(elements, callback);

            return this;
        },







    }

    //MiniQuery.on = on;


    // return :

    return function(s) {
        return new MiniQuery(s);
    };


    // helpers :

    function loop( elements, callback ) // NodeList 
    {
        for( var i = 0, l = elements.length; i < l; i++ )
        {
            var node = elements[i];

            callback(node);
        }
    }

    function node()
    {
        return ( elements.length === 1 ? elements[0] : elements );
    }

    function addEvent( element, events, callback )
    {
        var events = events.split(' ');

        loop(events, function( type )
        {
            element.addEventListener(type, callback, false); // bubbling phase

            /*
            element.addEventListener(type, function( event ) {
                if (fn.call(element, event) === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
            }, false);
            */
        });
    }

    function triggerEvent( element, events )
    {
        var events = events.split(' ');

        loop(events, function( type )
        {
            var event = document.createEvent('HTMLEvents');

            event.initEvent(type, true, true);
            event.eventName = type;

            element.dispatchEvent(event);
        });
    }



} )(this, document);













window.addEventListener('load', function( event )
{

    l('js:')

    var c = x('.fff');

    c.click(function( event ){
        alert(event)
    });

    //c.trigger('click')

    /*c.each(function(element){
        //alert(element)
    });*/

    l(c)


});





 

/*
 $(document).ready(function(){

    var c = $('.fff'); 

    l('jq:')

    l(c)
});

*/
