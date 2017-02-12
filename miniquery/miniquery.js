"use strict";



function l(t) {
console.log(t);
}





var x = ( function( window, document, undefined ) { // optionnal


    function MiniQuery( selector )
    {
    
        var elements;


        if( !empty(selector) )
        {

            if( typeof selector === 'string' )
            {
                elements = document.querySelectorAll(selector); // || [];
            }

            else if( selector instanceof NodeList || selector instanceof HTMLCollection ) 
            {
                elements = selector; // element: selector.nodeType === 1
            }

            else
            {
                elements = [selector]; // anything, element, window or document
            }

        }

        else
        {
            elements = [];
        }


        this.selector = selector;

        this.elements = elements;



        // if start # and not contain ' ' ',' '.' -> getElementById
        // if start . or other ->querySelectorAll

        // TODO: return element $('ff');
    }

    MiniQuery.prototype = {

        each: function( callback )
        {
            loop(this.elements, callback);

            return this;
        },

        on: function( events, callback )
        {
            this.each(function( element ) {

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
            this.each(function( element ) {

                triggerEvent(element, events);
            });

            return this;
        },

        style: function( property, value )
        {
            this.each(function( element ) {

                changeStyle(element, property, value);
            });

            return this;
        },

        html: function( value )
        {
            this.each(function( element ) {

                changeHtml(element, value);
            });

            return this;

            // else:
            //return getProperty({element, type: 'html'});
        },

        attr: function( property, value )
        {
            this.each(function( element ) {

                changeAttr(element, property, value);
            });

            return this;

            // else:
            //return getProperty({element, type: 'attr', property});
        },

        class: function( classes )
        {
            this.each(function( element ) {

                addClass(element, classes);
            });

            return this;
        },

        removeClass: function( classes )
        {
            this.each(function( element ) {

                removeClass(element, classes);
            });

            return this;
        },

        toggle: function( className )
        {
            if( !empty(className) )
            {
                this.each(function( element ) {

                    toggleClass(element, className);
                });
            }

            else
            {
                this.each(function( element ) {

                    toggleDisplay(element);
                });
            }

            return this;
        },







    }


    // return :

    return function( selector ) {
        return new MiniQuery(selector);

        // TODO: move outside for global
        // FIXME: return undef when empty ??
    };



    // helpers :

    function empty( value )
    {
        return ( [undefined, null, false, 0, '', '0'].indexOf(value) > -1 );
    }

    function loop( elements, callback ) // NodeList 
    {
        for( var i = 0, l = elements.length; i < l; i++ )
        {
            var node = elements[i];

            callback(node);
        }
    }

    /*function node()
    {
        return ( elements.length === 1 ? elements[0] : elements );
    }*/

    // events :

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

    // element :

    function getStyle( element, property )
    {
        property = cssNameToJsName(property);

        return element.style[property];
    }

    function changeStyle( element, property, value )
    {
        property = cssNameToJsName(property);

        element.style[property] = value;
    }

    function changeAttr( element, property, value )
    {
        element.setAttribute(property, value);
    }

    function changeHtml( element, value )
    {
        element.innerHTML = value;
    }

    // element classes :

    function addClass( element, classes )
    {
        var classes = classes.split(' ');

        loop(classes, function( className )
        {
            element.classList.add(className);
        });
    }

    function removeClass( element, classes )
    {
        var classes = classes.split(' ');

        loop(classes, function( className )
        {
            element.classList.remove(className);
        });
    }

    function toggleClass( element, classes )
    {
        var classes = classes.split(' ');

        loop(classes, function( className )
        {
            element.classList.toggle(className);
        });
    }

    // visibility :

    function toggleDisplay( element ) // TODO: save previous 'display' prop
    {
        var display = getStyle(element, 'display');

        if( !empty(display) )
        {
            changeStyle(element, 'display', '');
        }

        else
        {
            changeStyle(element, 'display', 'none');
        }
    }

    // style helpers :

    function cssNameToJsName( property )
    {
        var camelCaseMatch = function( all, letter )
        {
            return letter.toUpperCase();
        };

        return property.replace(/-([a-z])/g, camelCaseMatch);
    }

    function jsNameToCssName( property )
    {
        return property.replace(/([A-Z])/g, '-$1').toLowerCase();
    }



} )(this, document);










x(window).on('load', function( event )
{




    //var c = x(document.getElementsByClassName('fff'));
    var c = x('.fff');

    var d = x('#idd');

    //var c = x(undefined);

    c.click(function( event ){
        //alert(event)

        //l('toggle')
        //d.toggle('abc');
    });



    //c.style('-moz-appearance', 'button');

    //c.html('myvalue');

    //c.trigger('click')

    /*c.each(function(element){
        //alert(element)
    });*/

    /*for ( var i = 0; i < c.length; i++) {
        l(c[i])
    }*/

    /*for( var a in c )
    {
        l(a)
    }*/

    l('c'); l(c)

    l('d'); l(d)


});



