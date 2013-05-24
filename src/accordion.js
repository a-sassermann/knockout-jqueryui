/*global $, ko, versions, bindingFactory*/
(function () {
    'use strict';

    var postInit, options, events, hasRefresh;

    postInit = function (element, valueAccessor) {
        /// <summary>Keeps the active binding property in sync with the tabs' state.
        /// </summary>
        /// <param name='element' type='DOMNode'></param>
        /// <param name='valueAccessor' type='Function'></param>

        var value = valueAccessor();

        if (ko.isWriteableObservable(value.active)) {
            $(element).on('accordionactivate.ko', function () {
                value.active($(element).accordion('option', 'active'));
            });
        }

        //handle disposal
        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            $(element).off('.ko');
        });
    };

    /*jslint white:true*/
    switch (versions.jQueryUI) {
        case '1.8':
            options = ['active', 'animated', 'autoHeight', 'clearStyle', 'collapsible',
                'disabled', 'event', 'fillSpace', 'header', 'icons', 'navigation',
                'navigationFilter'];
            events = ['change', 'changestart', 'create'];
            hasRefresh = false;
            break;
        case '1.9':
        case '1.10':
            options = ['active', 'animate', 'collapsible', 'disabled', 'event', 'header',
            'heightStyle', 'icons'];
            events = ['activate', 'beforeActivate', 'create'];
            hasRefresh = true;
            break;
    }
    /*jslint white:false*/

    bindingFactory.create({
        name: 'accordion',
        options: options,
        events: events,
        postInit: postInit,
        hasRefresh: hasRefresh
    });
}());