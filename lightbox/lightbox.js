"use strict";



function MiniLightbox( selector, delegation )
{
    /* get all elements set by selector */

    var elms = document.querySelectorAll(selector);

    /* attribute elements click handler */

    var elmslength = elms.length;
    for( var i = 0; i < elmslength; ++i )
    {
        var el = elms[i];

        el.addEventListener('click', onImgClick);
        el.addEventListener('touchstart', onImgClick); // mobile
    }

    /* main */

    var customOpen, customClose;

    var opened = false;

    var box = document.createElement('div');
    box.setAttribute('class', 'minilightbox');

    var img = document.createElement('img');

    img.onerror = onImgError;

    box.appendChild(img);

    /* append box the selected element or document */

    if( typeof delegation !== 'undefined' )
    {
         var parent = document.querySelector(delegation);

         parent.appendChild(box);
    }
    else
    {
        document.body.appendChild(box);
    }

    // click event on the box

    box.addEventListener('click', onClose);
    box.addEventListener('touchstart', onClose); // mobile

    // window events

    window.addEventListener('scroll', onScroll);

    window.addEventListener('keydown', onKeydown);


    function onScroll( event )
    {
        close();
    }

    function onKeydown( event )
    {
        if( event.which !== 27) return; // escape

        close();
    }

    // img.thumbnail click event

    function onImgClick( event )
    {
        //img.setAttribute('id', Math.random().toString(36).slice(2) );

        event.preventDefault();

        img.setAttribute('src', this.getAttribute('data-image') || this.src);

        open();
    }

    function onImgError( event )
    {
        alert('Unable to load the picture!');

        close();
    }

    function onOpen( event )
    {
        event.preventDefault();

        open();
    }

    function open()
    {
        if( opened ) return;

        opened = true;


        if( customOpen && customOpen(box, img) === false ) return;

        box.classList.add('open');
    }

    function onClose( event )
    {
        event.preventDefault();

        close();
    }

    function close()
    {
        if( !opened ) return;

        opened = false;


        if( customClose && customClose(box, img) === false ) return;

        box.classList.remove('open');
    }

    /* custom animation open/close */

    function setCustomOpen( handler )
    {
        customOpen = handler;
    }

    function setCustomClose( handler )
    {
        customClose = handler;
    }



    return {

        onOpen:  setCustomOpen,
        onClose: setCustomClose,
    };

}
