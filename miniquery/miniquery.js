"use strict";



function l(t) {
console.log(t);
}





$ = function(q, context) {
    return new $.fn.find(q, context);
};



var $ = ( function( window, document, undefined ) { // optionnal

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


        // TODO: user .ptototype with priv/pub methods

        return {
            selector, elements,  // vars
            on, trigger, click,  // events
            each
        }
    }

    //MiniQuery.on = on;


    // return :

    return MiniQuery;



    // funcs :

    function on( events, callback )
    {
        loop(elements, function( element ) {

            addEvent(element, events, callback);
        });

        return this;
    }

    function trigger( events )
    {
        loop(elements, function( element ) {

            triggerEvent(element, events);
        });

        return this;
    }

    function click( callback )
    {
        return on('click touchstart', callback);
    }

    function each( callback )
    {
        /*loop(elements, function( element ) {

            callback(element);
        });*/

        loop(elements, callback);

        return this;
    }




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




var c = $('.fff'); 

c.click(function( event ){
    alert(event)
});

//c.trigger('click')

c.each(function(element){
    //alert(element)
});

l(c)





});




