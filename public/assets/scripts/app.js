/**
 * @preserve Copyright 2017. Sean Bailey, All Rights Reserved,
 *
 * @author Sean Bailey, sean@seanbailey.io
 */



/**
 * A function which fires when DOM has loaded. Essentially a vanilla version of
 * JQuery's $(document).ready().
 *
 * @param {!Object} func Function to fire when DOM is ready.
 */
function ready (func) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
        func();
    } else {
        document.addEventListener("DOMContentLoaded", func);
    }
}



/**
 * Adjusts the text area's vertical size according to its content.
 *
 * @param {!Object} elem Text area element to resize.
 */
function resizeTextArea (elem) {
    elem.style.height = (elem.scrollHeight) + "px";
}



/**
 * Resizes all textareas to match their content.
 */
function resizeAll () {

    var fields = document.querySelectorAll(".copy-field");

    // Iterate over each element and resize.
    for (var i = 0; i < fields.length; i++) {
        resizeTextArea(fields[i]);
    }

}



ready(function () {
    resizeAll();
    window.addEventListener("resize", resizeAll, false);
    window.addEventListener("orientationchange", resizeAll, false);
});