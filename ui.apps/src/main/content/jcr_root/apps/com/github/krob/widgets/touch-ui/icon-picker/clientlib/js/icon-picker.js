(function ($, $document) {
    "use strict";

    var ACTIVE_CLASS = 'touch-dialog-custom-icon-picker-active';
    var FIELD_WRAPPER_SELECTOR = '.touch-dialog-custom-icon-picker';
    var HIDDEN_INPUT_SELECTOR = 'input[type="hidden"]';
    var ICON_SELECTOR = 'a';

    $document.on("dialog-ready", function () {
        $(ICON_SELECTOR)
                .on(
                        "click",
                        function () {
                            var $fieldWrapper = $(this).closest(
                                    FIELD_WRAPPER_SELECTOR);

                            $fieldWrapper.find(ICON_SELECTOR).removeClass(
                                    ACTIVE_CLASS);
                            $fieldWrapper.find(HIDDEN_INPUT_SELECTOR).val(
                                    $(this).attr('class'));
                            $(this).addClass(ACTIVE_CLASS);
                        });

        $(HIDDEN_INPUT_SELECTOR).each(function () {
            var $fieldWrapper = $(this).closest(FIELD_WRAPPER_SELECTOR);
            var initValue = $(this).val();

            if (typeof initValue != 'undefined' && initValue.length > 0) {
                $fieldWrapper.find(ICON_SELECTOR + '.' + initValue).click();
            }
        });
    });
})($, $(document));