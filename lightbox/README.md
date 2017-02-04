
How to use :
============

Simple LightBox for images.


```js

// on what element should the lightbox listen on

var selector = '.thumb';

// where should the lighbox-box should append ( default: body )

var delegation = 'html';

var miniLightbox = MiniLightbox(selector, delegation);


// custom open/close
// if one of these function return false, it's up to you to define a way to hide them

miniLightbox.onOpen(function( box, img )
{
    // default :

    box.classList.add('open');

    return false;
});


miniLightbox.onClose(function( box, img )
{
    // default :

    box.classList.remove('open');

    return false;
});

```



Stock Images crédit :
---------------------

[Onistocke](https://onistocke.deviantart.com/) ( CC-BY )

[Image1](https://onistocke.deviantart.com/art/Free-Stock-King-Crowley-640298767)
[Image2](https://onistocke.deviantart.com/art/Sideways-Glance-655951913)

